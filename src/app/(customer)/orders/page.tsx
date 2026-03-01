"use client";

import { motion } from "framer-motion";
import { Package, Truck, CheckCircle, Clock, ArrowLeft, ExternalLink, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
    // Enhanced Mock Orders with thumbnails
    const orders = [
        {
            id: "NC-92834-X",
            date: "Feb 24, 2026",
            status: "Delivered",
            total: 314.99,
            tracking: "TRACK-99120",
            items: [
                { name: "Ergo Mech Keyboard Pro", price: 199.00, image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=200" },
                { name: "Smart Vision Desk Lamp", price: 115.99, image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=200" }
            ],
            currentStep: 4 // Delivered
        },
        {
            id: "NC-11029-Y",
            date: "Feb 28, 2026",
            status: "In Transit",
            total: 149.00,
            tracking: "TRACK-55412",
            items: [
                { name: "Quantum Audio Buds", price: 149.00, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=200" }
            ],
            currentStep: 3 // Shipped
        }
    ];

    const steps = [
        { label: "Confirmed", icon: <CheckCircle className="w-4 h-4" /> },
        { label: "Processing", icon: <Clock className="w-4 h-4" /> },
        { label: "Shipped", icon: <Truck className="w-4 h-4" /> },
        { label: "Delivered", icon: <Package className="w-4 h-4" /> },
    ];

    return (
        <div className="bg-[#F8FAFC] min-h-screen pb-32">
            <div className="container-main py-12">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                        <div>
                            <Link href="/profile" className="inline-flex items-center gap-2 text-brand-textSecondary hover:text-brand-primary mb-4 transition-colors font-bold text-sm">
                                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                            </Link>
                            <h1 className="text-4xl font-extrabold text-brand-textPrimary font-poppins">Order History</h1>
                        </div>
                        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-brand-border shadow-sm">
                            <span className="text-xs font-bold text-brand-textSecondary uppercase tracking-widest">Global Support</span>
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-bold text-brand-textPrimary">24/7 Priority</span>
                        </div>
                    </div>

                    {orders.length === 0 ? (
                        <div className="bg-white rounded-[40px] p-20 text-center border-2 border-brand-border border-dashed">
                            <div className="w-20 h-20 bg-brand-bg rounded-full flex items-center justify-center mx-auto mb-6">
                                <Package className="w-10 h-10 text-brand-border" />
                            </div>
                            <h3 className="text-2xl font-bold text-brand-textPrimary font-poppins mb-2">No shipments found</h3>
                            <p className="text-brand-textSecondary mb-8">You haven&apos;t placed any premium orders yet.</p>
                            <Link href="/products" className="btn-primary px-10 py-4">Start Shopping</Link>
                        </div>
                    ) : (
                        <div className="space-y-10">
                            {orders.map((order, idx) => (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="card-premium bg-white rounded-[40px] overflow-hidden group hover:border-brand-primary transition-all duration-500 shadow-xl shadow-brand-primary/5"
                                >
                                    {/* Order Top Bar */}
                                    <div className="px-10 py-8 bg-brand-bg/50 border-b border-brand-border flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                        <div className="flex flex-wrap gap-8">
                                            <div>
                                                <p className="text-[10px] font-bold text-brand-textSecondary uppercase tracking-widest mb-1">Order Details</p>
                                                <p className="text-sm font-bold text-brand-textPrimary font-poppins flex items-center gap-2">
                                                    {order.id} <span className="w-1 h-1 bg-brand-border rounded-full" /> {order.date}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-brand-textSecondary uppercase tracking-widest mb-1">Final Amount</p>
                                                <p className="text-sm font-bold text-brand-textPrimary font-poppins">${order.total.toFixed(2)}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-brand-textSecondary uppercase tracking-widest mb-1">Status</p>
                                                <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider ${order.status === 'Delivered' ? 'text-green-600' : 'text-brand-primary'}`}>
                                                    <div className={`w-2 h-2 rounded-full ${order.status === 'Delivered' ? 'bg-green-600' : 'bg-brand-primary animate-pulse'}`} />
                                                    {order.status}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 w-full md:w-auto">
                                            <button className="flex-1 md:flex-none py-3 px-6 bg-white border border-brand-border rounded-xl font-bold text-sm text-brand-textPrimary hover:border-brand-primary transition-all shadow-sm">
                                                Manage Order
                                            </button>
                                            <button className="flex-1 md:flex-none py-3 px-6 bg-brand-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-brand-primary/20 hover:bg-blue-700 transition-all">
                                                Track Delivery
                                            </button>
                                        </div>
                                    </div>

                                    {/* Order Content */}
                                    <div className="p-10 flex flex-col lg:flex-row gap-12">
                                        <div className="flex-1 space-y-8">
                                            {order.items.map((item, i) => (
                                                <div key={i} className="flex gap-6 items-center">
                                                    <div className="w-20 h-20 bg-brand-bg rounded-2xl border border-brand-border flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="text-lg font-bold text-brand-textPrimary mb-1 line-clamp-1">{item.name}</h4>
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-xs font-bold text-brand-primary">${item.price.toFixed(2)}</span>
                                                            <span className="w-1 h-1 bg-brand-border rounded-full" />
                                                            <button className="text-[10px] font-bold text-brand-textSecondary hover:text-brand-primary flex items-center gap-1 uppercase tracking-widest transition-colors">
                                                                Write Review <ExternalLink className="w-2.5 h-2.5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Tracking Timeline */}
                                        <div className="w-full lg:w-[320px] bg-brand-bg/50 rounded-3xl p-8 border border-brand-border">
                                            <p className="text-[10px] font-bold text-brand-textSecondary uppercase tracking-[0.2em] mb-8">Delivery Timeline</p>
                                            <div className="space-y-8 relative">
                                                <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-brand-border" />
                                                {steps.map((step, i) => (
                                                    <div key={i} className={`flex items-start gap-5 relative z-10 ${i + 1 <= order.currentStep ? 'text-brand-primary' : 'text-brand-border'}`}>
                                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center translate-y-0.5 ${i + 1 <= order.currentStep ? 'bg-brand-primary border-brand-primary text-white' : 'bg-white border-brand-border'}`}>
                                                            {i + 1 <= order.currentStep && <div className="w-1 h-1 bg-white rounded-full" />}
                                                        </div>
                                                        <div>
                                                            <p className={`text-xs font-bold uppercase tracking-widest ${i + 1 <= order.currentStep ? 'text-brand-primary' : 'text-brand-textSecondary opacity-50'}`}>
                                                                {step.label}
                                                            </p>
                                                            {i + 1 === order.currentStep && (
                                                                <p className="text-[10px] text-brand-textSecondary mt-1 font-medium">Updated 3h ago</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-10 pt-8 border-t border-brand-border border-dashed">
                                                <div className="flex items-center gap-3 text-brand-textSecondary">
                                                    <ShieldAlert className="w-4 h-4 text-brand-primary" />
                                                    <span className="text-[10px] font-bold uppercase tracking-widest">Return eligible until March 12</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
