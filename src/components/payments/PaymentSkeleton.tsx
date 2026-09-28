"use client";

export function PaymentSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Wallet card skeleton */}
      <div className="h-52 bg-slate-100 rounded-2xl" />

      {/* 2-col row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="h-64 bg-slate-100 rounded-2xl" />
        <div className="space-y-4">
          <div className="h-36 bg-slate-100 rounded-2xl" />
          <div className="h-24 bg-slate-100 rounded-2xl" />
        </div>
      </div>

      {/* Transactions skeleton */}
      <div className="bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--color-border)]">
          <div className="h-4 w-40 bg-slate-100 rounded" />
        </div>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex items-center gap-3 px-5 py-4 border-b border-[var(--color-border)] last:border-0">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 bg-slate-100 rounded w-48" />
              <div className="h-3 bg-slate-100 rounded w-32" />
            </div>
            <div className="h-4 w-16 bg-slate-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
