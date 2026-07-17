import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { heightPercentage, moderateScale } from "../utils/responsive";
import { getTypography } from "../utils/textStyles";

export default function OnboardingScreen() {
  const { colors } = useTheme();
  const typography = getTypography(colors);

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundGradientEnd]}
      style={styles.container}
    >
      <View style={[styles.logoBox, { backgroundColor: colors.primary }]}>
        <Text style={styles.logoGlyph}>🅻</Text>
      </View>

      <Text
        style={[
          typography.h3,
          { color: colors.primary, marginTop: moderateScale(24) },
        ]}
      >
        Loan Keeper
      </Text>
      <Text style={[typography.body, styles.tagline]}>
        Track every repayment effortlessly.
      </Text>

      <View style={[styles.divider, { backgroundColor: colors.primary }]} />

      <Text style={[typography.label, { marginTop: moderateScale(12) }]}>
        SECURE &amp; PROFESSIONAL
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: heightPercentage(6),
  },
  logoBox: {
    width: 64,
    height: 64,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  logoGlyph: { fontSize: 28, color: "#fff" },
  tagline: { marginTop: 4, textAlign: "center" },
  divider: { width: 48, height: 2, borderRadius: 1, marginTop: 16 },
});
