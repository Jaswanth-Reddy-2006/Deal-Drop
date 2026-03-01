"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, User, ShoppingBag, Store, PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RegisterPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [role, setRole] = useState<"customer" | "seller">("customer");

    useEffect(() => {
        const r = searchParams.get("role");
        if (r === "seller" || r === "customer") setRole(r as any);
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, role }),
            });

            if (res.ok) {
                // Redirect to login or onboarding if seller
                router.push(role === "seller" ? "/onboarding" : "/login");
            } else {
                const errorData = await res.text();
                setError(errorData);
            }
        } catch {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-main py-20 flex flex-col items-center justify-center min-h-[90vh]">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-xl bg-white p-12 rounded-[40px] border border-brand-border shadow-2xl shadow-brand-primary/5"
            >
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-brand-textPrimary font-poppins mb-3 tracking-tight">Join DealDrop V2</h1>
                    <p className="text-brand-textSecondary font-medium">Select your role to get started with the marketplace.</p>
                </div>

                {/* Role Selector */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                    {[
                        { id: "customer", icon: <User className="w-6 h-6" />, title: "Customer", desc: "For smart shoppers" },
                        { id: "seller", icon: <Store className="w-6 h-6" />, title: "Seller", desc: "For scale-ready vendors" }
                    ].map((r) => (
                        <button
                            key={r.id}
                            onClick={() => setRole(r.id as any)}
                            className={`p-6 rounded-3xl border-2 transition-all text-left relative overflow-hidden group ${role === r.id
                                ? "border-brand-primary bg-brand-primary/5 shadow-lg"
                                : "border-brand-border bg-white hover:border-brand-primary/30"
                                }`}
                        >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all ${role === r.id ? "bg-brand-primary text-white" : "bg-gray-100 text-brand-textSecondary group-hover:bg-brand-primary/10 group-hover:text-brand-primary"
                                }`}>
                                {r.icon}
                            </div>
                            <h3 className={`font-bold text-lg ${role === r.id ? "text-brand-primary" : "text-brand-textPrimary"}`}>{r.title}</h3>
                            <p className="text-xs text-brand-textSecondary font-medium">{r.desc}</p>
                            {role === r.id && (
                                <div className="absolute top-4 right-4 w-5 h-5 bg-brand-primary rounded-full flex items-center justify-center text-white scale-125">
                                    <ShoppingBag className="w-3 h-3" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.form
                        key={role}
                        initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                        className="space-y-6" onSubmit={handleSubmit}
                    >
                        {error && (
                            <div className="p-4 text-sm text-brand-danger bg-brand-danger/10 border border-brand-danger/20 rounded-2xl font-bold flex items-center gap-3">
                                <PlusCircle className="w-4 h-4 rotate-45" /> {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-brand-textSecondary uppercase tracking-widest mb-2 px-1">Full Name</label>
                                <input type="text" name="name" required placeholder="John Doe" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-brand-border focus:bg-white focus:border-brand-primary outline-none transition-all font-medium text-brand-textPrimary" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-brand-textSecondary uppercase tracking-widest mb-2 px-1">Email Address</label>
                                <input type="email" name="email" required placeholder="you@example.com" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-brand-border focus:bg-white focus:border-brand-primary outline-none transition-all font-medium text-brand-textPrimary" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-brand-textSecondary uppercase tracking-widest mb-2 px-1">Password</label>
                                <input type="password" name="password" required minLength={6} placeholder="••••••••" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-brand-border focus:bg-white focus:border-brand-primary outline-none transition-all font-medium text-brand-textPrimary" />
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full py-5 bg-brand-textPrimary text-white rounded-2xl font-bold text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {loading && <Loader2 className="w-5 h-5 animate-spin text-brand-primary" />}
                            {loading ? "Activating..." : role === 'seller' ? "Start Selling Now" : "Create Shopping Account"}
                        </button>
                    </motion.form>
                </AnimatePresence>

                <p className="mt-8 text-center text-sm text-brand-textSecondary font-medium">
                    Already have an account?{" "}
                    <Link href="/login" className="text-brand-primary font-bold hover:underline">
                        Sign In
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
