import Link from "next/link";
import { LayoutDashboard, Package, Users, Settings, Tag, LogOut, Search, Bell } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#F1F5F9] flex flex-col md:flex-row w-full absolute top-0 left-0 z-50">

            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col fixed md:sticky top-0 h-16 md:h-screen z-10 transition-transform">
                <div className="h-16 flex items-center px-6 border-b border-gray-100 justify-between md:justify-start">
                    <Link href="/admin" className="font-poppins font-bold text-xl text-brand-textPrimary flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/20">
                            <span className="text-white text-xl leading-none font-bold">N</span>
                        </div>
                        <span className="tracking-tight">NovaCart <span className="text-brand-primary text-xs uppercase tracking-widest block font-bold">Admin</span></span>
                    </Link>
                </div>

                <nav className="hidden md:flex flex-col gap-1.5 p-4 flex-1">
                    {[
                        { label: "Overview", href: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
                        { label: "Marketplace", href: "/admin/products", icon: <Package className="w-5 h-5" /> },
                        { label: "Orders", href: "/admin/orders", icon: <Tag className="w-5 h-5" /> },
                        { label: "Customers", href: "/admin/customers", icon: <Users className="w-5 h-5" /> },
                        { label: "Settings", href: "/admin/settings", icon: <Settings className="w-5 h-5" /> },
                    ].map((item, idx) => (
                        <Link
                            key={idx} href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${idx === 0 ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-brand-textSecondary hover:bg-brand-bg hover:text-brand-textPrimary'}`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}

                    <div className="mt-auto border-t border-gray-100 pt-4">
                        <Link href="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-brand-textSecondary hover:text-brand-danger transition-colors rounded-lg">
                            <LogOut className="w-5 h-5" />
                            Exit Admin
                        </Link>
                    </div>
                </nav>
            </aside>

            {/* Main Display Container */}
            <div className="flex-1 flex flex-col mt-16 md:mt-0 max-w-[100vw] md:max-w-none">

                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-0 hidden md:flex">
                    <div className="flex items-center gap-2 text-brand-textSecondary w-1/3">
                        <Search className="w-5 h-5" />
                        <input type="text" placeholder="Search products, orders..." className="bg-transparent border-none outline-none w-full text-sm placeholder:text-gray-400" />
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                            <Bell className="w-5 h-5 text-brand-textSecondary" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-brand-danger rounded-full border border-white"></span>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-brand-primary/20 text-brand-primary font-bold flex items-center justify-center border border-brand-primary/30 text-sm">
                            JD
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
