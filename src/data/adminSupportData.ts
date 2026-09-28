export type SupportTicketStatus =
  | "open"
  | "in_progress"
  | "pending_customer"
  | "pending_vendor"
  | "resolved"
  | "closed";

export type SupportPriority =
  | "low"
  | "medium"
  | "high"
  | "urgent";

export type SupportCategory =
  | "booking"
  | "payment"
  | "vendor"
  | "service"
  | "account"
  | "refund"
  | "offer"
  | "technical"
  | "safety"
  | "other";

export type SupportRequesterType =
  | "customer"
  | "vendor";

export type SupportChannel =
  | "in_app"
  | "email"
  | "phone"
  | "whatsapp"
  | "internal";

export type SLAStatus =
  | "on_track"
  | "at_risk"
  | "breached";

export type SupportMessageType =
  | "customer"
  | "vendor"
  | "admin"
  | "internal_note";

export type SupportActivityType =
  | "created"
  | "assigned"
  | "status_changed"
  | "priority_changed"
  | "category_changed"
  | "message_sent"
  | "internal_note"
  | "escalated"
  | "booking_linked"
  | "resolved"
  | "reopened"
  | "closed";

export interface SupportRequesterSnapshot {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  type: SupportRequesterType;
}

export interface SupportBookingSnapshot {
  id: string;
  serviceName: string;
  customerName: string;
  vendorName: string;
  bookingDate: string;
  amount: number;
  status: string;
}

export interface SupportMessage {
  id: string;
  ticketId: string;
  type: SupportMessageType;
  senderName: string;
  senderId: string;
  text: string;
  timestamp: string;
  attachments?: string[];
}

export interface SupportActivityEvent {
  id: string;
  ticketId: string;
  type: SupportActivityType;
  actorName: string;
  actorId: string;
  timestamp: string;
  note?: string;
}

export interface AdminSupportTicket {
  id: string;
  subject: string;
  description: string;
  requester: SupportRequesterSnapshot;
  category: SupportCategory;
  subcategory?: string;
  priority: SupportPriority;
  status: SupportTicketStatus;
  channel: SupportChannel;
  assignee?: string;
  assigneeName?: string;
  sla: SLAStatus;
  slaRemainingMinutes: number;
  tags: string[];
  relatedBooking?: SupportBookingSnapshot;
  messages: SupportMessage[];
  activities: SupportActivityEvent[];
  createdAt: string;
  updatedAt: string;
  lastMessageAt: string;
}

export const adminSupportData = {
  summary: {
    total: 1248,
    open: 184,
    pending: 96,
    urgent: 12,
    resolved: 956,
    slaAtRisk: 18
  },

  tickets: [
    {
      id: "SUP-10482",
      subject: "Vendor has not arrived for scheduled AC service",
      description: "My appointment was scheduled for 10 AM and nobody has showed up. I cannot reach the vendor.",
      requester: {
        id: "CUST-101",
        name: "Rahul Sharma",
        email: "rahul@example.com",
        type: "customer"
      },
      category: "booking",
      priority: "high",
      status: "open",
      channel: "in_app",
      sla: "at_risk",
      slaRemainingMinutes: 48,
      tags: ["vendor-delay", "urgent-followup"],
      relatedBooking: {
        id: "UC-10482",
        serviceName: "AC Service",
        customerName: "Rahul Sharma",
        vendorName: "Ramesh AC Repairs",
        bookingDate: "2026-09-26T10:00:00Z",
        amount: 579,
        status: "confirmed"
      },
      messages: [
        {
          id: "msg-1",
          ticketId: "SUP-10482",
          type: "customer",
          senderName: "Rahul Sharma",
          senderId: "CUST-101",
          text: "My appointment was scheduled for 10 AM and nobody has showed up. I cannot reach the vendor.",
          timestamp: "2026-09-26T10:15:00Z"
        }
      ],
      activities: [
        { id: "act-1", ticketId: "SUP-10482", type: "created", actorName: "Rahul Sharma", actorId: "CUST-101", timestamp: "2026-09-26T10:15:00Z" }
      ],
      createdAt: "2026-09-26T10:15:00Z",
      updatedAt: "2026-09-26T10:15:00Z",
      lastMessageAt: "2026-09-26T10:15:00Z"
    },
    {
      id: "SUP-10483",
      subject: "Payout not received for last week",
      description: "I haven't received my payout for the week ending Sep 20.",
      requester: {
        id: "VND-202",
        name: "Amit Cleaning Services",
        email: "amit@example.com",
        type: "vendor"
      },
      category: "payment",
      priority: "medium",
      status: "in_progress",
      channel: "email",
      assignee: "ADM-1",
      assigneeName: "Finance Support",
      sla: "on_track",
      slaRemainingMinutes: 342,
      tags: ["payout"],
      messages: [
        {
          id: "msg-1",
          ticketId: "SUP-10483",
          type: "vendor",
          senderName: "Amit Cleaning Services",
          senderId: "VND-202",
          text: "I haven't received my payout for the week ending Sep 20.",
          timestamp: "2026-09-25T14:20:00Z"
        },
        {
          id: "msg-2",
          ticketId: "SUP-10483",
          type: "internal_note",
          senderName: "Finance Support",
          senderId: "ADM-1",
          text: "Checking bank transfer status.",
          timestamp: "2026-09-25T15:00:00Z"
        }
      ],
      activities: [
        { id: "act-1", ticketId: "SUP-10483", type: "created", actorName: "Amit Cleaning Services", actorId: "VND-202", timestamp: "2026-09-25T14:20:00Z" },
        { id: "act-2", ticketId: "SUP-10483", type: "assigned", actorName: "System", actorId: "SYS", timestamp: "2026-09-25T14:25:00Z" },
        { id: "act-3", ticketId: "SUP-10483", type: "status_changed", actorName: "Finance Support", actorId: "ADM-1", timestamp: "2026-09-25T15:00:00Z" }
      ],
      createdAt: "2026-09-25T14:20:00Z",
      updatedAt: "2026-09-25T15:00:00Z",
      lastMessageAt: "2026-09-25T14:20:00Z"
    }
  ] as AdminSupportTicket[]
};
