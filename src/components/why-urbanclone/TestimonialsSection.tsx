"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { MOCK_TESTIMONIALS } from "@/lib/why-urbanclone/why-urbanclone.mock";

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-block text-[10px] font-black text-[var(--color-primary)] uppercase tracking-widest mb-4">
            CUSTOMER STORIES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-foreground)] tracking-tight mb-4">
            What Customers Say
          </h2>
          <p className="text-lg text-[var(--color-muted)]">
            Don't just take our word for it. Here is what people are saying about their UrbanClone experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {MOCK_TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative group transition-all duration-300 hover:shadow-xl hover:border-[var(--color-primary)]/20 flex flex-col h-full"
            >
              <div className="absolute top-8 right-8 text-slate-100 group-hover:text-indigo-50 transition-colors">
                <Quote className="w-12 h-12 rotate-180" />
              </div>
              
              <div className="flex items-center gap-1 mb-6 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < testimonial.rating ? "text-amber-500 fill-amber-500" : "text-slate-200 fill-slate-200"}`} 
                  />
                ))}
              </div>
              
              <p className="text-slate-700 font-medium leading-relaxed mb-8 relative z-10 flex-grow">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-lg uppercase">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-foreground)]">{testimonial.name}</h4>
                  <p className="text-xs font-medium text-slate-500">Verified Customer</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
