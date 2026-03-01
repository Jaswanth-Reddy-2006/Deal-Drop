"use client";

import { motion } from "framer-motion";
import { DollarSign, Package, ShoppingBag, TrendingUp, ArrowUpRight, ArrowDownRight, Star } from "lucide-react";

export default function SellerDashboard() {
    const stats = [
        { label: "Total Earnings", value: "$12,450.00", icon: <DollarSign />, trend: "+12.5%", color: "text-green-600", bg: "bg-green-100" },
        { label: "Active Products", value: "24", icon: <Package />, trend: "+2", color: "text-blue-600", bg: "bg-blue-100" },
        { label: "Total Orders", value: "156", icon: <ShoppingBag />, trend: "+8.4%", color: "text-brand-primary", bg: "bg-brand-primary/10" },
        { label: "Avg. Rating", value: "4.8", icon: <Star />, trend: "+0.2", color: "text-yellow-600", bg: "bg-yellow-100" },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-brand-textPrimary font-poppins">Dashboard</h1>
                    <p className="text-[15px] text-brand-textSecondary mt-1">Store performance is up 12% this week.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[13px] font-bold text-green-700">Store Active</span>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat, i) => (
                    <motion.div key={stat.label}
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                        className="bg-white border border-brand-border rounded-2xl p-6 flex flex-col gap-4 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 transition-all">
                        <div className="flex items-center justify-between">
                            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                                {stat.icon}
                            </div>
                            <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                }`}>
                                {stat.trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {stat.trend}
                            </div>
                        </div>
                        <div>
                            <p className="text-2xl font-black font-poppins text-brand-textPrimary">{stat.value}</p>
                            <p className="text-[11px] font-bold text-brand-textSecondary uppercase tracking-widest mt-1">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Performance + Tips */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-brand-border space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold font-poppins text-brand-textPrimary flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-brand-primary" /> Weekly Sales
                        </h3>
                        <span className="badge-primary">This Week</span>
                    </div>
                    {/* Mini bar chart */}
                    <div className="flex items-end gap-3 h-36">
                        {[40, 65, 45, 80, 55, 90, 72].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }}
                                    transition={{ delay: i * 0.06, duration: 0.5 }}
                                    className="w-full bg-brand-primary/20 hover:bg-brand-primary rounded-t-lg transition-colors cursor-pointer"
                                    style={{ height: `${h}%` }} />
                                <span className="text-[10px] font-bold text-brand-textSecondary">{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-brand-textPrimary rounded-3xl p-8 text-white space-y-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-brand-primary/20 blur-[60px] rounded-full pointer-events-none" />
                    <h3 className="text-[17px] font-bold font-poppins relative z-10">Growth Tips</h3>
                    <div className="space-y-4 relative z-10">
                        {[
                            { title: "Add Tags", desc: "Tagging products boosts category visibility by 40%." },
                            { title: "Price Competitively", desc: "Products priced within 10% of category average sell 2x faster." },
                            { title: "Upload More Images", desc: "Listings with 3+ images get 80% more clicks." },
                        ].map((tip, i) => (
                            <div key={i} className="p-4 bg-white/8 border border-white/10 rounded-2xl">
                                <p className="text-[13px] font-bold text-brand-primary mb-1">{tip.title}</p>
                                <p className="text-[12px] text-white/60 leading-relaxed">{tip.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

