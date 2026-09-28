"use client";

import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/data/categories";
import { PRICE_RANGES, RATING_OPTIONS, AVAILABILITY_OPTIONS } from "@/data/serviceFilters";

export function ActiveFilterChips() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category");
  const currentPrice = searchParams.get("price");
  const currentRating = searchParams.get("rating");
  const currentAvailability = searchParams.get("availability");

  const chips: { key: string; label: string; value: string }[] = [];

  if (currentCategory) {
    const cat = CATEGORIES.find(c => c.id === currentCategory);
    if (cat) chips.push({ key: "category", label: cat.name, value: currentCategory });
  }

  if (currentPrice) {
    const price = PRICE_RANGES.find(p => p.value === currentPrice);
    if (price) chips.push({ key: "price", label: price.label, value: currentPrice });
  }

  if (currentRating) {
    const rating = RATING_OPTIONS.find(r => r.value === currentRating);
    if (rating) chips.push({ key: "rating", label: rating.label, value: currentRating });
  }

  if (currentAvailability) {
    const avail = AVAILABILITY_OPTIONS.find(a => a.value === currentAvailability);
    if (avail) chips.push({ key: "availability", label: avail.label, value: currentAvailability });
  }

  if (chips.length === 0) return null;

  const removeFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.push(`/services?${params.toString()}`, { scroll: false });
  };

  const clearAll = () => {
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (sort) params.set("sort", sort);
    router.push(`/services?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-sm text-[var(--color-muted)] font-medium mr-2">Active Filters:</span>
      {chips.map(chip => (
        <button
          key={chip.key}
          onClick={() => removeFilter(chip.key)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 hover:bg-[var(--color-primary)]/20 transition-colors text-sm font-medium"
        >
          {chip.label}
          <X className="w-3.5 h-3.5" />
        </button>
      ))}
      <button 
        onClick={clearAll}
        className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-foreground)] ml-2 hover:underline"
      >
        Clear All
      </button>
    </div>
  );
}
