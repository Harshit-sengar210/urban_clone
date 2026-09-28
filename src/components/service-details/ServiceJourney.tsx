"use client";

import { motion } from "framer-motion";
import { CalendarCheck, UserCheck, Truck, Sparkles, CheckCircle2 } from "lucide-react";

export function ServiceJourney() {
  const steps = [
    { id: 1, title: "Book", desc: "Select time", icon: CalendarCheck },
    { id: 2, title: "Assigned", desc: "Pro verified", icon: UserCheck },
    { id: 3, title: "Arrives", desc: "On time", icon: Truck },
    { id: 4, title: "Service", desc: "In progress", icon: Sparkles },
    { id: 5, title: "Done", desc: "Completed", icon: CheckCircle2 },
  ];

  return (
    <div className="mt-20 mb-16 bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="mb-12 text-center md:text-left"
      >
        <h2 className="text-2xl lg:text-3xl font-bold text-[#0A192F] mb-2">Your service journey</h2>
        <p className="text-slate-500 font-medium">What happens after you book.</p>
      </motion.div>
      
      {/* Desktop Horizontal */}
      <div className="hidden md:flex relative justify-between items-start">
        <div className="absolute top-6 left-0 right-0 h-1 bg-slate-200 rounded-full" />
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-6 left-0 right-0 h-1 bg-[var(--color-primary)] rounded-full origin-left"
        />
        
        {steps.map((step, idx) => (
          <motion.div 
            key={step.id} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.3 }}
            className="relative z-10 flex flex-col items-center gap-4 text-center w-24"
          >
            <div className="w-12 h-12 rounded-full bg-white border-4 border-[var(--color-primary)] flex items-center justify-center text-[var(--color-primary)] shadow-md">
              <step.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-[#0A192F] text-sm mb-0.5">{step.title}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest">{step.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Vertical */}
      <div className="md:hidden relative flex flex-col gap-8">
        <div className="absolute top-0 bottom-0 left-6 w-1 bg-slate-200 rounded-full" />
        <motion.div 
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 bottom-0 left-6 w-1 bg-[var(--color-primary)] rounded-full origin-top"
        />
        
        {steps.map((step, idx) => (
          <motion.div 
            key={step.id} 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.3 }}
            className="relative z-10 flex items-center gap-6"
          >
            <div className="w-12 h-12 rounded-full bg-white border-4 border-[var(--color-primary)] flex items-center justify-center text-[var(--color-primary)] shadow-md shrink-0">
              <step.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-[#0A192F]">{step.title}</div>
              <div className="text-xs text-slate-500">{step.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
