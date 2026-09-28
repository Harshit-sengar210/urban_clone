"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import { VendorOnboardingHeader } from "@/components/vendor-onboarding/VendorOnboardingHeader";
import { OnboardingProgress } from "@/components/vendor-onboarding/OnboardingProgress";
import { ExperienceLevelSelector, ExperienceLevel } from "@/components/vendor-onboarding/ExperienceLevelSelector";
import { StrengthSelector } from "@/components/vendor-onboarding/StrengthSelector";
import { CertificationManager, VendorCertification } from "@/components/vendor-onboarding/CertificationManager";
import { PortfolioManager, VendorPortfolioItem } from "@/components/vendor-onboarding/PortfolioManager";
import { ProfessionalPreview } from "@/components/vendor-onboarding/ProfessionalPreview";
import { ProfileCompletion } from "@/components/vendor-onboarding/ProfileCompletion";
import { OnboardingNavigation } from "@/components/vendor-onboarding/OnboardingNavigation";
import { SkillsSelector } from "@/components/vendor-onboarding/SkillsSelector";
import { onboardingPageVariants, staggerContainer, staggerItem, shakeAnimation } from "@/components/vendor-onboarding/animations";
import { cn } from "@/lib/utils";
import { useVendorOnboarding } from "@/contexts/vendor/VendorOnboardingProvider";


type VendorExperienceData = {
  experienceLevel: ExperienceLevel | "";
  yearsOfExperience: number | null;
  description: string;
  skills: string[];
  certifications: VendorCertification[];
  portfolio: VendorPortfolioItem[];
  projectsCompleted: number | null;
  strengths: string[];
};

const DEFAULT_STATE: VendorExperienceData = {
  experienceLevel: "",
  yearsOfExperience: null,
  description: "",
  skills: [],
  certifications: [],
  portfolio: [],
  projectsCompleted: null,
  strengths: [],
};

