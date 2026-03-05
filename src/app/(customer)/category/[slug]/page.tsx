"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Search, SlidersHorizontal, ChevronDown, Check, Star, Loader2, X, Tag, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AddToCartButton from "@/components/AddToCartButton";
import WishlistButton from "@/components/WishlistButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useParams, useRouter } from "next/navigation";

interface SearchProduct {
    _id: string; name: string; price: number; category: string;
    brand: string; images: string[]; rating: number;
    discountPercentage: number; stock: number; tags: string[];
}

interface Pagination { page: number; limit: number; total: number; pages: number; hasNext: boolean; hasPrev: boolean; }

const SORT_OPTIONS = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest" },
    { value: "rating", label: "Top Rated" },
    { value: "discount", label: "Best Deals" },
    { value: "price_asc", label: "Price: Low → High" },
    { value: "price_desc", label: "Price: High → Low" },
];

export default function CategoryListingPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

    const [products, setProducts] = useState<SearchProduct[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [brands, setBrands] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    const [filters, setFilters] = useState({
        brand: "all", min: "", max: "",
        rating: "", inStock: false, onDeal: false, sort: "featured",
    });
    const [page, setPage] = useState(1);
    const isFirstMount = useRef(true);

    const buildQuery = useCallback((p: number) => {
        const queryParams = new URLSearchParams();
        queryParams.append("category", categoryName);
        if (filters.brand !== "all") queryParams.append("brand", filters.brand);
        if (filters.min) queryParams.append("min", filters.min);
        if (filters.max) queryParams.append("max", filters.max);
        if (filters.rating) queryParams.append("rating", filters.rating);
        if (filters.inStock) queryParams.append("inStock", "true");
        if (filters.onDeal) queryParams.append("onDeal", "true");
        queryParams.append("sort", filters.sort);
        queryParams.append("page", String(p));
        queryParams.append("limit", "24");
        return queryParams.toString();
    }, [filters, categoryName]);

    const fetchProducts = useCallback(async (p = 1, append = false) => {
        if (!append) setLoading(true); else setLoadingMore(true);
        try {
            const res = await fetch(`/api/products?${buildQuery(p)}`);
            const data = await res.json();
            setProducts(prev => append ? [...prev, ...(data.products || [])] : (data.products || []));
            setPagination(data.pagination || null);
            setBrands(data.brands || []);
        } catch (e) { console.error(e); }
        finally { setLoading(false); setLoadingMore(false); }
    }, [buildQuery]);

    useEffect(() => {
        if (isFirstMount.current) { isFirstMount.current = false; return; }
        setPage(1);
        fetchProducts(1, false);
    }, [filters]);

    useEffect(() => { fetchProducts(1, false); }, []);

    const handleLoadMore = () => {
        const next = page + 1;
        setPage(next);
        fetchProducts(next, true);
    };

    const setFilter = (key: string, value: string | boolean) => setFilters(prev => ({ ...prev, [key]: value }));
    const clearAll = () => setFilters({ brand: "all", min: "", max: "", rating: "", inStock: false, onDeal: false, sort: "featured" });

    const activeFilterCount = [
        filters.brand !== "all", !!filters.min, !!filters.max, !!filters.rating,
        filters.inStock, filters.onDeal,
    ].filter(Boolean).length;

    const FilterPanel = () => (
        <div className="space-y-8">
            <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 mb-6">Sort By</h3>
                <div className="space-y-1">
                    {SORT_OPTIONS.map((opt) => (
                        <button key={opt.value} onClick={() => setFilter("sort", opt.value)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${filters.sort === opt.value ? "bg-primary text-accent shadow-lg shadow-primary/20" : "hover:bg-primary/5 text-primary/60 hover:text-primary"}`}>
                            {opt.label}
                            {filters.sort === opt.value && <Check className="w-4 h-4" />}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-px bg-primary/5" />

            <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 mb-6">Price Range</h3>
                <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-primary/30">₹</span>
                        <input type="number" placeholder="0" value={filters.min} onChange={e => setFilter("min", e.target.value)}
                            className="w-full pl-8 pr-4 py-3 text-sm font-bold bg-primary/5 border border-transparent rounded-2xl focus:bg-white focus:border-primary/10 outline-none transition-all" />
                    </div>
                    <span className="text-primary/20 text-sm">–</span>
                    <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-primary/30">₹</span>
                        <input type="number" placeholder="99k" value={filters.max} onChange={e => setFilter("max", e.target.value)}
                            className="w-full pl-8 pr-4 py-3 text-sm font-bold bg-primary/5 border border-transparent rounded-2xl focus:bg-white focus:border-primary/10 outline-none transition-all" />
                    </div>
                </div>
            </div>

            <div className="h-px bg-primary/5" />

            {brands.length > 0 && (
                <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 mb-6">Brand</h3>
                    <div className="space-y-1 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                        {brands.map((b) => (
                            <button key={b} onClick={() => setFilter("brand", filters.brand === b ? "all" : b)}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${filters.brand === b ? "bg-primary text-accent shadow-lg" : "hover:bg-primary/5 text-primary/60 hover:text-primary"}`}>
                                {b}
                                {filters.brand === b && <Check className="w-4 h-4" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="h-px bg-primary/5" />

            <div className="space-y-3">
                {[
                    { label: "In Stock Only", key: "inStock", val: filters.inStock },
                    { label: "On Sale Deals", key: "onDeal", val: filters.onDeal },
                ].map(({ label, key, val }) => (
                    <label key={key} className="flex items-center justify-between cursor-pointer group rounded-2xl px-4 py-3 hover:bg-primary/5 transition-all">
                        <span className="text-sm font-bold text-primary group-hover:text-primary transition-colors">{label}</span>
                        <div onClick={() => setFilter(key, !val)}
                            className={`w-12 h-6.5 rounded-full p-1 transition-all relative cursor-pointer ${val ? "bg-primary" : "bg-primary/10"}`}>
                            <div className={`w-4.5 h-4.5 bg-white rounded-full shadow-sm transition-transform duration-300 ${val ? "translate-x-5.5" : "translate-x-0"}`} />
                        </div>
                    </label>
                ))}
            </div>

            {activeFilterCount > 0 && (
                <button onClick={clearAll}
                    className="w-full py-4 text-xs font-black uppercase tracking-widest text-red-500 border border-red-500/10 rounded-2xl hover:bg-red-500/5 transition-all mt-4">
                    Reset Selection ({activeFilterCount})
                </button>
            )}
        </div>
    );

    return (
        <div className="bg-[#F8FAFC] min-h-screen">
            <Navbar />

            {/* Mobile Filter Overlay */}
            <AnimatePresence>
                {mobileFilterOpen && (
                    <motion.div className="fixed inset-0 z-[60] flex" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="absolute inset-0 bg-primary/40 backdrop-blur-md" onClick={() => setMobileFilterOpen(false)} />
                        <motion.div className="relative ml-auto w-[85%] max-w-sm bg-white h-full overflow-y-auto p-10"
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }}>
                            <div className="flex items-center justify-between mb-12">
                                <h2 className="text-3xl font-black font-display text-primary">Filters</h2>
                                <button onClick={() => setMobileFilterOpen(false)} className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                                    <X size={24} />
                                </button>
                            </div>
                            <FilterPanel />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                            <span className="text-[10px] font-black text-primary/40 uppercase tracking-[0.3em]">Drop Category</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-primary font-display tracking-tight leading-none">
                            {categoryName}
                        </h1>
                        <p className="text-primary/40 font-bold max-w-md">
                            Exploring {pagination ? pagination.total : "..."} curated listings in the {categoryName} drop.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button onClick={() => setMobileFilterOpen(true)}
                            className="md:hidden flex items-center gap-3 px-6 py-4 bg-white border border-primary/5 rounded-[24px] text-xs font-black uppercase tracking-widest text-primary shadow-xl shadow-black/5 flex-1 relative">
                            <SlidersHorizontal size={18} /> Filters
                            {activeFilterCount > 0 && (
                                <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-accent text-[10px] font-black rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>
                        <div className="relative group flex-1 md:w-[240px]">
                            <select className="appearance-none w-full px-6 py-4 bg-white border border-primary/5 rounded-[24px] text-xs font-black uppercase tracking-widest text-primary/60 hover:text-primary focus:outline-none shadow-xl shadow-black/5 cursor-pointer transition-all"
                                value={filters.sort} onChange={e => setFilter("sort", e.target.value)}>
                                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>
                            <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-primary/30 pointer-events-none group-hover:text-primary transition-colors" />
                        </div>
                    </div>
                </div>

                <div className="flex gap-12 items-start">
                    {/* Sidebar (Desktop) */}
                    <aside className="hidden md:block w-[280px] flex-shrink-0 sticky top-32 bg-white rounded-[40px] p-10 border border-primary/5 shadow-xl shadow-black/5 max-h-[80vh] overflow-y-auto custom-scrollbar">
                        <FilterPanel />
                    </aside>

                    {/* Product Grid */}
                    <main className="flex-1 min-w-0">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="aspect-[3/4] bg-white rounded-[40px] border border-primary/5 overflow-hidden animate-pulse" />
                                ))}
                            </div>
                        ) : products.length === 0 ? (
                            <div className="bg-white rounded-[50px] border border-primary/5 flex flex-col items-center justify-center py-32 text-center px-8 shadow-sm">
                                <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mb-8">
                                    <Search size={32} className="text-primary/20" />
                                </div>
                                <h2 className="text-3xl font-black text-primary font-display mb-4">Drop Not Found</h2>
                                <p className="text-primary/40 font-bold mb-10 max-w-xs">Try adjusting your filters or check back later for new arrivals.</p>
                                <button onClick={clearAll} className="bg-primary text-accent px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">Clear All Filters</button>
                            </div>
                        ) : (
                            <>
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                                    <AnimatePresence mode="popLayout">
                                        {products.map((product, i) => (
                                            <motion.div key={product._id} layout
                                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ delay: Math.min(i * 0.05, 0.4) }}
                                                className="bg-white group rounded-[40px] overflow-hidden border border-transparent hover:border-accent/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 relative flex flex-col"
                                            >
                                                <div className="absolute top-6 right-6 z-20">
                                                    <WishlistButton product={{ id: product._id, name: product.name, price: product.price, image: product.images[0] }} />
                                                </div>

                                                <Link href={`/product/${product._id}`} className="block aspect-square bg-[#F8F9FA] overflow-hidden relative">
                                                    <img src={product.images[0]} alt={product.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                                    {product.discountPercentage > 0 && (
                                                        <div className="absolute top-6 left-6 bg-red-500 text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter shadow-xl">
                                                            -{product.discountPercentage}% OFF
                                                        </div>
                                                    )}
                                                    {product.stock === 0 && (
                                                        <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
                                                            <span className="bg-primary text-accent text-[9px] font-black uppercase tracking-[0.3em] px-5 py-2 rounded-full">Sold Out</span>
                                                        </div>
                                                    )}
                                                </Link>

                                                <div className="p-8 flex flex-col flex-1">
                                                    <div className="flex items-center justify-between mb-3 text-[10px] font-black uppercase tracking-widest text-primary/30">
                                                        <span>{categoryName}</span>
                                                        <div className="flex items-center gap-1.5 bg-primary/5 px-2.5 py-1 rounded-full text-primary/60">
                                                            <Star size={10} className="fill-[#F5E74E] text-[#F5E74E]" /> {product.rating}
                                                        </div>
                                                    </div>
                                                    <Link href={`/product/${product._id}`}>
                                                        <h3 className="text-xl font-black text-primary leading-tight mb-6 line-clamp-2 group-hover:text-primary/70 transition-colors">
                                                            {product.name}
                                                        </h3>
                                                    </Link>

                                                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-primary/5">
                                                        <div className="flex flex-col">
                                                            <span className="text-3xl font-display font-black text-primary">
                                                                ₹{product.discountPercentage > 0
                                                                    ? (product.price * (1 - product.discountPercentage / 100)).toLocaleString('en-IN')
                                                                    : product.price.toLocaleString('en-IN')}
                                                            </span>
                                                            {product.discountPercentage > 0 && (
                                                                <span className="text-xs text-primary/30 font-bold line-through ml-1">₹{product.price.toLocaleString('en-IN')}</span>
                                                            )}
                                                        </div>
                                                        <AddToCartButton
                                                            product={{ id: product._id, name: product.name, price: product.price, image: product.images[0] }}
                                                            className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl transition-all ${product.stock > 0
                                                                ? "bg-primary text-accent shadow-primary/20 hover:scale-110 active:scale-90"
                                                                : "bg-primary/5 text-primary/10 cursor-not-allowed pointer-events-none"}`}
                                                        >
                                                            <ShoppingBag size={20} />
                                                        </AddToCartButton>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Load More */}
                                {pagination?.hasNext && (
                                    <div className="flex flex-col items-center mt-20 gap-8">
                                        <div className="flex items-center gap-6 w-full max-w-sm">
                                            <div className="h-1 flex-1 bg-primary/5 rounded-full overflow-hidden">
                                                <motion.div className="h-full bg-primary"
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${(products.length / pagination.total) * 100}%` }} />
                                            </div>
                                            <span className="text-[10px] font-black text-primary/30 uppercase tracking-[0.2em]">
                                                {products.length} / {pagination.total}
                                            </span>
                                        </div>
                                        <button onClick={handleLoadMore} disabled={loadingMore}
                                            className="bg-white border-2 border-primary/5 px-16 py-5 rounded-full font-black text-xs uppercase tracking-[0.3em] text-primary shadow-xl h-20 shadow-black/5 hover:-translate-y-1 hover:shadow-primary/5 flex items-center gap-4 transition-all disabled:opacity-50">
                                            {loadingMore ? <Loader2 size={20} className="animate-spin" /> : "Load More Drops"}
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
}
