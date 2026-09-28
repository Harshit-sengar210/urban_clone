import { Metadata } from "next";
import { PublicOffersHero } from "@/components/public-offers/PublicOffersHero";
import { PublicFeaturedOffer } from "@/components/public-offers/PublicFeaturedOffer";
import { PublicOfferGrid } from "@/components/public-offers/PublicOfferGrid";
import { HowToUseOffers } from "@/components/public-offers/HowToUseOffers";
import { MoreWaysToSave } from "@/components/public-offers/MoreWaysToSave";
import { OffersTrustSection } from "@/components/public-offers/OffersTrustSection";
import { OffersFAQ } from "@/components/public-offers/OffersFAQ";
import { OffersCTA } from "@/components/public-offers/OffersCTA";

export const metadata: Metadata = {
  title: "Offers & Discounts | UrbanClone",
  description: "Discover special offers, first-booking discounts, and rewards for UrbanClone services.",
};

export default function OffersPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      
      <PublicOffersHero />
      <PublicFeaturedOffer />
      <PublicOfferGrid />
      <HowToUseOffers />
      <MoreWaysToSave />
      <OffersTrustSection />
      <OffersFAQ />
      <OffersCTA />
      
    </main>
  );
}
