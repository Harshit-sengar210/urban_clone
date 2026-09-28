import { Offer } from "./offers.types";
import { db } from "@/backend/firebase";
import { collection, getDocs } from "firebase/firestore";

// Keep a mutable reference for local simulation of saved state
let localSavedState: Record<string, boolean> = {};

export const OffersService = {
  /**
   * Get all offers, optionally filtered by category
   */
  async getOffers(category?: string): Promise<Offer[]> {
    const snap = await getDocs(collection(db, "offers"));
    const fetchedOffers = snap.docs.map(doc => {
      const d = doc.data();
      return {
        id: doc.id,
        title: d.name || "Untitled Offer",
        description: d.description || "",
        code: d.code || "NOCODE",
        discountType: d.discountType === "percentage" ? "percentage" : "flat",
        discountValue: d.discountValue || 0,
        maximumDiscount: d.maximumDiscount || undefined,
        minimumOrderValue: d.eligibility?.minimumOrderValue || 0,
        validUntil: d.validity?.endDate || new Date().toISOString(),
        category: (d.targeting?.categories?.[0] || "All") as any,
        status: "active",
        saved: localSavedState[doc.id] || false,
        isFirstBooking: d.eligibility?.firstBookingOnly || false,
        termsAndConditions: ["Offer is valid for a limited time.", "Cannot be clubbed with other offers."]
      } as Offer;
    });

    if (category && category !== "all") {
      return fetchedOffers.filter(o => o.category === category);
    }
    return fetchedOffers;
  },

  /**
   * Get a single offer by ID
   */
  async getOfferById(id: string): Promise<Offer | null> {
    const offers = await this.getOffers();
    return offers.find(o => o.id === id) || null;
  },

  /**
   * Save an offer to the user's saved list
   */
  async saveOffer(id: string): Promise<void> {
    localSavedState[id] = true;
  },

  /**
   * Remove an offer from the user's saved list
   */
  async removeSavedOffer(id: string): Promise<void> {
    localSavedState[id] = false;
  },

  /**
   * Validate a coupon code
   */
  async validateOfferCode(code: string): Promise<{ valid: boolean; offer?: Offer; message: string }> {
    const offers = await this.getOffers();
    const offer = offers.find(o => o.code.toUpperCase() === code.toUpperCase());
    
    if (!offer) {
      return { valid: false, message: "Invalid coupon code." };
    }
    if (offer.status === "expired") {
      return { valid: false, offer, message: "This coupon code has expired." };
    }
    
    return { valid: true, offer, message: "Coupon applied successfully!" };
  }
};
