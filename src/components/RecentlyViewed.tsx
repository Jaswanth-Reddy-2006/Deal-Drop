/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import AddToCartButton from "./AddToCartButton";
import { motion } from "framer-motion";

export interface ViewedProduct {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    rating: number;
}

export default function RecentlyViewed() {
    const [viewedItems, setViewedItems] = useState<ViewedProduct[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem("recentlyViewed");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) setViewedItems(parsed);
            } catch {
                console.error("Failed parsing recentlyViewed localstorage.");
            }
        }
    }, []);

    if (!mounted || viewedItems.length === 0) return null;

    return (
        <section className="py-20 border-t border-brand-border/50">
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-extrabold font-poppins text-brand-textPrimary">Recently Viewed</h2>
            </div>

            <div className="flex gap-8 overflow-x-auto pb-10 snap-x hide-scrollbar">
                {viewedItems.map((product, idx) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={product.id}
                        className="snap-center min-w-[280px] sm:min-w-[320px] card-premium p-0 overflow-hidden flex flex-col group"
                    >
                        <Link href={`/product/${product.id}`} className="block relative aspect-[4/3] bg-brand-bg overflow-hidden shrink-0">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500 p-6" />
                        </Link>

                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] font-bold tracking-widest text-brand-primary uppercase">{product.category}</span>
                                <div className="flex items-center text-yellow-500 text-xs gap-1">
                                    <Star className="w-3 h-3 fill-current" /> {product.rating}
                                </div>
                            </div>

                            <Link href={`/product/${product.id}`} className="font-bold text-lg text-brand-textPrimary group-hover:text-brand-primary line-clamp-2 leading-tight transition-colors mb-4">
                                {product.name}
                            </Link>

                            <div className="mt-auto flex items-center justify-between gap-4">
                                <span className="text-xl font-bold text-brand-textPrimary font-poppins">${product.price.toFixed(2)}</span>
                                <AddToCartButton
                                    product={{ id: product.id, name: product.name, price: product.price, image: product.image }}
                                    className="px-4 py-2 border-2 border-brand-border rounded-xl text-xs font-bold hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all shadow-sm"
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
