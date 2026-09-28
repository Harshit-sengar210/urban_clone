"use client";

import { SORT_OPTIONS } from "@/data/serviceFilters";
import { useRouter, useSearchParams } from "next/navigation";

interface ResultsHeaderProps {
  totalResults: number;
}

export function ResultsHeader({ totalResults }: ResultsHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "popular";

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    router.push(`/services?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <h2 className="text-xl font-semibold text-[var(--color-foreground)]">
        {totalResults} {totalResults === 1 ? "service" : "services"} available
      </h2>

      <div className="hidden md:flex items-center gap-3">
        <span className="text-sm font-medium text-[var(--color-muted)]">Sort by:</span>
        <select
          value={currentSort}
          onChange={handleSortChange}
          className="h-10 px-4 rounded-xl border border-[var(--color-border)] text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
