"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError(res.error);
                setIsLoading(false);
            } else {
                // Fetch session to determine role and redirect
                const session = await getSession();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const role = (session?.user as any)?.role;

                if (role === "seller") {
                    window.location.href = "/seller-dashboard";
                } else {
                    window.location.href = "/store";
                }
            }
        } catch (err) {
            setError("An unexpected error occurred during sign in.");
            setIsLoading(false);
        }
    };

    return (
        <div className="container-main py-section flex flex-col items-center justify-center min-h-[60vh] page-enter">
            <div className="w-full max-w-md bg-white p-8 rounded-[32px] border border-brand-border shadow-2xl shadow-brand-primary/5">
                <h1 className="text-brand-textPrimary font-poppins font-black text-3xl mb-2 text-center tracking-tight">Welcome Back</h1>
                <p className="text-brand-textSecondary font-medium text-center mb-8">Sign in to your DealDrop account</p>

                <form className="space-y-5" onSubmit={handleLogin}>
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-bold border border-red-100">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-bold text-brand-textPrimary mb-2">Email</label>
                        <input
                            type="email"
                            required
                            placeholder="you@example.com"
                            className="input w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-bold text-brand-textPrimary">Password</label>
                            <Link href="#" className="text-sm font-bold text-brand-primary hover:underline">Forgot?</Link>
                        </div>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            className="input w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" disabled={isLoading} className="btn-primary w-full mt-4 flex justify-center py-4">
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm font-medium text-brand-textSecondary">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-brand-primary font-bold hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}
