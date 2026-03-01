/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Product from "@/models/Product";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase();

        const product = await Product.findById(params.id);

        if (!product) {
            return new NextResponse("Product not found", { status: 404 });
        }

        return NextResponse.json(product, { status: 200 });
    } catch (error: any) {
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase();
        const body = await request.json();

        const product = await Product.findByIdAndUpdate(params.id, body, { new: true });

        if (!product) {
            return new NextResponse("Product not found", { status: 404 });
        }

        return NextResponse.json(product, { status: 200 });
    } catch (error: any) {
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase();

        const product = await Product.findByIdAndDelete(params.id);

        if (!product) {
            return new NextResponse("Product not found", { status: 404 });
        }

        return new NextResponse("Product deleted successfully", { status: 200 });
    } catch (error: any) {
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}
