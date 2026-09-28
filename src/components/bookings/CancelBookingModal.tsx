"use client";

import { ModalShell } from "./ModalShell";
import { Booking } from "@/data/bookings";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CancelBookingModalProps {
  booking: Booking | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (bookingId: string) => void;
}

export function CancelBookingModal({ booking, open, onClose, onConfirm }: CancelBookingModalProps) {
  if (!booking) return null;

  return (
    <ModalShell open={open} onClose={onClose} title="Cancel Booking?">
      <div className="flex gap-3 mb-5 p-4 bg-red-50 border border-red-100 rounded-xl">
        <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-[var(--color-foreground)]">{booking.service}</p>
          <p className="text-xs text-[var(--color-muted)] mt-0.5">
            {new Date(booking.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · {booking.time}
          </p>
        </div>
      </div>

      <p className="text-sm text-[var(--color-muted)] mb-4">
        Are you sure you want to cancel this booking? This action cannot be undone.
      </p>

      <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-xl mb-6">
        <p className="text-xs font-semibold text-yellow-800">Cancellation Policy</p>
        <p className="text-xs text-yellow-700 mt-0.5">{booking.cancellationPolicy.freeUntil}. {booking.cancellationPolicy.refundable ? "Refund will be processed in 5–7 business days." : "This booking is non-refundable."}</p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" onClick={onClose}>Keep Booking</Button>
        <Button
          className="flex-1 bg-red-500 hover:bg-red-600 text-white border-none shadow-none"
          onClick={() => { onConfirm(booking.id); onClose(); }}
        >
          Cancel Booking
        </Button>
      </div>
    </ModalShell>
  );
}
