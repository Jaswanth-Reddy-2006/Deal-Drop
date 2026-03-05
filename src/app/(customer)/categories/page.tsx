"use client";

import { motion } from "framer-motion";
import { Monitor, Speaker, Watch, Dumbbell, Home as HomeIcon, Camera, ArrowRight, Layers } from "lucide-react";
import Link from "next/link";

const categories = [
    {
        id: 1,
        name: "Haute Couture",
        icon: <Layers className="w-10 h-10" />,
        desc: "Exclusive designer pieces and high-fashion runway looks for the elite.",
        color: "bg-rose-500",
        count: 42,
        link: "/products?category=Fashion"
    },
    {
        id: 2,
        name: "Streetwear",
        icon: <Watch className="w-10 h-10" />,
        desc: "Curated urban essentials, limited drops, and hype-culture accessories.",
        color: "bg-blue-500",
        count: 124,
        link: "/products?category=Streetwear"
    },
    {
        id: 3,
        name: "Footwear",
        icon: <Camera className="w-10 h-10" />,
        desc: "From limited tier sneakers to hand-crafted Italian leather boots.",
        color: "bg-orange-500",
        count: 85,
        link: "/products?category=Footwear"
    },
    {
        id: 4,
        name: "Electronics",
        icon: <Monitor className="w-10 h-10" />,
        desc: "Master the Arc with enterprise-grade creation tools and next-gen tech.",
        color: "bg-purple-500",
        count: 210,
        link: "/products?category=Electronics"
    },
    {
        id: 5,
        name: "Audio",
        icon: <Speaker className="w-10 h-10" />,
        desc: "Immersive spatial hardware and professional studio-grade sound systems.",
        color: "bg-cyan-500",
        count: 67,
        link: "/products?category=Audio"
    },
    {
        id: 6,
        name: "Home Tech",
        icon: <HomeIcon className="w-10 h-10" />,
        desc: "Intelligent living environments powered by minimalist automated systems.",
        color: "bg-green-500",
        count: 31,
        link: "/products?category=Home Tech"
    },
];

export default function CategoriesPage() {
    return (
        <div className="bg-[#F8FAFC] min-h-screen pb-32">
            {/* Header */}
            <section className="bg-brand-bg pt-24 pb-20 overflow-hidden relative border-b border-brand-border/50">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-primary/5 blur-[100px] rounded-full" />
                <div className="container-main relative">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 text-brand-primary font-bold uppercase tracking-widest text-xs mb-4"
                        >
                            <Layers className="w-4 h-4" /> Categorized Selection
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="text-5xl md:text-6xl font-extrabold font-display text-primary mb-6"
                        >
                            Explore <span className="text-primary italic">DealDrop</span> Collections
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="text-xl text-primary/60 font-bold leading-relaxed"
                        >
                            Navigate our meticulously organized catalog of premium drops. From enterprise-grade tech to luxury accessories, find exactly what defines your style.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <div className="mx-auto max-w-7xl px-6 -mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Link
                                href={cat.link}
                                className="group block bg-white rounded-[40px] p-10 shadow-xl shadow-black/5 hover:shadow-2xl hover:border-accent/50 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden border border-transparent"
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 ${cat.color} opacity-[0.03] rounded-bl-full transition-all group-hover:scale-110 group-hover:opacity-[0.07]`} />

                                <div className="space-y-6 relative z-10">
                                    <div className="flex justify-between items-start">
                                        <div className="w-20 h-20 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-accent transition-all duration-500 shadow-sm border border-primary/5">
                                            {cat.icon}
                                        </div>
                                        <span className="text-primary/40 font-black text-[10px] uppercase tracking-widest bg-primary/5 px-4 py-2 rounded-full">
                                            {cat.count} Products
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-black text-primary font-display mb-3 group-hover:text-primary transition-colors">
                                            {cat.name}
                                        </h3>
                                        <p className="text-primary/50 font-bold leading-relaxed line-clamp-2 text-base">
                                            {cat.desc}
                                        </p>
                                    </div>

                                    <div className="pt-4 flex items-center gap-3 text-primary font-black text-xs uppercase tracking-[0.2em] group-hover:gap-5 transition-all">
                                        Browse Drop <ArrowRight className="w-5 h-5 text-accent" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom CTA */}
            <section className="mx-auto max-w-7xl px-6 pt-32 mb-32">
                <div className="bg-primary rounded-[60px] p-12 md:p-24 flex flex-col items-center text-center text-white relative overflow-hidden shadow-2xl shadow-primary/20">
                    <div className="absolute inset-0 bg-accent/5 opacity-10" />
                    <h2 className="text-4xl md:text-6xl font-black font-display mb-8 relative z-10 leading-tight">Can&apos;t find what you&apos;re <br />looking for?</h2>
                    <p className="text-white/40 font-bold text-lg mb-12 max-w-xl relative z-10">
                        Our procurement team is constantly sourcing the latest tech. Reach out for custom bulk orders or special requests.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto relative z-10">
                        <Link href="/products" className="bg-white text-primary px-12 py-5 rounded-full font-black text-lg hover:scale-105 transition-all">Search All Drops</Link>
                        <Link href="/contact" className="px-12 py-5 border-2 border-white/20 rounded-full font-black text-lg hover:bg-white/10 transition-all">Contact Concierge</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
