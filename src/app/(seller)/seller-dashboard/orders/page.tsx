"use client";

import { motion } from "framer-motion";
import { Search, ExternalLink, Calendar, MapPin, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function OrdersPage() {
    const [search, setSearch] = useState("");

    // Mock seller orders for the UI
    const orders = [
        { id: "ORD-9482", customer: "Sarah Jenkins", location: "New York, USA", date: "Today, 10:23 AM", total: 348.00, items: 1, status: "Processing" },
        { id: "ORD-9481", customer: "Michael Chang", location: "San Francisco, USA", date: "Yesterday", total: 109.50, items: 1, status: "Shipped" },
        { id: "ORD-9480", customer: "Elena Rostova", location: "London, UK", date: "Oct 24, 2023", total: 498.99, items: 2, status: "Delivered" },
        { id: "ORD-9479", customer: "David Wallace", location: "Austin, USA", date: "Oct 22, 2023", total: 149.99, items: 1, status: "Delivered" },
        { id: "ORD-9478", customer: "Amanda Chen", location: "Toronto, CA", date: "Oct 20, 2023", total: 99.99, items: 1, status: "Cancelled" },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Processing": return <span className="badge badge-warning flex items-center gap-1.5"><Clock className="w-3 h-3" /> Processing</span>;
            case "Shipped": return <span className="badge bg-blue-50 text-blue-600 border border-blue-200 flex items-center gap-1.5"><ExternalLink className="w-3 h-3" /> Shipped</span>;
            case "Delivered": return <span className="badge badge-success flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" /> Delivered</span>;
            case "Cancelled": return <span className="badge badge-danger flex items-center gap-1.5"><AlertCircle className="w-3 h-3" /> Cancelled</span>;
            default: return <span className="badge">{status}</span>;
        }
    };

    return (
        <div className="space-y-8 page-enter">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-brand-textPrimary font-poppins">Order History</h1>
                <p className="text-[15px] text-brand-textSecondary mt-1">You have {orders.filter(o => o.status === "Processing").length} orders waiting to be processed.</p>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-2xl p-4 border border-brand-border flex items-center justify-between shadow-sm">
                <div className="relative w-full max-w-sm">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search order ID or customer..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand-primary"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-bold text-brand-textSecondary bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100">
                        Date Range
                    </button>
                    <button className="px-4 py-2 text-sm font-bold text-brand-textSecondary bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100">
                        Status Filter
                    </button>
                </div>
            </div>

            {/* Orders List (Cards for wider layout) */}
            <div className="space-y-4">
                {orders.map((o, i) => (
                    <motion.div key={o.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        className="bg-white border border-brand-border rounded-2xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:shadow-md transition-shadow">

                        <div className="flex items-start gap-6">
                            <div className="w-14 h-14 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center font-bold font-poppins text-brand-primary">
                                {o.items}x
                            </div>
                            <div>
                                <h3 className="text-lg font-bold font-poppins text-brand-textPrimary">{o.id}</h3>
                                <div className="flex items-center gap-4 mt-2 text-[14px] text-brand-textSecondary">
                                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {o.date}</span>
                                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {o.location}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between lg:justify-end gap-8 w-full lg:w-auto border-t lg:border-t-0 border-gray-100 pt-4 lg:pt-0">
                            <div className="text-left lg:text-right">
                                <p className="text-sm font-bold text-brand-textSecondary uppercase tracking-wider mb-1">Customer</p>
                                <p className="font-bold text-brand-textPrimary">{o.customer}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-brand-textSecondary uppercase tracking-wider mb-1">Total</p>
                                <p className="text-xl font-black font-poppins text-brand-primary">${o.total.toFixed(2)}</p>
                            </div>
                            <div className="w-[120px] flex justify-end">
                                {getStatusBadge(o.status)}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
