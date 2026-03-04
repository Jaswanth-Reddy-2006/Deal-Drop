"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [role, setRole] = useState<"customer" | "seller">("customer");
    const [searchParamsReady, setSearchParamsReady] = useState(false);

    // Read the `?role=` query only on client
    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const r = params.get("role");
            if (r === "seller" || r === "customer") setRole(r as "customer" | "seller");
            setSearchParamsReady(true);
        }
    }, []);

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
                router.push(role === "seller" ? "/onboarding" : "/login");
            } else {
                setError(await res.text());
            }
        } catch {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] p-4">
            <div className="w-full max-w-[900px] flex rounded-[24px] shadow-2xl overflow-hidden min-h-[600px]">

                {/* ── LEFT PANEL ─────────────────────────────── */}
                <div
                    className="hidden lg:flex flex-col items-center justify-center w-[45%] p-12 relative overflow-hidden"
                    style={{ background: "linear-gradient(145deg, #24583C 0%, #1a3f2b 100%)" }}
                >
                    <div className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full opacity-20"
                        style={{ background: "radial-gradient(circle, #B6B7F4 0%, transparent 70%)" }} />
                    <div className="relative z-10 text-center">
                        <div className="w-20 h-20 rounded-[20px] flex items-center justify-center mx-auto mb-8"
                            style={{ backgroundColor: "#F5E74E" }}>
                            <span className="material-symbols-outlined text-4xl" style={{ color: "#24583C" }}>store</span>
                        </div>
                        <h2 className="font-display text-4xl font-black text-white mb-4 leading-tight">
                            {role === "seller" ? "Start Selling\nToday." : "Join the\nCommunity."}
                        </h2>
                        <p className="text-white/70 text-base leading-relaxed max-w-[240px] mx-auto">
                            {role === "seller"
                                ? "Set up your shop and reach thousands of buyers worldwide."
                                : "Discover curated premium drops from top brands around the world."}
                        </p>
                    </div>
                </div>

                {/* ── RIGHT PANEL ───────────────────────────── */}
                <div className="flex-1 bg-white p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-30 pointer-events-none"
                        style={{ background: "radial-gradient(circle, #F5E74E 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />

                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#24583C" }}>
                            <span className="material-symbols-outlined text-xl text-white">diamond</span>
                        </div>
                        <span className="text-xl font-extrabold tracking-tight font-display" style={{ color: "#24583C" }}>DealDrop</span>
                    </div>

                    <h1 className="text-3xl font-black font-display mb-1" style={{ color: "#24583C" }}>Create Account</h1>
                    <p className="text-slate-500 text-sm mb-6">Select your role and fill in your details to get started.</p>

                    {/* Role Toggle */}
                    <div className="flex rounded-full border border-slate-200 p-1 gap-1 bg-slate-50 mb-6 w-full max-w-sm">
                        {(["customer", "seller"] as const).map((r) => (
                            <button key={r} onClick={() => setRole(r)}
                                className="flex-1 py-2 rounded-full text-sm font-bold transition-all capitalize"
                                style={role === r
                                    ? { backgroundColor: "#24583C", color: "#fff" }
                                    : { backgroundColor: "transparent", color: "#64748b" }
                                }>
                                {r === "customer" ? "Customer" : "Seller"}
                            </button>
                        ))}
                    </div>

                    {error && <div className="mb-4 p-3 text-sm rounded-xl bg-red-50 text-red-600 border border-red-200">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-semibold text-slate-700 block mb-1.5">Full Name</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">person</span>
                                <input type="text" name="name" required placeholder="John Doe"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm outline-none bg-white" />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-slate-700 block mb-1.5">Email Address</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">mail</span>
                                <input type="email" name="email" required placeholder="hello@example.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm outline-none bg-white" />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-slate-700 block mb-1.5">Password</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
                                <input type="password" name="password" required minLength={6} placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm outline-none bg-white" />
                            </div>
                        </div>

                        <button disabled={loading}
                            className="w-full py-3.5 rounded-full text-white font-bold text-base flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg mt-2"
                            style={{ backgroundColor: "#24583C", boxShadow: "0 8px 24px rgba(36,88,60,0.25)" }}>
                            {loading && <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>}
                            {loading ? "Creating Account..." : role === "seller" ? "Start Selling Now →" : "Create Shopping Account →"}
                        </button>
                    </form>

                    <p className="text-sm text-slate-500 text-center mt-6">
                        Already have an account?{" "}
                        <Link href="/login" className="font-bold hover:underline" style={{ color: "#24583C" }}>Sign In</Link>
                    </p>
                    <p className="text-xs text-slate-400 text-center mt-4">© 2024 DealDrop Inc.</p>
                </div>
            </div>
        </div>
    );
}
