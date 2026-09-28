"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MoreVertical, Pencil, Trash2, MapPin } from "lucide-react";
import { Review } from "@/data/reviews";
import { StarRating } from "./StarRating";
import { ReviewTags } from "./ReviewTags";
import { DetailedRatingsSection } from "./DetailedRatings";
import { ReviewPhotoGallery } from "./ReviewPhotoGallery";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review: Review;
  onEdit: (r: Review) => void;
  onDelete: (r: Review) => void;
}

export function ReviewCard({ review, onEdit, onDelete }: ReviewCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const dateStr = new Date(review.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className="bg-white border border-[var(--color-border)] rounded-2xl p-5 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
            <Image src={review.serviceImage} alt={review.serviceName} fill className="object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="font-bold text-sm text-[var(--color-foreground)]">{review.serviceName}</h3>
              <span className="flex items-center gap-0.5 text-xs font-extrabold text-white bg-green-600 px-1.5 py-0.5 rounded">
                {review.rating} <Star className="w-3 h-3 fill-white" />
              </span>
            </div>
            <p className="text-xs text-[var(--color-muted)] font-medium">
              {review.professional.name} {review.professional.verified && "· Verified"}
            </p>
            <p className="text-[10px] text-slate-400 mt-1">{dateStr}</p>
          </div>
        </div>

        {/* Menu */}
        <div className="relative">
          <button onClick={() => setMenuOpen(v => !v)} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
          <AnimatePresence>
            {menuOpen && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="absolute right-0 top-9 z-50 w-36 bg-white border border-[var(--color-border)] rounded-2xl shadow-xl py-1.5 overflow-hidden">
                <button onClick={() => { onEdit(review); setMenuOpen(false); }} className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-medium hover:bg-slate-50 text-[var(--color-foreground)] transition-colors">
                  <Pencil className="w-3.5 h-3.5 text-slate-400" /> Edit
                </button>
                <button onClick={() => { onDelete(review); setMenuOpen(false); }} className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-medium hover:bg-red-50 text-red-500 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Review Content */}
      <p className="text-sm text-[var(--color-foreground)] leading-relaxed mb-4 whitespace-pre-wrap">{review.reviewText}</p>

      {/* Tags */}
      {review.tags.length > 0 && (
        <div className="mb-4">
          <ReviewTags selected={review.tags} readonly />
        </div>
      )}

      {/* Photos */}
      {review.photos.length > 0 && (
        <div className="mb-4">
          <ReviewPhotoGallery photos={review.photos} />
        </div>
      )}

      {/* Detailed Ratings */}
      <div className="mb-4">
        <DetailedRatingsSection value={review.detailedRatings} readonly />
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
        <a href={`/dashboard/bookings/${review.bookingId}`} className="text-xs font-bold text-[var(--color-primary)] hover:underline">
          Booking #{review.bookingId.split("-").pop()}
        </a>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-600">Reviewed</span>
      </div>
    </motion.div>
  );
}
