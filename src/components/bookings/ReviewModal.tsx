"use client";

import { useState } from "react";
import { ModalShell } from "./ModalShell";
import { Booking } from "@/data/bookings";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReviewModalProps {
  booking: Booking | null;
  open: boolean;
  onClose: () => void;
  onSubmit: (bookingId: string, rating: number, comment: string) => void;
}

export function ReviewModal({ booking, open, onClose, onSubmit }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");

  if (!booking) return null;

  const handleSubmit = () => {
    if (!rating) return;
    onSubmit(booking.id, rating, comment);
    setRating(0);
    setComment("");
    onClose();
  };

  return (
    <ModalShell open={open} onClose={onClose} title="Rate Your Experience">
      <div className="mb-5 p-3 bg-slate-50 rounded-xl">
        <p className="text-sm font-bold text-[var(--color-foreground)]">{booking.service}</p>
        {booking.professional && (
          <p className="text-xs text-[var(--color-muted)] mt-0.5">Professional: {booking.professional}</p>
        )}
      </div>

      {/* Star Rating */}
      <div className="text-center mb-5">
        <p className="text-sm font-semibold text-[var(--color-muted)] mb-3">How was your experience?</p>
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(star)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-9 h-9 transition-colors ${
                  star <= (hovered || rating) ? "text-yellow-400 fill-yellow-400" : "text-slate-200 fill-slate-100"
                }`}
              />
            </button>
          ))}
        </div>
        {rating > 0 && (
          <p className="text-xs font-semibold text-[var(--color-primary)] mt-2">
            {["", "Poor", "Fair", "Good", "Very Good", "Excellent!"][rating]}
          </p>
        )}
      </div>

      {/* Comment */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">
          Tell us about your experience
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review here..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
        />
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
        <Button className="flex-1" disabled={!rating} onClick={handleSubmit}>Submit Review</Button>
      </div>
    </ModalShell>
  );
}
