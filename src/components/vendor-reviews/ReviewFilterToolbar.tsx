"use client";

import { Search, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ReviewFilters {
  search: string;
  rating: number | null;
  serviceId: string | null;
  replyStatus: "all" | "replied" | "not_replied";
  sortBy: "newest" | "oldest" | "highest" | "lowest";
}

interface ReviewFilterToolbarProps {
  filters: ReviewFilters;
  onChange: (f: ReviewFilters) => void;
  serviceOptions: { id: string; name: string }[];
  notRepliedCount: number;
}

export function ReviewFilterToolbar({ filters, onChange, serviceOptions, notRepliedCount }: ReviewFilterToolbarProps) {
  const set = (partial: Partial<ReviewFilters>) => onChange({ ...filters, ...partial });

  const hasActiveFilters =
    filters.search !== "" ||
    filters.rating !== null ||
    filters.serviceId !== null ||
    filters.replyStatus !== "all";

  const clearAll = () => onChange({ search: "", rating: null, serviceId: null, replyStatus: "all", sortBy: "newest" });

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-3">
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filters.search}
            onChange={e => set({ search: e.target.value })}
            placeholder="Search reviews..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 outline-none transition"
          />
        </div>

        {/* Rating */}
        <div className="relative">
          <select
            value={filters.rating ?? ""}
            onChange={e => set({ rating: e.target.value === "" ? null : Number(e.target.value) })}
            className="pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/30 outline-none appearance-none cursor-pointer"
            aria-label="Filter by rating"
          >
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>

        {/* Service */}
        <div className="relative">
          <select
            value={filters.serviceId ?? ""}
            onChange={e => set({ serviceId: e.target.value === "" ? null : e.target.value })}
            className="pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/30 outline-none appearance-none cursor-pointer"
            aria-label="Filter by service"
          >
            <option value="">All Services</option>
            {serviceOptions.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>

        {/* Reply Status */}
        <div className="relative">
          <select
            value={filters.replyStatus}
            onChange={e => set({ replyStatus: e.target.value as ReviewFilters["replyStatus"] })}
            className="pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/30 outline-none appearance-none cursor-pointer"
            aria-label="Filter by reply status"
          >
            <option value="all">All Replies</option>
            <option value="replied">Replied</option>
            <option value="not_replied">Not Replied {notRepliedCount > 0 ? `(${notRepliedCount})` : ""}</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>

        {/* Sort */}
        <div className="relative ml-auto">
          <select
            value={filters.sortBy}
            onChange={e => set({ sortBy: e.target.value as ReviewFilters["sortBy"] })}
            className="pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/30 outline-none appearance-none cursor-pointer"
            aria-label="Sort reviews"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>

        {/* Clear all */}
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
            aria-label="Clear all filters"
          >
            <X className="w-3.5 h-3.5" /> Clear filters
          </button>
        )}
      </div>

      {/* Active filter chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold border border-indigo-100">
              Search: &ldquo;{filters.search}&rdquo;
              <button onClick={() => set({ search: "" })} aria-label="Remove search filter"><X className="w-3 h-3" /></button>
            </div>
          )}
          {filters.rating !== null && (
            <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-bold border border-amber-100">
              {filters.rating} Stars
              <button onClick={() => set({ rating: null })} aria-label="Remove rating filter"><X className="w-3 h-3" /></button>
            </div>
          )}
          {filters.serviceId !== null && (
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100">
              {serviceOptions.find(s => s.id === filters.serviceId)?.name}
              <button onClick={() => set({ serviceId: null })} aria-label="Remove service filter"><X className="w-3 h-3" /></button>
            </div>
          )}
          {filters.replyStatus !== "all" && (
            <div className="flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-bold border border-purple-100">
              {filters.replyStatus === "replied" ? "Replied" : "Not Replied"}
              <button onClick={() => set({ replyStatus: "all" })} aria-label="Remove reply filter"><X className="w-3 h-3" /></button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
