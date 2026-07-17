import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";

type Style =
  | StyleProp<ViewStyle | TextStyle | ImageStyle>
  | false
  | null
  | undefined;

/** Merge multiple styles, filtering out falsy conditional values */
export const mergeStyles = (...styles: Style[]) =>
  StyleSheet.flatten(styles.filter(Boolean));

type SpacingKey =
  | "p"
  | "pt"
  | "pb"
  | "pl"
  | "pr"
  | "px"
  | "py"
  | "m"
  | "mt"
  | "mb"
  | "ml"
  | "mr"
  | "mx"
  | "my";

const SPACING_MAP: Record<SpacingKey, keyof ViewStyle | (keyof ViewStyle)[]> = {
  p: "padding",
  pt: "paddingTop",
  pb: "paddingBottom",
  pl: "paddingLeft",
  pr: "paddingRight",
  px: ["paddingLeft", "paddingRight"],
  py: ["paddingTop", "paddingBottom"],
  m: "margin",
  mt: "marginTop",
  mb: "marginBottom",
  ml: "marginLeft",
  mr: "marginRight",
  mx: ["marginLeft", "marginRight"],
  my: ["marginTop", "marginBottom"],
};

/** Tailwind-style spacing shorthand. spacing('mt', 8) -> { marginTop: 8 } */
export const spacing = (key: SpacingKey, value: number): ViewStyle => {
  const prop = SPACING_MAP[key];
  if (!prop) return {};
  if (Array.isArray(prop)) {
    return prop.reduce((acc, p) => ({ ...acc, [p]: value }), {} as ViewStyle);
  }
  return { [prop]: value } as ViewStyle;
};

/** Standard elevation/shadow, works on iOS + Android */
export const shadow = (elevation = 4): ViewStyle => ({
  shadowColor: "#000",
  shadowOffset: { width: 0, height: elevation / 2 },
  shadowOpacity: 0.08,
  shadowRadius: elevation,
  elevation,
});
