import ChatScreen from "@/screens/ChatScreen";
import { useLocalSearchParams, useRouter } from "expo-router";

// Swap this for a real lookup (API call / store selector) once borrower data is dynamic
const BORROWER_NAMES: Record<string, string> = {
  "1": "Rahim",
  "2": "Sarah Khan",
  "3": "Ahmed Ali",
};

export default function ChatDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const name = BORROWER_NAMES[id ?? ""] || "Borrower";

  return (
    <ChatScreen
      borrower={{ name, status: "Active now" }}
      onBack={() => router.back()}
      showBack
    />
  );
}
