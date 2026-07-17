import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { moderateScale } from "../utils/responsive";
import { getTypography } from "../utils/textStyles";

type FeatherIconName = keyof typeof Feather.glyphMap;

// Maps each (tabs)/*.tsx route file name to its icon
const ICONS: Record<string, FeatherIconName> = {
  index: "grid",
  borrowers: "users",
  chat: "message-circle",
  reports: "bar-chart-2",
  settings: "settings",
};

/**
 * Local shape of the props Expo Router's <Tabs tabBar={...}> passes in.
 * `navigation` is typed as `any` on purpose: React Navigation's real
 * emit()/EventArg types are class-based with getters, which never
 * structurally match a plain object shape no matter how it's written.
 * We only call emit() once with a fixed payload, so strict typing here
 * buys nothing — `any` avoids fighting a type we don't control without
 * needing @react-navigation/bottom-tabs installed just for its types.
 */
interface TabRoute {
  key: string;
  name: string;
  params?: object;
}

interface GlassTabBarProps {
  state: {
    index: number;
    routes: TabRoute[];
  };
  descriptors: Record<string, { options: { title?: string } }>;
  navigation: any;
}

/**
 * Frosted-glass bottom tab bar, wired directly into Expo Router's <Tabs>.
 * Usage: <Tabs tabBar={(props) => <GlassTabBar {...props} />}>
 */
export default function GlassTabBar({
  state,
  descriptors,
  navigation,
}: GlassTabBarProps) {
  const { colors, isDark } = useTheme();
  const typography = getTypography(colors);

  return (
    <View style={styles.wrapper}>
      <BlurView
        intensity={40}
        tint={isDark ? "dark" : "light"}
        style={[
          styles.bar,
          { borderColor: colors.glassBorder, backgroundColor: colors.glassBg },
        ]}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title ?? route.name;
          const isActive = state.index === index;
          const icon = ICONS[route.name] || "circle";

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isActive && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={[
                styles.tab,
                isActive && { backgroundColor: colors.primary },
              ]}
              hitSlop={8}
            >
              <Feather
                name={icon}
                size={moderateScale(18)}
                color={isActive ? colors.textInverted : colors.textMuted}
              />
              {isActive && (
                <Text
                  style={[
                    typography.caption,
                    styles.label,
                    { color: colors.textInverted },
                  ]}
                >
                  {label}
                </Text>
              )}
            </Pressable>
          );
        })}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: Platform.OS === "ios" ? 24 : 16,
  },
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 28,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    overflow: "hidden",
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  label: { marginLeft: 4 },
});
