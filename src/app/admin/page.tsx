"use client";

import { useEffect, useState } from "react";
import {
    Users, ArrowUpRight, ArrowDownRight,
    Clock, DollarSign, ShoppingBag, TrendingUp, AlertCircle, ChevronRight,
    Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface DashboardStats {
    revenue: number;
    orders: number;
    customers: number;
    products: number;
    growth: number;
}

export default function AdminDashboardOverview() {
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<DashboardStats | null>(null);

    useEffect(() => {
        setMounted(true);
        // Simulate data fetching
        setTimeout(() => {
            setStats({
                revenue: 52400,
                orders: 124,
                customers: 850,
                products: 42,
                growth: 12.5
            });
            setLoading(false);
        }, 1000);
    }, []);

    if (!mounted || loading || !stats) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="w-10 h-10 text-brand-primary animate-spin" />
                <p className="text-brand-textSecondary mt-4 font-bold uppercase tracking-widest text-[10px]">Loading Dashboard Engine...</p>
            </div>
        );
    }

    const cards = [
        { label: "Total Revenue", value: `$${stats.revenue.toLocaleString()}`, icon: <DollarSign />, trend: "+14.2%", positive: true },
        { label: "Active Orders", value: stats.orders, icon: <ShoppingBag />, trend: "+5.1%", positive: true },
        { label: "Total Customers", value: stats.customers, icon: <Users />, trend: "+2.4%", positive: true },
        { label: "Market Growth", value: `${stats.growth}%`, icon: <TrendingUp />, trend: "Steady", positive: true },
    ];

    const recentOrders = [
        { id: "#NC-9281", customer: "Alex Rivers", amount: 259.00, status: "Processing", time: "2m ago" },
        { id: "#NC-9275", customer: "Sarah Chen", amount: 124.50, status: "Shipped", time: "14m ago" },
        { id: "#NC-9260", customer: "Mike Ross", amount: 45.00, status: "Delivered", time: "1h ago" },
        { id: "#NC-9255", customer: "Elena Gilbert", amount: 890.00, status: "Processing", time: "3h ago" },
    ];

    return (
        <div className="space-y-10 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-extrabold text-brand-textPrimary font-poppins">Admin Intelligence</h1>
                    <p className="text-brand-textSecondary mt-1">Real-time performance analytics and operations.</p>
                </div>
                <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-brand-border shadow-sm">
                    <span className="text-[10px] font-bold text-brand-textSecondary uppercase tracking-widest">System Status</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-bold text-brand-textPrimary">All Systems Operational</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, i) => (
                    <motion.div
                        key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        className="card-premium bg-white p-6 rounded-[32px] border border-brand-border shadow-sm group hover:border-brand-primary transition-all"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 bg-brand-bg rounded-2xl flex items-center justify-center text-brand-textSecondary group-hover:bg-brand-primary group-hover:text-white transition-all">
                                {card.icon}
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-tight ${card.positive ? 'text-green-600' : 'text-red-500'}`}>
                                {card.trend} {card.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            </div>
                        </div>
                        <p className="text-xs font-bold text-brand-textSecondary uppercase tracking-widest">{card.label}</p>
                        <h3 className="text-3xl font-bold text-brand-textPrimary font-poppins mt-1">{card.value}</h3>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Performance Chart Mockup */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="card-premium bg-white p-10 rounded-[40px] border border-brand-border shadow-sm aspect-[16/9] flex flex-col">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h2 className="text-xl font-bold text-brand-textPrimary font-poppins">Revenue Visualization</h2>
                                <p className="text-sm text-brand-textSecondary">Volume trends over the last 30 days.</p>
                            </div>
                            <select className="bg-brand-bg text-brand-textPrimary text-xs font-bold border-none rounded-xl px-4 py-2 outline-none cursor-pointer">
                                <option>Last 30 Days</option>
                                <option>Last 6 Months</option>
                            </select>
                        </div>
                        {/* CHART MOCKUP - Animated SVG */}
                        <div className="flex-1 w-full bg-brand-bg/50 rounded-3xl relative overflow-hidden flex items-end px-8 pb-4 gap-4">
                            {[40, 70, 45, 90, 65, 80, 55, 100, 85, 95, 75, 110].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ duration: 0.8, delay: i * 0.05 }}
                                    className="flex-1 bg-gradient-to-t from-brand-primary to-blue-400 rounded-t-lg relative group"
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-brand-textPrimary text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        ${(h * 120).toLocaleString()}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-6 px-4">
                            {["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"].map(m => (
                                <span key={m} className="text-[10px] font-bold text-brand-textSecondary">{m}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Content: Live Feed & Notifications */}
                <div className="space-y-8">
                    {/* Recent Orders */}
                    <div className="card-premium bg-white p-8 rounded-[40px] border border-brand-border shadow-sm">
                        <h2 className="text-xl font-bold text-brand-textPrimary font-poppins mb-6">Recent Activity</h2>
                        <div className="space-y-6">
                            {recentOrders.map((order, i) => (
                                <div key={i} className="flex gap-4 items-center">
                                    <div className="w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center shrink-0">
                                        <Clock className="w-5 h-5 text-brand-textSecondary" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-brand-textPrimary">{order.customer}</p>
                                        <p className="text-xs text-brand-textSecondary">{order.id} • {order.time}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-brand-textPrimary">${order.amount.toFixed(2)}</p>
                                        <span className={`text-[10px] font-bold uppercase tracking-tighter ${order.status === 'Shipped' ? 'text-blue-500' : order.status === 'Delivered' ? 'text-green-500' : 'text-orange-500'}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-3 bg-brand-bg hover:bg-brand-primary/10 text-brand-primary text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                            View All Operations <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Alerts/Urgency */}
                    <div className="bg-brand-danger/5 border-2 border-brand-danger/20 rounded-[40px] p-8 space-y-4">
                        <div className="flex items-center gap-3 text-brand-danger mb-2">
                            <AlertCircle className="w-5 h-5" />
                            <h3 className="font-bold font-poppins">Stock Critical</h3>
                        </div>
                        <p className="text-sm text-brand-textSecondary leading-relaxed">
                            3 premium SKUs are currently below the safety threshold and risk stock-out.
                        </p>
                        <Link href="/admin/products" className="block text-center py-3 bg-brand-danger text-white text-xs font-bold rounded-xl shadow-lg shadow-brand-danger/20 hover:bg-red-700 transition-all">
                            Restock Engine
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
