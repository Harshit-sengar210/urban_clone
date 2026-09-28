export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: "active" | "suspended" | "disabled";
  joinedAt: string;
  lastActiveAt: string;
  bookingCount: number;
  completedBookings: number;
  cancelledBookings: number;
  totalSpend: number;
  favoriteServices: string[];
}

export interface UserBooking {
  id: string;
  service: string;
  date: string;
  amount: number;
  status: "Confirmed" | "Completed" | "Pending" | "Cancelled";
}

export interface UserActivity {
  id: string;
  event: string;
  timestamp: string;
  type: "view" | "booking" | "account" | "review";
}

export interface UserReview {
  id: string;
  service: string;
  rating: number;
  text: string;
  timestamp: string;
}

export const adminUsersData = {
  summary: [
    { id: "total", label: "Total Users", value: "24,892", change: 8.4, trend: "up" as const, icon: "Users" },
    { id: "active", label: "Active Users", value: "22,417", change: 6.9, trend: "up" as const, icon: "UserCheck" },
    { id: "new", label: "New This Month", value: "1,284", change: 12.4, trend: "up" as const, icon: "UserPlus" },
    { id: "suspended", label: "Suspended", value: "191", change: -3.2, trend: "down" as const, icon: "UserMinus" }
  ],
  
  users: [
    {
      id: "USR10241",
      name: "Aarav Mehta",
      email: "aarav@example.com",
      phone: "+91 9876543210",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80",
      status: "active",
      joinedAt: "18 Sep 2026",
      lastActiveAt: "Today, 10:24 AM",
      bookingCount: 12,
      completedBookings: 10,
      cancelledBookings: 1,
      totalSpend: 18420,
      favoriteServices: ["Home Cleaning", "AC Service", "Salon at Home"]
    },
    {
      id: "USR10242",
      name: "Priya Sharma",
      email: "priya.s@example.com",
      phone: "+91 9988776655",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
      status: "active",
      joinedAt: "12 Aug 2026",
      lastActiveAt: "Yesterday, 4:15 PM",
      bookingCount: 5,
      completedBookings: 5,
      cancelledBookings: 0,
      totalSpend: 4500,
      favoriteServices: ["Plumbing", "Pest Control"]
    },
    {
      id: "USR10243",
      name: "Rahul Verma",
      email: "rahul.v@example.com",
      phone: "+91 9123456789",
      status: "suspended",
      joinedAt: "05 Jan 2026",
      lastActiveAt: "22 Sep 2026, 11:30 AM",
      bookingCount: 2,
      completedBookings: 1,
      cancelledBookings: 1,
      totalSpend: 1299,
      favoriteServices: ["Electrician"]
    },
    {
      id: "USR10244",
      name: "Neha Gupta",
      email: "neha.g@example.com",
      phone: "+91 9871234567",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
      status: "disabled",
      joinedAt: "10 Feb 2025",
      lastActiveAt: "10 Aug 2026, 9:00 AM",
      bookingCount: 15,
      completedBookings: 12,
      cancelledBookings: 3,
      totalSpend: 25600,
      favoriteServices: ["Beauty Services", "Massage"]
    },
    {
      id: "USR10245",
      name: "Vikram Singh",
      email: "vikram.s@example.com",
      phone: "+91 9998887776",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
      status: "active",
      joinedAt: "20 Sep 2026",
      lastActiveAt: "Just now",
      bookingCount: 1,
      completedBookings: 0,
      cancelledBookings: 0,
      totalSpend: 0,
      favoriteServices: ["Appliance Repair"]
    },
    {
      id: "USR10246",
      name: "Anjali Desai",
      email: "anjali.d@example.com",
      phone: "+91 9876543123",
      status: "active",
      joinedAt: "01 Mar 2026",
      lastActiveAt: "Today, 8:45 AM",
      bookingCount: 8,
      completedBookings: 8,
      cancelledBookings: 0,
      totalSpend: 12500,
      favoriteServices: ["Home Cleaning", "Painting"]
    }
  ] as AdminUser[],

  demoBookings: [
    {
      id: "#UC10241",
      service: "Home Cleaning",
      date: "18 Sep 2026",
      amount: 1299,
      status: "Completed"
    },
    {
      id: "#UC10217",
      service: "AC Service",
      date: "15 Sep 2026",
      amount: 799,
      status: "Completed"
    }
  ] as UserBooking[],

  demoActivity: [
    {
      id: "act-1",
      event: "Viewed Home Cleaning",
      timestamp: "Today, 11:24 AM",
      type: "view"
    },
    {
      id: "act-2",
      event: "Booking #UC10241 completed",
      timestamp: "Today, 10:18 AM",
      type: "booking"
    },
    {
      id: "act-3",
      event: "Updated address",
      timestamp: "Yesterday, 7:42 PM",
      type: "account"
    },
    {
      id: "act-4",
      event: "Created account",
      timestamp: "18 Sep 2026",
      type: "account"
    }
  ] as UserActivity[],

  demoReviews: [
    {
      id: "rev-1",
      service: "Home Cleaning",
      rating: 5,
      text: "Professional service and good experience.",
      timestamp: "17 Sep 2026"
    },
    {
      id: "rev-2",
      service: "AC Service",
      rating: 4,
      text: "Service was completed on time.",
      timestamp: "15 Sep 2026"
    }
  ] as UserReview[]
};
