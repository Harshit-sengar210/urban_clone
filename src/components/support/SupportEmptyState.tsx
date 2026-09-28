"use client";

import { MessageSquareText } from "lucide-react";

export function SupportSkeleton() {
  return (
    <div className="space-y-10 animate-pulse">
      {/* Hero */}
      <div className="h-64 bg-slate-100 rounded-3xl" />
      
      {/* Quick Actions */}
      <div>
        <div className="h-6 w-48 bg-slate-100 rounded mb-5" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-32 bg-slate-100 rounded-2xl" />)}
        </div>
      </div>

      {/* FAQ */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-56 space-y-2">
          {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-10 bg-slate-100 rounded-xl" />)}
        </div>
        <div className="flex-1 space-y-3">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-14 bg-slate-100 rounded-2xl" />)}
        </div>
      </div>
    </div>
  );
}

export function SupportEmptyState({ type = "tickets" }: { type?: "tickets" | "search" }) {
  if (type === "search") {
    return (
      <div className="py-12 text-center bg-white border border-dashed border-slate-200 rounded-3xl">
        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mx-auto mb-4 border border-slate-100">
          <Search className="w-5 h-5 text-slate-300" />
        </div>
        <h3 className="text-sm font-bold text-[var(--color-foreground)] mb-1">No results found</h3>
        <p className="text-xs text-[var(--color-muted)] max-w-[250px] mx-auto mb-4">Try different keywords or create a support request if you can't find what you need.</p>
      </div>
    );
  }

  return (
    <div className="py-12 text-center bg-white border border-dashed border-slate-200 rounded-3xl">
      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mx-auto mb-4 border border-slate-100">
        <MessageSquareText className="w-5 h-5 text-slate-300" />
      </div>
      <h3 className="text-sm font-bold text-[var(--color-foreground)] mb-1">No support requests yet</h3>
      <p className="text-xs text-[var(--color-muted)] max-w-[250px] mx-auto mb-4">
        If you need help with a booking or payment, you can create a support request anytime.
      </p>
    </div>
  );
}

// Need to import Search here to fix the above usage, but it's isolated.
import { Search } from "lucide-react";
