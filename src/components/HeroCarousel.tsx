"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import Link from "next/link";

const SLIDES = [
    {
        id: 1,
        tag: "Seasonal Drop",
        title: "The Zenith Series.",
        subtitle: "Immersive spatial hardware for the modern creative. Engineered for absolute clarity.",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2000&auto=format&fit=crop",
        cta: "Shop The Drop",
        link: "/products?category=Audio",
        accent: "text-[#F5E74E]"
    },
    {
        id: 2,
        tag: "Limited Tier",
        title: "Defined by Edge.",
        subtitle: "Aerospace titanium EDC gear and luxury accessories. Precision redefined.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=2000&auto=format&fit=crop",
        cta: "Explore Tech",
        link: "/products?category=Accessories",
        accent: "text-blue-400"
    },
    {
        id: 3,
        tag: "Coming Soon",
        title: "Haute Couture.",
        subtitle: "Experience the fusion of high fashion and technical fabrics. Arriving March 15.",
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2000&auto=format&fit=crop",
        cta: "Preview Collection",
        link: "/categories",
        accent: "text-rose-400"
    }
];

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % SLIDES.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    const next = () => setCurrent((prev) => (prev + 1) % SLIDES.length);
    const prev = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

    return (
        <section className="relative h-[480px] md:h-[520px] w-full px-6 pt-6 mb-12">
            <div className="mx-auto max-w-[98%] h-full rounded-[60px] overflow-hidden relative shadow-2xl shadow-primary/10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2 }}
                        className="absolute inset-0"
                    >
                        {/* Background Image with Gradient Overlay */}
                        <div className="absolute inset-0 z-0 overflow-hidden">
                            <motion.img
                                initial={{ scale: 1.2, filter: "blur(20px)" }}
                                animate={{ scale: 1, filter: "blur(0px)" }}
                                transition={{ duration: 2 }}
                                src={SLIDES[current].image}
                                alt={SLIDES[current].title}
                                className="w-full h-full object-cover opacity-60"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-transparent" />
                            <div className="absolute inset-0 bg-black/10" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 px-12 md:px-24 h-full flex flex-col justify-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="max-w-2xl space-y-6"
                            >
                                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.3em]">
                                    <Zap size={14} className="fill-accent text-accent" /> {SLIDES[current].tag}
                                </div>

                                <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-[1.05] tracking-tight">
                                    {SLIDES[current].title.split('.').map((part, i) => (
                                        <span key={i} className={i === 1 ? SLIDES[current].accent : ""}>
                                            {part}{i === 0 && SLIDES[current].title.includes('.') ? "." : ""}
                                            {i === 0 && <br />}
                                        </span>
                                    ))}
                                </h1>

                                <p className="text-lg md:text-xl text-white/40 font-bold leading-relaxed max-w-lg">
                                    {SLIDES[current].subtitle}
                                </p>

                                <div className="flex flex-wrap items-center gap-6 pt-4">
                                    <Link href={SLIDES[current].link} className="bg-white text-primary px-12 py-5 rounded-full font-black text-base hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20 group flex items-center gap-3">
                                        {SLIDES[current].cta} <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Dots */}
                <div className="absolute bottom-12 left-12 z-20 flex gap-4">
                    {SLIDES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`transition-all duration-700 rounded-full h-1.5 ${current === i ? "w-16 bg-white" : "w-1.5 bg-white/20 hover:bg-white/40"}`}
                        />
                    ))}
                </div>

                {/* Side Navigation Buttons (Desktop) */}
                <div className="hidden md:flex absolute bottom-12 right-12 z-20 items-center gap-4">
                    <button onClick={prev} className="w-16 h-16 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
                        <ChevronLeft size={24} />
                    </button>
                    <button onClick={next} className="w-16 h-16 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
}
