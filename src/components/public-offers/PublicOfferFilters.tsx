"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { OfferCategory } from "@/lib/offers/offers.types";
import { cn } from "@/lib/utils";

const TABS: { label: string; value: OfferCategory }[] = [
  { label: "All", value: "all" },
  { label: "Cleaning", value: "cleaning" },
  { label: "Repairs", value: "repairs" },
  { label: "Beauty", value: "beauty" },
  { label: "Maintenance", value: "maintenance" },
  { label: "Pest Control", value: "pest-control" },
  { label: "Appliances", value: "appliances" }
];

interface PublicOfferFiltersProps {
  activeCategory: OfferCategory;
  onCategoryChange: (category: OfferCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOption: string;
  onSortChange: (sort: string) => void;
}

export function PublicOfferFilters({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange
}: PublicOfferFiltersProps) {
  return (
    <div className="flex flex-col gap-6 mb-8">
      {/* Category Tabs */}
      <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar gap-2">
        {TABS.map(tab => (
          <button
            key={tab.value}
            onClick={() => onCategoryChange(tab.value)}
            className={cn(
              "flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all border",
              activeCategory === tab.value
                ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md shadow-primary/20"
                : "bg-white text-slate-600 border-[var(--color-border)] hover:border-slate-300 hover:bg-slate-50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search offers or codes..."
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all bg-white placeholder:text-slate-400"
          />
        </div>
        
        <div className="relative w-full sm:w-56">
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full h-12 pl-10 pr-8 rounded-xl border border-[var(--color-border)] text-sm font-semibold appearance-none bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all text-slate-700"
          >
            <option value="recommended">Recommended</option>
            <option value="highest">Highest Savings</option>
            <option value="newest">Newest</option>
            <option value="ending">Ending Soon</option>
          </select>
          <SlidersHorizontal className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-primary)] pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
