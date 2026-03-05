"use client";

import { useCartStore } from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartPage() {
    const [mounted, setMounted] = useState(false);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCartStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="container-main py-section min-h-[60vh] flex items-center justify-center">Loading...</div>;
    }

    const subtotal = getCartTotal();
    const shipping = subtotal > 100 ? 0 : (subtotal > 0 ? 15 : 0);
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return (
        <div className="container-main py-section min-h-[70vh]">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-extrabold text-brand-textPrimary font-poppins">Your Cart</h1>
                {items.length > 0 && (
                    <button
                        onClick={() => setShowClearConfirm(true)}
                        className="text-sm font-medium text-brand-textSecondary hover:text-brand-danger transition-colors"
                    >
                        Clear Cart
                    </button>
                )}
            </div>

            {/* Clear Confirm Modal Overlay */}
            <AnimatePresence>
                {showClearConfirm && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setShowClearConfirm(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="relative bg-white p-8 rounded-3xl max-w-sm w-full shadow-2xl text-center"
                        >
                            <div className="w-16 h-16 bg-red-50 text-brand-danger rounded-full flex items-center justify-center mx-auto mb-6">
                                <Trash2 className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-brand-textPrimary mb-2">Clear your cart?</h3>
                            <p className="text-brand-textSecondary mb-8">This will remove all items from your selection. This action cannot be undone.</p>
                            <div className="flex gap-4">
                                <button onClick={() => setShowClearConfirm(false)} className="flex-1 py-3 bg-gray-100 font-bold rounded-xl text-brand-textPrimary hover:bg-gray-200 transition-colors">Cancel</button>
                                <button
                                    onClick={() => { clearCart(); setShowClearConfirm(false); }}
                                    className="flex-1 py-3 bg-brand-danger text-white font-bold rounded-xl hover:bg-brand-danger/90 transition-colors"
                                >
                                    Yes, Clear
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 bg-white border border-brand-border rounded-[60px] shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[100px] rounded-full" />
                    <div className="w-24 h-24 bg-brand-primary/5 rounded-3xl flex items-center justify-center mb-8 rotate-3">
                        <ShoppingBag className="w-10 h-10 text-brand-primary" />
                    </div>
                    <h2 className="text-brand-textPrimary text-3xl font-black font-display mb-4">Your vault is empty.</h2>
                    <p className="text-brand-textSecondary mb-10 max-w-md text-center text-lg font-medium leading-relaxed">
                        The finest drops are waiting. Secure your piece of the Zenith Series now.
                    </p>
                    <Link href="/products" className="bg-primary text-accent px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Cart Items Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <AnimatePresence>
                                {items.map((item) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        key={item.id}
                                        className="group bg-white border border-brand-border rounded-[40px] p-6 hover:shadow-2xl hover:shadow-primary/5 transition-all flex flex-col relative"
                                    >
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-red-50 text-brand-danger opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all hover:bg-brand-danger hover:text-white"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>

                                        <Link href={`/product/${item.id}`} className="block aspect-square bg-[#F8F9FA] rounded-[32px] overflow-hidden mb-6">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                        </Link>

                                        <div className="flex-1 space-y-4">
                                            <Link href={`/product/${item.id}`} className="text-lg font-black text-primary leading-tight hover:text-brand-primary line-clamp-1 block transition-colors">
                                                {item.name}
                                            </Link>

                                            <div className="flex items-center justify-between">
                                                <p className="text-2xl font-display font-black text-primary">₹{item.price.toLocaleString('en-IN')}</p>

                                                <div className="flex items-center bg-primary/5 rounded-2xl p-1 border border-primary/5">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                        className="w-10 h-10 flex items-center justify-center text-primary/40 hover:text-primary transition-colors hover:bg-white rounded-xl"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="w-10 text-center font-black text-sm text-primary">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-10 h-10 flex items-center justify-center text-primary/40 hover:text-primary transition-colors hover:bg-white rounded-xl"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-6 border-t border-primary/5 flex items-center justify-between">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-primary/30">Total for item</span>
                                            <span className="text-xl font-display font-black text-primary">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <Link href="/products" className="inline-flex items-center gap-3 text-primary/40 hover:text-primary font-black text-xs uppercase tracking-widest transition-all mt-12 group">
                            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-2" />
                            Continue Shopping
                        </Link>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-[440px]">
                        <div className="bg-primary rounded-[50px] p-12 text-white sticky top-28 shadow-2xl shadow-primary/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] rounded-full" />
                            <h2 className="text-3xl font-display font-black mb-12 tracking-tight">Summary</h2>

                            <div className="space-y-6 mb-12">
                                <div className="flex justify-between text-white/40 font-bold">
                                    <span className="text-sm uppercase tracking-widest">Subtotal</span>
                                    <span className="text-white text-xl font-display font-black">₹{subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-white/40 font-bold items-center">
                                    <span className="text-sm uppercase tracking-widest">Shipping</span>
                                    <span className="text-accent text-xl font-display font-black">{shipping > 0 ? `₹${shipping.toLocaleString('en-IN')}` : "COMPLIMENTARY"}</span>
                                </div>
                                <div className="flex justify-between text-white/40 font-bold">
                                    <span className="text-sm uppercase tracking-widest">Est. Tax (8%)</span>
                                    <span className="text-white text-xl font-display font-black">₹{tax.toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <div className="border-t-2 border-white/10 pt-10 mb-12">
                                <div className="flex justify-between items-center text-4xl font-display font-black">
                                    <span className="tracking-tight">Total</span>
                                    <span className="text-accent">₹{total.toLocaleString('en-IN')}</span>
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mt-6 leading-relaxed">
                                    Final price calculated at the checkout vault. Complimentary returns available.
                                </p>
                            </div>

                            <Link href="/checkout" className="block w-full py-6 bg-accent text-primary text-center font-black rounded-full text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-accent/20">
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
