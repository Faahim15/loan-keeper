import SettingsScreen from "@/screens/SettingsScreen";
import { useRouter } from "expo-router";

export default function SettingsRoute() {
  const router = useRouter();

  return <SettingsScreen onLogout={() => router.replace("/")} />;
}
