"use client";

import Link from "next/link";
import { LayoutDashboard, ShoppingBag, PlusCircle, Package, DollarSign, User, LogOut, ExternalLink } from "lucide-react";
import { usePathname } from "next/navigation";

export default function SellerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const menu = [
        { icon: <LayoutDashboard />, label: "Dashboard", link: "/seller-dashboard" },
        { icon: <PlusCircle />, label: "Add Product", link: "/seller-dashboard/add-product" },
        { icon: <Package />, label: "Inventory", link: "/seller-dashboard/inventory" },
        { icon: <ShoppingBag />, label: "Orders", link: "/seller-dashboard/orders" },
        { icon: <DollarSign />, label: "Earnings", link: "/seller-dashboard/earnings" },
        { icon: <User />, label: "Profile", link: "/seller-dashboard/profile" },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Seller Sidebar */}
            <aside className="w-80 bg-brand-textPrimary text-white flex flex-col fixed h-full z-50">
                <div className="p-8 border-b border-white/10">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg ring-4 ring-brand-primary/20">
                            D
                        </div>
                        <span className="font-poppins font-bold text-2xl tracking-tight">Seller Hub</span>
                    </Link>
                </div>

                <nav className="flex-1 p-6 space-y-2 overflow-y-auto mt-4">
                    {menu.map((item) => (
                        <Link
                            key={item.label}
                            href={item.link}
                            className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all ${pathname === item.link
                                    ? "bg-brand-primary text-white shadow-xl shadow-brand-primary/20"
                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            {/* Clones the icon so we don't have to redefine it */}
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-6 border-t border-white/10 space-y-4">
                    <Link href="/store" target="_blank" className="flex items-center justify-between text-xs font-bold text-gray-400 hover:text-white transition-colors bg-white/5 p-4 rounded-xl">
                        View Live Store <ExternalLink className="w-4 h-4" />
                    </Link>
                    <button className="w-full flex items-center gap-4 px-5 py-4 text-brand-danger font-bold hover:bg-red-500/10 rounded-2xl transition-all">
                        <LogOut className="w-5 h-5" /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-80 p-12">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
