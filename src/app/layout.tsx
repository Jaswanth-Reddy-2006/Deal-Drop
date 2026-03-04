import type { Metadata } from "next";
import { Playfair_Display, Ramaraja, Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

// ── DealDrop Brand Typography ──────────────────────────────────────────
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["700", "900"],
});
const ramaraja = Ramaraja({
  subsets: ["latin"],
  variable: "--font-ramaraja",
  weight: ["400"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "DealDrop — Buy Smart. Sell Smarter.",
  description: "The premium multi-vendor marketplace curated for high-end brands and discerning buyers worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${playfair.variable} ${ramaraja.variable} ${montserrat.variable} font-body bg-[#F5F5F5] text-slate-900 antialiased`}
      >
        <Providers>
          {/* 
            NOTE: Navbar and Footer are intentionally NOT here.
            - (customer) route group has its own layout with Navbar+Footer
            - (seller) route group has its own layout
            - Login/Register pages are standalone (no Navbar needed)
          */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
