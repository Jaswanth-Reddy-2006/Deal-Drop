"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Globe, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-24 pb-20 overflow-hidden bg-brand-bg">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-primary/5 blur-[120px] rounded-full" />
                <div className="container-main relative">
                    <div className="max-w-3xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                            className="text-sm font-bold text-brand-primary uppercase tracking-[0.2em] mb-4 block"
                        >
                            The NovaCart Vision
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-extrabold font-poppins text-brand-textPrimary mb-8 leading-tight"
                        >
                            Curating the <span className="gradient-text">Future</span> of Lifestyle.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="text-xl text-brand-textSecondary leading-relaxed max-w-2xl"
                        >
                            NovaCart isn&apos;t just a marketplace. We&apos;re a technology-first commerce ecosystem dedicated to bringing world-class hardware and lifestyle drops to the most demanding users.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Core Pillars */}
            <section className="container-main py-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        {
                            title: "Vetted Excellence",
                            icon: <ShieldCheck className="w-10 h-10" />,
                            desc: "Every single SKU on our platform underwent a rigorous 20-point quality check by our internal engineering team. If we wouldn't use it, we don't sell it."
                        },
                        {
                            title: "Direct Logistics",
                            icon: <Zap className="w-10 h-10" />,
                            desc: "By cutting out traditional distributors, we maintain absolute control over our supply chain. This means faster delivery and lower prices for you."
                        },
                        {
                            title: "Modern Tech",
                            icon: <Globe className="w-10 h-10" />,
                            desc: "Our platform is built on a high-availability serverless architecture to ensure your checkout process is seamless, even during high-traffic drops."
                        }
                    ].map((pillar, i) => (
                        <motion.div
                            key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className="space-y-6"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-brand-primary text-white flex items-center justify-center shadow-lg shadow-brand-primary/20">
                                {pillar.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-brand-textPrimary font-poppins">{pillar.title}</h3>
                            <p className="text-brand-textSecondary text-lg leading-relaxed">{pillar.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Mission Section */}
            <section className="bg-brand-textPrimary text-white py-32 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 blur-[120px] rounded-full" />
                <div className="container-main relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-extrabold font-poppins mb-10 leading-tight">
                            Build to Scale.<br />
                            Designed to Last.
                        </h2>
                        <div className="space-y-8">
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <Users className="w-6 h-6 text-brand-primary" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Community Driven</h4>
                                    <p className="text-gray-400">Our product roadmap is dictated by our community of 50,000+ early adopters and tech enthusiasts.</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <ArrowRight className="w-6 h-6 text-brand-primary" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Sustainable Growth</h4>
                                    <p className="text-gray-400">We prioritize long-term brand equity over short-term sales. This is why our return rate is 65% lower than industry average.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="card-premium bg-white/5 backdrop-blur-xl border-white/10 p-10 rotate-2">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-14 h-14 rounded-full bg-brand-primary/20" />
                                <div>
                                    <div className="h-4 w-32 bg-white/20 rounded-full mb-2" />
                                    <div className="h-3 w-20 bg-white/10 rounded-full" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-4 w-full bg-white/10 rounded-full" />
                                <div className="h-4 w-full bg-white/10 rounded-full" />
                                <div className="h-4 w-3/4 bg-white/10 rounded-full" />
                            </div>
                            <div className="mt-10 h-12 w-full bg-brand-primary rounded-xl" />
                        </div>
                        <div className="absolute -top-10 -left-10 w-full h-full border-2 border-brand-primary/20 rounded-[40px] -rotate-2 -z-10" />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="container-main py-32 text-center">
                <h2 className="text-3xl md:text-5xl font-extrabold text-brand-textPrimary font-poppins mb-10">Ready to join the movement?</h2>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link href="/products" className="btn-primary px-12">Browse Products</Link>
                    <Link href="/contact" className="btn-secondary px-12">Get in Touch</Link>
                </div>
            </section>
        </div>
    );
}
