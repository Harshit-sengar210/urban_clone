"use client";

import { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import { Offer, OfferCategory } from "@/lib/offers/offers.types";
import { OffersService } from "@/lib/offers/offers.service";
import { PublicOfferFilters } from "./PublicOfferFilters";
import { PublicOfferCard } from "./PublicOfferCard";
import { PublicOfferDetailsDrawer } from "./PublicOfferDetailsDrawer";

export function PublicOfferGrid() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [activeCategory, setActiveCategory] = useState<OfferCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("recommended");
  
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    async function loadOffers() {
      setLoading(true);
      const data = await OffersService.getOffers();
      setOffers(data);
      setLoading(false);
    }
    loadOffers();
  }, []);

  const handleToggleSave = async (id: string) => {
    const offer = offers.find(o => o.id === id);
    if (!offer) return;
    
    // Optimistic update
    setOffers(prev => prev.map(o => o.id === id ? { ...o, saved: !o.saved } : o));
    
    if (offer.saved) {
      await OffersService.removeSavedOffer(id);
    } else {
      await OffersService.saveOffer(id);
    }
  };

  const filteredAndSortedOffers = useMemo(() => {
    let result = [...offers];

    // Category Filter
    if (activeCategory !== "all") {
      result = result.filter(o => o.category === activeCategory);
    }

    // Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(o => 
        o.title.toLowerCase().includes(q) ||
        o.description.toLowerCase().includes(q) ||
        o.code.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortOption) {
      case "highest":
        // Fallback to 0 if max discount not set (could use a heuristic)
        result.sort((a, b) => (b.maximumDiscount || 0) - (a.maximumDiscount || 0));
        break;
      case "newest":
        // Mock newest (just reverse for demo)
        result.reverse();
        break;
      case "ending":
        result.sort((a, b) => new Date(a.validUntil).getTime() - new Date(b.validUntil).getTime());
        break;
      case "recommended":
      default:
        // Keep mock order, but push expired to the end
        result.sort((a, b) => (a.status === "expired" ? 1 : 0) - (b.status === "expired" ? 1 : 0));
        break;
    }

    return result;
  }, [offers, activeCategory, searchQuery, sortOption]);

  return (
    <section className="py-16 bg-[var(--color-background)]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[var(--color-foreground)] tracking-tight mb-2">All Offers</h2>
          <p className="text-[var(--color-muted)] text-sm">Find a deal for your next service.</p>
        </div>

        <PublicOfferFilters
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortOption={sortOption}
          onSortChange={setSortOption}
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-72 bg-white rounded-2xl border border-[var(--color-border)] p-6 animate-pulse flex flex-col justify-between">
                <div>
                  <div className="w-16 h-4 bg-slate-200 rounded mb-4" />
                  <div className="w-32 h-8 bg-slate-200 rounded mb-4" />
                </div>
                <div className="w-full h-12 bg-slate-200 rounded-xl" />
              </div>
            ))}
          </div>
        ) : filteredAndSortedOffers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedOffers.map(offer => (
              <PublicOfferCard
                key={offer.id}
                offer={offer}
                onViewDetails={(o) => { setSelectedOffer(o); setDrawerOpen(true); }}
                onToggleSave={handleToggleSave}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-[var(--color-border)]">
            <Search className="w-12 h-12 text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-2">No offers found</h3>
            <p className="text-[var(--color-muted)] max-w-sm mb-6">
              We couldn't find any offers matching your search or category. Try changing your filters.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
              className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>

      <PublicOfferDetailsDrawer
        offer={selectedOffer}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </section>
  );
}
