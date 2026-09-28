"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navigation, RotateCcw, XCircle, Star, RefreshCcw, Phone } from "lucide-react";
import { Booking, BookingStatus } from "@/data/bookings";
import { Button } from "@/components/ui/button";

interface BookingActionsProps {
  booking: Booking;
  onReschedule: () => void;
  onCancel: () => void;
  onReview: () => void;
  onContactAction?: (type: "call" | "message") => void;
}

export function BookingActions({ booking, onReschedule, onCancel, onReview, onContactAction }: BookingActionsProps) {
  const { status } = booking;

  const upcoming = ["confirmed", "assigned", "rescheduled"].includes(status);
  const active   = ["on_the_way", "in_progress"].includes(status);
  const completed = status === "completed";
  const cancelled = status === "cancelled";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      className="bg-white border border-[var(--color-border)] rounded-2xl shadow-sm p-5"
    >
      <h3 className="font-bold text-[var(--color-foreground)] mb-4">Actions</h3>
      <div className="flex flex-col gap-2">
        {upcoming && (
          <>
            <Button variant="outline" onClick={onReschedule} className="w-full justify-start gap-2">
              <RotateCcw className="w-4 h-4" /> Reschedule Booking
            </Button>
            <Button
              className="w-full justify-start gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 shadow-none"
              variant="outline"
              onClick={onCancel}
            >
              <XCircle className="w-4 h-4" /> Cancel Booking
            </Button>
          </>
        )}

        {active && (
          <>
            <Link href={`/dashboard/bookings/${booking.id}/track`}>
              <Button className="w-full justify-start gap-2">
                <Navigation className="w-4 h-4" /> Track Booking
              </Button>
            </Link>
            {onContactAction && (
              <Button variant="outline" className="w-full justify-start gap-2" onClick={() => onContactAction("call")}>
                <Phone className="w-4 h-4 text-green-500" /> Contact Professional
              </Button>
            )}
          </>
        )}

        {completed && (
          <>
            <Link href={`/services/${booking.serviceSlug}`}>
              <Button variant="outline" className="w-full justify-start gap-2">
                <RefreshCcw className="w-4 h-4" /> Book Again
              </Button>
            </Link>
            {!booking.review && (
              <Button onClick={onReview} className="w-full justify-start gap-2">
                <Star className="w-4 h-4" /> Leave a Review
              </Button>
            )}
          </>
        )}

        {cancelled && (
          <Link href={`/services/${booking.serviceSlug}`}>
            <Button className="w-full justify-start gap-2">
              <RefreshCcw className="w-4 h-4" /> Book This Service Again
            </Button>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
