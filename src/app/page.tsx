"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    ShoppingBag, Star, ArrowRight, ShieldCheck,
    Monitor, Speaker, Watch, Dumbbell, Home as HomeIcon, Camera,
    CheckCircle2
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";

interface Product {
    _id: string;
    name: string;
    price: number;
    category: string;
    images: string[];
    rating: number;
    discountPercentage: number;
}

const CATEGORIES = [
    { id: 1, name: "Electronics", icon: <Monitor size={24} />, desc: "Next-gen computing" },
    { id: 2, name: "Audio", icon: <Speaker size={24} />, desc: "Immersive sound" },
    { id: 3, name: "Accessories", icon: <Watch size={24} />, desc: "Premium wearables" },
    { id: 4, name: "Fitness", icon: <Dumbbell size={24} />, desc: "Smart health gear" },
    { id: 5, name: "Home Tech", icon: <HomeIcon size={24} />, desc: "Intelligent living" },
    { id: 6, name: "Creation", icon: <Camera size={24} />, desc: "Pro visual gear" },
];

export default function HomePage() {
    const [trending, setTrending] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const res = await fetch("/api/products?sort=featured&limit=8");
                const data = await res.json();
                setTrending(data.products || []);
            } catch (e) {
                console.error("Home fetch failed", e);
            } finally {
                setLoading(false);
            }
        };
        fetchTrending();
    }, []);

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />

            {/* ── Hero Section ── */}
            <HeroCarousel />

            {/* ── Trending Section ── */}
            <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                            <span className="text-[10px] font-black text-primary/40 uppercase tracking-[0.3em]">Editor Choice</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-primary">Trending Now</h2>
                    </div>
                    <Link href="/products" className="group flex items-center gap-3 font-black text-xs uppercase tracking-widest text-primary/40 hover:text-primary transition-colors">
                        Explore Full Store <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {loading ? (
                        [...Array(6)].map((_, i) => (
                            <div key={i} className="aspect-[3/4] bg-white rounded-[40px] animate-pulse border border-black/5" />
                        ))
                    ) : (
                        trending.slice(0, 6).map((p, i) => (
                            <motion.div
                                key={p._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative bg-white rounded-[40px] overflow-hidden shadow-sm border border-transparent hover:border-accent/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col"
                            >
                                <Link href={`/product/${p._id}`} className="block relative aspect-square bg-[#F8F9FA] overflow-hidden">
                                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                    {p.discountPercentage > 0 && (
                                        <div className="absolute top-6 left-6 bg-red-500 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter shadow-lg">
                                            -{p.discountPercentage}% OFF
                                        </div>
                                    )}
                                </Link>
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-[10px] font-black text-primary/30 uppercase tracking-widest">{p.category}</span>
                                        <div className="flex items-center gap-1 text-[10px] font-black text-primary/60 ml-auto bg-primary/5 px-2 py-1 rounded-full">
                                            <Star size={10} className="fill-[#F5E74E] text-[#F5E74E]" /> {p.rating}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-black mb-6 leading-tight group-hover:text-primary transition-colors line-clamp-2">{p.name}</h3>
                                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-primary/5">
                                        <span className="text-3xl font-display font-black text-primary">₹{p.price.toLocaleString('en-IN')}</span>
                                        <button className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-accent hover:scale-110 active:scale-90 transition-all shadow-xl shadow-primary/20">
                                            <ShoppingBag size={20} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </section>

            {/* ── Trust Section ── */}
            <section className="mx-auto max-w-7xl px-6 pb-40">
                <div className="bg-white rounded-[60px] p-12 md:p-20 shadow-sm border border-primary/5 relative overflow-hidden flex flex-col lg:flex-row items-center gap-16">
                    <div className="absolute top-0 left-0 w-full lg:w-1/2 h-full bg-[#1E4D35]/5 -z-0" style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)" }} />

                    <div className="relative z-10 flex-1 space-y-8">
                        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-accent shadow-xl shadow-primary/20">
                            <ShieldCheck size={32} />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight leading-tight text-primary">Authenticity<br />Guaranteed by Experts.</h2>
                        <p className="text-primary/60 font-bold leading-relaxed max-w-md">Every product on DealDrop is vetted by our global quality team before it reaches your doorstep. Shop with absolute confidence.</p>
                        <div className="flex flex-wrap gap-8 pt-6">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 size={24} className="text-green-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">Verified Sellers</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 size={24} className="text-green-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">Secure Settlement</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 flex-1 grid grid-cols-2 gap-6 w-full lg:w-auto">
                        <div className="p-8 bg-[#F5F7F6] rounded-[32px] text-center space-y-2 border border-primary/5">
                            <h4 className="text-3xl font-display font-black text-primary">140+</h4>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Luxury Brands</p>
                        </div>
                        <div className="p-8 bg-[#F5F7F6] rounded-[32px] text-center space-y-2 border border-primary/5">
                            <h4 className="text-3xl font-display font-black text-primary">24/7</h4>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">VIP Support</p>
                        </div>
                        <div className="p-8 bg-[#F5F7F6] rounded-[32px] text-center space-y-2 col-span-2 border border-primary/5">
                            <h4 className="text-3xl font-display font-black text-primary">Verified</h4>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Authenticity Assurance</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
