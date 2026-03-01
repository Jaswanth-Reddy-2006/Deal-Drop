"use client";

import { useState } from "react";
import { UploadCloud, Save, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const category = formData.get("category") as string;
        const brand = formData.get("brand") as string;
        const price = Number(formData.get("price"));
        const compareAtPrice = formData.get("compareAtPrice") ? Number(formData.get("compareAtPrice")) : undefined;
        const stock = Number(formData.get("stock"));
        const sku = formData.get("sku") as string;

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    description,
                    category,
                    brand,
                    price,
                    compareAtPrice,
                    stock,
                    sku,
                    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2000&auto=format&fit=crop"], // Placeholder for now
                    features: ["Premium quality", "Durable materials", "1 Year Warranty"],
                    discountPercentage: compareAtPrice && compareAtPrice > price ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : 0,
                }),
            });

            if (res.ok) {
                router.push("/seller-dashboard/inventory");
            } else {
                const message = await res.text();
                setError(message || "Failed to add product");
                setIsLoading(false);
            }
        } catch (err) {
            setError("A network error occurred.");
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8 page-enter max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/seller-dashboard/inventory" className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-brand-textSecondary" />
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-brand-textPrimary font-poppins">Add New Product</h1>
                    <p className="text-[15px] text-brand-textSecondary mt-1">List a new item in your store inventory.</p>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex flex-row items-center gap-3 text-sm font-bold border border-red-100">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p>{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Main Details */}
                <div className="bg-white rounded-3xl p-8 border border-brand-border space-y-6 shadow-sm">
                    <h2 className="text-xl font-bold font-poppins text-brand-textPrimary border-b border-brand-border pb-4">Basic Details</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-brand-textSecondary mb-2">Product Name</label>
                            <input name="name" required type="text" placeholder="e.g. Sony WH-1000XM5" className="input w-full" />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-brand-textSecondary mb-2">Description</label>
                            <textarea name="description" required rows={4} placeholder="Describe the product details and key features..." className="input w-full resize-none" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-brand-textSecondary mb-2">Category</label>
                                <select name="category" className="input w-full bg-white">
                                    <option value="Electronics">Electronics</option>
                                    <option value="Audio">Audio</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="Fitness">Fitness</option>
                                    <option value="Home Tech">Home Tech</option>
                                    <option value="Creation">Creation</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-brand-textSecondary mb-2">Brand</label>
                                <input name="brand" required type="text" placeholder="e.g. Sony" className="input w-full" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing & Inventory */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-3xl p-8 border border-brand-border space-y-6 shadow-sm">
                        <h2 className="text-xl font-bold font-poppins text-brand-textPrimary border-b border-brand-border pb-4">Pricing</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-brand-textSecondary mb-2">Price ($)</label>
                                <input name="price" required type="number" min="0" step="0.01" placeholder="0.00" className="input w-full text-xl font-bold font-poppins text-brand-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-brand-textSecondary mb-2">Compare at Price ($) <span className="text-gray-400 font-normal ml-1">(Optional)</span></label>
                                <input name="compareAtPrice" type="number" min="0" step="0.01" placeholder="0.00" className="input w-full text-gray-500" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 border border-brand-border space-y-6 shadow-sm">
                        <h2 className="text-xl font-bold font-poppins text-brand-textPrimary border-b border-brand-border pb-4">Inventory</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-brand-textSecondary mb-2">Stock Quantity</label>
                                <input name="stock" required type="number" min="0" defaultValue="1" className="input w-full font-bold" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-brand-textSecondary mb-2">SKU <span className="text-gray-400 font-normal ml-1">(Optional)</span></label>
                                <input name="sku" type="text" placeholder="STOCK-KEEPING-UNIT" className="input w-full" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div className="bg-white rounded-3xl p-8 border border-brand-border space-y-6 shadow-sm">
                    <h2 className="text-xl font-bold font-poppins text-brand-textPrimary border-b border-brand-border pb-4">Product Images</h2>

                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                        <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <UploadCloud className="w-8 h-8 text-brand-primary" />
                        </div>
                        <p className="font-bold text-brand-textPrimary mb-1">Click to upload or drag & drop</p>
                        <p className="text-sm text-brand-textSecondary">PNG, JPG or WEBP (Max 5MB per image)</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 pt-4">
                    <Link href="/seller-dashboard/inventory" className="btn-secondary px-8 py-4">
                        Cancel
                    </Link>
                    <button type="submit" disabled={isLoading} className="btn-primary px-8 py-4 justify-center min-w-[200px]">
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <><Save className="w-5 h-5 mr-2" /> Save Product</>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
