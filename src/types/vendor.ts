// ─── Settings Types ──────────────────────────────────────────────────────────

export interface VendorAccountSettings {
  email: string;
  phone: string;
  language: string;
  region: string;
  timezone: string;
  currency: string;
  accountId: string;
}

export interface VendorSecuritySettings {
  loginAlerts: boolean;
  trustedDevice: boolean;
}

export interface VendorNotificationSettings {
  bookingRequests: boolean;
  bookingAccepted: boolean;
  bookingCancelled: boolean;
  bookingReminders: boolean;
  serviceUpdates: boolean;
  verificationUpdates: boolean;
  accountUpdates: boolean;
  earningsUpdates: boolean;
  payoutUpdates: boolean;
  supportUpdates: boolean;
}

export interface VendorNotificationChannels {
  inApp: boolean;
  email: boolean;
  push: boolean;
}

export interface VendorPrivacySettings {
  showProfessionalProfile: boolean;
  showPortfolio: boolean;
  showServiceArea: boolean;
  showAvailability: boolean;
  showExperience: boolean;
}

export interface VendorCustomerContactPreferences {
  allowMessages: boolean;
  allowCalls: boolean;
  allowServiceMessages: boolean;
}

export interface VendorBookingPreferences {
  autoAccept: boolean;
  allowSameDayBookings: boolean;
  maxBookingsPerDay: number;
  minimumNoticeHours: number;
}

export interface MockSession {
  id: string;
  device: string;
  browser: string;
  isCurrent: boolean;
  lastActive: string;
  location: string;
}

// ─── Support Types ───────────────────────────────────────────────────────────


export type SupportCategory =
  | "booking"
  | "earnings"
  | "services"
  | "verification"
  | "account"
  | "technical"
  | "other";

export type SupportTicketStatus =
  | "open"
  | "in_progress"
  | "waiting_for_response"
  | "resolved"
  | "closed";

export type SupportPriority = "low" | "normal" | "high";

export interface SupportMessage {
  id: string;
  sender: "partner" | "support";
  message: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: SupportCategory;
  description: string;
  priority: SupportPriority;
  status: SupportTicketStatus;
  bookingId?: string;
  createdAt: string;
  updatedAt: string;
  messages: SupportMessage[];
}

export interface SupportArticle {
  id: string;
  title: string;
  category: SupportCategory;
  description: string;
  content: string[];
  readingTimeMinutes: number;
  helpful?: boolean;
}

export interface HelpCategory {
  id: SupportCategory;
  label: string;
  icon: string;
  articleCount: number;
}

// ─── Review Types ───────────────────────────────────────────────────────────

export type ReviewRating = 1 | 2 | 3 | 4 | 5;
export type ReviewReplyStatus = "replied" | "not_replied";

export interface VendorReviewReply {
  text: string;
  createdAt: string;
  updatedAt?: string;
}

export interface VendorReview {
  id: string;
  customerDisplayName: string;
  customerAvatarColor: string;
  rating: ReviewRating;
  reviewText: string;
  serviceName: string;
  serviceId: string;
  createdAt: string;
  reply?: VendorReviewReply;
}

export interface RatingDistribution {
  rating: ReviewRating;
  count: number;
  percentage: number;
}

export interface ServiceRatingSummary {
  serviceId: string;
  serviceName: string;
  averageRating: number;
  reviewCount: number;
  trend: "up" | "stable" | "down";
}

export interface ReviewTrendPoint {
  label: string;
  rating: number;
  count: number;
}

export interface FeedbackTheme {
  label: string;
  mentions: number;
  type: "positive" | "improvement";
}

// ─── Booking Types ───────────────────────────────────────────────────────────

export type BookingStatus = "pending" | "confirmed" | "on_the_way" | "in_progress" | "completed" | "cancelled" | "rejected" | "rescheduled";

export interface BookingRequest {
  id: string;
  customerName: string;
  customerAvatar?: string;
  service: string;
  subService?: string;
  location: string;
  date: string;
  time: string;
  estimatedEarnings: number;
  status?: BookingStatus;
  distance?: string;
}

export interface VendorBooking {
  id: string;
  customerName: string;
  customerAvatar?: string;
  customerPhone?: string;
  serviceName: string;
  subService?: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  amount: number;
  estimatedEarnings?: number;
  description?: string;
  createdAt: string;
}

export interface EarningsData {
  total: number;
  percentageChange: number;
  weeklyData: { day: string; amount: number }[];
  history?: {
    date: string;
    amount: number;
  }[];
}

