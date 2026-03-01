"use client";

import { motion } from "framer-motion";
import { Package, MapPin, CreditCard, LogOut, ChevronRight, Settings, Heart, Bell, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useState, useEffect } from "react";

export default function ProfilePage() {
    const [mounted, setMounted] = useState(false);
    const cartItems = useCartStore((state) => state.items);

    useEffect(() => {
        setMounted(true);
    }, []);

    const user = {
        name: "Jaswanth Reddy",
        email: "jaswanth@example.com",
        joined: "March 2026",
        rank: "Platinum Member"
    };

    const stats = [
        { label: "Total Orders", value: "12", icon: <Package className="w-4 h-4" /> },
        { label: "Wishlist", value: "8", icon: <Heart className="w-4 h-4" /> },
        { label: "In Cart", value: cartItems.length, icon: <Package className="w-4 h-4" /> },
        { label: "Saved Addresses", value: "2", icon: <MapPin className="w-4 h-4" /> },
    ];

    const menuSections = [
        {
            title: "Shopping Experience",
            items: [
                { icon: <Package />, label: "Order History", desc: "Track, return, or buy again", link: "/orders" },
                { icon: <Heart />, label: "My Wishlist", desc: "Items you've saved for later", link: "/wishlist" },
                { icon: <Bell />, label: "Stock Alerts", desc: "Notifications for back-in-stock drops", link: "#" },
            ]
        },
        {
            title: "Account Logistics",
            items: [
                { icon: <MapPin />, label: "Shipping Addresses", desc: "Primary and secondary delivery points", link: "#" },
                { icon: <CreditCard />, label: "Payment Methods", desc: "Securely stored vault cards", link: "#" },
                { icon: <Settings />, label: "Personal Details", desc: "Security, email, and password", link: "#" },
            ]
        }
    ];

    if (!mounted) return null;

    return (
        <div className="bg-[#F8FAFC] min-h-screen pb-32">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-0 w-full h-[300px] bg-brand-primary/5 blur-[100px] -z-10" />

            <div className="container-main py-12">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">

                    {/* Sidebar / Profile Card */}
                    <aside className="w-full lg:w-[380px] space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                            className="card-premium bg-white p-10 rounded-[40px] sticky top-28"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-[40px] bg-brand-primary/10 flex items-center justify-center text-brand-primary text-5xl font-extrabold border-4 border-white shadow-2xl transition-all group-hover:rotate-3">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div className="absolute bottom-1 right-1 w-8 h-8 bg-green-500 border-4 border-white rounded-full shadow-lg" />
                                </div>
                                <h1 className="text-3xl font-extrabold text-brand-textPrimary font-poppins mt-8 mb-2">{user.name}</h1>
                                <p className="text-brand-textSecondary font-medium">{user.email}</p>

                                <div className="mt-6 px-4 py-2 bg-brand-primary/5 rounded-2xl flex items-center gap-2 border border-brand-primary/10">
                                    <ShieldCheck className="w-4 h-4 text-brand-primary" />
                                    <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">{user.rank}</span>
                                </div>

                                <div className="w-full border-t border-brand-border border-dashed my-8" />

                                <div className="grid grid-cols-2 gap-4 w-full">
                                    {stats.map((stat, i) => (
                                        <div key={i} className="bg-brand-bg p-4 rounded-3xl text-left border border-brand-border">
                                            <p className="text-[10px] font-bold text-brand-textSecondary uppercase tracking-widest mb-1">{stat.label}</p>
                                            <p className="text-xl font-bold text-brand-textPrimary font-poppins">{stat.value}</p>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full mt-10 py-4 rounded-2xl border-2 border-brand-border font-bold text-brand-textPrimary hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all">
                                    Edit Account Data
                                </button>

                                <button className="mt-4 text-brand-danger font-bold text-sm hover:underline flex items-center gap-2">
                                    <LogOut className="w-4 h-4" /> Sign Out
                                </button>
                            </div>
                        </motion.div>
                    </aside>

                    {/* Main Settings Area */}
                    <main className="flex-1 space-y-12">
                        {menuSections.map((section, idx) => (
                            <motion.section
                                key={idx}
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * idx }}
                            >
                                <h2 className="text-sm font-bold text-brand-textSecondary uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                                    {section.title}
                                    <div className="h-px bg-brand-border flex-1" />
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {section.items.map((item, i) => (
                                        <Link
                                            key={i} href={item.link}
                                            className="group flex flex-col p-8 bg-white border border-brand-border rounded-[32px] hover:border-brand-primary hover:shadow-2xl hover:shadow-brand-primary/5 transition-all relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/[0.03] rounded-bl-full group-hover:bg-brand-primary/[0.08] transition-all" />
                                            <div className="w-12 h-12 bg-brand-bg rounded-xl flex items-center justify-center text-brand-textSecondary group-hover:bg-brand-primary group-hover:text-white transition-all mb-6 shadow-sm">
                                                {item.icon}
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-xl font-bold text-brand-textPrimary group-hover:text-brand-primary transition-colors">{item.label}</h3>
                                                <ChevronRight className="w-5 h-5 text-brand-border group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                                            </div>
                                            <p className="text-sm text-brand-textSecondary mt-2 leading-relaxed">{item.desc}</p>
                                        </Link>
                                    ))}
                                </div>
                            </motion.section>
                        ))}

                        {/* Security Tip Overlay (Premium Aesthetic) */}
                        <div className="bg-brand-textPrimary rounded-[40px] p-10 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 blur-[80px] rounded-full" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                                    <ShieldCheck className="w-8 h-8 text-brand-primary" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold font-poppins mb-2">Two-Factor Authentication Active</h4>
                                    <p className="text-gray-400 text-sm max-w-md">Your account is currently protected by enterprise-grade 2FA. We recommend rotating your security keys every 90 days for maximum safety.</p>
                                </div>
                                <button className="btn-primary py-3 px-8 rounded-xl whitespace-nowrap ml-auto">Manage Security</button>
                            </div>
                        </div>
                    </main>

                </div>
            </div>
        </div>
    );
}
