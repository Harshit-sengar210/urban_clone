"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface SupportFAQProps {
  items: FAQItem[];
}

export function SupportFAQ({ items }: SupportFAQProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
        <h2 className="font-bold text-slate-900 text-xl">Frequently Asked Questions</h2>
        <p className="text-sm text-slate-500 mt-1">Quick answers to the most common questions.</p>
      </div>
      <div className="divide-y divide-slate-50">
        {items.map((item, i) => {
          const isOpen = openId === item.id;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="w-full flex items-center justify-between px-6 md:px-8 py-5 hover:bg-slate-50 transition-colors text-left gap-4"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
              >
                <span className={cn("font-bold text-sm leading-snug transition-colors", isOpen ? "text-indigo-700" : "text-slate-900")}>
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <ChevronDown className={cn("w-5 h-5 transition-colors", isOpen ? "text-indigo-500" : "text-slate-400")} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${item.id}`}
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-5">
                      <div className="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100/50">
                        <p className="text-sm text-slate-700 leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
