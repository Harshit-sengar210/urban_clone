"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Wrench, Star, User2, CalendarDays, Clock, MapPin } from "lucide-react";
import { Booking } from "@/data/bookings";

interface BookingInfoProps {
  booking: Booking;
}

export function BookingInfo({ booking }: BookingInfoProps) {
  const dateStr = new Date(booking.date).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });

  const INFO_ROWS = [
    { label: "Service",    value: booking.service,      icon: Wrench },
    { label: "Category",   value: booking.category,     icon: Wrench },
    { label: "Date",       value: dateStr,              icon: CalendarDays },
    { label: "Time",       value: booking.time,         icon: Clock },
    { label: "Booking ID", value: booking.id,           icon: User2 },
    { label: "Address",    value: `${booking.addressType} · ${booking.address}`, icon: MapPin },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="bg-white border border-[var(--color-border)] rounded-2xl shadow-sm overflow-hidden"
    >
      {/* Service Image */}
      <div className="relative w-full h-48 bg-slate-100">
        <Image
          src={booking.image}
          alt={booking.service}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-4 left-5">
          <p className="text-white font-extrabold text-lg drop-shadow-md">{booking.service}</p>
          <p className="text-white/80 text-sm font-medium">{booking.category}</p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="p-6">
        <h3 className="text-sm font-bold text-[var(--color-foreground)] uppercase tracking-wider mb-4">
          Booking Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {INFO_ROWS.map((row) => (
            <div key={row.label} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 border border-[var(--color-border)] flex items-center justify-center flex-shrink-0 mt-0.5">
                <row.icon className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--color-muted)] font-semibold uppercase tracking-wider">{row.label}</p>
                <p className="text-sm font-semibold text-[var(--color-foreground)] mt-0.5">{row.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
