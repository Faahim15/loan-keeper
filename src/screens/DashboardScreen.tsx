import { UpcomingPayment } from "@/types/screens.types";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Avatar from "../components/Avatar";
import Card from "../components/Card";
import { useTheme } from "../theme/ThemeContext";
import { moderateScale } from "../utils/responsive";
import { getTypography } from "../utils/textStyles";

const UPCOMING_PAYMENTS: UpcomingPayment[] = [
  {
    id: "1",
    name: "Rahim",
    amount: "৳5,000",
    due: "Due Tomorrow",
    overdue: true,
  },
  {
    id: "2",
    name: "Karim",
    amount: "৳10,000",
    due: "Due in 3 Days",
    overdue: false,
  },
];

interface DashboardScreenProps {
  onAddLoan: () => void;
  onViewAllBorrowers: () => void;
  onPressPayment: (borrowerId: string) => void;
}

export default function DashboardScreen({
  onAddLoan,
  onViewAllBorrowers,
  onPressPayment,
}: DashboardScreenProps) {
  const { colors } = useTheme();
  const typography = getTypography(colors);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <Text style={typography.h2}>Good Afternoon, Lender</Text>
          <Feather name="bell" size={22} color={colors.text} />
        </View>
        <Text
          style={[
            typography.body,
            { color: colors.textMuted, marginBottom: 16 },
          ]}
        >
          Here is your portfolio overview today.
        </Text>

        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          style={styles.heroCard}
        >
          <Text style={[typography.caption, { color: "#DDEFE2" }]}>
            Total Loan Given
          </Text>
          <Text style={[typography.h1, { color: "#fff", marginTop: 4 }]}>
            ৳ 450,000
          </Text>
          <View style={styles.trendRow}>
            <Feather name="trending-up" size={14} color="#B7F5C7" />
            <Text
              style={[
                typography.captionBold,
                { color: "#B7F5C7", marginLeft: 4 },
              ]}
            >
              +12.5% from last month
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.statRow}>
          <Card style={styles.statCard}>
            <Feather name="dollar-sign" size={18} color={colors.primary} />
            <Text style={[typography.caption, { marginTop: 8 }]}>
              Total Collected
            </Text>
            <Text style={typography.h3}>৳ 310k</Text>
          </Card>
          <Card style={styles.statCard}>
            <Feather name="clipboard" size={18} color={colors.error} />
            <Text style={[typography.caption, { marginTop: 8 }]}>
              Outstanding
            </Text>
            <Text style={typography.h3}>৳ 140k</Text>
          </Card>
        </View>

        <Card style={styles.borrowersCard}>
          <View style={styles.borrowersRow}>
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: colors.primaryLight },
              ]}
            >
              <Feather name="users" size={18} color={colors.primary} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={typography.h3}>18</Text>
              <Text style={typography.caption}>Active Borrowers</Text>
            </View>
            <Feather name="chevron-right" size={20} color={colors.textMuted} />
          </View>
        </Card>

        <View style={styles.sectionHeader}>
          <Text style={typography.h3}>Upcoming Payments</Text>
          <Pressable onPress={onViewAllBorrowers}>
            <Text style={typography.link}>View All</Text>
          </Pressable>
        </View>

        {UPCOMING_PAYMENTS.map((p) => (
          <Pressable key={p.id} onPress={() => onPressPayment(p.id)}>
            <Card style={styles.paymentRow}>
              <Avatar name={p.name} size={40} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={typography.bodyMedium}>{p.name}</Text>
                <Text
                  style={[
                    typography.caption,
                    { color: p.overdue ? colors.overdue : colors.textMuted },
                  ]}
                >
                  {p.due}
                </Text>
              </View>
              <Text style={typography.bodyMedium}>{p.amount}</Text>
            </Card>
          </Pressable>
        ))}
      </ScrollView>

      <Pressable
        onPress={onAddLoan}
        style={[styles.fab, { backgroundColor: colors.primary }]}
      >
        <Feather name="plus" size={24} color={colors.textInverted} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(20),
    paddingTop: moderateScale(50),
    paddingBottom: 120,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heroCard: { borderRadius: 20, padding: moderateScale(18), marginBottom: 16 },
  trendRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  statRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
  statCard: { flex: 1 },
  borrowersCard: { marginBottom: 20 },
  borrowersRow: { flexDirection: "row", alignItems: "center" },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  paymentRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 100,
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
});
