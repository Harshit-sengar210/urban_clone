export type VendorStatus =
  | "pending"
  | "approved"
  | "needs_changes"
  | "suspended"
  | "rejected";

export interface AdminVendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  businessName: string;
  businessType: "individual" | "agency";
  services: string[];
  primaryCategory: string;
  city: string;
  status: VendorStatus;
  rating: number;
  reviewCount: number;
  bookingCount: number;
  totalEarnings: number;
  joinedAt: string;
  lastActiveAt: string;
  applicationProgress: number; // 0-100
  submittedAt?: string;
  rawData?: any;
}

export interface VendorService {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number; // minutes
  status: "Active" | "Inactive";
}

export interface VendorBooking {
  id: string;
  customer: string;
  service: string;
  date: string;
  amount: number;
  status: "Completed" | "Upcoming" | "Cancelled";
}

export interface VendorReview {
  id: string;
  customer: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
}

export interface VendorActivity {
  id: string;
  event: string;
  timestamp: string;
}

export interface VendorEarnings {
  total: number;
  thisMonth: number;
  pending: number;
  completedPayouts: number;
}

export const adminVendorsData = {
  summary: [
    { id: "total", label: "Total Vendors", value: "1,284", change: 5.7, trend: "up" as const, icon: "Users" },
    { id: "pending", label: "Pending Approval", value: "42", change: 8.2, trend: "up" as const, icon: "Clock" },
    { id: "approved", label: "Approved Vendors", value: "1,167", change: 6.4, trend: "up" as const, icon: "CheckCircle" },
    { id: "attention", label: "Needs Attention", value: "49", change: -2.1, trend: "down" as const, icon: "AlertCircle" }
  ],
  
  vendors: [
    {
      id: "VND1024",
      name: "Ravi Sharma",
      email: "ra****@example.com",
      phone: "+91 98****21",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80",
      businessName: "Ravi Home Care",
      businessType: "individual",
      services: ["Home Cleaning", "AC Service"],
      primaryCategory: "Cleaning",
      city: "Noida",
      status: "approved",
      rating: 4.8,
      reviewCount: 182,
      bookingCount: 182,
      totalEarnings: 842000,
      joinedAt: "12 Aug 2026",
      lastActiveAt: "Today, 9:42 AM",
      applicationProgress: 100,
      submittedAt: "10 Aug 2026"
    },
    {
      id: "VND1025",
      name: "Meera Patel",
      email: "me****@example.com",
      phone: "+91 99****33",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
      businessName: "Meera Beauty Studio",
      businessType: "agency",
      services: ["Salon at Home", "Bridal Makeup"],
      primaryCategory: "Beauty",
      city: "Delhi",
      status: "pending",
      rating: 0,
      reviewCount: 0,
      bookingCount: 0,
      totalEarnings: 0,
      joinedAt: "18 Sep 2026",
      lastActiveAt: "Yesterday, 2:15 PM",
      applicationProgress: 92,
      submittedAt: "18 min ago"
    },
    {
      id: "VND1026",
      name: "Amit Kumar",
      email: "am****@example.com",
      phone: "+91 91****55",
      businessName: "Amit Plumbers",
      businessType: "individual",
      services: ["Plumbing", "Pipe Repair"],
      primaryCategory: "Plumbing",
      city: "Gurgaon",
      status: "needs_changes",
      rating: 0,
      reviewCount: 0,
      bookingCount: 0,
      totalEarnings: 0,
      joinedAt: "15 Sep 2026",
      lastActiveAt: "16 Sep 2026, 11:30 AM",
      applicationProgress: 80,
      submittedAt: "15 Sep 2026"
    },
    {
      id: "VND1027",
      name: "Sunil Verma",
      email: "su****@example.com",
      phone: "+91 98****88",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
      businessName: "Verma Electricals",
      businessType: "individual",
      services: ["Wiring", "Appliance Repair"],
      primaryCategory: "Electrical",
      city: "Ghaziabad",
      status: "suspended",
      rating: 3.8,
      reviewCount: 45,
      bookingCount: 60,
      totalEarnings: 45000,
      joinedAt: "10 Feb 2025",
      lastActiveAt: "10 Aug 2026, 9:00 AM",
      applicationProgress: 100,
      submittedAt: "08 Feb 2025"
    },
    {
      id: "VND1028",
      name: "Sneha Reddy",
      email: "sn****@example.com",
      phone: "+91 99****12",
      businessName: "Sneha Painters",
      businessType: "individual",
      services: ["Wall Painting", "Texture Painting"],
      primaryCategory: "Painting",
      city: "Delhi",
      status: "rejected",
      rating: 0,
      reviewCount: 0,
      bookingCount: 0,
      totalEarnings: 0,
      joinedAt: "01 Sep 2026",
      lastActiveAt: "02 Sep 2026",
      applicationProgress: 50,
      submittedAt: "01 Sep 2026"
    }
  ] as AdminVendor[],

  demoServices: [
    { id: "srv-1", name: "Home Cleaning", category: "Cleaning", price: 799, duration: 90, status: "Active" },
    { id: "srv-2", name: "AC Service", category: "AC & Appliance", price: 499, duration: 60, status: "Active" }
  ] as VendorService[],

  demoBookings: [
    { id: "#UC10241", customer: "Aarav Mehta", service: "Home Cleaning", date: "Today", amount: 1299, status: "Completed" },
    { id: "#UC10242", customer: "Priya Sharma", service: "AC Service", date: "Yesterday", amount: 799, status: "Completed" },
    { id: "#UC10243", customer: "Rahul Verma", service: "Home Cleaning", date: "Tomorrow", amount: 999, status: "Upcoming" }
  ] as VendorBooking[],

  demoReviews: [
    { id: "rev-1", customer: "Aarav Mehta", service: "Home Cleaning", rating: 5, comment: "Professional service and good experience.", date: "17 Sep 2026" },
    { id: "rev-2", customer: "Priya Sharma", service: "AC Service", rating: 4, comment: "Service was completed on time.", date: "15 Sep 2026" }
  ] as VendorReview[],
  
  demoEarnings: {
    total: 842000,
    thisMonth: 64820,
    pending: 12400,
    completedPayouts: 24
  } as VendorEarnings,
};
