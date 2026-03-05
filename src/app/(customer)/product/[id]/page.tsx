/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useCartStore } from "@/store/useCartStore";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShieldCheck, Truck, ArrowLeft, Share2, Check, Star, BadgeCheck,
    RotateCcw, Clock, Loader2, Minus, Plus, ShoppingBag,
    ChevronDown, ChevronUp, Info, Tag, HeartIcon
} from "lucide-react";
import Link from "next/link";
import DealTimer from "@/components/DealTimer";
import StarRating from "@/components/StarRating";
import RecentlyViewed from "@/components/RecentlyViewed";
import WishlistButton from "@/components/WishlistButton";
import { useRouter } from "next/navigation";

function Accordion({ title, children, icon }: { title: string, children: React.ReactNode, icon?: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-primary/5 py-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between text-left group"
            >
                <div className="flex items-center gap-4">
                    {icon && <div className="text-primary/40 group-hover:text-primary transition-colors">{icon}</div>}
                    <span className="text-sm font-black uppercase tracking-widest text-primary">{title}</span>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-primary/40" /> : <ChevronDown className="w-4 h-4 text-primary/40" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-6 text-primary/60 text-sm leading-relaxed font-medium">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCartStore();
    const [showNotification, setShowNotification] = useState(false);
    const router = useRouter();

    const [reviews, setReviews] = useState<any[]>([]);
    const [reviewDist, setReviewDist] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
    const [reviewTotal, setReviewTotal] = useState(0);
    const [reviewForm, setReviewForm] = useState({ userName: "", rating: 5, comment: "" });
    const [reviewLoading, setReviewLoading] = useState(false);
    const [reviewSuccess, setReviewSuccess] = useState(false);
    const [hoverStar, setHoverStar] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${params.id}`);
                const data = await res.json();
                setProduct(data);

                const stored = localStorage.getItem("recentlyViewed");
                let parsed = stored ? JSON.parse(stored) : [];
                parsed = parsed.filter((i: any) => i.id !== data._id);
                parsed.unshift({
                    id: data._id, name: data.name, price: data.price,
                    image: data.images[0], category: data.category, rating: data.rating
                });
                localStorage.setItem("recentlyViewed", JSON.stringify(parsed.slice(0, 8)));
            } catch (e) { console.error(e); } finally { setLoading(false); }
        };
        fetchProduct();
    }, [params.id]);

    useEffect(() => {
        if (!params.id) return;
        fetch(`/api/products/${params.id}/reviews`)
            .then(r => r.json())
            .then(d => {
                setReviews(d.reviews || []);
                setReviewDist(d.distribution || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
                setReviewTotal(d.total || 0);
            }).catch(() => { });
    }, [params.id]);

    const submitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        setReviewLoading(true);
        try {
            const res = await fetch(`/api/products/${params.id}/reviews`, {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reviewForm),
            });
            if (res.ok) {
                const newReview = await res.json();
                setReviews(prev => [newReview, ...prev]);
                setReviewTotal(prev => prev + 1);
                setReviewForm({ userName: "", rating: 5, comment: "" });
                setReviewSuccess(true);
                setTimeout(() => setReviewSuccess(false), 4000);
            }
        } finally { setReviewLoading(false); }
    };

    if (loading) return <div className="container-main py-32 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>;
    if (!product) return <div className="container-main py-32 text-center font-black text-2xl">Drop Not Found.</div>;

    const finalPrice = product.discountPercentage > 0
        ? product.price * (1 - product.discountPercentage / 100)
        : product.price;

    return (
        <div className="bg-[#FDFDFD] min-h-screen">
            <div className="container-main py-8 md:py-16">

                {/* ── Breadcrumbs ── */}
                <div className="flex items-center gap-4 mb-12 text-xs font-black uppercase tracking-widest text-primary/30">
                    <Link href="/products" className="hover:text-primary transition-colors">Store</Link>
                    <div className="w-1 h-1 rounded-full bg-primary/20" />
                    <Link href={`/products?category=${product.category}`} className="hover:text-primary transition-colors">{product.category}</Link>
                    <div className="w-1 h-1 rounded-full bg-primary/20" />
                    <span className="text-primary">{product.name}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">

                    {/* ── Left Column: Media Gallery ── */}
                    <div className="flex-1 lg:max-w-3xl">
                        <div className="sticky top-32 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="aspect-[4/5] md:aspect-square bg-white border border-primary/5 rounded-[60px] overflow-hidden group shadow-2xl shadow-primary/5"
                            >
                                <img
                                    src={product.images[activeImage]}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                            </motion.div>

                            <div className="flex gap-4 px-4 overflow-x-auto pb-4 custom-scrollbar">
                                {product.images.map((img: string, i: number) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImage(i)}
                                        className={`w-32 h-32 rounded-[32px] overflow-hidden border-2 transition-all flex-shrink-0 ${activeImage === i ? "border-primary p-1 bg-primary/5" : "border-transparent opacity-50 hover:opacity-100"}`}
                                    >
                                        <img src={img} className="w-full h-full object-cover rounded-[24px]" alt="Gallery" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Right Column: Configuration ── */}
                    <div className="lg:w-[500px] flex flex-col">
                        <div className="space-y-10">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-primary text-accent text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                                        Limited Drop
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] font-black text-primary/40 bg-primary/5 px-3 py-1 rounded-full">
                                        <Star size={12} className="fill-[#F5E74E] text-[#F5E74E]" /> {product.rating}
                                    </div>
                                </div>

                                <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight text-primary leading-[1.1] mb-6">
                                    {product.name}
                                </h1>

                                <div className="flex items-baseline gap-4">
                                    <span className="text-4xl font-display font-black text-primary">₹{finalPrice.toLocaleString('en-IN')}</span>
                                    {product.discountPercentage > 0 && (
                                        <span className="text-2xl font-display font-black text-primary/20 line-through decoration-primary/20 decoration-2">₹{product.price.toLocaleString('en-IN')}</span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 bg-primary/[0.03] rounded-3xl border border-primary/5">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">Stock Status</span>
                                    </div>
                                    <span className="text-xs font-black text-primary">{product.stock > 0 ? `Available in Vault (${product.stock})` : "Secured (Sold Out)"}</span>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex items-center bg-white border border-primary/5 rounded-full p-2 h-[72px] shrink-0">
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 rounded-full hover:bg-primary/5 flex items-center justify-center transition-colors"><Minus size={16} /></button>
                                        <span className="w-12 text-center font-black text-lg">{quantity}</span>
                                        <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 rounded-full hover:bg-primary/5 flex items-center justify-center transition-colors"><Plus size={16} /></button>
                                    </div>
                                    <button
                                        onClick={() => addToCart({ id: product._id, name: product.name, price: product.price, quantity, image: product.images[0] })}
                                        disabled={product.stock === 0}
                                        className="h-[72px] flex-1 bg-primary text-accent rounded-full font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-20 flex items-center justify-center gap-3"
                                    >
                                        <ShoppingBag size={20} /> Collect Drop
                                    </button>
                                </div>

                                <button className="w-full h-[72px] border-2 border-primary/5 rounded-full flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest hover:bg-primary/5 transition-all">
                                    <HeartIcon size={18} /> Add to Collection
                                </button>
                            </div>

                            <div className="pt-4">
                                <Accordion title="The Blueprint" icon={<Info size={18} />}>
                                    <p className="mb-4">{product.description}</p>
                                    <ul className="space-y-2 list-disc pl-4 font-bold text-xs uppercase tracking-widest opacity-80">
                                        <li>Premium Technical Materials</li>
                                        <li>Limited Edition Zenith Series</li>
                                        <li>Engineered specifically for {product.category}</li>
                                    </ul>
                                </Accordion>

                                <Accordion title="Logistics" icon={<Truck size={18} />}>
                                    <div className="space-y-4">
                                        <div className="flex gap-4 p-4 rounded-2xl bg-white border border-primary/5">
                                            <div className="w-10 h-10 rounded-xl bg-blue-500/5 flex items-center justify-center text-blue-500"><Truck size={20} /></div>
                                            <div>
                                                <p className="font-black text-[10px] uppercase tracking-widest">Global Vault Shipping</p>
                                                <p className="text-xs font-medium text-primary/40">Secure delivery within 2-4 business days.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 p-4 rounded-2xl bg-white border border-primary/5">
                                            <div className="w-10 h-10 rounded-xl bg-green-500/5 flex items-center justify-center text-green-500"><ShieldCheck size={20} /></div>
                                            <div>
                                                <p className="font-black text-[10px] uppercase tracking-widest">30-Day Guarantee</p>
                                                <p className="text-xs font-medium text-primary/40">No-questions-asked returns for vault items.</p>
                                            </div>
                                        </div>
                                    </div>
                                </Accordion>

                                <Accordion title="Identity & Care" icon={<Tag size={18} />}>
                                    <div className="flex flex-wrap gap-2">
                                        {product.tags.map((tag: string, i: number) => (
                                            <span key={i} className="bg-primary/5 text-primary/40 text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-primary/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Community Reviews ── */}
                <section className="mt-32 border-t border-primary/5 pt-32">
                    <div className="flex flex-col md:flex-row gap-16">
                        <div className="md:w-[380px] space-y-12">
                            <div>
                                <h2 className="text-3xl font-display font-black text-primary mb-6">Expert Feedback</h2>
                                <div className="flex items-center gap-6">
                                    <div className="text-6xl font-display font-black text-primary">{product.rating}</div>
                                    <div className="space-y-1">
                                        <div className="flex text-[#F5E74E]">
                                            {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} className={s <= Math.round(product.rating) ? "fill-current" : "opacity-20"} />)}
                                        </div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary/30">Based on {reviewTotal} Drops</p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={submitReview} className="p-10 bg-white border border-primary/5 rounded-[40px] shadow-2xl shadow-primary/5 space-y-6">
                                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-primary/40">Log Your Experience</h3>
                                <input
                                    required value={reviewForm.userName}
                                    onChange={e => setReviewForm(p => ({ ...p, userName: e.target.value }))}
                                    placeholder="Your Identity"
                                    className="w-full bg-primary/5 border border-transparent focus:border-primary/20 px-6 py-4 rounded-2xl text-sm font-bold outline-none transition-all"
                                />
                                <div className="flex gap-2 p-2 bg-primary/5 rounded-2xl justify-center">
                                    {[1, 2, 3, 4, 5].map(s => (
                                        <button
                                            type="button" key={s}
                                            onMouseEnter={() => setHoverStar(s)}
                                            onMouseLeave={() => setHoverStar(0)}
                                            onClick={() => setReviewForm(p => ({ ...p, rating: s }))}
                                            className="p-2 transition-transform hover:scale-125 transition-all"
                                        >
                                            <Star size={24} className={`transition-colors ${(hoverStar || reviewForm.rating) >= s ? "fill-[#F5E74E] text-[#F5E74E]" : "text-primary/10"}`} />
                                        </button>
                                    ))}
                                </div>
                                <textarea
                                    required value={reviewForm.comment}
                                    onChange={e => setReviewForm(p => ({ ...p, comment: e.target.value }))}
                                    rows={4}
                                    placeholder="Transmit drop details..."
                                    className="w-full bg-primary/5 border border-transparent focus:border-primary/20 px-6 py-4 rounded-2xl text-sm font-bold outline-none transition-all resize-none"
                                />
                                <button className="w-full py-5 bg-primary text-accent rounded-full font-black text-[11px] uppercase tracking-widest shadow-xl shadow-primary/10 hover:shadow-primary/30 transition-all">
                                    Broadcast Review
                                </button>
                            </form>
                        </div>

                        <div className="flex-1 space-y-8">
                            <AnimatePresence mode="popLayout">
                                {reviews.map((review: any, i: number) => (
                                    <motion.div
                                        key={review._id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-10 bg-white border border-primary/5 rounded-[50px] shadow-sm hover:shadow-xl transition-all"
                                    >
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center font-black text-primary">{review.userName[0]}</div>
                                                <div>
                                                    <p className="font-black text-sm text-primary">{review.userName}</p>
                                                    <p className="text-[10px] font-bold text-primary/30 uppercase tracking-widest">{new Date(review.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex text-[#F5E74E]">
                                                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} className={s <= review.rating ? "fill-current" : "opacity-10"} />)}
                                            </div>
                                        </div>
                                        <p className="text-primary/60 font-medium leading-relaxed italic">"{review.comment}"</p>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {reviews.length === 0 && (
                                <div className="py-24 text-center border-2 border-dashed border-primary/5 rounded-[50px]">
                                    <p className="font-black text-xs uppercase tracking-[0.3em] text-primary/20">The frequency is silent.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <RecentlyViewed />
            </div>
        </div>
    );
}
