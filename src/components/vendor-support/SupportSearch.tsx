"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, X, FileText, BookOpen } from "lucide-react";
import { SupportArticle, SupportCategory } from "@/types/vendor";
import { cn } from "@/lib/utils";

interface SupportSearchProps {
  query: string;
  onChange: (q: string) => void;
  results: SupportArticle[];
  onOpenArticle: (article: SupportArticle) => void;
  onCreateTicket: () => void;
}

const CATEGORY_LABELS: Record<SupportCategory, string> = {
  booking: "Bookings", earnings: "Earnings", services: "Services",
  verification: "Verification", account: "Account", technical: "Technical", other: "Other"
};

function highlight(text: string, query: string) {
  if (!query.trim()) return text;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={i} className="bg-amber-100 text-amber-800 rounded px-0.5 not-italic">{part}</mark>
      : part
  );
}

export function SupportSearch({ query, onChange, results, onOpenArticle, onCreateTicket }: SupportSearchProps) {
  const hasQuery = query.trim().length > 0;

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="search"
          value={query}
          onChange={e => onChange(e.target.value)}
          placeholder="Search for help — e.g. 'How do payouts work?'"
          className="w-full pl-12 pr-12 py-4 rounded-2xl border border-slate-200 bg-white text-base font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 outline-none transition shadow-sm"
          aria-label="Search help articles"
        />
        {hasQuery && (
          <button
            onClick={() => onChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {hasQuery && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 overflow-hidden"
          >
            {results.length > 0 ? (
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                {results.map(article => (
                  <button
                    key={article.id}
                    onClick={() => onOpenArticle(article)}
                    className="w-full flex items-start gap-3 px-4 py-3.5 hover:bg-indigo-50 transition-colors text-left group"
                  >
                    <FileText className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 mt-0.5 shrink-0 transition-colors" />
                    <div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                        {highlight(article.title, query)}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                        <span>{CATEGORY_LABELS[article.category]}</span>
                        <span>&middot;</span>
                        <span>{article.readingTimeMinutes} min read</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                <p className="font-bold text-slate-700 mb-1">No help articles found</p>
                <p className="text-sm text-slate-400 mb-4">Try a different search term or create a support request.</p>
                <button
                  onClick={onCreateTicket}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-colors"
                >
                  Create Support Request
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
