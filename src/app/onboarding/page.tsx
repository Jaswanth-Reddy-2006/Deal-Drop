"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    Store,
    MapPin,
    Phone,
    Type,
    LayoutGrid,
    Loader2,
    ArrowRight,
    Home,
    Map,
    Compass,
    Building2,
    CheckCircle2
} from "lucide-react";

export default function OnboardingPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (step < 2) {
            setStep(2);
            return;
        }

        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            storeName: formData.get("storeName"),
            description: formData.get("description"),
            categories: [formData.get("category")],
            address: `${formData.get("shopRoom")}, ${formData.get("area")}, ${formData.get("location")}`,
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
        <div className="min-h-screen bg-[#F5F7F6] flex flex-col items-center justify-center p-6 font-body">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl bg-white rounded-[48px] shadow-2xl shadow-[#1E4D35]/10 p-12 md:p-16 relative overflow-hidden"
            >
                {/* Visual Decorations */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5E74E]/10 rounded-bl-full" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#1E4D35]/5 rounded-full blur-3xl" />

                <div className="relative z-10">
                    <div className="flex items-center gap-6 mb-12">
                        <div className="w-20 h-20 bg-[#1E4D35] rounded-[24px] flex items-center justify-center text-[#F5E74E] shadow-xl shadow-[#1E4D35]/20">
                            <Store size={36} />
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-[#1E4D35]/40 uppercase tracking-[0.3em]">Step {step} of 2</span>
                            <h1 className="text-4xl font-display font-black text-[#1E4D35] tracking-tight mt-1">
                                {step === 1 ? "Store Identity" : "Shop Location"}
                            </h1>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-10">
                        {step === 1 ? (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-[#1E4D35]/40 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                                        <Type size={14} /> Store Name
                                    </label>
                                    <input name="storeName" required placeholder="e.g. Nexa Premium Hub"
                                        className="w-full px-8 py-5 rounded-[22px] bg-[#F5F7F6] border-2 border-transparent focus:border-[#F5E74E] outline-none transition-all font-bold text-[#1E4D35] placeholder:text-[#1E4D35]/20" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-[#1E4D35]/40 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                                        <LayoutGrid size={14} /> Primary Category
                                    </label>
                                    <select name="category" required
                                        className="w-full px-8 py-5 rounded-[22px] bg-[#F5F7F6] border-2 border-transparent focus:border-[#F5E74E] outline-none transition-all font-bold text-[#1E4D35] appearance-none cursor-pointer">
                                        <option>Electronics</option>
                                        <option>Fashion & Apparel</option>
                                        <option>Luxury Goods</option>
                                        <option>Home Tech</option>
                                        <option>Audio</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-[#1E4D35]/40 uppercase tracking-[0.2em] ml-1">Store Description</label>
                                    <textarea name="description" rows={3} placeholder="Tell your customers what makes your shop unique..."
                                        className="w-full px-8 py-5 rounded-[22px] bg-[#F5F7F6] border-2 border-transparent focus:border-[#F5E74E] outline-none transition-all font-bold text-[#1E4D35] placeholder:text-[#1E4D35]/20 resize-none" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-[#1E4D35]/40 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                                        <Phone size={14} /> Business Phone
                                    </label>
                                    <input name="phone" required placeholder="+91 000 000 0000"
                                        className="w-full px-8 py-5 rounded-[22px] bg-[#F5F7F6] border-2 border-transparent focus:border-[#F5E74E] outline-none transition-all font-bold text-[#1E4D35] placeholder:text-[#1E4D35]/20" />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black text-[#1E4D35]/40 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                                            <Building2 size={14} /> Shop / Room No.
                                        </label>
                                        <input name="shopRoom" required placeholder="e.g. Shop #42, Floor 2"
                                            className="w-full px-8 py-5 rounded-[22px] bg-[#F5F7F6] border-2 border-transparent focus:border-[#F5E74E] outline-none transition-all font-bold text-[#1E4D35] placeholder:text-[#1E4D35]/20" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black text-[#1E4D35]/40 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                                            <Map size={14} /> Area Name
                                        </label>
                                        <input name="area" required placeholder="e.g. Cyber City"
                                            className="w-full px-8 py-5 rounded-[22px] bg-[#F5F7F6] border-2 border-transparent focus:border-[#F5E74E] outline-none transition-all font-bold text-[#1E4D35] placeholder:text-[#1E4D35]/20" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-[#1E4D35]/40 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                                        <Compass size={14} /> Main Location / Landmark
                                    </label>
                                    <input name="location" required placeholder="e.g. Near Hitech City Metro, Hyderabad"
                                        className="w-full px-8 py-5 rounded-[22px] bg-[#F5F7F6] border-2 border-transparent focus:border-[#F5E74E] outline-none transition-all font-bold text-[#1E4D35] placeholder:text-[#1E4D35]/20" />
                                </div>

                                <div className="bg-[#F5F7F6] rounded-[32px] p-8 border-2 border-dashed border-[#1E4D35]/10 flex items-center gap-6 group hover:border-[#F5E74E] transition-all cursor-pointer">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#1E4D35]/20 group-hover:text-[#F5E74E] group-hover:bg-[#1E4D35] transition-all">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <p className="text-sm font-bold text-[#1E4D35]/60 leading-relaxed">
                                        By submitting, you agree to our <span className="text-[#1E4D35] underline cursor-pointer">Seller Privacy Policy</span> and verify that your physical location is currently active.
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        <div className="flex items-center justify-between pt-8 border-t border-[#1E4D35]/5">
                            {step === 2 && (
                                <button type="button" onClick={() => setStep(1)} className="font-black text-[#1E4D35]/40 hover:text-[#1E4D35] transition-all uppercase text-[11px] tracking-widest">
                                    Back
                                </button>
                            )}
                            <button
                                disabled={loading}
                                className="ml-auto min-w-[240px] py-6 bg-[#1E4D35] text-[#F5E74E] rounded-full font-black text-lg shadow-2xl shadow-[#1E4D35]/20 hover:scale-[1.05] active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                            >
                                {loading ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    <>
                                        {step === 1 ? "Next Details" : "Launch Shop"} <ArrowRight size={22} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>

            <p className="mt-12 text-[#1E4D35]/30 font-bold text-[11px] tracking-[0.4em] uppercase">DealDrop V2 Seller Onboarding</p>
        </div >
    );
}
