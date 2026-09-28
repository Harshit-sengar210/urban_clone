export type BookingStatus =
  | "pending"
  | "confirmed"
  | "assigned"
  | "on_the_way"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "rescheduled"
  | "rejected"
  | "pending_payment";

export type PaymentStatus = "paid" | "pending" | "refunded" | "failed";

export interface BookingReview {
  rating: number;
  comment: string;
  submittedAt: string;
}

export interface CancellationPolicy {
  freeUntil: string; // e.g. "Before 9:00 AM on booking day"
  refundable: boolean;
}

export interface Booking {
  id: string;
  serviceSlug: string;
  service: string;
  category: string;
  image: string;
  professional: string | null;
  professionalRating: number | null;
  date: string; // ISO string
  time: string;
  status: BookingStatus;
  amount: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  address: string;
  addressType: string;
  createdAt: string; // ISO string
  review: BookingReview | null;
  cancellationPolicy: CancellationPolicy;
  estimatedArrival?: string;
}

export const DEMO_BOOKINGS_FULL: Booking[] = [
  {
    id: "UC-2026-00191",
    serviceSlug: "ac-service-repair",
    service: "AC Service & Repair",
    category: "AC & Appliances",
    image: "https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?w=400&q=80",
    professional: null,
    professionalRating: null,
    date: "2026-09-22T10:30:00",
    time: "10:30 AM",
    status: "confirmed",
    amount: 699,
    paymentStatus: "paid",
    address: "Flat 4B, Alpine Apartments, Sec 42",
    addressType: "Home",
    createdAt: "2026-09-17T08:00:00",
    review: null,
    cancellationPolicy: { freeUntil: "Before 9:00 AM on booking day", refundable: true },
  },
  {
    id: "UC-2026-00188",
    serviceSlug: "intense-home-cleaning",
    service: "Intense Home Cleaning",
    category: "Cleaning",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80",
    professional: "Priya Sharma",
    professionalRating: 4.8,
    date: "2026-09-20T14:00:00",
    time: "2:00 PM",
    status: "on_the_way",
    amount: 1499,
    paymentStatus: "paid",
    address: "Tech Park, Building C, Floor 2",
    addressType: "Work",
    createdAt: "2026-09-15T10:00:00",
    review: null,
    cancellationPolicy: { freeUntil: "Before 9:00 AM on booking day", refundable: true },
    estimatedArrival: "10–15 mins",
  },
  {
    id: "UC-2026-00182",
    serviceSlug: "salon-at-home-women",
    service: "Salon at Home for Women",
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",
    professional: "Neha Kapoor",
    professionalRating: 4.9,
    date: "2026-09-12T11:00:00",
    time: "11:00 AM",
    status: "completed",
    amount: 899,
    paymentStatus: "paid",
    address: "Flat 4B, Alpine Apartments, Sec 42",
    addressType: "Home",
    createdAt: "2026-09-09T09:00:00",
    review: { rating: 5, comment: "Excellent service! Very professional.", submittedAt: "2026-09-12T14:00:00" },
    cancellationPolicy: { freeUntil: "Before 9:00 AM on booking day", refundable: false },
  },
  {
    id: "UC-2026-00179",
    serviceSlug: "plumbing-repair",
    service: "Plumbing Service",
    category: "Plumbing",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    professional: "Amit Singh",
    professionalRating: 4.6,
    date: "2026-09-09T14:00:00",
    time: "2:00 PM",
    status: "completed",
    amount: 799,
    paymentStatus: "paid",
    address: "Flat 4B, Alpine Apartments, Sec 42",
    addressType: "Home",
    createdAt: "2026-09-07T11:00:00",
    review: null,
    cancellationPolicy: { freeUntil: "Before 9:00 AM on booking day", refundable: false },
  },
  {
    id: "UC-2026-00175",
    serviceSlug: "wall-painting",
    service: "Full Home Painting",
    category: "Painting",
    image: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400&q=80",
    professional: null,
    professionalRating: null,
    date: "2026-09-07T10:00:00",
    time: "10:00 AM",
    status: "cancelled",
    amount: 1299,
    paymentStatus: "refunded",
    address: "Flat 4B, Alpine Apartments, Sec 42",
    addressType: "Home",
    createdAt: "2026-09-04T10:00:00",
    review: null,
    cancellationPolicy: { freeUntil: "Before 9:00 AM on booking day", refundable: true },
  },
  {
    id: "UC-2026-00170",
    serviceSlug: "deep-home-cleaning",
    service: "Deep Home Cleaning",
    category: "Cleaning",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80",
    professional: "Sunita Yadav",
    professionalRating: 4.7,
    date: "2026-09-01T09:00:00",
    time: "9:00 AM",
    status: "completed",
    amount: 2199,
    paymentStatus: "paid",
    address: "Flat 4B, Alpine Apartments, Sec 42",
    addressType: "Home",
    createdAt: "2026-08-29T08:00:00",
    review: { rating: 4, comment: "Good work, very thorough.", submittedAt: "2026-09-01T16:00:00" },
    cancellationPolicy: { freeUntil: "Before 9:00 AM on booking day", refundable: false },
  },
  {
    id: "UC-2026-00165",
    serviceSlug: "electrician-service",
    service: "Electrician Service",
    category: "Electrical",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80",
    professional: "Rajesh Kumar",
    professionalRating: 4.5,
    date: "2026-08-25T11:00:00",
    time: "11:00 AM",
    status: "completed",
    amount: 549,
    paymentStatus: "paid",
    address: "Tech Park, Building C, Floor 2",
    addressType: "Work",
    createdAt: "2026-08-22T09:00:00",
    review: null,
    cancellationPolicy: { freeUntil: "Before 9:00 AM on booking day", refundable: false },
  },
  {
    id: "UC-2026-00160",
    serviceSlug: "pest-control",
    service: "Pest Control",
    category: "Pest Control",
    image: "https://images.unsplash.com/photo-1583912268183-c91b0c7a2ee3?w=400&q=80",
    professional: "Vikram Mehta",
    professionalRating: 4.8,
    date: "2026-08-18T10:00:00",
    time: "10:00 AM",
    status: "completed",
    amount: 999,
    paymentStatus: "paid",
    address: "Flat 4B, Alpine Apartments, Sec 42",
    addressType: "Home",
    createdAt: "2026-08-15T10:00:00",
    review: { rating: 5, comment: "Very effective. No pests since.", submittedAt: "2026-08-19T10:00:00" },
    cancellationPolicy: { freeUntil: "Before 9:00 AM on booking day", refundable: false },
  },
  {
    id: "UC-2026-00155",
    serviceSlug: "ac-service-repair",
    service: "AC Service & Repair",
    category: "AC & Appliances",
    image: "https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?w=400&q=80",
    professional: "Suresh Mehta",
    professionalRating: 4.7,
    date: "2026-08-10T11:00:00",
    time: "11:00 AM",
    status: "rescheduled",
    amount: 699,
    paymentStatus: "paid",
    address: "Flat 4B, Alpine Apartments, Sec 42",
    addressType: "Home",
    createdAt: "2026-08-08T09:00:00",
    review: null,
    cancellationPolicy: { freeUntil: "Before 9:00 AM on booking day", refundable: true },
  },
  {
    id: "UC-2026-00148",
    serviceSlug: "intense-home-cleaning",
    service: "Intense Home Cleaning",
    category: "Cleaning",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80",
    professional: "Priya Sharma",
    professionalRating: 4.8,
    date: "2026-08-02T09:00:00",
    time: "9:00 AM",
    status: "completed",
    amount: 1499,
    paymentStatus: "paid",
    address: "Flat 4B, Alpine Apartments, Sec 42",
    addressType: "Home",
    createdAt: "2026-07-30T08:00:00",
    review: null,
    cancellationPolicy: { freeUntil: "Before 9:00 AM on booking day", refundable: false },
  },
];

export const BOOKING_STATS_FULL = {
  total: 10,
  upcoming: 1,
  inProgress: 1,
  completed: 6,
};
