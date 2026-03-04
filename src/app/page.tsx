import Link from 'next/link';
import HeroAnimated from '@/components/HeroAnimated';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LandingPage() {
    return (
        <>
            <Navbar />

            <section className="hero-gradient relative overflow-hidden py-16 md:py-24 px-6">
                <div className="absolute top-20 right-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-[100px]"></div>

                <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text */}
                    <div className="flex flex-col gap-8 z-10">
                        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-primary text-sm font-bold uppercase tracking-widest w-fit">
                            <span className="material-symbols-outlined text-sm">auto_awesome</span> Exclusive Drops
                        </div>
                        <h1 className="font-display text-6xl md:text-8xl font-black leading-[1.05] text-primary tracking-tight">
                            Buy <span className="text-primary">Smart.</span><br />
                            Sell <span className="text-secondary italic">Smarter.</span>
                        </h1>
                        <p className="max-w-md text-lg text-slate-600 leading-relaxed font-body">
                            Experience the premium multi-vendor marketplace curated for high-end brands and discerning buyers worldwide.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/store" className="rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-xl shadow-primary/20 hover:brightness-110 transition-all text-center">
                                Explore Products
                            </Link>
                            <Link href="/register?role=seller" className="rounded-full border-2 border-primary px-8 py-4 text-lg font-bold text-primary hover:bg-primary hover:text-white transition-all text-center">
                                Sell with DealDrop
                            </Link>
                        </div>
                    </div>

                    {/* Animated Hero */}
                    <div className="relative pt-6 pb-10">
                        <HeroAnimated />
                        <div className="absolute -bottom-2 -left-6 rounded-2xl bg-white p-6 shadow-xl border border-slate-100 z-20">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-accent/30 p-3 text-primary">
                                    <span className="material-symbols-outlined">trending_up</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-400">Monthly Growth</p>
                                    <p className="text-2xl font-black text-primary">+124%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FEATURED CATEGORIES ───────────────────────────── */}
            <section className="px-6 py-16 bg-white">
                <div className="mx-auto max-w-7xl">
                    <h2 className="text-center font-display text-3xl font-black text-primary mb-12">Featured Categories</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <Link className="group flex flex-col items-center p-8 bg-background-light rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all" href="#">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">devices</span>
                            </div>
                            <span className="font-bold text-slate-900">Electronics</span>
                        </Link>
                        <Link className="group flex flex-col items-center p-8 bg-background-light rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all" href="#">
                            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center text-secondary mb-4 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">apparel</span>
                            </div>
                            <span className="font-bold text-slate-900">Fashion</span>
                        </Link>
                        <Link className="group flex flex-col items-center p-8 bg-background-light rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all" href="#">
                            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">home</span>
                            </div>
                            <span className="font-bold text-slate-900">Home</span>
                        </Link>
                        <Link className="group flex flex-col items-center p-8 bg-background-light rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all" href="#">
                            <div className="w-16 h-16 rounded-full bg-slate-900/10 flex items-center justify-center text-slate-900 mb-4 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">diamond</span>
                            </div>
                            <span className="font-bold text-slate-900">Jewelry</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── STATS ────────────────────────────────────────── */}
            <section className="px-6 py-12 bg-background-light">
                <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="group relative overflow-hidden rounded-2xl border border-primary/10 bg-white p-8 shadow-sm transition-all hover:shadow-xl">
                        <div className="absolute -right-4 -top-4 text-primary/5 group-hover:text-primary/10 transition-colors">
                            <span className="material-symbols-outlined text-9xl">inventory_2</span>
                        </div>
                        <p className="text-slate-500 font-semibold mb-1">Premium Products</p>
                        <h3 className="text-4xl font-black text-primary font-display tracking-tight">140+</h3>
                    </div>
                    <div className="group relative overflow-hidden rounded-2xl border border-secondary/20 bg-white p-8 shadow-sm transition-all hover:shadow-xl">
                        <div className="absolute -right-4 -top-4 text-secondary/10 group-hover:text-secondary/20 transition-colors">
                            <span className="material-symbols-outlined text-9xl">category</span>
                        </div>
                        <p className="text-slate-500 font-semibold mb-1">Market Categories</p>
                        <h3 className="text-4xl font-black text-primary font-display tracking-tight">7</h3>
                    </div>
                    <div className="group relative overflow-hidden rounded-2xl border border-accent/30 bg-white p-8 shadow-sm transition-all hover:shadow-xl">
                        <div className="absolute -right-4 -top-4 text-accent/20 group-hover:text-accent/40 transition-colors">
                            <span className="material-symbols-outlined text-9xl">verified</span>
                        </div>
                        <p className="text-slate-500 font-semibold mb-1">Trusted Brands</p>
                        <h3 className="text-4xl font-black text-primary font-display tracking-tight">50+</h3>
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ──────────────────────────────────── */}
            <section className="px-6 py-20 bg-white">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-16 text-center">
                        <h2 className="font-display text-5xl font-black text-primary mb-4 tracking-tight">How It Works</h2>
                        <div className="mx-auto h-1 w-24 bg-accent rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

                        {/* For Buyers */}
                        <div className="flex flex-col gap-8 rounded-3xl bg-background-light border border-primary/10 p-8 md:p-12 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h3 className="text-3xl font-black text-primary font-display">For Buyers</h3>
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined">person</span>
                                </div>
                            </div>
                            <p className="text-slate-600">Discover hand-picked selections and shop with absolute peace of mind.</p>
                            <div className="space-y-6">
                                {[
                                    { icon: "colors_spark", title: "Curated Drops", desc: "Every product is vetted for quality and authenticity by our global team." },
                                    { icon: "shield", title: "Buyer Protection", desc: "Secure transactions and escrow services protect every single penny you spend." },
                                    { icon: "keyboard_return", title: "30-Day Returns", desc: "Not satisfied? We offer no-questions-asked returns for 30 full days." },
                                ].map((item) => (
                                    <div key={item.title} className="flex gap-6 items-start">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined">{item.icon}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-lg">{item.title}</h4>
                                            <p className="text-sm text-slate-500">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link href="/store" className="mt-4 w-full rounded-xl bg-primary/10 py-4 text-center text-primary font-bold hover:bg-primary hover:text-white transition-all block">
                                Start Shopping
                            </Link>
                        </div>

                        {/* For Sellers */}
                        <div className="flex flex-col gap-8 rounded-3xl bg-primary p-8 md:p-12 shadow-2xl text-white">
                            <div className="flex items-center justify-between">
                                <h3 className="text-3xl font-black font-display">For Sellers</h3>
                                <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                                    <span className="material-symbols-outlined">storefront</span>
                                </div>
                            </div>
                            <p className="text-white/70">Scale your brand with the world&apos;s most creator-friendly marketplace.</p>
                            <div className="space-y-6">
                                {[
                                    { icon: "percent", title: "0% Entry Fee", desc: "Launch your shop for free. We only succeed when you make your first sale." },
                                    { icon: "bolt", title: "24H Payout", desc: "Get your funds faster with our express settlement system within 24 hours." },
                                    { icon: "all_inclusive", title: "Unlimited Products", desc: "No caps on inventory. List as many products as your business can handle." },
                                ].map((item) => (
                                    <div key={item.title} className="flex gap-6 items-start">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-accent/30 flex items-center justify-center text-accent">
                                            <span className="material-symbols-outlined">{item.icon}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg">{item.title}</h4>
                                            <p className="text-sm text-white/60">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link href="/register?role=seller" className="mt-4 w-full rounded-xl text-center bg-accent py-4 text-primary font-bold hover:brightness-110 transition-all block">
                                Apply to Sell
                            </Link>
                        </div>
                    </div>

                    {/* Trust badges */}
                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 bg-background-light rounded-2xl border border-primary/10 flex gap-4 items-center">
                            <span className="material-symbols-outlined text-primary text-4xl">verified_user</span>
                            <div>
                                <h4 className="font-bold text-slate-900">Verified Luxury</h4>
                                <p className="text-sm text-slate-500">Authentication by experts</p>
                            </div>
                        </div>
                        <div className="p-8 bg-background-light rounded-2xl border border-secondary/20 flex gap-4 items-center">
                            <span className="material-symbols-outlined text-secondary text-4xl">public</span>
                            <div>
                                <h4 className="font-bold text-slate-900">Global Shipping</h4>
                                <p className="text-sm text-slate-500">Reliable worldwide delivery</p>
                            </div>
                        </div>
                        <div className="p-8 bg-background-light rounded-2xl border border-accent/30 flex gap-4 items-center">
                            <span className="material-symbols-outlined text-primary text-4xl">support_agent</span>
                            <div>
                                <h4 className="font-bold text-slate-900">24/7 Concierge</h4>
                                <p className="text-sm text-slate-500">Dedicated support team</p>
                            </div>
                        </div>
                    </div>

                    {/* Compliance strip */}
                    <div className="mt-16 flex flex-wrap justify-center items-center gap-12 grayscale opacity-40">
                        <div className="flex items-center gap-2"><span className="material-symbols-outlined">lock</span><span className="font-bold uppercase tracking-tighter">SSL Secure</span></div>
                        <div className="flex items-center gap-2"><span className="material-symbols-outlined">payments</span><span className="font-bold uppercase tracking-tighter">Instant Payouts</span></div>
                        <div className="flex items-center gap-2"><span className="material-symbols-outlined">shield_check</span><span className="font-bold uppercase tracking-tighter">PCI Compliant</span></div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
