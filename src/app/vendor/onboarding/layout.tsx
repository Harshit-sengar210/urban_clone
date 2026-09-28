import React from "react";
import { VendorOnboardingProvider } from "@/contexts/vendor/VendorOnboardingProvider";

export default function VendorOnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <VendorOnboardingProvider>
      {children}
    </VendorOnboardingProvider>
  );
}
