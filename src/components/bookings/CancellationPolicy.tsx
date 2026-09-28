"use client";

import { Info } from "lucide-react";
import { Booking } from "@/data/bookings";

interface CancellationPolicyProps {
  booking: Booking;
}

export function CancellationPolicy({ booking }: CancellationPolicyProps) {
  if (booking.status === "completed" || booking.status === "cancelled") return null;

  return (
    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
      <div className="flex items-start gap-2">
        <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-amber-800 mb-0.5">Cancellation Policy</p>
          <p className="text-xs text-amber-700 leading-relaxed">{booking.cancellationPolicy.freeUntil}.</p>
          <p className="text-xs text-amber-700 mt-1">
            {booking.cancellationPolicy.refundable
              ? "Refund will be processed within 5–7 business days."
              : "This booking is non-refundable after cancellation window."}
          </p>
        </div>
      </div>
    </div>
  );
}
