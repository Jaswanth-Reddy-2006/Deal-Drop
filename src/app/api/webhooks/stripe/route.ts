/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectToDatabase } from "@/lib/mongoose";
import Order from "@/models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-04-10" as any,
});

export async function POST(req: Request) {
    const payload = await req.text();
    const signature = req.headers.get("Stripe-Signature") as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            payload,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        try {
            await connectToDatabase();

            // Retrieve item metadata mapped during `/api/checkout`
            const cartItemsStr = session.metadata?.cartItems || "[]";
            const cartItems = JSON.parse(cartItemsStr);

            // Save order to our MongoDB
            await Order.create({
                user: "000000000000000000000000", // Would be linked to User._id in a protected system
                items: cartItems.map((c: any) => ({
                    product: c.id,
                    name: "Purchased Product",
                    quantity: c.qty,
                    price: (session.amount_total || 0) / 100
                })),
                totalAmount: (session.amount_total || 0) / 100,
                status: "paid",
                stripeSessionId: session.id,
            });

            console.log("Order saved to database", session.id);

        } catch (dbError: any) {
            console.error(`Database Error mapping webhook: ${dbError}`);
            return new NextResponse("Internal Server Error", { status: 500 });
        }
    }

    return new NextResponse(null, { status: 200 });
}
