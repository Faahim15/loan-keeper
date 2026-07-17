import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AppButton, LabeledInput } from "../components/FormControls";
import { useTheme } from "../theme/ThemeContext";
import { moderateScale } from "../utils/responsive";
import { getTypography } from "../utils/textStyles";

interface LoginScreenProps {
  onContinue: () => void;
  onGoogleLogin: () => void;
  onCreateAccount: () => void;
}

export default function LoginScreen({
  onContinue,
  onGoogleLogin,
  onCreateAccount,
}: LoginScreenProps) {
  const { colors } = useTheme();
  const typography = getTypography(colors);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      <Text style={[typography.h3, { color: colors.primary }]}>
        🅻 Loan Keeper
      </Text>
      <Text style={[typography.h1, { marginTop: 20 }]}>Welcome Back</Text>
      <Text
        style={[typography.body, { color: colors.textMuted, marginBottom: 24 }]}
      >
        Access your dashboard to manage your loans.
      </Text>

      <LabeledInput
        label="Phone Number"
        icon="phone"
        placeholder="+1 (555) 000-0000"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <LabeledInput
        label="Password"
        icon="lock"
        placeholder="••••••••"
        secure={secure}
        onToggleSecure={() => setSecure((s) => !s)}
        value={password}
        onChangeText={setPassword}
        rightLabel="Forgot?"
        onRightPress={() => {}}
      />

      <AppButton
        title="Continue"
        icon="arrow-right"
        onPress={onContinue}
        style={{ marginTop: 8 }}
      />

      <View style={styles.dividerRow}>
        <View style={[styles.line, { backgroundColor: colors.border }]} />
        <Text style={[typography.caption, { marginHorizontal: 8 }]}>
          OR CONTINUE WITH
        </Text>
        <View style={[styles.line, { backgroundColor: colors.border }]} />
      </View>

      <AppButton
        title="Google Login"
        icon="chrome"
        variant="outline"
        onPress={onGoogleLogin}
      />

      <View style={styles.footerRow}>
        <Text style={typography.body}>New to Loan Keeper? </Text>
        <Pressable onPress={onCreateAccount}>
          <Text style={typography.link}>Create Account</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: moderateScale(20),
    paddingTop: moderateScale(60),
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: { flex: 1, height: 1 },
  footerRow: { flexDirection: "row", justifyContent: "center", marginTop: 24 },
});
