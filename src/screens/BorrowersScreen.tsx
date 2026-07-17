import SegmentedPills from "@/components/SegmentedPill";
import { Borrower } from "@/types/screens.types";
import { Feather } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Avatar from "../components/Avatar";
import Card from "../components/Card";
import ProgressBar from "../components/ProgressBar";
import { useTheme } from "../theme/ThemeContext";
import { moderateScale } from "../utils/responsive";
import { getTypography, textStyle } from "../utils/textStyles";

const BORROWERS: Borrower[] = [
  {
    id: "1",
    name: "Rahim",
    phone: "+880 1712-345678",
    outstanding: "৳35,000",
    installment: "৳5,000/month",
    nextDue: "Oct 15, 2023",
    paidPercent: 70,
    remaining: "৳15,000 left",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Khan",
    phone: "+880 1911-887766",
    outstanding: "৳12,500",
    installment: "৳2,500/month",
    nextDue: "Oct 22, 2023",
    paidPercent: 40,
    remaining: "৳7,500 left",
    status: "active",
  },
  {
    id: "3",
    name: "Ahmed Ali",
    phone: "+880 1822-112233",
    outstanding: "৳45,000",
    installment: "৳9,000/month",
    nextDue: "5 Days Ago",
    paidPercent: 10,
    remaining: "৳40,500 left",
    status: "overdue",
  },
];

const FILTERS = ["All", "Active", "Completed"];

interface BorrowersScreenProps {
  onPressBorrower: (borrowerId: string) => void;
}

export default function BorrowersScreen({
  onPressBorrower,
}: BorrowersScreenProps) {
  const { colors } = useTheme();
  const typography = getTypography(colors);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Active");

  const filtered = useMemo(
    () =>
      BORROWERS.filter((b) =>
        b.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Text style={typography.h2}>Loan Keeper</Text>

        <View
          style={[
            styles.searchBox,
            {
              backgroundColor: colors.surfaceMuted,
              borderColor: colors.border,
            },
          ]}
        >
          <Feather name="search" size={16} color={colors.textMuted} />
          <TextInput
            style={[
              textStyle({ size: 14, color: colors.text }),
              { flex: 1, marginLeft: 8 },
            ]}
            placeholder="Search borrowers..."
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={setQuery}
          />
        </View>

        <SegmentedPills
          options={FILTERS}
          active={filter}
          onChange={setFilter}
        />

        <View style={styles.sectionHeader}>
          <Text style={typography.h3}>Recent Borrowers</Text>
          <Text style={[typography.captionBold, { color: colors.primary }]}>
            {BORROWERS.length} Total
          </Text>
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable onPress={() => onPressBorrower(item.id)}>
            <Card
              style={[
                styles.borrowerCard,
                item.status === "overdue" && {
                  borderLeftWidth: 3,
                  borderLeftColor: colors.overdue,
                },
              ]}
            >
              <View style={styles.rowTop}>
                <Avatar name={item.name} size={44} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={typography.bodyMedium}>{item.name}</Text>
                  <Text style={typography.caption}>{item.phone}</Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={typography.caption}>OUTSTANDING</Text>
                  <Text style={typography.bodyMedium}>{item.outstanding}</Text>
                </View>
              </View>

              <View style={styles.rowMid}>
                <Text style={typography.caption}>{item.installment}</Text>
                <Text
                  style={[
                    typography.caption,
                    {
                      color:
                        item.status === "overdue"
                          ? colors.overdue
                          : colors.textMuted,
                    },
                  ]}
                >
                  {item.status === "overdue"
                    ? `Overdue • ${item.nextDue}`
                    : `Next Due: ${item.nextDue}`}
                </Text>
              </View>

              <ProgressBar
                percent={item.paidPercent}
                color={
                  item.status === "overdue" ? colors.overdue : colors.primary
                }
              />

              <View style={styles.rowBottom}>
                <Text
                  style={[typography.captionBold, { color: colors.primary }]}
                >
                  {item.paidPercent}% Paid
                </Text>
                <Text style={typography.caption}>{item.remaining}</Text>
              </View>
            </Card>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(50),
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  list: { paddingHorizontal: moderateScale(20), paddingBottom: 120 },
  borrowerCard: { marginBottom: 12 },
  rowTop: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  rowMid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  rowBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
});
