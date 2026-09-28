export type OfferStatus = "active" | "saved" | "used" | "expired" | "upcoming";
export type OfferType = "flat" | "percentage" | "cashback";
export type OfferCategory = "All" | "For You" | "Home Services" | "Cleaning" | "Repairs" | "Beauty" | "Payments" | "Saved" | "Used" | "Expired";

export interface Offer {
  id: string;
  title: string;
  shortDescription: string;
  type: OfferType;
  discountValue: number;
  couponCode: string;
  category: string;
  minBookingAmount: number;
  maxDiscount: number;
  validFrom: string;
  validUntil: string;
  status: OfferStatus;
  eligibleServices: string[];
  terms: string[];
  isFirstBooking?: boolean;
}

export interface OfferStats {
  totalSaved: number;
  offersUsed: number;
  availableOffers: number;
}

export const MOCK_OFFERS: Offer[] = [
  {
    id: "offer_001",
    title: "₹500 OFF your first booking",
    shortDescription: "Welcome to UrbanClone! Save ₹500 on your first service.",
    type: "flat",
    discountValue: 500,
    couponCode: "WELCOME500",
    category: "For You",
    minBookingAmount: 999,
    maxDiscount: 500,
    validFrom: "2026-09-01T00:00:00Z",
    validUntil: "2026-10-31T23:59:59Z",
    status: "active",
    isFirstBooking: true,
    eligibleServices: ["All Services"],
    terms: [
      "Valid only for new users on their first booking",
      "One use per customer",
      "Cannot be combined with another coupon",
      "Minimum booking value applies"
    ]
  },
  {
    id: "offer_002",
    title: "₹300 OFF on Home Cleaning",
    shortDescription: "Save ₹300 on selected home and deep cleaning services.",
    type: "flat",
    discountValue: 300,
    couponCode: "HOME300",
    category: "Cleaning",
    minBookingAmount: 999,
    maxDiscount: 300,
    validFrom: "2026-09-01T00:00:00Z",
    validUntil: "2026-09-30T23:59:59Z",
    status: "active",
    eligibleServices: ["Home Cleaning", "Deep Cleaning", "Bathroom Cleaning"],
    terms: [
      "Valid on selected services",
      "One use per customer",
      "Cannot be combined with another coupon",
      "Offer subject to availability"
    ]
  },
  {
    id: "offer_003",
    title: "20% OFF on AC Service",
    shortDescription: "Get your AC ready with a 20% discount.",
    type: "percentage",
    discountValue: 20,
    couponCode: "ACFIX200",
    category: "Repairs",
    minBookingAmount: 699,
    maxDiscount: 200,
    validFrom: "2026-09-01T00:00:00Z",
    validUntil: "2026-09-30T23:59:59Z",
    status: "active",
    eligibleServices: ["AC Service & Repair"],
    terms: [
      "Maximum discount of ₹200",
      "Valid for returning customers",
      "Cannot be combined with another coupon"
    ]
  },
  {
    id: "offer_004",
    title: "15% OFF Salon at Home",
    shortDescription: "Pamper yourself with 15% off beauty services.",
    type: "percentage",
    discountValue: 15,
    couponCode: "GLOW15",
    category: "Beauty",
    minBookingAmount: 799,
    maxDiscount: 150,
    validFrom: "2026-09-10T00:00:00Z",
    validUntil: "2026-10-15T23:59:59Z",
    status: "active",
    eligibleServices: ["Salon at Home", "Spa for Women", "Men's Grooming"],
    terms: [
      "Maximum discount of ₹150",
      "Valid across all beauty categories",
      "Standard terms apply"
    ]
  },
  {
    id: "offer_005",
    title: "10% Cashback on HDFC Cards",
    shortDescription: "Pay using HDFC Credit or Debit cards to earn cashback.",
    type: "cashback",
    discountValue: 10,
    couponCode: "HDFC10",
    category: "Payments",
    minBookingAmount: 1499,
    maxDiscount: 300,
    validFrom: "2026-09-01T00:00:00Z",
    validUntil: "2026-11-30T23:59:59Z",
    status: "active",
    eligibleServices: ["All Services"],
    terms: [
      "Valid only on HDFC Bank Credit and Debit cards",
      "Cashback will be credited to UrbanClone wallet",
      "One use per customer per month"
    ]
  },
  {
    id: "offer_006",
    title: "20% OFF Summer Special",
    shortDescription: "Beat the heat with our summer home care packages.",
    type: "percentage",
    discountValue: 20,
    couponCode: "SUMMER20",
    category: "Home Services",
    minBookingAmount: 999,
    maxDiscount: 250,
    validFrom: "2026-04-01T00:00:00Z",
    validUntil: "2026-06-30T23:59:59Z",
    status: "expired",
    eligibleServices: ["All Services"],
    terms: ["Offer has expired"]
  }
];

export const MOCK_STATS: OfferStats = {
  totalSaved: 2450,
  offersUsed: 8,
  availableOffers: 5,
};
