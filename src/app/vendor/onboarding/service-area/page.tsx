"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Info, CheckCircle2 } from "lucide-react";

import { VendorOnboardingHeader } from "@/components/vendor-onboarding/VendorOnboardingHeader";
import { OnboardingProgress } from "@/components/vendor-onboarding/OnboardingProgress";
import { CitySearch } from "@/components/vendor-onboarding/CitySearch";
import { ServiceRadiusSlider } from "@/components/vendor-onboarding/ServiceRadiusSlider";
import { ServiceCoverageMap } from "@/components/vendor-onboarding/ServiceCoverageMap";
import { AdditionalAreas } from "@/components/vendor-onboarding/AdditionalAreas";
import { ServiceAreaSummary } from "@/components/vendor-onboarding/ServiceAreaSummary";
import { ProfileCompletion } from "@/components/vendor-onboarding/ProfileCompletion";
import { OnboardingNavigation } from "@/components/vendor-onboarding/OnboardingNavigation";
import { onboardingPageVariants, staggerContainer, staggerItem, shakeAnimation, expandCollapse } from "@/components/vendor-onboarding/animations";
import { cn } from "@/lib/utils";
import { useVendorOnboarding } from "@/contexts/vendor/VendorOnboardingProvider";


type VendorServiceArea = {
  city: string;
  locality: string;
  pinCode: string;
  radiusKm: number;
  additionalAreas: string[];
};

const DEFAULT_STATE: VendorServiceArea = {
  city: "",
  locality: "",
  pinCode: "",
  radiusKm: 5,
  additionalAreas: [],
};

