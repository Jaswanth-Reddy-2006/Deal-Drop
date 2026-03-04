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
    Search
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function SellerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const router = useRouter();

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

    const mainActions = [
        { icon: <LayoutDashboard size={22} />, label: "Dashboard Overview", link: "/seller-dashboard" },
        { icon: <PlusCircle size={22} />, label: "Add New Product", link: "/seller-dashboard/add-product" },
        { icon: <Store size={22} />, label: "My Shop", link: "/seller-dashboard/shop" },
        { icon: <Package size={22} />, label: "Inventory Management", link: "/seller-dashboard/inventory" },
        { icon: <ShoppingBag size={22} />, label: "Orders", link: "/seller-dashboard/orders" },
        { icon: <BarChart3 size={22} />, label: "Analytics", link: "/seller-dashboard/analytics" },
    ];

    const configActions = [
        { icon: <Settings size={20} />, label: "Settings", link: "/seller-dashboard/settings" },
        { icon: <LogOut size={20} />, label: "Logout", link: "/logout" },
    ];

    return (
        <div className="flex min-h-screen bg-[#F5F7F6] font-body text-primary">
            {/* ── Sidebar ─────────────────────────────────────────── */}
            <aside className="w-[320px] bg-[#1E4D35] text-white flex flex-col fixed h-full z-50">
                {/* Logo Area */}
                <div className="p-10 pb-12">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#F5E74E] rounded-[14px] flex items-center justify-center text-[#1E4D35] shadow-xl shadow-black/10">
                            <span className="material-symbols-outlined text-3xl font-black">diamond</span>
                        </div>
                        <div>
                            <h2 className="font-display font-black text-2xl leading-none tracking-tight">DealDrop</h2>
                            <p className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase mt-1.5">Seller Center</p>
                        </div>
                    </div>
                </div>

                {/* Main Navigation */}
                <nav className="flex-1 px-6 space-y-2">
                    {mainActions.map((item) => {
                        const isActive = pathname === item.link;
                        return (
                            <Link
                                key={item.label}
                                href={item.link}
                                className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-[15px] transition-all ${isActive
                                    ? "bg-white/10 text-white shadow-lg backdrop-blur-md border border-white/5"
                                    : "text-white/50 hover:bg-white/5 hover:text-white/80"
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

                {/* Configuration Section */}
                <div className="px-6 pb-12 space-y-2">
                    <p className="px-6 text-[11px] font-black text-white/20 uppercase tracking-[0.3em] mb-4">Configuration</p>
                    {configActions.map((item) => (
                        <Link
                            key={item.label}
                            href={item.link}
                            className="flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-[15px] text-white/50 hover:bg-white/5 hover:text-white/80 transition-all"
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                </div>
            </aside>

            {/* ── Main Content Area ────────────────────────────────── */}
            <div className="flex-1 ml-[320px] flex flex-col min-h-screen">
                {/* Topbar Header */}
                <header className="h-28 flex items-center justify-between px-12">
                    <h1 className="text-3xl font-display font-black text-[#1E4D35] tracking-tight">Overview</h1>

                    <div className="flex items-center gap-8">
                        {/* Search Bar */}
                        <div className="relative w-[340px]">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1E4D35]/30" size={18} />
                            <input
                                type="text"
                                placeholder="Search orders, products..."
                                className="w-full bg-white border border-transparent rounded-2xl py-3.5 pl-14 pr-6 text-sm font-bold outline-none focus:border-[#F5E74E]/30 focus:ring-4 focus:ring-[#F5E74E]/10 transition-all shadow-sm shadow-[#1E4D35]/5"
                            />
                        </div>

                        {/* Notifications */}
                        <button className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#1E4D35]/60 hover:text-[#1E4D35] transition-all relative shadow-sm shadow-[#1E4D35]/5">
                            <Bell size={22} />
                            <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-[#F83737] rounded-full border-2 border-white"></span>
                        </button>

                        {/* User Profile */}
                        <div className="flex items-center gap-5 pl-8 border-l border-[#1E4D35]/5">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black text-[#1E4D35]">Sarah Jenkins</p>
                                <p className="text-[10px] font-bold text-[#1E4D35]/40 uppercase tracking-widest mt-0.5">Power Seller</p>
                            </div>
                            <img
                                src="https://i.pravatar.cc/150?img=33"
                                alt="Profile"
                                className="w-12 h-12 rounded-full border-2 border-white shadow-xl object-cover ring-2 ring-[#1E4D35]/5"
                            />
                        </div>
                    </div>
                </header>

                {/* Dashboard Viewport */}
                <main className="px-12 pb-12">
                    {children}
                </main>
            </div>
        </div>
    );
}
