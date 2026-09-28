export interface ProfessionalSummary {
  id: string;
  name: string;
  verified: boolean;
  rating: number;
  jobsCompleted: number;
  category: string;
}

export interface DetailedRatings {
  professionalism: number;
  punctuality: number;
  quality: number;
  value: number;
}

export type ReviewTag =
  | "Professional"
  | "On Time"
  | "Good Quality"
  | "Friendly"
  | "Clean Work"
  | "Value for Money"
  | "Quick Service"
  | "Thorough";

export interface Review {
  id: string;
  bookingId: string;
  serviceSlug: string;
  serviceName: string;
  category: string;
  serviceImage: string;
  professional: ProfessionalSummary;
  rating: number;
  reviewText: string;
  tags: ReviewTag[];
  detailedRatings: DetailedRatings;
  photos: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PendingReview {
  bookingId: string;
  serviceSlug: string;
  serviceName: string;
  category: string;
  serviceImage: string;
  professional: ProfessionalSummary;
  completedAt: string;
  amount: number;
}

export const ALL_REVIEW_TAGS: ReviewTag[] = [
  "Professional", "On Time", "Good Quality", "Friendly",
  "Clean Work", "Value for Money", "Quick Service", "Thorough",
];

// ─── Mock Data ────────────────────────────────────────────────────────────────

const PROFESSIONALS: Record<string, ProfessionalSummary> = {
  ravi: { id: "pro_001", name: "Ravi Sharma",  verified: true, rating: 4.9, jobsCompleted: 1200, category: "Cleaning" },
  amit: { id: "pro_002", name: "Amit Verma",   verified: true, rating: 4.8, jobsCompleted: 980,  category: "AC & Appliance" },
  priya: { id: "pro_003", name: "Priya Singh",  verified: true, rating: 4.7, jobsCompleted: 850,  category: "Salon" },
  raj:  { id: "pro_004", name: "Raj Patel",    verified: true, rating: 4.6, jobsCompleted: 740,  category: "Plumbing" },
  neha: { id: "pro_005", name: "Neha Gupta",   verified: true, rating: 4.8, jobsCompleted: 660,  category: "Painting" },
};

export const DEMO_REVIEWS: Review[] = [
  {
    id: "review_001",
    bookingId: "UC-2026-00191",
    serviceSlug: "ac-service-repair",
    serviceName: "AC Service & Repair",
    category: "AC & Appliance",
    serviceImage: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80",
    professional: PROFESSIONALS.amit,
    rating: 5,
    reviewText: "Very professional service. The technician arrived on time and fixed the issue quickly. Will definitely book again.",
    tags: ["Professional", "On Time", "Good Quality"],
    detailedRatings: { professionalism: 5, punctuality: 5, quality: 5, value: 4 },
    photos: [],
    createdAt: "2026-09-16T11:00:00",
    updatedAt: "2026-09-16T11:00:00",
  },
  {
    id: "review_002",
    bookingId: "UC-2026-00182",
    serviceSlug: "salon-at-home",
    serviceName: "Salon at Home",
    category: "Salon",
    serviceImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",
    professional: PROFESSIONALS.priya,
    rating: 4,
    reviewText: "Great experience overall. Priya was friendly and did a wonderful job. The tools were clean and hygienic.",
    tags: ["Friendly", "Clean Work", "Good Quality"],
    detailedRatings: { professionalism: 4, punctuality: 4, quality: 5, value: 4 },
    photos: [],
    createdAt: "2026-08-26T12:00:00",
    updatedAt: "2026-08-26T12:00:00",
  },
  {
    id: "review_003",
    bookingId: "UC-2026-00179",
    serviceSlug: "plumbing-repair",
    serviceName: "Plumbing Repair",
    category: "Plumbing",
    serviceImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    professional: PROFESSIONALS.raj,
    rating: 4,
    reviewText: "Raj was punctual and repaired the leakage quickly. Good value for money.",
    tags: ["On Time", "Value for Money", "Quick Service"],
    detailedRatings: { professionalism: 4, punctuality: 5, quality: 4, value: 5 },
    photos: [],
    createdAt: "2026-09-10T09:30:00",
    updatedAt: "2026-09-10T09:30:00",
  },
];

export const DEMO_PENDING_REVIEWS: PendingReview[] = [
  {
    bookingId: "UC-2026-00188",
    serviceSlug: "home-cleaning",
    serviceName: "Intense Home Cleaning",
    category: "Cleaning",
    serviceImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    professional: PROFESSIONALS.ravi,
    completedAt: "2026-09-20T14:00:00",
    amount: 1499,
  },
  {
    bookingId: "UC-2026-00203",
    serviceSlug: "wall-painting",
    serviceName: "Full Room Painting",
    category: "Painting",
    serviceImage: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&q=80",
    professional: PROFESSIONALS.neha,
    completedAt: "2026-09-18T16:00:00",
    amount: 2499,
  },
];
