"use client";

import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { useState } from "react";

interface BookingFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  sort: string;
  onSortChange: (v: string) => void;
  dateFilter: string;
  onDateFilterChange: (v: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (v: string) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

const SORTS = ["Newest First", "Oldest First", "Highest Amount", "Lowest Amount"];
const DATE_OPTS = ["All Dates", "Today", "This Week", "This Month", "Last 3 Months"];
const CATS = ["All Categories", "Cleaning", "AC & Appliances", "Plumbing", "Beauty", "Painting", "Electrical", "Pest Control"];

function FilterSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none h-10 pl-3 pr-8 rounded-xl border border-[var(--color-border)] bg-white text-sm font-medium text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] cursor-pointer"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
    </div>
  );
}

export function BookingFilters({
  search, onSearchChange, sort, onSortChange,
  dateFilter, onDateFilterChange, categoryFilter, onCategoryFilterChange,
  onClear, hasActiveFilters,
}: BookingFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center mb-6">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search bookings, ID, service..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-10 pl-10 pr-4 rounded-xl border border-[var(--color-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
        />
        {search && (
          <button onClick={() => onSearchChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <FilterSelect value={dateFilter} onChange={onDateFilterChange} options={DATE_OPTS} />
        <FilterSelect value={categoryFilter} onChange={onCategoryFilterChange} options={CATS} />
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-500">Sort:</span>
          <FilterSelect value={sort} onChange={onSortChange} options={SORTS} />
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 h-10 px-3 rounded-xl border border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
