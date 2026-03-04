"use client";

import { motion } from "framer-motion";
import {
    Search,
    ChevronRight,
    Calendar,
    MapPin,
    CheckCircle2,
    Clock,
    AlertCircle,
    User,
    Package,
    ArrowUpDown,
    Filter
} from "lucide-react";
import { useState } from "react";

export default function OrdersPage() {
    const [search, setSearch] = useState("");

    const orders = [
        { id: "#DD-8942", customer: "Sarah Jenkins", location: "New York, USA", date: "Oct 12, 2023", total: 348.00, items: 1, status: "SHIPPED", statusColor: "bg-green-100 text-green-600" },
        { id: "#DD-8941", customer: "Michael Chang", location: "San Francisco, USA", date: "Oct 12, 2023", total: 109.50, items: 1, status: "PENDING", statusColor: "bg-yellow-100 text-yellow-600" },
        { id: "#DD-8940", customer: "Elena Rostova", location: "London, UK", date: "Oct 11, 2023", total: 498.99, items: 2, status: "PROCESSING", statusColor: "bg-blue-100 text-blue-600" },
        { id: "#DD-8939", customer: "David Wallace", location: "Austin, USA", date: "Oct 10, 2023", total: 149.99, items: 1, status: "SHIPPED", statusColor: "bg-green-100 text-green-600" },
        { id: "#DD-8938", customer: "Amanda Chen", location: "Toronto, CA", date: "Oct 09, 2023", total: 99.99, items: 1, status: "CANCELLED", statusColor: "bg-red-100 text-red-600" },
    ];

    return (
        <div className="space-y-10">
            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-display font-black text-[#1E4D35] tracking-tight">Order Management</h1>
                    <p className="text-[#1E4D35]/40 font-bold mt-1 text-[15px]">You have {orders.filter(o => o.status === "PENDING").length} orders pending fulfillment.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-8 py-5 rounded-full bg-white text-[#1E4D35] font-black shadow-sm shadow-[#1E4D35]/10 border border-[#1E4D35]/5 hover:bg-[#F5F7F6] transition-all">
                        <Calendar size={18} /> Schedule
                    </button>
                    <button className="flex items-center gap-2 px-8 py-5 rounded-full bg-[#1E4D35] text-[#F5E74E] font-black shadow-xl shadow-[#1E4D35]/20 hover:scale-[1.05] transition-all">
                        Export Report
                    </button>
                </div>
            </div>

            {/* ── Search & Filter ── */}
            <div className="bg-white rounded-[32px] p-6 shadow-sm shadow-[#1E4D35]/5 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1E4D35]/30" size={18} />
                    <input
                        type="text"
                        placeholder="Search by Order ID or customer name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-[#F5F7F6] border-2 border-transparent focus:border-[#F5E74E]/40 rounded-2xl py-3.5 pl-14 pr-6 text-sm font-bold outline-none transition-all placeholder:text-[#1E4D35]/20"
                    />
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#F5F7F6] text-[#1E4D35] font-black text-sm hover:bg-[#1E4D35]/5 transition-all">
                        <Filter size={18} /> All Status
                    </button>
                </div>
            </div>

            {/* ── Orders Table ── */}
            <div className="bg-white rounded-[40px] shadow-sm shadow-[#1E4D35]/5 border border-[#1E4D35]/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#F5F7F6]/50 border-b border-[#1E4D35]/5">
                                <th className="py-7 px-10 text-[11px] font-black text-[#1E4D35]/30 uppercase tracking-[0.2em]">Order Detail</th>
                                <th className="py-7 px-10 text-[11px] font-black text-[#1E4D35]/30 uppercase tracking-[0.2em]">Customer</th>
                                <th className="py-7 px-10 text-[11px] font-black text-[#1E4D35]/30 uppercase tracking-[0.2em] text-center">Amount</th>
                                <th className="py-7 px-10 text-[11px] font-black text-[#1E4D35]/30 uppercase tracking-[0.2em] text-center">Status</th>
                                <th className="py-7 px-10 text-[11px] font-black text-[#1E4D35]/30 uppercase tracking-[0.2em] text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1E4D35]/5">
                            {orders.map((o, i) => (
                                <motion.tr
                                    key={o.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group hover:bg-[#F5F7F6]/50 transition-all duration-300"
                                >
                                    <td className="py-8 px-10">
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 bg-white border border-[#1E4D35]/5 rounded-2xl flex items-center justify-center font-black text-[#1E4D35] group-hover:bg-[#F5E74E] transition-all">
                                                {o.items}x
                                            </div>
                                            <div>
                                                <p className="font-black text-[16px] text-[#1E4D35] leading-tight mb-1">{o.id}</p>
                                                <p className="text-[11px] font-black text-[#1E4D35]/30 tracking-widest uppercase flex items-center gap-1.5 pt-0.5">
                                                    <Calendar size={12} /> {o.date}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-8 px-10">
                                        <div>
                                            <p className="font-black text-[15px] text-[#1E4D35] mb-1">{o.customer}</p>
                                            <p className="text-[11px] font-bold text-[#1E4D35]/30 flex items-center gap-1.5">
                                                <MapPin size={12} /> {o.location}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="py-8 px-10 text-center font-black text-xl text-[#1E4D35] font-display">
                                        ${o.total.toFixed(2)}
                                    </td>
                                    <td className="py-8 px-10 text-center">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${o.statusColor}`}>
                                            {o.status}
                                        </span>
                                    </td>
                                    <td className="py-8 px-10 text-right">
                                        <button className="w-12 h-12 bg-[#F5F7F6] rounded-2xl flex items-center justify-center text-[#1E4D35]/30 hover:bg-[#1E4D35] hover:text-white transition-all ml-auto">
                                            <ChevronRight size={20} />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
