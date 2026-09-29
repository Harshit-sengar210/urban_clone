"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User, Calendar, Phone, Mail, CheckCircle2, KeyRound, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { updateEmail, updatePassword } from "firebase/auth";
import { Input } from "@/components/ui/input";

import { VendorOnboardingHeader } from "@/components/vendor-onboarding/VendorOnboardingHeader";
import { OnboardingProgress } from "@/components/vendor-onboarding/OnboardingProgress";
import { VendorProfilePreview } from "@/components/vendor-onboarding/VendorProfilePreview";
import { ProfilePhotoUpload } from "@/components/vendor-onboarding/ProfilePhotoUpload";
import { GenderSelector } from "@/components/vendor-onboarding/GenderSelector";
import { VerificationField } from "@/components/vendor-onboarding/VerificationField";
import { ProfileCompletion } from "@/components/vendor-onboarding/ProfileCompletion";
import { OnboardingNavigation } from "@/components/vendor-onboarding/OnboardingNavigation";
import { onboardingPageVariants, staggerContainer, staggerItem } from "@/components/vendor-onboarding/animations";
import { auth } from "@/backend/firebase";
import { useVendorOnboarding } from "@/contexts/vendor/VendorOnboardingProvider";

// Types
type VerificationStatus = "unverified" | "sending" | "pending" | "verified" | "failed";
type Gender = "male" | "female" | "other" | "prefer_not_to_say" | "";

type VendorPersonalInfo = {
  fullName: string;
  profilePhoto: string | null;
  dateOfBirth: string;
  gender: Gender;
  phone: string;
  phoneStatus: VerificationStatus;
  email: string;
  password: string;
  alternatePhone: string;
};

const DEFAULT_STATE: VendorPersonalInfo = {
  fullName: "",
  profilePhoto: null,
  dateOfBirth: "",
  gender: "",
  phone: "",
  phoneStatus: "unverified",
  email: "",
  password: "",
  alternatePhone: "",
};

