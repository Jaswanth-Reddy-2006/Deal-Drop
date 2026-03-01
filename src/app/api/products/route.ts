/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Product from "@/models/Product";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");
        const minPrice = searchParams.get("min");
        const maxPrice = searchParams.get("max");
        const rating = searchParams.get("rating");
        const brand = searchParams.get("brand");
        const inStock = searchParams.get("inStock");
        const onDeal = searchParams.get("onDeal"); // discount > 0
        const minDiscount = searchParams.get("minDiscount");
        const searchQuery = searchParams.get("search");
        const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
        const limit = Math.min(48, Math.max(1, parseInt(searchParams.get("limit") || "24")));

        const query: any = {};

        if (searchQuery) {
            query.$or = [
                { name: { $regex: searchQuery, $options: "i" } },
                { description: { $regex: searchQuery, $options: "i" } },
                { brand: { $regex: searchQuery, $options: "i" } },
                { category: { $regex: searchQuery, $options: "i" } },
                { tags: { $in: [new RegExp(searchQuery, "i")] } }
            ];
        }

        if (category && category !== "all") query.category = new RegExp(`^${category}$`, "i");
        if (brand && brand !== "all") query.brand = new RegExp(`^${brand}$`, "i");
        if (rating) query.rating = { $gte: Number(rating) };
        if (inStock === "true") query.stock = { $gt: 0 };
        if (onDeal === "true") query.discountPercentage = { $gt: 0 };
        if (minDiscount) query.discountPercentage = { $gte: Number(minDiscount) };

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Sort
        const sortOption = searchParams.get("sort") || "featured";
        let sortObj: any = {};
        if (sortOption === "price_asc") sortObj = { price: 1 };
        else if (sortOption === "price_desc") sortObj = { price: -1 };
        else if (sortOption === "newest") sortObj = { createdAt: -1 };
        else if (sortOption === "rating") sortObj = { rating: -1 };
        else if (sortOption === "discount") sortObj = { discountPercentage: -1 };
        else sortObj = { featured: -1, createdAt: -1 };

        const skip = (page - 1) * limit;
        const total = await Product.countDocuments(query);
        const products = await Product.find(query).sort(sortObj).skip(skip).limit(limit);

        // Get available brands for the active category (for filter panel)
        const brandsAgg = await Product.distinct("brand", category && category !== "all" ? { category: new RegExp(`^${category}$`, "i") } : {});

        return NextResponse.json({
            products,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
                hasNext: page * limit < total,
                hasPrev: page > 1,
            },
            brands: brandsAgg.sort(),
        }, { status: 200 });
    } catch (error: any) {
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user = session?.user as any;

        if (!user || user.role !== "seller") {
            return new NextResponse("Unauthorized. Only sellers can add products.", { status: 401 });
        }

        await connectToDatabase();
        const body = await request.json();

        if (!body.name || !body.price || !body.category) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        // Enforce the sellerId ownership to the currently authenticated session
        const productData = {
            ...body,
            sellerId: user.id
        };

        const product = await Product.create(productData);
        return NextResponse.json(product, { status: 201 });
    } catch (error: any) {
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}
