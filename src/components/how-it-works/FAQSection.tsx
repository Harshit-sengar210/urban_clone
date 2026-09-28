"use client";

import { useState } from "react";
import { HOW_IT_WORKS_FAQS } from "@/data/howItWorks";
import { FadeUp } from "@/components/animations/FadeUp";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <SectionHeading 
          title="Questions, Answered."
          subtitle="Everything you need to know about booking with UrbanClone."
          centered
          className="mb-16"
        />

        <div className="space-y-4">
          {HOW_IT_WORKS_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <FadeUp key={index} delay={index * 0.1}>
                <div className={cn(
                  "border rounded-2xl overflow-hidden transition-colors duration-300",
                  isOpen ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5" : "border-slate-200 bg-white hover:border-slate-300"
                )}>
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    <span className={cn(
                      "font-bold text-lg pr-4 transition-colors",
                      isOpen ? "text-[var(--color-primary)]" : "text-slate-900"
                    )}>
                      {faq.question}
                    </span>
                    <ChevronDown 
                      className={cn(
                        "w-5 h-5 shrink-0 transition-transform duration-300",
                        isOpen ? "rotate-180 text-[var(--color-primary)]" : "text-slate-400"
                      )} 
                    />
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        role="region"
                        aria-labelledby={`faq-question-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