export type EarningStatus = "pending" | "available" | "paid" | "refunded" | "adjusted";

export interface VendorEarning {
  id: string;
  bookingId: string;
  serviceName: string;
  customerName: string;
  date: string;
  grossAmount: number;
  partnerEarnings: number;
  status: EarningStatus;
}

export type PayoutStatus = "pending" | "processing" | "paid" | "failed" | "cancelled";

export interface VendorPayout {
  id: string;
  date: string;
  amount: number;
  method: string;
  maskedAccount?: string;
  status: PayoutStatus;
}

export interface EarningsSummary {
  totalEarnings: number;
  monthlyEarnings: number;
  pendingEarnings: number;
  availableForPayout: number;
}

export type ApplicationStatus = "draft" | "submitted" | "under_review" | "approved" | "needs_changes";

export interface VendorPersonalInfo {
  fullName: string;
  avatar: string;
  dateOfBirth?: string;
  gender?: string;
  mobile: string;
  email: string;
  alternatePhone?: string;
}

export interface VendorProfessionalInfo {
  profileType: "Individual Professional" | "Business";
  displayName: string;
  businessName?: string;
  businessType?: string;
  description: string;
  logo?: string;
  contactEmail?: string;
}

export interface VendorExperience {
  years: number;
  skills: string[];
  strengths: string[];
}

export interface VendorCertification {
  id: string;
  name: string;
  organization: string;
  year: string;
  status: "Submitted" | "Verified";
}

export interface VendorPortfolioItem {
  id: string;
  url: string;
  title: string;
  category: string;
}

export interface VendorVerificationSummary {
  status: ApplicationStatus;
  progress: number;
}

export interface VendorPayoutSummary {
  bankMasked: string;
  ifscMasked: string;
  upiMasked: string;
  status: "Configured" | "Not Configured";
  rawPayoutDetails?: any;
}

export interface VendorAvailabilitySummary {
  schedule: { day: string; hours: string; isAvailable: boolean }[];
  autoAccept: boolean;
  sameDay: boolean;
  maxBookingsPerDay: number;
}

export type DayOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export interface TimeRange {
  id: string;
  start: string;
  end: string;
}

export interface BreakTime {
  id: string;
  start: string;
  end: string;
  label: string;
}

export interface DayAvailability {
  day: DayOfWeek;
  enabled: boolean;
  ranges: TimeRange[];
  breaks: BreakTime[];
}

export interface TimeOff {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  note?: string;
}

export interface DateOverride {
  id: string;
  date: string; // YYYY-MM-DD
  enabled: boolean;
  ranges: TimeRange[];
  breaks: BreakTime[];
}

export interface AvailabilitySettings {
  acceptingBookings: boolean;
  weeklySchedule: DayAvailability[];
  bookingBufferMinutes: number;
  maxBookingsPerDay: number;
  allowSameDayBookings: boolean;
  minimumNoticeHours: number;
  advanceBookingDays: number;
  timeOff: TimeOff[];
  overrides: DateOverride[];
}

export interface VendorProfile {
  id: string;
  personal: VendorPersonalInfo;
  professional: VendorProfessionalInfo;
  services: VendorService[];
  serviceArea: {
    primaryCity: string;
    radiusKm: number;
    additionalAreas: string[];
  };
  experience: VendorExperience;
  certifications: VendorCertification[];
  portfolio: VendorPortfolioItem[];
  verification: VendorVerificationSummary;
  payout: VendorPayoutSummary;
  availability: VendorAvailabilitySummary;
  applicationStatus: ApplicationStatus;
}

export interface VendorDashboardData {
  stats: {
    totalBookings: number;
    totalEarnings: number;
    averageRating: number;
    pendingBookings: number;
    bookingsChange: number;
  };
  liveBookingRequests: BookingRequest[];
  upcomingBookings: BookingRequest[];
  recentBookings: BookingRequest[];
  earnings: EarningsData;
}

export type ServiceStatus = "active" | "inactive";
export type ServiceType = "on_site" | "customer_location" | "both";

export interface VendorService {
  id: string;
  categoryId: string;
  categoryName: string;
  serviceName: string;
  description: string;
  startingPrice: number;
  duration: string;
  serviceType: ServiceType;
  experienceLevel?: string;
  skills: string[];
  status: ServiceStatus;
  featured: boolean;
  updatedAt: string;
}
