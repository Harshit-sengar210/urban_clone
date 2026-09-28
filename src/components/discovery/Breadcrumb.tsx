"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/data/categories";
import { ChevronRight } from "lucide-react";

export function Breadcrumb() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category");
  const subcategorySlug = searchParams.get("subcategory");

  const category = CATEGORIES.find(c => c.slug === categorySlug);
  const subcategory = category?.subcategories.find(s => s.slug === subcategorySlug);

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-sm text-[var(--color-muted)] overflow-x-auto whitespace-nowrap hide-scrollbar">
      <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">
        Home
      </Link>
      <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
      <Link href="/services" className={`hover:text-[var(--color-primary)] transition-colors ${!category ? "text-[var(--color-foreground)] font-medium" : ""}`}>
        Services
      </Link>
      
      {category && (
        <>
          <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
          <Link 
            href={`/services?category=${category.slug}`} 
            className={`hover:text-[var(--color-primary)] transition-colors ${!subcategory ? "text-[var(--color-foreground)] font-medium" : ""}`}
          >
            {category.name}
          </Link>
        </>
      )}

      {subcategory && (
        <>
          <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
          <span className="text-[var(--color-foreground)] font-medium">
            {subcategory.name}
          </span>
        </>
      )}
    </nav>
  );
}
