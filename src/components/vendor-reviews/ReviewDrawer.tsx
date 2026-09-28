"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, MessageSquare, CheckCircle2, Edit2, Send } from "lucide-react";
import { VendorReview, VendorReviewReply } from "@/types/vendor";
import { cn } from "@/lib/utils";

interface ReviewDrawerProps {
  review: VendorReview | null;
  onClose: () => void;
  onReplySubmit: (reviewId: string, text: string) => void;
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} className={cn("w-5 h-5", s <= rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200")} />
      ))}
      <span className="ml-1 text-sm font-bold text-slate-600">{rating} out of 5</span>
    </div>
  );
}

export function ReviewDrawer({ review, onClose, onReplySubmit }: ReviewDrawerProps) {
  const [replyText, setReplyText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const MAX_CHARS = 500;

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setReplyText("");
      setIsEditing(false);
      setSubmitted(false);
    }, 300);
  };

  const handleSubmit = () => {
    if (!review || replyText.trim().length < 5) return;
    setIsSubmitting(true);
    setTimeout(() => {
      onReplySubmit(review.id, replyText.trim());
      setIsSubmitting(false);
      setSubmitted(true);
      setIsEditing(false);
      setTimeout(() => setSubmitted(false), 3000);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {review && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            role="dialog"
            aria-modal
            aria-label="Review details"
            className="relative w-full md:max-w-lg bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h2 className="font-bold text-slate-900">Review Details</h2>
              <button
                onClick={handleClose}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors"
                aria-label="Close review details"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {/* Customer + Rating */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black shrink-0"
                  style={{ backgroundColor: review.customerAvatarColor }}
                  aria-hidden
                >
                  {review.customerDisplayName.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-slate-900 mb-1">{review.customerDisplayName}</div>
                  <StarRow rating={review.rating} />
                  <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
                    <span className="font-medium">{review.serviceName}</span>
                    <span>&middot;</span>
                    <span>{new Date(review.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</span>
                  </div>
                </div>
              </motion.div>

              {/* Review text */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <p className="text-slate-700 leading-relaxed">{review.reviewText}</p>
              </motion.div>

              {/* Your reply */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                {review.reply && !isEditing ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <h3 className="font-bold text-slate-900 text-sm">Your Reply</h3>
                        {review.reply.updatedAt && (
                          <span className="text-[10px] text-slate-400">Edited</span>
                        )}
                      </div>
                      <button
                        onClick={() => { setReplyText(review.reply!.text); setIsEditing(true); }}
                        className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Edit Reply
                      </button>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                      <p className="text-slate-700 text-sm leading-relaxed">{review.reply.text}</p>
                      <p className="text-xs text-slate-400 mt-2">
                        Replied {new Date(review.reply.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-indigo-500" />
                      <h3 className="font-bold text-slate-900 text-sm">
                        {isEditing ? "Edit Your Reply" : "Reply to this Review"}
                      </h3>
                    </div>

                    <textarea
                      value={replyText}
                      onChange={e => setReplyText(e.target.value.slice(0, MAX_CHARS))}
                      placeholder="Thank you for taking the time to share your feedback..."
                      className="w-full h-32 px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-900 resize-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 outline-none transition placeholder:text-slate-400"
                      aria-label="Your reply text"
                    />

                    <div className="flex items-center justify-between">
                      <span className={cn("text-xs font-medium", replyText.length > MAX_CHARS * 0.9 ? "text-amber-500" : "text-slate-400")}>
                        {replyText.length}/{MAX_CHARS}
                      </span>
                      <div className="flex gap-2">
                        {isEditing && (
                          <button onClick={() => { setIsEditing(false); setReplyText(""); }} className="px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                            Cancel
                          </button>
                        )}
                        <button
                          onClick={handleSubmit}
                          disabled={replyText.trim().length < 5 || isSubmitting}
                          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px] justify-center"
                        >
                          {isSubmitting ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                          ) : submitted ? (
                            <><CheckCircle2 className="w-4 h-4" /> Saved!</>
                          ) : (
                            <><Send className="w-4 h-4" /> {isEditing ? "Save Reply" : "Post Reply"}</>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
