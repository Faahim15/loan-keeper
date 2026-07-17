import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";

/**
 * Usage:
 * const styles = useThemedStyles((colors) => ({
 *   container: { flex: 1, backgroundColor: colors.background },
 *   title: { color: colors.text },
 * }));
 */
export const useThemedStyles = (styleFn: any) => {
  const { colors, isDark } = useTheme();
  return useMemo(() => StyleSheet.create(styleFn(colors)), [colors, isDark]);
};
