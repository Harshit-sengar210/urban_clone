"use client";

import { motion } from "framer-motion";

interface ServiceProcessProps {
  process: {
    step: string;
    title: string;
    description: string;
  }[];
}

export function ServiceProcess({ process }: ServiceProcessProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-8 text-[var(--color-foreground)]">How the service works</h2>
      
      <div className="relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute left-[27px] top-6 bottom-6 w-0.5 bg-[var(--color-border)]" />
        
        <div className="space-y-8">
          {process.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex gap-6 relative"
            >
              <div className="w-14 h-14 shrink-0 rounded-full bg-[var(--color-surface)] border-2 border-[var(--color-border)] flex items-center justify-center font-bold text-xl text-[var(--color-primary)] z-10 shadow-sm relative">
                {step.step}
                {/* Connecting Line (Mobile) */}
                {idx !== process.length - 1 && (
                  <div className="md:hidden absolute top-[54px] bottom-[-32px] w-0.5 bg-[var(--color-border)] left-1/2 -translate-x-1/2" />
                )}
              </div>
              
              <div className="pt-3">
                <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-2">{step.title}</h3>
                <p className="text-[var(--color-muted)] leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
