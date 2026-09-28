export type PaymentStatus =
  | "pending"
  | "authorized"
  | "paid"
  | "failed"
  | "partially_refunded"
  | "refunded"
  | "cash";

export type TransactionType =
  | "payment"
  | "refund"
  | "partial_refund"
  | "vendor_payout"
  | "platform_adjustment"
  | "wallet_credit"
  | "wallet_debit";

export type RefundStatus =
  | "requested"
  | "under_review"
  | "approved"
  | "processing"
  | "completed"
  | "rejected";

export type PayoutStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "on_hold";

export interface PaymentCustomerSnapshot {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface PaymentVendorSnapshot {
  id: string;
  name: string;
  verificationStatus: "pending" | "verified" | "suspended";
  avatar?: string;
}

export interface FinancialBreakdown {
  servicePrice: number;
  addOns: number;
  discount: number;
  tax: number;
  customerPaid: number;
  platformFee: number;
  vendorEarning: number;
  refundAmount: number;
  finalSettlement: number;
}

export interface PaymentTimelineEvent {
  id: string;
  title: string;
  timestamp: string;
  actor: string;
  type: "customer" | "admin" | "vendor" | "system";
  note?: string;
}

export interface AdminTransaction {
  id: string;
  paymentId: string;
  bookingId: string;
  customer: PaymentCustomerSnapshot;
  vendor: PaymentVendorSnapshot;
  serviceName: string;
  packageName: string;
  paymentMethod: "upi" | "credit_card" | "debit_card" | "net_banking" | "wallet" | "cash";
  transactionType: TransactionType;
  status: PaymentStatus;
  amount: number;
  platformFee: number;
  financialBreakdown: FinancialBreakdown;
  gatewayReference?: string;
  timeline: PaymentTimelineEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface AdminRefund {
  id: string;
  transactionId: string;
  bookingId: string;
  customer: PaymentCustomerSnapshot;
  originalAmount: number;
  refundAmount: number;
  reason: string;
  refundMethod: string;
  status: RefundStatus;
  requestedAt: string;
  processedAt?: string;
  requestedBy: string;
  approvedBy?: string;
  adminNote?: string;
  timeline: PaymentTimelineEvent[];
}

export interface VendorEarning {
  id: string;
  vendor: PaymentVendorSnapshot;
  period: string;
  completedBookings: number;
  grossRevenue: number;
  platformFee: number;
  adjustments: number;
  refundDeduction: number;
  netEarnings: number;
  pendingPayout: number;
  paidOut: number;
  status: "pending" | "available" | "partially_paid" | "paid" | "on_hold";
}

export interface VendorPayout {
  id: string;
  vendor: PaymentVendorSnapshot;
  period: string;
  eligibleAmount: number;
  adjustment: number;
  netPayout: number;
  paymentMethod: string;
  maskedAccount: string;
  status: PayoutStatus;
  requestedAt: string;
  processedAt?: string;
  referenceId?: string;
  timeline: PaymentTimelineEvent[];
}

export const adminPaymentsData = {
  summary: {
    revenue: 2486000,
    todayRevenue: 48920,
    successfulPayments: 1142,
    pendingPayments: 36,
    refunds: 18450,
    vendorPayable: 842000
  },

  transactions: [
    {
      id: "TXN-984321",
      paymentId: "PAY-1001",
      bookingId: "UC-10482",
      customer: {
        id: "CUST-101",
        name: "Rahul Sharma",
        email: "rahul@example.com",
        phone: "+91 9876543210"
      },
      vendor: {
        id: "VND-202",
        name: "Amit Cleaning Services",
        verificationStatus: "verified"
      },
      serviceName: "Home Cleaning",
      packageName: "Deep Cleaning",
      paymentMethod: "upi",
      transactionType: "payment",
      status: "paid",
      amount: 1799,
      platformFee: 150,
      financialBreakdown: {
        servicePrice: 1499,
        addOns: 0,
        discount: 100,
        tax: 250,
        customerPaid: 1799,
        platformFee: 150,
        vendorEarning: 1649, // CustomerPaid - PlatformFee
        refundAmount: 0,
        finalSettlement: 1649
      },
      gatewayReference: "DEMO_TXN_984321",
      timeline: [
        { id: "tl-1", title: "Payment Initiated", timestamp: "2026-09-25T08:00:00Z", actor: "Rahul Sharma", type: "customer" },
        { id: "tl-2", title: "Payment Authorized", timestamp: "2026-09-25T08:00:05Z", actor: "System", type: "system" },
        { id: "tl-3", title: "Payment Captured", timestamp: "2026-09-25T08:00:10Z", actor: "System", type: "system" }
      ],
      createdAt: "2026-09-25T08:00:00Z",
      updatedAt: "2026-09-25T08:00:10Z"
    },
    {
      id: "TXN-984322",
      paymentId: "PAY-1002",
      bookingId: "UC-10483",
      customer: {
        id: "CUST-102",
        name: "Priya Singh",
        email: "priya@example.com",
        phone: "+91 9988776655"
      },
      vendor: {
        id: "VND-203",
        name: "Neha Beauty Care",
        verificationStatus: "verified"
      },
      serviceName: "Salon at Home",
      packageName: "Premium Facial",
      paymentMethod: "credit_card",
      transactionType: "payment",
      status: "pending",
      amount: 1449,
      platformFee: 100,
      financialBreakdown: {
        servicePrice: 999,
        addOns: 200,
        discount: 0,
        tax: 150,
        customerPaid: 1449,
        platformFee: 100,
        vendorEarning: 1349,
        refundAmount: 0,
        finalSettlement: 1349
      },
      gatewayReference: "DEMO_TXN_984322",
      timeline: [
        { id: "tl-1", title: "Payment Initiated", timestamp: "2026-09-26T07:00:00Z", actor: "Priya Singh", type: "customer" }
      ],
      createdAt: "2026-09-26T07:00:00Z",
      updatedAt: "2026-09-26T07:00:00Z"
    },
    {
      id: "TXN-984323",
      paymentId: "PAY-1003",
      bookingId: "UC-10484",
      customer: {
        id: "CUST-103",
        name: "Vikram Malhotra",
        email: "vikram@example.com",
        phone: "+91 9123456789"
      },
      vendor: {
        id: "VND-204",
        name: "Ramesh AC Repairs",
        verificationStatus: "verified"
      },
      serviceName: "AC Service",
      packageName: "Basic AC Service",
      paymentMethod: "cash",
      transactionType: "payment",
      status: "paid",
      amount: 579,
      platformFee: 50,
      financialBreakdown: {
        servicePrice: 499,
        addOns: 0,
        discount: 50,
        tax: 80,
        customerPaid: 579,
        platformFee: 50,
        vendorEarning: 529,
        refundAmount: 0,
        finalSettlement: 529
      },
      timeline: [
        { id: "tl-1", title: "Cash Collected", timestamp: "2026-09-25T11:56:00Z", actor: "Ramesh AC Repairs", type: "vendor" }
      ],
      createdAt: "2026-09-25T11:56:00Z",
      updatedAt: "2026-09-25T11:56:00Z"
    }
  ] as AdminTransaction[],

  refunds: [
    {
      id: "REF-5001",
      transactionId: "TXN-984324",
      bookingId: "UC-10485",
      customer: {
        id: "CUST-104",
        name: "Anjali Desai",
        email: "anjali@example.com",
        phone: "+91 9977553311"
      },
      originalAmount: 402,
      refundAmount: 402,
      reason: "Scheduling Issue",
      refundMethod: "original_payment_method",
      status: "processing",
      requestedAt: "2026-09-26T09:30:00Z",
      requestedBy: "Anjali Desai",
      adminNote: "Customer requested cancellation before vendor assignment.",
      timeline: [
        { id: "tl-1", title: "Refund Requested", timestamp: "2026-09-26T09:30:00Z", actor: "Anjali Desai", type: "customer" },
        { id: "tl-2", title: "Refund Approved", timestamp: "2026-09-26T09:45:00Z", actor: "Admin", type: "admin" }
      ]
    }
  ] as AdminRefund[],

  vendorEarnings: [
    {
      id: "VE-202-SEP26",
      vendor: {
        id: "VND-202",
        name: "Amit Cleaning Services",
        verificationStatus: "verified"
      },
      period: "Sep 2026",
      completedBookings: 18,
      grossRevenue: 28400,
      platformFee: 2840,
      adjustments: 0,
      refundDeduction: 0,
      netEarnings: 25560,
      pendingPayout: 12560,
      paidOut: 13000,
      status: "partially_paid"
    }
  ] as VendorEarning[],

  payouts: [
    {
      id: "PO-3001",
      vendor: {
        id: "VND-202",
        name: "Amit Cleaning Services",
        verificationStatus: "verified"
      },
      period: "Sep 15 - Sep 21, 2026",
      eligibleAmount: 13000,
      adjustment: 0,
      netPayout: 13000,
      paymentMethod: "Bank Transfer",
      maskedAccount: "Bank Account •••• 4821",
      status: "completed",
      requestedAt: "2026-09-22T10:00:00Z",
      processedAt: "2026-09-23T14:30:00Z",
      referenceId: "DEMO_PO_REF_1122",
      timeline: [
        { id: "tl-1", title: "Payout Initiated", timestamp: "2026-09-22T10:00:00Z", actor: "System", type: "system" },
        { id: "tl-2", title: "Payout Processed", timestamp: "2026-09-23T14:30:00Z", actor: "Bank", type: "system" }
      ]
    }
  ] as VendorPayout[]
};
