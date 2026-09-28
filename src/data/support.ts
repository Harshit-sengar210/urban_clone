export type TicketStatus = "open" | "in_progress" | "waiting_for_user" | "resolved" | "closed";
export type TicketPriority = "normal" | "high";
export type FAQCategory = "bookings" | "payments" | "refunds" | "services" | "offers" | "account" | "safety";

export interface SupportAttachment {
  name: string;
  url: string;
  size: number;
}

export interface SupportMessage {
  id: string;
  ticketId: string;
  sender: "customer" | "support";
  message: string;
  timestamp: string;
  attachments?: SupportAttachment[];
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  category: string;
  issueType: string;
  title: string;
  bookingId?: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
  lastMessagePreview?: string;
}

export interface FAQ {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
  keywords: string[];
}

export const MOCK_FAQS: FAQ[] = [
  // Bookings
  { id: "faq_1", category: "bookings", question: "How do I cancel a booking?", answer: "Go to My Bookings, select the booking, and tap 'Cancel'. Note that cancellation fees may apply depending on the timing.", keywords: ["cancel", "cancellation", "delete"] },
  { id: "faq_2", category: "bookings", question: "How can I reschedule a service?", answer: "Open the booking details and click 'Reschedule'. You can pick a new date and time based on professional availability.", keywords: ["reschedule", "change time", "date"] },
  { id: "faq_3", category: "bookings", question: "My professional hasn't arrived", answer: "Check the 'Track Booking' screen to see their live location. If they are extremely delayed, you can contact support.", keywords: ["late", "delay", "no show", "arrived"] },
  { id: "faq_4", category: "bookings", question: "Can I change my service address?", answer: "You cannot change the address once booked. Please cancel and rebook with the correct address.", keywords: ["address", "location", "change"] },
  
  // Payments
  { id: "faq_5", category: "payments", question: "What payment methods are supported?", answer: "We support UPI, Credit/Debit cards, and the UrbanClone Wallet.", keywords: ["pay", "methods", "cards", "upi"] },
  { id: "faq_6", category: "payments", question: "My payment failed", answer: "If your payment failed but money was deducted, it will be automatically refunded within 3-5 business days.", keywords: ["failed", "decline", "deducted"] },
  { id: "faq_7", category: "payments", question: "Why was I charged twice?", answer: "Duplicate charges usually happen due to network drops. One of the charges will automatically reverse within 48 hours.", keywords: ["twice", "double", "duplicate"] },
  
  // Refunds
  { id: "faq_8", category: "refunds", question: "Where is my refund?", answer: "Refunds take 3-5 business days to reflect in your original payment method, or instantly in your UC Wallet.", keywords: ["refund", "money back", "return"] },
  { id: "faq_9", category: "refunds", question: "How can I check refund status?", answer: "Go to Wallet & Payments > Transactions. Refund transactions will show their current bank status.", keywords: ["status", "track refund"] },
  
  // Services
  { id: "faq_10", category: "services", question: "How do I contact my professional?", answer: "Once a professional is assigned, you will see a 'Call' button in your booking details.", keywords: ["contact", "call", "phone", "professional"] },
  { id: "faq_11", category: "services", question: "Service quality was poor", answer: "You can rate the professional and request a rework or refund through the 'Service Issue' support option.", keywords: ["poor", "bad", "quality", "rework"] },
  
  // Offers
  { id: "faq_12", category: "offers", question: "How do I apply a coupon?", answer: "During checkout, tap on 'Apply Coupon' and select from available offers or enter the code manually.", keywords: ["coupon", "discount", "offer", "code"] },
  { id: "faq_13", category: "offers", question: "Why isn't my coupon working?", answer: "Check if the coupon has expired, requires a minimum booking amount, or is not applicable to the selected service category.", keywords: ["working", "invalid", "error"] },
  
  // Account
  { id: "faq_14", category: "account", question: "How do I change my phone number?", answer: "Go to Profile > Edit Profile to update your registered phone number. An OTP will be required.", keywords: ["phone", "number", "mobile", "change"] },
  { id: "faq_15", category: "account", question: "How do I update my email?", answer: "Go to Profile > Edit Profile to update and verify your new email address.", keywords: ["email", "update", "change"] },
];

export const MOCK_TICKETS: SupportTicket[] = [
  {
    id: "ticket_001",
    ticketNumber: "SUP-10291",
    category: "booking",
    issueType: "professional_not_arrived",
    title: "Professional didn't arrive",
    bookingId: "UC-2026-00201",
    status: "in_progress",
    priority: "normal",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 900000).toISOString(),
    lastMessagePreview: "We're sorry about the inconvenience. We're checking the status of your booking."
  },
  {
    id: "ticket_002",
    ticketNumber: "SUP-10244",
    category: "payment",
    issueType: "duplicate_charge",
    title: "Charged twice for AC Service",
    bookingId: "UC-2026-00190",
    status: "resolved",
    priority: "normal",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    lastMessagePreview: "The duplicate charge has been reversed to your original payment method."
  }
];

export const MOCK_MESSAGES: Record<string, SupportMessage[]> = {
  "ticket_001": [
    {
      id: "msg_1",
      ticketId: "ticket_001",
      sender: "customer",
      message: "I booked a cleaning service for 10 AM but the professional hasn't arrived.",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "msg_2",
      ticketId: "ticket_001",
      sender: "support",
      message: "We're sorry about the inconvenience. We're checking the status of your booking with the assigned professional.",
      timestamp: new Date(Date.now() - 900000).toISOString(),
    }
  ],
  "ticket_002": [
    {
      id: "msg_3",
      ticketId: "ticket_002",
      sender: "customer",
      message: "I paid for the AC service but my bank shows two deductions of ₹699.",
      timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
    {
      id: "msg_4",
      ticketId: "ticket_002",
      sender: "support",
      message: "The duplicate charge has been reversed to your original payment method. It should reflect within 48 hours.",
      timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
    }
  ]
};
