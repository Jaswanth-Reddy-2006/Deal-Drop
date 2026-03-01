"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StarRatingProps {
    initialRating?: number;
    totalStars?: number;
    readOnly?: boolean;
    size?: "sm" | "md" | "lg";
    onRate?: (rating: number) => void;
}

export default function StarRating({
    initialRating = 0,
    totalStars = 5,
    readOnly = false,
    size = "md",
    onRate
}: StarRatingProps) {
    const [rating, setRating] = useState(initialRating);
    const [hover, setHover] = useState(0);

    const starSizes = {
        sm: "w-3.5 h-3.5",
        md: "w-5 h-5",
        lg: "w-8 h-8",
    };

    const currentDisplay = hover || rating;

    return (
        <div className="flex items-center gap-1 group">
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;
                const isFilled = starValue <= currentDisplay;

                return (
                    <button
                        type="button"
                        key={starValue}
                        disabled={readOnly}
                        className={`relative transition-transform ${!readOnly && "hover:scale-125 focus:outline-none"}`}
                        onMouseEnter={() => !readOnly && setHover(starValue)}
                        onMouseLeave={() => !readOnly && setHover(0)}
                        onClick={() => {
                            if (!readOnly) {
                                setRating(starValue);
                                if (onRate) onRate(starValue);
                            }
                        }}
                    >
                        <Star
                            className={`
                ${starSizes[size]} transition-colors duration-200
                ${isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-300 group-hover:text-gray-200"}
              `}
                        />
                    </button>
                );
            })}
            {!readOnly && rating > 0 && (
                <AnimatePresence>
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="ml-2 text-sm font-medium text-brand-textPrimary"
                    >
                        {rating.toFixed(1)}
                    </motion.span>
                </AnimatePresence>
            )}
        </div>
    );
}
