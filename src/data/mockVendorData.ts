import { VendorDashboardData, VendorService, VendorBooking, VendorEarning, VendorPayout, EarningsSummary, VendorProfile, VendorReview, ServiceRatingSummary, RatingDistribution, ReviewTrendPoint, FeedbackTheme, ReviewRating } from "@/types/vendor";

export const initialDashboardData: VendorDashboardData = {
  stats: {
    totalBookings: 12,
    bookingsChange: 2,
    totalEarnings: 24500,
    averageRating: 4.8,
    pendingBookings: 3,
  },
  liveBookingRequests: [
    {
      id: "req_1",
      customerName: "Sneha Verma",
      location: "Indirapuram, Ghaziabad",
      service: "Home Cleaning",
      subService: "Deep Cleaning",
      date: "Today",
      time: "10:00 AM – 12:00 PM",
      estimatedEarnings: 1200,
      status: "pending"
    },
    {
      id: "req_2",
      customerName: "Rohit Sharma",
      location: "Vaishali, Ghaziabad",
      service: "AC Repair",
      subService: "AC Service",
      date: "Today",
      time: "02:00 PM – 04:00 PM",
      estimatedEarnings: 2500,
      status: "pending"
    },
    {
      id: "req_3",
      customerName: "Priya Singh",
      location: "Kaushambi, Ghaziabad",
      service: "Deep Cleaning",
      subService: "Kitchen Cleaning",
      date: "Tomorrow",
      time: "09:00 AM – 11:00 AM",
      estimatedEarnings: 1800,
      status: "pending"
    }
  ],
  upcomingBookings: [
    {
      id: "upc_1",
      customerName: "Amit Verma",
      location: "Raj Nagar, Ghaziabad",
      service: "AC Repair",
      date: "Apr 26",
      time: "11:00 AM",
      estimatedEarnings: 1200,
      status: "confirmed"
    },
    {
      id: "upc_2",
      customerName: "Pooja Gupta",
      location: "Crossings Republik",
      service: "Deep Cleaning",
      date: "Apr 26",
      time: "02:00 PM",
      estimatedEarnings: 2500,
      status: "confirmed"
    },
    {
      id: "upc_3",
      customerName: "Rahul Kumar",
      location: "Vasundhara, Ghaziabad",
      service: "Home Painting",
      date: "Apr 27",
      time: "11:00 AM",
      estimatedEarnings: 3000,
      status: "confirmed"
    }
  ],
  recentBookings: [
    {
      id: "rec_1",
      customerName: "Rohit Sharma",
      location: "Vaishali",
      service: "AC Repair",
      date: "Today",
      time: "10:00 AM",
      estimatedEarnings: 1200,
      status: "confirmed"
    },
    {
      id: "rec_2",
      customerName: "Priya Singh",
      location: "Kaushambi",
      service: "Deep Cleaning",
      date: "Today",
      time: "02:00 PM",
      estimatedEarnings: 2500,
      status: "completed"
    },
    {
      id: "rec_3",
      customerName: "Amit Verma",
      location: "Indirapuram",
      service: "Home Painting",
      date: "Tomorrow",
      time: "11:00 AM",
      estimatedEarnings: 3000,
      status: "pending"
    }
  ],
  earnings: {
    total: 8750,
    percentageChange: 12,
    weeklyData: [
      { day: "Mon", amount: 1200 },
      { day: "Tue", amount: 2500 },
      { day: "Wed", amount: 1800 },
      { day: "Thu", amount: 3000 },
      { day: "Fri", amount: 250 },
      { day: "Sat", amount: 0 },
      { day: "Sun", amount: 0 },
    ]
  }
};

