import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        max: {
          base: "#FFB51D",
          black: "#131222",
          gray: "#868689",
          extra: "#E3E3E3",
          border: "#D9D9D9",
        },
      },
      fontFamily: {
        sans: ['"SF Pro Text"', "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        display: ["var(--font-poppins-old)", '"Poppins Old"', "Poppins", "sans-serif"],
        subheading: ['"SF Pro Text"', "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      borderRadius: {
        max: "20px",
      },
      maxWidth: {
        container: "1320px",
      },
      boxShadow: {
        card: "0px 10px 60px 0px rgba(0, 0, 0, 0.07)",
        nav: "0px 10px 30px 0px rgba(0, 0, 0, 0.05)",
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
