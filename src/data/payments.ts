export type PaymentMethodType = "card" | "upi" | "netbanking" | "wallet";
export type CardBrand = "Visa" | "Mastercard" | "RuPay" | "Amex";
export type TransactionType = "service_payment" | "wallet_topup" | "refund" | "credit" | "adjustment";
export type TransactionStatus = "completed" | "pending" | "failed" | "refunded" | "cancelled";
export type TransactionDirection = "credit" | "debit";

export interface PaymentMethodCard {
  id: string;
  type: "card";
  brand: CardBrand;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  nameOnCard: string;
  isDefault: boolean;
  addedAt: string;
}

export interface PaymentMethodUPI {
  id: string;
  type: "upi";
  upiId: string;
  isDefault: boolean;
  addedAt: string;
}

export type PaymentMethod = PaymentMethodCard | PaymentMethodUPI;

export interface Transaction {
  id: string;
  type: TransactionType;
  direction: TransactionDirection;
  title: string;
  description: string;
  amount: number;
  status: TransactionStatus;
  date: string;
  paymentMethodLabel: string;
  bookingId?: string;
  refundReason?: string;
  originalAmount?: number;
}

export interface WalletCredit {
  id: string;
  title: string;
  amount: number;
  expiresAt: string;
  description: string;
}

export interface Wallet {
  balance: number;
  currency: string;
  maxBalance: number;
}

export interface PaymentSummaryData {
  month: string;
  totalSpent: number;
  transactionCount: number;
  totalRefunded: number;
  walletAdded: number;
}

export interface PaymentPreferences {
  defaultMethodId: string;
  savePaymentMethod: boolean;
  paymentNotifications: boolean;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

export const MOCK_WALLET: Wallet = {
  balance: 1250,
  currency: "INR",
  maxBalance: 50000,
};

export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "pm_001",
    type: "card",
    brand: "Visa",
    last4: "4242",
    expiryMonth: 8,
    expiryYear: 2029,
    nameOnCard: "Ravi Kumar",
    isDefault: true,
    addedAt: "2026-08-12T10:00:00",
  },
  {
    id: "pm_002",
    type: "upi",
    upiId: "ravi.kumar@upi",
    isDefault: false,
    addedAt: "2026-08-20T10:00:00",
  },
  {
    id: "pm_003",
    type: "card",
    brand: "Mastercard",
    last4: "8765",
    expiryMonth: 3,
    expiryYear: 2028,
    nameOnCard: "Ravi Kumar",
    isDefault: false,
    addedAt: "2026-09-01T10:00:00",
  },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "TXN-2026-00991",
    type: "service_payment",
    direction: "debit",
    title: "Intense Home Cleaning",
    description: "1 BHK Intense Cleaning",
    amount: 1499,
    status: "completed",
    date: "2026-09-20T14:00:00",
    paymentMethodLabel: "Visa •••• 4242",
    bookingId: "UC-2026-00188",
  },
  {
    id: "TXN-2026-00985",
    type: "wallet_topup",
    direction: "credit",
    title: "Wallet Top-up",
    description: "Added via UPI",
    amount: 1000,
    status: "completed",
    date: "2026-09-18T09:00:00",
    paymentMethodLabel: "ravi.kumar@upi",
  },
  {
    id: "TXN-2026-00981",
    type: "service_payment",
    direction: "debit",
    title: "AC Service & Repair",
    description: "AC Servicing",
    amount: 699,
    status: "completed",
    date: "2026-09-15T10:30:00",
    paymentMethodLabel: "UrbanClone Wallet",
    bookingId: "UC-2026-00191",
  },
  {
    id: "TXN-2026-00974",
    type: "refund",
    direction: "credit",
    title: "Booking Refund",
    description: "Full Home Painting cancelled",
    amount: 450,
    status: "refunded",
    date: "2026-09-12T11:00:00",
    paymentMethodLabel: "UrbanClone Wallet",
    bookingId: "UC-2026-00175",
    refundReason: "Booking cancelled by user",
    originalAmount: 1299,
  },
  {
    id: "TXN-2026-00968",
    type: "service_payment",
    direction: "debit",
    title: "Plumbing Service",
    description: "Plumbing Repair",
    amount: 799,
    status: "completed",
    date: "2026-09-09T14:00:00",
    paymentMethodLabel: "Mastercard •••• 8765",
    bookingId: "UC-2026-00179",
  },
  {
    id: "TXN-2026-00961",
    type: "credit",
    direction: "credit",
    title: "Promotional Credit",
    description: "First booking offer applied",
    amount: 250,
    status: "completed",
    date: "2026-09-01T09:00:00",
    paymentMethodLabel: "UrbanClone Credits",
  },
  {
    id: "TXN-2026-00954",
    type: "service_payment",
    direction: "debit",
    title: "Salon at Home",
    description: "Women's Salon at Home",
    amount: 899,
    status: "completed",
    date: "2026-08-25T11:00:00",
    paymentMethodLabel: "Visa •••• 4242",
    bookingId: "UC-2026-00182",
  },
  {
    id: "TXN-2026-00946",
    type: "wallet_topup",
    direction: "credit",
    title: "Wallet Top-up",
    description: "Added via Visa •••• 4242",
    amount: 500,
    status: "completed",
    date: "2026-08-18T08:00:00",
    paymentMethodLabel: "Visa •••• 4242",
  },
];

export const MOCK_CREDITS: WalletCredit[] = [
  {
    id: "cred_001",
    title: "Promotional Credits",
    amount: 250,
    expiresAt: "2026-10-30T23:59:59",
    description: "Earned from first booking offer",
  },
];

export const MOCK_PAYMENT_SUMMARY: PaymentSummaryData = {
  month: "September",
  totalSpent: 2997,
  transactionCount: 4,
  totalRefunded: 450,
  walletAdded: 1000,
};

export const MOCK_PREFERENCES: PaymentPreferences = {
  defaultMethodId: "pm_001",
  savePaymentMethod: true,
  paymentNotifications: true,
};
