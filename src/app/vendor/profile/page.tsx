"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, Loader2 } from "lucide-react";
import { onSnapshot, doc } from "firebase/firestore";

import { VendorLayout } from "@/components/vendor-dashboard/VendorLayout";
import { ProfileHeader } from "@/components/vendor-profile/ProfileHeader";
import { ProfileHero } from "@/components/vendor-profile/ProfileHero";
import { PersonalInfoEditor } from "@/components/vendor-profile/PersonalInfoEditor";
import { ProfessionalProfileEditor } from "@/components/vendor-profile/ProfessionalProfileEditor";
import { ExperienceEditor } from "@/components/vendor-profile/ExperienceEditor";
import { ProfileSummaries } from "@/components/vendor-profile/ProfileSummaries";
import { PortfolioGrid } from "@/components/vendor-profile/PortfolioGrid";
import { VerificationTimeline } from "@/components/vendor-profile/VerificationTimeline";
import { CustomerPreviewDrawer } from "@/components/vendor-profile/CustomerPreviewDrawer";

import { db } from "@/backend/firebase";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { VendorProfile } from "@/types/vendor";
import { serviceCatalog } from "@/data/mockVendorServices";

export default function VendorProfilePage() {
  const { user } = useCurrentUser();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [profile, setProfile] = useState<VendorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    // We fetch from vendorApplications as it contains the full detailed profile created during onboarding
    const unsub = onSnapshot(doc(db, "vendorApplications", user.uid), (docSnap) => {
      if (docSnap.exists()) {
        const d = docSnap.data();

        // Convert the backend application data to the frontend VendorProfile type
        const mappedProfile: VendorProfile = {
          id: docSnap.id,
          applicationStatus: d.status || "under_review",
          personal: {
            fullName: d.personal?.fullName || d.personal?.legalName || d.email || "No Name Provided",
            avatar: d.personal?.profilePhoto || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=256&auto=format&fit=crop", // generic placeholder if empty
            dateOfBirth: d.personal?.dob || "Not Provided",
            gender: "Not Provided",
            mobile: d.personal?.phone || "Not Provided",
            email: d.email || user.email || "Not Provided",
            alternatePhone: "Not Provided"
          },
          professional: {
            profileType: d.business?.profileType || "Individual Professional",
            displayName: d.business?.businessName || d.personal?.fullName || "My Business",
            description: d.business?.description || "Experienced professional providing reliable services.",
          },
          services: (d.services?.selectedServiceIds || []).map((id: string) => {
            const catalogService = serviceCatalog.find(s => s.id === id);
            return catalogService ? catalogService : {
              id,
              categoryId: "custom",
              categoryName: "Custom",
              serviceName: id,
              description: "Custom Service",
              startingPrice: 0,
              duration: "N/A",
              serviceType: "customer_location",
              skills: [],
              status: "active",
              featured: false,
              updatedAt: new Date().toISOString()
            };
          }),
          serviceArea: {
            primaryCity: d.serviceArea?.city || "Not Provided",
            radiusKm: 10,
            additionalAreas: []
          },
          experience: {
            years: d.experience?.yearsOfExperience || 0,
            skills: d.experience?.skills || [],
            strengths: d.experience?.strengths || ["Reliable", "Professional"]
          },
          certifications: [],
          portfolio: [],
          verification: {
            status: d.status || "under_review",
            progress: d.status === "approved" ? 100 : 80
          },
          payout: {
            bankMasked: d.payouts?.bank?.accountNumber ? `•••• •••• ${d.payouts.bank.accountNumber.slice(-4)}` : "Not Configured",
            ifscMasked: d.payouts?.bank?.ifscCode ? `${d.payouts.bank.ifscCode.substring(0, 4)}••••` : "Not Configured",
            upiMasked: d.payouts?.upi?.upiId ? `${d.payouts.upi.upiId.substring(0, 3)}•••@upi` : "Not Configured",
            status: d.payouts?.bank?.accountNumber ? "Configured" : "Not Configured",
            rawPayoutDetails: d.payouts || null
          },
          availability: {
            schedule: [],
            autoAccept: false,
            sameDay: false,
            maxBookingsPerDay: 5
          }
        };

        setProfile(mappedProfile);
      } else {
        // If not found in vendorApplications, they might just be a regular user or a vendor with a legacy structure
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, [user?.uid, user?.email]);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setToastMessage(customEvent.detail);
      setTimeout(() => setToastMessage(""), 3000);
    };

    window.addEventListener("show-toast", handleToast);
    return () => window.removeEventListener("show-toast", handleToast);
  }, []);

  return (
    <VendorLayout>
      {loading ? (
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
            <p className="text-sm font-medium text-slate-500">Loading profile data...</p>
          </div>
        </div>
      ) : profile ? (
        <>
          <div className="p-4 md:p-8 max-w-[1200px] mx-auto space-y-8">
            <ProfileHeader 
              verification={profile.verification} 
              onPreviewProfile={() => setIsPreviewOpen(true)} 
            />
            
            <ProfileHero profile={profile} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Main Content Column */}
              <div className="lg:col-span-2 space-y-8">
                <PersonalInfoEditor data={profile.personal} />
                <ProfessionalProfileEditor data={profile.professional} />
                <ExperienceEditor data={profile.experience} />
                <PortfolioGrid items={profile.portfolio} />
                
                {/* Account Settings Links */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Account Actions</h3>
                  <div className="space-y-2">
                    {[
                      "Change Password",
                      "Notification Settings",
                      "Privacy Settings",
                      "Log Out"
                    ].map((action, i) => (
                      <button key={i} className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
                        <span className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{action}</span>
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar Column */}
              <div className="space-y-8">
                <VerificationTimeline verification={profile.verification} />
                <ProfileSummaries profile={profile} />
              </div>

            </div>
          </div>

          <CustomerPreviewDrawer 
            profile={isPreviewOpen ? profile : null} 
            onClose={() => setIsPreviewOpen(false)} 
          />
        </>
      ) : (
        <div className="flex min-h-[60vh] items-center justify-center text-center">
          <div>
            <p className="text-lg font-bold text-slate-800">Profile Not Found</p>
            <p className="text-slate-500 mt-2">We couldn't find your vendor profile details.</p>
          </div>
        </div>
      )}

      {/* Global Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 20, scale: 0.9, x: "-50%" }}
            className="fixed bottom-6 left-1/2 z-[100] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl font-medium text-sm flex items-center gap-2 border border-slate-700 whitespace-nowrap"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </VendorLayout>
  );
}
