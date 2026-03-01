import Link from "next/link";


import { Github, Twitter, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-brand-border pt-16 mt-auto">
            <div className="container-main grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16">
                <div className="lg:col-span-2">
                    <Link href="/" className="group flex items-center gap-2 mb-4">
                        <div className="gradient-blue w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
                            <span className="text-white font-poppins font-bold text-xl leading-none">N</span>
                        </div>
                        <span className="font-poppins font-bold text-2xl text-brand-textPrimary group-hover:text-brand-primary transition-colors">
                            NovaCart
                        </span>
                    </Link>
                    <p className="text-brand-textSecondary text-base max-w-sm mb-8 leading-relaxed">
                        Shop smarter with NovaCart. We bring you the world&apos;s most curated products with lightning fast delivery and premium service.
                    </p>
                    <div className="flex gap-4">
                        {[
                            { icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
                            { icon: <Instagram className="w-5 h-5" />, label: "Instagram" },
                            { icon: <Github className="w-5 h-5" />, label: "GitHub" },
                        ].map((social) => (
                            <a key={social.label} href="#" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-brand-textSecondary hover:text-brand-primary hover:bg-brand-primary/10 transition-all border border-transparent hover:border-brand-primary/20 shadow-sm">
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-brand-textPrimary text-base mb-4 uppercase tracking-wider">Shop</h3>
                    <ul className="space-y-3">
                        {["All Products", "Featured Deals", "New Arrivals", "Gift Cards"].map((link) => (
                            <li key={link}>
                                <Link href="/products" className="text-brand-textSecondary hover:text-brand-primary transition-colors text-sm">
                                    {link}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-brand-textPrimary text-base mb-4 uppercase tracking-wider">Company</h3>
                    <ul className="space-y-3">
                        {["About Us", "Careers", "Press", "Contact"].map((link) => (
                            <li key={link}>
                                <Link href="/about" className="text-brand-textSecondary hover:text-brand-primary transition-colors text-sm">
                                    {link}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-brand-textPrimary text-base mb-4 uppercase tracking-wider">Support</h3>
                    <ul className="space-y-3">
                        {["Help Center", "Shipping & Returns", "Warranty", "Track Order"].map((link) => (
                            <li key={link}>
                                <Link href="#" className="text-brand-textSecondary hover:text-brand-primary transition-colors text-sm">
                                    {link}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="border-t border-brand-border py-8">
                <div className="container-main flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-brand-textSecondary font-medium">
                        &copy; {new Date().getFullYear()} NovaCart Engine. Built for the modern marketplace.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="#" className="text-xs text-brand-textSecondary hover:text-brand-primary transition-colors font-medium">Privacy Policy</Link>
                        <Link href="#" className="text-xs text-brand-textSecondary hover:text-brand-primary transition-colors font-medium">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
