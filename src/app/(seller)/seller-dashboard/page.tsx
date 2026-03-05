"use client";

import { motion } from "framer-motion";
import {
    DollarSign,
    ShoppingBag,
    ArrowUpRight,
    ArrowDownRight,
    Star,
    Box,
    AlertCircle,
    ChevronRight,
    TrendingUp,
    PlusCircle,
    Monitor,
    Watch,
    Coffee,
    MoreHorizontal
} from "lucide-react";
import Link from "next/link";

export default function SellerDashboard() {
    const stats = [
        {
            label: "Total Sales",
            value: "$12,840.00",
            icon: <DollarSign size={20} />,
            trend: "+12.5%",
            trendUp: true,
            iconBg: "bg-[#24583C]/5",
            iconColor: "text-[#24583C]",
            orbColor: "bg-[#24583C]/10"
        },
        {
            label: "Total Orders",
            value: "456",
            icon: <ShoppingBag size={20} />,
            trend: "+8.2%",
            trendUp: true,
            iconBg: "bg-[#B6B7F4]/10",
            iconColor: "text-[#B6B7F4]",
            orbColor: "bg-[#B6B7F4]/10"
        },
        {
            label: "Active Listings",
            value: "82",
            icon: <Box size={20} />,
            trend: "Stable",
            trendUp: null,
            iconBg: "bg-[#F5E74E]/30",
            iconColor: "text-[#1E4D35]",
            orbColor: "bg-[#F5E74E]/10"
        },
        {
            label: "Customer Satisfaction",
            value: "4.8/5",
            icon: <Star size={20} />,
            trend: "+0.5%",
            trendUp: true,
            iconBg: "bg-blue-500/10",
            iconColor: "text-blue-500",
            orbColor: "bg-blue-500/10"
        },
    ];

    const orders = [
        { id: "#DD-8942", product: "Pro Wireless Audio", icon: <Monitor size={18} />, date: "Oct 12, 2023", amount: "$249.00", status: "SHIPPED", statusColor: "bg-green-100 text-green-600" },
        { id: "#DD-8941", product: "Smart Chrono V2", icon: <Watch size={18} />, date: "Oct 12, 2023", amount: "$189.99", status: "PENDING", statusColor: "bg-yellow-100 text-yellow-600" },
        { id: "#DD-8940", product: "BrewMaster Elite", icon: <Coffee size={18} />, date: "Oct 11, 2023", amount: "$129.50", status: "PROCESSING", statusColor: "bg-blue-100 text-blue-600" },
    ];

    const alerts = [
        { item: "Ergo Chair Lite", info: "Only 2 items remaining", type: "critical" },
        { item: "USB-C Hub (7-in-1)", info: "Only 8 items remaining", type: "warning" },
        { item: "Minimalist Desk Lamp", info: "Stock reaching threshold (15)", type: "info" },
    ];

    return (
        <div className="space-y-10">
            {/* ── Stats Grid ───────────────────────────────────── */}
            {/* ── Stats Grid ───────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                        className="bg-white rounded-[24px] p-6 shadow-sm border border-[#1E4D35]/5 hover:border-[#1E4D35]/10 transition-all relative overflow-hidden group shadow-[#1E4D35]/5"
                    >
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className={`w-11 h-11 ${stat.iconBg} ${stat.iconColor} rounded-[14px] flex items-center justify-center relative overflow-hidden`}>
                                <div className={`absolute inset-0 ${stat.orbColor} blur-lg scale-150`}></div>
                                <div className="relative z-10 scale-90">{stat.icon}</div>
                            </div>
                            <div className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${stat.trendUp === true ? "bg-green-50 text-green-600" :
                                stat.trendUp === false ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-500"
                                }`}>
                                {stat.trendUp === true && <ArrowUpRight size={12} />}
                                {stat.trendUp === false && <ArrowDownRight size={12} />}
                                {stat.trend}
                            </div>
                        </div>
                        <div className="relative z-10">
                            <p className="text-slate-400 text-[13px] font-bold mb-1 tracking-tight">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-[#1E4D35] font-sans">{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ── Main Content Grid ────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">

                {/* Left Column: Latest Orders */}
                <div className="lg:col-span-2 bg-white rounded-[28px] lg:rounded-[32px] p-6 lg:p-8 shadow-sm shadow-[#1E4D35]/5 flex flex-col border border-[#1E4D35]/5">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg lg:text-xl font-black text-[#1E4D35] font-display tracking-tight">Latest Orders</h3>
                        <Link href="/seller-dashboard/orders" className="text-[10px] font-black text-[#1E4D35]/30 uppercase tracking-[0.2em] hover:text-[#1E4D35] transition-colors flex items-center gap-1">
                            Full History <ChevronRight size={14} />
                        </Link>
                    </div>

                    <div className="overflow-x-auto flex-1 -mx-2 px-2 pb-2">
                        <table className="w-full min-w-[600px]">
                            <thead>
                                <tr className="text-left text-[10px] font-black text-[#1E4D35]/20 uppercase tracking-[0.2em] border-b border-[#1E4D35]/5">
                                    <th className="pb-5">ID</th>
                                    <th className="pb-5">Product</th>
                                    <th className="pb-5 text-center">Amount</th>
                                    <th className="pb-5 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1E4D35]/5">
                                {orders.map((order) => (
                                    <tr key={order.id} className="group transition-colors">
                                        <td className="py-6 font-bold text-[14px] text-[#1E4D35]/60">{order.id}</td>
                                        <td className="py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-[#F5F7F6] rounded-xl flex items-center justify-center text-[#1E4D35]/30 group-hover:bg-[#1E4D35] group-hover:text-[#F5E74E] transition-all duration-300">
                                                    {order.icon}
                                                </div>
                                                <span className="font-bold text-[14px] text-[#1E4D35] truncate max-w-[150px]">{order.product}</span>
                                            </div>
                                        </td>
                                        <td className="py-6 text-center font-bold text-[14px] text-[#1E4D35]">{order.amount}</td>
                                        <td className="py-6 text-right">
                                            <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${order.statusColor}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Column: Stock Alerts */}
                <div className="bg-white rounded-[28px] lg:rounded-[32px] p-6 lg:p-8 shadow-sm shadow-[#1E4D35]/5 flex flex-col h-full overflow-hidden border border-[#1E4D35]/5">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg lg:text-xl font-black text-[#1E4D35] font-display tracking-tight">Stock Alerts</h3>
                        <span className="bg-[#F83737] text-white text-[9px] font-black px-3 py-1 rounded-full tracking-wider uppercase">3 Critical</span>
                    </div>

                    <div className="space-y-4 flex-1">
                        {alerts.map((alert, i) => (
                            <div key={i} className={`p-4 lg:p-5 rounded-[22px] lg:rounded-[24px] border transition-all hover:translate-x-1 cursor-pointer group ${alert.type === 'critical' ? "bg-red-50/40 border-red-100/50" :
                                alert.type === 'warning' ? "bg-yellow-50/40 border-yellow-100/50" : "bg-[#F5F7F6] border-transparent"
                                }`}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 lg:w-11 lg:h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${alert.type === 'critical' ? "bg-[#F83737] text-white" :
                                        alert.type === 'warning' ? "bg-[#F5E74E] text-[#1E4D35]" : "bg-[#1E4D35] text-white"
                                        }`}>
                                        <AlertCircle size={18} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-[13px] lg:text-[14px] text-[#1E4D35] truncate">{alert.item}</p>
                                        <p className={`text-[10px] lg:text-[11px] font-bold ${alert.type === 'critical' ? "text-[#F83737]" :
                                            alert.type === 'warning' ? "text-yellow-700" : "text-[#1E4D35]/40"
                                            }`}>{alert.info}</p>
                                    </div>
                                    <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-lg bg-white/50 flex items-center justify-center text-[#1E4D35]/20 group-hover:text-[#1E4D35]/40 transition-colors">
                                        <ChevronRight size={14} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="mt-8 w-full border-2 border-dashed border-[#1E4D35]/10 rounded-2xl py-4 text-[10px] font-black text-[#1E4D35]/40 uppercase tracking-[0.2em] hover:bg-[#1E4D35]/5 hover:border-[#1E4D35]/20 hover:text-[#1E4D35] transition-all">
                        Check All Inventory
                    </button>
                </div>
            </div>

            {/* ── Bottom Grow Banner ─────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-[#24583C] rounded-[32px] lg:rounded-[48px] p-8 lg:p-16 text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 group"
            >
                {/* Glow Decoration */}
                <div className="absolute -right-20 -top-20 w-[400px] h-[400px] bg-[#F5E74E]/10 blur-[100px] rounded-full group-hover:bg-[#F5E74E]/20 transition-all duration-1000"></div>
                <div className="absolute -left-20 -bottom-20 w-[300px] h-[300px] bg-white/5 blur-[80px] rounded-full"></div>

                <div className="relative z-10 max-w-xl text-center lg:text-left">
                    <h2 className="text-3xl md:text-5xl font-black font-display leading-[1.1] mb-6 lg:mb-8 tracking-tight">
                        Ready to grow<br />your shop?
                    </h2>
                    <p className="text-white/60 text-[14px] lg:text-[15px] leading-relaxed font-bold max-w-md mx-auto lg:mx-0">
                        Our AI-powered analytics recommend adding at least 5 more products in the <span className="text-[#F5E74E]">&apos;Home Decor&apos;</span> category to increase visibility by <span className="text-[#F5E74E]">20%</span>.
                    </p>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="relative w-64 h-48 mb-6 hidden lg:block">
                        <div className="absolute bottom-4 right-12 w-32 h-32 bg-[#F5E74E] text-[#1E4D35] rounded-[32px] rotate-[-8deg] flex items-center justify-center shadow-2xl transition-transform group-hover:rotate-0 duration-500">
                            <PlusCircle size={56} />
                        </div>
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 backdrop-blur-md rounded-[24px] rotate-12 flex items-center justify-center border border-white/20">
                            <Box size={32} />
                        </div>
                    </div>
                    <Link href="/seller-dashboard/add-product" className="group/btn inline-flex items-center gap-4 bg-[#F5E74E] text-[#1E4D35] font-black text-[15px] lg:text-[17px] px-10 lg:px-14 py-5 lg:py-6 rounded-full hover:scale-[1.05] active:scale-95 transition-all shadow-2xl shadow-black/20 text-center">
                        Add New Product <PlusCircle size={20} className="group-hover/btn:rotate-90 transition-transform duration-300" />
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
