"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  Zap,
  ShieldCheck,
  Monitor,
  Speaker,
  Watch,
  Dumbbell,
  Home as HomeIcon,
  Camera,
  ShoppingBag,
  TrendingUp,
  CheckCircle2
} from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface HomeProduct {
  _id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  rating: number;
  discountPercentage: number;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" }
  })
};

const categories = [
  { id: 1, name: "Electronics", icon: <Monitor size={24} />, desc: "Next-gen computing" },
  { id: 2, name: "Audio", icon: <Speaker size={24} />, desc: "Immersive sound" },
  { id: 3, name: "Accessories", icon: <Watch size={24} />, desc: "Premium wearables" },
  { id: 4, name: "Fitness", icon: <Dumbbell size={24} />, desc: "Smart health gear" },
  { id: 5, name: "Home Tech", icon: <HomeIcon size={24} />, desc: "Intelligent living" },
  { id: 6, name: "Creation", icon: <Camera size={24} />, desc: "Pro visual gear" },
];

export default function StorePage() {
  const [loading, setLoading] = useState(true);
  const [trending, setTrending] = useState<HomeProduct[]>([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await fetch("/api/products?sort=featured&limit=8");
        const data = await res.json();
        setTrending(data.products || []);
      } catch (e) {
        console.error("Store fetch failed", e);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-body text-primary">
      {/* ── Hero Banner ── */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-primary text-white">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

        <div className="mx-auto max-w-7xl px-6 relative z-10 text-center">
          <motion.div
            initial="hidden" animate="visible" variants={fadeUp} custom={0}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-accent font-black text-[10px] uppercase tracking-[0.3em] mb-10"
          >
            <Zap size={14} className="fill-accent" /> Premium Marketplace Active
          </motion.div>

          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-6xl md:text-8xl font-display font-black mb-8 leading-[1.05] tracking-tight"
          >
            Experience <br />
            <span className="text-accent italic">The Collection.</span>
          </motion.h1>

          <motion.p
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed font-bold"
          >
            Explore a world of high-end technology, curated from elite sellers and global brands. Authenticity and excellence in every drop.
          </motion.p>

          <motion.div
            initial="hidden" animate="visible" variants={fadeUp} custom={3}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <Link href="/products" className="bg-accent text-primary px-10 py-5 rounded-full font-black text-lg hover:scale-[1.05] transition-all shadow-2xl shadow-black/20">
              Shop All Drops
            </Link>
            <Link href="/deals" className="bg-white/10 border border-white/20 text-white px-10 py-5 rounded-full font-black text-lg hover:bg-white/20 transition-all">
              View Flash Deals
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Categories Navigation ── */}
      <section className="mx-auto max-w-7xl px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.5 }}
              className="bg-white p-8 rounded-[32px] shadow-xl shadow-black/5 hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer text-center group border border-transparent hover:border-accent/50"
            >
              <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4 group-hover:bg-primary group-hover:text-accent transition-all">
                {cat.icon}
              </div>
              <h3 className="font-black text-sm uppercase tracking-wider">{cat.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Trending Products ── */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              <span className="text-[10px] font-black text-primary/40 uppercase tracking-[0.3em]">Editor Choice</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight">Trending Now</h2>
          </div>
          <Link href="/products" className="group flex items-center gap-3 font-black text-sm uppercase tracking-widest text-primary/40 hover:text-primary transition-colors">
            Explore Full Store <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-white rounded-[40px] animate-pulse shadow-sm border border-black/5" />
            ))
          ) : (
            trending.map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white rounded-[40px] overflow-hidden shadow-sm border border-transparent hover:border-accent/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
              >
                <Link href={`/product/${p._id}`} className="block relative aspect-square bg-[#F8F9FA] overflow-hidden">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  {p.discountPercentage > 0 && (
                    <div className="absolute top-6 left-6 bg-red-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter">
                      -{p.discountPercentage}% OFF
                    </div>
                  )}
                </Link>
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-black text-primary/30 uppercase tracking-widest">{p.category}</span>
                    <div className="flex items-center gap-1 text-[10px] font-black text-primary/60 ml-auto">
                      <Star size={12} className="fill-[#F5E74E] text-[#F5E74E]" /> {p.rating}
                    </div>
                  </div>
                  <h3 className="text-xl font-black mb-6 leading-tight group-hover:text-primary transition-colors line-clamp-1">{p.name}</h3>
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-primary/5">
                    <span className="text-3xl font-display font-black">${p.price.toFixed(2)}</span>
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
      <section className="mx-auto max-w-7xl px-6 py-20 pb-40">
        <div className="bg-white rounded-[60px] p-12 md:p-24 shadow-sm border border-primary/5 relative overflow-hidden flex flex-col md:flex-row items-center gap-16">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-[#1E4D35]/5 -z-0" style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)" }} />

          <div className="relative z-10 flex-1 space-y-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-accent">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight leading-tight">Authenticity<br />Guaranteed by Experts.</h2>
            <p className="text-primary/60 font-bold leading-relaxed max-w-md">Every product on DealDrop is vetted by our global quality team before it reaches your doorstep. Shop with absolute confidence.</p>
            <div className="flex flex-wrap gap-8 pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={24} className="text-green-500" />
                <span className="text-xs font-black uppercase tracking-widest opacity-60">Verified Sellers</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 size={24} className="text-green-500" />
                <span className="text-xs font-black uppercase tracking-widest opacity-60">Secure Escrow</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex-1 grid grid-cols-2 gap-6">
            <div className="p-8 bg-[#F5F7F6] rounded-[32px] text-center space-y-2">
              <h4 className="text-3xl font-display font-black text-primary">140+</h4>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Luxury Brands</p>
            </div>
            <div className="p-8 bg-[#F5F7F6] rounded-[32px] text-center space-y-2">
              <h4 className="text-3xl font-display font-black text-primary">24/7</h4>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40">VIP Support</p>
            </div>
            <div className="p-8 bg-[#F5F7F6] rounded-[32px] text-center space-y-2 col-span-2">
              <h4 className="text-3xl font-display font-black text-primary">Global</h4>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Secure Delivery Networks</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
