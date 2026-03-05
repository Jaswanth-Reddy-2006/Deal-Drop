"use client";

import Link from "next/link";
import {
    LayoutDashboard,
    PlusCircle,
    Store,
    Package,
    ShoppingBag,
    BarChart3,
    Settings,
    LogOut,
    Bell,
    Search,
    ChevronDown,
    Moon,
    User,
    Diamond,
    Menu,
    X
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SellerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated") {
            const user = session?.user as any;
            if (user?.role !== "seller") {
                router.push("/");
            } else if (!user?.isOnboarded && pathname !== "/onboarding") {
                router.push("/onboarding");
            }
        }
    }, [status, session, router, pathname]);

    // Close sidebar on navigation
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    const getPageTitle = (path: string) => {
        if (path === "/seller-dashboard") return "Overview";
        if (path === "/seller-dashboard/add-product") return "Add New Product";
        if (path === "/seller-dashboard/shop") return "My Store";
        if (path === "/seller-dashboard/inventory") return "Inventory";
        if (path === "/seller-dashboard/orders") return "Orders";
        if (path === "/seller-dashboard/analytics") return "Analytics";
        if (path === "/seller-dashboard/earnings") return "Earnings";
        if (path === "/seller-dashboard/settings") return "Settings";
        return "Dashboard";
    };

    const mainActions = [
        { icon: <LayoutDashboard size={22} />, label: "Dashboard Overview", link: "/seller-dashboard" },
        { icon: <PlusCircle size={22} />, label: "Add New Product", link: "/seller-dashboard/add-product" },
        { icon: <Store size={22} />, label: "My Shop", link: "/seller-dashboard/shop" },
        { icon: <Package size={22} />, label: "Inventory Management", link: "/seller-dashboard/inventory" },
        { icon: <ShoppingBag size={22} />, label: "Orders", link: "/seller-dashboard/orders" },
        { icon: <BarChart3 size={22} />, label: "Analytics", link: "/seller-dashboard/analytics" },
    ];

    return (
        <div className="flex min-h-screen bg-[#F5F7F6] font-body text-primary overflow-x-hidden">
            {/* ── Mobile Sidebar Overlay ── */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-[#1E4D35]/40 backdrop-blur-sm z-[60] lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* ── Sidebar ─────────────────────────────────────────── */}
            <aside className={`
                w-[300px] bg-[#1E4D35] text-white flex flex-col fixed h-full z-[70] transition-all duration-500
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}>
                {/* Logo Area */}
                <div className="p-10 pb-12 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#F5E74E] rounded-xl flex items-center justify-center text-[#1E4D35] shadow-xl shadow-black/10">
                            <Diamond size={20} fill="currentColor" />
                        </div>
                        <div>
                            <h2 className="font-display font-black text-xl leading-none tracking-tight text-white">DealDrop</h2>
                            <p className="text-[9px] font-bold text-white/40 tracking-[0.2em] uppercase mt-1.5">Seller Center</p>
                        </div>
                    </div>
                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="lg:hidden w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Main Navigation */}
                <nav className="flex-1 px-5 space-y-1">
                    {mainActions.map((item) => {
                        const isActive = pathname === item.link;
                        return (
                            <Link
                                key={item.label}
                                href={item.link}
                                className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold text-[14px] transition-all ${isActive
                                    ? "bg-white/10 text-white shadow-lg backdrop-blur-md border border-white/5"
                                    : "text-white/40 hover:bg-white/5 hover:text-white/80"
                                    }`}
                            >
                                <span className={isActive ? "text-[#F5E74E]" : "text-inherit"}>
                                    {item.icon}
                                </span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Bottom Actions */}
                <div className="px-5 pb-10">
                    <div className="h-px bg-white/5 mb-8 opacity-20" />
                    <Link
                        href="/seller-dashboard/settings"
                        className={`w-full flex items-center gap-4 px-5 py-5 rounded-[20px] font-bold text-[15px] transition-all bg-white/10 border border-white/5 hover:bg-white/20 text-white ${pathname.startsWith('/seller-dashboard/settings') ? 'bg-white/20 border-white/20' : ''}`}
                    >
                        <Settings size={20} className="text-[#F5E74E]" />
                        Settings
                    </Link>
                </div>
            </aside>

            {/* ── Main Content Area ────────────────────────────────── */}
            <div className="flex-1 lg:ml-[300px] flex flex-col min-h-screen w-full transition-all duration-500">
                {/* Topbar Header */}
                <header className="h-20 lg:h-24 flex items-center justify-between px-6 lg:px-10 sticky top-0 bg-[#F5F7F6]/80 backdrop-blur-xl z-40">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Trigger */}
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden w-11 h-11 rounded-[16px] bg-white flex items-center justify-center text-[#1E4D35] shadow-sm border border-[#1E4D35]/5"
                        >
                            <Menu size={22} />
                        </button>
                        <h1 className="text-xl lg:text-2xl font-display font-black text-[#1E4D35] tracking-tight">
                            {getPageTitle(pathname)}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Search Bar */}
                        <div className="relative w-[300px] hidden xl:block">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1E4D35]/30" size={17} />
                            <input
                                type="text"
                                placeholder="Search inventory..."
                                className="w-full bg-white border border-transparent rounded-[18px] py-3 px-12 text-[13px] font-bold outline-none focus:border-[#1E4D35]/10 shadow-sm shadow-[#1E4D35]/5 transition-all"
                            />
                        </div>

                        {/* Notifications */}
                        <button
                            onClick={() => setIsNotifOpen(true)}
                            className="w-12 h-12 rounded-[18px] bg-white flex items-center justify-center text-[#1E4D35]/60 hover:text-[#1E4D35] hover:bg-[#F5F7F6] transition-all relative border border-[#1E4D35]/5 group"
                        >
                            <Bell size={20} className="group-hover:rotate-12 transition-transform" />
                            <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>
                </header>

                {/* Dashboard Viewport */}
                <main className="px-6 lg:px-10 pb-6 lg:pb-10 flex-1">
                    {children}
                </main>

                {/* Notifications Modal Overlay */}
                {isNotifOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={() => setIsNotifOpen(false)}
                            className="absolute inset-0 bg-[#1E4D35]/20 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="bg-white rounded-[32px] lg:rounded-[40px] w-full max-w-lg shadow-2xl border border-[#1E4D35]/5 overflow-hidden z-[101]"
                        >
                            <div className="p-10 pb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-black text-[#1E4D35] font-display">Notifications</h2>
                                <button
                                    onClick={() => setIsNotifOpen(false)}
                                    className="w-10 h-10 rounded-full bg-[#F5F7F6] flex items-center justify-center text-[#1E4D35]/30 hover:bg-[#1E4D35] hover:text-[#F5E74E] transition-all"
                                >
                                    <PlusCircle size={24} className="rotate-45" />
                                </button>
                            </div>
                            <div className="px-10 pb-10 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                                {[
                                    { title: "New Sale!", desc: "You received a new order #DD-8943", time: "2 mins ago", icon: <ShoppingBag size={18} />, bg: "bg-green-50" },
                                    { title: "Stock Alert", desc: "Master & Dynamics MW08 is low on stock", time: "1 hour ago", icon: <Package size={18} />, bg: "bg-orange-50" },
                                    { title: "System Update", desc: "Seller dashboard v2.1 is now live", time: "5 hours ago", icon: <Settings size={18} />, bg: "bg-blue-50" },
                                ].map((n, i) => (
                                    <div key={i} className="flex gap-4 p-5 rounded-[24px] bg-[#F5F7F6] border border-transparent hover:border-[#F5E74E]/30 transition-all cursor-pointer group">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-[#1E4D35] group-hover:scale-110 transition-transform ${n.bg}`}>
                                            {n.icon}
                                        </div>
                                        <div>
                                            <p className="font-black text-[15px] text-[#1E4D35]">{n.title}</p>
                                            <p className="text-[13px] font-bold text-[#1E4D35]/40">{n.desc}</p>
                                            <p className="text-[10px] font-black text-[#1E4D35]/15 uppercase tracking-[0.1em] mt-1.5">{n.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-10 pt-0">
                                <button className="w-full py-5 rounded-2xl bg-[#1E4D35] text-[#F5E74E] font-black text-xs uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#1E4D35]/20">
                                    Clear all notifications
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}
