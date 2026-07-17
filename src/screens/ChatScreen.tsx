import { ChatMessage } from "@/types/screens.types";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Avatar from "../components/Avatar";
import { useTheme } from "../theme/ThemeContext";
import { moderateScale } from "../utils/responsive";
import { getTypography, textStyle } from "../utils/textStyles";

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    from: "them",
    text: "Hello! Hope you're doing well. Just wanted to check in about the repayment schedule for the small business expansion loan.",
    time: "10:42 AM",
  },
  {
    id: "2",
    from: "me",
    text: "Hi Rahim, I'm doing well, thanks! Our records show the next installment is due this Friday. Is everything on track?",
    time: "10:45 AM",
  },
  {
    id: "3",
    from: "system",
    loanRef: "BK-9204",
    status: "Active",
    nextPayment: "$1,250.00",
    due: "Due Oct 27",
  },
  { id: "4", from: "them", text: "I can pay next week.", time: "11:15 AM" },
  { id: "5", from: "me", text: "Okay.", time: "11:16 AM" },
];

function Bubble({ message }: { message: ChatMessage }) {
  const { colors } = useTheme();
  const typography = getTypography(colors);

  if (message.from === "system") {
    return (
      <View
        style={[
          styles.systemCard,
          { backgroundColor: colors.surfaceMuted, borderColor: colors.border },
        ]}
      >
        <View style={styles.rowBetween}>
          <Text style={typography.caption}>Loan Ref: {message.loanRef}</Text>
          <View
            style={[
              styles.statusPill,
              { backgroundColor: colors.primaryLight },
            ]}
          >
            <Text style={[typography.captionBold, { color: colors.primary }]}>
              {message.status}
            </Text>
          </View>
        </View>
        <View style={styles.rowBetween}>
          <Text style={typography.bodyMedium}>
            Next Payment: {message.nextPayment}
          </Text>
          <Text style={typography.caption}>{message.due}</Text>
        </View>
      </View>
    );
  }

  const isMine = message.from === "me";
  return (
    <View style={[styles.bubbleRow, isMine && { justifyContent: "flex-end" }]}>
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: isMine ? colors.bubbleMine : colors.bubbleTheirs,
            borderColor: isMine ? "transparent" : colors.border,
            borderWidth: isMine ? 0 : 1,
          },
        ]}
      >
        <Text
          style={textStyle({
            size: 14,
            color: isMine ? colors.textInverted : colors.text,
          })}
        >
          {message.text}
        </Text>
      </View>
    </View>
  );
}

interface ChatBorrower {
  name: string;
  status: string;
}

interface ChatScreenProps {
  borrower?: ChatBorrower;
  onBack?: () => void;
  showBack?: boolean;
}

export default function ChatScreen({
  borrower = { name: "Rahim", status: "Active now" },
  onBack,
  showBack = true,
}: ChatScreenProps) {
  const { colors } = useTheme();
  const typography = getTypography(colors);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [draft, setDraft] = useState("");

  const send = () => {
    if (!draft.trim()) return;
    setMessages((m) => [
      ...m,
      { id: Date.now().toString(), from: "me", text: draft, time: "Now" },
    ]);
    setDraft("");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        {showBack && (
          <Pressable onPress={onBack} hitSlop={8}>
            <Feather name="arrow-left" size={20} color={colors.text} />
          </Pressable>
        )}
        <Avatar name={borrower.name} size={36} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={typography.bodyMedium}>{borrower.name}</Text>
          <Text style={[typography.caption, { color: colors.primary }]}>
            {borrower.status}
          </Text>
        </View>
        <Feather
          name="phone"
          size={18}
          color={colors.text}
          style={{ marginRight: 16 }}
        />
        <Feather
          name="video"
          size={18}
          color={colors.text}
          style={{ marginRight: 16 }}
        />
        <Feather name="more-vertical" size={18} color={colors.text} />
      </View>

      <FlatList
        data={messages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <Bubble message={item} />}
      />

      <View style={[styles.inputBar, { borderTopColor: colors.border }]}>
        <Feather name="plus-circle" size={22} color={colors.textMuted} />
        <TextInput
          style={[
            textStyle({ size: 14, color: colors.text }),
            styles.input,
            { backgroundColor: colors.surfaceMuted },
          ]}
          placeholder="Type your message..."
          placeholderTextColor={colors.textMuted}
          value={draft}
          onChangeText={setDraft}
        />
        <Pressable
          onPress={send}
          style={[styles.sendBtn, { backgroundColor: colors.primary }]}
        >
          <Feather name="send" size={16} color={colors.textInverted} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScale(50),
    paddingBottom: 12,
    borderBottomWidth: 1,
    gap: 4,
  },
  list: { padding: moderateScale(16), gap: 10 },
  bubbleRow: { flexDirection: "row", marginBottom: 8 },
  bubble: { maxWidth: "78%", borderRadius: 16, padding: 12 },
  systemCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
    gap: 8,
    marginBottom: 8,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusPill: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: moderateScale(12),
    borderTopWidth: 1,
  },
  input: { flex: 1, borderRadius: 20, paddingHorizontal: 14, height: 40 },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
