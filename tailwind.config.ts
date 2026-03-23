import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        ink: {
          DEFAULT: "#0F0E0D",
          soft: "#3D3A36",
          muted: "#7A7570",
        },
        paper: {
          DEFAULT: "#F7F5F2",
          warm: "#EFECE7",
          card: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#D4500A",
          light: "#F26E2A",
          dim: "#B8430A",
        },
        base: {
          blue: "#0052FF",
        },
      },
      boxShadow: {
        card: "0 1px 3px rgba(15,14,13,0.06), 0 4px 16px rgba(15,14,13,0.06)",
        "card-hover": "0 4px 8px rgba(15,14,13,0.08), 0 12px 32px rgba(15,14,13,0.10)",
        glow: "0 0 0 3px rgba(212,80,10,0.15)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        shimmer: "shimmer 1.8s infinite",
        pulse: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-700px 0" },
          "100%": { backgroundPosition: "700px 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
