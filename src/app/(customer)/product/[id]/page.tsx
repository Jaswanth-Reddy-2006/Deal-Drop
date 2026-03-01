/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useCartStore } from "@/store/useCartStore";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Truck, ArrowLeft, Share2, Check, Star, BadgeCheck, RotateCcw, Clock, Loader2 } from "lucide-react";
import Link from "next/link";
import DealTimer from "@/components/DealTimer";
import StarRating from "@/components/StarRating";
import RecentlyViewed from "@/components/RecentlyViewed";
import WishlistButton from "@/components/WishlistButton";
import { useRouter } from "next/navigation";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCartStore();
    const [showNotification, setShowNotification] = useState(false);
    const router = useRouter();

    // Reviews
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
                if (!res.ok) return;
                const data = await res.json();
                setProduct(data);

                // --- Add to Recently Viewed ---
                const stored = localStorage.getItem("recentlyViewed");
                let parsed = stored ? JSON.parse(stored) : [];
                const newItem = {
                    id: data._id,
                    name: data.name,
                    price: data.price,
                    image: data.images[0],
                    category: data.category,
                    rating: data.rating
                };
                parsed = parsed.filter((i: any) => i.id !== data._id); // Remove if exists
                parsed.unshift(newItem); // Add to beginning
                parsed = parsed.slice(0, 8); // Keep max 8
                localStorage.setItem("recentlyViewed", JSON.stringify(parsed));

            } catch {
                console.error("Failed fetching product");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params.id]);

    // Fetch Reviews
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
        if (!reviewForm.userName || !reviewForm.comment) return;
        setReviewLoading(true);
        try {
            const res = await fetch(`/api/products/${params.id}/reviews`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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

    if (loading) {
        return (
            <div className="container-main py-section pb-24 space-y-12 animate-pulse">
                <div className="w-48 h-6 bg-gray-200 rounded" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="aspect-square bg-gray-200 rounded-2xl" />
                    <div className="space-y-4">
                        <div className="w-1/3 h-8 bg-gray-200 rounded" />
                        <div className="w-3/4 h-12 bg-gray-200 rounded" />
                        <div className="w-1/2 h-10 bg-gray-200 rounded" />
                        <div className="w-full h-32 bg-gray-200 rounded mt-8" />
                    </div>
                </div>
            </div>
        );
    }

    if (!product) return <div className="text-center py-32 text-2xl font-bold">Product not found.</div>;

    const handleAddWithQuantity = () => {
        addToCart({
            id: product._id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.images[0]
        });

        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    const finalPrice = product.discountPercentage > 0
        ? product.price - (product.price * (product.discountPercentage / 100))
        : product.price;

    return (
        <div className="container-main py-section pb-24">
            {/* Toast Notification */}
            <motion.div
                initial={{ opacity: 0, y: 50, x: "-50%" }}
                animate={{ opacity: showNotification ? 1 : 0, y: showNotification ? 0 : 50, x: "-50%" }}
                className="fixed bottom-8 left-1/2 z-50 bg-brand-textPrimary text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 pointer-events-none"
            >
                <div className="w-8 h-8 rounded-full bg-brand-success flex items-center justify-center">
                    <Check className="w-5 h-5" />
                </div>
                <div>
                    <p className="font-bold">Added to Cart</p>
                    <p className="text-sm opacity-80">{quantity}x {product.name}</p>
                </div>
            </motion.div>

            <Link href="/products" className="inline-flex items-center gap-2 text-brand-textSecondary hover:text-brand-primary mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to drops
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

                {/* Left Column: Images */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="aspect-square bg-[#F8FAFC] rounded-2xl flex items-center justify-center border border-brand-border overflow-hidden relative"
                    >
                        {/* Tag */}
                        {product.featured && (
                            <div className="absolute top-6 left-6 bg-brand-primary text-white text-sm font-bold px-4 py-1.5 rounded-full z-10 shadow-lg shadow-brand-primary/20">
                                Top Rated
                            </div>
                        )}
                        {product.discountPercentage > 0 && (
                            <div className="absolute top-6 right-6 bg-brand-danger text-white text-sm font-bold px-4 py-1.5 rounded-full z-10 shadow-lg">
                                {product.discountPercentage}% OFF
                            </div>
                        )}

                        <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" />
                    </motion.div>

                    <div className="grid grid-cols-4 gap-4">
                        {product.images.map((img: string, idx: number) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(idx)}
                                className={`aspect-square rounded-xl bg-[#F8FAFC] overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-brand-primary bg-brand-primary/5' : 'border-brand-border hover:border-gray-300'}`}
                            >
                                <img src={img} alt="Thumbnail" className="w-full h-full object-cover mix-blend-multiply opacity-80 hover:opacity-100 transition-opacity" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Column: Details */}
                <div className="flex flex-col">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className="text-sm font-semibold text-brand-primary tracking-wider uppercase bg-brand-primary/10 px-3 py-1 rounded-full">
                                {product.category}
                            </span>
                            <span className="text-sm font-semibold text-brand-textSecondary tracking-wider uppercase bg-gray-100 px-3 py-1 rounded-full">
                                {product.brand}
                            </span>

                            <div className="flex items-center ml-auto">
                                <StarRating initialRating={product.rating} readOnly size="sm" />
                                <span className="text-brand-textSecondary text-sm ml-2">({product.reviewsCount} reviews)</span>
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-extrabold text-brand-textPrimary mb-4 leading-tight">
                            {product.name}
                        </h1>

                        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
                            <div className="flex items-end gap-3">
                                <span className="text-4xl font-poppins font-bold text-brand-textPrimary">${finalPrice.toFixed(2)}</span>
                                {product.discountPercentage > 0 && (
                                    <span className="text-xl text-brand-textSecondary line-through mb-1">${product.price.toFixed(2)}</span>
                                )}
                            </div>

                            {product.dealEndsAt && (
                                <DealTimer targetDate={product.dealEndsAt} />
                            )}
                        </div>

                        <p className="text-brand-textSecondary text-lg leading-relaxed mb-6">
                            {product.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {product.tags.map((tag: string, idx: number) => (
                                <span key={idx} className="bg-gray-100 text-brand-textSecondary text-xs px-2.5 py-1 rounded-md font-medium">#{tag}</span>
                            ))}
                        </div>

                    </motion.div>

                    {/* Action Area */}
                    <div className="mt-auto bg-gray-50 border border-brand-border p-6 rounded-2xl relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-primary opacity-[0.03] rounded-full blur-2xl" />

                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="flex items-center bg-white border border-brand-border rounded-lg p-1">
                                <button
                                    disabled={product.stock === 0}
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 flex items-center justify-center text-brand-textSecondary hover:text-brand-primary disabled:opacity-50 transition-colors"
                                >
                                    -
                                </button>
                                <span className="w-8 text-center font-medium">{quantity}</span>
                                <button
                                    disabled={quantity >= product.stock || product.stock === 0}
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 flex items-center justify-center text-brand-textSecondary hover:text-brand-primary disabled:opacity-50 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                            <span className={`text-sm font-medium ${product.stock > 0 ? "text-brand-success" : "text-brand-danger"}`}>
                                {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                            <button
                                onClick={handleAddWithQuantity}
                                disabled={product.stock === 0}
                                className="btn-primary flex justify-center items-center py-4 w-full text-lg shadow-xl shadow-brand-primary/20 hover:shadow-brand-primary/40 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Add {quantity} to Cart - ${(finalPrice * quantity).toFixed(2)}
                            </button>
                            <button
                                disabled={product.stock === 0}
                                onClick={() => {
                                    addToCart({
                                        id: product._id,
                                        name: product.name,
                                        price: product.price,
                                        quantity: quantity,
                                        image: product.images[0]
                                    });
                                    router.push("/cart");
                                }}
                                className="btn-secondary flex justify-center items-center py-4 text-lg bg-white border-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Buy it Now
                            </button>
                        </div>

                        <div className="mt-6 flex items-center justify-center gap-6 pt-6 border-t border-brand-border relative z-10 text-brand-textSecondary">
                            <WishlistButton
                                product={{ id: product._id, name: product.name, price: product.price, image: product.images[0] }}
                                showText
                            />
                            <button className="flex items-center gap-2 text-sm font-medium hover:text-brand-textPrimary transition-colors">
                                <Share2 className="w-4 h-4" /> Share Product
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-6 mt-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                <Truck className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-brand-textPrimary text-sm">Free Shipping</p>
                                <p className="text-brand-textSecondary text-xs">On orders over $100</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-brand-textPrimary text-sm">30-Day Returns</p>
                                <p className="text-brand-textSecondary text-xs">Guaranteed refund</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Trust Signals */}
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
                {[
                    { icon: <Truck className="w-5 h-5 text-brand-primary" />, title: "Free Shipping", sub: "Orders over $100", bg: "bg-blue-50" },
                    { icon: <RotateCcw className="w-5 h-5 text-green-600" />, title: "30-Day Returns", sub: "No questions asked", bg: "bg-green-50" },
                    { icon: <Clock className="w-5 h-5 text-purple-600" />, title: "Delivery 2–5 Days", sub: "Express available", bg: "bg-purple-50" },
                    { icon: <ShieldCheck className="w-5 h-5 text-orange-500" />, title: "Secure Checkout", sub: "256-bit AES encryption", bg: "bg-orange-50" },
                ].map((t, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                        className="bg-white border border-brand-border rounded-2xl p-4 flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl ${t.bg} flex items-center justify-center shrink-0`}>{t.icon}</div>
                        <div>
                            <p className="text-sm font-bold text-brand-textPrimary">{t.title}</p>
                            <p className="text-xs text-brand-textSecondary">{t.sub}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Reviews Section */}
            <div className="mb-14">
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-2xl font-extrabold font-poppins text-brand-textPrimary">Customer Reviews</h2>
                    <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-3 py-1.5 rounded-xl">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-black text-yellow-700 text-sm">{product.rating}</span>
                        <span className="text-yellow-600 text-xs">({reviewTotal} reviews)</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Rating Distribution */}
                    <div className="bg-white border border-brand-border rounded-2xl p-6">
                        <h3 className="text-sm font-black text-brand-textSecondary uppercase tracking-widest mb-5">Rating Breakdown</h3>
                        <div className="space-y-3">
                            {[5, 4, 3, 2, 1].map((star) => {
                                const count = reviewDist[star] || 0;
                                const pct = reviewTotal > 0 ? (count / reviewTotal) * 100 : 0;
                                return (
                                    <div key={star} className="flex items-center gap-3">
                                        <div className="flex items-center gap-1 w-20 shrink-0">
                                            <span className="text-xs font-bold text-brand-textPrimary">{star}</span>
                                            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                        </div>
                                        <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.1 }}
                                                className={`h-full rounded-full ${star >= 4 ? "bg-green-500" : star === 3 ? "bg-yellow-400" : "bg-red-400"}`} />
                                        </div>
                                        <span className="text-xs text-brand-textSecondary w-10 text-right">{count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Write Review */}
                    <div className="bg-white border border-brand-border rounded-2xl p-6">
                        <h3 className="text-sm font-black text-brand-textSecondary uppercase tracking-widest mb-5">Write a Review</h3>
                        <AnimatePresence>
                            {reviewSuccess && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                    className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl mb-4 text-green-700">
                                    <BadgeCheck className="w-5 h-5 shrink-0" />
                                    <span className="text-sm font-bold">Review submitted! Thank you.</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <form onSubmit={submitReview} className="space-y-4">
                            <input required value={reviewForm.userName} onChange={e => setReviewForm(p => ({ ...p, userName: e.target.value }))}
                                placeholder="Your name" className="w-full px-4 py-3 border border-brand-border rounded-xl text-sm focus:border-brand-primary outline-none bg-brand-bg" />
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-brand-textSecondary">Rating:</span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(s => (
                                        <button type="button" key={s}
                                            onMouseEnter={() => setHoverStar(s)} onMouseLeave={() => setHoverStar(0)}
                                            onClick={() => setReviewForm(p => ({ ...p, rating: s }))}>
                                            <Star className={`w-6 h-6 transition-colors ${s <= (hoverStar || reviewForm.rating)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-300 fill-gray-300"
                                                }`} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <textarea required value={reviewForm.comment} onChange={e => setReviewForm(p => ({ ...p, comment: e.target.value }))}
                                rows={4} placeholder="Share your experience with this product..."
                                className="w-full px-4 py-3 border border-brand-border rounded-xl text-sm focus:border-brand-primary outline-none resize-none bg-brand-bg" />
                            <button type="submit" disabled={reviewLoading}
                                className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-60">
                                {reviewLoading ? <><Loader2 className="w-4 h-4 animate-spin" />Posting...</> : "Submit Review"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Review Cards */}
                {reviews.length > 0 && (
                    <div className="mt-8 space-y-5">
                        {reviews.map((review: any) => (
                            <motion.div key={review._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                className="bg-white border border-brand-border rounded-2xl p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary font-black text-lg flex items-center justify-center">
                                            {review.userName[0]?.toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-bold text-brand-textPrimary">{review.userName}</p>
                                                {review.verified && <span title="Verified Purchase"><BadgeCheck className="w-4 h-4 text-brand-primary" /></span>}
                                            </div>
                                            <p className="text-xs text-brand-textSecondary">{new Date(review.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" } as Intl.DateTimeFormatOptions)}</p>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className={`w-4 h-4 ${s <= review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`} />)}
                                    </div>
                                </div>
                                <p className="text-sm text-brand-textSecondary leading-relaxed">{review.comment}</p>
                            </motion.div>
                        ))}
                    </div>
                )}

                {reviews.length === 0 && !loading && (
                    <div className="mt-8 bg-white border border-dashed border-brand-border rounded-2xl p-12 text-center">
                        <Star className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                        <p className="text-brand-textSecondary font-medium">No reviews yet. Be the first to review!</p>
                    </div>
                )}
            </div>

            {/* Recents Engine */}
            <RecentlyViewed />

        </div>
    );
}
