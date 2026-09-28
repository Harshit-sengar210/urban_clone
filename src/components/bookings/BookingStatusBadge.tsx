"use client";

import { BookingStatus } from "@/data/bookings";
import { cn } from "@/lib/utils";

const STATUS_MAP: Record<BookingStatus, { label: string; cls: string }> = {
  confirmed:       { label: "Confirmed",       cls: "bg-green-50  text-green-700  border-green-100" },
  assigned:        { label: "Assigned",        cls: "bg-blue-50   text-blue-700   border-blue-100" },
  on_the_way:      { label: "On The Way",      cls: "bg-sky-50    text-sky-700    border-sky-100" },
  in_progress:     { label: "In Progress",     cls: "bg-orange-50 text-orange-700 border-orange-100" },
  completed:       { label: "Completed",       cls: "bg-purple-50 text-purple-700 border-purple-100" },
  cancelled:       { label: "Cancelled",       cls: "bg-red-50    text-red-600    border-red-100" },
  rescheduled:     { label: "Rescheduled",     cls: "bg-yellow-50 text-yellow-700 border-yellow-100" },
  pending_payment: { label: "Pending Payment", cls: "bg-rose-50   text-rose-700   border-rose-100" },
  pending:         { label: "Pending",         cls: "bg-gray-50   text-gray-700   border-gray-100" },
  rejected:        { label: "Rejected",        cls: "bg-red-100   text-red-800    border-red-200" },
};

interface BookingStatusBadgeProps {
  status: BookingStatus;
  className?: string;
}

export function BookingStatusBadge({ status, className }: BookingStatusBadgeProps) {
  const config = STATUS_MAP[status as keyof typeof STATUS_MAP] || { label: status || "Unknown", cls: "bg-gray-50 text-gray-700 border-gray-100" };
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border",
      config.cls,
      className
    )}>
      {config.label}
    </span>
  );
}
