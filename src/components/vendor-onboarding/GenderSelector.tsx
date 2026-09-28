"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Gender = "male" | "female" | "other" | "prefer_not_to_say" | "";

interface GenderSelectorProps {
  value: Gender;
  onChange: (value: Gender) => void;
  error?: string;
}

const OPTIONS: { id: Gender; label: string }[] = [
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
  { id: "other", label: "Other" },
  { id: "prefer_not_to_say", label: "Prefer not to say" },
];

export function GenderSelector({ value, onChange, error }: GenderSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-[var(--color-foreground)]">
        Gender
      </label>
      
      <div className="grid grid-cols-2 gap-3">
        {OPTIONS.map((option) => {
          const isSelected = value === option.id;
          
          return (
            <motion.button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative h-14 rounded-xl border flex items-center px-4 transition-all duration-200 outline-none",
                isSelected 
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-sm shadow-primary/10 ring-1 ring-[var(--color-primary)]" 
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
                error && !value && "border-red-400"
              )}
            >
              <div className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-colors",
                isSelected ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-slate-300"
              )}>
                <motion.div
                  initial={false}
                  animate={{ scale: isSelected ? 1 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </motion.div>
              </div>
              <span className={cn(
                "text-sm font-semibold transition-colors",
                isSelected ? "text-[var(--color-primary)]" : "text-slate-700"
              )}>
                {option.label}
              </span>
            </motion.button>
          );
        })}
      </div>
      
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -4 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-xs font-bold text-red-500 mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
