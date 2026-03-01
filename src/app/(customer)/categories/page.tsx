"use client";

import { motion } from "framer-motion";
import { Monitor, Speaker, Watch, Dumbbell, Home as HomeIcon, Camera, ArrowRight, Layers } from "lucide-react";
import Link from "next/link";

const categories = [
    {
        id: 1,
        name: "Electronics",
        icon: <Monitor className="w-10 h-10" />,
        desc: "Next-gen PCs, high-performance laptops and professional desktop setups.",
        color: "bg-blue-500",
        count: 124,
        link: "/products?category=Electronics"
    },
    {
        id: 2,
        name: "Audio",
        icon: <Speaker className="w-10 h-10" />,
        desc: "Lossless headphones, spatial audio speakers, and studio-grade recording gear.",
        color: "bg-purple-500",
        count: 85,
        link: "/products?category=Audio"
    },
    {
        id: 3,
        name: "Accessories",
        icon: <Watch className="w-10 h-10" />,
        desc: "Machined EDC gear, titanium wearables, and designer tech carry.",
        color: "bg-orange-500",
        count: 210,
        link: "/products?category=Accessories"
    },
    {
        id: 4,
        name: "Fitness",
        icon: <Dumbbell className="w-10 h-10" />,
        desc: "Smart health trackers, biometric weight sets, and advanced recovery tools.",
        color: "bg-green-500",
        count: 42,
        link: "/products?category=Fitness"
    },
    {
        id: 5,
        name: "Home Tech",
        icon: <HomeIcon className="w-10 h-10" />,
        desc: "IoT ecosystems, automated lighting, and minimalist smart home controllers.",
        color: "bg-cyan-500",
        count: 67,
        link: "/products?category=Home"
    },
    {
        id: 6,
        name: "Creation",
        icon: <Camera className="w-10 h-10" />,
        desc: "Professional mirrorless kits, cinematic stabilizers, and creator lighting sets.",
        color: "bg-rose-500",
        count: 31,
        link: "/products?category=Tech"
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
                            className="text-5xl md:text-6xl font-extrabold font-poppins text-brand-textPrimary mb-6"
                        >
                            Explore <span className="gradient-text">NovaCart</span> Collections
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="text-xl text-brand-textSecondary leading-relaxed"
                        >
                            Navigate our meticulously organized catalog. From enterprise-grade components to daily essentials, find exactly what your workflow demands.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <div className="container-main -mt-10">
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
                                className="group block card-premium bg-white hover:border-brand-primary transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 ${cat.color} opacity-[0.03] rounded-bl-full transition-all group-hover:scale-110 group-hover:opacity-[0.07]`} />

                                <div className="space-y-6 relative z-10">
                                    <div className="flex justify-between items-start">
                                        <div className="w-20 h-20 rounded-2xl bg-brand-bg flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 shadow-sm">
                                            {cat.icon}
                                        </div>
                                        <span className="text-brand-textSecondary font-bold text-sm bg-brand-bg px-4 py-2 rounded-full">
                                            {cat.count} Products
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold text-brand-textPrimary font-poppins mb-3 group-hover:text-brand-primary transition-colors">
                                            {cat.name}
                                        </h3>
                                        <p className="text-brand-textSecondary leading-relaxed line-clamp-2 text-lg">
                                            {cat.desc}
                                        </p>
                                    </div>

                                    <div className="pt-4 flex items-center gap-3 text-brand-primary font-bold group-hover:gap-5 transition-all">
                                        Browse Collection <ArrowRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom CTA */}
            <section className="container-main pt-32">
                <div className="bg-brand-textPrimary rounded-[40px] p-10 md:p-20 flex flex-col items-center text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/5 opacity-20" />
                    <h2 className="text-3xl md:text-5xl font-extrabold font-poppins mb-8 relative z-10">Can&apos;t find what you&apos;re looking for?</h2>
                    <p className="text-gray-400 text-lg mb-12 max-w-xl relative z-10">
                        Our procurement team is constantly sourcing the latest tech. Reach out for custom bulk orders or special requests.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto relative z-10">
                        <Link href="/products" className="btn-primary px-10">Search All Products</Link>
                        <Link href="/contact" className="px-10 py-4 border-2 border-white/20 rounded-2xl font-bold hover:bg-white/10 transition-all">Contact Sales</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
