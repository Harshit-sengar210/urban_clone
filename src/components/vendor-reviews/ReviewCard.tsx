"use client";

import { motion } from "framer-motion";
import { Star, MessageSquare, CheckCircle2 } from "lucide-react";
import { VendorReview } from "@/types/vendor";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review: VendorReview;
  onClick: () => void;
  index: number;
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} className={cn("w-3.5 h-3.5", s <= rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200")} />
      ))}
    </div>
  );
}

export function ReviewCard({ review, onClick, index }: ReviewCardProps) {
  const initials = review.customerDisplayName.charAt(0).toUpperCase();
  const date = new Date(review.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      layout
      onClick={onClick}
      className="bg-white rounded-2xl border border-slate-100 p-5 cursor-pointer hover:shadow-md hover:border-slate-200 transition-all group"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0"
          style={{ backgroundColor: review.customerAvatarColor }}
          aria-hidden
        >
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
            <div>
              <span className="font-bold text-slate-900 text-sm">{review.customerDisplayName}</span>
              <div className="flex items-center gap-2 mt-0.5">
                <StarRow rating={review.rating} />
                <span className="text-xs text-slate-400">{date}</span>
              </div>
            </div>
            {review.reply ? (
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                <CheckCircle2 className="w-3 h-3" /> Replied
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full shrink-0">
                <MessageSquare className="w-3 h-3" /> Awaiting reply
              </span>
            )}
          </div>

          {/* Review Text */}
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-3">{review.reviewText}</p>

          {/* Footer */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
              {review.serviceName}
            </span>
            {review.reply && (
              <span className="text-xs text-slate-400 italic line-clamp-1 flex-1">
                Your reply: &ldquo;{review.reply.text}&rdquo;
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
