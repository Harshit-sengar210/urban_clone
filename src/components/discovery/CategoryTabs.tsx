"use client";

import { CATEGORIES } from "@/data/categories";
import { useRouter, useSearchParams } from "next/navigation";

export function CategoryTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  const handleCategoryClick = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id === "all") {
      params.delete("category");
    } else {
      params.set("category", id);
    }
    router.push(`/services?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full bg-white border-b border-[var(--color-border)] sticky top-0 z-30 pt-4 pb-0 md:hidden">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto pb-4 gap-2 hide-scrollbar snap-x">
          <button
            onClick={() => handleCategoryClick("all")}
            className={`shrink-0 snap-start px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              currentCategory === "all"
                ? "bg-[var(--color-primary)] text-white shadow-md"
                : "bg-[var(--color-surface-hover)] text-[var(--color-foreground)] hover:bg-[var(--color-border)]"
            }`}
          >
            All Services
          </button>
          
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`shrink-0 snap-start px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                currentCategory === cat.id
                  ? "bg-[var(--color-primary)] text-white shadow-md"
                  : "bg-[var(--color-surface-hover)] text-[var(--color-foreground)] hover:bg-[var(--color-border)]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
