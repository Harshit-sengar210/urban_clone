"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, HelpCircle } from "lucide-react";
import { FAQ, FAQCategory } from "@/data/support";
import { cn } from "@/lib/utils";

const CATEGORIES: { id: FAQCategory | "all"; label: string }[] = [
  { id: "all", label: "All Topics" },
  { id: "bookings", label: "Bookings" },
  { id: "payments", label: "Payments" },
  { id: "refunds", label: "Refunds" },
  { id: "services", label: "Services" },
  { id: "offers", label: "Offers" },
  { id: "account", label: "Account" },
];

interface FAQSectionProps {
  faqs: FAQ[];
  initialCategory?: FAQCategory | "all";
}

export function FAQSection({ faqs, initialCategory = "all" }: FAQSectionProps) {
  const [activeCategory, setActiveCategory] = useState<FAQCategory | "all">(initialCategory);
  const [openId, setOpenId] = useState<string | null>(null);

  const filteredFaqs = activeCategory === "all" ? faqs : faqs.filter(f => f.category === activeCategory);

  return (
    <div className="mb-12">
      <h2 className="text-lg font-bold text-[var(--color-foreground)] mb-5">Frequently Asked Questions</h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-56 flex-shrink-0 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0 hide-scrollbar">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => { setActiveCategory(c.id); setOpenId(null); }}
              className={cn(
                "flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap md:whitespace-normal text-left",
                activeCategory === c.id
                  ? "bg-[var(--color-primary)] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              {c.label}
              {activeCategory === c.id && <ChevronRight className="hidden md:block w-4 h-4" />}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="flex-1 space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="py-10 text-center text-slate-500 text-sm">No FAQs found for this category.</div>
          ) : (
            filteredFaqs.map(faq => (
              <div key={faq.id} className="border border-[var(--color-border)] rounded-2xl bg-white overflow-hidden transition-colors hover:border-slate-300">
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  aria-expanded={openId === faq.id}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className={cn("w-5 h-5 flex-shrink-0 mt-0.5 transition-colors", openId === faq.id ? "text-[var(--color-primary)]" : "text-slate-400")} />
                    <span className="text-sm font-bold text-[var(--color-foreground)]">{faq.question}</span>
                  </div>
                  <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-300 ml-4 flex-shrink-0", openId === faq.id && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 pl-13">
                        <p className="text-sm text-[var(--color-muted)] leading-relaxed pl-8">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
