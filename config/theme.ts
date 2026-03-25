// Use relative import for tailwind.config.ts compatibility (jiti doesn't resolve @/ for JSON)
import themeData from "../data/theme.json";

export const theme = {
  colors: {
    primary: themeData.colors.primary,
    primaryDark: themeData.colors.primaryDark,
    primaryLight: themeData.colors.primaryLight,
    accent: themeData.colors.accent,
    background: "#FAFAF9",
    backgroundAlt: "#F5F5F4",
    backgroundDark: "#1C1917",
    text: "#1C1917",
    textLight: "#57534E",
    textOnPrimary: "#ffffff",
    border: "#E7E5E4",
    success: "#22c55e",
    error: "#ef4444",
  },
  borderRadius: themeData.borderRadius,
};
