"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User, Building2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";

import { VendorOnboardingHeader } from "@/components/vendor-onboarding/VendorOnboardingHeader";
import { OnboardingProgress } from "@/components/vendor-onboarding/OnboardingProgress";
import { VendorProfessionalPreview } from "@/components/vendor-onboarding/VendorProfessionalPreview";
import { ProfileTypeSelector } from "@/components/vendor-onboarding/ProfileTypeSelector";
import { BusinessTypeSelector } from "@/components/vendor-onboarding/BusinessTypeSelector";
import { ProfessionalDescription } from "@/components/vendor-onboarding/ProfessionalDescription";
import { BusinessLogoUpload } from "@/components/vendor-onboarding/BusinessLogoUpload";
import { ProfileCompletion } from "@/components/vendor-onboarding/ProfileCompletion";
import { OnboardingNavigation } from "@/components/vendor-onboarding/OnboardingNavigation";
import { onboardingPageVariants, staggerContainer, staggerItem, expandCollapse } from "@/components/vendor-onboarding/animations";
import { useVendorOnboarding } from "@/contexts/vendor/VendorOnboardingProvider";

type VendorBusinessProfile = {
  profileType: "individual" | "business";
  professionalName: string;
  businessName: string;
  businessType:
    | "individual"
    | "proprietorship"
    | "partnership"
    | "private_limited"
    | "llp"
    | "other"
    | "";
  description: string;
  businessLogo: string | null;
};

const DEFAULT_STATE: VendorBusinessProfile = {
  profileType: "individual",
  professionalName: "",
  businessName: "",
  businessType: "",
  description: "",
  businessLogo: null,
};

