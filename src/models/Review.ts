import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
    productId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    userName: string;
    rating: number;
    comment: string;
    helpful: number;
    verified: boolean;
    createdAt: Date;
}

const ReviewSchema: Schema = new Schema(
    {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true, index: true },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
        userName: { type: String, required: true, default: "Anonymous" },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true, minlength: 10, maxlength: 1000 },
        helpful: { type: Number, default: 0 },
        verified: { type: Boolean, default: false },
    },
    { timestamps: true }
);

ReviewSchema.index({ productId: 1, createdAt: -1 });

export default mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
