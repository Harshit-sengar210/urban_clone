"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Tag, ThumbsUp, ThumbsDown, CheckCircle2, ChevronRight } from "lucide-react";
import { SupportArticle, SupportCategory } from "@/types/vendor";
import { useState } from "react";
import { cn } from "@/lib/utils";

const CATEGORY_LABELS: Record<SupportCategory, string> = {
  booking: "Bookings", earnings: "Earnings & Payouts", services: "Services",
  verification: "Profile & Verification", account: "Account & Security",
  technical: "Technical Issues", other: "Other"
};

interface ArticleDrawerProps {
  article: SupportArticle | null;
  relatedArticles: SupportArticle[];
  onClose: () => void;
  onOpenArticle: (article: SupportArticle) => void;
}

export function ArticleDrawer({ article, relatedArticles, onClose, onOpenArticle }: ArticleDrawerProps) {
  const [feedback, setFeedback] = useState<"helpful" | "not_helpful" | null>(null);
  const [notHelpfulNote, setNotHelpfulNote] = useState("");
  const [noteSubmitted, setNoteSubmitted] = useState(false);

  const handleFeedback = (type: "helpful" | "not_helpful") => {
    setFeedback(type);
    if (type === "helpful") setNoteSubmitted(true);
  };

  const handleNoteSubmit = () => setNoteSubmitted(true);

  return (
    <AnimatePresence>
      {article && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            role="dialog"
            aria-modal
            aria-label={article.title}
            className="relative w-full md:max-w-2xl bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full">
                  {CATEGORY_LABELS[article.category]}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readingTimeMinutes} min read
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors"
                aria-label="Close article"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-extrabold text-slate-900 leading-tight"
              >
                {article.title}
              </motion.h1>

              <div className="space-y-4">
                {article.content.map((para, i) => {
                  const isStep = /^\d+\./.test(para);
                  const isNote = para.toLowerCase().startsWith("note") || para.toLowerCase().startsWith("tip") || para.toLowerCase().startsWith("important");
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      {isNote ? (
                        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                          <span className="text-amber-500 text-sm">⚠️</span>
                          <p className="text-sm text-amber-800 font-medium leading-relaxed">{para}</p>
                        </div>
                      ) : isStep ? (
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                            {para.match(/^\d+/)?.[0]}
                          </div>
                          <p className="text-slate-700 leading-relaxed">{para.replace(/^\d+\.\s*/, "")}</p>
                        </div>
                      ) : (
                        <p className="text-slate-700 leading-relaxed">{para}</p>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Feedback */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="border-t border-slate-100 pt-6"
              >
                <h3 className="font-bold text-slate-900 mb-3">Was this article helpful?</h3>
                {!noteSubmitted ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleFeedback("helpful")}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold transition-all",
                          feedback === "helpful" ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-white border-slate-200 text-slate-600 hover:bg-emerald-50"
                        )}
                      >
                        <ThumbsUp className="w-4 h-4" /> Yes, helpful
                      </button>
                      <button
                        onClick={() => handleFeedback("not_helpful")}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold transition-all",
                          feedback === "not_helpful" ? "bg-red-50 border-red-200 text-red-700" : "bg-white border-slate-200 text-slate-600 hover:bg-red-50"
                        )}
                      >
                        <ThumbsDown className="w-4 h-4" /> No
                      </button>
                    </div>
                    <AnimatePresence>
                      {feedback === "not_helpful" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2 overflow-hidden"
                        >
                          <textarea
                            value={notHelpfulNote}
                            onChange={e => setNotHelpfulNote(e.target.value)}
                            placeholder="Tell us what was missing or unclear..."
                            className="w-full h-24 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm resize-none focus:ring-2 focus:ring-indigo-500/30 outline-none"
                          />
                          <button
                            onClick={handleNoteSubmit}
                            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors"
                          >
                            Submit Feedback
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-100"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm font-bold">Thank you for your feedback.</span>
                  </motion.div>
                )}
              </motion.div>

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="border-t border-slate-100 pt-6"
                >
                  <h3 className="font-bold text-slate-900 mb-3">Related Articles</h3>
                  <div className="space-y-2">
                    {relatedArticles.map(rel => (
                      <button
                        key={rel.id}
                        onClick={() => onOpenArticle(rel)}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all text-left group"
                      >
                        <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">{rel.title}</span>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors shrink-0" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
