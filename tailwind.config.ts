import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#2563EB",
          bg: "#F8FAFC",
          textPrimary: "#0F172A",
          textSecondary: "#475569",
          border: "#E2E8F0",
          success: "#16A34A",
          danger: "#DC2626",
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        inter: ["var(--font-inter)"],
      },
      spacing: {
        section: "80px",
        gridGap: "24px",
      },
      borderRadius: {
        default: "12px",
      },
      maxWidth: {
        container: "1200px",
      },
      boxShadow: {
        premium: "0 20px 50px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
export default config;
