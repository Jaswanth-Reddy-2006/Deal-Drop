"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [role, setRole] = useState<"customer" | "seller">("customer");
    const [showPassword, setShowPassword] = useState(false);
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password. Please try again.");
            } else if (result?.ok) {
                // Fetch user session to check onboarding status
                const res = await fetch("/api/auth/session");
                const session = await res.json();
                const user = session?.user;

                if (user?.role === "seller") {
                    if (user?.isOnboarded) {
                        router.push("/seller-dashboard");
                    } else {
                        router.push("/onboarding");
                    }
                } else {
                    router.push("/store");
                }
                router.refresh();
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] p-4 md:p-10">
            <div className="w-full max-w-[1000px] flex flex-col lg:flex-row bg-white rounded-[32px] md:rounded-[40px] shadow-2xl overflow-hidden min-h-[600px]">

                {/* ── LEFT PANEL ─────────────────────────────── */}
                <div
                    className="hidden lg:flex flex-col items-center justify-center w-[45%] p-12 relative overflow-hidden"
                    style={{ background: "linear-gradient(145deg, #24583C 0%, #1a3f2b 100%)" }}
                >
                    {/* Dot pattern */}
                    <div className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                    {/* Glow orbs */}
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full opacity-20"
                        style={{ background: "radial-gradient(circle, #B6B7F4 0%, transparent 70%)" }} />
                    <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-10"
                        style={{ background: "radial-gradient(circle, #F5E74E 0%, transparent 70%)" }} />

                    <div className="relative z-10 text-center">
                        {/* Icon */}
                        <div className="w-20 h-20 rounded-[20px] flex items-center justify-center mx-auto mb-8"
                            style={{ backgroundColor: "#F5E74E" }}>
                            <span className="material-symbols-outlined text-4xl" style={{ color: "#24583C" }}>
                                rocket_launch
                            </span>
                        </div>
                        <h2 className="font-display text-4xl font-black text-white mb-4 leading-tight">
                            Elevate Your<br />Shopping.
                        </h2>
                        <p className="text-white/70 text-base leading-relaxed max-w-[240px] mx-auto">
                            Join thousands of savvy shoppers and premium sellers on DealDrop.
                        </p>
                    </div>
                </div>

                {/* ── RIGHT PANEL ───────────────────────────── */}
                <div className="flex-1 bg-white p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
                    {/* Yellow glow blob */}
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-30 pointer-events-none"
                        style={{ background: "radial-gradient(circle, #F5E74E 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />

                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#24583C" }}>
                            <span className="material-symbols-outlined text-xl text-white">diamond</span>
                        </div>
                        <span className="text-xl font-extrabold tracking-tight font-display" style={{ color: "#24583C" }}>DealDrop</span>
                    </div>

                    <h1 className="text-3xl font-black font-display mb-1" style={{ color: "#24583C" }}>Welcome Back</h1>
                    <p className="text-slate-500 text-sm mb-6">Please enter your details to sign in</p>

                    {/* Customer / Seller toggle */}
                    <div className="flex rounded-full border border-slate-200 p-1 gap-1 bg-slate-50 mb-6 w-full max-w-sm">
                        {(["customer", "seller"] as const).map((r) => (
                            <button key={r} type="button" onClick={() => setRole(r)}
                                className="flex-1 py-2 rounded-full text-sm font-bold transition-all capitalize"
                                style={role === r
                                    ? { backgroundColor: "#24583C", color: "#fff" }
                                    : { backgroundColor: "transparent", color: "#64748b" }
                                }>
                                {r === "customer" ? "Customer" : "Seller"}
                            </button>
                        ))}
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="mb-4 p-3 text-sm rounded-xl bg-red-50 text-red-600 border border-red-200 flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">error</span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="mb-4">
                            <label className="text-sm font-semibold text-slate-700 block mb-1.5">Email Address</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">mail</span>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="hello@example.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#24583C] bg-white transition-colors"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-sm font-semibold text-slate-700">Password</label>
                                <Link href="/forgot-password" className="text-xs font-semibold hover:underline" style={{ color: "#24583C" }}>
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#24583C] bg-white transition-colors"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                    <span className="material-symbols-outlined text-xl">
                                        {showPassword ? "visibility_off" : "visibility"}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Keep logged in */}
                        <div className="flex items-center gap-2 mb-6">
                            <input type="checkbox" id="keep-logged-in"
                                checked={keepLoggedIn} onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                                className="w-4 h-4 rounded border-slate-300 cursor-pointer"
                                style={{ accentColor: "#24583C" }}
                            />
                            <label htmlFor="keep-logged-in" className="text-sm text-slate-600 cursor-pointer select-none">
                                Keep me logged in
                            </label>
                        </div>

                        {/* Login button */}
                        <button type="submit" disabled={loading}
                            className="w-full py-3.5 rounded-full text-white font-bold text-base flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg mb-5 disabled:opacity-60"
                            style={{ backgroundColor: "#24583C", boxShadow: "0 8px 24px rgba(36,88,60,0.25)" }}>
                            {loading
                                ? <><span className="material-symbols-outlined animate-spin text-xl">progress_activity</span> Signing in...</>
                                : <>Login to Your Account <span className="material-symbols-outlined text-xl">arrow_forward</span></>
                            }
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 mb-5">
                        <div className="flex-1 h-px bg-slate-200" />
                        <span className="text-xs text-slate-400 font-semibold uppercase tracking-widest">or continue with</span>
                        <div className="flex-1 h-px bg-slate-200" />
                    </div>

                    {/* Social buttons */}
                    <div className="flex gap-3 mb-6">
                        <button type="button" onClick={() => signIn("google", { callbackUrl: "/store" })}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-all text-sm font-semibold text-slate-700">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </button>
                        <button type="button"
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-all text-sm font-semibold text-slate-700">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Facebook
                        </button>
                    </div>

                    {/* Sign up link */}
                    <p className="text-sm text-slate-500 text-center">
                        New to DealDrop?{" "}
                        <Link href="/register" className="font-bold hover:underline" style={{ color: "#24583C" }}>
                            Create an account
                        </Link>
                    </p>

                    <p className="text-xs text-slate-400 text-center mt-4">© 2024 DealDrop Inc.</p>
                </div>
            </div>
        </div>
    );
}
