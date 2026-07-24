import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  LayoutChangeEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { moderateScale, scaleHeight, scaleWidth } from "../utils/responsive";
import { getTypography } from "../utils/textStyles";

type FeatherIconName = keyof typeof Feather.glyphMap;

// LinearGradient's `colors` prop requires a tuple of at least 2 colors,
// not a plain `string[]` — TypeScript can only verify "2+ elements" from
// an actual tuple type, so every gradient array in this file uses this.
type GradientColors = readonly [string, string, ...string[]];

const ICONS: Record<string, FeatherIconName> = {
  index: "grid",
  borrowers: "users",
  chat: "message-circle",
  reports: "bar-chart-2",
  settings: "settings",
};

/**
 * 🎨 CUSTOMIZE HERE — this is the whole "liquid glass" vibe.
 * Swap these for any 2-4 colors and the wash behind the blur updates.
 *
 * Light mode: kept as-is, unchanged.
 * Dark mode: intentionally low alpha (0.10–0.14) so it reads as genuine
 * transparent frosted glass over dark content, rather than a solid
 * saturated color block. Higher alpha here looks "painted on" instead
 * of glassy — the blur underneath is what should carry most of the
 * depth, not the tint color itself.
 */
const LIQUID_TINT_LIGHT: GradientColors = [
  "rgba(99,102,241,0.16)", // indigo
  "rgba(236,72,153,0.10)", // pink
  "rgba(16,185,129,0.14)", // emerald
];
const LIQUID_TINT_DARK: GradientColors = [
  "rgba(129,140,248,0.14)", // faint indigo
  "rgba(244,114,182,0.10)", // faint pink
  "rgba(52,211,153,0.12)", // faint emerald
];

/** 🎨 The floating active-tab pill's gradient — change to restyle the highlight. */
const ACTIVE_PILL_GRADIENT: GradientColors = ["#22C55E", "#15803D"];

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
  /** Optional per-instance override of the liquid tint colors */
  tintColors?: GradientColors;
  /** Optional per-instance override of the active pill gradient */
  pillGradient?: GradientColors;
}

interface TabLayout {
  x: number;
  width: number;
}

/**
 * Liquid-glass bottom tab bar with a sliding, spring-animated gradient pill.
 * The pill's position AND width are driven by each tab's real measured
 * layout (not an equal division of the bar), so it always hugs the
 * active tab's icon+label exactly.
 *
 * Note: translateX, width, and scale are all animated with
 * useNativeDriver: false. This is intentional — `width` can never run on
 * the native driver, and mixing a native-driven transform with a
 * JS-driven width on the same Animated.View's style throws at runtime.
 * Keeping all three on the JS driver avoids that conflict.
 *
 * Usage: <Tabs tabBar={(props) => <GlassTabBar {...props} />}>
 */
export default function GlassTabBar({
  state,
  descriptors,
  navigation,
  tintColors,
  pillGradient,
}: GlassTabBarProps) {
  const { colors, isDark } = useTheme();
  const typography = getTypography(colors);

  const [tabLayouts, setTabLayouts] = useState<Record<number, TabLayout>>({});

  const translateX = useRef(new Animated.Value(0)).current;
  const pillWidth = useRef(new Animated.Value(0)).current;
  const pillScale = useRef(new Animated.Value(1)).current;

  const activeLayout = tabLayouts[state.index];

  useEffect(() => {
    if (!activeLayout) return;

    const inset = 4;

    Animated.spring(translateX, {
      toValue: activeLayout.x + inset,
      useNativeDriver: false,
      damping: 16,
      stiffness: 180,
      mass: 0.7,
    }).start();

    Animated.spring(pillWidth, {
      toValue: activeLayout.width - inset * 2,
      useNativeDriver: false,
      damping: 16,
      stiffness: 180,
      mass: 0.7,
    }).start();

    // Small squish-bounce on switch — reads as "liquid" rather than mechanical.
    pillScale.setValue(0.9);
    Animated.spring(pillScale, {
      toValue: 1,
      useNativeDriver: false,
      damping: 9,
      stiffness: 200,
    }).start();
  }, [state.index, activeLayout?.x, activeLayout?.width]);

  const handleTabLayout = (index: number) => (e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    setTabLayouts((prev) => {
      const existing = prev[index];
      if (existing && existing.x === x && existing.width === width) return prev;
      return { ...prev, [index]: { x, width } };
    });
  };

  const wash: GradientColors =
    tintColors ?? (isDark ? LIQUID_TINT_DARK : LIQUID_TINT_LIGHT);
  const pillColors: GradientColors = pillGradient ?? ACTIVE_PILL_GRADIENT;
  const sheenColors: GradientColors = [
    isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.5)",
    "rgba(255,255,255,0)",
  ];

  return (
    <View style={styles.wrapper}>
      <BlurView
        intensity={Platform.OS === "ios" ? 55 : 90}
        tint={isDark ? "dark" : "light"}
        style={[styles.bar, { borderColor: colors.glassBorder }]}
      >
        {/* Iridescent liquid wash */}
        <LinearGradient
          colors={wash}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
        {/* Top sheen for glass depth */}
        <LinearGradient
          colors={sheenColors}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />

        {/* Floating active pill — sized/positioned from real measured layout */}
        {activeLayout && (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.pillWrap,
              {
                width: pillWidth,
                transform: [{ translateX }, { scale: pillScale }],
              },
            ]}
          >
            <LinearGradient
              colors={pillColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.pill}
            />
          </Animated.View>
        )}

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
              onLayout={handleTabLayout(index)}
              style={styles.tab}
              hitSlop={8}
            >
              <Feather
                name={icon}
                size={moderateScale(18)}
                color={isActive ? "#FFFFFF" : colors.textMuted}
              />
              {isActive && (
                <Text
                  style={[
                    typography.caption,
                    styles.label,
                    { color: "#FFFFFF" },
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
    left: scaleWidth(40),
    right: scaleWidth(40),
    bottom: Platform.OS === "ios" ? scaleHeight(24) : scaleWidth(20),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 10,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 28,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 4,
    overflow: "hidden",
  },
  pillWrap: {
    position: "absolute",
    top: 6,
    bottom: 6,
    left: 0,
  },
  pill: {
    flex: 1,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    gap: 6,
  },
  label: { marginLeft: 2 },
});
