"use client";

import { cn } from "@/lib/utils";
import { BookingStatus } from "@/data/bookings";

const TABS: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "Upcoming", value: "upcoming" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

interface BookingTabsProps {
  active: string;
  onChange: (val: string) => void;
}

export function BookingTabs({ active, onChange }: BookingTabsProps) {
  return (
    <div className="overflow-x-auto scrollbar-hide -mx-1 px-1 mb-4">
      <div className="flex gap-1 min-w-max border-b border-[var(--color-border)]">
        {TABS.map((tab) => {
          const isActive = active === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => onChange(tab.value)}
              className={cn(
                "px-4 py-3 text-sm font-semibold whitespace-nowrap transition-all border-b-2 -mb-px",
                isActive
                  ? "text-[var(--color-primary)] border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                  : "text-slate-500 border-transparent hover:text-[var(--color-foreground)] hover:bg-slate-50"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
