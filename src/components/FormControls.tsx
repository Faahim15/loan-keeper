import React from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { getTypography, textStyle } from "../utils/textStyles";
import { moderateScale } from "../utils/responsive";

type FeatherIconName = keyof typeof Feather.glyphMap;

interface LabeledInputProps extends TextInputProps {
  label: string;
  icon?: FeatherIconName;
  secure?: boolean;
  onToggleSecure?: () => void;
  rightLabel?: string;
  onRightPress?: () => void;
}

/** Labeled input with optional left/right icon. Pass `secure` + `onToggleSecure` for passwords. */
export function LabeledInput({
  label,
  icon,
  secure,
  onToggleSecure,
  rightLabel,
  onRightPress,
  ...inputProps
}: LabeledInputProps) {
  const { colors } = useTheme();
  const typography = getTypography(colors);

  return (
    <View style={styles.field}>
      <View style={styles.labelRow}>
        <Text style={typography.captionBold}>{label}</Text>
        {rightLabel && (
          <Pressable onPress={onRightPress} hitSlop={8}>
            <Text style={typography.link}>{rightLabel}</Text>
          </Pressable>
        )}
      </View>
      <View
        style={[
          styles.inputWrap,
          { backgroundColor: colors.surfaceMuted, borderColor: colors.border },
        ]}
      >
        {icon && (
          <Feather
            name={icon}
            size={moderateScale(16)}
            color={colors.textMuted}
          />
        )}
        <TextInput
          style={[textStyle({ size: 15, color: colors.text }), styles.input]}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={secure}
          {...inputProps}
        />
        {onToggleSecure && (
          <Pressable onPress={onToggleSecure} hitSlop={8}>
            <Feather
              name={secure ? "eye" : "eye-off"}
              size={moderateScale(16)}
              color={colors.textMuted}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

interface AppButtonProps {
  title: string;
  onPress?: () => void;
  icon?: FeatherIconName;
  variant?: "primary" | "outline";
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** Primary filled button. Set `variant="outline"` for secondary actions. */
export function AppButton({
  title,
  onPress,
  icon,
  variant = "primary",
  loading,
  style,
}: AppButtonProps) {
  const { colors } = useTheme();
  const typography = getTypography(colors);
  const isOutline = variant === "outline";

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={[
        styles.button,
        isOutline
          ? {
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.border,
            }
          : { backgroundColor: colors.primary },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={isOutline ? colors.primary : colors.textInverted}
        />
      ) : (
        <>
          <Text
            style={
              isOutline
                ? [typography.button, { color: colors.text }]
                : typography.button
            }
          >
            {title}
          </Text>
          {icon && (
            <Feather
              name={icon}
              size={moderateScale(18)}
              color={isOutline ? colors.text : colors.textInverted}
              style={{ marginLeft: 8 }}
            />
          )}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  field: { marginBottom: 16 },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
    gap: 10,
  },
  input: { flex: 1, height: "100%" },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    borderRadius: 14,
  },
});
