"use client";

import { useWishlistStore } from "@/store/useWishlistStore";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface WishlistButtonProps {
    product: {
        id: string;
        name: string;
        price: number;
        image: string;
    };
    showText?: boolean;
}

export default function WishlistButton({ product, showText }: WishlistButtonProps) {
    const { toggleWishlist, isInWishlist } = useWishlistStore();
    const active = isInWishlist(product.id);

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(product);
            }}
            className={`flex items-center gap-2 transition-all ${showText ? "hover:text-brand-danger" : ""}`}
        >
            <motion.div
                whileTap={{ scale: 0.7 }}
                animate={{ scale: active ? [1, 1.3, 1] : 1 }}
            >
                <Heart
                    className={`w-5 h-5 transition-colors ${active ? "fill-brand-danger text-brand-danger" : "text-brand-textSecondary hover:text-brand-danger"}`}
                />
            </motion.div>
            {showText && <span className="text-sm font-medium">{active ? "Saved to Wishlist" : "Add to Wishlist"}</span>}
        </button>
    );
}
