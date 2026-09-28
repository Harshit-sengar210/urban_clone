"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ClipboardCheck, 
  User, 
  Briefcase, 
  Wrench, 
  MapPin, 
  Award, 
  ShieldCheck, 
  Landmark, 
  CalendarDays,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";

import { VendorOnboardingHeader } from "@/components/vendor-onboarding/VendorOnboardingHeader";
import { OnboardingProgress } from "@/components/vendor-onboarding/OnboardingProgress";
import { ReviewSectionCard } from "@/components/vendor-onboarding/ReviewSectionCard";
import { SubmitConfirmationModal } from "@/components/vendor-onboarding/SubmitConfirmationModal";
import { cn } from "@/lib/utils";
import { onboardingPageVariants, staggerContainer, staggerItem } from "@/components/vendor-onboarding/animations";
import { useVendorOnboarding } from "@/contexts/vendor/VendorOnboardingProvider";

export default function ReviewSubmitPage() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [confirmAccurate, setConfirmAccurate] = useState(false);
  const [confirmReview, setConfirmReview] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { application, loading, validation, submitApp } = useVendorOnboarding();
  const userData: any = application;

  const isStep2Complete = validation?.sections?.personal === "complete";
  const isStep3Complete = validation?.sections?.business === "complete";
  const isStep4Complete = validation?.sections?.services === "complete";
  const isStep5Complete = validation?.sections?.serviceArea === "complete";
  const isStep6Complete = validation?.sections?.experience === "complete";
  const isStep7Complete = validation?.sections?.verification === "complete";
  const isStep8Complete = validation?.sections?.payouts === "complete";
  const isStep9Complete = validation?.sections?.availability === "complete";

  const allStepsComplete = validation?.isComplete ?? false;
  
  const canSubmit = allStepsComplete && confirmAccurate && confirmReview && !isSubmitting;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setIsModalOpen(true);
  };

  const handleModalSubmit = async () => {
    try {
      await submitApp();
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please try again.");
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen md:h-screen md:overflow-hidden bg-slate-50 flex flex-col font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <VendorOnboardingHeader />

      <div className="flex-1 flex flex-col md:flex-row md:overflow-hidden max-w-7xl mx-auto w-full">
        
        {/* Left Review Content Area */}
        <div className="w-full md:w-[65%] md:h-full md:overflow-y-auto p-6 md:p-10 lg:p-12 order-2 md:order-1 no-scrollbar">
          <motion.div 
            variants={onboardingPageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full max-w-3xl mx-auto pb-24"
          >
            <div className="hidden md:block mb-8">
              {allStepsComplete ? (
                <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full w-max">
                  <ClipboardCheck className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Application Ready</span>
                </div>
              ) : (
                <OnboardingProgress currentStep={9} totalSteps={9} label="Review & Submit" />
              )}
            </div>

            <div className="mb-10">
              <h1 className="text-3xl font-extrabold text-[var(--color-foreground)] tracking-tight mb-2">
                Review Your Partner Application
              </h1>
              <p className="text-slate-500 font-medium leading-relaxed">
                Everything looks good? Review your information before submitting your UrbanClone partner application. Please review each section carefully.
              </p>
            </div>

            {!allStepsComplete && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-amber-50 border border-amber-200 p-5 rounded-2xl mb-8 flex gap-4"
              >
                <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-amber-800 mb-1">Your application still needs attention</h4>
                  <p className="text-xs text-amber-700 leading-relaxed mb-4">
                    You have missing information in one or more sections. Please complete all required sections before submitting.
                  </p>
                  <ul className="text-xs space-y-2">
                    {!isStep2Complete && <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"/> Personal Information missing</li>}
                    {!isStep3Complete && <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"/> Professional Profile missing</li>}
                    {!isStep4Complete && <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"/> Services missing</li>}
                    {!isStep5Complete && <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"/> Service Area missing</li>}
                    {!isStep6Complete && <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"/> Experience missing</li>}
                    {!isStep7Complete && <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"/> Identity Verification incomplete</li>}
                    {!isStep8Complete && <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"/> Bank & Payout missing</li>}
                    {!isStep9Complete && <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"/> Availability missing</li>}
                  </ul>
                </div>
              </motion.div>
            )}

            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
              
              {/* 01 Personal Information */}
              <ReviewSectionCard
                title="01. Personal Information"
                summary="Your contact and profile information"
                icon={User}
                isComplete={isStep2Complete}
                editRoute="/vendor/onboarding/personal"
              >
                {(userData?.personal || userData?.fullName) ? (() => {
                  const p = userData.personal || userData;
                  return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    <div><span className="text-slate-400 text-xs font-bold block mb-1">Full Name</span><span className="font-semibold text-slate-800">{p.fullName}</span></div>
                    <div><span className="text-slate-400 text-xs font-bold block mb-1">Phone</span><span className="font-mono font-semibold text-slate-800">•••• •••• {p.phone?.slice(-4) || 'XXXX'}</span></div>
                    <div><span className="text-slate-400 text-xs font-bold block mb-1">Email</span><span className="font-semibold text-slate-800">{p.email?.replace(/(.{2})(.*)(?=@)/, "$1••••")}</span></div>
                    <div><span className="text-slate-400 text-xs font-bold block mb-1">Gender</span><span className="font-semibold text-slate-800 capitalize">{p.gender || '-'}</span></div>
                  </div>
                  );
                })() : (
                  <p className="text-sm text-slate-500 italic">No data provided.</p>
                )}
              </ReviewSectionCard>

              {/* 02 Professional Profile */}
              <ReviewSectionCard
                title="02. Professional Profile"
                summary="Your business identity and description"
                icon={Briefcase}
                isComplete={isStep3Complete}
                editRoute="/vendor/onboarding/business"
              >
                {(userData?.business || userData?.profileType) ? (() => {
                  const b = userData.business || userData;
                  return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    <div><span className="text-slate-400 text-xs font-bold block mb-1">Profile Type</span><span className="font-semibold text-slate-800 capitalize">{b.profileType?.replace('_', ' ')}</span></div>
                    <div><span className="text-slate-400 text-xs font-bold block mb-1">Professional Name</span><span className="font-semibold text-slate-800">{b.professionalName}</span></div>
                    <div className="sm:col-span-2"><span className="text-slate-400 text-xs font-bold block mb-1">Description</span><span className="font-medium text-slate-700">{b.description || 'None provided'}</span></div>
                  </div>
                  );
                })() : (
                  <p className="text-sm text-slate-500 italic">No data provided.</p>
                )}
              </ReviewSectionCard>

              {/* 03 Services & Expertise */}
              <ReviewSectionCard
                title="03. Services & Expertise"
                summary="Services you offer and your core skills"
                icon={Wrench}
                isComplete={isStep4Complete}
                editRoute="/vendor/onboarding/services"
              >
                {userData?.services ? (
                  <div className="space-y-4 text-sm">
                    <div>
                      <span className="text-slate-400 text-xs font-bold block mb-2">Selected Services</span>
                      <div className="flex flex-wrap gap-2">
                        {userData.services.selectedServiceIds?.map((s: string) => (
                          <span key={s} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-semibold text-xs capitalize">{s.replace(/-/g, ' ')}</span>
                        )) || 'None selected'}
                      </div>
                    </div>
                    {userData.services.skills?.length > 0 && (
                      <div>
                        <span className="text-slate-400 text-xs font-bold block mb-2">Skills</span>
                        <div className="flex flex-wrap gap-2">
                          {userData.services.skills.map((s: string) => (
                            <span key={s} className="px-2.5 py-1 border border-slate-200 text-slate-600 rounded-md font-medium text-xs">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 italic">No data provided.</p>
                )}
              </ReviewSectionCard>

              {/* 04 Service Area */}
              <ReviewSectionCard
                title="04. Service Area"
                summary="Where you operate and travel preferences"
                icon={MapPin}
                isComplete={isStep5Complete}
                editRoute="/vendor/onboarding/service-area"
              >
                {userData?.serviceArea ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    <div><span className="text-slate-400 text-xs font-bold block mb-1">Primary City</span><span className="font-semibold text-slate-800">{userData.serviceArea.city}</span></div>
                    <div><span className="text-slate-400 text-xs font-bold block mb-1">Service Radius</span><span className="font-semibold text-slate-800">{userData.serviceArea.radiusKm} km</span></div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 italic">No data provided.</p>
                )}
              </ReviewSectionCard>

              {/* 05 Experience */}
              <ReviewSectionCard
                title="05. Experience & Portfolio"
                summary="Your professional background"
                icon={Award}
                isComplete={isStep6Complete}
                editRoute="/vendor/onboarding/experience"
              >
                {userData?.experience ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    <div><span className="text-slate-400 text-xs font-bold block mb-1">Experience Level</span><span className="font-semibold text-slate-800 capitalize">{userData.experience.experienceLevel?.replace('-', ' ')}</span></div>
                    {userData.experience.yearsOfExperience && <div><span className="text-slate-400 text-xs font-bold block mb-1">Years of Experience</span><span className="font-semibold text-slate-800">{userData.experience.yearsOfExperience} years</span></div>}
                    {userData.experience.certifications?.length > 0 && (
                      <div className="sm:col-span-2">
                        <span className="text-slate-400 text-xs font-bold block mb-1">Certifications</span>
                        <ul className="list-disc pl-4 text-slate-700">
                          {userData.experience.certifications.map((c: any, i: number) => <li key={i}>{c.name} ({c.year})</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 italic">No data provided.</p>
                )}
              </ReviewSectionCard>

              {/* 06 Identity */}
              <ReviewSectionCard
                title="06. Identity Verification"
                summary="Your KYC documents"
                icon={ShieldCheck}
                isComplete={isStep7Complete}
                editRoute="/vendor/onboarding/verification"
              >
                {userData?.verification ? (
                  <div className="space-y-4 text-sm">
                    <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded-lg mb-4">Identity documents are sensitive and are displayed in a limited format during review.</p>
                    
                    {userData.verification.documents?.aadhaar && (
                      <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="font-semibold text-slate-700">Aadhaar Card</span>
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Ready for Review</span>
                      </div>
                    )}
                    {userData.verification.documents?.pan && (
                      <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="font-semibold text-slate-700">PAN Card</span>
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Ready for Review</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 italic">No documents saved.</p>
                )}
              </ReviewSectionCard>

              {/* 07 Payout */}
              <ReviewSectionCard
                title="07. Bank & Payout"
                summary="Where you receive your earnings"
                icon={Landmark}
                isComplete={isStep8Complete}
                editRoute="/vendor/onboarding/bank"
              >
                {userData?.payouts ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    <div><span className="text-slate-400 text-xs font-bold block mb-1">Payout Method</span><span className="font-semibold text-slate-800 capitalize">{userData.payouts.method?.replace('_', ' ')}</span></div>
                    {userData.payouts.method === 'bank_account' ? (
                      <>
                        <div><span className="text-slate-400 text-xs font-bold block mb-1">Bank Account</span><span className="font-mono font-semibold text-slate-800">•••• {userData.payouts.bank?.accountNumber?.slice(-4)}</span></div>
                        <div><span className="text-slate-400 text-xs font-bold block mb-1">Status</span><span className="text-emerald-600 font-bold text-xs uppercase tracking-widest">Details Ready</span></div>
                      </>
                    ) : (
                      <div><span className="text-slate-400 text-xs font-bold block mb-1">UPI ID</span><span className="font-mono font-semibold text-slate-800">{userData.payouts.upi?.upiId}</span></div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 italic">No data provided.</p>
                )}
              </ReviewSectionCard>

              {/* 08 Availability */}
              <ReviewSectionCard
                title="08. Availability & Preferences"
                summary="Your working hours and booking rules"
                icon={CalendarDays}
                isComplete={isStep9Complete}
                editRoute="/vendor/onboarding/availability"
              >
                {userData?.availability ? (
                  <div className="space-y-4 text-sm">
                    <div>
                      <span className="text-slate-400 text-xs font-bold block mb-2">Weekly Schedule</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {userData.availability.weeklySchedule?.map((d: any) => (
                          <div key={d.day} className="flex justify-between text-xs py-1 border-b border-slate-50">
                            <span className="capitalize font-medium text-slate-600">{d.day.slice(0, 3)}</span>
                            <span className={cn("font-mono font-semibold", d.enabled ? "text-slate-800" : "text-slate-300")}>
                              {d.enabled ? `${d.startTime} - ${d.endTime}` : "Unavailable"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-2">
                      <span className="text-slate-400 text-xs font-bold block mb-2">Preferences</span>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div><span className="text-slate-500">Same-Day:</span> <span className="font-bold text-slate-700">{userData.availability.preferences?.acceptSameDayRequests ? "Enabled" : "Disabled"}</span></div>
                        <div><span className="text-slate-500">Auto-Accept:</span> <span className="font-bold text-slate-700">{userData.availability.preferences?.autoAcceptBookings ? "Enabled" : "Disabled"}</span></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 italic">No data provided.</p>
                )}
              </ReviewSectionCard>

              {/* Confirmations */}
              <div className="pt-8 space-y-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 shrink-0">
                    <input
                      type="checkbox"
                      checked={confirmAccurate}
                      onChange={(e) => setConfirmAccurate(e.target.checked)}
                      className="peer w-5 h-5 rounded border-2 border-slate-300 appearance-none checked:border-[var(--color-primary)] checked:bg-[var(--color-primary)] transition-all cursor-pointer"
                    />
                    <CheckCircle2 className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                  <span className="text-sm font-medium leading-relaxed select-none transition-colors text-slate-600 group-hover:text-slate-900">
                    I confirm that the information provided in this application is accurate and belongs to me.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 shrink-0">
                    <input
                      type="checkbox"
                      checked={confirmReview}
                      onChange={(e) => setConfirmReview(e.target.checked)}
                      className="peer w-5 h-5 rounded border-2 border-slate-300 appearance-none checked:border-[var(--color-primary)] checked:bg-[var(--color-primary)] transition-all cursor-pointer"
                    />
                    <CheckCircle2 className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                  <span className="text-sm font-medium leading-relaxed select-none transition-colors text-slate-600 group-hover:text-slate-900">
                    I understand that submitting this application sends my profile for review.
                  </span>
                </label>
              </div>

            </motion.div>
          </motion.div>
        </div>

        {/* Right Submission Summary Sticky Card */}
        <div className="w-full md:w-[35%] bg-white border-t md:border-t-0 md:border-l border-slate-100 p-6 md:p-8 order-1 md:order-2">
          <div className="sticky top-8">
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl text-white relative overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
              
              <h3 className="text-lg font-bold mb-6">Application Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-3">
                  <span className="text-slate-400">Profile</span>
                  <span className={cn("font-bold", isStep2Complete && isStep3Complete ? "text-emerald-400" : "text-amber-400")}>
                    {isStep2Complete && isStep3Complete ? "Complete" : "Incomplete"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-3">
                  <span className="text-slate-400">Services & Area</span>
                  <span className={cn("font-bold", isStep4Complete && isStep5Complete ? "text-emerald-400" : "text-amber-400")}>
                    {isStep4Complete && isStep5Complete ? "Complete" : "Incomplete"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-3">
                  <span className="text-slate-400">Identity Verification</span>
                  <span className={cn("font-bold", isStep7Complete ? "text-emerald-400" : "text-amber-400")}>
                    {isStep7Complete ? "Ready for Review" : "Incomplete"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Payout & Auth</span>
                  <span className={cn("font-bold", isStep8Complete && isStep9Complete ? "text-emerald-400" : "text-amber-400")}>
                    {isStep8Complete && isStep9Complete ? "Complete" : "Incomplete"}
                  </span>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-2xl p-4 mb-8 flex items-center justify-between border border-slate-700/50">
                <span className="font-bold text-sm">Overall Status</span>
                {allStepsComplete ? (
                  <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-indigo-500/30">
                    Ready to Submit
                  </span>
                ) : (
                  <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-amber-500/30">
                    Needs Attention
                  </span>
                )}
              </div>

              <button
                disabled={!canSubmit}
                onClick={handleSubmit}
                className="w-full h-12 bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>

              <button 
                onClick={() => router.push("/")}
                className="w-full h-10 mt-3 text-xs font-bold text-slate-400 hover:text-white transition-colors"
              >
                Save & Continue Later
              </button>
            </div>
            
            <p className="text-[10px] text-center text-slate-400 mt-6 px-4">
              You can update your profile later if changes are required during the review process.
            </p>
          </div>
        </div>

      </div>

      <SubmitConfirmationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