export const mockVendorServices: VendorService[] = [
  {
    id: "svc_1",
    categoryId: "cleaning",
    categoryName: "Cleaning",
    serviceName: "Home Cleaning",
    description: "Complete deep cleaning of your home including dusting, mopping, and sanitizing all surfaces. Ideal for regular maintenance.",
    startingPrice: 1200,
    duration: "2-3 hours",
    serviceType: "customer_location",
    experienceLevel: "3-5 years",
    skills: ["Deep Cleaning", "Dusting", "Sanitization"],
    status: "active",
    featured: true,
    updatedAt: "2 days ago"
  },
  {
    id: "svc_2",
    categoryId: "ac_repair",
    categoryName: "AC & Appliance Repair",
    serviceName: "AC Servicing",
    description: "Professional AC servicing including filter cleaning, coil washing, and gas level check for optimal cooling performance.",
    startingPrice: 599,
    duration: "45 mins",
    serviceType: "customer_location",
    experienceLevel: "5-10 years",
    skills: ["Filter Cleaning", "Gas Check", "Coil Wash"],
    status: "active",
    featured: false,
    updatedAt: "1 week ago"
  },
  {
    id: "svc_3",
    categoryId: "plumbing",
    categoryName: "Plumbing",
    serviceName: "Tap & Pipe Leak Repair",
    description: "Expert repair of leaking taps, pipes, and fixtures to prevent water wastage and damage to your property.",
    startingPrice: 299,
    duration: "30 mins",
    serviceType: "customer_location",
    skills: ["Leak Detection", "Pipe Fitting"],
    status: "active",
    featured: false,
    updatedAt: "3 days ago"
  },
  {
    id: "svc_4",
    categoryId: "electrician",
    categoryName: "Electrician",
    serviceName: "Switch & Socket Installation",
    description: "Safe and professional installation or replacement of electrical switches and sockets.",
    startingPrice: 199,
    duration: "1 hour",
    serviceType: "customer_location",
    skills: ["Wiring", "Installation"],
    status: "inactive",
    featured: false,
    updatedAt: "1 month ago"
  },
  {
    id: "svc_5",
    categoryId: "cleaning",
    categoryName: "Cleaning",
    serviceName: "Sofa Cleaning",
    description: "Deep shampoo cleaning of fabric sofas to remove stains, dirt, and allergens, restoring them to a fresh state.",
    startingPrice: 800,
    duration: "1.5 hours",
    serviceType: "customer_location",
    skills: ["Shampooing", "Stain Removal"],
    status: "active",
    featured: false,
    updatedAt: "5 days ago"
  }
];

export const mockVendorBookings: VendorBooking[] = [
  {
    id: "UC-1048",
    customerName: "Sneha Verma",
    serviceName: "Home Cleaning",
    subService: "Deep Cleaning",
    location: "Indirapuram, Ghaziabad",
    date: "2024-05-24", // Adjust format for native input if needed, or parse
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    status: "pending",
    amount: 1200,
    estimatedEarnings: 960,
    createdAt: "10 mins ago"
  },
  {
    id: "UC-1049",
    customerName: "Rahul Sharma",
    serviceName: "AC Repair",
    subService: "Gas Leak Fix",
    location: "Sector 62, Noida",
    date: "2024-05-24",
    startTime: "02:00 PM",
    endTime: "03:00 PM",
    status: "pending",
    amount: 1500,
    estimatedEarnings: 1200,
    createdAt: "25 mins ago"
  },
  {
    id: "UC-1045",
    customerName: "Priya Singh",
    serviceName: "Plumbing",
    subService: "Tap Leak Repair",
    location: "Vaishali, Ghaziabad",
    date: "2024-05-25",
    startTime: "11:00 AM",
    endTime: "11:45 AM",
    status: "confirmed",
    amount: 299,
    estimatedEarnings: 250,
    createdAt: "2 hours ago"
  },
  {
    id: "UC-1043",
    customerName: "Amit Kumar",
    serviceName: "Electrician",
    subService: "Fan Installation",
    location: "Sector 18, Noida",
    date: "2024-05-25",
    startTime: "04:00 PM",
    endTime: "05:00 PM",
    status: "confirmed",
    amount: 399,
    estimatedEarnings: 320,
    createdAt: "1 day ago"
  },
  {
    id: "UC-1042",
    customerName: "Neha Gupta",
    serviceName: "Home Cleaning",
    subService: "Sofa Cleaning",
    location: "Crossing Republik",
    date: "2024-05-26",
    startTime: "09:00 AM",
    endTime: "10:30 AM",
    status: "confirmed",
    amount: 800,
    estimatedEarnings: 640,
    createdAt: "1 day ago"
  },
  {
    id: "UC-1040",
    customerName: "Vikas Joshi",
    serviceName: "AC Servicing",
    subService: "Regular Service",
    location: "Indirapuram, Ghaziabad",
    date: "2024-05-24",
    startTime: "08:00 AM",
    endTime: "09:00 AM",
    status: "in_progress",
    amount: 599,
    estimatedEarnings: 480,
    createdAt: "3 days ago"
  },
  {
    id: "UC-1035",
    customerName: "Anjali Desai",
    serviceName: "Painting",
    subService: "1 Room Painting",
    location: "Sector 50, Noida",
    date: "2024-05-22",
    startTime: "10:00 AM",
    endTime: "05:00 PM",
    status: "completed",
    amount: 4500,
    estimatedEarnings: 3800,
    createdAt: "5 days ago"
  },
  {
    id: "UC-1030",
    customerName: "Rohan Kapoor",
    serviceName: "Electrician",
    subService: "MCB Repair",
    location: "Vasundhara, Ghaziabad",
    date: "2024-05-21",
    startTime: "12:00 PM",
    endTime: "01:00 PM",
    status: "completed",
    amount: 500,
    estimatedEarnings: 400,
    createdAt: "1 week ago"
  },
  {
    id: "UC-1025",
    customerName: "Meera Reddy",
    serviceName: "Plumbing",
    subService: "Water Tank Cleaning",
    location: "Sector 62, Noida",
    date: "2024-05-20",
    startTime: "09:00 AM",
    endTime: "11:00 AM",
    status: "cancelled",
    amount: 899,
    estimatedEarnings: 0,
    createdAt: "2 weeks ago"
  },
  {
    id: "UC-1021",
    customerName: "Sanjay Mishra",
    serviceName: "AC Repair",
    subService: "Compressor Check",
    location: "Kaushambi, Ghaziabad",
    date: "2024-05-18",
    startTime: "03:00 PM",
    endTime: "04:00 PM",
    status: "rejected",
    amount: 999,
    estimatedEarnings: 0,
    createdAt: "2 weeks ago"
  }
];