export default function ExperiencePage() {
  const router = useRouter();
  const [data, setData] = useState<VendorExperienceData>(DEFAULT_STATE);
  const { application, loading, saveExperience } = useVendorOnboarding();
  const [toastMessage, setToastMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (application?.experience) {
      setData(prev => ({
        ...prev,
        ...application.experience,
        experienceLevel: (application.experience?.experienceLevel || "") as any,
        certifications: (application.experience?.certifications || []) as any,
        portfolio: (application.experience?.portfolio || []) as any
      }));
    }
  }, [application]);

  const [errors, setErrors] = useState<Partial<Record<keyof VendorExperienceData, boolean>>>({});



  

  const updateField = <K extends keyof VendorExperienceData>(field: K, value: VendorExperienceData[K]) => {
    setData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = () => {
    let newErrors: Partial<Record<keyof VendorExperienceData, boolean>> = {};
    let isValid = true;

    if (!data.experienceLevel) {
      newErrors.experienceLevel = true;
      isValid = false;
    }
    if (!data.description || data.description.trim().length < 10) {
      newErrors.description = true;
      isValid = false;
    }
    if (data.skills.length === 0) {
      newErrors.skills = true;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = async () => {
    try {
      await saveExperience(data);
      setToastMessage("Your onboarding progress has been saved.");
    } catch (e) {
      setToastMessage("Could not save progress.");
    }
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleContinue = async () => {
    if (validate()) {
      try {
        setToastMessage("Saving experience details...");
        
        let updatedPortfolio = [...data.portfolio];

        // Upload any new base64 portfolio images
        for (let i = 0; i < updatedPortfolio.length; i++) {
          const item = updatedPortfolio[i];
          if (item.localPreviewUrl.startsWith("data:image")) {
            const res = await fetch("/api/upload", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ image: item.localPreviewUrl })
            });
            if (res.ok) {
              const result = await res.json();
              updatedPortfolio[i].localPreviewUrl = result.url;
            }
          }
        }
        
        // Update local state in case user navigates back
        setData(prev => ({ ...prev, portfolio: updatedPortfolio }));

        // Save to Firestore
        

        await saveExperience(data);
        setToastMessage("Experience details saved successfully!");

        setTimeout(() => {
          // Point to step 7 (verification or policies etc)
          router.push("/vendor/onboarding/verification");
        }, 1000);
      } catch (error) {
        console.error("Error saving experience details:", error);
        setToastMessage("Failed to save. Please try again.");
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const calculateCompletion = () => {
    // Steps 1-5 = 85%
    let score = 85;
    if (data.experienceLevel) score += 3;
    if (data.description) score += 3;
    if (data.skills.length > 0) score += 3;
    if (data.portfolio.length > 0) score += 3;
    if (data.certifications.length > 0) score += 3;
    return Math.min(score, 100);
  };

  if (loading) return null;

  return (
    <div className="min-h-screen md:h-screen md:overflow-hidden bg-white flex flex-col font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <VendorOnboardingHeader />

      <div className="flex-1 flex flex-col md:flex-row md:overflow-hidden">
        
        {/* Left Form Area */}
        <div className="w-full md:w-[60%] md:h-full md:overflow-y-auto bg-white p-6 md:p-12 lg:p-16 flex items-start justify-center order-2 md:order-1 border-r border-slate-100">
          <motion.div 
            variants={onboardingPageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full max-w-2xl pb-12"
          >
            <OnboardingProgress currentStep={6} totalSteps={9} label="Experience & Work Portfolio" />

            <div className="mb-10">
              <h1 className="text-3xl font-extrabold text-[var(--color-foreground)] tracking-tight mb-2">
                Tell us about your experience
              </h1>
              <p className="text-slate-500 font-medium">
                Show customers the experience, skills, and work that make you a trusted professional.
                <span className="block text-xs mt-1 text-slate-400">You can update these details later from your vendor profile.</span>
              </p>
            </div>

            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-12">
              
              {/* Experience Range */}
              <motion.section variants={staggerItem} className="space-y-4">
                <div className="flex justify-between items-end">
                  <h3 className="text-sm font-semibold text-[var(--color-foreground)]">
                    How much experience do you have?
                  </h3>
                </div>
                
                <motion.div animate={errors.experienceLevel ? shakeAnimation : {}}>
                  <ExperienceLevelSelector 
                    value={data.experienceLevel} 
                    onChange={(level) => updateField("experienceLevel", level)} 
                    error={errors.experienceLevel}
                  />
                  {errors.experienceLevel && <p className="text-xs font-bold text-red-500 mt-2">Please select your experience level.</p>}
                </motion.div>
                
                {data.experienceLevel && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="pt-4 flex gap-4">
                    <div className="flex-1 space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Exact Years (Optional)</label>
                      <input
                        type="number"
                        min={0}
                        placeholder="e.g. 8"
                        value={data.yearsOfExperience || ""}
                        onChange={(e) => updateField("yearsOfExperience", e.target.value ? Number(e.target.value) : null)}
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm font-semibold"
                      />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Projects Completed (Optional)</label>
                      <input
                        type="number"
                        min={0}
                        placeholder="e.g. 120"
                        value={data.projectsCompleted || ""}
                        onChange={(e) => updateField("projectsCompleted", e.target.value ? Number(e.target.value) : null)}
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm font-semibold"
                      />
                    </div>
                  </motion.div>
                )}
              </motion.section>

              {/* About Your Experience */}
              <motion.section variants={staggerItem} className="space-y-4">
                <div className="flex justify-between items-end">
                  <h3 className="text-sm font-semibold text-[var(--color-foreground)]">
                    About Your Experience
                  </h3>
                  <span className={cn(
                    "text-xs font-bold transition-colors",
                    data.description.length > 1000 ? "text-red-500" : "text-slate-400"
                  )}>
                    {data.description.length} / 1000
                  </span>
                </div>
                
                <motion.div animate={errors.description ? shakeAnimation : {}}>
                  <textarea
                    placeholder="Tell customers about your professional experience, specialties, and what they can expect from you..."
                    value={data.description}
                    onChange={(e) => {
                      if (e.target.value.length <= 1000) {
                        updateField("description", e.target.value);
                      }
                    }}
                    className={cn(
                      "w-full h-32 p-4 rounded-2xl border transition-all outline-none text-sm font-medium resize-none leading-relaxed",
                      errors.description ? "border-red-400 bg-red-50 focus:ring-4 focus:ring-red-100" : "border-slate-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-primary/10 bg-white"
                    )}
                  />
                  {errors.description && <p className="text-xs font-bold text-red-500 mt-2">Please provide a brief professional introduction.</p>}
                </motion.div>
              </motion.section>

              {/* Skills */}
              <motion.section variants={staggerItem} className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-1">
                    Your Key Skills
                  </h3>
                  <p className="text-xs text-slate-500">Select the skills that best describe your professional strengths.</p>
                </div>
                <motion.div animate={errors.skills ? shakeAnimation : {}}>
                  <SkillsSelector 
                    selectedSkills={data.skills} 
                    onChange={(skills) => updateField("skills", skills)} 
                  />
                  {errors.skills && <p className="text-xs font-bold text-red-500 mt-2">Please select at least one skill.</p>}
                </motion.div>
              </motion.section>

              {/* Strengths */}
              <motion.section variants={staggerItem} className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-1">
                    What are you known for? <span className="text-xs font-normal text-slate-400 ml-2">Optional</span>
                  </h3>
                </div>
                <StrengthSelector 
                  selectedStrengths={data.strengths} 
                  onChange={(strengths) => updateField("strengths", strengths)} 
                />
              </motion.section>

              {/* Certifications */}
              <motion.section variants={staggerItem} className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-1">
                    Certifications & Qualifications <span className="text-xs font-normal text-slate-400 ml-2">Optional</span>
                  </h3>
                  <p className="text-xs text-slate-500">Add professional training or qualifications that support your expertise.</p>
                </div>
                <CertificationManager 
                  certifications={data.certifications} 
                  onChange={(certs) => updateField("certifications", certs)} 
                />
              </motion.section>

              {/* Portfolio */}
              <motion.section variants={staggerItem} className="space-y-4 pt-6 border-t border-slate-100">
                <div>
                  <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-1">
                    Showcase Your Work <span className="text-xs font-normal text-slate-400 ml-2">Optional</span>
                  </h3>
                  <p className="text-xs text-slate-500">Add photos of your previous work to help customers understand your experience.</p>
                </div>
                <PortfolioManager 
                  items={data.portfolio} 
                  onChange={(items) => updateField("portfolio", items)} 
                />
              </motion.section>

              {/* Profile Completion */}
              <motion.div variants={staggerItem}>
                <ProfileCompletion percentage={calculateCompletion()} />
              </motion.div>

            </motion.div>

            <div className="mt-12">
              <OnboardingNavigation 
                onBack={() => router.push("/vendor/onboarding/service-area")}
                onSave={handleSave}
                onContinue={handleContinue}
                isNextDisabled={false}
              />
            </div>
          </motion.div>
        </div>

        {/* Right Visual Area (Desktop Only) */}
        <div className="hidden md:flex w-[40%] h-full flex-col relative order-1 md:order-2 bg-slate-50 border-l border-slate-100">
          <ProfessionalPreview 
            experienceLevel={data.experienceLevel}
            yearsOfExperience={data.yearsOfExperience}
            description={data.description}
            skills={data.skills}
            portfolio={data.portfolio}
            projectsCompleted={data.projectsCompleted}
          />
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
