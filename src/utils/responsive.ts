import { Dimensions, PixelRatio, Platform } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

export const scaleWidth = (size: number): number =>
  (SCREEN_WIDTH / BASE_WIDTH) * size;
export const scaleHeight = (size: number): number =>
  (SCREEN_HEIGHT / BASE_HEIGHT) * size;

/** Scales a size but dampens the effect via `factor`, avoiding extremes on big/small screens */
export const moderateScale = (size: number, factor = 0.5): number =>
  size + (scaleWidth(size) - size) * factor;

/** Font scaling capped via moderateScale so accessibility settings don't break layout */
export const scaleFont = (size: number): number => {
  const newSize = moderateScale(size, 0.3);
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const widthPercentage = (percentage: number): number =>
  (SCREEN_WIDTH * percentage) / 100;
export const heightPercentage = (percentage: number): number =>
  (SCREEN_HEIGHT * percentage) / 100;

export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";

export { SCREEN_HEIGHT, SCREEN_WIDTH };
