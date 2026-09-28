"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { Booking, BookingStatus } from "@/data/bookings";

// Map booking status → which steps are done
const STEPS = [
  { key: "placed",      label: "Booking Placed",          desc: "Your booking was successfully created." },
  { key: "assigned",    label: "Professional Assigned",   desc: "A professional has accepted your booking." },
  { key: "on_the_way",  label: "Professional On The Way", desc: "Your professional is heading to your location." },
  { key: "arrived",     label: "Professional Arrived",    desc: "The professional has arrived at your location." },
  { key: "in_progress", label: "Service Started",         desc: "Your service is currently in progress." },
  { key: "completed",   label: "Service Completed",       desc: "Your service has been completed successfully." },
];

const STATUS_PROGRESS: Record<BookingStatus, number> = {
  pending:         0,
  confirmed:       0,
  assigned:        1,
  on_the_way:      2,
  in_progress:     4,
  completed:       5,
  cancelled:       -1,
  rejected:        -1,
  rescheduled:     0,
  pending_payment: 0,
};

const CANCELLED_EVENT = { label: "Booking Cancelled", desc: "This booking was cancelled." };

interface BookingTimelineProps {
  booking: Booking;
  createdDateLabel?: string;
}

export function BookingTimeline({ booking, createdDateLabel }: BookingTimelineProps) {
  const progress = STATUS_PROGRESS[booking.status];
  const isCancelled = booking.status === "cancelled";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="bg-white border border-[var(--color-border)] rounded-2xl shadow-sm p-6"
    >
      <h3 className="font-bold text-[var(--color-foreground)] mb-6">Booking Status</h3>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-100" />

        <div className="space-y-6">
          {STEPS.slice(0, isCancelled ? 1 : undefined).map((step, i) => {
            const done  = i <= progress;
            const active = i === progress + 1 && !isCancelled;

            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="relative flex gap-4 items-start"
              >
                {/* Icon */}
                <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  done  ? "bg-[var(--color-primary)] text-white shadow-md shadow-primary/20" :
                  active ? "bg-sky-100 border-2 border-sky-400" :
                  "bg-slate-100 border border-slate-200"
                }`}>
                  {done ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : active ? (
                    <Loader2 className="w-4 h-4 text-sky-500 animate-spin" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-300" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-1">
                  <p className={`text-sm font-bold ${done || active ? "text-[var(--color-foreground)]" : "text-slate-400"}`}>
                    {step.label}
                  </p>
                  {(done || active) && (
                    <p className="text-xs text-[var(--color-muted)] mt-0.5">{step.desc}</p>
                  )}
                  {i === 0 && createdDateLabel && (
                    <p className="text-[10px] text-slate-400 mt-0.5">{createdDateLabel}</p>
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* Cancelled event */}
          {isCancelled && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative flex gap-4 items-start"
            >
              <div className="relative z-10 w-8 h-8 rounded-full bg-red-100 border border-red-200 flex items-center justify-center flex-shrink-0">
                <span className="text-red-500 text-sm font-bold">×</span>
              </div>
              <div className="flex-1 pb-1">
                <p className="text-sm font-bold text-red-500">{CANCELLED_EVENT.label}</p>
                <p className="text-xs text-[var(--color-muted)] mt-0.5">{CANCELLED_EVENT.desc}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
