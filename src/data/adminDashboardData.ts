export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  change: number;
  trend: "up" | "down" | "neutral";
  icon: string;
}

export interface BookingActivityData {
  day: string;
  bookings: number;
}

export interface RevenueData {
  thisMonth: string;
  change: number;
  trend: "up" | "down" | "neutral";
  breakdown: {
    completedServices: string;
    pendingPayments: string;
    refunds: string;
  };
}

export interface RecentBooking {
  id: string;
  customer: string;
  service: string;
  vendor: string;
  date: string;
  amount: string;
  status: "Confirmed" | "Completed" | "Pending" | "Cancelled";
}

export interface PendingVendor {
  id: string;
  name: string;
  serviceCategory: string;
  appliedAgo: string;
  avatar: string;
}

export interface SupportTicket {
  id: string;
  issue: string;
  userType: "Customer" | "Vendor";
  timeAgo: string;
  status: "Open" | "In Progress" | "Waiting" | "Resolved";
}

export interface RecentReview {
  id: string;
  customer: string;
  service: string;
  rating: number;
  text: string;
  timeAgo: string;
  avatar: string;
}

export interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: string;
  action: string;
}

export interface AdminNotification {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  icon: string;
  unread: boolean;
}

export const adminDashboardData = {
  stats: [
    {
      id: "stat-1",
      label: "Total Users",
      value: "24,892",
      change: 8.4,
      trend: "up",
      icon: "Users"
    },
    {
      id: "stat-2",
      label: "Active Vendors",
      value: "1,284",
      change: 5.7,
      trend: "up",
      icon: "UserCheck"
    },
    {
      id: "stat-3",
      label: "Today's Bookings",
      value: "348",
      change: 12.2,
      trend: "up",
      icon: "CalendarCheck"
    },
    {
      id: "stat-4",
      label: "Total Revenue",
      value: "₹18.42L",
      change: 9.6,
      trend: "up",
      icon: "TrendingUp"
    }
  ] as DashboardStat[],
  
  bookingActivity: [
    { day: "Mon", bookings: 42 },
    { day: "Tue", bookings: 58 },
    { day: "Wed", bookings: 51 },
    { day: "Thu", bookings: 74 },
    { day: "Fri", bookings: 68 },
    { day: "Sat", bookings: 91 },
    { day: "Sun", bookings: 84 },
  ] as BookingActivityData[],

  revenue: {
    thisMonth: "₹18.42L",
    change: 9.6,
    trend: "up",
    breakdown: {
      completedServices: "₹15.8L",
      pendingPayments: "₹2.1L",
      refunds: "₹0.52L"
    }
  } as RevenueData,

  recentBookings: [
    {
      id: "#UC10241",
      customer: "Aarav Mehta",
      service: "Home Cleaning",
      vendor: "Ravi Kumar",
      date: "Today, 10:30 AM",
      amount: "₹1,299",
      status: "Confirmed"
    },
    {
      id: "#UC10240",
      customer: "Priya Sharma",
      service: "AC Service",
      vendor: "Amit Verma",
      date: "Today, 11:00 AM",
      amount: "₹799",
      status: "Completed"
    },
    {
      id: "#UC10239",
      customer: "Neha Gupta",
      service: "Salon at Home",
      vendor: "Pooja Singh",
      date: "Today, 12:30 PM",
      amount: "₹1,499",
      status: "Pending"
    }
  ] as RecentBooking[],

  pendingVendors: [
    {
      id: "v-1",
      name: "Ravi Sharma",
      serviceCategory: "Home Cleaning",
      appliedAgo: "18 min ago",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80"
    },
    {
      id: "v-2",
      name: "Anjali Verma",
      serviceCategory: "Beauty Services",
      appliedAgo: "42 min ago",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
    },
    {
      id: "v-3",
      name: "Mohit Singh",
      serviceCategory: "AC Repair",
      appliedAgo: "1 hr ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
    }
  ] as PendingVendor[],

  supportTickets: [
    {
      id: "#SUP-1042",
      issue: "Unable to update service availability",
      userType: "Customer",
      timeAgo: "12 min ago",
      status: "Open"
    },
    {
      id: "#SUP-1041",
      issue: "Payment deducted but booking failed",
      userType: "Customer",
      timeAgo: "28 min ago",
      status: "In Progress"
    },
    {
      id: "#SUP-1039",
      issue: "Need help updating profile",
      userType: "Vendor",
      timeAgo: "1 hr ago",
      status: "Waiting"
    }
  ] as SupportTicket[],

  recentReviews: [
    {
      id: "r-1",
      customer: "Priya Sharma",
      service: "Home Cleaning",
      rating: 5,
      text: "Professional arrived on time and completed everything neatly.",
      timeAgo: "14 min ago",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
    },
    {
      id: "r-2",
      customer: "Vikram Singh",
      service: "Plumbing",
      rating: 4,
      text: "Quick fix for the leak, but slightly expensive.",
      timeAgo: "1 hr ago",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80"
    }
  ] as RecentReview[],

  quickActions: [
    {
      id: "qa-1",
      label: "Add Service",
      description: "Create a new marketplace service",
      icon: "PlusCircle",
      action: "/admin/services/new"
    },
    {
      id: "qa-2",
      label: "Add Vendor",
      description: "Onboard a new professional manually",
      icon: "UserPlus",
      action: "/admin/vendors/new"
    },
    {
      id: "qa-3",
      label: "Create Offer",
      description: "Set up a new promotional campaign",
      icon: "Tag",
      action: "/admin/offers/new"
    },
    {
      id: "qa-4",
      label: "View Bookings",
      description: "See all active and past bookings",
      icon: "List",
      action: "/admin/bookings"
    }
  ] as QuickAction[],

  notifications: [
    {
      id: "n-1",
      title: "New vendor application received",
      description: "Ravi Sharma submitted a partner application",
      timeAgo: "8 min ago",
      icon: "UserPlus",
      unread: true
    },
    {
      id: "n-2",
      title: "Booking #UC1024 requires attention",
      description: "Customer requested a reschedule",
      timeAgo: "22 min ago",
      icon: "AlertCircle",
      unread: true
    },
    {
      id: "n-3",
      title: "Payment successfully processed",
      description: "Weekly vendor payout completed",
      timeAgo: "2 hrs ago",
      icon: "CheckCircle",
      unread: false
    }
  ] as AdminNotification[]
};
