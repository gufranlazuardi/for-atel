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
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      colors: {
        cream: {
          50:  "#fdf9f3",
          100: "#fdf6ee",
          200: "#f7ede0",
        },
        terracotta: {
          DEFAULT: "#c85a3a",
          dark:    "#a8432a",
          light:   "#e8a080",
          pale:    "#fff0eb",
          muted:   "#fff8f5",
        },
        brown: {
          DEFAULT: "#2d1b0e",
          mid:     "#5a3a2a",
          light:   "#a0856b",
          border:  "#e8d5c4",
        },
      },
      keyframes: {
        "float-up": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%":      { transform: "translateY(-14px) rotate(6deg)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(60px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-60px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.8)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        "petal-fall": {
          "0%":   { transform: "translateY(-10vh) rotate(0deg)", opacity: "0" },
          "10%":  { opacity: "1" },
          "100%": { transform: "translateY(110vh) rotate(360deg)", opacity: "0.6" },
        },
      },
      animation: {
        "float-up":       "float-up 3s ease-in-out infinite",
        "fade-up":        "fade-up 0.6s ease-out forwards",
        "slide-in-right": "slide-in-right 0.4s cubic-bezier(0.4,0,0.2,1) forwards",
        "slide-in-left":  "slide-in-left 0.4s cubic-bezier(0.4,0,0.2,1) forwards",
        "scale-in":       "scale-in 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
        "petal-fall":     "petal-fall 2.5s ease-in forwards",
      },
    },
  },
  plugins: [],
};

export default config;
