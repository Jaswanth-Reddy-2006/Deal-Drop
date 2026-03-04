"use client";

import { useState, useEffect } from "react";

const images = [
    { src: "/adult_3d_character.png", alt: "Man" },
    { src: "/woman_3d_hero.png", alt: "Woman" },
    { src: "/girl_3d_hero.png", alt: "Girl" },
    { src: "/youth_3d_character.png", alt: "Youth" },
    { src: "/boy_3d_hero.png", alt: "Boy" },
    { src: "/gadgets_3d_hero.png", alt: "Gadgets" },
];

export default function HeroAnimated() {
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % images.length);
                setVisible(true);
            }, 400);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative aspect-square w-full rounded-3xl bg-white/30 backdrop-blur-sm border border-white/50 shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"></div>
            <img
                src={images[index].src}
                alt={images[index].alt}
                className="h-full w-full object-contain p-6 mix-blend-multiply transition-opacity duration-500"
                style={{ opacity: visible ? 1 : 0 }}
            />
            {/* Dot Indicators */}
            <div className="absolute top-4 right-4 flex gap-1.5 z-10">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === index ? "bg-primary w-5" : "bg-white/60"}`}
                    />
                ))}
            </div>
        </div>
    );
}
