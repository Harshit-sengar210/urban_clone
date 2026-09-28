"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "How do I apply a coupon?",
    answer: "You can apply a coupon code during the checkout process. Before completing your payment, enter the code in the 'Apply Coupon' field and click apply. The discount will be instantly reflected in your total."
  },
  {
    question: "Can I use more than one coupon?",
    answer: "No, currently our system only allows one coupon or promotional code per booking. We recommend using the code that gives you the highest savings."
  },
  {
    question: "Where can I find my saved offers?",
    answer: "You can view all your saved offers by navigating to your Dashboard and clicking on the 'Offers' tab. Alternatively, you can filter by 'Saved' on this page."
  },
  {
    question: "Why isn't my coupon working?",
    answer: "A coupon might not work if it has expired, if your booking doesn't meet the minimum value requirement, or if the code is only valid for specific categories or first-time users. Check the offer details for specific terms."
  },
  {
    question: "Can I use an offer on every service?",
    answer: "Some offers are sitewide and apply to all services, while others are category-specific (e.g., only for Cleaning or Beauty). Check the offer's applicable services in the details section."
  },
  {
    question: "Where can I see the discount before payment?",
    answer: "The discount will be clearly displayed in your checkout summary before you are asked to complete the payment. You'll see the original price, the applied discount, and the final total."
  }
];

export function OffersFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-[var(--color-background)]">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-foreground)] tracking-tight mb-4">
            Offers & Coupons — FAQs
          </h2>
          <p className="text-[var(--color-muted)] text-lg">
            Have questions about how our discounts work?
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
                  isOpen ? "border-[var(--color-primary)]/30 bg-white shadow-sm" : "border-slate-200 bg-white hover:border-slate-300"
                )}
              >
                <button
                  onClick={() => toggleOpen(idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="font-bold text-[var(--color-foreground)] pr-4">{faq.question}</span>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors",
                    isOpen ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "bg-slate-50 text-slate-400"
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
