import mongoose, { Schema, Document } from "mongoose";

export interface ISellerProfile extends Document {
    userId: string;
    storeName: string;
    categories: string[];
    description: string;
    logo?: string;
    address: string;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const SellerProfileSchema: Schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
        storeName: { type: String, required: true },
        categories: { type: [String], default: [] },
        description: { type: String },
        logo: { type: String },
        address: { type: String, required: true },
        verified: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.models.SellerProfile || mongoose.model<ISellerProfile>("SellerProfile", SellerProfileSchema);
