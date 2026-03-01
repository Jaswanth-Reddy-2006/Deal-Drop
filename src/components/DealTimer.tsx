"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function DealTimer({ targetDate }: { targetDate: string | Date }) {
    const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);

    useEffect(() => {
        const EndTime = new Date(targetDate).getTime();

        // Quick calculate
        const updateTime = () => {
            const now = new Date().getTime();
            const distance = EndTime - now;

            if (distance < 0) {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setTimeLeft({
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            });
        };

        updateTime(); // initial
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    if (!timeLeft) return <div className="h-6 w-24 bg-gray-100 rounded animate-pulse" />; // skeleton

    const isUrgent = timeLeft.hours < 1;
    const isExpired = timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

    if (isExpired) {
        return (
            <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                Deal Ended
            </span>
        );
    }

    return (
        <motion.div
            animate={isUrgent ? { scale: [1, 1.05, 1], color: ["#DC2626", "#EF4444", "#DC2626"] } : {}}
            transition={isUrgent ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : {}}
            className={`flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded w-max ${isUrgent ? 'bg-red-50 text-red-600' : 'bg-brand-primary/10 text-brand-primary'
                }`}
        >
            <Clock className="w-3.5 h-3.5" />
            Ends in: {String(timeLeft.hours).padStart(2, "0")}h {String(timeLeft.minutes).padStart(2, "0")}m {String(timeLeft.seconds).padStart(2, "0")}s
        </motion.div>
    );
}
