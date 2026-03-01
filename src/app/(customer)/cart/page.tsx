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
                <div className="flex flex-col items-center justify-center py-20 bg-white border border-brand-border rounded-[40px] shadow-sm">
                    <div className="w-24 h-24 bg-brand-primary/5 rounded-full flex items-center justify-center mb-8">
                        <ShoppingBag className="w-10 h-10 text-brand-primary" />
                    </div>
                    <h2 className="text-brand-textPrimary text-3xl font-extrabold font-poppins mb-4">Your cart is empty</h2>
                    <p className="text-brand-textSecondary mb-10 max-w-md text-center text-lg leading-relaxed">
                        DealDrop is waiting for your next favorite drop. Browse our curated collection to get started.
                    </p>
                    <Link href="/products" className="btn-primary px-10">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Cart Items List */}
                    <div className="flex-1 space-y-6">
                        <AnimatePresence>
                            {items.map((item) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    key={item.id}
                                    className="flex gap-6 p-6 bg-white border border-brand-border rounded-3xl items-center overflow-hidden hover:shadow-lg hover:shadow-brand-primary/5 transition-all"
                                >
                                    <Link href={`/product/${item.id}`} className="w-28 h-28 bg-gray-50 rounded-2xl border border-brand-border/50 flex-shrink-0 flex items-center justify-center overflow-hidden">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply transition-transform hover:scale-105" />
                                    </Link>

                                    <div className="flex-1 min-w-0">
                                        <Link href={`/product/${item.id}`} className="text-xl font-bold text-brand-textPrimary hover:text-brand-primary truncate block transition-colors mb-1">
                                            {item.name}
                                        </Link>
                                        <p className="text-brand-textSecondary font-bold text-lg">${item.price.toFixed(2)}</p>
                                    </div>

                                    <div className="flex items-center gap-6 flex-col sm:flex-row">
                                        {/* Quantity Controls */}
                                        <div className="flex items-center border-2 border-brand-border rounded-2xl bg-white p-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                className="p-2 text-brand-textSecondary hover:text-brand-primary hover:bg-brand-primary/5 rounded-xl transition-colors"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-12 text-center font-bold text-brand-textPrimary">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-2 text-brand-textSecondary hover:text-brand-primary hover:bg-brand-primary/5 rounded-xl transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Total & Remove */}
                                        <div className="flex items-center gap-8">
                                            <p className="font-bold text-2xl text-brand-textPrimary w-[100px] text-right font-poppins">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-3 text-brand-textSecondary hover:text-brand-danger hover:bg-brand-danger/5 rounded-2xl transition-all"
                                                title="Remove item"
                                            >
                                                <Trash2 className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        <Link href="/products" className="inline-flex items-center gap-3 text-brand-textSecondary hover:text-brand-primary font-bold transition-all pt-6 px-4">
                            <ArrowLeft className="w-5 h-5" />
                            Continue Shopping
                        </Link>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-[400px]">
                        <div className="card-premium sticky top-28 !p-8">
                            <h2 className="text-2xl font-bold text-brand-textPrimary mb-8 font-poppins uppercase tracking-tight">Order Summary</h2>

                            <div className="space-y-5 mb-8">
                                <div className="flex justify-between text-brand-textSecondary text-lg">
                                    <span>Subtotal</span>
                                    <span className="text-brand-textPrimary font-bold">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-brand-textSecondary text-lg">
                                    <span>Shipping</span>
                                    <span className="text-brand-primary font-bold">{shipping > 0 ? `$${shipping.toFixed(2)}` : "FREE"}</span>
                                </div>
                                <div className="flex justify-between text-brand-textSecondary text-lg">
                                    <span>Est. Tax (8%)</span>
                                    <span className="text-brand-textPrimary font-bold">${tax.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="border-t-2 border-brand-border pt-6 mb-10">
                                <div className="flex justify-between items-center text-3xl font-extrabold text-brand-textPrimary font-poppins">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <p className="text-sm text-brand-textSecondary mt-3 italic">Taxes and shipping calculated at checkout.</p>
                            </div>

                            <Link href="/checkout" className="btn-primary w-full py-5 text-xl">
                                Checkout Now
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