export const mockEarningsSummary: EarningsSummary = {
  totalEarnings: 84500,
  monthlyEarnings: 18750,
  pendingEarnings: 4200,
  availableForPayout: 7850
};

export const mockVendorEarnings: VendorEarning[] = [
  {
    id: "ERN-1001",
    bookingId: "UC-1048",
    serviceName: "Home Cleaning",
    customerName: "Sneha Verma",
    date: "Today",
    grossAmount: 1200,
    partnerEarnings: 960,
    status: "pending"
  },
  {
    id: "ERN-1002",
    bookingId: "UC-1035",
    serviceName: "Painting",
    customerName: "Anjali Desai",
    date: "5 days ago",
    grossAmount: 4500,
    partnerEarnings: 3800,
    status: "available"
  },
  {
    id: "ERN-1003",
    bookingId: "UC-1030",
    serviceName: "Electrician",
    customerName: "Rohan Kapoor",
    date: "1 week ago",
    grossAmount: 500,
    partnerEarnings: 400,
    status: "paid"
  },
  {
    id: "ERN-1004",
    bookingId: "UC-1015",
    serviceName: "AC Repair",
    customerName: "Karan Singh",
    date: "2 weeks ago",
    grossAmount: 2500,
    partnerEarnings: 2000,
    status: "paid"
  },
  {
    id: "ERN-1005",
    bookingId: "UC-1012",
    serviceName: "Deep Cleaning",
    customerName: "Priya Jain",
    date: "3 weeks ago",
    grossAmount: 1800,
    partnerEarnings: 1440,
    status: "paid"
  },
  {
    id: "ERN-1006",
    bookingId: "UC-1009",
    serviceName: "Plumbing",
    customerName: "Vikram Malhotra",
    date: "1 month ago",
    grossAmount: 600,
    partnerEarnings: 480,
    status: "refunded"
  }
];

export const mockVendorPayouts: VendorPayout[] = [
  {
    id: "PAY-004",
    date: "Today",
    amount: 7850,
    method: "Bank Account",
    maskedAccount: "•••• 4821",
    status: "pending"
  },
  {
    id: "PAY-003",
    date: "Sep 15",
    amount: 5000,
    method: "Bank Account",
    maskedAccount: "•••• 4821",
    status: "paid"
  },
  {
    id: "PAY-002",
    date: "Sep 01",
    amount: 4500,
    method: "Bank Account",
    maskedAccount: "•••• 4821",
    status: "paid"
  },
  {
    id: "PAY-001",
    date: "Aug 15",
    amount: 6200,
    method: "Bank Account",
    maskedAccount: "•••• 4821",
    status: "paid"
  }
];

