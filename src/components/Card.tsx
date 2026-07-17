import React, { ReactNode } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { shadow } from "../utils/styleHelpers";
import { moderateScale } from "../utils/responsive";

interface CardProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  padded?: boolean;
  elevation?: number;
}

/** Generic rounded surface card used across every screen */
export default function Card({
  children,
  style,
  padded = true,
  elevation = 3,
}: CardProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          padding: padded ? moderateScale(16) : 0,
        },
        shadow(elevation),
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
  },
});
