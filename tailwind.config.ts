import type { Config } from "tailwindcss";
import { theme as siteTheme } from "./config/theme";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: siteTheme.colors.primary,
          dark: siteTheme.colors.primaryDark,
          light: siteTheme.colors.primaryLight,
        },
        accent: siteTheme.colors.accent,
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
