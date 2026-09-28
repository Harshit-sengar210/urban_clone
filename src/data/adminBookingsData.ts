export type BookingStatus =
  | "pending"
  | "accepted"
  | "confirmed"
  | "service_started"
  | "completed"
  | "cancelled"
  | "rejected"
  | "no_show";

export type PaymentStatus =
  | "pending"
  | "authorized"
  | "paid"
  | "failed"
  | "partially_refunded"
  | "refunded"
  | "cash";

export interface BookingCustomerSnapshot {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface BookingVendorSnapshot {
  id: string;
  name: string;
  rating: number;
  verificationStatus: "pending" | "verified" | "suspended";
  avatar?: string;
}

export interface BookingServiceSnapshot {
  categoryId: string;
  serviceId: string;
  packageId: string;
  categoryName: string;
  serviceName: string;
  packageName: string;
  description: string;
  duration: number;
  includedItems: string[];
}

export interface BookingPricing {
  basePrice: number;
  addOns: number;
  discount: number;
  tax: number;
  platformFee: number;
  total: number;
  vendorEarning: number;
}

export interface BookingTimelineEvent {
  id: string;
  type: string;
  title: string;
  timestamp: string;
  actor: string;
  note?: string;
}

export interface AdminBooking {
  id: string;
  customer: BookingCustomerSnapshot;
  vendor: BookingVendorSnapshot;
  service: BookingServiceSnapshot;
  bookingDate: string;
  bookingTime: string;
  duration: number;
  address: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  paymentId?: string;
  pricing: BookingPricing;
  cancellationReason?: string;
  internalNote?: string;
  timeline: BookingTimelineEvent[];
  createdAt: string;
  updatedAt: string;
}

export const adminBookingsData = {
  summary: {
    total: 1284,
    today: 48,
    active: 126,
    completed: 1012,
    cancelled: 98,
    value: 1842000
  },
  
  bookings: [
    {
      id: "UC-10482",
      customer: {
        id: "CUST-101",
        name: "Rahul Sharma",
        email: "rahul@example.com",
        phone: "+91 9876543210"
      },
      vendor: {
        id: "VND-202",
        name: "Amit Cleaning Services",
        rating: 4.8,
        verificationStatus: "verified"
      },
      service: {
        categoryId: "CAT-1",
        serviceId: "SRV-1",
        packageId: "PKG-1",
        categoryName: "Cleaning",
        serviceName: "Home Cleaning",
        packageName: "Deep Cleaning",
        description: "Full deep cleaning of 3BHK",
        duration: 180,
        includedItems: ["Dusting", "Mopping", "Bathroom Deep Clean"]
      },
      bookingDate: "2026-09-26",
      bookingTime: "10:30 AM",
      duration: 180,
      address: "123, Palm Grove, Sector 50, Noida",
      status: "confirmed",
      paymentStatus: "paid",
      paymentMethod: "UPI",
      paymentId: "PAY-98765",
      pricing: {
        basePrice: 1499,
        addOns: 0,
        discount: 100,
        tax: 250,
        platformFee: 150,
        total: 1799,
        vendorEarning: 1300
      },
      timeline: [
        { id: "tl-1", type: "created", title: "Booking Created", timestamp: "2026-09-25T08:00:00Z", actor: "Customer" },
        { id: "tl-2", type: "accepted", title: "Accepted by Vendor", timestamp: "2026-09-25T08:15:00Z", actor: "Vendor" },
        { id: "tl-3", type: "confirmed", title: "Booking Confirmed", timestamp: "2026-09-25T08:15:10Z", actor: "System" }
      ],
      createdAt: "2026-09-25T08:00:00Z",
      updatedAt: "2026-09-25T08:15:10Z"
    },
    {
      id: "UC-10483",
      customer: {
        id: "CUST-102",
        name: "Priya Singh",
        email: "priya@example.com",
        phone: "+91 9988776655"
      },
      vendor: {
        id: "VND-203",
        name: "Neha Beauty Care",
        rating: 4.9,
        verificationStatus: "verified"
      },
      service: {
        categoryId: "CAT-2",
        serviceId: "SRV-2",
        packageId: "PKG-2",
        categoryName: "Beauty",
        serviceName: "Salon at Home",
        packageName: "Premium Facial",
        description: "60 min premium facial",
        duration: 60,
        includedItems: ["Cleansing", "Scrub", "Massage", "Pack"]
      },
      bookingDate: "2026-09-26",
      bookingTime: "02:00 PM",
      duration: 60,
      address: "45, Rosewood Apartments, Gurgaon",
      status: "pending",
      paymentStatus: "pending",
      paymentMethod: "Credit Card",
      pricing: {
        basePrice: 999,
        addOns: 200,
        discount: 0,
        tax: 150,
        platformFee: 100,
        total: 1449,
        vendorEarning: 1000
      },
      timeline: [
        { id: "tl-1", type: "created", title: "Booking Created", timestamp: "2026-09-26T07:00:00Z", actor: "Customer" }
      ],
      createdAt: "2026-09-26T07:00:00Z",
      updatedAt: "2026-09-26T07:00:00Z"
    },
    {
      id: "UC-10484",
      customer: {
        id: "CUST-103",
        name: "Vikram Malhotra",
        email: "vikram@example.com",
        phone: "+91 9123456789"
      },
      vendor: {
        id: "VND-204",
        name: "Ramesh AC Repairs",
        rating: 4.6,
        verificationStatus: "verified"
      },
      service: {
        categoryId: "CAT-3",
        serviceId: "SRV-3",
        packageId: "PKG-3",
        categoryName: "AC & Appliance",
        serviceName: "AC Service",
        packageName: "Basic AC Service",
        description: "Cleaning and gas check",
        duration: 45,
        includedItems: ["Filter clean", "Gas level check"]
      },
      bookingDate: "2026-09-25",
      bookingTime: "11:00 AM",
      duration: 45,
      address: "Villa 12, Sunrise Greens, Ghaziabad",
      status: "completed",
      paymentStatus: "paid",
      paymentMethod: "Cash",
      pricing: {
        basePrice: 499,
        addOns: 0,
        discount: 50,
        tax: 80,
        platformFee: 50,
        total: 579,
        vendorEarning: 450
      },
      timeline: [
        { id: "tl-1", type: "created", title: "Booking Created", timestamp: "2026-09-24T09:00:00Z", actor: "Customer" },
        { id: "tl-2", type: "accepted", title: "Accepted by Vendor", timestamp: "2026-09-24T09:20:00Z", actor: "Vendor" },
        { id: "tl-3", type: "started", title: "Service Started", timestamp: "2026-09-25T11:05:00Z", actor: "Vendor" },
        { id: "tl-4", type: "completed", title: "Service Completed", timestamp: "2026-09-25T11:55:00Z", actor: "Vendor" },
        { id: "tl-5", type: "paid", title: "Payment Collected", timestamp: "2026-09-25T11:56:00Z", actor: "Vendor" }
      ],
      createdAt: "2026-09-24T09:00:00Z",
      updatedAt: "2026-09-25T11:56:00Z"
    },
    {
      id: "UC-10485",
      customer: {
        id: "CUST-104",
        name: "Anjali Desai",
        email: "anjali@example.com",
        phone: "+91 9977553311"
      },
      vendor: {
        id: "VND-205",
        name: "Quick Plumbers",
        rating: 4.2,
        verificationStatus: "verified"
      },
      service: {
        categoryId: "CAT-4",
        serviceId: "SRV-4",
        packageId: "PKG-4",
        categoryName: "Plumbing",
        serviceName: "Pipe Leak Repair",
        packageName: "Standard Repair",
        description: "Fixing minor leaks",
        duration: 60,
        includedItems: ["Inspection", "Minor tape/seal repair"]
      },
      bookingDate: "2026-09-26",
      bookingTime: "04:30 PM",
      duration: 60,
      address: "B-402, Skyline Towers, Delhi",
      status: "cancelled",
      paymentStatus: "refunded",
      paymentMethod: "Wallet",
      pricing: {
        basePrice: 299,
        addOns: 0,
        discount: 0,
        tax: 54,
        platformFee: 49,
        total: 402,
        vendorEarning: 250
      },
      cancellationReason: "Scheduling Issue",
      timeline: [
        { id: "tl-1", type: "created", title: "Booking Created", timestamp: "2026-09-26T08:00:00Z", actor: "Customer" },
        { id: "tl-2", type: "cancelled", title: "Cancelled by Customer", timestamp: "2026-09-26T09:30:00Z", actor: "Customer", note: "Rescheduling for tomorrow" }
      ],
      createdAt: "2026-09-26T08:00:00Z",
      updatedAt: "2026-09-26T09:30:00Z"
    }
  ] as AdminBooking[]
};
