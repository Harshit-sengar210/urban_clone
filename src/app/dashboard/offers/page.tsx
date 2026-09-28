"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { MOCK_OFFERS, MOCK_STATS, Offer, OfferCategory } from "@/data/offers";
import { OffersPageHeader } from "@/components/offers/OffersPageHeader";
import { OfferStats } from "@/components/offers/OfferStats";
import { FeaturedOffer } from "@/components/offers/FeaturedOffer";
import { OfferCard } from "@/components/offers/OfferCard";
import { OfferDetailsDrawer } from "@/components/offers/OfferDetailsDrawer";
import { OfferSkeleton, OfferEmptyState } from "@/components/offers/OffersEmptyState";
import { ToastContainer, useToast } from "@/components/bookings/Toast";
import { cn } from "@/lib/utils";

const TABS: OfferCategory[] = ["All", "For You", "Home Services", "Cleaning", "Repairs", "Beauty", "Payments", "Saved", "Used", "Expired"];

export default function OffersPage() {
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState<Offer[]>([]);
  
  const [activeTab, setActiveTab] = useState<OfferCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("recommended");
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    const t = setTimeout(() => {
      setOffers(MOCK_OFFERS);
      setLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  const handleToggleSave = (id: string) => {
    setOffers(prev => prev.map(o => {
      if (o.id === id) {
        return { ...o, status: o.status === "saved" ? "active" : "saved" };
      }
      return o;
    }));
  };

  const handleApplyOffer = (o: Offer) => {
    showToast(`${o.couponCode} applied successfully.`);
  };

  const filteredOffers = offers.filter(o => {
    // 1. Tab filter
    if (activeTab === "Saved" && o.status !== "saved") return false;
    if (activeTab === "Used" && o.status !== "used") return false;
    if (activeTab === "Expired" && o.status !== "expired") return false;
    if (activeTab !== "All" && activeTab !== "Saved" && activeTab !== "Used" && activeTab !== "Expired") {
      if (o.category !== activeTab) return false;
    }
    // Don't show used/expired in standard tabs unless explicitly requested
    if (activeTab !== "Used" && activeTab !== "Expired" && (o.status === "used" || o.status === "expired")) return false;
    
    // 2. Search filter
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return o.title.toLowerCase().includes(q) 
      || o.couponCode.toLowerCase().includes(q) 
      || o.shortDescription.toLowerCase().includes(q);
  }).sort((a, b) => {
    if (sortOption === "highest") return b.discountValue - a.discountValue;
    if (sortOption === "expiring") return new Date(a.validUntil).getTime() - new Date(b.validUntil).getTime();
    if (sortOption === "newest") return new Date(b.validFrom).getTime() - new Date(a.validFrom).getTime();
    return 0; // recommended
  });

  const featured = offers.find(o => o.isFirstBooking && o.status === "active") || offers.find(o => o.status === "active");

  return (
    <>
      <div className="px-4 md:px-6 py-6 max-w-screen-xl mx-auto space-y-6">
        <OffersPageHeader />

        {loading ? (
          <OfferSkeleton />
        ) : (
          <>
            {/* Featured Hero */}
            {featured && activeTab === "All" && !searchQuery && (
              <FeaturedOffer offer={featured} onViewDetails={(o) => { setSelectedOffer(o); setDrawerOpen(true); }} />
            )}

            {/* Stats */}
            <OfferStats stats={MOCK_STATS} />

            {/* Controls */}
            <div className="flex flex-col gap-4">
              {/* Tabs */}
              <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar gap-2">
                {TABS.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all border",
                      activeTab === tab
                        ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-sm"
                        : "bg-white text-slate-600 border-[var(--color-border)] hover:border-slate-300"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Search & Sort */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search offers or coupon codes..."
                    className="w-full h-11 pl-9 pr-4 rounded-xl border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all bg-white"
                  />
                </div>
                <div className="relative w-full sm:w-48">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="w-full h-11 pl-9 pr-8 rounded-xl border border-[var(--color-border)] text-sm font-semibold appearance-none bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="expiring">Expiring Soon</option>
                    <option value="highest">Highest Discount</option>
                    <option value="newest">Newest</option>
                  </select>
                  <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Grid */}
            {filteredOffers.length === 0 ? (
              <OfferEmptyState category={activeTab} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnimatePresence>
                  {filteredOffers.map((o) => (
                    <OfferCard
                      key={o.id}
                      offer={o}
                      onViewDetails={(offer) => { setSelectedOffer(offer); setDrawerOpen(true); }}
                      onToggleSave={handleToggleSave}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals & Toasts */}
      <OfferDetailsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        offer={selectedOffer}
        onApply={handleApplyOffer}
      />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
