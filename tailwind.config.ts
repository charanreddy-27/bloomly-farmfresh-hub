import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2.5rem" },
      screens: { xl: "1200px" },
    },
    screens: {
      // Mobile-first breakpoints
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      colors: {
        // Bloomly's own palette, built from the logo: wordmark green #0F4C32 and leaf green #7FC141
        forest: {
          DEFAULT: "#0F4C32",
          950: "#062418",
          900: "#0A3524",
          800: "#0F4C32",
          700: "#14603F",
          600: "#1B7A50",
          200: "#BFD9CA",
          100: "#DCEBE2",
          50: "#F1F7F3",
        },
        leaf: {
          DEFAULT: "#7FC141",
          700: "#467F1F", // leaf green dark enough for small text on white
          300: "#A9DA7A", // highlight on dark green
          100: "#E6F3D6",
          50: "#F3F9EC",
        },
        surface: "#F5F8F5", // alternate section background
        line: "#E2E9E4",
        ink: { DEFAULT: "#0F1F17", soft: "#465349", muted: "#6F7C74" },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
          light: "hsl(var(--primary-light))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          light: "hsl(var(--secondary-light))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          hover: "hsl(var(--accent-hover))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        subtle: "hsl(var(--subtle))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        destructive: "hsl(var(--destructive))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        marquee: "marquee 42s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      // Add responsive spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      // Add responsive font sizes
      fontSize: {
        'xxs': ['0.625rem', { lineHeight: '0.75rem' }],
        '2.5xl': ['1.75rem', { lineHeight: '2rem' }],
        '3.5xl': ['2rem', { lineHeight: '2.25rem' }],
        '4.5xl': ['2.5rem', { lineHeight: '2.75rem' }],
        '5.5xl': ['3.5rem', { lineHeight: '3.75rem' }],
        '6.5xl': ['4rem', { lineHeight: '4.25rem' }],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
