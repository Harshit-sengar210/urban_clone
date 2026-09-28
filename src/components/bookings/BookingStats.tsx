"use client";

import { motion } from "framer-motion";
import { CalendarDays, CalendarCheck, Clock3, CheckCircle2 } from "lucide-react";
import { Booking } from "@/data/bookings";

interface BookingStatsProps {
  bookings: Booking[];
}

export function BookingStats({ bookings }: BookingStatsProps) {
  const total = bookings.length;
  const upcoming = bookings.filter(b => b.status === "confirmed" || b.status === "assigned" || b.status === "rescheduled").length;
  const inProgress = bookings.filter(b => b.status === "in_progress" || b.status === "on_the_way").length;
  const completed = bookings.filter(b => b.status === "completed").length;

  const STATS = [
    { label: "Total Bookings", value: total, sub: "All time", icon: CalendarDays, color: "text-[var(--color-primary)]", bg: "bg-[var(--color-primary)]/10" },
    { label: "Upcoming", value: upcoming, sub: "Next 30 days", icon: CalendarCheck, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "In Progress", value: inProgress, sub: "Currently active", icon: Clock3, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Completed", value: completed, sub: "Successfully done", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.06 }}
          className="bg-white border border-[var(--color-border)] rounded-2xl p-4 shadow-sm"
        >
          <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
            <s.icon className={`w-4.5 h-4.5 ${s.color}`} style={{ width: 18, height: 18 }} />
          </div>
          <p className="text-2xl font-extrabold text-[var(--color-foreground)] tracking-tight">{s.value}</p>
          <p className="text-sm font-semibold text-[var(--color-foreground)] mt-0.5">{s.label}</p>
          <p className="text-xs text-[var(--color-muted)] mt-0.5">{s.sub}</p>
        </motion.div>
      ))}
    </div>
  );
}
