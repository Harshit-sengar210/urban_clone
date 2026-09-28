export type SettingSection =
  | "general"
  | "marketplace"
  | "booking_rules"
  | "payments"
  | "vendor_rules"
  | "customer_rules"
  | "notifications"
  | "security"
  | "localization"
  | "tax_fees"
  | "integrations"
  | "feature_flags";

export type PaymentMode =
  | "online"
  | "cash"
  | "online_cash";

export type BookingConfirmationMode =
  | "automatic"
  | "vendor_confirmation"
  | "admin_confirmation";

export type PlatformFeeType =
  | "percentage"
  | "flat"
  | "hybrid";

export type RefundProcessingMode =
  | "automatic"
  | "manual";

export type IntegrationStatus =
  | "connected"
  | "not_connected"
  | "configuration_required"
  | "disabled";

export type FeatureFlagRollout =
  | "everyone"
  | "admins"
  | "selected_users"
  | "selected_vendors";

export interface AdminSettings {
  general: {
    platformName: string;
    platformShortName: string;
    platformDescription: string;
    supportEmail: string;
    supportPhone: string;
    websiteUrl: string;
    primaryBrandColor: string;
    platformEnabled: boolean;
    maintenanceMode: boolean;
    maintenanceMessage: string;
  };
  marketplace: {
    enableCustomerBookings: boolean;
    enableVendorMarketplace: boolean;
    enableServiceSearch: boolean;
    enablePackageSelection: boolean;
    enableReviews: boolean;
    enableOffers: boolean;
    enableWallet: boolean;
    enableVendorRatings: boolean;
    defaultServiceSort: "recommended" | "popular" | "price_asc" | "price_desc" | "rating" | "newest";
    defaultServiceView: "grid" | "list";
    showServiceAvailability: boolean;
    allowCustomerCompare: boolean;
    minSearchLength: number;
    maxSearchResults: number;
  };
  bookingRules: {
    minLeadTimeHours: number;
    maxAdvanceBookingDays: number;
    defaultDurationMinutes: number;
    confirmationMode: BookingConfirmationMode;
    allowSameDay: boolean;
    allowEmergency: boolean;
    customerCancelWindowHours: number;
    vendorCancelWindowHours: number;
    allowCustomerCancel: boolean;
    allowVendorCancel: boolean;
    allowAdminCancel: boolean;
    requireCancelReason: boolean;
    allowCustomerReschedule: boolean;
    allowVendorReschedule: boolean;
    allowAdminReschedule: boolean;
    maxReschedules: number;
    minRescheduleNoticeHours: number;
  };
  payments: {
    paymentMode: PaymentMode;
    defaultPaymentMethod: string;
    allowCash: boolean;
    requirePaymentBeforeConfirmation: boolean;
    allowPartial: boolean;
    allowWallet: boolean;
    enableRefunds: boolean;
    refundProcessing: RefundProcessingMode;
    defaultRefundWindowHours: number;
    allowPartialRefunds: boolean;
    requireRefundReason: boolean;
    paymentRetryEnabled: boolean;
    maxRetryAttempts: number;
    retryDelayMinutes: number;
    showFailureNotification: boolean;
  };
  vendorRules: {
    requireAdminApproval: boolean;
    allowSelfRegistration: boolean;
    requireIdentityVerify: boolean;
    requireBusinessVerify: boolean;
    requireBankDetails: boolean;
    requireServiceArea: boolean;
    requireExperience: boolean;
    requirePortfolio: boolean;
    minRating: number;
    minCompletionRate: number;
    maxCancellationRate: number;
    autoFlagLowPerformers: boolean;
    autoSuspendVendors: boolean;
  };
  customerRules: {
    allowRegistration: boolean;
    requireEmailVerify: boolean;
    requirePhoneVerify: boolean;
    allowSocialLogin: boolean;
    allowGuestBrowsing: boolean;
    allowGuestBooking: boolean;
    maxActiveBookings: number;
    maxPendingBookings: number;
    maxCancelBeforeReview: number;
    flagRepeatedCancellations: boolean;
    allowReviews: boolean;
    requireCompletedBooking: boolean;
    maxReviewEditDays: number;
    allowReviewPhotos: boolean;
  };
  security: {
    requireAdminEmailVerify: boolean;
    requireStrongPassword: boolean;
    minPasswordLength: number;
    requirePasswordChangeDays: number; // 0 for never
    sessionTimeoutMinutes: number;
    rememberAdminSession: boolean;
    maxActiveSessions: number;
    require2FA: boolean;
    allowed2FAMethods: string[];
    maxFailedLoginAttempts: number;
    lockoutDurationMinutes: number;
    enableLoginAlerts: boolean;
  };
}

