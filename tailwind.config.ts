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
        manga: {
          black: "#050505",
          dark: "#121212",
          gray: "#262626",
          silver: "#8E8E93",
          light: "#E5E5EA",
          white: "#FFFFFF",
          neonPink: "#FF0055",
          neonCyan: "#00E5FF",
          neonYellow: "#FFE600",
          bloodRed: "#DC2626",
        },
      },
      fontFamily: {
        comic: ["'Bangers'", "'Impact'", "'Arial Black'", "sans-serif"],
        mangaTitle: ["'Cinzel'", "'Montserrat'", "'Impact'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        "comic-sm": "3px 3px 0px 0px #000000",
        "comic": "6px 6px 0px 0px #000000",
        "comic-lg": "10px 10px 0px 0px #000000",
        "comic-neon-pink": "5px 5px 0px 0px #FF0055",
        "comic-neon-cyan": "5px 5px 0px 0px #00E5FF",
        "comic-neon-yellow": "5px 5px 0px 0px #FFE600",
      },
      keyframes: {
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 10px #00E5FF)" },
          "50%": { opacity: "0.6", filter: "drop-shadow(0 0 2px #00E5FF)" },
        },
        equalizer: {
          "0%, 100%": { height: "4px" },
          "50%": { height: "18px" },
        }
      },
      animation: {
        glitch: "glitch 0.4s ease-in-out infinite alternate",
        pulseGlow: "pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        equalizer1: "equalizer 0.8s ease-in-out infinite",
        equalizer2: "equalizer 0.6s ease-in-out infinite 0.2s",
        equalizer3: "equalizer 1s ease-in-out infinite 0.4s",
      },
    },
  },
  plugins: [],
};

export default config;
