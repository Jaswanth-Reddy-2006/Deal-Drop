"use client";

import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Trash2, ShoppingCart, Heart, ArrowRight, ShoppingBag } from "lucide-react";

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
                    <div className="flex flex-col items-center justify-center py-32 bg-white border border-brand-border rounded-[60px] shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 blur-[100px] rounded-full" />
                        <div className="w-24 h-24 bg-brand-primary/5 rounded-[40px] flex items-center justify-center mb-8 -rotate-6">
                            <Heart className="w-10 h-10 text-brand-primary" />
                        </div>
                        <h2 className="text-brand-textPrimary text-3xl font-black font-display mb-4">Nothing here yet.</h2>
                        <p className="text-brand-textSecondary mb-10 max-w-md text-center text-lg font-medium leading-relaxed">
                            Curate your dream collection. Save your favorite drops and secure them before they disappear.
                        </p>
                        <Link href="/products" className="bg-primary text-accent px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20">
                            Explore Shop
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {items.map((item) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    key={item.id}
                                    className="group bg-white border border-brand-border rounded-[50px] overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 relative flex flex-col"
                                >
                                    <button
                                        onClick={() => removeFromWishlist(item.id)}
                                        className="absolute top-8 right-8 z-20 w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-red-500 hover:border-red-500 transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>

                                    <Link href={`/product/${item.id}`} className="block relative aspect-square bg-[#F8F9FA] overflow-hidden p-8">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-1000" />
                                        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                                    </Link>

                                    <div className="p-10 flex flex-col flex-1">
                                        <div className="mb-8">
                                            <Link href={`/product/${item.id}`} className="text-2xl font-black text-primary leading-tight hover:text-brand-primary transition-colors block line-clamp-2">
                                                {item.name}
                                            </Link>
                                        </div>

                                        <div className="flex items-center justify-between mt-auto">
                                            <p className="text-3xl font-display font-black text-primary">₹{item.price.toLocaleString('en-IN')}</p>
                                            <button
                                                onClick={() => {
                                                    addToCart({
                                                        id: item.id,
                                                        name: item.name,
                                                        price: item.price,
                                                        image: item.image,
                                                        quantity: 1
                                                    });
                                                    removeFromWishlist(item.id);
                                                }}
                                                className="w-14 h-14 bg-primary text-accent rounded-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-xl shadow-primary/20"
                                                title="Move to Cart"
                                            >
                                                <ShoppingBag className="w-6 h-6" />
                                            </button>
                                        </div>
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
