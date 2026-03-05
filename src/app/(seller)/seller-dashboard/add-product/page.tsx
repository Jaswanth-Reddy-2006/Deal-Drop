"use client";

import { useState } from "react";
import { UploadCloud, Save, ArrowLeft, AlertCircle, Plus, Info, DollarSign } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    description,
                    category,
                    brand,
                    price,
                    compareAtPrice,
                    stock,
                    sku,
                    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2000&auto=format&fit=crop"],
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
        <div className="max-w-[1000px] mx-auto space-y-6 lg:space-y-10">
            {error && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="p-4 lg:p-5 bg-red-50 text-red-600 rounded-[20px] lg:rounded-[24px] flex items-center gap-4 text-sm font-bold border border-red-100 shadow-sm shadow-red-500/5">
                    <AlertCircle size={20} className="shrink-0" />
                    <p>{error}</p>
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8 pb-20">
                {/* ── Section: Basics ── */}
                <div className="bg-white rounded-[24px] lg:rounded-[28px] p-6 lg:p-8 shadow-sm shadow-[#1E4D35]/5 space-y-6 border border-transparent hover:border-[#F5E74E]/10 transition-all">
                    <div className="flex items-center gap-3 border-b border-[#1E4D35]/5 pb-5">
                        <div className="w-8 h-8 lg:w-9 lg:h-9 bg-[#1E4D35]/5 rounded-lg lg:rounded-xl flex items-center justify-center text-[#1E4D35]">
                            <Info size={18} />
                        </div>
                        <h2 className="text-base lg:text-lg font-black text-[#1E4D35] font-display uppercase tracking-wider">Basic Information</h2>
                    </div>

                    <div className="grid gap-6">
                        <div>
                            <label className="block text-[10px] font-black text-[#1E4D35]/30 uppercase tracking-[0.2em] mb-2 ml-1">Product Title</label>
                            <input name="name" required type="text" placeholder="e.g. Master & Dynamics MW08 Earphones"
                                className="w-full bg-[#F5F7F6] border-2 border-transparent focus:border-[#F5E74E]/30 rounded-xl py-3 px-5 text-[14px] font-bold outline-none transition-all placeholder:text-[#1E4D35]/20" />
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-[#1E4D35]/30 uppercase tracking-[0.2em] mb-2 ml-1">Description</label>
                            <textarea name="description" required rows={4} placeholder="Craft a compelling story for your product..."
                                className="w-full bg-[#F5F7F6] border-2 border-transparent focus:border-[#F5E74E]/30 rounded-xl py-3 px-5 text-[14px] font-bold outline-none transition-all placeholder:text-[#1E4D35]/20 resize-none" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[10px] font-black text-[#1E4D35]/30 uppercase tracking-[0.2em] mb-2 ml-1">Category</label>
                                <select name="category" className="w-full bg-[#F5F7F6] border-2 border-transparent focus:border-[#F5E74E]/30 rounded-xl py-3 px-5 text-[14px] font-bold outline-none transition-all appearance-none cursor-pointer">
                                    <option value="Electronics">Electronics</option>
                                    <option value="Audio">Audio</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="Fitness">Fitness</option>
                                    <option value="Home Tech">Home Tech</option>
                                    <option value="Creation">Creation</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-[#1E4D35]/30 uppercase tracking-[0.2em] mb-2 ml-1">Brand Name</label>
                                <input name="brand" required type="text" placeholder="e.g. Sony"
                                    className="w-full bg-[#F5F7F6] border-2 border-transparent focus:border-[#F5E74E]/30 rounded-xl py-3 px-5 text-[14px] font-bold outline-none transition-all placeholder:text-[#1E4D35]/20" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Section: Pricing & Inventory ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* Pricing */}
                    <div className="bg-white rounded-[24px] lg:rounded-[28px] p-6 lg:p-8 shadow-sm shadow-[#1E4D35]/5 space-y-6 h-full border border-transparent hover:border-[#F5E74E]/10 transition-all">
                        <div className="flex items-center gap-3 border-b border-[#1E4D35]/5 pb-5">
                            <div className="w-8 h-8 lg:w-9 lg:h-9 bg-green-500/5 rounded-lg lg:rounded-xl flex items-center justify-center text-green-600">
                                <DollarSign size={18} />
                            </div>
                            <h2 className="text-base lg:text-lg font-black text-[#1E4D35] font-display uppercase tracking-wider">Pricing</h2>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-[#1E4D35]/30 uppercase tracking-[0.2em] mb-2 ml-1">Sale Price ($)</label>
                                <input name="price" required type="number" min="0" step="0.01" placeholder="0.00"
                                    className="w-full bg-[#F5F7F6] border-2 border-transparent focus:border-[#F5E74E]/30 rounded-xl py-4 px-6 lg:px-8 text-xl lg:text-2xl font-bold text-[#1E4D35] outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-[#1E4D35]/30 uppercase tracking-[0.2em] mb-2 ml-1">Market Price (Optional)</label>
                                <input name="compareAtPrice" type="number" min="0" step="0.01" placeholder="0.00"
                                    className="w-full bg-[#F5F7F6] border-2 border-transparent focus:border-[#F5E74E]/30 rounded-xl py-3 px-5 text-[14px] font-bold text-[#1E4D35]/30 outline-none transition-all" />
                            </div>
                        </div>
                    </div>

                    {/* Inventory */}
                    <div className="bg-white rounded-[24px] lg:rounded-[28px] p-6 lg:p-8 shadow-sm shadow-[#1E4D35]/5 space-y-6 h-full border border-transparent hover:border-[#F5E74E]/10 transition-all">
                        <div className="flex items-center gap-3 border-b border-[#1E4D35]/5 pb-5">
                            <div className="w-8 h-8 lg:w-9 lg:h-9 bg-blue-500/5 rounded-lg lg:rounded-xl flex items-center justify-center text-blue-600">
                                <Plus size={18} />
                            </div>
                            <h2 className="text-base lg:text-lg font-black text-[#1E4D35] font-display uppercase tracking-wider">Stock Control</h2>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-[#1E4D35]/30 uppercase tracking-[0.2em] mb-2 ml-1">Quantity Available</label>
                                <input name="stock" required type="number" min="0" defaultValue="1"
                                    className="w-full bg-[#F5F7F6] border-2 border-transparent focus:border-[#F5E74E]/30 rounded-xl py-4 px-6 lg:px-8 text-xl lg:text-2xl font-bold text-[#1E4D35] outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-[#1E4D35]/30 uppercase tracking-[0.2em] mb-2 ml-1">Product SKU</label>
                                <input name="sku" type="text" placeholder="STOCK-CODE-XXX"
                                    className="w-full bg-[#F5F7F6] border-2 border-transparent focus:border-[#F5E74E]/30 rounded-xl py-3 px-5 text-[14px] font-bold text-[#1E4D35]/30 outline-none transition-all tracking-widest" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Section: Images ── */}
                <div className="bg-white rounded-[24px] lg:rounded-[28px] p-6 lg:p-8 shadow-sm shadow-[#1E4D35]/5 space-y-6 border border-transparent hover:border-[#F5E74E]/10 transition-all">
                    <div className="flex items-center gap-3 border-b border-[#1E4D35]/5 pb-5">
                        <div className="w-8 h-8 lg:w-9 lg:h-9 bg-[#B6B7F4]/10 rounded-lg lg:rounded-xl flex items-center justify-center text-[#B6B7F4]">
                            <UploadCloud size={18} />
                        </div>
                        <h2 className="text-base lg:text-lg font-black text-[#1E4D35] font-display uppercase tracking-wider">Visual Assets</h2>
                    </div>

                    <div className="border-2 border-dashed border-[#F5F7F6] hover:border-[#F5E74E]/30 bg-[#F5F7F6]/30 rounded-[20px] lg:rounded-[24px] p-8 lg:p-12 flex flex-col items-center justify-center text-center transition-all cursor-pointer group hover:bg-white">
                        <div className="w-14 h-14 lg:w-16 lg:h-16 bg-[#1E4D35]/5 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 group-hover:scale-[1.1] group-hover:bg-[#F5E74E] group-hover:text-[#1E4D35] transition-all duration-500 text-[#1E4D35]/30">
                            <UploadCloud size={28} />
                        </div>
                        <p className="font-black text-base lg:text-lg text-[#1E4D35] mb-1 tracking-tight">Drop images here</p>
                        <p className="text-[11px] lg:text-[12px] font-bold text-[#1E4D35]/30 max-w-xs px-4">Upload up to 5 photos. PNG or JPG accepted.</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6">
                    <Link href="/seller-dashboard/inventory" className="order-2 sm:order-1 text-xs font-black text-[#1E4D35]/40 hover:text-[#1E4D35] transition-colors uppercase tracking-[0.2em] flex items-center gap-2">
                        Discard Changes
                    </Link>
                    <button type="submit" disabled={isLoading} className="order-1 sm:order-2 w-full sm:w-auto bg-[#1E4D35] text-[#F5E74E] font-black px-12 py-5 rounded-full hover:scale-[1.05] active:scale-95 transition-all shadow-xl shadow-[#1E4D35]/20 flex items-center gap-2 lg:min-w-[240px] justify-center text-sm disabled:opacity-50">
                        {isLoading ? (
                            <div className="w-5 h-5 border-3 border-[#F5E74E]/30 border-t-[#F5E74E] rounded-full animate-spin" />
                        ) : (
                            <><Save size={20} /> Publish Product</>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
