import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: "customer" | "seller" | "admin";
    isOnboarded?: boolean;
    sellerProfileId?: string;
    phoneNumber?: string;
    address?: {
        house?: string;
        city?: string;
        state?: string;
        pincode?: string;
        country?: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        role: { type: String, enum: ["customer", "seller", "admin"], default: "customer" },
        isOnboarded: { type: Boolean, default: false },
        sellerProfileId: { type: Schema.Types.ObjectId, ref: "SellerProfile" },
        phoneNumber: { type: String },
        address: {
            house: { type: String },
            city: { type: String },
            state: { type: String },
            pincode: { type: String },
            country: { type: String },
        }
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
