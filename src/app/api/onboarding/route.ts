import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/User";
import SellerProfile from "@/models/SellerProfile";

// NOTE: In a real app, you would get the userId from session/auth header.
// For this demo, we'll assume the user is passed or we find the last registered seller.
export async function POST(request: Request) {
    try {
        const { storeName, description, categories, address, phoneNumber } = await request.json();

        await connectToDatabase();

        // Find the last registerd user who is a seller and not onboarded (Simulating session)
        const user = await User.findOne({ role: "seller", isOnboarded: false }).sort({ createdAt: -1 });

        if (!user) {
            return new NextResponse("User session not found or already onboarded", { status: 404 });
        }

        const profile = await SellerProfile.create({
            userId: user._id,
            storeName,
            description,
            categories,
            address,
        });

        user.isOnboarded = true;
        user.sellerProfileId = profile._id;
        user.phoneNumber = phoneNumber;
        await user.save();

        return NextResponse.json({ message: "Store onboarded successfully", profile }, { status: 201 });
    } catch (error: any) {
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}
