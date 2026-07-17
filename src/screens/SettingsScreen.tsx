import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import Avatar from "../components/Avatar";
import Card from "../components/Card";
import { useTheme } from "../theme/ThemeContext";
import { moderateScale } from "../utils/responsive";
import { getTypography } from "../utils/textStyles";

type FeatherIconName = keyof typeof Feather.glyphMap;

interface MenuItem {
  key: string;
  icon: FeatherIconName;
  label: string;
  hint?: string;
}

const MENU_ITEMS: MenuItem[] = [
  { key: "profile", icon: "user", label: "Profile Settings" },
  { key: "notifications", icon: "bell", label: "Notification Settings" },
];

const DATA_ITEMS: MenuItem[] = [
  { key: "backup", icon: "cloud", label: "Data Backup" },
  {
    key: "export",
    icon: "download",
    label: "Export Data",
    hint: "PDF, Excel, CSV",
  },
  { key: "language", icon: "globe", label: "Language", hint: "English" },
];

function MenuRow({
  icon,
  label,
  hint,
  onPress,
}: Omit<MenuItem, "key"> & { onPress: () => void }) {
  const { colors } = useTheme();
  const typography = getTypography(colors);
  return (
    <Pressable onPress={onPress} style={styles.menuRow}>
      <Feather name={icon} size={18} color={colors.textMuted} />
      <Text style={[typography.body, { flex: 1, marginLeft: 12 }]}>
        {label}
      </Text>
      {hint && (
        <Text style={[typography.caption, { marginRight: 6 }]}>{hint}</Text>
      )}
      <Feather name="chevron-right" size={18} color={colors.textMuted} />
    </Pressable>
  );
}

interface SettingsUser {
  name?: string;
  phone?: string;
  avatar?: string;
}

interface SettingsScreenProps {
  user?: SettingsUser;
  onLogout: () => void;
}

export default function SettingsScreen({
  user,
  onLogout,
}: SettingsScreenProps) {
  const { colors, isDark, toggleTheme } = useTheme();
  const typography = getTypography(colors);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={typography.h2}>Loan Keeper</Text>

        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          style={styles.profileCard}
        >
          <Avatar
            uri={user?.avatar}
            name={user?.name || "Marcus Sterling"}
            size={56}
          />
          <Text style={[typography.h3, { color: "#fff", marginTop: 10 }]}>
            {user?.name || "Marcus Sterling"}
          </Text>
          <Text style={[typography.caption, { color: "#DDEFE2" }]}>
            {user?.phone || "+1 (555) 012-3456"}
          </Text>
          <View style={styles.badge}>
            <Text style={[typography.captionBold, { color: "#fff" }]}>
              Premium Member
            </Text>
          </View>
        </LinearGradient>

        <Card padded={false} style={styles.menuCard}>
          {MENU_ITEMS.map(({ key, ...item }) => (
            <MenuRow key={key} {...item} onPress={() => {}} />
          ))}
          <View style={styles.menuRow}>
            <Feather name="moon" size={18} color={colors.textMuted} />
            <Text style={[typography.body, { flex: 1, marginLeft: 12 }]}>
              Dark Mode
            </Text>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ true: colors.primary, false: colors.border }}
            />
          </View>
        </Card>

        <Card padded={false} style={styles.menuCard}>
          {DATA_ITEMS.map(({ key, ...item }) => (
            <MenuRow key={key} {...item} onPress={() => {}} />
          ))}
        </Card>

        <Pressable
          onPress={onLogout}
          style={[styles.logoutRow, { backgroundColor: colors.error + "15" }]}
        >
          <Feather name="log-out" size={18} color={colors.error} />
          <Text
            style={[
              typography.bodyMedium,
              { color: colors.error, marginLeft: 8 },
            ]}
          >
            Logout
          </Text>
        </Pressable>

        <Card style={styles.helpCard}>
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: colors.primaryLight },
            ]}
          >
            <Feather name="headphones" size={18} color={colors.primary} />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={typography.bodyMedium}>Need help?</Text>
            <Text style={typography.caption}>
              Our support team is available 24/7 for premium members.
            </Text>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(20),
    paddingTop: moderateScale(50),
    paddingBottom: 120,
  },
  profileCard: {
    borderRadius: 20,
    padding: moderateScale(18),
    alignItems: "center",
    marginTop: 16,
    marginBottom: 20,
  },
  badge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 8,
  },
  menuCard: { marginBottom: 16, overflow: "hidden" },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  logoutRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    paddingVertical: 14,
    marginBottom: 16,
  },
  helpCard: { flexDirection: "row", alignItems: "center" },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
