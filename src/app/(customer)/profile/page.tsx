"use client";

import { motion } from "framer-motion";
import { Package, MapPin, CreditCard, LogOut, ChevronRight, Settings, Heart, Bell, ShieldCheck, ShoppingBag, BadgeCheck } from "lucide-react";
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
        rank: "Obsidian Member",
        avatar_color: "bg-[#1A1A1A]"
    };

    const stats = [
        { label: "Drops Secured", value: "12", icon: <Package className="w-4 h-4" />, color: "text-blue-500" },
        { label: "Wishlist", value: "08", icon: <Heart className="w-4 h-4" />, color: "text-red-500" },
        { label: "Vault Items", value: cartItems.length, icon: <ShoppingBag className="w-4 h-4" />, color: "text-accent" },
        { label: "Saved Vaults", value: "02", icon: <MapPin className="w-4 h-4" />, color: "text-purple-500" },
    ];

    const menuSections = [
        {
            title: "Collections & Drops",
            items: [
                { icon: <Package />, label: "Drop History", desc: "Track, return, or secure again", link: "/orders" },
                { icon: <Heart />, label: "The Wishlist", desc: "Curated items for future drops", link: "/wishlist" },
                { icon: <Bell />, label: "Drop Alerts", desc: "Get notified before the next drop", link: "#" },
            ]
        },
        {
            title: "Vault Security",
            items: [
                { icon: <MapPin />, label: "Secure Addresses", desc: "Manage your delivery coordinates", link: "#" },
                { icon: <CreditCard />, label: "Payment Vault", desc: "Securely encrypted payment methods", link: "#" },
                { icon: <Settings />, label: "Identity Settings", desc: "Account security and profile preferences", link: "#" },
            ]
        }
    ];

    if (!mounted) return null;

    return (
        <div className="bg-[#FDFDFD] min-h-screen pb-32 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/[0.02] blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-accent/[0.03] blur-[100px] rounded-full -z-10" />

            <div className="container-main py-12 md:py-20 lg:py-24">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">

                    {/* Left: Identity Sidebar */}
                    <aside className="w-full lg:w-[420px] space-y-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            className="bg-white border border-primary/5 p-12 rounded-[60px] shadow-2xl shadow-primary/5 sticky top-32"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="relative group">
                                    <div className={`w-40 h-40 rounded-[50px] ${user.avatar_color} p-1 flex items-center justify-center border-[8px] border-white shadow-2xl transition-transform duration-700 group-hover:rotate-6`}>
                                        <span className="text-white text-6xl font-display font-black">{user.name.charAt(0)}</span>
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-accent rounded-2xl border-[6px] border-white shadow-xl flex items-center justify-center">
                                        <BadgeCheck className="w-5 h-5 text-primary" />
                                    </div>
                                </div>

                                <div className="mt-10 space-y-2">
                                    <h1 className="text-4xl font-display font-black text-primary tracking-tight">{user.name}</h1>
                                    <p className="text-primary/40 font-black text-[10px] uppercase tracking-[0.3em]">{user.rank}</p>
                                </div>

                                <div className="w-full h-px bg-primary/5 my-10" />

                                <div className="grid grid-cols-2 gap-4 w-full">
                                    {stats.map((stat, i) => (
                                        <div key={i} className="bg-primary/[0.02] p-5 rounded-[32px] text-left border border-primary/5 hover:bg-white hover:shadow-xl transition-all group">
                                            <div className={`w-8 h-8 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform ${stat.color}`}>
                                                {stat.icon}
                                            </div>
                                            <p className="text-[9px] font-black text-primary/30 uppercase tracking-widest mb-1">{stat.label}</p>
                                            <p className="text-2xl font-display font-black text-primary">{stat.value}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="w-full mt-10 space-y-4">
                                    <button className="w-full py-5 bg-primary text-accent rounded-full font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                                        Secure Identity
                                    </button>
                                    <button className="w-full py-5 border-2 border-primary/5 text-primary/40 rounded-full font-black text-xs uppercase tracking-widest hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                                        <LogOut size={16} /> Signal Out
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </aside>

                    {/* Right: Management Core */}
                    <main className="flex-1 space-y-20">
                        {menuSections.map((section, idx) => (
                            <motion.section
                                key={idx}
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * idx }}
                            >
                                <div className="flex items-center gap-6 mb-10">
                                    <h2 className="text-xs font-black text-primary/20 uppercase tracking-[0.4em] whitespace-nowrap">
                                        {section.title}
                                    </h2>
                                    <div className="h-px bg-primary/5 flex-1" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {section.items.map((item, i) => (
                                        <Link
                                            key={i} href={item.link}
                                            className="group relative p-10 bg-white border border-primary/5 rounded-[50px] hover:shadow-3xl hover:shadow-primary/5 transition-all overflow-hidden block"
                                        >
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/[0.01] rounded-bl-[100px] group-hover:bg-accent/10 transition-all duration-500" />

                                            <div className="w-14 h-14 bg-primary text-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all mb-8 shadow-xl shadow-primary/10">
                                                {item.icon}
                                            </div>

                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-2xl font-display font-black text-primary">{item.label}</h3>
                                                <ChevronRight className="w-6 h-6 text-primary/10 group-hover:text-primary group-hover:translate-x-2 transition-all" />
                                            </div>
                                            <p className="text-sm font-medium text-primary/40 leading-relaxed italic">"{item.desc}"</p>
                                        </Link>
                                    ))}
                                </div>
                            </motion.section>
                        ))}

                        {/* Security Banner */}
                        <div className="bg-primary rounded-[60px] p-12 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 blur-[120px] rounded-full" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                                <div className="w-20 h-20 bg-accent rounded-[32px] flex items-center justify-center text-primary shadow-2xl shadow-accent/20 rotate-3">
                                    <ShieldCheck size={40} />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h4 className="text-3xl font-display font-black mb-4 tracking-tight">Active Vault Guard</h4>
                                    <p className="text-white/40 text-lg font-medium max-w-xl leading-relaxed">
                                        Your access is fortified with multi-factor authentication.
                                        Drop notifications and secure communications are being encrypted in real-time.
                                    </p>
                                </div>
                                <button className="bg-accent text-primary px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-accent/10">
                                    Vault Settings
                                </button>
                            </div>
                        </div>
                    </main>

                </div>
            </div>
        </div>
    );
}
