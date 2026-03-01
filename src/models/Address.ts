import mongoose, { Schema, Document } from "mongoose";

export interface IAddress extends Document {
    userId: string;
    fullName: string;
    phone: string;
    house: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    isDefault: boolean;
}

const AddressSchema: Schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        house: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
        country: { type: String, required: true, default: "India" },
        isDefault: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.models.Address || mongoose.model<IAddress>("Address", AddressSchema);
