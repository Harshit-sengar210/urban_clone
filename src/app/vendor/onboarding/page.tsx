import { Metadata } from "next";
import { VendorOnboardingHeader } from "@/components/vendor-onboarding/VendorOnboardingHeader";
import { VendorWelcomeVisual } from "@/components/vendor-onboarding/VendorWelcomeVisual";
import { VendorOnboardingWelcome } from "@/components/vendor-onboarding/VendorOnboardingWelcome";

export const metadata: Metadata = {
  title: "Become a Partner | UrbanClone",
  description: "Join UrbanClone as a service professional and grow your business.",
};

export default function VendorOnboardingPage() {
  return (
    <main className="h-screen overflow-hidden bg-white flex flex-col font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <VendorOnboardingHeader />
      
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Visual Area */}
        <div className="hidden md:block w-full md:w-[45%] lg:w-1/2 h-full">
          <VendorWelcomeVisual />
        </div>

        {/* Right Content Area */}
        <div className="w-full md:w-[55%] lg:w-1/2 h-full overflow-y-auto bg-white">
          <div className="min-h-full flex flex-col justify-center">
            <VendorOnboardingWelcome />
          </div>
        </div>
      </div>
    </main>
  );
}
