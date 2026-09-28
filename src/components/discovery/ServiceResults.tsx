"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ALL_SERVICES } from "@/data/services";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { ServiceSkeleton } from "./ServiceSkeleton";
import { ResultsHeader } from "./ResultsHeader";
import { ActiveFilterChips } from "./ActiveFilterChips";
import { ServicePreview } from "./ServicePreview";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function ServiceResults() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  const [previewId, setPreviewId] = useState<string | null>(null);

  const query = searchParams.get("search")?.toLowerCase() || "";
  const category = searchParams.get("category") || "all";
  const subcategory = searchParams.get("subcategory") || "all";
  const price = searchParams.get("price") || "all";
  const rating = searchParams.get("rating") || "all";
  const availability = searchParams.get("availability") || "all";
  const sort = searchParams.get("sort") || "popular";

  // Simulate network delay for filtering
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      setVisibleCount(12); // Reset pagination on filter change
    }, 400);
    return () => clearTimeout(timer);
  }, [query, category, subcategory, price, rating, availability, sort]);

  const filteredAndSorted = useMemo(() => {
    let result = [...ALL_SERVICES];

    // Search query
    if (query) {
      result = result.filter(s => 
        s.name.toLowerCase().includes(query) || 
        s.categoryId.toLowerCase().includes(query) ||
        s.subcategoryId.toLowerCase().includes(query)
      );
    }

    // Category
    if (category !== "all") {
      result = result.filter(s => s.categoryId === category);
    }

    // Subcategory
    if (subcategory !== "all") {
      result = result.filter(s => s.subcategoryId === subcategory);
    }

    // Price
    if (price !== "all") {
      const [min, max] = price.split("-");
      if (max === "plus") {
        result = result.filter(s => s.price >= Number(min));
      } else {
        result = result.filter(s => s.price >= Number(min) && s.price <= Number(max));
      }
    }

    // Rating
    if (rating !== "all") {
      result = result.filter(s => s.rating >= Number(rating));
    }

    // Availability
    if (availability !== "all") {
      // If service doesn't define availability, assume available. If it does, check it.
      result = result.filter(s => !s.availability || s.availability.includes(availability));
    }

    // Sort
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case "reviews":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "popular":
      default:
        // Mock popular sorting
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [query, category, price, rating, availability, sort]);

  const visibleServices = filteredAndSorted.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSorted.length;

  return (
    <div>
      <ActiveFilterChips />
      
      {!isLoading && filteredAndSorted.length > 0 && (
        <ResultsHeader totalResults={filteredAndSorted.length} />
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ServiceSkeleton key={i} />
          ))}
        </div>
      ) : filteredAndSorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center px-4 bg-white rounded-3xl border border-[var(--color-border)] border-dashed">
          <div className="w-20 h-20 bg-[var(--color-surface-hover)] rounded-full flex items-center justify-center mb-6 text-[var(--color-muted)]">
            <Search className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold mb-2">No services found</h3>
          <p className="text-[var(--color-muted)] max-w-md mx-auto mb-8">
            We couldn't find a service matching your current filters. Try adjusting them or browse our popular categories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" asChild>
              <Link href="/services">Clear all filters</Link>
            </Button>
            <Button asChild>
              <Link href="/#services">Browse Categories</Link>
            </Button>
          </div>
        </div>
      ) : (
        <>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {visibleServices.map((service, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5) }}
                  key={service.id}
                >
                  <ServiceCard
                    {...service}
                    onViewDetails={() => setPreviewId(service.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {hasMore && (
            <div className="mt-12 text-center">
              <p className="text-sm text-[var(--color-muted)] mb-4 font-medium">
                Showing {visibleServices.length} of {filteredAndSorted.length} services
              </p>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto min-w-[200px]"
                onClick={() => setVisibleCount(prev => prev + 12)}
              >
                Load More
              </Button>
            </div>
          )}
        </>
      )}

      {previewId && (
        <ServicePreview
          serviceId={previewId}
          services={ALL_SERVICES}
          onClose={() => setPreviewId(null)}
        />
      )}
    </div>
  );
}
