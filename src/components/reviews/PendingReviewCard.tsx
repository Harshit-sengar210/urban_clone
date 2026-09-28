"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Star } from "lucide-react";
import { PendingReview } from "@/data/reviews";

interface PendingReviewCardProps {
  review: PendingReview;
  onRate: (r: PendingReview) => void;
}

export function PendingReviewCard({ review, onRate }: PendingReviewCardProps) {
  const dateStr = new Date(review.completedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white border border-amber-200/60 rounded-2xl p-5 shadow-sm relative overflow-hidden"
    >
      {/* Pending Banner */}
      <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-bl-xl tracking-wider uppercase">
        Action Required
      </div>

      <div className="flex items-start gap-4 mb-4">
        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
          <Image src={review.serviceImage} alt={review.serviceName} fill className="object-cover" />
        </div>
        <div className="flex-1 mt-1">
          <h3 className="font-bold text-[var(--color-foreground)] mb-0.5">{review.serviceName}</h3>
          <p className="text-xs text-[var(--color-muted)] font-medium mb-1">{review.category}</p>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-[var(--color-foreground)]">
            <span>{review.professional.name}</span>
            {review.professional.verified && <ShieldCheck className="w-3.5 h-3.5 text-green-500" />}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-[var(--color-muted)] mb-4 border-t border-slate-50 pt-3">
        <span>Completed {dateStr}</span>
        <span>ID: {review.bookingId.split("-").pop()}</span>
      </div>

      <button
        onClick={() => onRate(review)}
        className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-violet-600 text-white text-sm font-bold shadow-md shadow-primary/20 hover:opacity-90 transition-opacity"
      >
        <Star className="w-4 h-4 fill-white text-white" /> Rate Service
      </button>
    </motion.div>
  );
}
