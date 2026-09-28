"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays, Clock, MapPin, User2, Star,
  RotateCcw, XCircle, MoreHorizontal, ExternalLink,
  Navigation, RefreshCcw,
} from "lucide-react";
import { Booking, BookingStatus } from "@/data/bookings";
import { BookingStatusBadge } from "./BookingStatusBadge";
import { cn } from "@/lib/utils";

interface BookingCardProps {
  booking: Booking;
  index: number;
  onReschedule: (b: Booking) => void;
  onCancel: (b: Booking) => void;
  onReview: (b: Booking) => void;
}

const isUpcoming = (s: BookingStatus) => s === "confirmed" || s === "assigned" || s === "rescheduled";
const isActive   = (s: BookingStatus) => s === "on_the_way" || s === "in_progress";

export function BookingCard({ booking, index, onReschedule, onCancel, onReview }: BookingCardProps) {
  const dateStr = new Date(booking.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const active   = isActive(booking.status);
  const upcoming = isUpcoming(booking.status);
  const completed = booking.status === "completed";
  const cancelled = booking.status === "cancelled";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className={cn(
        "group bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200",
        active ? "border-sky-200 ring-2 ring-sky-100" : "border-[var(--color-border)]"
      )}
    >
      {/* Active Status Bar */}
      {active && (
        <div className="bg-sky-500 px-5 py-2 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
          <p className="text-xs font-bold text-white">
            {booking.status === "on_the_way"
              ? `Your professional is on the way · Est. ${booking.estimatedArrival}`
              : "Service is currently in progress"}
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-0 sm:gap-4 p-5">
        {/* Image */}
        <div className="w-full sm:w-36 h-40 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 relative">
          <Image
            src={booking.image}
            alt={booking.service}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, 144px"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 pt-3 sm:pt-0 flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="font-bold text-[var(--color-foreground)]">{booking.service}</h3>
                <BookingStatusBadge status={booking.status} />
              </div>
              <p className="text-xs text-[var(--color-muted)] font-medium">{booking.category}</p>
            </div>
            <p className="text-lg font-extrabold text-[var(--color-foreground)] flex-shrink-0">₹{booking.amount.toLocaleString()}</p>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-3">
            <span className="flex items-center gap-1.5 text-xs text-[var(--color-muted)]">
              <CalendarDays className="w-3.5 h-3.5 text-slate-400" /> {dateStr}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[var(--color-muted)]">
              <Clock className="w-3.5 h-3.5 text-slate-400" /> {booking.time}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[var(--color-muted)]">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> {booking.addressType} · {booking.address.split(",")[0]}
            </span>
            {booking.professional && (
              <span className="flex items-center gap-1.5 text-xs text-[var(--color-muted)]">
                <User2 className="w-3.5 h-3.5 text-slate-400" />
                {booking.professional}
                {booking.professionalRating && (
                  <span className="flex items-center gap-0.5 text-yellow-500 font-semibold">
                    <Star className="w-3 h-3 fill-yellow-400" /> {booking.professionalRating}
                  </span>
                )}
              </span>
            )}
          </div>

          <p className="text-[10px] text-slate-400 font-medium mb-3">ID: {booking.id}</p>

          {/* Existing review pill */}
          {completed && booking.review && (
            <div className="flex items-center gap-1.5 mb-3 px-3 py-1.5 bg-purple-50 border border-purple-100 rounded-lg w-fit">
              {[...Array(booking.review.rating)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-xs text-purple-700 font-semibold ml-1">Your Review</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {/* View Details — always present */}
            <Link
              href={`/dashboard/bookings/${booking.id}`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--color-border)] text-sm font-semibold text-[var(--color-foreground)] hover:bg-slate-50 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all"
            >
              View Details <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Active booking: Track */}
            {active && (
              <Link
                href={`/dashboard/bookings/${booking.id}/track`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" /> Track Booking
              </Link>
            )}

            {/* Upcoming: Reschedule + Cancel */}
            {upcoming && (
              <>
                <button
                  onClick={() => onReschedule(booking)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--color-border)] text-sm font-semibold text-[var(--color-foreground)] hover:bg-slate-50 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reschedule
                </button>
                <button
                  onClick={() => onCancel(booking)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-red-100 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
                >
                  <XCircle className="w-3.5 h-3.5" /> Cancel
                </button>
              </>
            )}

            {/* Completed: Book Again + Leave Review */}
            {completed && (
              <>
                <Link
                  href={`/services/${booking.serviceSlug}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--color-border)] text-sm font-semibold text-[var(--color-foreground)] hover:bg-slate-50 transition-colors"
                >
                  <RefreshCcw className="w-3.5 h-3.5" /> Book Again
                </Link>
                {!booking.review && (
                  <button
                    onClick={() => onReview(booking)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-primary)]/8 border border-[var(--color-primary)]/20 text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-primary)]/15 transition-colors"
                  >
                    <Star className="w-3.5 h-3.5" /> Leave Review
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
