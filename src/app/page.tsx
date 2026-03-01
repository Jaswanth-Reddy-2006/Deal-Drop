"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShoppingBag, ShieldCheck, Zap, LineChart, TagIcon, Store, PlusCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const, delay },
});

const inView = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const, delay },
});

export default function LandingPage() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleShopNow = () => {
        if (session?.user) {
            const role = (session.user as any).role;
            router.push(role === "seller" ? "/seller-dashboard" : "/store");
        } else {
            router.push("/login");
        }
    };

    const handleBecomeSeller = () => {
        if (session?.user) {
            router.push("/seller-dashboard");
        } else {
            router.push("/register?role=seller");
        }
    };

    return (
        <div className="bg-white min-h-screen page-enter">

            {/* ── HERO ──────────────────────────────────────── */}
            <section className="relative pt-28 pb-20 border-b border-brand-border overflow-hidden">
                {/* Radial glow */}
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-brand-primary/6 rounded-full blur-[120px] pointer-events-none" />

                <div className="container-main relative z-10 text-center max-w-3xl mx-auto">
                    <motion.div {...fadeUp(0)}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-primary/8 border border-brand-primary/20 rounded-full mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                        <span className="text-[11px] font-black uppercase tracking-widest text-brand-primary">Multi-Vendor Marketplace</span>
                    </motion.div>

                    <motion.h1 {...fadeUp(0.08)}
                        className="text-5xl md:text-6xl font-black font-poppins text-brand-textPrimary leading-tight tracking-tight mb-6">
                        Buy Smart.<br />
                        <span className="text-brand-primary">Sell Smarter.</span>
                    </motion.h1>

                    <motion.p {...fadeUp(0.16)}
                        className="text-lg text-brand-textSecondary leading-relaxed max-w-xl mx-auto mb-10">
                        DealDrop connects curated sellers with buyers who demand quality. One platform — everything you need to shop or grow a business.
                    </motion.p>

                    <motion.div {...fadeUp(0.22)} className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={handleShopNow}
                            className="btn-primary px-10 py-4 text-base shadow-xl shadow-brand-primary/20 rounded-2xl gap-2">
                            <ShoppingBag className="w-5 h-5" /> Start Shopping
                        </button>
                        <button onClick={handleBecomeSeller}
                            className="btn-secondary px-10 py-4 text-base rounded-2xl gap-2">
                            <PlusCircle className="w-5 h-5" /> Become a Seller
                        </button>
                    </motion.div>
                </div>

                {/* Stats strip */}
                <motion.div {...fadeUp(0.32)} className="container-main mt-16">
                    <div className="grid grid-cols-3 divide-x divide-brand-border bg-brand-bg border border-brand-border rounded-2xl overflow-hidden max-w-2xl mx-auto">
                        {[
                            { number: "140+", label: "Premium Products" },
                            { number: "7", label: "Categories" },
                            { number: "50+", label: "Trusted Brands" },
                        ].map((s, i) => (
                            <div key={i} className="py-6 text-center">
                                <p className="text-2xl font-black font-poppins text-brand-textPrimary">{s.number}</p>
                                <p className="text-[13px] text-brand-textSecondary font-medium mt-1">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ── HOW IT WORKS ───────────────────────────────── */}
            <section className="section bg-brand-bg/60 border-b border-brand-border">
                <div className="container-main">
                    <div className="text-center mb-12">
                        <span className="badge-primary mb-4 inline-block">How It Works</span>
                        <h2 className="text-3xl font-black font-poppins text-brand-textPrimary">Built for Every Role</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <Zap className="w-5 h-5 text-brand-primary" />,
                                title: "Instant Setup",
                                desc: "Sellers go live in under 5 minutes with our streamlined onboarding — no tech knowledge required.",
                                color: "bg-blue-50",
                            },
                            {
                                icon: <ShieldCheck className="w-5 h-5 text-green-600" />,
                                title: "Trusted & Secure",
                                desc: "Every transaction is protected by multi-layer fraud prevention, dispute resolution, and buyer guarantee.",
                                color: "bg-green-50",
                            },
                            {
                                icon: <LineChart className="w-5 h-5 text-purple-600" />,
                                title: "Growth Insights",
                                desc: "Real-time analytics help sellers optimize inventory, pricing, and discover their top-performing products.",
                                color: "bg-purple-50",
                            },
                        ].map((item, i) => (
                            <motion.div key={i} {...inView(i * 0.1)}
                                className="card-base card-hover p-8 group">
                                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-6`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-bold text-brand-textPrimary font-poppins mb-3">{item.title}</h3>
                                <p className="text-[15px] text-brand-textSecondary leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FOR BUYERS & SELLERS ───────────────────────── */}
            <section className="section">
                <div className="container-main">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                        {/* For Buyers */}
                        <motion.div {...inView(0)} className="card-base p-10">
                            <span className="badge-primary mb-6 inline-block">For Buyers</span>
                            <h2 className="text-2xl font-black font-poppins text-brand-textPrimary mb-4 leading-snug">
                                Curated Drops From Verified Sellers
                            </h2>
                            <p className="text-brand-textSecondary text-[15px] leading-relaxed mb-8">
                                No clutter. No compromises. Every product on DealDrop has been vetted for quality, pricing transparency, and seller accountability.
                            </p>
                            <ul className="space-y-3 mb-8">
                                {["Buyer Protection Program", "Real-time Order Tracking", "Verified Seller Badges", "30-Day Easy Returns"].map(point => (
                                    <li key={point} className="flex items-center gap-3 text-[15px] font-medium text-brand-textPrimary">
                                        <div className="w-5 h-5 bg-brand-primary/10 rounded-full flex items-center justify-center shrink-0">
                                            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                                        </div>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/store" className="inline-flex items-center gap-2 text-brand-primary font-bold text-[15px] hover:gap-4 transition-all">
                                Explore the Store <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>

                        {/* For Sellers */}
                        <motion.div {...inView(0.12)} className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/15 blur-[80px] rounded-full pointer-events-none" />
                            <div className="relative z-10">
                                <span className="badge mb-6 inline-block bg-white/10 text-white border border-white/20">For Sellers</span>
                                <h2 className="text-2xl font-black font-poppins leading-snug mb-4">
                                    Scale Your Business Without Limits
                                </h2>
                                <p className="text-white/80 text-[15px] leading-relaxed mb-8">
                                    Our platform handles payments, logistics, and discovery. You focus on building products your customers love.
                                </p>
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    {[
                                        { number: "0%", label: "Entry Fee" },
                                        { number: "24H", label: "Payout" },
                                        { number: "∞", label: "Products" },
                                    ].map((s, i) => (
                                        <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
                                            <p className="text-2xl font-black font-poppins text-brand-primary">{s.number}</p>
                                            <p className="text-white/70 text-[11px] font-bold uppercase tracking-widest mt-1">{s.label}</p>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={handleBecomeSeller}
                                    className="btn-primary w-full py-4 rounded-2xl bg-brand-primary hover:bg-blue-600 justify-center text-base">
                                    <Store className="w-5 h-5" /> Launch Your Store
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── CATEGORY STRIP ─────────────────────────────── */}
            <section className="section-sm border-t border-brand-border bg-brand-bg/60">
                <div className="container-main">
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <span className="text-[13px] font-bold text-brand-textSecondary uppercase tracking-widest mr-4">Shop by:</span>
                        {["Electronics", "Audio", "Accessories", "Fitness", "Home Tech", "Creation", "Fashion"].map((cat) => (
                            <Link key={cat} href={`/products?category=${cat}`}
                                className="px-5 py-2.5 bg-white border border-brand-border rounded-full text-[13px] font-bold text-brand-textPrimary hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5 transition-all">
                                {cat}
                            </Link>
                        ))}
                        <Link href="/products"
                            className="px-5 py-2.5 bg-brand-primary text-white rounded-full text-[13px] font-bold hover:bg-blue-700 transition-all">
                            <TagIcon className="w-3 h-3 inline mr-1.5" />All Products
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
