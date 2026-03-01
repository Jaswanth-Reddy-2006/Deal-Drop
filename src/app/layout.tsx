import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "600"] });
const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: ["600", "700", "800", "900"] });

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "DealDrop | Buy Smart. Sell Smarter.",
  description: "DealDrop — premium curated marketplace for tech, audio, fitness, and lifestyle products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-inter bg-brand-bg text-brand-textPrimary min-h-screen flex flex-col`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

