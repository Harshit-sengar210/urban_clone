"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { auth } from "@/backend/firebase";
import { getOrCreateMyApplication, saveSection, submitApplication } from "@/services/vendor/vendorOnboardingService";
import { useRouter, usePathname } from "next/navigation";
import { validateApplication } from "@/lib/vendor/vendorOnboardingValidation";
import type { VendorApplication, VendorSectionStatus } from "@/types/vendor/vendorApplication";

interface VendorOnboardingContextType {
  application: VendorApplication | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
  
  refreshApplication: () => Promise<void>;
  
  savePersonal: (data: any) => Promise<void>;
  saveBusiness: (data: any) => Promise<void>;
  saveServices: (data: any) => Promise<void>;
  saveServiceArea: (data: any) => Promise<void>;
  saveExperience: (data: any) => Promise<void>;
  saveVerification: (data: any) => Promise<void>;
  saveBankPayout: (data: any) => Promise<void>;
  saveAvailability: (data: any) => Promise<void>;
  
  submitApp: () => Promise<void>;
  
  validation: {
    isComplete: boolean;
    sections: Record<string, VendorSectionStatus>;
  } | null;
}

const VendorOnboardingContext = createContext<VendorOnboardingContextType | undefined>(undefined);

export function VendorOnboardingProvider({ children }: { children: ReactNode }) {
  const [application, setApplication] = useState<VendorApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApp = async () => {
    try {
      if (!auth.currentUser) return;
      const email = auth.currentUser.email || "";
      const app = await getOrCreateMyApplication(email);
      setApplication(app);
    } catch (e: any) {
      setError(e.message || "Failed to load application");
    }
  };

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchApp().finally(() => setLoading(false));
      } else {
        setApplication(null);
        setLoading(false);
        if (typeof window !== "undefined") {
          router.replace("/vendor/signup");
        }
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!loading && application && typeof window !== "undefined") {
      const status = application.status;
      
      if (status === "approved" && !pathname.startsWith("/vendor/dashboard")) {
        router.replace("/vendor/dashboard");
      } else if (status === "pending_approval" && !pathname.startsWith("/vendor/onboarding/pending")) {
        router.replace("/vendor/onboarding/pending");
      }
    }
  }, [loading, application, pathname, router]);

  const handleSave = async (section: keyof VendorApplication, data: any, stepName: string) => {
    setSaving(true);
    setError(null);
    try {
      const uid = application?.vendorId || auth.currentUser?.uid;
      await saveSection(section, data, stepName, uid);
      await fetchApp(); // Refresh local state
    } catch (e: any) {
      setError(e.message || `Failed to save ${section}`);
      throw e;
    } finally {
      setSaving(false);
    }
  };

  const validation = application ? validateApplication(application) : null;

  return (
    <VendorOnboardingContext.Provider value={{
      application,
      loading,
      saving,
      error,
      refreshApplication: fetchApp,
      savePersonal: (data) => handleSave("personal", data, "personal"),
      saveBusiness: (data) => handleSave("business", data, "business"),
      saveServices: (data) => handleSave("services", data, "services"),
      saveServiceArea: (data) => handleSave("serviceArea", data, "serviceArea"),
      saveExperience: (data) => handleSave("experience", data, "experience"),
      saveVerification: (data) => handleSave("verification", data, "verification"),
      saveBankPayout: (data) => handleSave("payouts", data, "bank"),
      saveAvailability: (data) => handleSave("availability", data, "availability"),
      submitApp: async () => {
        setSaving(true);
        setError(null);
        try {
          await submitApplication();
          await fetchApp();
        } catch (e: any) {
          setError(e.message || "Failed to submit application");
          throw e;
        } finally {
          setSaving(false);
        }
      },
      validation
    }}>
      {children}
    </VendorOnboardingContext.Provider>
  );
}

export function useVendorOnboarding() {
  const context = useContext(VendorOnboardingContext);
  if (context === undefined) {
    throw new Error("useVendorOnboarding must be used within a VendorOnboardingProvider");
  }
  return context;
}
