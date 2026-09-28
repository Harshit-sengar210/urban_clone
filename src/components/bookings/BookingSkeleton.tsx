"use client";

export function BookingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white border border-[var(--color-border)] rounded-2xl p-5 flex gap-5 animate-pulse">
          <div className="w-36 h-28 rounded-xl bg-slate-100 flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="h-5 bg-slate-100 rounded-lg w-1/3" />
            <div className="h-3 bg-slate-100 rounded w-1/4" />
            <div className="h-3 bg-slate-100 rounded w-2/5" />
            <div className="h-3 bg-slate-100 rounded w-1/3" />
            <div className="flex gap-2 pt-3">
              <div className="h-9 w-28 bg-slate-100 rounded-xl" />
              <div className="h-9 w-28 bg-slate-100 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
