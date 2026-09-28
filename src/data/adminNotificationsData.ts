export type NotificationStatus =
  | "draft"
  | "scheduled"
  | "processing"
  | "sent"
  | "partially_delivered"
  | "delivered"
  | "failed"
  | "cancelled";

export type NotificationReadStatus =
  | "read"
  | "unread"
  | "archived";

export type NotificationType =
  | "system"
  | "booking"
  | "payment"
  | "vendor"
  | "support"
  | "offer"
  | "security"
  | "service"
  | "customer";

export type NotificationPriority =
  | "low"
  | "normal"
  | "high"
  | "urgent";

export type NotificationChannel =
  | "in_app"
  | "email"
  | "push"
  | "sms"
  | "whatsapp";

export type NotificationAudience =
  | "all_customers"
  | "all_vendors"
  | "all_admins"
  | "new_customers"
  | "active_customers"
  | "upcoming_booking_customers"
  | "active_vendors"
  | "pending_vendors"
  | "approved_vendors"
  | "support_agents"
  | "specific_users"
  | "specific_vendors";

export interface NotificationRelatedEntity {
  type: "booking" | "customer" | "vendor" | "service" | "payment" | "support_ticket" | "offer";
  id: string;
  label: string;
}

export interface AdminNotification {
  id: string;
  name: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  channels: NotificationChannel[];
  audience?: NotificationAudience;
  readStatus: NotificationReadStatus;
  deliveryStatus?: NotificationStatus;
  relatedEntity?: NotificationRelatedEntity;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationDeliveryStats {
  notificationId: string;
  recipients: number;
  delivered: number;
  failed: number;
  pending: number;
  opened: number;
  clicked: number;
  channelBreakdown: {
    channel: NotificationChannel;
    sent: number;
    delivered: number;
  }[];
}

export const adminNotificationsData = {
  summary: {
    total: 12842,
    unread: 184,
    sentToday: 2418,
    scheduled: 24,
    failed: 17,
    deliveryRate: 98.4
  },

  inbox: [
    {
      id: "NOTIF-1001",
      name: "Booking Cancellation Alert",
      title: "Booking requires attention",
      message: "Customer requested cancellation for a scheduled AC service.",
      type: "booking",
      priority: "high",
      channels: ["in_app"],
      readStatus: "unread",
      relatedEntity: {
        type: "booking",
        id: "BK-10284",
        label: "Booking #BK-10284"
      },
      createdAt: "2026-09-26T12:45:00Z",
      updatedAt: "2026-09-26T12:45:00Z"
    },
    {
      id: "NOTIF-1002",
      name: "New Vendor Application",
      title: "New vendor application received",
      message: "A new vendor application is waiting for review.",
      type: "vendor",
      priority: "normal",
      channels: ["in_app", "email"],
      readStatus: "unread",
      relatedEntity: {
        type: "vendor",
        id: "VND-405",
        label: "Application #VND-405"
      },
      createdAt: "2026-09-26T12:20:00Z",
      updatedAt: "2026-09-26T12:20:00Z"
    },
    {
      id: "NOTIF-1003",
      name: "Security Alert",
      title: "Failed admin login attempt",
      message: "Multiple failed login attempts detected from unknown IP.",
      type: "security",
      priority: "urgent",
      channels: ["in_app", "email", "sms"],
      readStatus: "read",
      createdAt: "2026-09-26T08:15:00Z",
      updatedAt: "2026-09-26T08:30:00Z"
    }
  ] as AdminNotification[],

  history: [
    {
      id: "NOTIF-HIST-1",
      name: "Monsoon Promo Blast",
      title: "Monsoon Cleaning Offer",
      message: "Get 20% off all deep cleaning services this week.",
      type: "offer",
      priority: "normal",
      channels: ["email", "push"],
      audience: "active_customers",
      deliveryStatus: "delivered",
      createdAt: "2026-09-25T10:00:00Z",
      updatedAt: "2026-09-25T10:15:00Z"
    }
  ]
};
