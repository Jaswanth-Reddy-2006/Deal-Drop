"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit3, Trash2, Loader2, Image as ImageIcon, ExternalLink, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
    _id: string;
    name: string;
    price: number;
    category: string;
    brand?: string;
    stock: number;
    images: string[];
    description: string;
}

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "Electronics",
        brand: "",
        stock: "0",
        images: [""],
        description: "",
    });

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/products?sort=newest");
            const data = await res.json();
            setProducts(data.products || []);
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleOpenModal = (mode: "add" | "edit", product?: Product) => {
        setModalMode(mode);
        if (mode === "edit" && product) {
            setCurrentProduct(product);
            setFormData({
                name: product.name,
                price: product.price.toString(),
                category: product.category,
                brand: product.brand || "",
                stock: product.stock.toString(),
                images: product.images || [""],
                description: product.description || "",
            });
        } else {
            setFormData({
                name: "",
                price: "",
                category: "Electronics",
                brand: "",
                stock: "0",
                images: [""],
                description: "",
            });
        }
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
            if (res.ok) {
                setProducts(products.filter(p => p._id !== id));
            } else {
                alert("Delete failed");
            }
        } catch (error) {
            console.error("Delete error", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const payload = {
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock),
                subCategory: "General",
            };

            if (modalMode === "edit" && !currentProduct) return;

            const url = modalMode === "add" ? "/api/products" : `/api/products/${currentProduct?._id}`;
            const method = modalMode === "add" ? "POST" : "PATCH";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                await fetchProducts();
                setIsModalOpen(false);
            } else {
                const err = await res.text();
                alert(`Error: ${err}`);
            }
        } catch (error) {
            console.error("Submit error", error);
        } finally {
            setSubmitting(false);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-brand-textPrimary font-poppins">Inventory Engine</h1>
                    <p className="text-brand-textSecondary mt-1">Manage SKUs, stock levels, and marketplace availability.</p>
                </div>
                <button
                    onClick={() => handleOpenModal("add")}
                    className="btn-primary flex items-center gap-2 rounded-2xl shadow-xl shadow-brand-primary/20"
                >
                    <Plus className="w-5 h-5" />
                    New Listing
                </button>
            </div>

            {/* Actions Bar */}
            <div className="bg-white p-5 rounded-3xl border border-brand-border flex flex-wrap gap-4 items-center justify-between shadow-sm">
                <div className="flex items-center gap-4 flex-1 max-w-md">
                    <div className="relative w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-textSecondary" />
                        <input
                            type="text"
                            placeholder="Find products by name or category..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-brand-bg border border-brand-border rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none focus:border-brand-primary transition-all"
                        />
                    </div>
                </div>
                <p className="text-sm text-brand-textSecondary font-bold">Total Entries: {filteredProducts.length}</p>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-[40px] border border-brand-border overflow-hidden shadow-sm relative">
                {loading && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] z-10 flex items-center justify-center">
                        <Loader2 className="w-10 h-10 text-brand-primary animate-spin" />
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-brand-bg border-b border-brand-border text-[10px] uppercase tracking-[0.2em] text-brand-textSecondary">
                                <th className="px-8 py-5 font-bold">Listing Info</th>
                                <th className="px-8 py-5 font-bold">Price</th>
                                <th className="px-8 py-5 font-bold">Category</th>
                                <th className="px-8 py-5 font-bold">Stock Level</th>
                                <th className="px-8 py-5 font-bold">Status</th>
                                <th className="px-8 py-5 font-bold text-right">Settings</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border">
                            <AnimatePresence>
                                {filteredProducts.map((product) => (
                                    <motion.tr
                                        key={product._id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="group hover:bg-brand-primary/[0.02] transition-colors"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 rounded-2xl bg-brand-bg border border-brand-border overflow-hidden shrink-0 flex items-center justify-center group-hover:border-brand-primary/30 transition-all">
                                                    {product.images?.[0] ? (
                                                        <img src={product.images[0]} alt="" className="w-full h-full object-cover mix-blend-multiply" />
                                                    ) : (
                                                        <ImageIcon className="w-6 h-6 text-brand-border" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-brand-textPrimary line-clamp-1 mb-0.5 group-hover:text-brand-primary transition-colors">{product.name}</p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-bold text-brand-textSecondary uppercase tracking-widest">{product.brand || "NovaCart"}</span>
                                                        <Link href={`/product/${product._id}`} target="_blank">
                                                            <ExternalLink className="w-3 h-3 text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-lg font-bold text-brand-textPrimary font-poppins">${product.price.toFixed(2)}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{product.category}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-1.5 w-full max-w-[120px]">
                                                <div className="h-1.5 w-full bg-brand-bg rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${product.stock > 20 ? 'bg-green-500' : product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                        style={{ width: `${Math.min(100, (product.stock / 50) * 100)}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-bold text-brand-textPrimary">{product.stock} units</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-orange-500' : 'text-red-600'}`}>
                                                <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-600 animate-pulse' : product.stock > 0 ? 'bg-orange-500' : 'bg-red-600'}`} />
                                                {product.stock > 10 ? 'Active' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                                <button onClick={() => handleOpenModal("edit", product)} className="p-2.5 text-brand-textSecondary hover:text-brand-primary bg-white border border-brand-border rounded-xl shadow-sm hover:border-brand-primary/50 transition-all">
                                                    <Edit3 className="w-5 h-5" />
                                                </button>
                                                <button onClick={() => handleDelete(product._id)} className="p-2.5 text-brand-textSecondary hover:text-brand-danger bg-white border border-brand-border rounded-xl shadow-sm hover:border-brand-danger/50 transition-all">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* CRUD Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-brand-textPrimary/40 backdrop-blur-md"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 30 }}
                            className="relative bg-white rounded-[40px] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="px-10 py-8 border-b border-brand-border flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-extrabold text-brand-textPrimary font-poppins">
                                        {modalMode === "add" ? "New Marketplace Listing" : "Update SKU Details"}
                                    </h2>
                                    <p className="text-sm text-brand-textSecondary font-medium mt-1">Fill in the technical specifications below.</p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full bg-brand-bg flex items-center justify-center text-brand-textSecondary hover:text-brand-danger transition-colors font-bold">&times;</button>
                            </div>

                            <form onSubmit={handleSubmit} className="overflow-y-auto p-10 space-y-8 flex-1 custom-scrollbar">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-brand-textSecondary uppercase tracking-widest mb-3">Product Title</label>
                                        <input
                                            value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            type="text" required placeholder="Nova Pro Headphones V2" className="input py-4 text-lg font-bold"
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-xs font-bold text-brand-textSecondary uppercase tracking-widest mb-3">Price (USD)</label>
                                        <input
                                            value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })}
                                            type="number" step="0.01" required placeholder="149.00" className="input font-poppins"
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-xs font-bold text-brand-textSecondary uppercase tracking-widest mb-3">Inventory Level</label>
                                        <input
                                            value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                            type="number" required placeholder="12" className="input"
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-xs font-bold text-brand-textSecondary uppercase tracking-widest mb-3">Category</label>
                                        <select
                                            value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}
                                            className="input bg-white appearance-none cursor-pointer"
                                        >
                                            <option>Electronics</option>
                                            <option>Audio</option>
                                            <option>Accessories</option>
                                            <option>Fitness</option>
                                            <option>Home</option>
                                            <option>Tech</option>
                                        </select>
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-xs font-bold text-brand-textSecondary uppercase tracking-widest mb-3">Brand</label>
                                        <input
                                            value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })}
                                            type="text" placeholder="QuantumLabs" className="input"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-brand-textSecondary uppercase tracking-widest mb-3">Image URL</label>
                                        <input
                                            value={formData.images[0]} onChange={e => setFormData({ ...formData, images: [e.target.value] })}
                                            type="text" required placeholder="https://unsplash.com/..." className="input"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-brand-textSecondary uppercase tracking-widest mb-3">Product Description</label>
                                        <textarea
                                            value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                                            rows={4} required placeholder="Technical details, features, and specs..." className="input py-4 resize-none"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-5 pt-6 border-t border-brand-border">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-8 py-4 rounded-2xl font-bold text-brand-textSecondary hover:bg-brand-bg transition-all"
                                    >
                                        Discard
                                    </button>
                                    <button
                                        disabled={submitting}
                                        type="submit"
                                        className="btn-primary px-10 py-4 flex items-center gap-3 disabled:opacity-50"
                                    >
                                        {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                                        {modalMode === "add" ? "Launch Listing" : "Sync Updates"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
