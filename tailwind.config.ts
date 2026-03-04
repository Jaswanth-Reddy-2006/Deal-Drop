import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── New DealDrop Brand Colors ─────────────────────────
        "primary": "#24583C",   // Dark Green  — headers, primary buttons
        "secondary": "#B6B7F4",   // Lavender    — accents, seller card
        "accent": "#F5E74E",   // Yellow      — CTAs, highlights
        "background-light": "#F5F5F5",  // Off-white background
        "background-dark": "#0f1f16",  // Deep green dark mode
        "tertiary": "#B6B7F4",   // same as secondary for now
      },
      fontFamily: {
        "display": ["var(--font-playfair)", "Georgia", "serif"],
        "serif": ["var(--font-playfair)", "Georgia", "serif"],
        "subheading": ["var(--font-ramaraja)", "serif"],
        "body": ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
export default config;
