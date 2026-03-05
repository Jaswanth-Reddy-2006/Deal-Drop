"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    Moon,
    Bell,
    LogOut,
    Shield,
    CreditCard,
    ShoppingBag,
    ChevronRight,
    Camera,
    CheckCircle2
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function SettingsPage() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState("profile");
    const [isDarkMode, setIsDarkMode] = useState(false);

    const tabs = [
        { id: "profile", label: "My Profile", icon: <User size={18} />, desc: "Public store profile & personal info" },
        { id: "theme", label: "Theme & Display", icon: <Moon size={18} />, desc: "Customize your dashboard appearance" },
        { id: "notifications", label: "Notifications", icon: <Bell size={18} />, desc: "Manage your alerts and webhooks" },
        { id: "security", label: "Security", icon: <Shield size={18} />, desc: "Password and two-factor auth" },
        { id: "billing", label: "Payouts & Billing", icon: <CreditCard size={18} />, desc: "Earnings and payment methods" },
    ];

    return (
        <div className="flex gap-10 min-h-[calc(100vh-160px)]">
            {/* ── Settings Sub-Sidebar ── */}
            <aside className="w-80 space-y-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full text-left p-5 rounded-[24px] transition-all flex items-center gap-4 group ${activeTab === tab.id
                                ? "bg-[#1E4D35] text-[#F5E74E] shadow-xl shadow-[#1E4D35]/10"
                                : "bg-white text-[#1E4D35]/40 hover:bg-[#F5F7F6] hover:text-[#1E4D35]"
                            }`}
                    >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${activeTab === tab.id ? "bg-white/10" : "bg-[#F5F7F6]"
                            }`}>
                            {tab.icon}
                        </div>
                        <div className="flex-1">
                            <p className="font-black text-sm tracking-tight">{tab.label}</p>
                            <p className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${activeTab === tab.id ? "text-[#F5E74E]/60" : "text-[#1E4D35]/20"
                                }`}>{tab.desc}</p>
                        </div>
                        <ChevronRight size={14} className={`transition-transform duration-300 ${activeTab === tab.id ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                            }`} />
                    </button>
                ))}

                <div className="pt-8 px-2">
                    <button
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-4 p-5 rounded-[24px] text-red-500 font-black text-sm hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                    >
                        <div className="w-10 h-10 bg-red-100/50 rounded-xl flex items-center justify-center">
                            <LogOut size={18} />
                        </div>
                        Sign Out Account
                    </button>
                </div>
            </aside>

            {/* ── Main Settings Panel ── */}
            <main className="flex-1 bg-white rounded-[32px] p-10 shadow-sm border border-[#1E4D35]/5 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {activeTab === "profile" && (
                        <motion.div
                            key="profile"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-10"
                        >
                            <div className="flex items-center gap-6">
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-[32px] overflow-hidden ring-4 ring-[#F5F7F6] transition-all group-hover:ring-[#F5E74E]/30">
                                        <img src={(session?.user as any)?.image || "https://i.pravatar.cc/150?img=33"} alt="Profile" className="w-full h-full object-cover" />
                                    </div>
                                    <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#1E4D35] text-[#F5E74E] rounded-full flex items-center justify-center shadow-lg border-4 border-white hover:scale-110 transition-transform">
                                        <Camera size={16} />
                                    </button>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-[#1E4D35]">{(session?.user as any)?.name || "Sarah Jenkins"}</h2>
                                    <p className="text-[#1E4D35]/40 font-bold text-sm tracking-tight flex items-center gap-2">
                                        <CheckCircle2 size={14} className="text-blue-500" /> Professional Verified Seller
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-[#1E4D35]/30 uppercase tracking-[0.2em] ml-1">Full Name</label>
                                    <input type="text" defaultValue={(session?.user as any)?.name} className="w-full bg-[#F5F7F6] border-2 border-transparent focus:border-[#F5E74E]/50 rounded-2xl py-4 px-6 text-sm font-bold outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-[#1E4D35]/30 uppercase tracking-[0.2em] ml-1">Email Address</label>
                                    <input type="email" defaultValue={session?.user?.email || ""} className="w-full bg-[#F5F7F6] border-2 border-transparent focus:border-[#F5E74E]/50 rounded-2xl py-4 px-6 text-sm font-bold outline-none transition-all opacity-60 cursor-not-allowed" disabled />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black text-[#1E4D35]/30 uppercase tracking-[0.2em] ml-1">Store Description</label>
                                    <textarea rows={4} defaultValue="Curated high-end tech & lifestyle essentials for the modern dropshipper." className="w-full bg-[#F5F7F6] border-2 border-transparent focus:border-[#F5E74E]/50 rounded-2xl py-4 px-6 text-sm font-bold outline-none transition-all resize-none" />
                                </div>
                            </div>

                            <div className="pt-6 flex justify-end">
                                <button className="px-10 py-4 bg-[#1E4D35] text-[#F5E74E] rounded-full font-black text-sm uppercase tracking-widest shadow-xl shadow-[#1E4D35]/10 hover:scale-[1.05] active:scale-95 transition-all">
                                    Save Profile
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "theme" && (
                        <motion.div
                            key="theme"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-10"
                        >
                            <div className="flex items-center justify-between p-8 bg-[#F5F7F6] rounded-[28px] group">
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#1E4D35] shadow-sm">
                                        <Moon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-[#1E4D35]">Dark Appearance</h3>
                                        <p className="text-sm font-bold text-[#1E4D35]/40">Reduce eye strain in low-light environments.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsDarkMode(!isDarkMode)}
                                    className={`w-14 h-8 rounded-full relative transition-all duration-300 ${isDarkMode ? "bg-[#1E4D35]" : "bg-[#1E4D35]/10"
                                        }`}
                                >
                                    <motion.div
                                        animate={{ x: isDarkMode ? 28 : 4 }}
                                        className="w-5 h-5 bg-white rounded-full absolute top-1.5 shadow-md shadow-black/10"
                                    />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="aspect-[4/3] bg-[#F5F7F6] rounded-[24px] border-4 border-[#1E4D35] p-4">
                                        <div className="w-full h-full bg-white rounded-lg shadow-sm" />
                                    </div>
                                    <p className="text-center font-black text-xs text-[#1E4D35] uppercase tracking-widest">Light Mode</p>
                                </div>
                                <div className="space-y-4 opacity-40">
                                    <div className="aspect-[4/3] bg-slate-900 rounded-[24px] border-4 border-transparent p-4">
                                        <div className="w-full h-full bg-slate-800 rounded-lg" />
                                    </div>
                                    <p className="text-center font-black text-xs text-[#1E4D35] uppercase tracking-widest">Dark Mode</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "notifications" && (
                        <motion.div
                            key="notifications"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            {[
                                { id: "sales", title: "Sales Alerts", desc: "Get notified when someone buys a product" },
                                { id: "inventory", title: "Inventory Status", desc: "Alerts when items are low on stock" },
                                { id: "payouts", title: "Payout Updates", desc: "Notifications for successful transfers" },
                                { id: "system", title: "System News", desc: "Platform updates and feature announcements" }
                            ].map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-6 hover:bg-[#F5F7F6] rounded-[24px] transition-all group">
                                    <div>
                                        <h3 className="font-black text-[#1E4D35]">{item.title}</h3>
                                        <p className="text-xs font-bold text-[#1E4D35]/30">{item.desc}</p>
                                    </div>
                                    <button className="w-12 h-6 bg-[#1E4D35] rounded-full relative p-1 transition-all">
                                        <div className="w-4 h-4 bg-[#F5E74E] rounded-full ml-auto shadow-sm" />
                                    </button>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
