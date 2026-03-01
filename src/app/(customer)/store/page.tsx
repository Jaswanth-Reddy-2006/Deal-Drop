"use client";

import { motion, useInView, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, Zap, ShieldCheck, Tag, Monitor, Speaker, Watch, Dumbbell, Home as HomeIcon, Camera } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AddToCartButton from "@/components/AddToCartButton";
import DealTimer from "@/components/DealTimer";
import RecentlyViewed from "@/components/RecentlyViewed";
import WishlistButton from "@/components/WishlistButton";

// --- ANIMATION CONFIGS ---
interface HomeProduct {
  _id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  rating: number;
  discountPercentage: number;
  dealEndsAt?: string;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
  })
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const categories = [
  { id: 1, name: "Electronics", icon: <Monitor className="w-8 h-8" />, desc: "PCs, laptops & setups" },
  { id: 2, name: "Audio", icon: <Speaker className="w-8 h-8" />, desc: "Headphones & speakers" },
  { id: 3, name: "Accessories", icon: <Watch className="w-8 h-8" />, desc: "Watches & wearables" },
  { id: 4, name: "Fitness", icon: <Dumbbell className="w-8 h-8" />, desc: "Smart health gear" },
  { id: 5, name: "Home Tech", icon: <HomeIcon className="w-8 h-8" />, desc: "Smart living" },
  { id: 6, name: "Creation", icon: <Camera className="w-8 h-8" />, desc: "Cameras & gear" },
];

const stats = [
  { label: "Products Available", target: 10000, suffix: "+" },
  { label: "Happy Customers", target: 2500, suffix: "+" },
  { label: "Satisfaction Rate", target: 99, suffix: "%" },
  { label: "Dedicated Support", target: 24, suffix: "/7" },
];

const testimonials = [
  { id: 1, text: "The fastest shipping I’ve ever experienced. NovaCart is my new go-to for all tech essentials.", author: "Sarah Jenkins", role: "Software Engineer" },
  { id: 2, text: "Curated deals that actually matter. I saved over $200 on my new mechanical keyboard setup.", author: "Michael Chang", role: "Product Designer" },
  { id: 3, text: "A seamless shopping experience from start to finish. The UI feels incredibly premium and modern.", author: "David Wallace", role: "Tech Enthusiast" },
];

