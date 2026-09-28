"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";
import { ReviewForm } from "./ReviewForm";
import { PendingReview, Review } from "@/data/reviews";

interface ReviewDrawerProps {
  open: boolean;
  onClose: () => void;
  serviceInfo: Pick<PendingReview, "serviceName" | "professional" | "serviceImage"> | null;
  initialData?: Partial<Review>;
  isEditing?: boolean;
  onSubmit: (data: Omit<Review, "id" | "createdAt" | "updatedAt" | "bookingId" | "serviceSlug" | "serviceName" | "category" | "serviceImage" | "professional">) => void;
}

export function ReviewDrawer({ open, onClose, serviceInfo, initialData, isEditing, onSubmit }: ReviewDrawerProps) {
  if (!serviceInfo) return null;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="absolute right-0 top-0 bottom-0 w-full sm:w-[480px] bg-white flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border)] flex-shrink-0">
              <div>
                <h2 className="text-lg font-extrabold text-[var(--color-foreground)]">{isEditing ? "Edit Your Review" : "Rate Your Experience"}</h2>
                <p className="text-xs text-[var(--color-muted)] mt-0.5">Share your feedback to help others</p>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-colors">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <div className="flex-1 overflow-hidden">
              <ReviewForm
                key={initialData?.id || "new"}
                initialData={initialData}
                serviceInfo={serviceInfo}
                onSubmit={(d) => { onSubmit(d); setTimeout(onClose, 200); }}
                onCancel={onClose}
                isEditing={isEditing}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ─── Delete Modal ────────────────────────────────────────────────────────────
export function DeleteReviewModal({ open, onClose, onConfirm }: { open: boolean; onClose: () => void; onConfirm: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h2 className="font-bold text-[var(--color-foreground)] mb-0.5">Delete Review?</h2>
                <p className="text-sm text-[var(--color-muted)]">Are you sure you want to delete this review? Your feedback will be removed.</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={onClose} className="flex-1 h-11 rounded-xl border border-[var(--color-border)] text-sm font-semibold hover:bg-slate-50 transition-colors">Keep Review</button>
              <button onClick={() => { onConfirm(); onClose(); }} className="flex-1 h-11 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors">Delete</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
