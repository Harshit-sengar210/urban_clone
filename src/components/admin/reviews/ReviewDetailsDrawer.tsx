"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Flag, CheckCircle, ExternalLink, ShieldAlert, Trash2 } from "lucide-react";
import type { AdminReview } from "@/data/adminReviewsData";

export function ReviewDetailsDrawer({
  review,
  onClose,
  onUpdateStatus
}: {
  review: AdminReview | null;
  onClose: () => void;
  onUpdateStatus?: (status: string) => void;
}) {
  if (!review) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[150] flex justify-end"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-lg font-bold text-[#0A192F]">Review Details</h2>
                <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border ${
                  review.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                  review.status === 'flagged' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                  review.status === 'under_review' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  'bg-slate-50 text-slate-700 border-slate-200'
                }`}>
                  {review.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-slate-500">ID: {review.id} • Posted on {new Date(review.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric'})}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* The Review Content */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className={`w-5 h-5 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`} />
                ))}
                <span className="ml-2 font-bold text-slate-700">{review.rating}.0 / 5.0</span>
              </div>
              <h3 className="text-lg font-bold text-[#0A192F] mb-2">{review.title || "No Title Provided"}</h3>
              <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{review.text}</p>
            </div>

            {/* Context Info (Booking, Customer, Vendor) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-slate-100 rounded-xl p-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Customer</p>
                <p className="font-bold text-slate-800">{review.customer.name}</p>
                <p className="text-xs text-slate-500 mt-1">{review.customer.id}</p>
              </div>
              
              <div className="border border-slate-100 rounded-xl p-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Service Professional</p>
                <p className="font-bold text-slate-800">{review.vendor.name}</p>
                <p className="text-xs text-slate-500 mt-1">{review.vendor.id}</p>
              </div>

              <div className="col-span-2 border border-slate-100 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Service & Booking</p>
                  <p className="font-bold text-[#0A192F]">{review.service.serviceName}</p>
                  <p className="text-xs text-slate-500 mt-1">Booking: {review.bookingId}</p>
                </div>
                <button className="flex items-center gap-1 text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] bg-[var(--color-primary)]/10 px-3 py-1.5 rounded-lg transition-colors">
                  View Booking <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Moderation Warning (If flagged) */}
            {review.status === 'flagged' && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-rose-800">Review Flagged for Moderation</h4>
                  <p className="text-xs text-rose-600 mt-1">This review has been reported by the vendor or automated systems for potentially violating community guidelines.</p>
                </div>
              </div>
            )}

          </div>

          {/* Footer Actions */}
          <div className="p-4 md:p-6 border-t border-slate-100 bg-slate-50 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 sticky bottom-0">
            <button className="w-full sm:w-auto px-4 py-2.5 bg-white border border-rose-200 text-rose-600 rounded-lg text-sm font-bold hover:bg-rose-50 transition-colors flex items-center justify-center gap-2">
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
            <div className="flex gap-2 w-full sm:w-auto">
              {review.status !== 'published' && (
                <button 
                  onClick={() => onUpdateStatus && onUpdateStatus('published')}
                  className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-sm font-bold hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Publish</span>
                </button>
              )}
              {review.status !== 'flagged' && (
                <button 
                  onClick={() => onUpdateStatus && onUpdateStatus('flagged')}
                  className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-amber-200 text-amber-700 rounded-lg text-sm font-bold hover:bg-amber-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Flag className="w-4 h-4" />
                  <span>Flag</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
