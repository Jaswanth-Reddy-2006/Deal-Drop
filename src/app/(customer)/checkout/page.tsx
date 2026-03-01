"use client";

import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";
import { Lock, CreditCard, ShoppingBag, ShieldCheck, ChevronRight, Loader2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
    const router = useRouter();
    const { items, getCartTotal, clearCart } = useCartStore();
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Shipping, 2: Success

    useEffect(() => {
        setMounted(true);
        if (items.length === 0 && step === 1) {
            router.push("/cart");
        }
    }, [items.length, router, step]);

    if (!mounted) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-brand-primary animate-spin" />
            </div>
        );
    }

    const subtotal = getCartTotal();
    const shipping = 15;
    const total = subtotal + shipping;

    const [checkoutError, setCheckoutError] = useState("");

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setCheckoutError("");

        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items, email: "guest@example.com" })
            });

            if (res.ok) {
                // We're mocking Stripe for local dev so we'll just show the success page
                // Const data = await res.json();
                // window.location.href = data.url;

                setStep(2);
                clearCart();
            } else {
                const message = await res.text();
                setCheckoutError(message || "An error occurred during checkout.");
            }
        } catch (err) {
            setCheckoutError("A network error occurred.");
        } finally {
            setLoading(false);
        }
    };
    if (step === 2) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center container-main py-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="card-premium bg-white p-12 text-center max-w-lg w-full rounded-[40px]"
                >
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-100/50">
                        <ShieldCheck className="w-12 h-12 text-green-600" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-brand-textPrimary font-poppins mb-4">Payment Successful!</h1>
                    <p className="text-brand-textSecondary text-lg mb-10 leading-relaxed">
                        Your order **#NC-{Math.floor(Math.random() * 9000) + 1000}** has been confirmed. Expect a delivery window of 2-3 business days.
                    </p>
                    <div className="space-y-4">
                        <Link href="/products" className="btn-primary w-full py-4 rounded-2xl flex justify-center items-center gap-2">
                            Continue Shopping <ChevronRight className="w-5 h-5" />
                        </Link>
                        <Link href="/" className="btn-secondary w-full py-4 rounded-2xl block text-center">
                            Back to Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="bg-[#F8FAFC] min-h-screen pb-32">
            {/* Header / Breadcrumbs */}
            <div className="bg-white border-b border-brand-border py-8 mb-12">
                <div className="container-main flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/cart" className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-textSecondary hover:text-brand-primary hover:border-brand-primary transition-all">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-extrabold text-brand-textPrimary font-poppins">Secure Checkout</h1>
                            <div className="flex items-center gap-2 text-xs font-bold text-brand-textSecondary uppercase tracking-widest mt-1">
                                <span className="text-brand-primary">Cart</span>
                                <ChevronRight className="w-3 h-3" />
                                <span className="text-brand-primary">Shipping</span>
                                <ChevronRight className="w-3 h-3" />
                                <span>Payment</span>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-3 text-brand-textSecondary bg-brand-bg px-5 py-2.5 rounded-2xl border border-brand-border">
                        <Lock className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-bold uppercase tracking-widest">SSL Encrypted</span>
                    </div>
                </div>
            </div>

            <div className="container-main">
                <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">

                    {/* Left: Checkout Form */}
                    <div className="flex-1 space-y-10">
                        <form onSubmit={handleCheckout} className="space-y-8">
                            <section className="card-premium bg-white p-10 rounded-[40px]">
                                <h2 className="text-2xl font-extrabold text-brand-textPrimary font-poppins mb-8 flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary text-sm">1</div>
                                    Shipping Logistics
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="md:col-span-1">
                                        <label className="block text-xs font-bold text-brand-textSecondary uppercase tracking-widest mb-3">First Name</label>
                                        <input type="text" required placeholder="John" className="input rounded-2xl py-4" />
                                    </div>
                                    <div className="md:col-span-1">
                                        <label className="block text-xs font-bold text-brand-textSecondary uppercase tracking-widest mb-3">Last Name</label>
                                        <input type="text" required placeholder="Doe" className="input rounded-2xl py-4" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-brand-textSecondary uppercase tracking-widest mb-3">Email Address</label>
                                        <input type="email" required placeholder="john@example.com" className="input rounded-2xl py-4" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-brand-textSecondary uppercase tracking-widest mb-3">Physical Address</label>
                                        <input type="text" required placeholder="123 Innovation Drive, Tech City" className="input rounded-2xl py-4" />
                                    </div>
                                    <div className="md:col-span-1">
                                        <label className="block text-xs font-bold text-brand-textSecondary uppercase tracking-widest mb-3">City</label>
                                        <input type="text" required placeholder="San Francisco" className="input rounded-2xl py-4" />
                                    </div>
                                    <div className="md:col-span-1 grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-brand-textSecondary uppercase tracking-widest mb-3">State</label>
                                            <input type="text" required placeholder="CA" className="input rounded-2xl py-4" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-brand-textSecondary uppercase tracking-widest mb-3">ZIP Code</label>
                                            <input type="text" required placeholder="94105" className="input rounded-2xl py-4" />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="card-premium bg-white p-10 rounded-[40px]">
                                <h2 className="text-2xl font-extrabold text-brand-textPrimary font-poppins mb-8 flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary text-sm">2</div>
                                    Payment Method
                                </h2>
                                <div className="p-6 border-2 border-brand-primary bg-brand-primary/5 rounded-3xl flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-brand-border">
                                            <CreditCard className="w-6 h-6 text-brand-primary" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-brand-textPrimary">Stripe Protected Header</p>
                                            <p className="text-xs text-brand-textSecondary font-medium">Pay with Credit/Debit Card, Apple Pay, or GPay</p>
                                        </div>
                                    </div>
                                    <div className="w-6 h-6 rounded-full border-4 border-brand-primary flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 rounded-full bg-brand-primary" />
                                    </div>
                                </div>
                                <p className="text-sm text-brand-textSecondary leading-relaxed bg-brand-bg p-5 rounded-2xl border border-brand-border">
                                    Note: You will be redirected to the <strong>Stripe Payment Gateway</strong> to complete your transaction. DealDrop does not store sensitive card credentials.
                                </p>
                            </section>

                            {checkoutError && (
                                <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex flex-row items-center gap-3 text-sm font-bold border border-red-100 mt-4">
                                    <ShieldCheck className="w-5 h-5 shrink-0" />
                                    <p>{checkoutError}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full flex justify-center items-center py-6 text-xl rounded-[32px] shadow-2xl shadow-brand-primary/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 mt-6"
                            >
                                {loading ? (
                                    <Loader2 className="w-8 h-8 animate-spin" />
                                ) : (
                                    `Complete Secure Purchase — $${total.toFixed(2)}`
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right: Order Summary */}
                    <aside className="w-full lg:w-[480px]">
                        <div className="card-premium bg-white p-8 md:p-10 rounded-[40px] sticky top-28 border border-brand-border shadow-2xl shadow-brand-primary/5">
                            <h2 className="text-2xl font-extrabold text-brand-textPrimary font-poppins flex items-center justify-between mb-10">
                                Order Summary
                                <ShoppingBag className="w-6 h-6 text-brand-primary" />
                            </h2>

                            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar mb-10">
                                <AnimatePresence>
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                            className="flex gap-5"
                                        >
                                            <div className="w-20 h-20 bg-brand-bg rounded-2xl flex items-center justify-center border border-brand-border overflow-hidden shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <p className="text-sm font-bold text-brand-textPrimary leading-tight mb-1 line-clamp-1">{item.name}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-bold text-brand-textSecondary uppercase tracking-widest bg-brand-bg px-2 py-0.5 rounded">Qty: {item.quantity}</span>
                                                    <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">${item.price.toFixed(2)} ea</span>
                                                </div>
                                            </div>
                                            <p className="text-sm font-extrabold text-brand-textPrimary flex items-center">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            <div className="space-y-4 pt-10 border-t border-brand-border border-dashed mb-10">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-brand-textSecondary uppercase tracking-widest">Subtotal</span>
                                    <span className="text-lg font-bold text-brand-textPrimary font-poppins">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-brand-textSecondary uppercase tracking-widest">Global Shipping</span>
                                    <span className="text-lg font-bold text-brand-textPrimary font-poppins">${shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-brand-border">
                                    <div>
                                        <span className="text-sm font-bold text-brand-textPrimary uppercase tracking-widest">Final Total</span>
                                        <p className="text-[10px] text-brand-textSecondary font-bold">INCL. VAT & CUSTOMS</p>
                                    </div>
                                    <span className="text-4xl font-extrabold text-brand-textPrimary font-poppins">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-5 bg-brand-bg rounded-3xl border border-brand-border">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-brand-border shadow-sm">
                                    <ShieldCheck className="w-5 h-5 text-brand-primary" />
                                </div>
                                <p className="text-[11px] font-bold text-brand-textSecondary leading-relaxed uppercase tracking-widest">
                                    Verified secure checkout. <br />
                                    <span className="text-brand-primary">256-bit AES encryption</span>
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
