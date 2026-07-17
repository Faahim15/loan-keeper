import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { textStyle } from "../utils/textStyles";

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: number;
}

/** Circular avatar. Pass `uri` for a photo, otherwise falls back to initials from `name`. */
export default function Avatar({ uri, name = "", size = 44 }: AvatarProps) {
  const { colors } = useTheme();
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const dimensionStyle = { width: size, height: size, borderRadius: size / 2 };

  if (uri) {
    return <Image source={{ uri }} style={dimensionStyle} />;
  }

  return (
    <View
      style={[
        dimensionStyle,
        styles.fallback,
        { backgroundColor: colors.primaryLight },
      ]}
    >
      <Text
        style={textStyle({
          size: size * 0.36,
          weight: "semiBold",
          color: colors.primary,
        })}
      >
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: { alignItems: "center", justifyContent: "center" },
});
