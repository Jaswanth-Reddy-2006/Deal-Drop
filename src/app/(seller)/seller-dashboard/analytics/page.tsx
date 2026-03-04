"use client";

import { motion } from "framer-motion";
import {
    BarChart3,
    TrendingUp,
    Users,
    ShoppingBag,
    ArrowUpRight,
    MousePointer2,
    Calendar,
    ChevronDown,
    Globe
} from "lucide-react";

export default function AnalyticsPage() {
    const mainStats = [
        { label: "Total Views", value: "84.2k", trend: "+14.2%", icon: <Users size={20} /> },
        { label: "Click Rate", value: "3.8%", trend: "+2.1%", icon: <MousePointer2 size={20} /> },
        { label: "Orders", value: "1,240", trend: "+8.4%", icon: <ShoppingBag size={20} /> },
        { label: "Revenue", value: "$42.5k", trend: "+12.1%", icon: <BarChart3 size={20} /> },
    ];

    return (
        <div className="space-y-10">
            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-display font-black text-[#1E4D35] tracking-tight">Analytics</h1>
                    <p className="text-[#1E4D35]/40 font-bold mt-1 text-[15px]">Detailed insights into your store performance.</p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white text-[#1E4D35] font-black border border-[#1E4D35]/5 shadow-sm">
                        <Calendar size={18} /> Last 30 Days <ChevronDown size={14} />
                    </button>
                    <button className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#1E4D35] text-[#F5E74E] font-black shadow-xl shadow-[#1E4D35]/20 hover:scale-[1.05] transition-all">
                        Download PDF
                    </button>
                </div>
            </div>

            {/* ── Stats Grid ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {mainStats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-[32px] p-8 shadow-sm border border-[#1E4D35]/5 group hover:border-[#F5E74E]/30 transition-all"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-12 h-12 bg-[#1E4D35]/5 rounded-2xl flex items-center justify-center text-[#1E4D35] transition-all group-hover:bg-[#1E4D35] group-hover:text-[#F5E74E]">
                                {stat.icon}
                            </div>
                            <span className="text-[11px] font-black text-green-500 bg-green-50 px-3 py-1.5 rounded-full flex items-center gap-1">
                                <ArrowUpRight size={12} /> {stat.trend}
                            </span>
                        </div>
                        <h3 className="text-3xl font-black text-[#1E4D35] font-display">{stat.value}</h3>
                        <p className="text-[11px] font-black text-[#1E4D35]/30 uppercase tracking-widest mt-1">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* ── Visual Charts Placeholder ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 bg-white rounded-[40px] p-10 shadow-sm border border-[#1E4D35]/5 h-[400px] flex flex-col">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-xl font-black text-[#1E4D35] font-display">Sales Performance</h3>
                        <div className="flex gap-2">
                            <div className="w-3 h-3 bg-[#1E4D35] rounded-full"></div>
                            <div className="w-3 h-3 bg-[#F5E74E] rounded-full"></div>
                        </div>
                    </div>
                    <div className="flex-1 w-full bg-[#F5F7F6] rounded-[32px] flex items-center justify-center relative overflow-hidden">
                        {/* Mock Chart Lines */}
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#1E4D35 1px, transparent 1px), linear-gradient(90deg, #1E4D35 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                        <TrendingUp size={64} className="text-[#1E4D35]/10" />
                        <p className="absolute bottom-8 text-[11px] font-black text-[#1E4D35]/20 uppercase tracking-[0.3em]">Interactive data visualization processing...</p>
                    </div>
                </div>

                <div className="bg-white rounded-[40px] p-10 shadow-sm border border-[#1E4D35]/5 flex flex-col">
                    <h3 className="text-xl font-black text-[#1E4D35] font-display mb-10">Geographic Spread</h3>
                    <div className="space-y-8 flex-1">
                        {[
                            { country: "India", value: "42%", color: "#1E4D35" },
                            { country: "USA", value: "28%", color: "#F5E74E" },
                            { country: "UK", value: "15%", color: "#B6B7F4" },
                            { country: "Others", value: "15%", color: "#E2E8F0" },
                        ].map(loc => (
                            <div key={loc.country} className="space-y-2">
                                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                                    <span className="text-[#1E4D35]/60">{loc.country}</span>
                                    <span className="text-[#1E4D35]">{loc.value}</span>
                                </div>
                                <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: loc.value, backgroundColor: loc.color }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 pt-10 border-t border-[#1E4D35]/5 flex items-center gap-4 text-[#1E4D35]">
                        <Globe size={20} className="opacity-20" />
                        <p className="text-[11px] font-black uppercase tracking-widest opacity-40">Global Traffic Active</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
