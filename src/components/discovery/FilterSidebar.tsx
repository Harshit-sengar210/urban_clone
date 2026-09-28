"use client";

import { CATEGORIES } from "@/data/categories";
import { PRICE_RANGES, RATING_OPTIONS, AVAILABILITY_OPTIONS } from "@/data/serviceFilters";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

function AnimatedRadio({ checked, label }: { checked: boolean, label: string }) {
  return (
    <div className="flex items-center gap-3 cursor-pointer group">
      <div className="relative w-4 h-4 rounded-full border-[1.5px] border-slate-300 flex items-center justify-center shrink-0 group-hover:border-[var(--color-primary)] transition-colors">
        <AnimatePresence>
          {checked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 m-[3px] rounded-full bg-[var(--color-primary)]"
            />
          )}
        </AnimatePresence>
      </div>
      <span className={`text-sm font-medium transition-colors ${checked ? "text-[#0A192F]" : "text-slate-500 group-hover:text-slate-900"}`}>
        {label}
      </span>
    </div>
  );
}

function AnimatedCheckbox({ checked, label }: { checked: boolean, label: string }) {
  return (
    <div className="flex items-center gap-3 cursor-pointer group">
      <div className={`relative w-4 h-4 rounded border-[1.5px] flex items-center justify-center shrink-0 transition-colors ${checked ? 'border-[var(--color-primary)] bg-[var(--color-primary)]' : 'border-slate-300 group-hover:border-[var(--color-primary)] bg-transparent'}`}>
        <AnimatePresence>
          {checked && (
            <motion.svg
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-3 h-3 text-white"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>
      <span className={`text-sm font-medium transition-colors ${checked ? "text-[#0A192F]" : "text-slate-500 group-hover:text-slate-900"}`}>
        {label}
      </span>
    </div>
  );
}

export function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "all";
  const currentPrice = searchParams.get("price") || "all";
  const currentRating = searchParams.get("rating") || "all";
  const currentAvailability = searchParams.get("availability") || "all";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/services?${params.toString()}`, { scroll: false });
  };

  const clearAll = () => {
    const search = searchParams.get("search");
    if (search) {
      router.push(`/services?search=${search}`, { scroll: false });
    } else {
      router.push(`/services`, { scroll: false });
    }
  };

  const hasActiveFilters = currentCategory !== "all" || currentPrice !== "all" || currentRating !== "all" || currentAvailability !== "all";

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 p-5 sticky top-28 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg text-[#0A192F]">Filters</h3>
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.button 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onClick={clearAll}
              className="text-xs font-bold text-[var(--color-primary)] hover:underline tracking-wide uppercase"
            >
              Clear all
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="font-bold text-sm mb-3 text-slate-800">Category</h4>
        <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          <label className="block">
            <input 
              type="radio" 
              name="category" 
              value="all"
              checked={currentCategory === "all"}
              onChange={() => updateFilter("category", "all")}
              className="sr-only"
            />
            <AnimatedRadio checked={currentCategory === "all"} label="All Categories" />
          </label>
          
          {CATEGORIES.map(cat => (
            <label key={cat.id} className="block">
              <input 
                type="radio" 
                name="category" 
                value={cat.id}
                checked={currentCategory === cat.slug}
                onChange={() => updateFilter("category", cat.slug)}
                className="sr-only"
              />
              <AnimatedRadio checked={currentCategory === cat.slug} label={cat.name} />
            </label>
          ))}
        </div>
      </div>

      <hr className="border-slate-100 mb-6" />

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-bold text-sm mb-3 text-slate-800">Price Range</h4>
        <div className="space-y-3">
          <label className="block">
            <input 
              type="radio" 
              name="price" 
              value="all"
              checked={currentPrice === "all"}
              onChange={() => updateFilter("price", "all")}
              className="sr-only"
            />
            <AnimatedRadio checked={currentPrice === "all"} label="Any Price" />
          </label>
          
          {PRICE_RANGES.map(range => (
            <label key={range.value} className="block">
              <input 
                type="radio" 
                name="price" 
                value={range.value}
                checked={currentPrice === range.value}
                onChange={() => updateFilter("price", range.value)}
                className="sr-only"
              />
              <AnimatedRadio checked={currentPrice === range.value} label={range.label} />
            </label>
          ))}
        </div>
      </div>

      <hr className="border-slate-100 mb-6" />

      {/* Rating */}
      <div className="mb-6">
        <h4 className="font-bold text-sm mb-3 text-slate-800">Rating</h4>
        <div className="space-y-3">
          {RATING_OPTIONS.map(opt => (
            <label key={opt.value} className="block">
              <input 
                type="radio" 
                name="rating" 
                value={opt.value}
                checked={currentRating === opt.value}
                onChange={() => updateFilter("rating", opt.value)}
                className="sr-only"
              />
              <AnimatedRadio checked={currentRating === opt.value} label={opt.label} />
            </label>
          ))}
        </div>
      </div>
      
      <hr className="border-slate-100 mb-6" />

      {/* Availability */}
      <div>
        <h4 className="font-bold text-sm mb-3 text-slate-800">Availability</h4>
        <div className="space-y-3">
          {AVAILABILITY_OPTIONS.map(opt => (
            <label key={opt.value} className="block">
              <input 
                type="checkbox"
                checked={currentAvailability === opt.value}
                onChange={(e) => {
                  updateFilter("availability", e.target.checked ? opt.value : "all")
                }}
                className="sr-only"
              />
              <AnimatedCheckbox checked={currentAvailability === opt.value} label={opt.label} />
            </label>
          ))}
        </div>
      </div>

    </div>
  );
}
