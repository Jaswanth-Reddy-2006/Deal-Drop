"use client";

import { useState, useEffect } from "react";
import { Zap, Timer, Star, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import DealTimer from "@/components/DealTimer";
import AddToCartButton from "@/components/AddToCartButton";
import WishlistButton from "@/components/WishlistButton";

interface DealProduct {
    _id: string;
    name: string;
    price: number;
    category: string;
    images: string[];
    rating: number;
    discountPercentage: number;
    dealEndsAt?: string;
    stock: number;
}

export default function DealsPage() {
    const [deals, setDeals] = useState<DealProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                // Fetch products that have a dealEndsAt field or high discount
                const res = await fetch("/api/products?sort=newest");
                const data = await res.json();
                // Filter for products with dealEndsAt or discount > 20%
                const filteredDeals = (data.products || []).filter((p: DealProduct) => p.dealEndsAt || p.discountPercentage >= 20);
                setDeals(filteredDeals);
            } catch (error) {
                console.error("Failed to fetch deals", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDeals();
    }, []);

    return (
        <div className="bg-[#F8FAFC] min-h-screen">
            {/* Header / Hero */}
            <section className="bg-brand-textPrimary text-white py-20 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="container-main relative z-10">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full mb-6 border border-white/10"
                        >
                            <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-xs font-bold uppercase tracking-widest text-yellow-400">Exclusive Flash Drops</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="text-white text-5xl md:text-6xl font-extrabold font-poppins mb-6"
                        >
                            NovaCart <span className="text-brand-primary">Hot Deals</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="text-gray-400 text-xl leading-relaxed max-w-2xl"
                        >
                            The heartbeat of our marketplace. Limited-time, limited-stock drops curated for the tech elite. Once they&apos;re gone, they&apos;re gone.
                        </motion.p>
                    </div>
                </div>
            </section>

            <div className="container-main py-16">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="card-premium h-[500px] animate-pulse bg-gray-100" />
                        ))}
                    </div>
                ) : deals.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {deals.map((product, i) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="card-premium flex flex-col p-0 overflow-hidden group border-2 border-transparent hover:border-brand-primary/20"
                            >
                                {/* Image Area */}
                                <div className="relative aspect-[4/3] bg-white overflow-hidden">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700 p-8"
                                    />

                                    {/* Badges */}
                                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                                        <div className="bg-brand-danger text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                            -{product.discountPercentage}% OFF
                                        </div>
                                        {product.stock < 10 && product.stock > 0 && (
                                            <div className="bg-yellow-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-lg">
                                                Only {product.stock} Left
                                            </div>
                                        )}
                                    </div>

                                    <div className="absolute top-4 right-4 z-20">
                                        <WishlistButton product={{ id: product._id, name: product.name, price: product.price, image: product.images[0] }} />
                                    </div>

                                    {/* Timer Overlay */}
                                    {product.dealEndsAt && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-brand-primary/95 text-white py-2 px-4 flex items-center justify-center gap-3 backdrop-blur-sm">
                                            <Timer className="w-4 h-4 animate-pulse" />
                                            <div className="text-sm font-bold scale-90">
                                                <DealTimer targetDate={product.dealEndsAt} />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Content Area */}
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest px-2 py-0.5 bg-brand-primary/10 rounded-md">
                                            {product.category}
                                        </span>
                                        <div className="flex items-center gap-1 text-xs text-brand-textSecondary ml-auto">
                                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {product.rating}
                                        </div>
                                    </div>

                                    <Link href={`/product/${product._id}`}>
                                        <h3 className="text-xl font-bold text-brand-textPrimary mb-2 group-hover:text-brand-primary transition-colors line-clamp-2">
                                            {product.name}
                                        </h3>
                                    </Link>

                                    <div className="flex items-baseline gap-3 mt-auto mb-6">
                                        <span className="text-3xl font-bold text-brand-primary">${product.price.toFixed(2)}</span>
                                        <span className="text-lg text-brand-textSecondary line-through opacity-50">
                                            ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                                        </span>
                                    </div>

                                    <AddToCartButton
                                        product={{ id: product._id, name: product.name, price: product.price, image: product.images[0] }}
                                        className="w-full py-4 text-base rounded-2xl"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-brand-border">
                        <ShoppingBag className="w-16 h-16 text-brand-border mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-brand-textPrimary mb-2">No Active Flash Deals</h2>
                        <p className="text-brand-textSecondary mb-8">All current drops have been claimed. Check back in a few hours!</p>
                        <Link href="/products" className="btn-primary inline-flex">
                            Browse Marketplace
                        </Link>
                    </div>
                )}
            </div>

            {/* Newsletter / CTA */}
            <section className="container-main pb-24">
                <div className="bg-brand-primary rounded-[40px] p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/5 opacity-20 pointer-events-none" />
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Want First Dibs?</h2>
                    <p className="text-white/80 max-w-xl mx-auto mb-10 text-lg relative z-10">
                        Join our inner circle to receive SMS alerts 15 minutes before any major drop goes live.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 sm:min-w-[300px]"
                        />
                        <button className="bg-white text-brand-primary px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform">
                            Alert Me
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
