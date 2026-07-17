import { ColorTokens } from "../types/screens.types";

export const lightColors: ColorTokens = {
  primary: "#1F8A4C",
  primaryDark: "#146C38",
  primaryLight: "#E7F6EC",

  background: "#F4FBF6",
  backgroundGradientEnd: "#FFFFFF",
  surface: "#FFFFFF",
  surfaceMuted: "#F1F5F3",

  text: "#111827",
  textMuted: "#6B7280",
  textInverted: "#FFFFFF",

  border: "#E5E7EB",
  divider: "#ECEFEC",

  error: "#DC2626",
  warning: "#F59E0B",
  success: "#1F8A4C",
  overdue: "#DC2626",

  bubbleMine: "#1F8A4C",
  bubbleTheirs: "#FFFFFF",

  glassBg: "rgba(255,255,255,0.6)",
  glassBorder: "rgba(255,255,255,0.4)",
};

export const darkColors: ColorTokens = {
  primary: "#34C759",
  primaryDark: "#1F8A4C",
  primaryLight: "#153826",

  background: "#0F1512",
  backgroundGradientEnd: "#121815",
  surface: "#1A211D",
  surfaceMuted: "#222A25",

  text: "#F3F4F6",
  textMuted: "#9CA3AF",
  textInverted: "#0F1512",

  border: "#2A322D",
  divider: "#232B26",

  error: "#F87171",
  warning: "#FBBF24",
  success: "#34C759",
  overdue: "#F87171",

  bubbleMine: "#1F8A4C",
  bubbleTheirs: "#1A211D",

  glassBg: "rgba(26,33,29,0.6)",
  glassBorder: "rgba(255,255,255,0.08)",
};

export const FONT: Record<"regular" | "medium" | "semiBold" | "bold", string> =
  {
    regular: "System",
    medium: "System",
    semiBold: "System",
    bold: "System",
  };
