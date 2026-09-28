"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Home, ChevronRight } from "lucide-react";
import { Booking } from "@/data/bookings";
import { BookingStatusBadge } from "./BookingStatusBadge";

interface BookingHeaderProps {
  booking: Booking;
}

export function BookingHeader({ booking }: BookingHeaderProps) {
  const createdDate = new Date(booking.createdAt).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-[var(--color-muted)] font-medium mb-4">
        <Link href="/dashboard" className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-1">
          <Home className="w-3 h-3" /> Dashboard
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-300" />
        <Link href="/dashboard/bookings" className="hover:text-[var(--color-primary)] transition-colors">
          My Bookings
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-300" />
        <span className="text-[var(--color-foreground)]">Booking Details</span>
      </nav>

      {/* Title Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-2xl font-extrabold text-[var(--color-foreground)] tracking-tight">Booking Details</h1>
        <Link
          href="/dashboard/bookings"
          className="flex items-center gap-1.5 text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Bookings
        </Link>
      </div>

      {/* Status Header Card */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--color-primary)]/6 via-purple-50/40 to-white border border-[var(--color-primary)]/10 p-6 mb-6">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-[var(--color-primary)]/8 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-[var(--color-foreground)] tracking-tight mb-2">
              {booking.service}
            </h2>
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <BookingStatusBadge status={booking.status} />
            </div>
            <p className="text-xs text-[var(--color-muted)] font-medium">Booking ID: <span className="text-[var(--color-foreground)] font-bold">{booking.id}</span></p>
            <p className="text-xs text-[var(--color-muted)] mt-0.5">Booked on {createdDate}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-3xl font-extrabold text-[var(--color-primary)]">₹{booking.amount.toLocaleString()}</p>
            <p className={`text-xs font-semibold mt-1 ${booking.paymentStatus === "paid" ? "text-green-600" : booking.paymentStatus === "refunded" ? "text-blue-600" : "text-orange-500"}`}>
              {booking.paymentStatus === "paid" ? "✓ Paid" : booking.paymentStatus === "refunded" ? "↩ Refunded" : "⏳ Pending"}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
