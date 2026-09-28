"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "How are professionals selected?",
    answer: "Professionals go through a verification process that checks their identity and professional experience. We also continuously monitor performance based on real customer feedback to ensure high service standards are maintained."
  },
  {
    question: "How does pricing work?",
    answer: "We believe in transparent pricing. The estimated cost for your chosen service is displayed clearly before you confirm the booking. For some services, a final inspection might slightly adjust the cost, but you will always be informed beforehand."
  },
  {
    question: "Can I track my booking?",
    answer: "Yes, once a professional is assigned to your booking, you can track their status and ETA directly through your UrbanClone dashboard."
  },
  {
    question: "What payment methods can I use?",
    answer: "We support major credit and debit cards, UPI, and select digital wallets. All transactions are securely processed through our encrypted checkout system."
  },
  {
    question: "How can I get support?",
    answer: "You can reach our dedicated support team directly through the 'Support' section in your dashboard. We're here to help with any questions or issues regarding your booking."
  },
  {
    question: "What happens after my service is completed?",
    answer: "After your service is done, you will have the opportunity to review and rate the professional. Your feedback is crucial as it helps us maintain the quality of our service network."
  }
];

export function WhyUrbanCloneFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-foreground)] tracking-tight mb-4">
            Why UrbanClone — FAQs
          </h2>
          <p className="text-[var(--color-muted)] text-lg">
            Common questions about how our platform works.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            
            return (
              <div 
                key={idx}
                className={cn(
                  "border rounded-2xl overflow-hidden transition-colors duration-300",
                  isOpen ? "border-[var(--color-primary)]/30 bg-slate-50" : "border-slate-200 bg-white hover:border-slate-300"
                )}
              >
                <button
                  onClick={() => toggleOpen(idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="font-bold text-[var(--color-foreground)] text-lg pr-4">{faq.question}</span>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors",
                    isOpen ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "bg-slate-100 text-slate-400"
                  )}>
                    <ChevronDown className={cn("w-5 h-5 transition-transform duration-300", isOpen && "rotate-180")} />
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 text-slate-600 font-medium leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
