import DashboardScreen from "@/screens/DashboardScreen";
import { Href, useRouter } from "expo-router";

export default function DashboardRoute() {
  const router = useRouter();

  return (
    <DashboardScreen
      onAddLoan={() => {
        // push a "new loan" form route here once you add one
      }}
      onViewAllBorrowers={() => router.push("/(tabs)/borrowers" as Href)}
      onPressPayment={(borrowerId) =>
        router.push({
          pathname: "/chat/[id]",
          params: { id: borrowerId },
        } as unknown as Href)
      }
    />
  );
}