export const mockChartData = [
  { label: "Week 1", amount: 4200 },
  { label: "Week 2", amount: 3800 },
  { label: "Week 3", amount: 5500 },
  { label: "Week 4", amount: 5250 }
];

export const mockServiceEarnings = [
  { service: "Home Cleaning", amount: 6500, percentage: 35, color: "bg-indigo-500" },
  { service: "AC Repair", amount: 4200, percentage: 22, color: "bg-blue-500" },
  { service: "Deep Cleaning", amount: 3750, percentage: 20, color: "bg-emerald-500" },
  { service: "Electrician", amount: 2500, percentage: 13, color: "bg-amber-500" },
  { service: "Other Services", amount: 1800, percentage: 10, color: "bg-slate-400" }
];

export const mockVendorProfile: VendorProfile = {
  id: "UC-PR-8812",
  applicationStatus: "under_review",
  personal: {
    fullName: "Harsh Sharma",
    avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=256&auto=format&fit=crop",
    dateOfBirth: "1990-05-15",
    gender: "Male",
    mobile: "+91 98765 43210",
    email: "harsh.sharma@example.com",
    alternatePhone: "+91 99887 76655"
  },
  professional: {
    profileType: "Individual Professional",
    displayName: "Harsh Electricals & Maintenance",
    description: "Experienced home service professional providing reliable electrical and maintenance services across the local service area. Dedicated to quality and safety.",
  },
  services: mockVendorServices.filter(s => s.status === "active"),
  serviceArea: {
    primaryCity: "Delhi NCR",
    radiusKm: 10,
    additionalAreas: ["Noida", "Ghaziabad", "East Delhi"]
  },
  experience: {
    years: 5,
    skills: ["Electrical Repair", "Installation", "Maintenance", "Troubleshooting", "Home Improvement"],
    strengths: ["Reliable", "Flexible Scheduling", "Attention to Detail"]
  },
  certifications: [
    {
      id: "CERT-1",
      name: "Master Electrician",
      organization: "State Technical Board",
      year: "2019",
      status: "Verified"
    },
    {
      id: "CERT-2",
      name: "Safety Standards Level 2",
      organization: "National Safety Council",
      year: "2021",
      status: "Submitted"
    }
  ],
  portfolio: [
    { id: "P-1", url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&q=80", title: "Living Room Lighting", category: "Electrical" },
    { id: "P-2", url: "https://images.unsplash.com/photo-1581092921461-7031e4bf0e5e?w=500&q=80", title: "Circuit Board Panel", category: "Installation" },
    { id: "P-3", url: "https://images.unsplash.com/photo-1558227691-41ea78d1f631?w=500&q=80", title: "Smart Home Setup", category: "Electrical" },
    { id: "P-4", url: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=500&q=80", title: "Fan Installation", category: "Maintenance" }
  ],
  verification: {
    status: "under_review",
    progress: 86
  },
  payout: {
    bankMasked: "•••• •••• 4821",
    ifscMasked: "••••••1234",
    upiMasked: "har•••@upi",
    status: "Configured"
  },
  availability: {
    autoAccept: true,
    sameDay: true,
    maxBookingsPerDay: 6,
    schedule: [
      { day: "Mon", hours: "09:00 - 18:00", isAvailable: true },
      { day: "Tue", hours: "09:00 - 18:00", isAvailable: true },
      { day: "Wed", hours: "09:00 - 18:00", isAvailable: true },
      { day: "Thu", hours: "09:00 - 18:00", isAvailable: true },
      { day: "Fri", hours: "09:00 - 18:00", isAvailable: true },
      { day: "Sat", hours: "10:00 - 16:00", isAvailable: true },
      { day: "Sun", hours: "", isAvailable: false },
    ]
  }
};

export const mockAvailabilitySettings: any = {
  acceptingBookings: true,
  bookingBufferMinutes: 30,
  maxBookingsPerDay: 6,
  allowSameDayBookings: true,
  minimumNoticeHours: 2,
  advanceBookingDays: 30,
  weeklySchedule: [
    {
      day: "monday",
      enabled: true,
      ranges: [{ id: "r1", start: "09:00", end: "18:00" }],
      breaks: [{ id: "b1", start: "13:00", end: "14:00", label: "Lunch Break" }]
    },
    {
      day: "tuesday",
      enabled: true,
      ranges: [{ id: "r2", start: "09:00", end: "18:00" }],
      breaks: [{ id: "b2", start: "13:00", end: "14:00", label: "Lunch Break" }]
    },
    {
      day: "wednesday",
      enabled: true,
      ranges: [{ id: "r3", start: "09:00", end: "18:00" }],
      breaks: [{ id: "b3", start: "13:00", end: "14:00", label: "Lunch Break" }]
    },
    {
      day: "thursday",
      enabled: true,
      ranges: [{ id: "r4", start: "09:00", end: "18:00" }],
      breaks: [{ id: "b4", start: "13:00", end: "14:00", label: "Lunch Break" }]
    },
    {
      day: "friday",
      enabled: true,
      ranges: [{ id: "r5", start: "09:00", end: "18:00" }],
      breaks: [{ id: "b5", start: "13:00", end: "14:00", label: "Lunch Break" }]
    },
    {
      day: "saturday",
      enabled: true,
      ranges: [{ id: "r6", start: "10:00", end: "16:00" }],
      breaks: []
    },
    {
      day: "sunday",
      enabled: false,
      ranges: [],
      breaks: []
    }
  ],
  timeOff: [
    {
      id: "to1",
      startDate: "2026-12-25",
      endDate: "2026-12-28",
      reason: "Holiday",
      note: "Christmas holidays"
    }
  ],
  overrides: [
    {
      id: "ov1",
      date: "2026-10-15",
      enabled: true,
      ranges: [{ id: "ro1", start: "12:00", end: "16:00" }],
      breaks: []
    }
  ]
};

// ─── Mock Review Data ─────────────────────────────────────────────────────────

export const mockVendorReviews: VendorReview[] = [
  {
    id: "rev-001",
    customerDisplayName: "Priya S.",
    customerAvatarColor: "#6366f1",
    rating: 5 as ReviewRating,
    reviewText: "Excellent service! Harsh arrived right on time and fixed the electrical issue within an hour. Very professional and clean work. Will definitely hire again.",
    serviceName: "Electrical Repair",
    serviceId: "svc-electrical",
    createdAt: "2026-09-12T10:30:00Z",
    reply: {
      text: "Thank you so much Priya! It was a pleasure working with you. I'm glad the issue was resolved quickly. Looking forward to helping again!",
      createdAt: "2026-09-13T09:00:00Z"
    }
  },
  {
    id: "rev-002",
    customerDisplayName: "Rahul M.",
    customerAvatarColor: "#10b981",
    rating: 5 as ReviewRating,
    reviewText: "Got my 3 ceiling fans installed perfectly. Each one balanced and running silently. Great attention to detail.",
    serviceName: "Fan Installation",
    serviceId: "svc-fan",
    createdAt: "2026-09-10T15:00:00Z"
  },
  {
    id: "rev-003",
    customerDisplayName: "Anjali R.",
    customerAvatarColor: "#f59e0b",
    rating: 4 as ReviewRating,
    reviewText: "Very good service overall. The lighting setup looks beautiful. Took slightly longer than estimated but the quality was worth it.",
    serviceName: "Lighting Installation",
    serviceId: "svc-lighting",
    createdAt: "2026-09-08T14:00:00Z",
    reply: {
      text: "Thank you Anjali! Sorry about the extra time — we ensured everything was perfectly calibrated. Really happy you love the result!",
      createdAt: "2026-09-09T08:00:00Z",
      updatedAt: "2026-09-09T10:00:00Z"
    }
  },
  {
    id: "rev-004",
    customerDisplayName: "Vikram K.",
    customerAvatarColor: "#8b5cf6",
    rating: 5 as ReviewRating,
    reviewText: "Best home maintenance experience I've had. Professional, punctual, and thorough. Highly recommend to anyone in the area.",
    serviceName: "Home Maintenance",
    serviceId: "svc-maintenance",
    createdAt: "2026-09-05T11:00:00Z"
  },
  {
    id: "rev-005",
    customerDisplayName: "Nisha D.",
    customerAvatarColor: "#ec4899",
    rating: 5 as ReviewRating,
    reviewText: "Wiring job done perfectly. No exposed wires, everything organized. He even explained what he was doing which I appreciated.",
    serviceName: "Electrical Repair",
    serviceId: "svc-electrical",
    createdAt: "2026-09-02T09:30:00Z"
  },
  {
    id: "rev-006",
    customerDisplayName: "Arun T.",
    customerAvatarColor: "#06b6d4",
    rating: 3 as ReviewRating,
    reviewText: "Work was decent but communication could be better. Arrived 30 minutes late without informing. The end result was acceptable.",
    serviceName: "Fan Installation",
    serviceId: "svc-fan",
    createdAt: "2026-08-28T16:00:00Z"
  },
  {
    id: "rev-007",
    customerDisplayName: "Meera V.",
    customerAvatarColor: "#84cc16",
    rating: 5 as ReviewRating,
    reviewText: "Absolutely wonderful! The new LED panel lighting transformed our living room completely. Very skilled and tidy work.",
    serviceName: "Lighting Installation",
    serviceId: "svc-lighting",
    createdAt: "2026-08-25T13:00:00Z",
    reply: {
      text: "So happy to hear that Meera! LED panel lighting really does make a huge difference. Thank you for the kind words!",
      createdAt: "2026-08-26T08:30:00Z"
    }
  },
  {
    id: "rev-008",
    customerDisplayName: "Sanjay B.",
    customerAvatarColor: "#f97316",
    rating: 4 as ReviewRating,
    reviewText: "Good experience. Minor issue with the switch box cover fitting but he came back the next day and fixed it without any extra charge. Appreciated.",
    serviceName: "Electrical Repair",
    serviceId: "svc-electrical",
    createdAt: "2026-08-20T10:00:00Z"
  },
  {
    id: "rev-009",
    customerDisplayName: "Deepika A.",
    customerAvatarColor: "#6366f1",
    rating: 5 as ReviewRating,
    reviewText: "Hired for a complete room renovation electrical work. Everything done to perfection. Very knowledgeable and safety-conscious.",
    serviceName: "Electrical Repair",
    serviceId: "svc-electrical",
    createdAt: "2026-08-15T14:30:00Z"
  },
  {
    id: "rev-010",
    customerDisplayName: "Kiran P.",
    customerAvatarColor: "#10b981",
    rating: 4 as ReviewRating,
    reviewText: "Fan installation went well. Neat and efficient. Could have cleaned up the drill residue before leaving.",
    serviceName: "Fan Installation",
    serviceId: "svc-fan",
    createdAt: "2026-08-10T11:00:00Z"
  },
  {
    id: "rev-011",
    customerDisplayName: "Rohit N.",
    customerAvatarColor: "#8b5cf6",
    rating: 2 as ReviewRating,
    reviewText: "Not happy with the experience. Had to call him twice to fix an issue he should have caught the first time. Room for improvement.",
    serviceName: "Home Maintenance",
    serviceId: "svc-maintenance",
    createdAt: "2026-08-05T09:00:00Z"
  },
  {
    id: "rev-012",
    customerDisplayName: "Sunita G.",
    customerAvatarColor: "#ec4899",
    rating: 5 as ReviewRating,
    reviewText: "Outstanding work on the outdoor lighting. Everything waterproofed properly. Very reliable and professional.",
    serviceName: "Lighting Installation",
    serviceId: "svc-lighting",
    createdAt: "2026-07-28T16:00:00Z",
    reply: {
      text: "Thank you Sunita! Outdoor lighting requires extra care with weatherproofing and I'm glad that came through. Appreciate your trust!",
      createdAt: "2026-07-29T09:00:00Z"
    }
  },
  {
    id: "rev-013",
    customerDisplayName: "Pankaj L.",
    customerAvatarColor: "#f59e0b",
    rating: 5 as ReviewRating,
    reviewText: "Emergency electrical fault fixed within 2 hours of booking. Incredibly responsive and skilled. Real lifesaver.",
    serviceName: "Electrical Repair",
    serviceId: "svc-electrical",
    createdAt: "2026-07-20T20:00:00Z"
  },
  {
    id: "rev-014",
    customerDisplayName: "Geeta S.",
    customerAvatarColor: "#06b6d4",
    rating: 3 as ReviewRating,
    reviewText: "Average experience. The work was done but the pricing wasn't very clear upfront. Would be good to get a detailed quote beforehand.",
    serviceName: "Home Maintenance",
    serviceId: "svc-maintenance",
    createdAt: "2026-07-15T12:00:00Z"
  },
  {
    id: "rev-015",
    customerDisplayName: "Amit K.",
    customerAvatarColor: "#84cc16",
    rating: 5 as ReviewRating,
    reviewText: "Had 5 fans installed. All perfectly balanced and working great. He even helped move some furniture to get access. Above and beyond.",
    serviceName: "Fan Installation",
    serviceId: "svc-fan",
    createdAt: "2026-07-10T10:00:00Z"
  },
  {
    id: "rev-016",
    customerDisplayName: "Rekha M.",
    customerAvatarColor: "#f97316",
    rating: 4 as ReviewRating,
    reviewText: "Good, clean work on our kitchen lights. Came on time and was respectful of our space. Minor wire management could have been neater.",
    serviceName: "Lighting Installation",
    serviceId: "svc-lighting",
    createdAt: "2026-07-05T14:00:00Z"
  },
  {
    id: "rev-017",
    customerDisplayName: "Suresh P.",
    customerAvatarColor: "#6366f1",
    rating: 5 as ReviewRating,
    reviewText: "Full house wiring inspection and fixes. Very thorough, identified potential hazards we weren't even aware of. Professional and trustworthy.",
    serviceName: "Electrical Repair",
    serviceId: "svc-electrical",
    createdAt: "2026-06-28T11:00:00Z"
  },
  {
    id: "rev-018",
    customerDisplayName: "Kavita H.",
    customerAvatarColor: "#10b981",
    rating: 1 as ReviewRating,
    reviewText: "Very disappointing. Came late, work was rushed. Had to hire someone else to redo part of the installation.",
    serviceName: "Fan Installation",
    serviceId: "svc-fan",
    createdAt: "2026-06-20T09:00:00Z"
  }
];

export const mockRatingDistribution: RatingDistribution[] = [
  { rating: 5 as ReviewRating, count: 98, percentage: 78 },
  { rating: 4 as ReviewRating, count: 18, percentage: 14 },
  { rating: 3 as ReviewRating, count: 6, percentage: 5 },
  { rating: 2 as ReviewRating, count: 2, percentage: 2 },
  { rating: 1 as ReviewRating, count: 2, percentage: 1 },
];

export const mockServiceRatings: ServiceRatingSummary[] = [
  { serviceId: "svc-electrical", serviceName: "Electrical Repair", averageRating: 4.9, reviewCount: 62, trend: "up" },
  { serviceId: "svc-fan", serviceName: "Fan Installation", averageRating: 4.8, reviewCount: 38, trend: "stable" },
  { serviceId: "svc-lighting", serviceName: "Lighting Installation", averageRating: 4.7, reviewCount: 24, trend: "up" },
  { serviceId: "svc-maintenance", serviceName: "Home Maintenance", averageRating: 4.5, reviewCount: 18, trend: "down" },
];

export const mockReviewTrend: ReviewTrendPoint[] = [
  { label: "Jan", rating: 4.5, count: 4 },
  { label: "Feb", rating: 4.6, count: 7 },
  { label: "Mar", rating: 4.5, count: 9 },
  { label: "Apr", rating: 4.7, count: 11 },
  { label: "May", rating: 4.8, count: 12 },
  { label: "Jun", rating: 4.7, count: 14 },
  { label: "Jul", rating: 4.8, count: 18 },
  { label: "Aug", rating: 4.9, count: 22 },
  { label: "Sep", rating: 4.8, count: 16 },
];

export const mockFeedbackThemes: FeedbackTheme[] = [
  { label: "On-time service", mentions: 78, type: "positive" },
  { label: "Professional behavior", mentions: 61, type: "positive" },
  { label: "Quality of work", mentions: 54, type: "positive" },
  { label: "Communication", mentions: 43, type: "positive" },
  { label: "Clean workspace", mentions: 31, type: "positive" },
  { label: "Scheduling", mentions: 8, type: "improvement" },
  { label: "Pricing clarity", mentions: 5, type: "improvement" },
  { label: "Arrival timing", mentions: 4, type: "improvement" },
];
