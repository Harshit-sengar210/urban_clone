export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "booking" | "offer" | "system";
}

export const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    title: "Booking Confirmed",
    description: "Your AC Service is confirmed for Tue, 16 Sep.",
    time: "10 min ago",
    read: false,
    type: "booking",
  },
  {
    id: "n2",
    title: "Service Completed",
    description: "Home Cleaning has been marked as completed.",
    time: "2 hours ago",
    read: false,
    type: "booking",
  },
  {
    id: "n3",
    title: "Exclusive Offer",
    description: "Get 10% OFF on your next booking. Use code URBAN10.",
    time: "Yesterday",
    read: true,
    type: "offer",
  },
  {
    id: "n4",
    title: "Invoice Ready",
    description: "Your invoice for Plumbing Service is ready to download.",
    time: "3 days ago",
    read: true,
    type: "system",
  },
];
