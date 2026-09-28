import { Offer } from "./offers.types";
import { PUBLIC_MOCK_OFFERS } from "./offers.mock";

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Keep a mutable reference for local simulation
let mockOffersDB = [...PUBLIC_MOCK_OFFERS];

export const OffersService = {
  /**
   * Get all offers, optionally filtered by category
   */
  async getOffers(category?: string): Promise<Offer[]> {
    await delay(600); // simulate network
    if (category && category !== "all") {
      return mockOffersDB.filter(o => o.category === category);
    }
    return mockOffersDB;
  },

  /**
   * Get a single offer by ID
   */
  async getOfferById(id: string): Promise<Offer | null> {
    await delay(300);
    return mockOffersDB.find(o => o.id === id) || null;
  },

  /**
   * Save an offer to the user's saved list
   */
  async saveOffer(id: string): Promise<void> {
    await delay(300);
    mockOffersDB = mockOffersDB.map(o => 
      o.id === id ? { ...o, saved: true } : o
    );
  },

  /**
   * Remove an offer from the user's saved list
   */
  async removeSavedOffer(id: string): Promise<void> {
    await delay(300);
    mockOffersDB = mockOffersDB.map(o => 
      o.id === id ? { ...o, saved: false } : o
    );
  },

  /**
   * Validate a coupon code
   */
  async validateOfferCode(code: string): Promise<{ valid: boolean; offer?: Offer; message: string }> {
    await delay(500);
    const offer = mockOffersDB.find(o => o.code.toUpperCase() === code.toUpperCase());
    
    if (!offer) {
      return { valid: false, message: "Invalid coupon code." };
    }
    if (offer.status === "expired") {
      return { valid: false, offer, message: "This coupon code has expired." };
    }
    
    return { valid: true, offer, message: "Coupon applied successfully!" };
  }
};
