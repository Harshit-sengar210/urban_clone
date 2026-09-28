"use client";

import { CATEGORIES } from "@/data/categories";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function SubcategoryNavigation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategorySlug = searchParams.get("category");
  const currentSubcategorySlug = searchParams.get("subcategory");

  const currentCategory = CATEGORIES.find(c => c.slug === currentCategorySlug);

  const handleSubcategoryClick = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Toggle subcategory off if it's already selected
    if (currentSubcategorySlug === slug) {
      params.delete("subcategory");
    } else {
      params.set("subcategory", slug);
    }
    
    router.push(`/services?${params.toString()}`, { scroll: false });
  };

  // If no category is selected, or the category doesn't exist, don't show subcategories
  if (!currentCategory || currentCategory.subcategories.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-[var(--color-background)] border-b border-[var(--color-border)] py-4 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex overflow-x-auto gap-3 hide-scrollbar snap-x"
          >
            {currentCategory.subcategories.map(sub => (
              <button
                key={sub.id}
                onClick={() => handleSubcategoryClick(sub.slug)}
                className={`shrink-0 snap-start px-5 py-3 rounded-2xl text-sm font-medium transition-all border flex flex-col items-start gap-1 min-w-[140px] ${
                  currentSubcategorySlug === sub.slug
                    ? "bg-purple-50 text-[var(--color-primary)] border-[var(--color-primary-light)] shadow-sm"
                    : "bg-white text-[var(--color-foreground)] border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]"
                }`}
              >
                <span className="font-semibold">{sub.name}</span>
                <span className={`text-xs ${currentSubcategorySlug === sub.slug ? "text-[var(--color-primary)]" : "text-[var(--color-muted)]"}`}>
                  {sub.services.length} services
                </span>
              </button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