export const defaultAdminSettings: AdminSettings = {
  general: {
    platformName: "UrbanClone",
    platformShortName: "Urban",
    platformDescription: "On-demand home services marketplace",
    supportEmail: "support@example.com",
    supportPhone: "+91 00000 00000",
    websiteUrl: "https://example.com",
    primaryBrandColor: "#0A192F",
    platformEnabled: true,
    maintenanceMode: false,
    maintenanceMessage: "Scheduled maintenance is currently in progress."
  },
  marketplace: {
    enableCustomerBookings: true,
    enableVendorMarketplace: true,
    enableServiceSearch: true,
    enablePackageSelection: true,
    enableReviews: true,
    enableOffers: true,
    enableWallet: true,
    enableVendorRatings: true,
    defaultServiceSort: "recommended",
    defaultServiceView: "grid",
    showServiceAvailability: true,
    allowCustomerCompare: true,
    minSearchLength: 2,
    maxSearchResults: 50
  },
  bookingRules: {
    minLeadTimeHours: 2,
    maxAdvanceBookingDays: 30,
    defaultDurationMinutes: 60,
    confirmationMode: "automatic",
    allowSameDay: true,
    allowEmergency: false,
    customerCancelWindowHours: 2,
    vendorCancelWindowHours: 4,
    allowCustomerCancel: true,
    allowVendorCancel: true,
    allowAdminCancel: true,
    requireCancelReason: true,
    allowCustomerReschedule: true,
    allowVendorReschedule: true,
    allowAdminReschedule: true,
    maxReschedules: 2,
    minRescheduleNoticeHours: 2
  },
  payments: {
    paymentMode: "online_cash",
    defaultPaymentMethod: "online",
    allowCash: true,
    requirePaymentBeforeConfirmation: false,
    allowPartial: false,
    allowWallet: true,
    enableRefunds: true,
    refundProcessing: "manual",
    defaultRefundWindowHours: 24,
    allowPartialRefunds: false,
    requireRefundReason: true,
    paymentRetryEnabled: true,
    maxRetryAttempts: 3,
    retryDelayMinutes: 15,
    showFailureNotification: true
  },
  vendorRules: {
    requireAdminApproval: true,
    allowSelfRegistration: true,
    requireIdentityVerify: true,
    requireBusinessVerify: true,
    requireBankDetails: true,
    requireServiceArea: true,
    requireExperience: true,
    requirePortfolio: false,
    minRating: 4.0,
    minCompletionRate: 80,
    maxCancellationRate: 20,
    autoFlagLowPerformers: true,
    autoSuspendVendors: false
  },
  customerRules: {
    allowRegistration: true,
    requireEmailVerify: false,
    requirePhoneVerify: true,
    allowSocialLogin: true,
    allowGuestBrowsing: true,
    allowGuestBooking: false,
    maxActiveBookings: 5,
    maxPendingBookings: 3,
    maxCancelBeforeReview: 3,
    flagRepeatedCancellations: true,
    allowReviews: true,
    requireCompletedBooking: true,
    maxReviewEditDays: 7,
    allowReviewPhotos: true
  },
  security: {
    requireAdminEmailVerify: true,
    requireStrongPassword: true,
    minPasswordLength: 8,
    requirePasswordChangeDays: 90,
    sessionTimeoutMinutes: 60,
    rememberAdminSession: true,
    maxActiveSessions: 5,
    require2FA: false,
    allowed2FAMethods: ["authenticator", "email"],
    maxFailedLoginAttempts: 5,
    lockoutDurationMinutes: 15,
    enableLoginAlerts: true
  }
};
