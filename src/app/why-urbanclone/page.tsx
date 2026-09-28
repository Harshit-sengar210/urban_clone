import { Metadata } from "next";
import { WhyUrbanCloneHero } from "@/components/why-urbanclone/WhyUrbanCloneHero";
import { WhyChooseSection } from "@/components/why-urbanclone/WhyChooseSection";
import { VerifiedProfessionalsSection } from "@/components/why-urbanclone/VerifiedProfessionalsSection";
import { TransparentPricingSection } from "@/components/why-urbanclone/TransparentPricingSection";
import { QualityProcess } from "@/components/why-urbanclone/QualityProcess";
import { CustomerExperienceSection } from "@/components/why-urbanclone/CustomerExperienceSection";
import { TrustSafetySection } from "@/components/why-urbanclone/TrustSafetySection";
import { PlatformStats } from "@/components/why-urbanclone/PlatformStats";
import { TestimonialsSection } from "@/components/why-urbanclone/TestimonialsSection";
import { UseCasesSection } from "@/components/why-urbanclone/UseCasesSection";
import { ExperienceComparison } from "@/components/why-urbanclone/ExperienceComparison";
import { WhyUrbanCloneFAQ } from "@/components/why-urbanclone/WhyUrbanCloneFAQ";
import { WhyUrbanCloneCTA } from "@/components/why-urbanclone/WhyUrbanCloneCTA";

export const metadata: Metadata = {
  title: "Why UrbanClone? | Trust, Quality, & Reliability",
  description: "Learn why thousands of customers choose UrbanClone for their home and personal services. Verified professionals, transparent pricing, and secure bookings.",
};

export default function WhyUrbanClonePage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] selection:bg-[var(--color-primary)] selection:text-white">
      <WhyUrbanCloneHero />
      <WhyChooseSection />
      <VerifiedProfessionalsSection />
      <TransparentPricingSection />
      <QualityProcess />
      <CustomerExperienceSection />
      <TrustSafetySection />
      <PlatformStats />
      <TestimonialsSection />
      <UseCasesSection />
      <ExperienceComparison />
      <WhyUrbanCloneFAQ />
      <WhyUrbanCloneCTA />
    </main>
  );
}
