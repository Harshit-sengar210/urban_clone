import type { 
  VendorApplication, 
  VendorSectionStatus,
  VendorPersonalInfo,
  VendorBusinessProfile,
  VendorServicesData,
  VendorServiceArea,
  VendorExperienceData,
  VendorVerificationData,
  VendorPayoutData,
  VendorAvailabilityData
} from "@/types/vendor/vendorApplication";

export const validatePersonal = (data?: VendorPersonalInfo): VendorSectionStatus => {
  if (!data) return "incomplete";
  const { fullName, phone } = data;
  if (fullName && phone) return "complete";
  return "incomplete";
};

export const validateBusiness = (data?: VendorBusinessProfile): VendorSectionStatus => {
  if (!data) return "incomplete";
  const { profileType, professionalName, businessName, businessType } = data;
  if (!profileType) return "incomplete";
  if (profileType === "individual" && professionalName) return "complete";
  if (profileType === "agency" && businessName && businessType) return "complete";
  return "incomplete";
};

export const validateServices = (data?: VendorServicesData): VendorSectionStatus => {
  if (!data) return "incomplete";
  if (data.selectedServiceIds && data.selectedServiceIds.length > 0) return "complete";
  return "incomplete";
};

export const validateServiceArea = (data?: VendorServiceArea): VendorSectionStatus => {
  if (!data) return "incomplete";
  if (data.city && data.radiusKm > 0) return "complete";
  return "incomplete";
};

export const validateExperience = (data?: VendorExperienceData): VendorSectionStatus => {
  if (!data) return "incomplete";
  if (data.experienceLevel) return "complete";
  return "incomplete";
};

export const validateVerification = (data?: VendorVerificationData): VendorSectionStatus => {
  if (!data) return "incomplete";
  // The UI requires Aadhaar and PAN (which is at least 2 documents)
  if (data.documents && Object.keys(data.documents).length >= 2) return "complete";
  return "incomplete";
};

export const validateBankPayout = (data?: VendorPayoutData): VendorSectionStatus => {
  if (!data) return "incomplete";
  if (data.method === "bank_account" && data.bank?.accountNumber && data.bank?.ifscCode) return "complete";
  if (data.method === "upi" && data.upi?.upiId) return "complete";
  return "incomplete";
};

export const validateAvailability = (data?: VendorAvailabilityData): VendorSectionStatus => {
  if (!data) return "incomplete";
  if (data.weeklySchedule && data.weeklySchedule.some(d => d.enabled)) return "complete";
  return "incomplete";
};

export const validateApplication = (app: VendorApplication) => {
  const personalStatus = validatePersonal(app.personal);
  const businessStatus = validateBusiness(app.business);
  const servicesStatus = validateServices(app.services);
  const serviceAreaStatus = validateServiceArea(app.serviceArea);
  const experienceStatus = validateExperience(app.experience);
  const verificationStatus = validateVerification(app.verification);
  const payoutsStatus = validateBankPayout(app.payouts);
  const availabilityStatus = validateAvailability(app.availability);

  const sections = [
    personalStatus,
    businessStatus,
    servicesStatus,
    serviceAreaStatus,
    experienceStatus,
    verificationStatus,
    payoutsStatus,
    availabilityStatus
  ];

  const isComplete = sections.every(s => s === "complete");

  return {
    isComplete,
    sections: {
      personal: personalStatus,
      business: businessStatus,
      services: servicesStatus,
      serviceArea: serviceAreaStatus,
      experience: experienceStatus,
      verification: verificationStatus,
      payouts: payoutsStatus,
      availability: availabilityStatus
    }
  };
};
