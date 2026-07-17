import { Href, useRouter } from "expo-router";
import BorrowersScreen from "../../screens/BorrowersScreen";

export default function BorrowersRoute() {
  const router = useRouter();

  return (
    <BorrowersScreen
      onPressBorrower={(borrowerId) =>
        router.push({
          pathname: "/chat/[id]",
          params: { id: borrowerId },
        } as unknown as Href)
      }
    />
  );
}
