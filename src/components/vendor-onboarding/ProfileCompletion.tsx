"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ProfileCompletionProps {
  percentage: number;
}

export function ProfileCompletion({ percentage }: ProfileCompletionProps) {
  // Animate the displayed number smoothly
  const [displayPercentage, setDisplayPercentage] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = displayPercentage;
    const duration = 500; // ms

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOut function
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setDisplayPercentage(Math.round(startValue + (percentage - startValue) * easeProgress));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentage]);

  return (
    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
      <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          {/* Background Circle */}
          <path
            className="text-slate-200"
            strokeDasharray="100, 100"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          {/* Progress Circle */}
          <motion.path
            className="text-[var(--color-primary)]"
            strokeDasharray={`${percentage}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            initial={{ strokeDasharray: "0, 100" }}
            animate={{ strokeDasharray: `${percentage}, 100` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-bold text-slate-700">{displayPercentage}%</span>
        </div>
      </div>
      <div>
        <h4 className="font-bold text-sm text-[var(--color-foreground)]">Profile Setup</h4>
        <p className="text-xs font-medium text-slate-500">Complete required fields to continue</p>
      </div>
    </div>
  );
}
