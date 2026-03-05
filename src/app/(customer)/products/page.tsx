"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Search, SlidersHorizontal, ChevronDown, Check, Star, Loader2, X, Tag } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AddToCartButton from "@/components/AddToCartButton";
import DealTimer from "@/components/DealTimer";
import WishlistButton from "@/components/WishlistButton";
import { useSearchParams } from "next/navigation";

interface SearchProduct {
    _id: string; name: string; price: number; category: string;
    brand: string; images: string[]; rating: number;
    discountPercentage: number; dealEndsAt?: string; stock: number; tags: string[];
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

const CATEGORIES = ["Haute Couture", "Streetwear", "Footwear", "Electronics", "Audio", "Home Tech", "Fashion"];

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const [products, setProducts] = useState<SearchProduct[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [brands, setBrands] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [activeTags, setActiveTags] = useState<string[]>([]);

    const [filters, setFilters] = useState({
        category: "all", brand: "all", min: "", max: "",
        rating: "", inStock: false, onDeal: false, sort: "featured",
    });
    const [page, setPage] = useState(1);
    const isFirstMount = useRef(true);

    // Sync URL params on mount
    useEffect(() => {
        const cat = searchParams.get("category");
        if (cat) setFilters(prev => ({ ...prev, category: cat }));
    }, [searchParams]);

    const buildQuery = useCallback((p: number) => {
        const params = new URLSearchParams();
        if (filters.category !== "all") params.append("category", filters.category);
        if (filters.brand !== "all") params.append("brand", filters.brand);
        if (filters.min) params.append("min", filters.min);
        if (filters.max) params.append("max", filters.max);
        if (filters.rating) params.append("rating", filters.rating);
        if (filters.inStock) params.append("inStock", "true");
        if (filters.onDeal) params.append("onDeal", "true");
        const search = searchParams.get("search");
        if (search) params.append("search", search);
        params.append("sort", filters.sort);
        params.append("page", String(p));
        params.append("limit", "24");
        return params.toString();
    }, [filters, searchParams]);

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
    }, [filters, searchParams]); // eslint-disable-line

    useEffect(() => { fetchProducts(1, false); }, []); // eslint-disable-line

    const handleLoadMore = () => {
        const next = page + 1;
        setPage(next);
        fetchProducts(next, true);
    };

    const setFilter = (key: string, value: string | boolean) => setFilters(prev => ({ ...prev, [key]: value }));
    const clearAll = () => { setFilters({ category: "all", brand: "all", min: "", max: "", rating: "", inStock: false, onDeal: false, sort: "featured" }); setActiveTags([]); };

    const activeFilterCount = [
        filters.category !== "all", filters.brand !== "all",
        !!filters.min, !!filters.max, !!filters.rating,
        filters.inStock, filters.onDeal,
    ].filter(Boolean).length;

    // ─── FILTER PANEL ──────────────────────────────────────
    const FilterPanel = () => (
        <div className="space-y-8">
            {/* Category */}
            <div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-brand-textSecondary mb-4">Category</h3>
                <div className="space-y-1">
                    {["all", ...CATEGORIES].map((cat) => (
                        <button key={cat} onClick={() => setFilter("category", cat)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all ${filters.category === cat ? "bg-brand-primary text-white font-bold" : "hover:bg-brand-bg text-brand-textSecondary hover:text-brand-textPrimary"}`}>
                            {cat === "all" ? "All Categories" : cat}
                            {filters.category === cat && <Check className="w-3.5 h-3.5" />}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-px bg-brand-border" />

            {/* Sort */}
            <div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-brand-textSecondary mb-4">Sort By</h3>
                <div className="space-y-1">
                    {SORT_OPTIONS.map((opt) => (
                        <button key={opt.value} onClick={() => setFilter("sort", opt.value)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all ${filters.sort === opt.value ? "bg-brand-primary text-white font-bold" : "hover:bg-brand-bg text-brand-textSecondary"}`}>
                            {opt.label}
                            {filters.sort === opt.value && <Check className="w-3.5 h-3.5" />}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-px bg-brand-border" />

            {/* Price */}
            <div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-brand-textSecondary mb-4">Price Range</h3>
                <div className="flex items-center gap-2">
                    <div className="relative w-full">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-textSecondary text-xs">₹</span>
                        <input type="number" placeholder="0" value={filters.min} onChange={e => setFilter("min", e.target.value)}
                            className="w-full pl-7 pr-3 py-2 text-sm bg-brand-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none" />
                    </div>
                    <span className="text-brand-textSecondary text-sm">–</span>
                    <div className="relative w-full">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-textSecondary text-xs">₹</span>
                        <input type="number" placeholder="99K" value={filters.max} onChange={e => setFilter("max", e.target.value)}
                            className="w-full pl-7 pr-3 py-2 text-sm bg-brand-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none" />
                    </div>
                </div>
            </div>

            <div className="h-px bg-brand-border" />

            {/* Rating */}
            <div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-brand-textSecondary mb-4">Min Rating</h3>
                <div className="space-y-1">
                    {[4.5, 4, 3.5, 3].map((r) => (
                        <button key={r} onClick={() => setFilter("rating", filters.rating === String(r) ? "" : String(r))}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${filters.rating === String(r) ? "bg-brand-primary text-white" : "hover:bg-brand-bg"}`}>
                            <div className="flex text-yellow-400">
                                {[1, 2, 3, 4, 5].map(s =>
                                    <Star key={s} className={`w-3.5 h-3.5 ${s <= r ? "fill-current" : "opacity-30 fill-current"}`} />
                                )}
                            </div>
                            <span className={`text-xs font-bold ${filters.rating === String(r) ? "text-white" : "text-brand-textSecondary"}`}>{r}+ stars</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-px bg-brand-border" />

            {/* Brand */}
            {brands.length > 0 && (
                <div>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-brand-textSecondary mb-4">Brand</h3>
                    <div className="space-y-1 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                        {brands.map((b) => (
                            <button key={b} onClick={() => setFilter("brand", filters.brand === b ? "all" : b)}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all ${filters.brand === b ? "bg-brand-primary text-white font-bold" : "hover:bg-brand-bg text-brand-textSecondary"}`}>
                                {b}
                                {filters.brand === b && <Check className="w-3.5 h-3.5" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="h-px bg-brand-border" />

            {/* Toggles */}
            <div className="space-y-3">
                {[
                    { label: "In Stock Only", key: "inStock", val: filters.inStock },
                    { label: "On Sale", key: "onDeal", val: filters.onDeal },
                ].map(({ label, key, val }) => (
                    <label key={key} className="flex items-center justify-between cursor-pointer group rounded-xl px-3 py-2 hover:bg-brand-bg transition-all">
                        <span className="text-sm font-medium text-brand-textPrimary">{label}</span>
                        <div onClick={() => setFilter(key, !val)}
                            className={`w-11 h-6 rounded-full p-0.5 transition-colors relative cursor-pointer ${val ? "bg-brand-primary" : "bg-gray-300"}`}>
                            <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${val ? "translate-x-5" : "translate-x-0"}`} />
                        </div>
                    </label>
                ))}
            </div>

            {activeFilterCount > 0 && (
                <button onClick={clearAll}
                    className="w-full py-2.5 text-sm font-bold text-brand-danger border border-brand-danger/30 rounded-xl hover:bg-brand-danger/5 transition-all">
                    Clear All Filters ({activeFilterCount})
                </button>
            )}
        </div>
    );

    return (
        <div className="bg-[#F8FAFC] min-h-screen">
            {/* Mobile Filter Overlay */}
            <AnimatePresence>
                {mobileFilterOpen && (
                    <motion.div className="fixed inset-0 z-50 flex" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileFilterOpen(false)} />
                        <motion.div className="relative ml-auto w-[85%] max-w-sm bg-white h-full overflow-y-auto p-6"
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }}>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-black font-poppins">Filters</h2>
                                <button onClick={() => setMobileFilterOpen(false)} className="p-2 rounded-xl hover:bg-brand-bg">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <FilterPanel />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container-main py-8 md:py-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 pt-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-brand-textPrimary font-poppins mb-1">
                            {searchParams.get("search") ? `"${searchParams.get("search")}"` :
                                filters.category !== "all" ? filters.category : "Shop All Drops"}
                        </h1>
                        <p className="text-brand-textSecondary">
                            {pagination ? `${pagination.total.toLocaleString()} products` : "Loading..."}
                            {filters.category !== "all" && ` in ${filters.category}`}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button onClick={() => setMobileFilterOpen(true)}
                            className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-brand-border rounded-xl text-sm font-medium shadow-sm flex-1 justify-center relative">
                            <SlidersHorizontal className="w-4 h-4" /> Filters
                            {activeFilterCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>
                        <div className="relative flex-1 md:w-[220px]">
                            <select className="appearance-none w-full px-4 py-2.5 bg-white border border-brand-border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/20 shadow-sm cursor-pointer"
                                value={filters.sort} onChange={e => setFilter("sort", e.target.value)}>
                                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-textSecondary pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Active filter chips */}
                <AnimatePresence>
                    {activeFilterCount > 0 && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                            className="flex flex-wrap gap-2 mb-6">
                            {filters.category !== "all" && (
                                <span onClick={() => setFilter("category", "all")}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded-full cursor-pointer hover:bg-brand-primary/20">
                                    {filters.category} <X className="w-3 h-3" />
                                </span>
                            )}
                            {filters.brand !== "all" && (
                                <span onClick={() => setFilter("brand", "all")}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded-full cursor-pointer">
                                    {filters.brand} <X className="w-3 h-3" />
                                </span>
                            )}
                            {filters.inStock && (
                                <span onClick={() => setFilter("inStock", false)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 text-xs font-bold rounded-full cursor-pointer">
                                    In Stock <X className="w-3 h-3" />
                                </span>
                            )}
                            {filters.onDeal && (
                                <span onClick={() => setFilter("onDeal", false)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-600 text-xs font-bold rounded-full cursor-pointer">
                                    <Tag className="w-3 h-3" /> On Sale <X className="w-3 h-3" />
                                </span>
                            )}
                            {filters.rating && (
                                <span onClick={() => setFilter("rating", "")}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full cursor-pointer">
                                    ⭐ {filters.rating}+ <X className="w-3 h-3" />
                                </span>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex gap-8 items-start">
                    {/* Sidebar (Desktop) */}
                    <aside className="hidden md:block w-[260px] flex-shrink-0 sticky top-24 bg-white border border-brand-border rounded-3xl p-6 shadow-sm max-h-[85vh] overflow-y-auto custom-scrollbar">
                        <FilterPanel />
                    </aside>

                    {/* Product Grid */}
                    <main className="flex-1 min-w-0">
                        {loading ? (
                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className="bg-white rounded-2xl border border-brand-border overflow-hidden animate-pulse">
                                        <div className="aspect-[4/3] bg-gray-100" />
                                        <div className="p-4 space-y-2">
                                            <div className="h-3 w-1/3 bg-gray-100 rounded" />
                                            <div className="h-4 w-3/4 bg-gray-100 rounded" />
                                            <div className="h-6 w-1/2 bg-gray-100 rounded mt-3" />
                                            <div className="h-10 w-full bg-gray-100 rounded mt-2" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : products.length === 0 ? (
                            <div className="bg-white rounded-3xl border border-brand-border flex flex-col items-center justify-center py-28 text-center px-6">
                                <div className="w-16 h-16 bg-brand-bg rounded-full flex items-center justify-center mb-5">
                                    <Search className="w-7 h-7 text-brand-textSecondary" />
                                </div>
                                <h2 className="text-2xl font-bold text-brand-textPrimary font-poppins mb-2">No products found</h2>
                                <p className="text-brand-textSecondary mb-6 max-w-sm">Try adjusting your filters or search terms.</p>
                                <button onClick={clearAll} className="btn-secondary">Clear all filters</button>
                            </div>
                        ) : (
                            <>
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                    <AnimatePresence>
                                        {products.map((product, i) => (
                                            <motion.div key={product._id} layout
                                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: Math.min(i * 0.03, 0.3) }}
                                                className="bg-white border border-brand-border rounded-2xl overflow-hidden group hover:shadow-lg hover:shadow-brand-primary/8 hover:-translate-y-1 transition-all duration-300 relative flex flex-col">

                                                {product.discountPercentage > 0 && (
                                                    <div className="absolute top-3 left-3 z-20 bg-brand-danger text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                                                        -{product.discountPercentage}%
                                                    </div>
                                                )}
                                                <div className="absolute top-3 right-3 z-20">
                                                    <WishlistButton product={{ id: product._id, name: product.name, price: product.price, image: product.images[0] }} />
                                                </div>
                                                {product.stock === 0 && (
                                                    <div className="absolute inset-0 z-10 bg-white/60 flex items-center justify-center">
                                                        <span className="bg-black/70 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Out of Stock</span>
                                                    </div>
                                                )}

                                                <Link href={`/product/${product._id}`} className="block aspect-[4/3] bg-gray-50 overflow-hidden">
                                                    <img src={product.images[0]} alt={product.name}
                                                        className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500 p-4" />
                                                </Link>

                                                <div className="p-4 flex flex-col flex-1">
                                                    <div className="flex items-center justify-between mb-1.5">
                                                        <span className="text-[9px] font-black uppercase tracking-widest text-brand-primary bg-brand-primary/8 px-2 py-0.5 rounded">
                                                            {product.category}
                                                        </span>
                                                        <div className="flex items-center gap-1">
                                                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                            <span className="text-[10px] font-bold text-brand-textSecondary">{product.rating}</span>
                                                        </div>
                                                    </div>
                                                    <Link href={`/product/${product._id}`}>
                                                        <h3 className="text-sm font-bold text-brand-textPrimary line-clamp-2 leading-snug mb-1 group-hover:text-brand-primary transition-colors">
                                                            {product.name}
                                                        </h3>
                                                    </Link>
                                                    <p className="text-[11px] text-brand-textSecondary mb-2">{product.brand}</p>

                                                    {product.dealEndsAt && (
                                                        <div className="mb-2 scale-[0.85] -translate-x-1 origin-left">
                                                            <DealTimer targetDate={product.dealEndsAt} />
                                                        </div>
                                                    )}

                                                    <div className="flex items-baseline gap-2 mt-auto mb-3">
                                                        <span className="text-lg font-black font-poppins text-brand-textPrimary">
                                                            ₹{product.discountPercentage > 0
                                                                ? (product.price * (1 - product.discountPercentage / 100)).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
                                                                : product.price.toLocaleString('en-IN')}
                                                        </span>
                                                        {product.discountPercentage > 0 && (
                                                            <span className="text-xs text-brand-textSecondary line-through">₹{product.price.toLocaleString('en-IN')}</span>
                                                        )}
                                                    </div>

                                                    <AddToCartButton
                                                        product={{ id: product._id, name: product.name, price: product.price, image: product.images[0] }}
                                                        className={`w-full py-2.5 rounded-xl border-2 text-xs font-bold transition-all ${product.stock > 0
                                                            ? "border-brand-border text-brand-textPrimary hover:bg-brand-primary hover:border-brand-primary hover:text-white"
                                                            : "border-gray-100 text-gray-300 bg-gray-50 cursor-not-allowed pointer-events-none"}`}
                                                    />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Load More */}
                                {pagination?.hasNext && (
                                    <div className="flex flex-col items-center mt-12 gap-3">
                                        <p className="text-sm text-brand-textSecondary">
                                            Showing {products.length} of {pagination.total} products
                                        </p>
                                        <button onClick={handleLoadMore} disabled={loadingMore}
                                            className="btn-secondary px-12 py-4 flex items-center gap-3 disabled:opacity-60">
                                            {loadingMore
                                                ? <><Loader2 className="w-4 h-4 animate-spin" /> Loading...</>
                                                : `Load More (${pagination.total - products.length} remaining)`}
                                        </button>
                                        <div className="h-1 w-48 bg-brand-border rounded-full overflow-hidden">
                                            <div className="h-full bg-brand-primary rounded-full transition-all"
                                                style={{ width: `${(products.length / pagination.total) * 100}%` }} />
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
