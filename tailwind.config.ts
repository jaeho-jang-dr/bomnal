import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // Home Theme
                "primary": "#507e95",
                "primary-dark": "#3a5d6e",
                "secondary": "#EBE7DF",
                "background-light": "#FBF8F5",
                "background-dark": "#21262c",
                "text-main": "#121517",
                "text-muted": "#657781",

                // Grid/Shop Theme (Prefixing to avoid conflict where necessary)
                "grid-primary": "#17cfcf",
                "grid-primary-dark": "#12a5a5",
                "grid-bg-light": "#f8f7f7",
                "background-paper": "#FFFCF9",
                "text-secondary": "#5C6F6F",
                "gold-foil": "#D4AF37",
                "pad-blue": "#e8f4fc",
            },
            fontFamily: {
                "display": ["var(--font-manrope)", "sans-serif"],
                "signature": ["cursive", "serif"], // Fallback for Home
                "handwriting": ["var(--font-gloria)", "cursive"], // For Grid
            },
            fontSize: {
                // Senior-Friendly Text Scale (Base 18px, Min 14px)
                "xs": ["14px", { lineHeight: "1.5" }],    // Replaces tiny text
                "sm": ["16px", { lineHeight: "1.5" }],
                "base": ["18px", { lineHeight: "1.6" }],  // New Base
                "lg": ["20px", { lineHeight: "1.6" }],
                "xl": ["24px", { lineHeight: "1.4" }],
                "2xl": ["30px", { lineHeight: "1.3" }],
                "3xl": ["36px", { lineHeight: "1.2" }],
                "4xl": ["48px", { lineHeight: "1.1" }],
                "5xl": ["60px", { lineHeight: "1" }],
            },
            borderRadius: {
                "lg": "0.5rem",
                "xl": "0.75rem",
                "2xl": "1rem",
                "3xl": "1.5rem",
            },
            boxShadow: {
                "soft": "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
            },
            backgroundImage: {
                'paper-texture': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNDQ0MiIG9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')",
                'grid-pattern': "linear-gradient(to right, rgba(23, 207, 207, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(23, 207, 207, 0.05) 1px, transparent 1px)",
            }
        },
    },
    plugins: [],
};

export default config;
