"use client";

import { motion } from "framer-motion";
import { Store, ShoppingBag, ArrowUpRight, ShieldCheck, Star, Users, ExternalLink, QrCode } from "lucide-react";
import Link from "next/link";

export default function SellerShopPage() {
    return (
        <div className="space-y-10">
            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-display font-black text-[#1E4D35] tracking-tight">My Public Store</h1>
                    <p className="text-[#1E4D35]/40 font-bold mt-1 text-[15px]">This is how your shop appears to DealDrop customers.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-8 py-5 rounded-full bg-white text-[#1E4D35] font-black shadow-sm border border-[#1E4D35]/5 hover:bg-[#F5F7F6] transition-all">
                        <QrCode size={18} /> Shop QR
                    </button>
                    <a href="/store" target="_blank" className="flex items-center gap-2 px-8 py-5 rounded-full bg-[#1E4D35] text-[#F5E74E] font-black shadow-xl shadow-[#1E4D35]/20 hover:scale-[1.05] transition-all">
                        View Live Store <ExternalLink size={18} />
                    </a>
                </div>
            </div>

            {/* ── Shop Customization Card ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                    <div className="bg-white rounded-[40px] p-10 shadow-sm border border-[#1E4D35]/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5E74E]/10 rounded-bl-full -z-0" />

                        <div className="relative z-10 flex items-center gap-8 mb-12">
                            <div className="w-24 h-24 rounded-[32px] bg-[#1E4D35] p-1 shadow-2xl relative">
                                <img src="https://i.pravatar.cc/150?img=33" alt="Store Logo" className="w-full h-full object-cover rounded-[30px]" />
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-500 shadow-lg">
                                    <ShieldCheck size={18} fill="currentColor" className="text-white" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-[#1E4D35] font-display">Sarah&apos;s Premium Drops</h2>
                                <p className="text-[#1E4D35]/40 font-bold flex items-center gap-2 mt-1">
                                    <Star size={16} className="text-[#F5E74E] fill-[#F5E74E]" /> 4.9 Rating (428 Reviews)
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-[#1E4D35]/30 uppercase tracking-widest ml-1">Store Heading</label>
                                <div className="p-6 bg-[#F5F7F6] rounded-[24px] font-bold text-[#1E4D35]">Curated High-End Tech & Lifestyle Essentials</div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-[#1E4D35]/30 uppercase tracking-widest ml-1">Featured Categories</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Audio', 'Home Tech', 'Luxury'].map(c => (
                                        <span key={c} className="px-5 py-2.5 bg-[#1E4D35] text-[#F5E74E] rounded-full text-[11px] font-black uppercase tracking-wider">{c}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shop Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-[32px] p-8 border border-[#1E4D35]/5 shadow-sm">
                            <Users className="text-[#1E4D35]/20 mb-4" size={32} />
                            <h3 className="text-3xl font-black text-[#1E4D35] font-display">2.4k</h3>
                            <p className="text-[11px] font-black text-[#1E4D35]/40 uppercase tracking-widest mt-1">Store Followers</p>
                        </div>
                        <div className="bg-white rounded-[32px] p-8 border border-[#1E4D35]/5 shadow-sm">
                            <ShoppingBag className="text-[#1E4D35]/20 mb-4" size={32} />
                            <h3 className="text-3xl font-black text-[#1E4D35] font-display">12.5%</h3>
                            <p className="text-[11px] font-black text-[#1E4D35]/40 uppercase tracking-widest mt-1">Conversion Rate</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-10">
                    <div className="bg-[#1E4D35] rounded-[40px] p-10 text-white shadow-2xl shadow-[#1E4D35]/20 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-[#F5E74E]/20 rounded-[28px] flex items-center justify-center text-[#F5E74E] mb-8">
                            <ArrowUpRight size={40} />
                        </div>
                        <h3 className="text-2xl font-black font-display mb-4">Go Global</h3>
                        <p className="text-white/60 font-bold text-sm leading-relaxed mb-8">Your shop is currently only visible in Asia. Upgrade to Global Tier to reach customers in EU and USA.</p>
                        <button className="w-full py-5 bg-[#F5E74E] text-[#1E4D35] rounded-full font-black text-sm uppercase tracking-widest hover:scale-[1.05] transition-all shadow-xl shadow-black/20">Expand Globally</button>
                    </div>

                    <div className="bg-white rounded-[40px] p-8 shadow-sm border border-[#1E4D35]/5">
                        <h4 className="font-black text-[#1E4D35] text-center uppercase tracking-[0.2em] text-[11px] mb-8 opacity-40">Store Banner</h4>
                        <div className="w-full aspect-video bg-[#F5F7F6] rounded-[28px] border-2 border-dashed border-[#1E4D35]/10 flex flex-col items-center justify-center text-[#1E4D35]/30">
                            <Store size={32} className="mb-2 opacity-50" />
                            <p className="text-[10px] font-black uppercase tracking-widest">Update Banner</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
