/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Review from "@/models/Review";
import Product from "@/models/Product";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const reviews = await Review.find({ productId: params.id }).sort({ createdAt: -1 }).limit(50);
        const total = await Review.countDocuments({ productId: params.id });
        const agg = await Review.aggregate([
            { $match: { productId: new (require("mongoose").Types.ObjectId)(params.id) } },
            { $group: { _id: "$rating", count: { $sum: 1 } } }
        ]);
        const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        agg.forEach((r) => { dist[r._id] = r.count; });
        return NextResponse.json({ reviews, total, distribution: dist }, { status: 200 });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const body = await request.json();
        if (!body.rating || !body.comment || !body.userName) {
            return new NextResponse("Missing fields", { status: 400 });
        }
        const review = await Review.create({
            productId: params.id,
            userName: body.userName,
            rating: body.rating,
            comment: body.comment,
            verified: false,
        });
        // Recalculate product avg rating
        const allReviews = await Review.find({ productId: params.id });
        const avgRating = allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;
        await Product.findByIdAndUpdate(params.id, {
            rating: Math.round(avgRating * 10) / 10,
            reviewsCount: allReviews.length,
        });
        return NextResponse.json(review, { status: 201 });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
