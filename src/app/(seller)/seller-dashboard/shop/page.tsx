"use client";

import { motion } from "framer-motion";
import { Store, ShoppingBag, ArrowUpRight, ShieldCheck, Star, Users, ExternalLink, QrCode } from "lucide-react";
import Link from "next/link";

export default function SellerShopPage() {
    return (
        <div className="space-y-6 lg:space-y-10">
            {/* ── Page Actions ── */}
            <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-4">
                <button className="flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white text-[#1E4D35] font-black shadow-sm border border-[#1E4D35]/5 hover:bg-[#F5F7F6] transition-all text-sm">
                    <QrCode size={16} /> Shop QR
                </button>
                <a href="/store" target="_blank" className="flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#1E4D35] text-[#F5E74E] font-black shadow-xl shadow-[#1E4D35]/20 hover:scale-[1.05] transition-all text-sm">
                    View Live Store <ExternalLink size={16} />
                </a>
            </div>

            {/* ── Shop Customization Card ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
                <div className="lg:col-span-2 space-y-6 lg:space-y-10">
                    <div className="bg-white rounded-[32px] lg:rounded-[40px] p-6 lg:p-10 shadow-sm border border-[#1E4D35]/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 lg:w-64 lg:h-64 bg-[#F5E74E]/10 rounded-bl-full -z-0" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 lg:gap-8 mb-8 lg:mb-12 text-center md:text-left">
                            <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-[28px] lg:rounded-[32px] bg-[#1E4D35] p-1 shadow-2xl relative shrink-0">
                                <img src="https://i.pravatar.cc/150?img=33" alt="Store Logo" className="w-full h-full object-cover rounded-[26px] lg:rounded-[30px]" />
                                <div className="absolute -bottom-2 -right-2 w-7 h-7 lg:w-8 lg:h-8 bg-white rounded-full flex items-center justify-center text-green-500 shadow-lg">
                                    <ShieldCheck size={16} fill="currentColor" className="text-white" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl lg:text-3xl font-black text-[#1E4D35] font-display">Sarah&apos;s Premium Drops</h2>
                                <p className="text-[#1E4D35]/40 font-bold flex items-center justify-center md:justify-start gap-2 mt-1 text-sm lg:text-base">
                                    <Star size={14} className="text-[#F5E74E] fill-[#F5E74E]" /> 4.9 Rating (428 Reviews)
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative z-10">
                            <div className="space-y-2">
                                <label className="text-[10px] lg:text-[11px] font-black text-[#1E4D35]/30 uppercase tracking-widest ml-1">Store Heading</label>
                                <div className="p-5 lg:p-6 bg-[#F5F7F6] rounded-[20px] lg:rounded-[24px] font-bold text-[#1E4D35] text-sm lg:text-base">Curated High-End Tech & Lifestyle Essentials</div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] lg:text-[11px] font-black text-[#1E4D35]/30 uppercase tracking-widest ml-1">Featured Categories</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Audio', 'Home Tech', 'Luxury'].map(c => (
                                        <span key={c} className="px-4 py-2 lg:px-5 lg:py-2.5 bg-[#1E4D35] text-[#F5E74E] rounded-full text-[10px] lg:text-[11px] font-black uppercase tracking-wider">{c}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shop Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        <div className="bg-white rounded-[28px] lg:rounded-[32px] p-6 lg:p-8 border border-[#1E4D35]/5 shadow-sm hover:shadow-md transition-all group">
                            <Users className="text-[#1E4D35]/20 group-hover:text-[#1E4D35]/40 transition-colors mb-4" size={32} />
                            <h3 className="text-2xl lg:text-3xl font-bold text-[#1E4D35] tracking-tight">2.4k</h3>
                            <p className="text-[10px] lg:text-[11px] font-black text-[#1E4D35]/40 uppercase tracking-widest mt-1">Store Followers</p>
                        </div>
                        <div className="bg-white rounded-[28px] lg:rounded-[32px] p-6 lg:p-8 border border-[#1E4D35]/5 shadow-sm hover:shadow-md transition-all group">
                            <ShoppingBag className="text-[#1E4D35]/20 group-hover:text-[#1E4D35]/40 transition-colors mb-4" size={32} />
                            <h3 className="text-2xl lg:text-3xl font-bold text-[#1E4D35] tracking-tight">12.5%</h3>
                            <p className="text-[10px] lg:text-[11px] font-black text-[#1E4D35]/40 uppercase tracking-widest mt-1">Conversion Rate</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 lg:space-y-10">
                    <div className="bg-[#1E4D35] rounded-[32px] lg:rounded-[40px] p-8 lg:p-10 text-white shadow-2xl shadow-[#1E4D35]/20 flex flex-col items-center text-center group">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-[#F5E74E]/20 rounded-[24px] lg:rounded-[28px] flex items-center justify-center text-[#F5E74E] mb-6 lg:mb-8 group-hover:scale-110 transition-transform duration-500">
                            <ArrowUpRight size={40} />
                        </div>
                        <h3 className="text-xl lg:text-2xl font-black font-display mb-3 lg:mb-4">Go Global</h3>
                        <p className="text-white/60 font-bold text-xs lg:text-sm leading-relaxed mb-6 lg:mb-8">Your shop is currently only visible in Asia. Upgrade to Global Tier to reach customers in EU and USA.</p>
                        <button
                            onClick={() => {
                                alert("Tier upgrade panel coming soon!");
                            }}
                            className="w-full py-4 lg:py-5 bg-[#F5E74E] text-[#1E4D35] rounded-full font-black text-xs lg:text-sm uppercase tracking-widest hover:scale-[1.05] active:scale-95 transition-all shadow-xl shadow-black/20"
                        >
                            Expand Globally
                        </button>
                    </div>

                    <div className="bg-white rounded-[32px] lg:rounded-[40px] p-6 lg:p-8 shadow-sm border border-[#1E4D35]/5">
                        <h4 className="font-black text-[#1E4D35] text-center uppercase tracking-[0.2em] text-[10px] lg:text-[11px] mb-6 lg:mb-8 opacity-40">Store Banner</h4>
                        <button
                            onClick={() => {
                                const input = document.createElement('input');
                                input.type = 'file';
                                input.accept = 'image/*';
                                input.onchange = (e: any) => {
                                    const file = e.target.files[0];
                                    if (file) alert(`Selected file: ${file.name}`);
                                };
                                input.click();
                            }}
                            className="w-full aspect-video bg-[#F5F7F6] rounded-[24px] lg:rounded-[28px] border-2 border-dashed border-[#1E4D35]/10 flex flex-col items-center justify-center text-[#1E4D35]/30 hover:bg-[#1E4D35]/5 hover:border-[#F5E74E]/30 transition-all group"
                        >
                            <Store size={28} className="mb-2 opacity-50 group-hover:scale-110 group-hover:text-[#1E4D35] transition-all" />
                            <p className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest">Update Banner</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
