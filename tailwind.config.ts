import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2rem", lg: "3rem" },
      screens: { "2xl": "1320px" },
    },
    extend: {
      fontFamily: {
        display: ['"Instrument Serif"', "Georgia", "serif"],
        sans: ["Geist", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      colors: {
        // Bloomly brand — sampled from the logo (#0F4C32 forest, #7FC141 leaf)
        forest: {
          DEFAULT: "#0F4C32",
          50: "#EEF5F0",
          100: "#D5E7DB",
          200: "#A9CDB6",
          300: "#76AE8C",
          400: "#468C65",
          500: "#1F6B47",
          600: "#0F4C32",
          700: "#0B3B27",
          800: "#07261A",
          900: "#041A11",
        },
        // Calmer take on the logo's #7FC141 — same hue, less saturation, so fills don't glare
        leaf: {
          DEFAULT: "#8BB55E",
          50: "#F4F8EE",
          100: "#E5EED8",
          200: "#CBDDB3",
          300: "#AECB8A",
          400: "#8BB55E",
          500: "#6F9947",
          600: "#557A34",
        },
        citrus: {
          DEFAULT: "#F4A024",
          100: "#FDEBCB",
          300: "#F8C167",
          400: "#F4A024",
          500: "#E0850C",
        },
        berry: "#D2453D",
        cream: {
          DEFAULT: "#F6F3EA",
          50: "#FCFBF7",
          100: "#F6F3EA",
          200: "#ECE6D6",
          300: "#DDD4BC",
        },
        ink: {
          DEFAULT: "#0E1F17",
          soft: "#3D4E45",
          muted: "#6B7A71",
        },

        // shadcn tokens (used by components/ui/*)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        premium: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(var(--r, 0deg))" },
          "50%": { transform: "translateY(-14px) rotate(calc(var(--r, 0deg) + 6deg))" },
        },
        "ping-soft": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
        "marquee-reverse": "marquee-reverse var(--marquee-duration, 40s) linear infinite",
        float: "float var(--float-duration, 7s) ease-in-out infinite",
        "ping-soft": "ping-soft 2.4s cubic-bezier(0, 0, 0.2, 1) infinite",
        "spin-slow": "spin-slow 24s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
