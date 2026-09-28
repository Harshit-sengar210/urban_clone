"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/data/categories";

interface SubcategoryListProps {
  categoryId: string;
}

export function SubcategoryList({ categoryId }: SubcategoryListProps) {
  const [activeSub, setActiveSub] = useState("all");
  const subcategories = CATEGORIES.find(c => c.id === categoryId)?.subcategories.map(s => s.name) || [];

  if (subcategories.length === 0) return null;

  return (
    <div className="w-full bg-white border-b border-[var(--color-border)] sticky top-[72px] z-30 shadow-sm">
      <div className="container mx-auto px-4 md:px-8 py-3">
        <div className="flex overflow-x-auto gap-2 hide-scrollbar">
          <button
            onClick={() => setActiveSub("all")}
            className={cn(
              "whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors border",
              activeSub === "all"
                ? "bg-[var(--color-foreground)] text-white border-[var(--color-foreground)]"
                : "bg-white text-[var(--color-muted)] border-transparent hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-foreground)]"
            )}
          >
            All Services
          </button>
          
          {subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setActiveSub(sub)}
              className={cn(
                "whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors border",
                activeSub === sub
                  ? "bg-[var(--color-foreground)] text-white border-[var(--color-foreground)]"
                  : "bg-white text-[var(--color-muted)] border-transparent hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-foreground)]"
              )}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
