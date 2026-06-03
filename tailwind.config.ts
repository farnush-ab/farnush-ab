import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bone: "#ECE6D3",
        sand: "#C0BFB2",
        ink: "#2A2620",
        ash: "#5C5849",
        gold: "#8C846C",
        terracotta: "#BC846C",
        patina: "#3D4A40",
        hairline: "rgba(42, 38, 32, 0.12)",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: [
          "var(--font-vazirmatn)",
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        eyebrow: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.32em" }],
        caption: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.08em" }],
        "display-sm": ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1.04", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(3.5rem, 7vw, 6.5rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(4.5rem, 11vw, 11rem)", { lineHeight: "0.92", letterSpacing: "-0.025em" }],
        "display-xl": ["clamp(6rem, 16vw, 18rem)", { lineHeight: "0.86", letterSpacing: "-0.03em" }],
      },
      spacing: {
        gutter: "clamp(1.5rem, 4vw, 4rem)",
        section: "clamp(6rem, 14vh, 12rem)",
      },
      maxWidth: {
        editorial: "92rem",
        column: "44rem",
      },
      transitionTimingFunction: {
        weighted: "cubic-bezier(0.22, 1, 0.36, 1)",
        glide: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      transitionDuration: {
        400: "400ms",
        700: "700ms",
        1200: "1200ms",
      },
      animation: {
        "pin-pulse": "pinPulse 2.4s cubic-bezier(0.22, 1, 0.36, 1) infinite",
        "slow-drift": "slowDrift 18s ease-in-out infinite",
      },
      keyframes: {
        pinPulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.45" },
          "50%": { transform: "scale(2.4)", opacity: "0" },
        },
        slowDrift: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(-1.5%, 1%, 0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
