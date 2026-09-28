"use client";

import { motion } from "framer-motion";
import { ArrowRight, XCircle, CheckCircle2 } from "lucide-react";

export function ExperienceComparison() {
  const traditionalSteps = ["Search", "Call", "Wait", "Coordinate", "Pay", "Follow up"];
  const urbanCloneSteps = ["Choose", "Book", "Track", "Complete"];

  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Your Service Experience, Simplified
          </h2>
          <p className="text-lg text-slate-400">
            We've removed the friction from getting things done around the house.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* Traditional Process */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-10"
          >
            <div className="flex items-center gap-2 mb-8">
              <XCircle className="w-5 h-5 text-red-400" />
              <h3 className="text-xl font-bold text-slate-300">Without UrbanClone</h3>
            </div>

            <div className="flex flex-col gap-3">
              {traditionalSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="px-4 py-3 rounded-xl bg-white/5 text-slate-400 font-medium text-sm text-center border border-white/5">
                    {step}
                  </div>
                  {idx < traditionalSteps.length - 1 && (
                    <div className="flex justify-center py-2">
                      <ArrowRight className="w-4 h-4 text-slate-600 rotate-90 lg:rotate-0 lg:hidden" />
                      <div className="hidden lg:block w-0.5 h-4 bg-slate-700/50" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* UrbanClone Process */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[var(--color-primary)] to-indigo-900 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full" />
            
            <div className="flex items-center gap-2 mb-8 relative z-10">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <h3 className="text-xl font-bold text-white">With UrbanClone</h3>
            </div>

            <div className="flex flex-col gap-6 relative z-10 h-full justify-center pb-8">
              {urbanCloneSteps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (idx * 0.15) }}
                  className="flex flex-col"
                >
                  <div className="px-5 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-white font-bold text-lg text-center border border-white/20 shadow-xl flex items-center justify-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/20 text-xs flex items-center justify-center">{idx + 1}</span>
                    {step}
                  </div>
                  {idx < urbanCloneSteps.length - 1 && (
                    <div className="flex justify-center py-2">
                      <div className="w-0.5 h-6 bg-white/20" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
