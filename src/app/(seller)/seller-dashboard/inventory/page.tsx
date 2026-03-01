"use client";

import { motion } from "framer-motion";
import { Package, Search, Plus, Edit, Trash2, AlertCircle, Loader2 } from "lucide-react";
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
                // In a production app, we would ideally just pass `sellerId` from the backend context
                // but for this endpoint `sellerId` query search fetches only their items.
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const sellerId = (session.user as any).id;
                // Modify the /api/products route or fetch directly.
                // Wait, /api/products doesn't currently filter by sellerId via query map. 
                // Let's add it to the URL and will update the backend `GET /api/products` handler!
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

    // Filter local products based on quick search
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 page-enter">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-brand-textPrimary font-poppins">Inventory Management</h1>
                    <p className="text-[15px] text-brand-textSecondary mt-1">Manage your {products.length} active products and stock levels.</p>
                </div>
                <Link href="/seller-dashboard/add-product" className="btn-primary py-3 px-6 text-sm">
                    <Plus className="w-4 h-4" /> Add New Product
                </Link>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-2xl p-4 border border-brand-border flex items-center justify-between shadow-sm">
                <div className="relative w-full max-w-sm">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search inventory..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand-primary"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-bold text-brand-textSecondary bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100">
                        Filter
                    </button>
                    <button className="px-4 py-2 text-sm font-bold text-brand-textSecondary bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100">
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-brand-border rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-brand-border">
                                <th className="py-4 px-6 text-xs font-bold text-brand-textSecondary uppercase tracking-widest">Product</th>
                                <th className="py-4 px-6 text-xs font-bold text-brand-textSecondary uppercase tracking-widest">Category</th>
                                <th className="py-4 px-6 text-xs font-bold text-brand-textSecondary uppercase tracking-widest">Price</th>
                                <th className="py-4 px-6 text-xs font-bold text-brand-textSecondary uppercase tracking-widest">Stock</th>
                                <th className="py-4 px-6 text-xs font-bold text-brand-textSecondary uppercase tracking-widest">Status</th>
                                <th className="py-4 px-6 text-xs font-bold text-brand-textSecondary uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center">
                                        <Loader2 className="w-8 h-8 mx-auto animate-spin text-brand-primary/50" />
                                        <p className="text-sm text-brand-textSecondary mt-2">Loading inventory...</p>
                                    </td>
                                </tr>
                            ) : filteredProducts.map((p, i) => (
                                <motion.tr key={p._id || p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                                    className="hover:bg-gray-50 transition-colors group">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 shrink-0 overflow-hidden relative">
                                                {p.images && p.images[0] ? (
                                                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Package className="w-5 h-5" />
                                                )}
                                            </div>
                                            <p className="font-bold text-[14px] text-brand-textPrimary line-clamp-1">{p.name}</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-[14px] text-brand-textSecondary">{p.category}</td>
                                    <td className="py-4 px-6 text-[14px] font-bold text-brand-textPrimary">${p.price?.toFixed(2) || "0.00"}</td>
                                    <td className="py-4 px-6">
                                        <span className={`text-[14px] font-bold ${p.stock < 10 && p.stock > 0 ? 'text-orange-500' : p.stock === 0 ? 'text-red-500' : 'text-brand-textPrimary'}`}>
                                            {p.stock}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`badge ${p.stock > 0 ? 'badge-success' : 'badge-danger'}`}>
                                            {p.stock > 0 ? 'Active' : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex flex-row justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-brand-textSecondary hover:text-brand-primary hover:bg-blue-50 rounded-lg transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-brand-textSecondary hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {!isLoading && filteredProducts.length === 0 && (
                    <div className="p-12 text-center text-brand-textSecondary">
                        <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="font-bold">No products found</p>
                        <p className="text-sm mt-1">Add a new product to see it in your inventory.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
