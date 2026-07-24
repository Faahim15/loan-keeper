import { useRouter } from "expo-router";
import DashboardScreen from "../../screens/DashboardScreen";

export default function DashboardRoute() {
  const router = useRouter();

  return (
    <DashboardScreen
      onNewLoan={() => {
        // push a "new loan" form route here once you add one
      }}
      onAddBorrower={() => {
        // push an "add borrower" form route here once you add one
      }}
      onRecordPayment={() => {
        // push a "record payment" form route here once you add one
      }}
      onViewAllBorrowers={() => router.push("/(tabs)/borrowers")}
      onPressPayment={(borrowerId) =>
        router.push({ pathname: "/chat/[id]", params: { id: borrowerId } })
      }
    />
  );
}
