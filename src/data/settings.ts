export type SettingsSection = 
  | "account" 
  | "notifications" 
  | "privacy" 
  | "security" 
  | "appearance" 
  | "language" 
  | "payments" 
  | "communication" 
  | "preferences" 
  | "account-management";

export interface AccountProfile {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  avatarUrl: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  userId: string;
  joinedDate: string;
}

export interface NotificationPreferences {
  bookingConfirmed: boolean;
  professionalAssigned: boolean;
  professionalArriving: boolean;
  bookingStarted: boolean;
  bookingCompleted: boolean;
  bookingCancelled: boolean;
  bookingRescheduled: boolean;
  paymentSuccessful: boolean;
  paymentFailed: boolean;
  refundUpdates: boolean;
  walletUpdates: boolean;
  newOffers: boolean;
  personalizedDeals: boolean;
  couponReminders: boolean;
  rewardsUpdates: boolean;
  serviceReminders: boolean;
  followUpReminders: boolean;
  reviewReminders: boolean;
  supportTicketUpdates: boolean;
  supportMessages: boolean;
  channelPush: boolean;
  channelEmail: boolean;
  channelSms: boolean;
  channelWhatsapp: boolean;
}

export interface PrivacyPreferences {
  profileVisibility: "everyone" | "professionals" | "none";
  allowPersonalization: boolean;
  allowHistoryForRecommendations: boolean;
  useLocationForDiscovery: boolean;
  useLocationDuringBooking: boolean;
  allowAnalytics: boolean;
}

export interface AppearanceSettings {
  theme: "light" | "dark" | "system";
  reduceMotion: boolean;
  compactLayout: boolean;
  animations: boolean;
}

export interface LanguageSettings {
  language: string;
  region: string;
  currency: string;
  dateFormat: string;
  timeFormat: string;
  firstDayOfWeek: string;
}

export interface CommunicationPreferences {
  preferredContactMethod: "email" | "phone" | "whatsapp";
  allowProCall: boolean;
  allowProMessage: boolean;
  supportEmail: boolean;
  supportInApp: boolean;
  promoEmail: boolean;
  promoSms: boolean;
  promoWhatsapp: boolean;
}

export interface ServicePreferences {
  preferredTime: "morning" | "afternoon" | "evening" | "flexible";
  preferredProfessional: "no_preference" | "same";
  serviceReminders: "1_hour" | "3_hours" | "1_day";
  contactless: boolean;
  ecoFriendly: boolean;
  saveInstructions: boolean;
  defaultInstructions: string;
}

export const MOCK_PROFILE: AccountProfile = {
  fullName: "Rohan Sharma",
  email: "rohan.sharma@example.com",
  phone: "+91 9876543210",
  dob: "1992-05-15",
  gender: "male",
  avatarUrl: "",
  emailVerified: true,
  phoneVerified: true,
  userId: "UC-USER-94021",
  joinedDate: "2024-03-12",
};

export const MOCK_NOTIFICATIONS: NotificationPreferences = {
  bookingConfirmed: true, professionalAssigned: true, professionalArriving: true, bookingStarted: true, bookingCompleted: true, bookingCancelled: true, bookingRescheduled: true,
  paymentSuccessful: true, paymentFailed: true, refundUpdates: true, walletUpdates: true,
  newOffers: true, personalizedDeals: false, couponReminders: true, rewardsUpdates: false,
  serviceReminders: true, followUpReminders: false, reviewReminders: true,
  supportTicketUpdates: true, supportMessages: true,
  channelPush: true, channelEmail: true, channelSms: false, channelWhatsapp: true,
};

export const MOCK_PRIVACY: PrivacyPreferences = {
  profileVisibility: "professionals", allowPersonalization: true, allowHistoryForRecommendations: true, useLocationForDiscovery: true, useLocationDuringBooking: true, allowAnalytics: false,
};

export const MOCK_APPEARANCE: AppearanceSettings = {
  theme: "system", reduceMotion: false, compactLayout: false, animations: true,
};

export const MOCK_LANGUAGE: LanguageSettings = {
  language: "en-IN", region: "IN", currency: "INR", dateFormat: "DD/MM/YYYY", timeFormat: "12-hour", firstDayOfWeek: "monday",
};

export const MOCK_COMMUNICATION: CommunicationPreferences = {
  preferredContactMethod: "whatsapp", allowProCall: true, allowProMessage: true, supportEmail: true, supportInApp: true, promoEmail: false, promoSms: false, promoWhatsapp: true,
};

export const MOCK_PREFERENCES: ServicePreferences = {
  preferredTime: "flexible", preferredProfessional: "no_preference", serviceReminders: "3_hours", contactless: false, ecoFriendly: true, saveInstructions: true, defaultInstructions: "Please call upon reaching the main gate.",
};
