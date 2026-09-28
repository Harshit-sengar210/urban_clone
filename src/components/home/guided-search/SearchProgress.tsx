"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchProgressProps {
  step: "location" | "service" | "results";
}

export function SearchProgress({ step }: SearchProgressProps) {
  const steps = [
    { id: "location", label: "Location" },
    { id: "service", label: "Service" },
    { id: "results", label: "Results" }
  ];

  const getStepIndex = (s: string) => steps.findIndex(x => x.id === s);
  const currentIndex = getStepIndex(step);

  return (
    <div className="flex items-center gap-2 mb-6 ml-2">
      {steps.map((s, idx) => {
        const isCompleted = idx < currentIndex;
        const isCurrent = idx === currentIndex;
        
        return (
          <div key={s.id} className="flex items-center">
            <div className="flex items-center gap-1.5">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isCompleted ? "var(--color-primary)" : isCurrent ? "var(--color-primary)" : "transparent",
                  borderColor: isCompleted || isCurrent ? "var(--color-primary)" : "rgba(148, 163, 184, 0.5)",
                  scale: isCurrent ? 1.1 : 1
                }}
                className={cn(
                  "w-3.5 h-3.5 rounded-full border-[1.5px] flex items-center justify-center transition-colors"
                )}
              >
                {isCompleted && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Check className="w-2 h-2 text-white" strokeWidth={3} />
                  </motion.div>
                )}
                {isCurrent && (
                  <motion.div 
                    layoutId="active-step-dot"
                    className="w-1.5 h-1.5 rounded-full bg-white" 
                  />
                )}
              </motion.div>
              <span 
                className={cn(
                  "text-[10px] font-bold tracking-widest uppercase transition-colors",
                  isCompleted ? "text-slate-600" : isCurrent ? "text-slate-900" : "text-slate-400"
                )}
              >
                {s.label}
              </span>
            </div>
            
            {idx < steps.length - 1 && (
              <div className="w-8 h-[1px] bg-slate-200 mx-2 relative overflow-hidden">
                {isCompleted && (
                  <motion.div 
                    layoutId={`progress-line-${idx}`}
                    className="absolute inset-0 bg-[var(--color-primary)]"
                    initial={{ scaleX: 0, transformOrigin: "left" }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
