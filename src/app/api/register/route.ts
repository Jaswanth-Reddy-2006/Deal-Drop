/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/User";

export async function POST(request: Request) {
    try {
        const { name, email, password, role } = await request.json();

        if (!name || !email || !password) {
            return new NextResponse("Missing data", { status: 400 });
        }

        await connectToDatabase();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return new NextResponse("Email already exists", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "customer",
            isOnboarded: false,
        });

        return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (error: any) {
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}
