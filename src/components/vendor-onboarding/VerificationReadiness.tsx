"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerificationReadinessProps {
  percentage: number;
  isReady: boolean;
}

export function VerificationReadiness({ percentage, isReady }: VerificationReadinessProps) {
  return (
    <div className={cn(
      "w-full rounded-3xl p-6 transition-all duration-500 border relative overflow-hidden",
      isReady 
        ? "bg-green-50/50 border-green-200 shadow-lg shadow-green-100/50" 
        : "bg-slate-50 border-slate-200"
    )}>
      <div className="flex items-center gap-4 relative z-10">
        <motion.div 
          layout
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-500",
            isReady ? "bg-green-500 text-white shadow-sm" : "bg-slate-200 text-slate-500"
          )}
        >
          <AnimatePresence mode="wait">
            {isReady ? (
              <motion.div key="ready" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <ShieldCheck className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div key="not-ready" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <ShieldAlert className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="flex-1">
          <h4 className={cn(
            "text-sm font-extrabold mb-1 transition-colors duration-500",
            isReady ? "text-green-800" : "text-slate-800"
          )}>
            {isReady ? "READY FOR REVIEW" : "NOT READY"}
          </h4>
          <p className={cn(
            "text-xs font-medium transition-colors duration-500",
            isReady ? "text-green-700/80" : "text-slate-500"
          )}>
            {isReady 
              ? "Your required identity information is ready to be submitted for verification review." 
              : "Complete the required information and upload all required documents."}
          </p>
        </div>
      </div>

      <div className="mt-5 relative z-10">
        <div className="flex justify-between items-end mb-2">
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-wider",
            isReady ? "text-green-700" : "text-slate-400"
          )}>
            Setup completion
          </span>
          <span className={cn(
            "text-sm font-extrabold",
            isReady ? "text-green-700" : "text-[var(--color-primary)]"
          )}>
            {Math.round(percentage)}%
          </span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            className={cn(
              "h-full rounded-full transition-colors duration-500",
              isReady ? "bg-green-500" : "bg-[var(--color-primary)]"
            )}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
          />
        </div>
      </div>
      
      {/* Background decoration when ready */}
      <AnimatePresence>
        {isReady && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-24 -right-24 w-48 h-48 bg-green-200/40 rounded-full blur-3xl pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
