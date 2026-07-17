import SegmentedPills from "@/components/SegmentedPill";
import { Collection } from "@/types/screens.types";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Avatar from "../components/Avatar";
import Card from "../components/Card";
import ProgressBar from "../components/ProgressBar";
import { useTheme } from "../theme/ThemeContext";
import { moderateScale } from "../utils/responsive";
import { getTypography } from "../utils/textStyles";

interface WeekBar {
  day: string;
  value: number;
}

const WEEK_BARS: WeekBar[] = [
  { day: "Mon", value: 0.4 },
  { day: "Tue", value: 0.55 },
  { day: "Wed", value: 0.3 },
  { day: "Thu", value: 0.7 },
  { day: "Fri", value: 0.5 },
  { day: "Sat", value: 0.9 },
  { day: "Sun", value: 0.6 },
];

const RECENT_COLLECTIONS: Collection[] = [
  {
    id: "1",
    name: "Marcus Sterling",
    date: "Sat 12, 2023",
    amount: "$1,250.00",
  },
  { id: "2", name: "Elena Rodriguez", date: "Sat 10, 2023", amount: "$860.00" },
  {
    id: "3",
    name: "Arthur P. Sance",
    date: "Sat 4, 2023",
    amount: "$2,100.00",
  },
];

const RANGES = ["Weekly", "Monthly", "Yearly"];

interface DonutChartProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
}

/** Simple donut chart built with react-native-svg, no external chart lib needed */
function DonutChart({
  percent,
  size = 120,
  strokeWidth = 12,
}: DonutChartProps) {
  const { colors } = useTheme();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const typography = getTypography(colors);

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.primaryLight}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.primary}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={StyleSheet.absoluteFill}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={typography.h2}>{percent}%</Text>
          <Text style={typography.caption}>Paid</Text>
        </View>
      </View>
    </View>
  );
}

export default function CollectionsScreen() {
  const { colors } = useTheme();
  const typography = getTypography(colors);
  const [range, setRange] = useState("Weekly");

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={typography.h2}>Loan Keeper</Text>
        <SegmentedPills options={RANGES} active={range} onChange={setRange} />

        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          style={styles.heroCard}
        >
          <Text style={[typography.caption, { color: "#DDEFE2" }]}>
            Total Collection
          </Text>
          <Text style={[typography.h1, { color: "#fff" }]}>$128,450.00</Text>
          <View style={styles.barsRow}>
            {WEEK_BARS.map((b) => (
              <View key={b.day} style={styles.barCol}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: moderateScale(60) * b.value,
                      backgroundColor: "rgba(255,255,255,0.85)",
                    },
                  ]}
                />
                <Text
                  style={[
                    typography.caption,
                    { color: "#DDEFE2", marginTop: 4 },
                  ]}
                >
                  {b.day}
                </Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        <Card style={styles.rowCard}>
          <Text style={typography.caption}>Outstanding Loan</Text>
          <Text
            style={[typography.h3, { color: colors.error, marginBottom: 8 }]}
          >
            $45,210
          </Text>
          <ProgressBar percent={28} color={colors.error} />
        </Card>

        <Card style={styles.rowCard}>
          <View style={styles.rowBetween}>
            <Text style={typography.caption}>Collection Efficiency</Text>
            <Text style={[typography.bodyMedium, { color: colors.primary }]}>
              94.2%
            </Text>
          </View>
          <ProgressBar percent={94.2} />
        </Card>

        <Card style={styles.donutCard}>
          <Text
            style={[
              typography.h3,
              { alignSelf: "flex-start", marginBottom: 12 },
            ]}
          >
            Paid vs Remaining
          </Text>
          <DonutChart percent={75} />
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: colors.primary }]} />
              <Text style={typography.caption}>Paid Loan $99,000</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.dot, { backgroundColor: colors.primaryLight }]}
              />
              <Text style={typography.caption}>Remaining $33,000</Text>
            </View>
          </View>
        </Card>

        <View style={styles.sectionHeader}>
          <Text style={typography.h3}>Recent Collections</Text>
          <Text style={[typography.captionBold, { color: colors.primary }]}>
            View All
          </Text>
        </View>

        {RECENT_COLLECTIONS.map((c) => (
          <Card key={c.id} style={styles.collectionRow}>
            <Avatar name={c.name} size={40} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={typography.bodyMedium}>{c.name}</Text>
              <Text style={typography.caption}>{c.date}</Text>
            </View>
            <Text style={[typography.bodyMedium, { color: colors.primary }]}>
              {c.amount}
            </Text>
          </Card>
        ))}
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
  heroCard: {
    borderRadius: 20,
    padding: moderateScale(18),
    marginTop: 16,
    marginBottom: 16,
  },
  barsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  barCol: { alignItems: "center", width: 28 },
  bar: { width: 8, borderRadius: 4 },
  rowCard: { marginBottom: 16 },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  donutCard: { alignItems: "center", marginBottom: 20 },
  legendRow: { flexDirection: "row", gap: 16, marginTop: 16 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  collectionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});
