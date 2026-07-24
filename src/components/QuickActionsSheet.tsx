import { Feather } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import {
  Animated,
  BackHandler,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { moderateScale } from "../utils/responsive";
import { getTypography } from "../utils/textStyles";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type FeatherIconName = keyof typeof Feather.glyphMap;

export interface QuickAction {
  key: string;
  icon: FeatherIconName;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
}

const DEFAULT_ACTIONS: QuickAction[] = [
  {
    key: "new-loan",
    icon: "file-plus",
    iconBg: "#22C55E",
    iconColor: "#FFFFFF",
    title: "New Loan",
    subtitle: "Create a new lending agreement",
  },
  {
    key: "add-borrower",
    icon: "user-plus",
    iconBg: "#E9E5FF",
    iconColor: "#7C6CF0",
    title: "Add Borrower",
    subtitle: "Onboard a new client",
  },
  {
    key: "record-payment",
    icon: "credit-card",
    iconBg: "#FCA5A5",
    iconColor: "#B91C1C",
    title: "Record Payment",
    subtitle: "Update loan balance status",
  },
];

interface QuickActionsSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (actionKey: string) => void;
  actions?: QuickAction[];
  title?: string;
  subtitle?: string;
}

/**
 * Custom bottom sheet (Modal + Animated, no extra native dependency).
 * translateY/opacity are the only animated properties, so this can safely
 * run entirely on the native driver — no width/layout animation involved.
 */
export default function QuickActionsSheet({
  visible,
  onClose,
  onSelect,
  actions = DEFAULT_ACTIONS,
  title = "Quick Actions",
  subtitle = "Streamline your lending workflow",
}: QuickActionsSheetProps) {
  const { colors, isDark } = useTheme();
  const typography = getTypography(colors);

  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          damping: 20,
          stiffness: 220,
          mass: 0.8,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  // Android hardware back button should close the sheet, not the screen behind it.
  useEffect(() => {
    if (!visible) return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      handleClose();
      return true;
    });
    return () => sub.remove();
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  };

  const handleSelect = (actionKey: string) => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
      onSelect(actionKey);
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <View style={StyleSheet.absoluteFill}>
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
        </Animated.View>

        <Animated.View
          style={[
            styles.sheet,
            {
              backgroundColor: colors.surface,
              transform: [{ translateY }],
            },
          ]}
        >
          <View style={[styles.handle, { backgroundColor: colors.border }]} />

          <Text style={[typography.h3, styles.title]}>{title}</Text>
          <Text style={[typography.caption, styles.subtitle]}>{subtitle}</Text>

          {actions.map((action) => (
            <Pressable
              key={action.key}
              onPress={() => handleSelect(action.key)}
              style={({ pressed }) => [
                styles.actionRow,
                {
                  backgroundColor: colors.surfaceMuted,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <View
                style={[styles.iconCircle, { backgroundColor: action.iconBg }]}
              >
                <Feather
                  name={action.icon}
                  size={moderateScale(18)}
                  color={action.iconColor}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={typography.bodyMedium}>{action.title}</Text>
                <Text style={typography.caption}>{action.subtitle}</Text>
              </View>
              <Feather
                name="chevron-right"
                size={18}
                color={colors.textMuted}
              />
            </Pressable>
          ))}

          <Pressable onPress={handleClose} style={styles.dismissRow}>
            <Text style={[typography.bodyMedium, { color: colors.textMuted }]}>
              Dismiss
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: moderateScale(20),
    paddingTop: 12,
    paddingBottom: 28,
  },
  handle: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 2,
    marginBottom: 16,
  },
  title: { marginBottom: 2 },
  subtitle: { marginBottom: 16 },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  dismissRow: {
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 4,
  },
});
