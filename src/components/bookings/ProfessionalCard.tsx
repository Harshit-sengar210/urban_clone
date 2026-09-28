"use client";

import { motion } from "framer-motion";
import { Star, ShieldCheck, Phone, MessageCircle } from "lucide-react";
import { Booking, BookingStatus } from "@/data/bookings";

const isContactable = (s: BookingStatus) =>
  ["confirmed", "assigned", "on_the_way", "in_progress"].includes(s);

interface ProfessionalCardProps {
  booking: Booking;
  onContactAction?: (action: "call" | "message") => void;
}

export function ProfessionalCard({ booking, onContactAction }: ProfessionalCardProps) {
  if (!booking.professional) {
    return (
      <div className="bg-white border border-[var(--color-border)] rounded-2xl shadow-sm p-5">
        <h3 className="font-bold text-[var(--color-foreground)] mb-3">Professional</h3>
        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-[var(--color-foreground)]">To be assigned</p>
            <p className="text-xs text-[var(--color-muted)]">A professional will be assigned after booking is confirmed.</p>
          </div>
        </div>
      </div>
    );
  }

  const initials = booking.professional.split(" ").map(n => n[0]).join("");
  const contactable = isContactable(booking.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.12 }}
      className="bg-white border border-[var(--color-border)] rounded-2xl shadow-sm p-5"
    >
      <h3 className="font-bold text-[var(--color-foreground)] mb-4">Professional</h3>

      <div className="flex items-start gap-3 mb-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold flex-shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-[var(--color-foreground)]">{booking.professional}</p>
          <p className="text-xs text-[var(--color-muted)]">{booking.category} Expert</p>
          {booking.professionalRating && (
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold text-[var(--color-foreground)]">{booking.professionalRating}</span>
              <span className="text-xs text-[var(--color-muted)]">· 1,200+ jobs</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-green-600 font-semibold mb-4 px-3 py-2 bg-green-50 rounded-lg">
        <ShieldCheck className="w-3.5 h-3.5" /> Verified Professional
      </div>

      {contactable && onContactAction && (
        <div className="flex gap-2">
          <button
            onClick={() => onContactAction("call")}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-[var(--color-border)] text-sm font-semibold text-[var(--color-foreground)] hover:bg-slate-50 transition-colors"
          >
            <Phone className="w-4 h-4 text-green-500" /> Call
          </button>
          <button
            onClick={() => onContactAction("message")}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-[var(--color-border)] text-sm font-semibold text-[var(--color-foreground)] hover:bg-slate-50 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-blue-500" /> Message
          </button>
        </div>
      )}
    </motion.div>
  );
}
