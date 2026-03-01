"use client";

import Link from "next/link";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { ShoppingCart, UserRound, Search, Heart, X, Menu, Github, Twitter, Instagram, ChevronRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";
import SearchModal from "./SearchModal";

export default function Navbar() {
    const cartItems = useCartStore((state) => state.items);
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const [mounted, setMounted] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const cartControls = useAnimation();

    useEffect(() => {
        setMounted(true);

        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsSearchModalOpen(true);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        const handleScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Lock scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMobileMenuOpen]);

    // Bounce animation when totalItems changes
    useEffect(() => {
        if (mounted && totalItems > 0) {
            cartControls.start({
                y: [0, -8, 0],
                transition: { duration: 0.4, ease: "easeOut" }
            });
        }
    }, [totalItems, mounted, cartControls]);

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transition: { duration: 0.4, ease: "easeOut" as any }
        }
    };

    return (
        <motion.header
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
                    ? "bg-white/90 backdrop-blur-xl border-b border-brand-border shadow-sm shadow-black/5"
                    : "bg-white/70 backdrop-blur-md border-b border-brand-border"
                }`}
        >
            <div className="container-main h-[72px] flex items-center justify-between gap-4 md:gap-6">
                {/* MOBILE MENU TRIGGER */}
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 md:hidden text-brand-textPrimary hover:text-brand-primary transition-colors"
                >
                    <Menu className="w-7 h-7" />
                </button>

                {/* LOGO */}
                <Link href="/" className="group flex items-center gap-2 shrink-0">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="gradient-blue w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20"
                    >
                        <span className="text-white font-poppins font-bold text-xl leading-none">D</span>
                    </motion.div>
                    <span className="font-poppins font-bold text-2xl text-brand-textPrimary group-hover:text-brand-primary transition-all hidden sm:block">
                        DealDrop
                    </span>
                </Link>

                {/* SEARCH BAR TRIGGER */}
                <div className="flex-1 max-w-xl hidden md:block">
                    <button
                        onClick={() => setIsSearchModalOpen(true)}
                        className="w-full flex items-center justify-between bg-gray-100 hover:bg-gray-200 focus:bg-white border-2 border-transparent hover:border-brand-primary/20 rounded-full py-2.5 px-5 transition-all text-brand-textSecondary group"
                    >
                        <div className="flex items-center gap-3">
                            <Search className="w-4 h-4 text-brand-textSecondary group-hover:text-brand-primary transition-colors" />
                            <span className="text-sm font-medium">Search for premium drops...</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-white border border-brand-border rounded-lg text-[10px] font-bold shadow-sm">
                            <span className="opacity-50">CMD</span>
                            <span>K</span>
                        </div>
                    </button>
                </div>

                {/* LINKS */}
                <nav className="hidden md:flex items-center gap-6">
                    {["Products", "Categories", "Deals", "About"].map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className="text-[14px] font-semibold text-brand-textSecondary hover:text-brand-primary transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                {/* ACTIONS */}
                <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                    <button
                        onClick={() => setIsSearchModalOpen(true)}
                        className="md:hidden p-2 text-brand-textPrimary hover:text-brand-primary"
                    >
                        <Search className="w-6 h-6" />
                    </button>

                    <Link href="/wishlist" className="hidden sm:block">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2">
                            <Heart className="w-6 h-6 text-brand-textPrimary hover:text-brand-danger transition-colors" />
                        </motion.div>
                    </Link>

                    <Link href="/cart" className="relative group p-2">
                        <motion.div
                            animate={cartControls}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ShoppingCart className="w-6 h-6 text-brand-textPrimary group-hover:text-brand-primary transition-colors" />
                            {mounted && totalItems > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-0 right-0 w-4 h-4 bg-brand-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm"
                                >
                                    {totalItems}
                                </motion.span>
                            )}
                        </motion.div>
                    </Link>
                    <Link href="/profile">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2">
                            <UserRound className="w-6 h-6 text-brand-textPrimary hover:text-brand-primary transition-colors" />
                        </motion.div>
                    </Link>
                </div>
            </div>

            {/* MOBILE MENU DRAWER */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-brand-textPrimary/40 backdrop-blur-md z-[100] md:hidden"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white z-[101] md:hidden flex flex-col shadow-2xl"
                        >
                            <div className="p-8 border-b border-brand-border flex items-center justify-between">
                                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                                    <div className="gradient-blue w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold font-poppins">D</div>
                                    <span className="font-poppins font-bold text-xl text-brand-textPrimary">DealDrop</span>
                                </Link>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-brand-bg rounded-xl">
                                    <X className="w-6 h-6 text-brand-textSecondary" />
                                </button>
                            </div>

                            <nav className="flex-1 p-8 overflow-y-auto space-y-2">
                                {["Products", "Categories", "Deals", "About", "Wishlist", "Profile"].map((item) => (
                                    <Link
                                        key={item}
                                        href={`/${item.toLowerCase()}`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center justify-between p-4 rounded-2xl hover:bg-brand-bg text-brand-textPrimary font-bold text-lg group transition-all"
                                    >
                                        {item}
                                        <ChevronRight className="w-5 h-5 text-brand-border group-hover:text-brand-primary transition-all" />
                                    </Link>
                                ))}
                                <div className="pt-8 border-t border-brand-border mt-8">
                                    <p className="text-[10px] font-bold text-brand-textSecondary uppercase tracking-widest mb-4">Support & Connect</p>
                                    <div className="flex gap-4">
                                        {[Github, Twitter, Instagram].map((Icon, i) => (
                                            <button key={i} className="w-10 h-10 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center text-brand-textSecondary hover:text-brand-primary transition-all">
                                                <Icon className="w-5 h-5" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </nav>

                            <div className="p-8 border-t border-brand-border bg-gray-50/50">
                                <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary w-full py-4 rounded-2xl flex items-center justify-center gap-3">
                                    <ShoppingCart className="w-5 h-5" />
                                    My Cart ({totalItems})
                                </Link>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* SEARCH MODAL */}
            <SearchModal
                isOpen={isSearchModalOpen}
                onClose={() => setIsSearchModalOpen(false)}
            />
        </motion.header>
    );
}
