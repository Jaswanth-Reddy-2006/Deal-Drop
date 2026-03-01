"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Store, Camera, MapPin, Phone, Type, LayoutGrid, Loader2, ArrowRight } from "lucide-react";

export default function OnboardingPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            storeName: formData.get("storeName"),
            description: formData.get("description"),
            categories: [formData.get("category")],
            address: formData.get("address"),
            phoneNumber: formData.get("phone"),
        };

        try {
            const res = await fetch("/api/onboarding", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push("/seller-dashboard");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl bg-white rounded-[40px] border border-brand-border shadow-2xl p-12 overflow-hidden relative"
            >
                <div className="absolute top-0 right-0 w-40 h-40 bg-brand-primary/5 rounded-bl-full" />

                <div className="flex items-center gap-4 mb-10">
                    <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center text-white">
                        <Store className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-brand-textPrimary font-poppins">Complete Your Setup</h1>
                        <p className="text-brand-textSecondary font-medium">Launch your storefront on DealDrop V2 today.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-brand-textSecondary uppercase tracking-widest px-1 flex items-center gap-2">
                                <Type className="w-3 h-3" /> Store Name
                            </label>
                            <input name="storeName" required placeholder="Nexa Electronics" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-brand-border focus:bg-white focus:border-brand-primary outline-none transition-all font-medium text-brand-textPrimary" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-brand-textSecondary uppercase tracking-widest px-1 flex items-center gap-2">
                                <LayoutGrid className="w-3 h-3" /> Primary Category
                            </label>
                            <select name="category" required className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-brand-border focus:bg-white focus:border-brand-primary outline-none transition-all font-medium text-brand-textPrimary appearance-none">
                                <option>Electronics</option>
                                <option>Home & Office</option>
                                <option>Fitness</option>
                                <option>Audio</option>
                                <option>Accessories</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-brand-textSecondary uppercase tracking-widest px-1 flex items-center gap-2">
                            Description
                        </label>
                        <textarea name="description" rows={3} placeholder="Tell your customers about your products and vision..." className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-brand-border focus:bg-white focus:border-brand-primary outline-none transition-all font-medium text-brand-textPrimary resize-none" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-brand-textSecondary uppercase tracking-widest px-1 flex items-center gap-2">
                                <MapPin className="w-3 h-3" /> Business Address
                            </label>
                            <input name="address" required placeholder="123 Tech Park, India" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-brand-border focus:bg-white focus:border-brand-primary outline-none transition-all font-medium text-brand-textPrimary" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-brand-textSecondary uppercase tracking-widest px-1 flex items-center gap-2">
                                <Phone className="w-3 h-3" /> Support Phone
                            </label>
                            <input name="phone" required placeholder="+91 000 000 0000" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-brand-border focus:bg-white focus:border-brand-primary outline-none transition-all font-medium text-brand-textPrimary" />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-brand-border">
                        <p className="text-[10px] text-brand-textSecondary font-bold uppercase tracking-widest mb-6 px-1">Profile Visuals</p>
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 bg-gray-100 rounded-3xl border-2 border-dashed border-brand-border flex flex-col items-center justify-center text-brand-textSecondary group hover:border-brand-primary cursor-pointer transition-all">
                                <Camera className="w-6 h-6 mb-1" />
                                <span className="text-[8px] font-bold">LOGO</span>
                            </div>
                            <p className="text-sm text-brand-textSecondary flex-1 leading-relaxed">
                                Upload your store logo. A clear, high-resolution SVG or PNG (500x500) works best for customer trust.
                            </p>
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        className="w-full py-5 bg-brand-textPrimary text-white rounded-2xl font-bold text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {loading && <Loader2 className="w-5 h-5 animate-spin text-brand-primary" />}
                        {loading ? "Activating Store..." : "Launch Storefront"} <ArrowRight className="w-5 h-5" />
                    </button>
                </form>
            </motion.div>
        </div >
    );
}
