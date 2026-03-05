"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Diamond, ShoppingBag, Store, Heart, ShoppingCart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const cartItems = useCartStore((state) => state.items);
    const wishlistItems = useWishlistStore((state) => state.items);

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const wishlistCount = wishlistItems.length;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/80 backdrop-blur-md px-6 md:px-10 py-4">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">

                {/* ── Logo ── */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-accent shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                            <Diamond size={20} fill="currentColor" />
                        </div>
                        <span className="text-xl font-black tracking-tight text-primary font-display">DealDrop</span>
                    </Link>
                    <nav className="hidden lg:flex items-center gap-6">
                        <Link className="text-sm font-bold text-primary/60 hover:text-primary transition-colors uppercase tracking-widest" href="/categories">Categories</Link>
                        <Link className="text-sm font-bold text-primary/60 hover:text-primary transition-colors uppercase tracking-widest" href="/deals">Deals</Link>
                        <Link className="text-sm font-bold text-primary/60 hover:text-primary transition-colors uppercase tracking-widest" href="/products">Shop</Link>
                    </nav>
                </div>

                {/* ── Search (Hidden on Mobile) ── */}
                <div className="hidden md:flex flex-1 max-w-md items-center mx-4">
                    <div className="relative w-full">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/30">search</span>
                        <input
                            className="w-full rounded-2xl border-2 border-transparent bg-primary/5 py-2.5 pl-12 pr-4 text-sm font-bold outline-none focus:bg-white focus:border-primary/10 transition-all font-body text-primary"
                            placeholder="Explore luxury drops..."
                            type="text"
                        />
                    </div>
                </div>

                {/* ── Action Icons ── */}
                <div className="flex items-center gap-2 md:gap-4">
                    <Link href="/wishlist" className="relative p-2 text-primary/60 hover:text-primary transition-all group">
                        <Heart size={22} className="group-hover:scale-110 transition-transform" />
                        {wishlistCount > 0 && (
                            <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-accent text-[9px] font-black rounded-full flex items-center justify-center shadow-lg border border-white">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>

                    <Link href="/cart" className="relative p-2 text-primary/60 hover:text-primary transition-all group">
                        <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-accent text-[9px] font-black rounded-full flex items-center justify-center shadow-lg border border-white">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <div className="hidden sm:block h-6 w-px bg-primary/10 mx-2" />

                    <Link href="/profile" className="hidden sm:flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-accent transition-all overflow-hidden border border-primary/5">
                            <User size={20} />
                        </div>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden w-11 h-11 rounded-2xl bg-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all ml-2"
                    >
                        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden overflow-hidden bg-white border-t border-primary/5 mt-4 -mx-6 md:-mx-10"
                    >
                        <div className="p-6 space-y-4">
                            {/* Mobile Search */}
                            <div className="relative w-full md:hidden mb-6">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/30">search</span>
                                <input
                                    className="w-full rounded-xl bg-primary/5 py-3 pl-12 pr-4 text-sm font-bold outline-none"
                                    placeholder="Search products..."
                                    type="text"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-1">
                                <Link onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-primary/5 text-primary transition-all font-black text-sm uppercase tracking-widest" href="/categories">
                                    Categories
                                </Link>
                                <Link onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-primary/5 text-primary transition-all font-black text-sm uppercase tracking-widest" href="/how-it-works">
                                    How it Works
                                </Link>
                                <Link onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-primary/5 text-primary transition-all font-black text-sm uppercase tracking-widest" href="/brands">
                                    Brands
                                </Link>
                            </div>

                            <div className="h-px bg-primary/5 my-4" />

                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <Link onClick={() => setIsMenuOpen(false)} href="/register?role=seller" className="flex flex-col items-center justify-center p-6 bg-primary rounded-[24px] text-white gap-3 shadow-xl shadow-primary/10">
                                    <Store size={24} className="text-accent" />
                                    <span className="font-black text-xs uppercase tracking-tighter">Become Seller</span>
                                </Link>
                                <Link onClick={() => setIsMenuOpen(false)} href="/store" className="flex flex-col items-center justify-center p-6 bg-accent rounded-[24px] text-primary gap-3 shadow-xl shadow-accent/10">
                                    <ShoppingBag size={24} />
                                    <span className="font-black text-xs uppercase tracking-tighter">Start Shopping</span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