export default function BusinessProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<VendorBusinessProfile>(DEFAULT_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof VendorBusinessProfile, string>>>({});
  const [toastMessage, setToastMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [step2Photo, setStep2Photo] = useState<string | null>(null);

  const { application, loading, saveBusiness } = useVendorOnboarding();

  useEffect(() => {
    if (application?.business) {
      setData(prev => ({
        ...prev,
        ...application.business,
        profileType: (application.business?.profileType || "individual") as "individual" | "business",
        businessType: application.business?.businessType as any
      }));
    }
  }, [application]);

  const updateField = <K extends keyof VendorBusinessProfile>(field: K, value: VendorBusinessProfile[K]) => {
    setData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Validation
  const validateField = (field: keyof VendorBusinessProfile): boolean => {
    let error = "";
    
    if (field === "professionalName") {
      if (data.profileType === "individual" && data.professionalName.trim().length < 2) {
        error = "Please enter your professional name.";
      }
    }
    
    if (data.profileType === "business") {
      if (field === "businessName" && data.businessName.trim().length < 2) {
        error = "Please enter your business name.";
      }
      if (field === "businessType" && !data.businessType) {
        error = "Please select a business type.";
      }
    }

    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }));
      return false;
    }
    return true;
  };

  const calculateCompletion = () => {
    let required = [];
    
    if (data.profileType === "individual") {
      required = [
        data.professionalName.trim().length >= 2,
        data.description.trim().length > 0
      ];
    } else {
      required = [
        data.businessName.trim().length >= 2,
        data.businessType !== "",
        data.description.trim().length > 0
      ];
    }
    
    const completed = required.filter(Boolean).length;
    // Base 20% + up to 30% for this step (assuming Step 1 & 2 took us to 20%)
    // Let's just calculate completion of THIS step independently for the dial, or overall?
    // Let's assume Step 1&2 = 25%. This step adds 25%.
    return 25 + Math.round((completed / required.length) * 25);
  };

  const isNextDisabled = false; // We validate on click

  const handleSave = async () => {
    try {
      await saveBusiness(data);
      setToastMessage("Your onboarding progress has been saved.");
    } catch (e) {
      setToastMessage("Could not save progress.");
    }
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleContinue = async () => {
    // Validate required fields based on profile type
    let isValid = true;
    
    if (data.profileType === "individual") {
      isValid = validateField("professionalName");
    } else {
      const nameValid = validateField("businessName");
      const typeValid = validateField("businessType");
      isValid = nameValid && typeValid;
    }
    
    if (isValid) {
      try {
        setToastMessage("Saving business profile...");

        let logoUrl = data.businessLogo;
        if (logoUrl && logoUrl.startsWith("data:image")) {
          const res = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: logoUrl })
          });
          if (res.ok) {
            const result = await res.json();
            logoUrl = result.url;
            setData(prev => ({ ...prev, businessLogo: logoUrl }));
          }
        }

        const dataToSave = { ...data, businessLogo: logoUrl };
        await saveBusiness(dataToSave);

        setToastMessage("Business profile saved successfully!");

        setTimeout(() => {
          router.push("/vendor/onboarding/services");
        }, 1000);
      } catch (error) {
        console.error("Error saving business profile:", error);
        setToastMessage("Failed to save. Please try again.");
      }
    } else {
      setTimeout(() => {
        if (data.profileType === "individual" && !data.professionalName.trim()) {
          document.getElementById('professionalName')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (data.profileType === "business" && !data.businessName.trim()) {
          document.getElementById('businessName')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (data.profileType === "business" && !data.businessType) {
          document.getElementById('businessType')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          document.getElementById('onboarding-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
      return false;
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen md:h-screen md:overflow-hidden bg-white flex flex-col font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <VendorOnboardingHeader />

      <div className="flex-1 flex flex-col md:flex-row md:overflow-hidden">
        {/* Left Visual Area */}
        <div className="w-full md:w-[40%] lg:w-[35%] md:h-full border-r border-slate-100 z-10 bg-white">
          <VendorProfessionalPreview 
            profileType={data.profileType}
            professionalName={data.professionalName}
            businessName={data.businessName}
            businessType={data.businessType}
            description={data.description}
            businessLogo={data.businessLogo}
            profilePhoto={step2Photo}
          />
        </div>

        {/* Right Form Area */}
        <div id="onboarding-scroll-container" className="w-full md:w-[60%] lg:w-[65%] md:h-full md:overflow-y-auto bg-white p-6 md:p-12 lg:p-16 flex items-start justify-center">
          <motion.div 
            variants={onboardingPageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full max-w-2xl"
          >
            <OnboardingProgress currentStep={3} totalSteps={9} label="Business / Professional Profile" />

            <div className="mb-10">
              <h1 className="text-3xl font-extrabold text-[var(--color-foreground)] tracking-tight mb-2">
                Business / Professional Profile
              </h1>
              <p className="text-slate-500 font-medium">
                Create your professional identity. This is how you will appear to customers on UrbanClone.
              </p>
            </div>

            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-10">
              
              {/* Profile Type Selection */}
              <motion.section variants={staggerItem}>
                <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-4">
                  How do you provide services?
                </h3>
                <ProfileTypeSelector 
                  value={data.profileType} 
                  onChange={(val) => {
                    updateField("profileType", val);
                    setErrors({});
                  }} 
                />
              </motion.section>

              {/* Dynamic Identity Fields */}
              <motion.section variants={staggerItem} className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
                <div className="space-y-6">
                  
                  {/* Individual Name Field */}
                  <AnimatePresence initial={false}>
                    {data.profileType === "individual" && (
                      <motion.div
                        key="individual-name"
                        variants={expandCollapse}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="space-y-1.5 relative overflow-hidden"
                      >
                        <label className="text-sm font-semibold text-[var(--color-foreground)]" htmlFor="professionalName">
                          Professional / Display Name
                        </label>
                        <div className="relative">
                          <Input
                            id="professionalName"
                            type="text"
                            placeholder="e.g. Rahul Home Services"
                            value={data.professionalName}
                            onChange={(e) => updateField("professionalName", e.target.value)}
                            onBlur={() => validateField("professionalName")}
                            className={`pl-10 h-12 transition-all duration-300 focus:border-[var(--color-primary)] ${errors.professionalName ? 'border-red-400 focus-visible:ring-red-400/20' : ''}`}
                          />
                          <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        </div>
                        <p className="text-xs text-slate-500 mt-1">This name will be visible to customers.</p>
                        {errors.professionalName && <p className="text-xs font-bold text-red-500 absolute -bottom-5 left-0">{errors.professionalName}</p>}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Business Name Field */}
                  <AnimatePresence initial={false}>
                    {data.profileType === "business" && (
                      <motion.div
                        key="business-name"
                        variants={expandCollapse}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="space-y-1.5 relative overflow-hidden"
                      >
                        <label className="text-sm font-semibold text-[var(--color-foreground)]" htmlFor="businessName">
                          Business / Agency Name
                        </label>
                        <div className="relative">
                          <Input
                            id="businessName"
                            type="text"
                            placeholder="e.g. Rahul Home Solutions"
                            value={data.businessName}
                            onChange={(e) => updateField("businessName", e.target.value)}
                            onBlur={() => validateField("businessName")}
                            className={`pl-10 h-12 transition-all duration-300 focus:border-[var(--color-primary)] ${errors.businessName ? 'border-red-400 focus-visible:ring-red-400/20' : ''}`}
                          />
                          <Building2 className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Use the name customers know your business by.</p>
                        {errors.businessName && <p className="text-xs font-bold text-red-500 absolute -bottom-5 left-0">{errors.businessName}</p>}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Business Type Field */}
                  <AnimatePresence initial={false}>
                    {data.profileType === "business" && (
                      <motion.div
                        key="business-type"
                        variants={expandCollapse}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="space-y-1.5 pt-4 border-t border-slate-100 overflow-hidden relative"
                      >
                        <label className="text-sm font-semibold text-[var(--color-foreground)]" htmlFor="businessType">
                          Business Type
                        </label>
                        <BusinessTypeSelector 
                          value={data.businessType} 
                          onChange={(val) => { updateField("businessType", val); validateField("businessType"); }}
                          error={errors.businessType}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </motion.section>

              {/* Description Section */}
              <motion.section variants={staggerItem}>
                <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-4">
                  About Your Business
                </h3>
                <ProfessionalDescription 
                  value={data.description} 
                  onChange={(val) => updateField("description", val)} 
                />
              </motion.section>

              {/* Business Logo Upload */}
              <AnimatePresence initial={false}>
                {data.profileType === "business" && (
                  <motion.section 
                    variants={expandCollapse}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-[var(--color-foreground)]">
                        Business Logo
                      </h3>
                      <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded">Optional</span>
                    </div>
                    <BusinessLogoUpload 
                      value={data.businessLogo} 
                      onChange={(val) => updateField("businessLogo", val)} 
                    />
                  </motion.section>
                )}
              </AnimatePresence>

              {/* Profile Completion */}
              <motion.div variants={staggerItem}>
                <ProfileCompletion percentage={calculateCompletion()} />
              </motion.div>

            </motion.div>

            <OnboardingNavigation 
              onBack={() => router.push("/vendor/onboarding/personal")}
              onSave={handleSave}
              onContinue={handleContinue}
              isNextDisabled={isNextDisabled}
            />

          </motion.div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl font-medium text-sm flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
