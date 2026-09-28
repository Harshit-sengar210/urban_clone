"use client";

import { useState } from "react";
import { ModalShell } from "./ModalShell";
import { Booking } from "@/data/bookings";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const TIME_SLOTS = ["9:00 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

interface RescheduleModalProps {
  booking: Booking | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (bookingId: string, date: string, time: string) => void;
}

export function RescheduleModal({ booking, open, onClose, onConfirm }: RescheduleModalProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleConfirm = () => {
    if (!booking || !date || !time) return;
    onConfirm(booking.id, date, time);
    onClose();
  };

  if (!booking) return null;

  return (
    <ModalShell open={open} onClose={onClose} title="Reschedule Booking">
      <div className="mb-5 p-3 bg-slate-50 rounded-xl">
        <p className="text-sm font-bold text-[var(--color-foreground)]">{booking.service}</p>
        <p className="text-xs text-[var(--color-muted)] mt-0.5">
          Current: {new Date(booking.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} · {booking.time}
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[var(--color-primary)]" /> Choose new date
          </label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            className="w-full h-11 px-4 rounded-xl border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[var(--color-primary)]" /> Choose time slot
          </label>
          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                onClick={() => setTime(slot)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  time === slot
                    ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                    : "bg-white text-[var(--color-foreground)] border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
        <Button className="flex-1" disabled={!date || !time} onClick={handleConfirm}>
          Confirm Reschedule
        </Button>
      </div>
    </ModalShell>
  );
}
