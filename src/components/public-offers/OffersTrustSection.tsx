"use client";

import { ShieldCheck, Check } from "lucide-react";
import { motion } from "framer-motion";

export function OffersTrustSection() {
  return (
    <section className="py-16 bg-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-50 -z-10 translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[var(--color-primary)] rounded-full blur-[80px] opacity-20" />
          
          <div className="md:w-1/2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest mb-6">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              Transparent Savings
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
              No surprises <br />at checkout.
            </h2>
            <p className="text-slate-400 text-lg font-medium">
              See the applicable discount and offer conditions before confirming your booking.
            </p>
          </div>
          
          <div className="md:w-1/2 relative z-10 flex flex-col gap-5 w-full">
            {[
              "Clear pricing on all services",
              "No hidden coupon conditions",
              "Secure and safe checkout"
            ].map((point, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm"
              >
                <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 font-bold" />
                </div>
                <span className="text-white font-medium">{point}</span>
              </motion.div>
            ))}
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}
