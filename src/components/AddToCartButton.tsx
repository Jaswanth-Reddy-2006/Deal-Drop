"use client";

import { useCartStore } from "@/store/useCartStore";
import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

interface AddToCartButtonProps {
    product: {
        id: string;
        name: string;
        price: number;
        image?: string;
    };
    className?: string;
    showIcon?: boolean;
}

export default function AddToCartButton({ product, className, showIcon = false }: AddToCartButtonProps) {
    const addToCart = useCartStore((state) => state.addToCart);
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image || "/placeholder.jpg",
        });

        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAdd}
            disabled={added}
            className={`relative flex items-center justify-center gap-2 overflow-hidden transition-all duration-300 font-bold ${added
                ? "bg-brand-success text-white border-brand-success cursor-default"
                : "bg-white border-2 border-brand-border text-brand-textPrimary hover:bg-brand-primary hover:border-brand-primary hover:text-white hover:shadow-lg hover:shadow-brand-primary/20"
                } ${className || "w-full py-3 rounded-2xl"}`}
        >
            <motion.div
                initial={false}
                animate={added ? "added" : "initial"}
                variants={{
                    added: { y: -40, opacity: 0 },
                    initial: { y: 0, opacity: 1 }
                }}
                className="absolute flex items-center gap-2 w-full justify-center"
            >
                {showIcon && <ShoppingCart className="w-5 h-5" />}
                Add to Cart
            </motion.div>

            <motion.div
                initial={false}
                animate={added ? "added" : "initial"}
                variants={{
                    added: { y: 0, opacity: 1 },
                    initial: { y: 40, opacity: 0 }
                }}
                className="absolute flex items-center gap-2 w-full justify-center"
            >
                <Check className="w-5 h-5" />
                Added!
            </motion.div>

            {/* Invisible spacer to keep button height */}
            <div className="opacity-0 flex items-center gap-2">
                {showIcon && <ShoppingCart className="w-5 h-5" />}
                Add to Cart
            </div>
        </button>
    );
}
