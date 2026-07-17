export interface ColorTokens {
  primary: string;
  primaryDark: string;
  primaryLight: string;

  background: string;
  backgroundGradientEnd: string;
  surface: string;
  surfaceMuted: string;

  text: string;
  textMuted: string;
  textInverted: string;

  border: string;
  divider: string;

  error: string;
  warning: string;
  success: string;
  overdue: string;

  bubbleMine: string;
  bubbleTheirs: string;

  glassBg: string;
  glassBorder: string;
}

export type FontWeightKey = "regular" | "medium" | "semiBold" | "bold";

export interface TextStyleOptions {
  size?: number;
  weight?: FontWeightKey;
  color?: string;
  lineHeight?: number;
  letterSpacing?: number;
  align?: "left" | "center" | "right";
}

export interface Borrower {
  id: string;
  name: string;
  phone: string;
  outstanding: string;
  installment: string;
  nextDue: string;
  paidPercent: number;
  remaining: string;
  status: "active" | "overdue" | "completed";
  avatarUri?: string;
}

export interface UpcomingPayment {
  id: string;
  name: string;
  amount: string;
  due: string;
  overdue: boolean;
}

export interface Collection {
  id: string;
  name: string;
  date: string;
  amount: string;
}

export type ChatMessage =
  | { id: string; from: "me" | "them"; text: string; time: string }
  | {
      id: string;
      from: "system";
      loanRef: string;
      status: string;
      nextPayment: string;
      due: string;
    };

export type TabKey =
  | "Dashboard"
  | "Borrowers"
  | "Chat"
  | "Reports"
  | "Settings";
