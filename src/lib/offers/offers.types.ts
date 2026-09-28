export type OfferCategory =
  | "all"
  | "cleaning"
  | "repairs"
  | "beauty"
  | "maintenance"
  | "pest-control"
  | "appliances";

export type OfferStatus =
  | "available"
  | "limited"
  | "expired";

export type Offer = {
  id: string;
  title: string;
  description: string;
  code: string;
  category: OfferCategory;
  minimumBookingAmount?: number;
  maximumDiscount?: number;
  validUntil: string;
  status: OfferStatus;
  saved: boolean;
};
