"use client";

import { MapPin } from "lucide-react";

export function AddressSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white border border-[var(--color-border)] rounded-2xl p-5 animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100" />
              <div className="h-4 w-16 bg-slate-100 rounded-lg" />
            </div>
            <div className="w-7 h-7 bg-slate-100 rounded-lg" />
          </div>
          <div className="space-y-2 mb-5">
            <div className="h-3.5 bg-slate-100 rounded w-2/3" />
            <div className="h-3 bg-slate-100 rounded w-full" />
            <div className="h-3 bg-slate-100 rounded w-3/4" />
          </div>
          <div className="flex gap-2 pt-4 border-t border-slate-50">
            <div className="h-8 flex-1 bg-slate-100 rounded-xl" />
            <div className="h-8 flex-1 bg-slate-100 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function AddressEmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-3xl bg-[var(--color-primary)]/8 flex items-center justify-center mb-5">
        <MapPin className="w-10 h-10 text-[var(--color-primary)]/40" />
      </div>
      <h3 className="text-lg font-bold text-[var(--color-foreground)] mb-2">No saved addresses yet</h3>
      <p className="text-sm text-[var(--color-muted)] max-w-xs mb-6 leading-relaxed">
        Save your home, work, or other locations to make booking services faster and easier.
      </p>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white font-bold text-sm rounded-xl hover:opacity-90 transition-opacity"
      >
        Add Your First Address
      </button>
    </div>
  );
}
