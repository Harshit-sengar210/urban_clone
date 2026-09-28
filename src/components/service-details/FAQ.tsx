"use client";

import { useState } from "react";
import { FAQ as FAQType } from "@/data/services";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FAQProps {
  faqs: FAQType[];
}

export function FAQ({ faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="mt-20 mb-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="mb-8"
      >
        <h2 className="text-2xl lg:text-3xl font-bold text-[#0A192F] mb-2 flex items-center gap-3">
          Frequently asked questions
        </h2>
      </motion.div>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          
          return (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "border rounded-2xl overflow-hidden transition-all duration-300",
                isOpen ? "bg-[var(--color-primary-light, #EEF2FF)] border-[var(--color-primary)]/20 shadow-sm" : "bg-white border-slate-100 hover:border-slate-200"
              )}
            >
              <button 
                onClick={() => toggle(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="font-bold text-[#0A192F] pr-4">{faq.question}</span>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300",
                  isOpen ? "bg-white text-[var(--color-primary)] rotate-180 shadow-sm" : "bg-slate-50 text-slate-400"
                )}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed text-sm">
                      {faq.answer}
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
