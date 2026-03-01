"use client";

import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Trash2, ShoppingCart, Heart, ArrowRight } from "lucide-react";

export default function WishlistPage() {
    const { items, removeFromWishlist } = useWishlistStore();
    const { addToCart } = useCartStore();

    return (
        <div className="container-main py-section min-h-[600px]">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-4xl font-extrabold text-brand-textPrimary font-poppins">My Wishlist</h1>
                    <span className="text-brand-textSecondary font-medium">{items.length} Items saved</span>
                </div>

                {items.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20 bg-white rounded-3xl border border-brand-border border-dashed"
                    >
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-textSecondary">
                            <Heart className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-brand-textPrimary mb-2">Your wishlist is empty</h2>
                        <p className="text-brand-textSecondary mb-8">Save items you love to keep track of them.</p>
                        <Link href="/products" className="btn-primary inline-flex items-center gap-2 px-8 py-3">
                            Start Shopping <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid gap-6">
                        <AnimatePresence mode="popLayout">
                            {items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-white p-6 rounded-2xl border border-brand-border flex flex-col sm:flex-row items-center gap-6 group hover:shadow-xl hover:shadow-brand-primary/5 transition-all"
                                >
                                    <Link href={`/product/${item.id}`} className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                                    </Link>

                                    <div className="flex-1 text-center sm:text-left">
                                        <Link href={`/product/${item.id}`}>
                                            <h3 className="text-xl font-bold text-brand-textPrimary hover:text-brand-primary transition-colors mb-1">{item.name}</h3>
                                        </Link>
                                        <p className="text-2xl font-poppins font-bold text-brand-primary">${item.price.toFixed(2)}</p>
                                    </div>

                                    <div className="flex items-center gap-3 w-full sm:w-auto">
                                        <button
                                            onClick={() => {
                                                addToCart({ ...item, quantity: 1 });
                                                removeFromWishlist(item.id);
                                            }}
                                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-primary/90 transition-colors shadow-lg shadow-brand-primary/20"
                                        >
                                            <ShoppingCart className="w-4 h-4" /> Move to Cart
                                        </button>
                                        <button
                                            onClick={() => removeFromWishlist(item.id)}
                                            className="p-3 bg-gray-50 text-brand-textSecondary hover:bg-brand-danger/10 hover:text-brand-danger rounded-xl transition-colors"
                                            title="Remove from wishlist"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}
