"use client";

import { motion } from "framer-motion";
import {
    Package,
    Search,
    Plus,
    Edit,
    Trash2,
    AlertCircle,
    Loader2,
    Filter,
    Download,
    ChevronRight,
    ArrowUpDown
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function InventoryPage() {
    const { data: session } = useSession();
    const [search, setSearch] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (!session?.user || (session.user as any).role !== "seller") return;
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const sellerId = (session.user as any).id;
                const res = await fetch(`/api/products?sellerId=${sellerId}&limit=100`);
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data.products || []);
                }
            } catch (err) {
                console.error("Failed to fetch products:", err);
            } finally {
                setIsLoading(false);
            }
        };

        if (session?.user) {
            fetchProducts();
        }
    }, [session]);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-10">
            {/* ── Header Area ── */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-display font-black text-[#1E4D35] tracking-tight">Inventory</h1>
                    <p className="text-[#1E4D35]/40 font-bold mt-1 text-[15px]">Managing {products.length} live listings in your store.</p>
                </div>
                <Link href="/seller-dashboard/add-product" className="group flex items-center gap-3 bg-[#1E4D35] text-[#F5E74E] font-black px-8 py-5 rounded-full hover:scale-[1.05] active:scale-95 transition-all shadow-xl shadow-[#1E4D35]/20">
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" /> Create New Listing
                </Link>
            </div>

            {/* ── Filter Controls ── */}
            <div className="bg-white rounded-[32px] p-6 shadow-sm shadow-[#1E4D35]/5 flex flex-col md:flex-row items-center justify-between gap-6 border border-transparent">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1E4D35]/30" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or SKU..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-[#F5F7F6] border-2 border-transparent focus:border-[#F5E74E]/40 rounded-2xl py-3.5 pl-14 pr-6 text-sm font-bold outline-none transition-all placeholder:text-[#1E4D35]/20"
                    />
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#F5F7F6] text-[#1E4D35] font-black text-sm hover:bg-[#1E4D35]/5 transition-all border border-transparent">
                        <Filter size={18} /> Filters
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#F5F7F6] text-[#1E4D35] font-black text-sm hover:bg-[#1E4D35]/5 transition-all border border-transparent">
                        <Download size={18} /> Export
                    </button>
                </div>
            </div>

            {/* ── Main Inventory Table ── */}
            <div className="bg-white rounded-[40px] shadow-sm shadow-[#1E4D35]/5 border border-[#1E4D35]/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#F5F7F6]/50 border-b border-[#1E4D35]/5">
                                <th className="py-7 px-8 text-[11px] font-black text-[#1E4D35]/30 uppercase tracking-[0.2em]">Product Detail</th>
                                <th className="py-7 px-8 text-[11px] font-black text-[#1E4D35]/30 uppercase tracking-[0.2em]"><div className="flex items-center gap-2">Category <ArrowUpDown size={12} /></div></th>
                                <th className="py-7 px-8 text-[11px] font-black text-[#1E4D35]/30 uppercase tracking-[0.2em]"><div className="flex items-center gap-2">Price <ArrowUpDown size={12} /></div></th>
                                <th className="py-7 px-8 text-[11px] font-black text-[#1E4D35]/30 uppercase tracking-[0.2em]"><div className="flex items-center gap-2 text-center w-full justify-center">Inventory</div></th>
                                <th className="py-7 px-8 text-[11px] font-black text-[#1E4D35]/30 uppercase tracking-[0.2em] text-right">Visibility</th>
                                <th className="py-7 px-8 text-[11px] font-black text-[#1E4D35]/30 uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1E4D35]/5">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="py-32">
                                        <div className="flex flex-col items-center justify-center">
                                            <Loader2 className="w-12 h-12 animate-spin text-[#1E4D35]/10 mb-4" />
                                            <p className="text-[#1E4D35]/30 font-black uppercase tracking-widest text-xs">Syncing Database...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-32">
                                        <div className="flex flex-col items-center justify-center max-w-xs mx-auto text-center">
                                            <div className="w-20 h-20 bg-[#F5F7F6] rounded-[28px] flex items-center justify-center text-[#1E4D35]/10 mb-6">
                                                <Package size={40} />
                                            </div>
                                            <h3 className="text-xl font-black text-[#1E4D35] font-display mb-2">Inventory Empty</h3>
                                            <p className="text-[13px] font-bold text-[#1E4D35]/40 leading-relaxed mb-8">You haven't added any products to your store yet. Start selling today!</p>
                                            <Link href="/seller-dashboard/add-product" className="bg-[#1E4D35] text-[#F5E74E] font-black px-10 py-4 rounded-full text-sm">Add First Product</Link>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredProducts.map((p, i) => (
                                <motion.tr
                                    key={p._id || p.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group hover:bg-[#F5F7F6]/50 transition-all duration-300"
                                >
                                    <td className="py-7 px-8">
                                        <div className="flex items-center gap-5">
                                            <div className="w-16 h-16 rounded-[22px] bg-[#F5F7F6] flex items-center justify-center overflow-hidden border border-transparent group-hover:border-[#1E4D35]/10 transition-colors shrink-0">
                                                {p.images && p.images[0] ? (
                                                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                ) : (
                                                    <Package className="w-6 h-6 text-[#1E4D35]/10" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-black text-[15px] text-[#1E4D35] leading-tight mb-1">{p.name}</p>
                                                <p className="text-[11px] font-black text-[#1E4D35]/20 tracking-[0.1em] uppercase">SKU: {p.sku || "N/A"}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-7 px-8">
                                        <span className="bg-[#1E4D35]/5 text-[#1E4D35] text-[11px] font-black px-4 py-1.5 rounded-full tracking-wider uppercase">{p.category}</span>
                                    </td>
                                    <td className="py-7 px-8">
                                        <p className="text-[17px] font-black text-[#1E4D35] font-display">${p.price?.toFixed(2) || "0.00"}</p>
                                    </td>
                                    <td className="py-7 px-8 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className={`text-[17px] font-black font-display ${p.stock < 10 && p.stock > 0 ? 'text-[#F5E74E]' :
                                                    p.stock === 0 ? 'text-[#F83737]' : 'text-[#1E4D35]'
                                                }`}>
                                                {p.stock}
                                            </span>
                                            <p className="text-[9px] font-black text-[#1E4D35]/20 uppercase tracking-widest mt-0.5">Units</p>
                                        </div>
                                    </td>
                                    <td className="py-7 px-8 text-right">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${p.stock > 0 ? 'bg-green-100/50 text-green-600' : 'bg-red-50 text-red-500'
                                            }`}>
                                            {p.stock > 0 ? "LIVE" : "DRAFT"}
                                        </span>
                                    </td>
                                    <td className="py-7 px-8 text-right">
                                        <div className="flex flex-row justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <button className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl text-[#1E4D35]/40 hover:bg-[#F5E74E] hover:text-[#1E4D35] shadow-sm transition-all border border-[#1E4D35]/5">
                                                <Edit size={18} />
                                            </button>
                                            <button className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl text-[#1E4D35]/40 hover:bg-[#F83737] hover:text-white shadow-sm transition-all border border-[#1E4D35]/5">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
