import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { getTypography } from "../utils/textStyles";

interface SegmentedPillsProps {
  options: string[];
  active: string;
  onChange: (value: string) => void;
}

/** Row of selectable pills, e.g. filter tabs like All / Active / Completed */
export default function SegmentedPills({
  options,
  active,
  onChange,
}: SegmentedPillsProps) {
  const { colors } = useTheme();
  const typography = getTypography(colors);

  return (
    <View style={styles.row}>
      {options.map((opt) => {
        const isActive = opt === active;
        return (
          <Pressable
            key={opt}
            onPress={() => onChange(opt)}
            style={[
              styles.pill,
              {
                backgroundColor: isActive
                  ? colors.primary
                  : colors.surfaceMuted,
              },
            ]}
          >
            <Text
              style={[
                typography.captionBold,
                { color: isActive ? colors.textInverted : colors.textMuted },
              ]}
            >
              {opt}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 8, marginVertical: 12 },
  pill: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
});
