"use client";

import { Gift } from "lucide-react";
import Link from "next/link";
import { OfferCategory } from "@/data/offers";

export function OfferSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Hero */}
      <div className="h-48 bg-slate-100 rounded-2xl" />
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map(i => <div key={i} className="h-24 bg-slate-100 rounded-2xl" />)}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <div className="h-9 w-20 bg-slate-100 rounded-full" />
        <div className="h-9 w-24 bg-slate-100 rounded-full" />
        <div className="h-9 w-24 bg-slate-100 rounded-full" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-48 bg-slate-100 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export function OfferEmptyState({ category }: { category: OfferCategory }) {
  const getMessage = () => {
    switch (category) {
      case "Saved":
        return {
          title: "No saved offers yet",
          desc: "Save an offer to find it here later when you're ready to book.",
          action: "Explore Offers"
        };
      case "Used":
        return {
          title: "No used offers",
          desc: "Your redeemed coupons will appear here after your service is completed.",
          action: "Explore Offers"
        };
      case "Expired":
        return {
          title: "No expired offers",
          desc: "You don't have any expired offers right now.",
          action: "Back to Active"
        };
      default:
        return {
          title: "No offers available",
          desc: "There aren't any offers matching your search or selected category.",
          action: "Clear Filters"
        };
    }
  };

  const { title, desc, action } = getMessage();

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
      <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-5 border border-slate-100">
        <Gift className="w-8 h-8 text-slate-300" />
      </div>
      <h3 className="text-lg font-bold text-[var(--color-foreground)] mb-2">{title}</h3>
      <p className="text-sm text-[var(--color-muted)] max-w-[260px] mb-6 leading-relaxed">{desc}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2.5 bg-white border border-[var(--color-border)] text-[var(--color-foreground)] text-sm font-bold rounded-xl shadow-sm hover:bg-slate-50 transition-colors"
      >
        {action}
      </button>
    </div>
  );
}
