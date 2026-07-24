import { TextStyle } from "react-native";
import { FONT } from "../theme/colors";
import { ColorTokens, TextStyleOptions } from "../types/screens.types";
import { scaleFont } from "./responsive";

/**
 * Core text style generator.
 * Usage: textStyle({ size: 16, weight: 'bold', color: colors.text })
 *
 * Note: no explicit `fontWeight` here on purpose. Inter's weights (via
 * @expo-google-fonts/inter) are separate font families — Inter_400Regular,
 * Inter_600SemiBold, etc — not one family with a weight axis. Setting
 * fontWeight alongside fontFamily can make Android synthesize an extra
 * bold pass on top of an already-bold font file. fontFamily alone fully
 * determines the visual weight here.
 */
export const textStyle = ({
  size = 14,
  weight = "regular",
  color = "#000000",
  lineHeight,
  letterSpacing,
  align = "left",
}: TextStyleOptions = {}): TextStyle => ({
  fontSize: scaleFont(size),
  fontFamily: FONT[weight] || FONT.regular,
  color,
  lineHeight: lineHeight ? scaleFont(lineHeight) : undefined,
  letterSpacing,
  textAlign: align,
});

export interface Typography {
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  body: TextStyle;
  bodyMedium: TextStyle;
  caption: TextStyle;
  captionBold: TextStyle;
  label: TextStyle;
  button: TextStyle;
  link: TextStyle;
  error: TextStyle;
}

/**
 * Full typography scale, generated from the active theme's colors.
 * Usage: const typography = getTypography(colors);
 */
export const getTypography = (colors: ColorTokens): Typography => ({
  h1: textStyle({
    size: 28,
    weight: "bold",
    lineHeight: 34,
    color: colors.text,
  }),
  h2: textStyle({
    size: 22,
    weight: "bold",
    lineHeight: 28,
    color: colors.text,
  }),
  h3: textStyle({
    size: 18,
    weight: "semiBold",
    lineHeight: 24,
    color: colors.text,
  }),
  body: textStyle({
    size: 15,
    weight: "regular",
    lineHeight: 22,
    color: colors.text,
  }),
  bodyMedium: textStyle({
    size: 15,
    weight: "medium",
    lineHeight: 22,
    color: colors.text,
  }),
  caption: textStyle({ size: 12, weight: "regular", color: colors.textMuted }),
  captionBold: textStyle({
    size: 12,
    weight: "semiBold",
    color: colors.textMuted,
  }),
  label: textStyle({
    size: 11,
    weight: "semiBold",
    color: colors.textMuted,
    letterSpacing: 0.5,
  }),
  button: textStyle({
    size: 16,
    weight: "semiBold",
    color: colors.textInverted,
  }),
  link: textStyle({ size: 14, weight: "semiBold", color: colors.primary }),
  error: textStyle({ size: 12, weight: "regular", color: colors.error }),
});
