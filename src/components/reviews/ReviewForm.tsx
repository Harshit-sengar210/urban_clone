"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck, X } from "lucide-react";
import { PendingReview, Review, ReviewTag, DetailedRatings } from "@/data/reviews";
import { StarRating } from "./StarRating";
import { ReviewTags } from "./ReviewTags";
import { DetailedRatingsSection } from "./DetailedRatings";
import { ReviewPhotoUploader } from "./ReviewPhotoUploader";
import { cn } from "@/lib/utils";

interface ReviewFormProps {
  initialData?: Partial<Review>;
  serviceInfo: Pick<PendingReview, "serviceName" | "professional" | "serviceImage">;
  onSubmit: (data: Omit<Review, "id" | "createdAt" | "updatedAt" | "bookingId" | "serviceSlug" | "serviceName" | "category" | "serviceImage" | "professional">) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export function ReviewForm({ initialData, serviceInfo, onSubmit, onCancel, isEditing = false }: ReviewFormProps) {
  const [rating, setRating] = useState(initialData?.rating ?? 0);
  const [reviewText, setReviewText] = useState(initialData?.reviewText ?? "");
  const [tags, setTags] = useState<ReviewTag[]>(initialData?.tags ?? []);
  const [detailedRatings, setDetailedRatings] = useState<DetailedRatings>(
    initialData?.detailedRatings ?? { professionalism: 0, punctuality: 0, quality: 0, value: 0 }
  );
  const [photos, setPhotos] = useState<string[]>(initialData?.photos ?? []);

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const textCount = reviewText.length;
  const isTextValid = textCount >= 10 && textCount <= 500;
  const canSubmit = rating > 0 && isTextValid && !submitting;

  const handleSubmit = () => {
    if (!canSubmit) {
      if (rating === 0) setError("Please select a rating.");
      else if (textCount < 10) setError("Review must be at least 10 characters.");
      return;
    }
    setError("");
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        onSubmit({ rating, reviewText, tags, detailedRatings, photos });
      }, 1000);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 bg-white flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", damping: 15 }} className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </motion.div>
            <h3 className="text-xl font-extrabold text-[var(--color-foreground)] mb-2">Thanks for your review!</h3>
            <p className="text-sm text-[var(--color-muted)] max-w-[280px]">Your feedback helps improve the UrbanClone experience for everyone.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={cn("flex-1 overflow-y-auto px-6 py-6 space-y-7", success && "opacity-0 pointer-events-none")}>
        {/* Service / Pro Info */}
        <div className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
            <Image src={serviceInfo.serviceImage} alt={serviceInfo.serviceName} fill className="object-cover" />
          </div>
          <div>
            <h3 className="font-bold text-[var(--color-foreground)] text-sm mb-1">{serviceInfo.serviceName}</h3>
            <p className="text-xs font-semibold text-[var(--color-muted)]">{serviceInfo.professional.name}</p>
            {serviceInfo.professional.verified && (
              <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-green-600">
                <ShieldCheck className="w-3 h-3" /> Verified Professional
              </div>
            )}
          </div>
        </div>

        {/* Rating */}
        <div>
          <p className="text-sm font-bold text-[var(--color-foreground)] mb-3">How was your experience?</p>
          <StarRating value={rating} size="xl" showLabel onChange={(v) => { setRating(v); setError(""); }} />
        </div>

        {/* Text Area */}
        <div>
          <label className="block text-xs font-bold text-[var(--color-foreground)] mb-2 uppercase tracking-wider">Tell us about your experience</label>
          <textarea
            value={reviewText}
            onChange={(e) => { setReviewText(e.target.value.slice(0, 500)); setError(""); }}
            placeholder="Share details about the service, professional's behavior, and overall quality..."
            className={cn(
              "w-full h-32 p-4 rounded-2xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all resize-none",
              error && !isTextValid ? "border-red-300 focus:border-red-400" : "border-[var(--color-border)] focus:border-[var(--color-primary)]"
            )}
          />
          <div className="flex items-center justify-between mt-1.5">
            {error ? (
              <p className="text-xs text-red-500 font-medium">{error}</p>
            ) : (
              <p className="text-[10px] text-[var(--color-muted)]">Minimum 10 characters.</p>
            )}
            <span className={cn("text-xs font-medium", textCount > 480 ? "text-amber-500" : "text-slate-400")}>
              {textCount} / 500
            </span>
          </div>
        </div>

        {/* Tags */}
        <ReviewTags selected={tags} onChange={setTags} />

        {/* Detailed Ratings */}
        <DetailedRatingsSection value={detailedRatings} onChange={setDetailedRatings} />

        {/* Photos */}
        <ReviewPhotoUploader photos={photos} onChange={setPhotos} />
      </div>

      {/* Footer */}
      <div className={cn("px-6 py-5 border-t border-[var(--color-border)] bg-white flex gap-3 flex-shrink-0 transition-opacity", success && "opacity-0 pointer-events-none")}>
        <button onClick={onCancel} disabled={submitting} className="flex-1 h-11 rounded-xl border border-[var(--color-border)] text-sm font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="flex-1 h-11 rounded-xl bg-[var(--color-primary)] text-white text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {submitting ? "Submitting..." : (isEditing ? "Save Changes" : "Submit Review")}
        </button>
      </div>
    </div>
  );
}