// --- STAT COUNTER COMPONENT ---
function AnimatedStat({ target, label, suffix }: { target: number, label: string, suffix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let startTime: number;
      const duration = 2000;
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * target));
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center">
      <h3 className="text-4xl sm:text-5xl font-poppins font-bold text-brand-primary mb-2">
        {count}{suffix}
      </h3>
      <p className="text-brand-textSecondary font-medium">{label}</p>
    </div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [flashSales, setFlashSales] = useState<HomeProduct[]>([]);
  const [trending, setTrending] = useState<HomeProduct[]>([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const trendRes = await fetch("/api/products?sort=featured&limit=4");
        const trendData = await trendRes.json();
        setTrending(trendData.products?.slice(0, 4) || []);

        const flashRes = await fetch("/api/products?min=0&sort=newest");
        const flashData = await flashRes.json();
        const deals = (flashData.products || []).filter((p: HomeProduct) => p.dealEndsAt).slice(0, 4);
        setFlashSales(deals.length > 0 ? deals : (flashData.products || []).slice(4, 8));
      } catch (e) {
        console.error("Home fetch failed", e);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  return (
    <div className="flex flex-col space-y-[120px] w-full overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-[100px]" />

        <div className="container-main relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial="hidden" animate="visible" variants={fadeUp} custom={0}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs uppercase tracking-widest mb-8"
            >
              <Zap className="w-4 h-4 fill-brand-primary" /> The Future of Curated Commerce
            </motion.div>

            <motion.h1
              initial="hidden" animate="visible" variants={fadeUp} custom={1}
              className="text-5xl md:text-7xl font-extrabold font-poppins text-brand-textPrimary mb-6 leading-[1.1] tracking-tight"
            >
              Premium Tech. <br />
              <span className="gradient-text">Unbeatable Deals.</span>
            </motion.h1>

            <motion.p
              initial="hidden" animate="visible" variants={fadeUp} custom={2}
              className="text-lg md:text-xl text-brand-textSecondary mb-10 max-w-xl mx-auto leading-relaxed font-medium"
            >
              Discover the most coveted electronics and lifestyle gear from trusted vendors.
              Enterprise-grade quality for the modern enthusiast.
            </motion.p>

            <motion.div
              initial="hidden" animate="visible" variants={fadeUp} custom={3}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/products" className="btn-primary w-full sm:w-auto">
                Explore The Drops <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/deals" className="btn-secondary w-full sm:w-auto">
                Flash Sales
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. TRENDING NOW SECTION */}
      <section className="container-main py-section border-t border-brand-border/50">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-textPrimary font-poppins mb-2 flex items-center gap-3">
              Trending Now <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            </h2>
            <p className="text-brand-textSecondary text-lg">The most coveted items in the community right now.</p>
          </motion.div>
          <Link href="/products" className="text-brand-primary font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="card-premium h-[400px] animate-pulse bg-gray-50 rounded-3xl" />
            ))
          ) : (
            trending.map((product, i) => (
              <motion.div key={product._id} variants={fadeUp} custom={i} className="card-premium p-0 flex flex-col group overflow-hidden relative">
                <Link href={`/product/${product._id}`} className="block aspect-square bg-[#F1F5F9] relative overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <WishlistButton product={{ id: product._id, name: product.name, price: product.price, image: product.images[0] }} />
                  </div>
                  {product.discountPercentage > 0 && (
                    <div className="absolute top-4 left-4 bg-brand-danger text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-tighter">
                      -{product.discountPercentage}% OFF
                    </div>
                  )}
                </Link>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">{product.category}</span>
                    <div className="flex items-center gap-1 text-xs text-brand-textSecondary ml-auto">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {product.rating}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-brand-textPrimary line-clamp-1 mb-1 group-hover:text-brand-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-poppins font-bold text-brand-textPrimary mt-auto">
                    ${product.price.toFixed(2)}
                  </p>

                  <div className="mt-4 pt-4 border-t border-brand-border">
                    <AddToCartButton
                      product={{ id: product._id, name: product.name, price: product.price, image: product.images[0] }}
                      className="w-full py-2.5"
                    />
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </section>

      {/* 3. FLASH SALES */}
      <section className="bg-brand-textPrimary text-white py-[100px] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="container-main relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full mb-4 border border-white/10">
                <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-yellow-400">Exclusive Drops</span>
              </div>
              <h2 className="text-white text-4xl md:text-5xl font-extrabold font-poppins mb-4">Midnight Flash Drops</h2>
              <p className="text-gray-400 text-lg max-w-xl">Hyper-limited stock items with deep discounts ending soon. Don&apos;t wait.</p>
            </div>
            <Link href="/deals" className="px-8 py-4 bg-white text-brand-textPrimary rounded-2xl font-bold hover:bg-yellow-400 transition-colors shadow-xl">
              View All Deals
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {flashSales.map((product) => (
              <div key={product._id} className="bg-white/5 border border-white/10 rounded-3xl p-5 group hover:bg-white/10 transition-colors">
                <Link href={`/product/${product._id}`} className="block aspect-square rounded-2xl bg-white overflow-hidden mb-6 relative">
                  <div className="absolute top-2 left-2 bg-brand-danger text-white text-[10px] font-bold px-2 py-0.5 rounded-full">-{product.discountPercentage}%</div>
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700 p-4" />
                </Link>
                <div className="space-y-4">
                  {product.dealEndsAt && <DealTimer targetDate={product.dealEndsAt} />}
                  <h3 className="text-lg font-bold text-white leading-tight line-clamp-1">{product.name}</h3>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-bold text-white">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500 line-through">${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}</span>
                  </div>
                  <AddToCartButton
                    product={{ id: product._id, name: product.name, price: product.price, image: product.images[0] }}
                    className="w-full py-3 bg-brand-primary border-none text-white rounded-xl font-bold hover:bg-brand-primary/90 transition-colors"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CATEGORIES SECTION */}
      <section className="bg-white py-[100px]">
        <div className="container-main space-y-12">
          <div className="text-center">
            <h2 className="text-brand-textPrimary text-3xl md:text-4xl font-extrabold font-poppins">Shop by Category</h2>
            <p className="text-brand-textSecondary mt-2 text-lg">Curated collections for your modern lifestyle.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.name}`}
                className="group p-8 border border-brand-border rounded-3xl bg-brand-bg transition-all duration-300 hover:bg-white hover:border-brand-primary/50 hover:shadow-xl hover:shadow-brand-primary/5 cursor-pointer flex items-center gap-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="w-16 h-16 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center transition-all duration-300 group-hover:bg-brand-primary group-hover:text-white"
                >
                  {cat.icon}
                </motion.div>
                <div>
                  <h3 className="font-bold text-xl text-brand-textPrimary mb-1">{cat.name}</h3>
                  <p className="text-sm text-brand-textSecondary">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. STATS & ADVANTAGE */}
      <section className="container-main py-section">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {stats.map((stat, i) => (
            <AnimatedStat key={i} target={stat.target} label={stat.label} suffix={stat.suffix} />
          ))}
        </div>

        <div className="bg-slate-900 rounded-[40px] p-8 md:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/20 blur-[120px] rounded-full pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Hyper-Fast Checkout", icon: <Zap className="w-10 h-10" />, desc: "One-click purchases powered by Stripe. Because missing a drop hurts." },
              { title: "Vetted Tech Only", icon: <ShieldCheck className="w-10 h-10" />, desc: "No white-label junk. Every product is tested by our engineering team." },
              { title: "Secure & Guaranteed", icon: <Tag className="w-10 h-10" />, desc: "Full SSL encryption, 30-day returns, and round-the-clock priority support." },
            ].map((feature, i) => (
              <div key={i} className="space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-brand-primary text-white flex items-center justify-center shadow-lg shadow-brand-primary/30">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-lg">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="container-main py-section">
        <div className="text-center mb-16">
          <h2 className="text-brand-textPrimary text-3xl md:text-4xl font-extrabold font-poppins">Community First</h2>
          <p className="text-brand-textSecondary mt-2 text-lg">Join thousands of smart shoppers across the globe.</p>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-12 hide-scrollbar snap-x">
          {testimonials.map((t) => (
            <div key={t.id} className="min-w-[320px] md:min-w-[420px] bg-white border border-brand-border p-8 rounded-3xl snap-center hover:shadow-xl hover:shadow-brand-primary/5 transition-all">
              <div className="flex text-yellow-500 mb-6 gap-1">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-brand-textPrimary text-xl font-medium leading-relaxed mb-8">&quot;{t.text}&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-primary/5 rounded-full flex items-center justify-center text-brand-primary font-bold">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-brand-textPrimary">{t.author}</h4>
                  <p className="text-brand-textSecondary text-sm uppercase font-bold tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="container-main">
        <RecentlyViewed />
      </div>

      {/* 7. CTA SECTION */}
      <section className="container-main pb-[100px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="gradient-blue rounded-[40px] p-12 sm:p-24 text-center text-white relative overflow-hidden flex flex-col items-center shadow-2xl shadow-brand-primary/30"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
          <h2 className="text-white text-4xl sm:text-6xl font-extrabold max-w-3xl mx-auto z-10 mb-8 tracking-tight font-poppins">
            Ready for your<br />next premium drop?
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto z-10">
            <Link href="/products" className="bg-white text-brand-primary px-10 py-5 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-transform text-lg shadow-2xl">
              Start Shopping
            </Link>
            <Link href="/register" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-bold hover:bg-white/20 active:scale-95 transition-all text-lg">
              Join NovaCart
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
