import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    subCategory: string;
    brand: string;
    discountPercentage: number;
    images: string[];
    stock: number;
    rating: number;
    reviewsCount: number;
    tags: string[];
    featured: boolean;
    dealEndsAt?: Date;
    sellerId: string;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true, index: true },
        subCategory: { type: String, required: true },
        brand: { type: String, index: true },
        discountPercentage: { type: Number, default: 0 },
        images: { type: [String], required: true },
        stock: { type: Number, required: true, default: 0 },
        rating: { type: Number, default: 0, index: true },
        reviewsCount: { type: Number, default: 0 },
        tags: { type: [String], default: [] },
        featured: { type: Boolean, default: false },
        dealEndsAt: { type: Date },
        sellerId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    },
    { timestamps: true }
);

ProductSchema.index({ price: 1 });
ProductSchema.index({ createdAt: -1 });

export default mongoose.models.Product ||
    mongoose.model<IProduct>("Product", ProductSchema);
