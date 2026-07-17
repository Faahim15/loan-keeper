import LoginScreen from "@/screens/LoginScreen";
import { Href, useRouter } from "expo-router";

export default function LoginRoute() {
  const router = useRouter();

  return (
    <LoginScreen
      onContinue={() => router.replace("/(tabs)" as Href)}
      onGoogleLogin={() => router.replace("/(tabs)" as Href)}
      onCreateAccount={() => {
        // navigate to a sign-up route here once you add one
      }}
    />
  );
}
