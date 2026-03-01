"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader2, ArrowRight, TrendingUp, History } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchResult {
    _id: string;
    name: string;
    price: number;
    category: string;
    images: string[];
}

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    // Initialize recent searches from localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('recentSearches');
            if (saved) setRecentSearches(JSON.parse(saved));
        }
    }, [isOpen]);

    // Handle Search API
    useEffect(() => {
        const fetchResults = async () => {
            if (query.length < 2) {
                setResults([]);
                return;
            }
            setLoading(true);
            try {
                const res = await fetch(`/api/products?search=${encodeURIComponent(query)}`);
                const data = await res.json();
                setResults(data.products.slice(0, 5) || []);
            } catch (error) {
                console.error("Search error", error);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(fetchResults, 300);
        return () => clearTimeout(timer);
    }, [query]);

    // Focus input on open
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const handleSearch = (searchTerm: string) => {
        if (!searchTerm.trim()) return;

        // Save to recent
        const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));

        router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-brand-textPrimary/40 backdrop-blur-md"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[70vh]"
                >
                    {/* Input Header */}
                    <div className="relative border-b border-brand-border p-6 flex items-center gap-4 bg-gray-50/50">
                        <Search className="w-6 h-6 text-brand-primary" />
                        <input
                            ref={inputRef}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
                            type="text"
                            placeholder="Search by product, brand, or category..."
                            className="bg-transparent border-none outline-none flex-1 text-lg font-bold text-brand-textPrimary placeholder:text-brand-textSecondary placeholder:font-medium"
                        />
                        {loading ? (
                            <Loader2 className="w-5 h-5 text-brand-primary animate-spin" />
                        ) : query ? (
                            <button onClick={() => setQuery("")}>
                                <X className="w-5 h-5 text-brand-textSecondary hover:text-brand-textPrimary" />
                            </button>
                        ) : (
                            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-white border border-brand-border rounded-lg text-[10px] font-bold text-brand-textSecondary shadow-sm">
                                <span>ESC</span>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="overflow-y-auto custom-scrollbar p-6">
                        {query.length < 2 ? (
                            <div className="space-y-8">
                                {/* Recent Searches */}
                                {recentSearches.length > 0 && (
                                    <section>
                                        <h3 className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-brand-textSecondary mb-4">
                                            <History className="w-3 h-3" /> Recent Searches
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {recentSearches.map((s, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleSearch(s)}
                                                    className="px-4 py-2 bg-brand-bg hover:bg-brand-primary/10 text-brand-textPrimary hover:text-brand-primary rounded-xl text-sm font-bold transition-all border border-brand-border hover:border-brand-primary/30"
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Quick Links / Trending */}
                                <section>
                                    <h3 className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-brand-textSecondary mb-4">
                                        <TrendingUp className="w-3 h-3" /> Trending Categories
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {["Electronics", "Audio", "Accessories", "Fitness", "Modern Home", "Tech Drops"].map((cat) => (
                                            <Link
                                                key={cat}
                                                href={`/products?category=${cat}`}
                                                onClick={onClose}
                                                className="p-4 bg-white border border-brand-border hover:border-brand-primary rounded-2xl text-sm font-bold text-brand-textPrimary hover:text-brand-primary transition-all group flex items-center justify-between shadow-sm"
                                            >
                                                {cat}
                                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {results.length > 0 ? (
                                    <>
                                        <h3 className="text-[10px] uppercase tracking-widest font-bold text-brand-textSecondary mb-4">Search Results</h3>
                                        {results.map((product) => (
                                            <Link
                                                key={product._id}
                                                href={`/product/${product._id}`}
                                                onClick={onClose}
                                                className="group flex items-center gap-5 p-4 rounded-2xl hover:bg-brand-bg border border-transparent hover:border-brand-border transition-all"
                                            >
                                                <div className="w-16 h-16 bg-brand-bg rounded-xl border border-brand-border overflow-hidden shrink-0 flex items-center justify-center transition-all group-hover:scale-105">
                                                    <img src={product.images[0]} alt="" className="w-full h-full object-cover mix-blend-multiply" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-bold text-brand-textPrimary line-clamp-1 mb-0.5">{product.name}</p>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">${product.price.toFixed(2)}</span>
                                                        <span className="w-1 h-1 bg-brand-border rounded-full" />
                                                        <span className="text-[10px] font-bold text-brand-textSecondary uppercase tracking-widest">{product.category}</span>
                                                    </div>
                                                </div>
                                                <ArrowRight className="w-5 h-5 text-brand-border group-hover:text-brand-primary transition-colors" />
                                            </Link>
                                        ))}
                                        {results.length >= 5 && (
                                            <button
                                                onClick={() => handleSearch(query)}
                                                className="w-full p-4 mt-4 bg-brand-bg hover:bg-brand-primary/5 text-brand-primary text-sm font-bold rounded-2xl border border-brand-border transition-all flex items-center justify-center gap-2"
                                            >
                                                View all results for &quot;{query}&quot;
                                            </button>
                                        )}
                                    </>
                                ) : !loading && (
                                    <div className="py-12 text-center text-brand-textSecondary flex flex-col items-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <Search className="w-8 h-8 text-gray-300" />
                                        </div>
                                        <p className="font-bold text-brand-textPrimary">No results found for &quot;{query}&quot;</p>
                                        <p className="text-sm mt-1">Try searching for generic terms like &quot;Audio&quot; or &quot;Laptop&quot;.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-4 bg-gray-50 border-t border-brand-border flex justify-between items-center text-[10px] font-bold text-brand-textSecondary uppercase tracking-widest">
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <span className="px-1.5 py-0.5 bg-white border border-brand-border rounded shadow-sm">ENTER</span>
                                <span>to Select</span>
                            </div>
                            <div className="flex items-center gap-2 text-brand-primary">
                                <span className="px-1.5 py-0.5 bg-white border border-brand-border rounded shadow-sm">CMD + K</span>
                                <span>Shortcut</span>
                            </div>
                        </div>
                        <p>Powered by NovaCart Engine</p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