export default function ServiceAreaPage() {
  const router = useRouter();
  const [data, setData] = useState<VendorServiceArea>(DEFAULT_STATE);
  const { application, loading, saveServiceArea } = useVendorOnboarding();
  const [toastMessage, setToastMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (application?.serviceArea) {
      setData(prev => ({
        ...prev,
        ...application.serviceArea
      }));
    }
  }, [application]);

  const [errors, setErrors] = useState<Partial<Record<keyof VendorServiceArea, boolean>>>({});



  

  const updateField = <K extends keyof VendorServiceArea>(field: K, value: VendorServiceArea[K]) => {
    setData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = () => {
    let newErrors: Partial<Record<keyof VendorServiceArea, boolean>> = {};
    let isValid = true;

    if (!data.city) {
      newErrors.city = true;
      isValid = false;
    }
    if (!data.locality || data.locality.trim().length < 2) {
      newErrors.locality = true;
      isValid = false;
    }
    if (!data.pinCode || !/^\d{6}$/.test(data.pinCode)) {
      newErrors.pinCode = true;
      isValid = false;
    }
    if (!data.radiusKm) {
      newErrors.radiusKm = true;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = async () => {
    try {
      await saveServiceArea(data);
      setToastMessage("Your onboarding progress has been saved.");
    } catch (e) {
      setToastMessage("Could not save progress.");
    }
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleContinue = async () => {
    if (validate()) {
      try {
        setToastMessage("Saving service area...");
        
        // Save to Firestore
        

        await saveServiceArea(data);
        setToastMessage("Service area saved successfully!");

        setTimeout(() => {
          // Point to step 6 (experience)
          router.push("/vendor/onboarding/experience");
        }, 1000);
      } catch (error) {
        console.error("Error saving service area:", error);
        setToastMessage("Failed to save. Please try again.");
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const calculateCompletion = () => {
    // Steps 1-4 = 75%
    let score = 75;
    if (data.city) score += 5;
    if (data.locality) score += 5;
    if (data.pinCode) score += 5;
    if (data.radiusKm) score += 10;
    return Math.min(score, 100);
  };

  if (loading) return null;

  return (
    <div className="min-h-screen md:h-screen md:overflow-hidden bg-white flex flex-col font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <VendorOnboardingHeader />

      <div className="flex-1 flex flex-col md:flex-row md:overflow-hidden">
        
        {/* Left Form Area */}
        <div className="w-full md:w-[55%] lg:w-[60%] md:h-full md:overflow-y-auto bg-white p-6 md:p-12 lg:p-16 flex items-start justify-center order-2 md:order-1 border-r border-slate-100">
          <motion.div 
            variants={onboardingPageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full max-w-xl"
          >
            <OnboardingProgress currentStep={5} totalSteps={9} label="Service Area & Location" />

            <div className="mb-10">
              <h1 className="text-3xl font-extrabold text-[var(--color-foreground)] tracking-tight mb-2">
                Where do you provide your services?
              </h1>
              <p className="text-slate-500 font-medium">
                Tell us where you work and how far you're willing to travel for customers.
                <span className="block text-xs mt-1 text-slate-400">You can update your service areas later.</span>
              </p>
            </div>

            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-12">
              
              {/* Primary Location Form */}
              <motion.section variants={staggerItem} className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
                <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-6">
                  Primary Service Location
                </h3>
                
                <div className="space-y-6">
                  {/* City */}
                  <motion.div animate={errors.city ? shakeAnimation : {}} className="space-y-1.5 relative">
                    <label className="text-sm font-semibold text-[var(--color-foreground)]">City</label>
                    <CitySearch value={data.city} onChange={(city) => updateField("city", city)} error={errors.city} />
                    {errors.city && <p className="text-xs font-bold text-red-500 absolute -bottom-5 left-0">Please select a city.</p>}
                  </motion.div>

                  {/* Locality */}
                  <motion.div animate={errors.locality ? shakeAnimation : {}} className="space-y-1.5 relative pt-4">
                    <label className="text-sm font-semibold text-[var(--color-foreground)]">Area / Locality</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. Indirapuram"
                        value={data.locality}
                        onChange={(e) => updateField("locality", e.target.value)}
                        className={cn(
                          "w-full h-12 pl-10 pr-4 rounded-xl border transition-all outline-none text-sm font-semibold",
                          errors.locality ? "border-red-400 bg-red-50/50 focus:ring-4 focus:ring-red-100" : "border-slate-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-primary/10 bg-slate-50 focus:bg-white"
                        )}
                      />
                      <MapPin className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">This helps us understand your primary service area.</p>
                    {errors.locality && <p className="text-xs font-bold text-red-500 absolute -bottom-5 left-0">Please enter a valid locality.</p>}
                  </motion.div>

                  {/* PIN Code */}
                  <motion.div animate={errors.pinCode ? shakeAnimation : {}} className="space-y-1.5 relative pt-4">
                    <label className="text-sm font-semibold text-[var(--color-foreground)]">PIN Code</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="Enter 6-digit PIN code"
                      value={data.pinCode}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        updateField("pinCode", val);
                      }}
                      className={cn(
                        "w-full h-12 px-4 rounded-xl border transition-all outline-none text-sm font-semibold",
                        errors.pinCode ? "border-red-400 bg-red-50/50 focus:ring-4 focus:ring-red-100" : "border-slate-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-primary/10 bg-slate-50 focus:bg-white"
                      )}
                    />
                    
                    <AnimatePresence>
                      {data.pinCode && data.pinCode.length === 6 && !errors.pinCode && (
                        <motion.div 
                          initial={{ opacity: 0, y: -4 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          exit={{ opacity: 0, y: -4 }}
                          className="flex items-center gap-1 mt-1.5 text-green-600 text-xs font-bold"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Valid PIN format
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {errors.pinCode && <p className="text-xs font-bold text-red-500 absolute -bottom-5 left-0">Enter a valid 6-digit PIN code.</p>}
                  </motion.div>
                </div>
              </motion.section>

              {/* Mobile Only: Map Visualization (Desktop shows it on the right) */}
              <div className="block md:hidden">
                <motion.section variants={staggerItem} className="rounded-3xl overflow-hidden shadow-sm border border-slate-100">
                  <ServiceCoverageMap city={data.city} locality={data.locality} radiusKm={data.radiusKm} />
                </motion.section>
              </div>

              {/* Radius Slider */}
              <motion.section variants={staggerItem}>
                <div className="mb-6 flex items-end justify-between">
                  <h3 className="text-sm font-semibold text-[var(--color-foreground)]">
                    How far are you willing to travel?
                  </h3>
                  <span className="text-xl font-extrabold text-[var(--color-primary)]">{data.radiusKm} km</span>
                </div>
                
                <ServiceRadiusSlider 
                  value={data.radiusKm} 
                  onChange={(val) => updateField("radiusKm", val)} 
                />
              </motion.section>

              {/* Additional Areas */}
              <motion.section variants={staggerItem}>
                <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-2">
                  Additional Areas
                </h3>
                <p className="text-xs text-slate-500 mb-4">Add nearby areas where you're also comfortable providing services.</p>
                
                <AdditionalAreas 
                  areas={data.additionalAreas} 
                  onChange={(areas) => updateField("additionalAreas", areas)} 
                />
              </motion.section>

              {/* Info Card */}
              <motion.section variants={staggerItem} className="bg-blue-50/50 border border-blue-100/50 rounded-xl p-4 flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Info className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-blue-900 uppercase tracking-widest mb-1">How service radius works</h4>
                  <p className="text-xs font-medium text-blue-800/70 leading-relaxed">
                    Customers within your selected service area can be matched with your services when your profile and availability meet the booking requirements.
                  </p>
                </div>
              </motion.section>

              {/* Mobile Only: Summary */}
              <div className="block md:hidden">
                <motion.section variants={staggerItem}>
                  <ServiceAreaSummary 
                    city={data.city} 
                    locality={data.locality} 
                    pinCode={data.pinCode} 
                    radiusKm={data.radiusKm} 
                    additionalAreas={data.additionalAreas} 
                  />
                </motion.section>
              </div>

              {/* Profile Completion */}
              <motion.div variants={staggerItem}>
                <ProfileCompletion percentage={calculateCompletion()} />
              </motion.div>

            </motion.div>

            <div className="mt-12">
              <OnboardingNavigation 
                onBack={() => router.push("/vendor/onboarding/services")}
                onSave={handleSave}
                onContinue={handleContinue}
                isNextDisabled={false} // validation handles click
              />
            </div>
          </motion.div>
        </div>

        {/* Right Visual Area (Desktop Only) */}
        <div className="hidden md:flex w-[45%] lg:w-[40%] h-full flex-col relative order-1 md:order-2 bg-slate-50 border-l border-slate-100 overflow-hidden">
          
          {/* Map takes remaining space */}
          <div className="flex-1 w-full relative min-h-0">
            <ServiceCoverageMap city={data.city} locality={data.locality} radiusKm={data.radiusKm} />
            {/* Gradient blend to white summary background */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none z-20" />
          </div>
          
          {/* Summary sits at the bottom */}
          <div className="w-full bg-white relative z-30 pt-6 pb-8 px-6 lg:px-12 shrink-0 border-t border-slate-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
            <ServiceAreaSummary 
              city={data.city} 
              locality={data.locality} 
              pinCode={data.pinCode} 
              radiusKm={data.radiusKm} 
              additionalAreas={data.additionalAreas} 
            />
          </div>
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