export default function PersonalInfoPage() {
  const router = useRouter();
  const [data, setData] = useState<VendorPersonalInfo>(DEFAULT_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof VendorPersonalInfo | "confirmPassword", string>>>({});
  const [toastMessage, setToastMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const { application, loading, savePersonal, error: contextError } = useVendorOnboarding();

  useEffect(() => {
    if (application?.personal) {
      setData(prev => ({
        ...prev,
        ...application.personal,
        gender: (application.personal?.gender || "") as any,
        phoneStatus: (application.personal?.phoneStatus || "unverified") as any
      }));
    }
  }, [application]);

  // Removed old localStorage logic

  const updateField = <K extends keyof VendorPersonalInfo>(field: K, value: VendorPersonalInfo[K]) => {
    setData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Validation
  const validateAll = (): boolean => {
    const newErrors: typeof errors = {};
    let valid = true;
    if (data.fullName.trim().length < 3) { newErrors.fullName = "Please enter a valid full name."; valid = false; }
    if (!data.dateOfBirth) { newErrors.dateOfBirth = "Please enter your date of birth."; valid = false; }
    if (!data.gender) { newErrors.gender = "Please select a gender."; valid = false; }
    if (data.phone.length < 10) { newErrors.phone = "Enter a valid 10-digit number."; valid = false; }
    setErrors(newErrors);
    return valid;
  };

  const calculateCompletion = () => {
    const required = [
      data.fullName.trim().length >= 3,
      data.dateOfBirth !== "",
      data.gender !== "",
      data.phone.length >= 10,
    ];
    const completed = required.filter(Boolean).length;
    return Math.round((completed / required.length) * 100);
  };

  const isNextDisabled = calculateCompletion() < 100;

  const handleSave = async () => {
    try {
      await savePersonal(data);
      setToastMessage("Your progress has been saved.");
    } catch (e) {
      setToastMessage("Could not save progress.");
    }
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleContinue = async () => {
    if (!validateAll()) {
      setTimeout(() => {
        if (data.fullName.trim().length < 3) {
          document.getElementById('fullName')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (!data.dateOfBirth) {
          document.getElementById('dob')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (!data.gender) {
          document.getElementById('gender-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (data.phone.length < 10) {
          document.getElementById('phone')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
          document.getElementById('onboarding-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
      return false;
    }
    try {
      setToastMessage("Saving profile...");
      let photoUrl = data.profilePhoto;
      if (photoUrl && photoUrl.startsWith("data:image")) {
        const { getStorage, ref, uploadString, getDownloadURL } = await import("firebase/storage");
        const { storage } = await import("@/backend/firebase");
        
        const fileRef = ref(storage, `vendors/profile_${Date.now()}`);
        await uploadString(fileRef, photoUrl, 'data_url');
        photoUrl = await getDownloadURL(fileRef);
        setData(prev => ({ ...prev, profilePhoto: photoUrl }));
      }

      const dataToSave = { ...data, profilePhoto: photoUrl };
      await savePersonal(dataToSave);
      
      setToastMessage("Profile saved successfully!");
      setTimeout(() => {
        router.push("/vendor/onboarding/business");
      }, 1000);
    } catch (error: any) {
      console.error("Error saving profile:", error);
      setToastMessage(`Failed to save profile: ${error.message || 'Please try again.'}`);
      setTimeout(() => setToastMessage(""), 5000);
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen md:h-screen md:overflow-hidden bg-white flex flex-col font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <VendorOnboardingHeader />

      <div className="flex-1 flex flex-col md:flex-row md:overflow-hidden">
        {/* Left Visual Area */}
        <div className="w-full md:w-[40%] lg:w-[35%] md:h-full border-r border-slate-100 z-10 bg-white">
          <VendorProfilePreview fullName={data.fullName} profilePhoto={data.profilePhoto} />
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
            <OnboardingProgress currentStep={2} totalSteps={9} label="Personal Information" />

            <div className="mb-10">
              <h1 className="text-3xl font-extrabold text-[var(--color-foreground)] tracking-tight mb-2">
                Personal Information
              </h1>
              <p className="text-slate-500 font-medium">
                Use your legal details so we can verify your partner account.
              </p>
            </div>

            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-12">
              
              {/* Profile Photo */}
              <motion.div variants={staggerItem}>
                <ProfilePhotoUpload 
                  value={data.profilePhoto} 
                  onChange={(val) => updateField("profilePhoto", val)} 
                />
              </motion.div>

              {/* Basic Details Section */}
              <motion.section variants={staggerItem} className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">1</div>
                  Basic Details
                </h3>

                <div className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-[var(--color-foreground)]" htmlFor="fullName">
                      Full Legal Name
                    </label>
                    <div className="relative">
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={data.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        className={`pl-10 h-12 transition-all duration-300 focus:border-[var(--color-primary)] ${errors.fullName ? 'border-red-400 focus-visible:ring-red-400/20' : ''}`}
                      />
                      <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Use the name shown on your official identification.</p>
                    {errors.fullName && <p className="text-xs font-bold text-red-500 mt-1">{errors.fullName}</p>}
                  </div>

                  {/* DOB */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-[var(--color-foreground)]" htmlFor="dob">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <Input
                        id="dob"
                        type="date"
                        value={data.dateOfBirth}
                        onChange={(e) => updateField("dateOfBirth", e.target.value)}
                        className={`pl-10 h-12 transition-all duration-300 focus:border-[var(--color-primary)] ${errors.dateOfBirth ? 'border-red-400 focus-visible:ring-red-400/20' : ''}`}
                      />
                      <Calendar className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                    {errors.dateOfBirth && <p className="text-xs font-bold text-red-500 mt-1">{errors.dateOfBirth}</p>}
                  </div>

                  {/* Gender */}
                  <div className="pt-4" id="gender-section">
                    <GenderSelector 
                      value={data.gender} 
                      onChange={(val) => { updateField("gender", val); setErrors(prev => ({...prev, gender: undefined})); }}
                      error={errors.gender}
                    />
                  </div>
                </div>
              </motion.section>

              {/* Contact Details Section */}
              <motion.section variants={staggerItem} className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">2</div>
                  Contact Details
                </h3>

                <div className="space-y-8">
                  {/* Phone */}
                  <VerificationField
                    id="phone"
                    label="Mobile Number"
                    type="tel"
                    placeholder="Enter mobile number"
                    value={data.phone}
                    onChange={(val) => updateField("phone", val)}
                    status={data.phoneStatus}
                    onStatusChange={(status) => updateField("phoneStatus", status)}
                    icon={<Phone className="w-5 h-5" />}
                    prefix="+91"
                    error={errors.phone}
                  />



                  {/* Alternate Phone */}
                  <div className="space-y-1.5 relative">
                    <label className="text-sm font-semibold text-[var(--color-foreground)] flex items-center justify-between" htmlFor="altPhone">
                      <span>Alternate Phone Number</span>
                      <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded">Optional</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-semibold z-10">+91</div>
                      <Input
                        id="altPhone"
                        type="tel"
                        placeholder="Enter alternate phone number"
                        value={data.alternatePhone}
                        onChange={(e) => updateField("alternatePhone", e.target.value)}
                        className="pl-[3.25rem] h-12 transition-all duration-300 focus:border-[var(--color-primary)]"
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Useful if customers need another way to reach you.</p>
                  </div>
                </div>
              </motion.section>

              {/* Profile Completion */}
              <motion.div variants={staggerItem}>
                <ProfileCompletion percentage={calculateCompletion()} />
              </motion.div>

            </motion.div>

            <OnboardingNavigation 
              onBack={() => router.push("/vendor/onboarding")}
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
