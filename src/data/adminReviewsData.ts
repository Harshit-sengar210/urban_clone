export type ReviewStatus =
  | "published"
  | "flagged"
  | "under_review"
  | "hidden"
  | "resolved";

export type ModerationReason =
  | "spam"
  | "offensive_language"
  | "personal_information"
  | "false_information"
  | "irrelevant"
  | "harassment"
  | "fraud_suspicious"
  | "other";

export interface ReviewCustomerSnapshot {
  id: string;
  name: string;
  avatar?: string;
}

export interface ReviewVendorSnapshot {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
}

export interface ReviewServiceSnapshot {
  categoryId: string;
  serviceId: string;
  packageId: string;
  categoryName: string;
  serviceName: string;
  packageName: string;
}

export interface ReviewActivityEvent {
  id: string;
  action: string;
  timestamp: string;
  actor: string;
  note?: string;
}

export interface AdminReview {
  id: string;
  bookingId: string;
  customer: ReviewCustomerSnapshot;
  vendor: ReviewVendorSnapshot;
  service: ReviewServiceSnapshot;
  rating: number;
  title?: string;
  text: string;
  status: ReviewStatus;
  verifiedBooking: boolean;
  helpfulCount: number;
  reportCount: number;
  moderationReason?: ModerationReason;
  moderationNote?: string;
  moderatedBy?: string;
  moderatedAt?: string;
  createdAt: string;
  updatedAt: string;
  activity: ReviewActivityEvent[];
}

export const adminReviewsData = {
  summary: {
    total: 8426,
    averageRating: 4.6,
    reviewsThisMonth: 684,
    pendingModeration: 42,
    flagged: 18,
    hidden: 27
  },
  
  qualityOverview: {
    stars: {
      "5": 72,
      "4": 18,
      "3": 6,
      "2": 3,
      "1": 1
    }
  },

  reviews: [
    {
      id: "REV-1001",
      bookingId: "UC-10482",
      customer: {
        id: "CUST-101",
        name: "Rahul Sharma"
      },
      vendor: {
        id: "VND-202",
        name: "Amit Cleaning Services",
        rating: 4.8
      },
      service: {
        categoryId: "CAT-1",
        serviceId: "SRV-1",
        packageId: "PKG-1",
        categoryName: "Cleaning",
        serviceName: "Home Cleaning",
        packageName: "Deep Cleaning"
      },
      rating: 5,
      title: "Excellent service!",
      text: "Amit and his team did a fantastic job with the deep cleaning. Highly recommended for a thorough clean.",
      status: "published",
      verifiedBooking: true,
      helpfulCount: 12,
      reportCount: 0,
      createdAt: "2026-09-26T10:30:00Z",
      updatedAt: "2026-09-26T10:30:00Z",
      activity: [
        { id: "act-1", action: "Review Submitted", timestamp: "2026-09-26T10:30:00Z", actor: "Rahul Sharma" }
      ]
    },
    {
      id: "REV-1002",
      bookingId: "UC-10483",
      customer: {
        id: "CUST-102",
        name: "Vikram Malhotra"
      },
      vendor: {
        id: "VND-204",
        name: "Ramesh AC Repairs",
        rating: 4.6
      },
      service: {
        categoryId: "CAT-3",
        serviceId: "SRV-3",
        packageId: "PKG-3",
        categoryName: "AC & Appliance",
        serviceName: "AC Service",
        packageName: "Basic AC Service"
      },
      rating: 2,
      title: "Delay in arrival",
      text: "The technician arrived 2 hours late. Work was okay but time management needs improvement.",
      status: "flagged",
      verifiedBooking: true,
      helpfulCount: 4,
      reportCount: 1,
      moderationReason: "other",
      createdAt: "2026-09-25T14:00:00Z",
      updatedAt: "2026-09-26T09:00:00Z",
      activity: [
        { id: "act-1", action: "Review Submitted", timestamp: "2026-09-25T14:00:00Z", actor: "Vikram Malhotra" },
        { id: "act-2", action: "Review Flagged", timestamp: "2026-09-26T09:00:00Z", actor: "Vendor", note: "Vendor disputes delay claim" }
      ]
    },
    {
      id: "REV-1003",
      bookingId: "UC-10485",
      customer: {
        id: "CUST-105",
        name: "Sonia Kapoor"
      },
      vendor: {
        id: "VND-206",
        name: "Quick Fix Plumbers",
        rating: 3.9
      },
      service: {
        categoryId: "CAT-4",
        serviceId: "SRV-4",
        packageId: "PKG-4",
        categoryName: "Plumbing",
        serviceName: "Leak Repair",
        packageName: "Standard Repair"
      },
      rating: 1,
      title: "Awful experience",
      text: "This guy didn't know what he was doing and ruined my pipe completely! Never use them! Idiots!",
      status: "under_review",
      verifiedBooking: true,
      helpfulCount: 2,
      reportCount: 3,
      moderationReason: "offensive_language",
      createdAt: "2026-09-24T18:30:00Z",
      updatedAt: "2026-09-25T10:00:00Z",
      activity: [
        { id: "act-1", action: "Review Submitted", timestamp: "2026-09-24T18:30:00Z", actor: "Sonia Kapoor" },
        { id: "act-2", action: "Review Reported", timestamp: "2026-09-25T09:00:00Z", actor: "Community" },
        { id: "act-3", action: "Review Opened", timestamp: "2026-09-25T10:00:00Z", actor: "System" }
      ]
    }
  ] as AdminReview[]
};
