import { Metadata } from "next";
import { HowItWorksHero } from "@/components/how-it-works/HowItWorksHero";
import { FourStepsSection } from "@/components/how-it-works/FourStepsSection";
import { InteractiveTimeline } from "@/components/how-it-works/InteractiveTimeline";
import { BookingTrackingSection } from "@/components/how-it-works/BookingTrackingSection";
import { TrustSafetySection } from "@/components/how-it-works/TrustSafetySection";
import { BookingDemoSection } from "@/components/how-it-works/BookingDemoSection";
import { FAQSection } from "@/components/how-it-works/FAQSection";
import { FinalCTA } from "@/components/how-it-works/FinalCTA";

export const metadata: Metadata = {
  title: "How It Works | UrbanClone",
  description: "Learn how easy it is to book trusted professionals on UrbanClone.",
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      
      {/* 1. Hero Section */}
      <HowItWorksHero />
      
      {/* 2. Four Steps Section */}
      <FourStepsSection />
      
      {/* 3. Interactive Timeline */}
      <InteractiveTimeline />
      
      {/* 4. Booking Tracking Section */}
      <BookingTrackingSection />
      
      {/* 5. Trust & Safety Section */}
      <TrustSafetySection />
      
      {/* 6. Mock Booking Demo Section */}
      <BookingDemoSection />
      
      {/* 7. FAQs */}
      <FAQSection />
      
      {/* 8. Final CTA */}
      <FinalCTA />
    </main>
  );
}
