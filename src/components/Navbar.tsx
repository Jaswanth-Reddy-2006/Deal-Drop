import Link from 'next/link';

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background-light/90 backdrop-blur-md px-6 md:px-10 py-4">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">

                {/* ── Logo ── */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-3xl font-bold text-primary">diamond</span>
                        <span className="text-xl font-extrabold tracking-tight text-primary font-display">DealDrop</span>
                    </Link>
                    <nav className="hidden lg:flex items-center gap-6">
                        <Link className="text-sm font-semibold text-primary/80 hover:text-primary transition-colors" href="/categories">Categories</Link>
                        <Link className="text-sm font-semibold text-primary/80 hover:text-primary transition-colors" href="/how-it-works">How it Works</Link>
                        <Link className="text-sm font-semibold text-primary/80 hover:text-primary transition-colors" href="/brands">Brands</Link>
                    </nav>
                </div>

                {/* ── Search ── */}
                <div className="flex flex-1 max-w-md items-center mx-4">
                    <div className="relative w-full">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary/40">search</span>
                        <input
                            className="w-full rounded-full border border-primary/20 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="Search premium drops..."
                            type="text"
                        />
                    </div>
                </div>

                {/* ── CTA Buttons ── */}
                <div className="flex items-center gap-3">
                    <Link href="/register?role=seller">
                        <button className="hidden md:flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-bold text-white shadow-lg hover:brightness-110 transition-all">
                            Become a Seller
                        </button>
                    </Link>
                    <Link href="/store">
                        <button className="flex items-center justify-center rounded-full bg-accent px-5 py-2 text-sm font-bold text-primary hover:brightness-110 transition-all">
                            Start Shopping
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
