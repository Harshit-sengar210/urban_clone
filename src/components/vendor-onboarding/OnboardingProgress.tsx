"use client";

import { motion } from "framer-motion";

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  label: string;
}

export function OnboardingProgress({ currentStep, totalSteps, label }: OnboardingProgressProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-8"
    >
      <div className="flex justify-between items-end mb-2">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
            Step {currentStep} of {totalSteps}
          </p>
          <h2 className="text-sm font-bold text-[var(--color-primary)]">
            {label}
          </h2>
        </div>
      </div>
      
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-[var(--color-primary)] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}
