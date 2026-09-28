"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Sparkles } from "lucide-react";

interface IncludedServicesProps {
  included: string[];
  notIncluded?: string[];
}

export function IncludedServices({ included, notIncluded }: IncludedServicesProps) {
  return (
    <div className="mt-16 mb-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="mb-8"
      >
        <h2 className="text-2xl lg:text-3xl font-bold text-[#0A192F] mb-2">What's included</h2>
        <p className="text-slate-500 font-medium">Everything you get with this service.</p>
      </motion.div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8">
        {included.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -4, backgroundColor: "var(--color-primary-light, #EEF2FF)" }}
            className="group p-4 md:p-5 rounded-2xl border border-slate-100 bg-white shadow-sm transition-colors cursor-default"
          >
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center mb-3 group-hover:bg-white group-hover:shadow-sm transition-colors"
            >
              <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
            </motion.div>
            <h3 className="font-bold text-sm md:text-base text-[#0A192F] mb-1">{item}</h3>
            <p className="text-xs text-slate-500">Premium quality guaranteed</p>
          </motion.div>
        ))}
      </div>

      {notIncluded && notIncluded.length > 0 && (
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
            <XCircle className="w-4 h-4 text-slate-400" />
            Not Included
          </h3>
          <div className="flex flex-wrap gap-3">
            {notIncluded.map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
