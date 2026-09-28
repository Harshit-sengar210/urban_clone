export type VendorSectionStatus = "incomplete" | "complete" | "needs_changes";

export type VendorApplicationStatus = "draft" | "pending_approval" | "approved" | "rejected" | "changes_requested";

export interface VendorPersonalInfo {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  phoneStatus: string;
  email: string;
  alternatePhone: string;
  profilePhoto: string | null;
}

export interface VendorBusinessProfile {
  profileType: "individual" | "business" | "agency" | "";
  professionalName: string;
  businessName: string;
  businessType: string;
  description: string;
  businessLogo: string | null;
}

export interface ServiceConfiguration {
  serviceId: string;
  experience: string;
  startingPrice: number | null;
  duration: string;
  serviceType: "customer_location" | "online" | "vendor_location" | "both";
}

export interface VendorServicesData {
  selectedCategoryIds: string[];
  selectedServiceIds: string[];
  configurations: ServiceConfiguration[];
  skills: string[];
}

export interface VendorServiceArea {
  city: string;
  locality: string;
  pinCode: string;
  radiusKm: number;
  additionalAreas: string[];
}

export interface VendorCertification {
  name: string;
  issuedBy: string;
  year: string;
}

export interface VendorPortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface VendorExperienceData {
  experienceLevel: string;
  yearsOfExperience: number | null;
  description: string;
  skills: string[];
  certifications: VendorCertification[];
  portfolio: VendorPortfolioItem[];
  projectsCompleted: number | null;
  strengths: string[];
}

export interface DocumentUploadState {
  side: "front" | "back";
  status: "empty" | "uploading" | "added" | "error";
  previewUrl?: string;
  file?: any;
}

export interface SavedDocument {
  number: string;
  name: string;
  uploads: Record<string, DocumentUploadState>;
}

export interface VendorVerificationData {
  identityConfirmation: boolean;
  accuracyConfirmation: boolean;
  documents?: Record<string, SavedDocument>;
}

export interface VendorBankDetails {
  accountHolderName: string;
  accountNumber: string;
  confirmAccountNumber?: string;
  ifscCode: string;
  bankName: string;
  branchName?: string;
}

export interface VendorUPIDetails {
  upiId: string;
}

export interface VendorPayoutData {
  method: "bank_account" | "upi" | "";
  bank?: VendorBankDetails;
  upi?: VendorUPIDetails;
  isPrimary: boolean;
}

export interface AvailabilityDay {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
}

export interface VendorAvailabilityPreferences {
  acceptSameDayRequests: boolean;
  advanceBookingDays: number;
  maxBookingsPerDay: number;
  autoAcceptBookings: boolean;
  nearbyBookingAlerts: boolean;
}

export interface VendorAvailabilityData {
  weeklySchedule: AvailabilityDay[];
  preferences: VendorAvailabilityPreferences;
}

export interface VendorApplicationProgress {
  currentStep: string;
  percentage: number;
  completedSections: string[];
}

export interface VendorApplication {
  applicationId: string;
  vendorId: string;
  email: string;
  status: VendorApplicationStatus;

  personal?: VendorPersonalInfo;
  business?: VendorBusinessProfile;
  services?: VendorServicesData;
  serviceArea?: VendorServiceArea;
  experience?: VendorExperienceData;
  verification?: VendorVerificationData;
  payouts?: VendorPayoutData;
  availability?: VendorAvailabilityData;

  progress: VendorApplicationProgress;

  createdAt: any;
  updatedAt: any;
  submittedAt?: any;
}
