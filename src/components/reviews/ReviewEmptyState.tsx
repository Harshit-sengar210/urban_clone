"use client";

export function ReviewSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 bg-slate-100 rounded-2xl" />
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <div className="h-9 w-20 bg-slate-100 rounded-full" />
        <div className="h-9 w-24 bg-slate-100 rounded-full" />
        <div className="h-9 w-24 bg-slate-100 rounded-full" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map(i => (
          <div key={i} className="h-48 bg-slate-100 rounded-2xl p-5 border border-slate-100">
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-slate-200 rounded-xl" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-slate-200 rounded w-1/2" />
                <div className="h-3 bg-slate-200 rounded w-1/3" />
                <div className="h-3 bg-slate-200 rounded w-1/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReviewEmptyState({ isPending }: { isPending: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
      <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-5 border border-slate-100">
        <span className="text-3xl">{isPending ? "🎉" : "📝"}</span>
      </div>
      <h3 className="text-lg font-bold text-[var(--color-foreground)] mb-2">
        {isPending ? "You're all caught up!" : "No reviews yet"}
      </h3>
      <p className="text-sm text-[var(--color-muted)] max-w-[260px] mb-6">
        {isPending
          ? "You don't have any completed services waiting for a review right now."
          : "Your submitted service reviews will appear here after you rate your bookings."}
      </p>
      <a
        href={isPending ? "/services" : "/dashboard/bookings"}
        className="px-6 py-3 bg-[var(--color-primary)] text-white text-sm font-bold rounded-xl shadow-md shadow-primary/20 hover:opacity-90 hover:-translate-y-0.5 transition-all"
      >
        {isPending ? "Browse Services" : "View My Bookings"}
      </a>
    </div>
  );
}
