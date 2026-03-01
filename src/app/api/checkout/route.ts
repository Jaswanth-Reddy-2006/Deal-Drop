/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectToDatabase } from "@/lib/mongoose";
import Product from "@/models/Product";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-04-10" as any,
});

export async function POST(request: Request) {
    try {
        const { items, email } = await request.json();

        if (!items || items.length === 0) {
            return new NextResponse("Items array is required", { status: 400 });
        }

        await connectToDatabase();

        // Verify stock for all items before proceeding to Stripe
        for (const item of items) {
            const dbProduct = await Product.findById(item.id || item._id);
            if (!dbProduct) {
                return new NextResponse(`Product ${item.name} no longer exists.`, { status: 404 });
            }
            if (dbProduct.stock < item.quantity) {
                return new NextResponse(`Only ${dbProduct.stock} left for ${item.name}. Please adjust your cart.`, { status: 400 });
            }
        }

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
            (item: any) => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                        images: [item.image || "https://dummyimage.com/600x400/000/fff"],
                    },
                    unit_amount: Math.round(item.price * 100), // Stripe expects cents
                },
                quantity: item.quantity,
            })
        );

        // Add generic shipping as line item
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Standard Shipping + Processing",
                },
                unit_amount: 1500, // $15.00
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            customer_email: email,
            success_url: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
            metadata: {
                cartItems: JSON.stringify(items.map((i: any) => ({ id: i.id, qty: i.quantity }))),
            },
        });

        return NextResponse.json({ url: session.url }, { status: 200 });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
