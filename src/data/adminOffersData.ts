export type OfferStatus =
  | "draft"
  | "scheduled"
  | "active"
  | "paused"
  | "expired"
  | "archived";

export type OfferDiscountType =
  | "percentage"
  | "flat";

export type OfferType =
  | "percentage_discount"
  | "flat_discount"
  | "first_booking"
  | "minimum_order"
  | "service_specific"
  | "category_specific"
  | "new_customer"
  | "referral"
  | "limited_time"
  | "package_offer";

export type OfferAudience =
  | "everyone"
  | "new_customers"
  | "existing_customers"
  | "no_completed_booking"
  | "previous_booking"
  | "specific_customers";

export type VendorTargeting =
  | "all_vendors"
  | "specific_vendors"
  | "vendor_category"
  | "none";

export interface OfferTargeting {
  categories: string[];
  services: string[];
  packages: string[];
  vendors: string[];
  vendorTargeting: VendorTargeting;
}

export interface OfferEligibility {
  minimumOrderValue: number;
  maximumUsesPerCustomer: number;
  totalUsageLimit: number;
  minimumServices?: number;
  customerAccountAgeDays?: number;
  firstBookingOnly: boolean;
  verifiedCustomersOnly: boolean;
}

export interface OfferValidity {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  timezone: string;
}

export interface OfferPerformance {
  redemptions: number;
  revenueGenerated: number;
  discountGiven: number;
  averageOrderValue: number;
  conversionRate: number;
  uniqueCustomers: number;
  repeatCustomers: number;
}

export interface OfferActivityEvent {
  id: string;
  action: string;
  timestamp: string;
  actor: string;
  note?: string;
}

export interface AdminOffer {
  id: string;
  name: string;
  code: string;
  description: string;
  internalNotes?: string;
  offerType: OfferType;
  discountType: OfferDiscountType;
  discountValue: number;
  maximumDiscount?: number;
  audience: OfferAudience;
  targeting: OfferTargeting;
  eligibility: OfferEligibility;
  validity: OfferValidity;
  status: OfferStatus;
  usageCount: number;
  performance: OfferPerformance;
  activity: OfferActivityEvent[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface OfferRedemption {
  id: string;
  offerId: string;
  customerId: string;
  customerName: string;
  bookingId: string;
  serviceId: string;
  serviceName: string;
  originalOrderValue: number;
  discountAmount: number;
  finalOrderValue: number;
  redeemedAt: string;
  status: "successful" | "reversed" | "refunded";
}

export const adminOffersData = {
  summary: {
    total: 48,
    active: 18,
    scheduled: 7,
    drafts: 12,
    redemptions: 3842,
    discountGiven: 486000
  },

  offers: [
    {
      id: "OFF-1001",
      name: "Monsoon Home Refresh",
      code: "MONSOON300",
      description: "Save ₹300 on selected home services.",
      offerType: "flat_discount",
      discountType: "flat",
      discountValue: 300,
      audience: "everyone",
      targeting: {
        categories: ["CAT-1"],
        services: [],
        packages: [],
        vendors: [],
        vendorTargeting: "all_vendors"
      },
      eligibility: {
        minimumOrderValue: 999,
        maximumUsesPerCustomer: 1,
        totalUsageLimit: 1000,
        firstBookingOnly: false,
        verifiedCustomersOnly: true
      },
      validity: {
        startDate: "2026-09-26",
        startTime: "10:00 AM",
        endDate: "2026-10-15",
        endTime: "11:59 PM",
        timezone: "IST"
      },
      status: "active",
      usageCount: 342,
      performance: {
        redemptions: 342,
        revenueGenerated: 584000,
        discountGiven: 102600,
        averageOrderValue: 1708,
        conversionRate: 12.4,
        uniqueCustomers: 318,
        repeatCustomers: 24
      },
      activity: [
        { id: "act-1", action: "Offer Created", timestamp: "2026-09-20T10:00:00Z", actor: "Admin" },
        { id: "act-2", action: "Offer Published", timestamp: "2026-09-25T08:00:00Z", actor: "Admin" }
      ],
      createdAt: "2026-09-20T10:00:00Z",
      updatedAt: "2026-09-25T08:00:00Z",
      createdBy: "Admin"
    },
    {
      id: "OFF-1002",
      name: "First Time Beauty",
      code: "FIRST500",
      description: "20% off up to ₹500 for new beauty customers.",
      offerType: "first_booking",
      discountType: "percentage",
      discountValue: 20,
      maximumDiscount: 500,
      audience: "new_customers",
      targeting: {
        categories: ["CAT-2"],
        services: [],
        packages: [],
        vendors: [],
        vendorTargeting: "all_vendors"
      },
      eligibility: {
        minimumOrderValue: 1500,
        maximumUsesPerCustomer: 1,
        totalUsageLimit: 500,
        firstBookingOnly: true,
        verifiedCustomersOnly: false
      },
      validity: {
        startDate: "2026-09-26",
        startTime: "00:00 AM",
        endDate: "2026-11-30",
        endTime: "11:59 PM",
        timezone: "IST"
      },
      status: "active",
      usageCount: 89,
      performance: {
        redemptions: 89,
        revenueGenerated: 195000,
        discountGiven: 42000,
        averageOrderValue: 2191,
        conversionRate: 8.5,
        uniqueCustomers: 89,
        repeatCustomers: 0
      },
      activity: [
        { id: "act-1", action: "Offer Created", timestamp: "2026-09-22T14:30:00Z", actor: "Admin" }
      ],
      createdAt: "2026-09-22T14:30:00Z",
      updatedAt: "2026-09-26T00:00:00Z",
      createdBy: "Admin"
    },
    {
      id: "OFF-1003",
      name: "Diwali Deep Clean",
      code: "DIWALI20",
      description: "Special early bird 20% discount for Diwali.",
      offerType: "percentage_discount",
      discountType: "percentage",
      discountValue: 20,
      maximumDiscount: 1000,
      audience: "everyone",
      targeting: {
        categories: ["CAT-1"],
        services: ["SRV-1"],
        packages: [],
        vendors: [],
        vendorTargeting: "all_vendors"
      },
      eligibility: {
        minimumOrderValue: 2000,
        maximumUsesPerCustomer: 2,
        totalUsageLimit: 5000,
        firstBookingOnly: false,
        verifiedCustomersOnly: false
      },
      validity: {
        startDate: "2026-10-15",
        startTime: "00:00 AM",
        endDate: "2026-10-30",
        endTime: "11:59 PM",
        timezone: "IST"
      },
      status: "scheduled",
      usageCount: 0,
      performance: {
        redemptions: 0,
        revenueGenerated: 0,
        discountGiven: 0,
        averageOrderValue: 0,
        conversionRate: 0,
        uniqueCustomers: 0,
        repeatCustomers: 0
      },
      activity: [
        { id: "act-1", action: "Offer Created", timestamp: "2026-09-25T11:00:00Z", actor: "Admin" }
      ],
      createdAt: "2026-09-25T11:00:00Z",
      updatedAt: "2026-09-25T11:00:00Z",
      createdBy: "Admin"
    }
  ] as AdminOffer[],

  redemptions: [
    {
      id: "RED-10482",
      offerId: "OFF-1001",
      customerId: "CUST-101",
      customerName: "Rahul Sharma",
      bookingId: "UC-10482",
      serviceId: "SRV-1",
      serviceName: "Home Cleaning",
      originalOrderValue: 1499,
      discountAmount: 300,
      finalOrderValue: 1199,
      redeemedAt: "2026-09-26T10:30:00Z",
      status: "successful"
    }
  ] as OfferRedemption[]
};
