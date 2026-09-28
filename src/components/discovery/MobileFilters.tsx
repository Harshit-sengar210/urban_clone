"use client";

import { useState, useEffect } from "react";
import { Filter, X, ArrowDownUp } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { PRICE_RANGES, RATING_OPTIONS, AVAILABILITY_OPTIONS, SORT_OPTIONS } from "@/data/serviceFilters";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"filters" | "sort">("filters");

  // Local state for the drawer to allow "Apply" action
  const [localCategory, setLocalCategory] = useState("all");
  const [localPrice, setLocalPrice] = useState("all");
  const [localRating, setLocalRating] = useState("all");
  const [localAvailability, setLocalAvailability] = useState("all");
  const [localSort, setLocalSort] = useState("popular");

  // Sync local state with URL when opening the drawer
  useEffect(() => {
    if (isOpen) {
      setLocalCategory(searchParams.get("category") || "all");
      setLocalPrice(searchParams.get("price") || "all");
      setLocalRating(searchParams.get("rating") || "all");
      setLocalAvailability(searchParams.get("availability") || "all");
      setLocalSort(searchParams.get("sort") || "popular");
    }
  }, [isOpen, searchParams]);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    const setOrDelete = (key: string, value: string) => {
      if (value && value !== "all") params.set(key, value);
      else params.delete(key);
    };

    setOrDelete("category", localCategory);
    setOrDelete("price", localPrice);
    setOrDelete("rating", localRating);
    setOrDelete("availability", localAvailability);
    setOrDelete("sort", localSort);

    router.push(`/services?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  };

  const clearFilters = () => {
    setLocalCategory("all");
    setLocalPrice("all");
    setLocalRating("all");
    setLocalAvailability("all");
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (searchParams.get("category")) count++;
    if (searchParams.get("price")) count++;
    if (searchParams.get("rating")) count++;
    if (searchParams.get("availability")) count++;
    return count;
  };

  const activeCount = getActiveFilterCount();

  return (
    <>
      <div className="md:hidden flex items-center gap-2 mb-6 sticky top-4 z-30">
        <Button 
          variant="outline" 
          className="flex-1 bg-white/90 backdrop-blur-md shadow-sm border-[var(--color-border)] text-[var(--color-foreground)]"
          onClick={() => { setActiveTab("filters"); setIsOpen(true); }}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters {activeCount > 0 && <span className="ml-1.5 w-5 h-5 rounded-full bg-[var(--color-primary)] text-white text-xs flex items-center justify-center">{activeCount}</span>}
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 bg-white/90 backdrop-blur-md shadow-sm border-[var(--color-border)] text-[var(--color-foreground)]"
          onClick={() => { setActiveTab("sort"); setIsOpen(true); }}
        >
          <ArrowDownUp className="w-4 h-4 mr-2" />
          Sort
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 z-50 md:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl md:hidden overflow-hidden flex flex-col h-[85vh]"
            >
              <div className="flex justify-between items-center p-4 border-b border-[var(--color-border)] bg-white shrink-0">
                <div className="flex bg-[var(--color-surface-hover)] rounded-lg p-1">
                  <button 
                    onClick={() => setActiveTab("filters")} 
                    className={cn("px-4 py-1.5 rounded-md text-sm font-medium transition-colors", activeTab === "filters" ? "bg-white shadow text-[var(--color-foreground)]" : "text-[var(--color-muted)]")}
                  >
                    Filters
                  </button>
                  <button 
                    onClick={() => setActiveTab("sort")} 
                    className={cn("px-4 py-1.5 rounded-md text-sm font-medium transition-colors", activeTab === "sort" ? "bg-white shadow text-[var(--color-foreground)]" : "text-[var(--color-muted)]")}
                  >
                    Sort
                  </button>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 bg-[var(--color-surface-hover)] rounded-full text-[var(--color-muted)] hover:text-[var(--color-foreground)]">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-5 overflow-y-auto flex-grow">
                {activeTab === "sort" ? (
                  <div className="flex flex-col gap-2">
                    {SORT_OPTIONS.map((opt) => (
                      <label key={opt.value} className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-border)] active:bg-[var(--color-surface-hover)]">
                        <input
                          type="radio"
                          name="mobile-sort"
                          value={opt.value}
                          checked={localSort === opt.value}
                          onChange={() => setLocalSort(opt.value)}
                          className="w-5 h-5 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                        />
                        <span className="text-base font-medium">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Category */}
                    <div>
                      <h4 className="font-semibold mb-4 text-base">Category</h4>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setLocalCategory("all")}
                          className={cn(
                            "px-4 py-2 rounded-xl text-sm font-medium border transition-colors",
                            localCategory === "all" ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]" : "bg-white text-[var(--color-foreground)] border-[var(--color-border)]"
                          )}
                        >
                          All
                        </button>
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => setLocalCategory(cat.id)}
                            className={cn(
                              "px-4 py-2 rounded-xl text-sm font-medium border transition-colors",
                              localCategory === cat.id ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]" : "bg-white text-[var(--color-foreground)] border-[var(--color-border)]"
                            )}
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <h4 className="font-semibold mb-4 text-base">Price Range</h4>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setLocalPrice("all")}
                          className={cn(
                            "px-4 py-2 rounded-xl text-sm font-medium border transition-colors",
                            localPrice === "all" ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]" : "bg-white text-[var(--color-foreground)] border-[var(--color-border)]"
                          )}
                        >
                          Any Price
                        </button>
                        {PRICE_RANGES.map((range) => (
                          <button
                            key={range.value}
                            onClick={() => setLocalPrice(range.value)}
                            className={cn(
                              "px-4 py-2 rounded-xl text-sm font-medium border transition-colors",
                              localPrice === range.value ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]" : "bg-white text-[var(--color-foreground)] border-[var(--color-border)]"
                            )}
                          >
                            {range.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Rating */}
                    <div>
                      <h4 className="font-semibold mb-4 text-base">Rating</h4>
                      <div className="flex flex-wrap gap-2">
                        {RATING_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => setLocalRating(opt.value)}
                            className={cn(
                              "px-4 py-2 rounded-xl text-sm font-medium border transition-colors",
                              localRating === opt.value ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]" : "bg-white text-[var(--color-foreground)] border-[var(--color-border)]"
                            )}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-[var(--color-border)] bg-white shrink-0 flex gap-3">
                {activeTab === "filters" && (
                  <Button variant="outline" className="w-1/3 h-12 text-base font-semibold" onClick={clearFilters}>
                    Clear
                  </Button>
                )}
                <Button className="flex-1 h-12 text-base font-semibold bg-[var(--color-primary)] text-white shadow-lg shadow-primary/20" onClick={applyFilters}>
                  Show Results
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
