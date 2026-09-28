"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/data/categories";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ServiceFiltersProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  activeSort: string;
  setActiveSort: (sort: string) => void;
}

export function ServiceFilters({ activeCategory, setActiveCategory, activeSort, setActiveSort }: ServiceFiltersProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const sortOptions = [
    { value: "popular", label: "Popular" },
    { value: "rating", label: "Top Rated" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
  ];

  return (
    <div className="mb-8">
      {/* Desktop Filters Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Horizontal Category Pills */}
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 gap-2 hide-scrollbar">
          <button
            onClick={() => setActiveCategory("all")}
            className={cn(
              "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border",
              activeCategory === "all"
                ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md shadow-primary/20"
                : "bg-white text-[var(--color-foreground)] border-[var(--color-border)] hover:border-[var(--color-primary-light)]"
            )}
          >
            All Services
          </button>
          
          {CATEGORIES.slice(0, 6).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                activeCategory === cat.id
                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md shadow-primary/20"
                  : "bg-white text-[var(--color-foreground)] border-[var(--color-border)] hover:border-[var(--color-primary-light)]"
              )}
            >
              {cat.name}
            </button>
          ))}
          
          <button className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium bg-white text-[var(--color-muted)] border border-[var(--color-border)] hover:text-[var(--color-foreground)]">
            More Categories
          </button>
        </div>

        {/* Desktop Sort & Mobile Filter Button */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0 justify-between md:justify-start">
          <Button variant="outline" className="md:hidden" onClick={() => setIsMobileOpen(true)}>
            <Filter className="w-4 h-4 mr-2" /> Filters
          </Button>

          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm text-[var(--color-muted)] font-medium">Sort by:</span>
            <select
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value)}
              className="h-10 px-3 rounded-lg border border-[var(--color-border)] text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sheet for Filters */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/40 z-50 md:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl md:hidden overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="flex justify-between items-center p-5 border-b border-[var(--color-border)] bg-white sticky top-0">
                <h3 className="font-bold text-lg">Filters & Sort</h3>
                <button onClick={() => setIsMobileOpen(false)} className="p-2 bg-[var(--color-surface-hover)] rounded-full text-[var(--color-muted)] hover:text-[var(--color-foreground)]">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-5 overflow-y-auto">
                {/* Mobile Sort */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Sort By</h4>
                  <div className="flex flex-col gap-2">
                    {sortOptions.map((opt) => (
                      <label key={opt.value} className="flex items-center gap-3 p-3 rounded-xl border border-[var(--color-border)] active:bg-[var(--color-surface-hover)]">
                        <input
                          type="radio"
                          name="mobile-sort"
                          value={opt.value}
                          checked={activeSort === opt.value}
                          onChange={() => setActiveSort(opt.value)}
                          className="w-4 h-4 text-primary focus:ring-primary"
                        />
                        <span className="text-sm font-medium">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Mobile Category */}
                <div>
                  <h4 className="font-semibold mb-3">Category</h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveCategory("all")}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium border",
                        activeCategory === "all" ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]" : "bg-white text-[var(--color-foreground)] border-[var(--color-border)]"
                      )}
                    >
                      All Services
                    </button>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={cn(
                          "px-4 py-2 rounded-lg text-sm font-medium border",
                          activeCategory === cat.id ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]" : "bg-white text-[var(--color-foreground)] border-[var(--color-border)]"
                        )}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-5 border-t border-[var(--color-border)] bg-white sticky bottom-0">
                <Button className="w-full h-12 text-base shadow-lg shadow-primary/20" onClick={() => setIsMobileOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
