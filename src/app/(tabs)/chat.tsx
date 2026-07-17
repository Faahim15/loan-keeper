// import ChatScreen from "../../screens/ChatScreen";
import ChatScreen from "../../screens/ChatScreen";

export default function ChatTabRoute() {
  return (
    // No back button needed here since this is a tab, not a pushed screen.
    // Individual conversations opened from Borrowers/Dashboard use app/chat/[id].tsx instead.
    <ChatScreen
      borrower={{ name: "Rahim", status: "Active now" }}
      showBack={false}
    />
  );
}
