import { Stack } from "expo-router";
import { ThemeProvider } from "../theme/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="chat/[id]"
          options={{ animation: "slide_from_right" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
