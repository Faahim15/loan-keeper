import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";

interface ProgressBarProps {
  percent: number;
  color?: string;
  height?: number;
}

/** Horizontal progress bar. `percent` 0-100. `color` overrides default (e.g. red for overdue) */
export default function ProgressBar({
  percent = 0,
  color,
  height = 6,
}: ProgressBarProps) {
  const { colors } = useTheme();
  const clamped = Math.max(0, Math.min(100, percent));

  return (
    <View
      style={[
        styles.track,
        { backgroundColor: colors.primaryLight, height, borderRadius: height },
      ]}
    >
      <View
        style={[
          styles.fill,
          {
            width: `${clamped}%`,
            backgroundColor: color || colors.primary,
            height,
            borderRadius: height,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { width: "100%", overflow: "hidden" },
  fill: {},
});
