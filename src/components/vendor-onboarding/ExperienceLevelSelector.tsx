"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type ExperienceLevel = "less_than_1" | "1_2" | "3_5" | "5_10" | "10_plus";

interface ExperienceLevelSelectorProps {
  value: ExperienceLevel | "";
  onChange: (level: ExperienceLevel) => void;
  error?: boolean;
}

const levels: { id: ExperienceLevel; label: string; desc: string }[] = [
  { id: "less_than_1", label: "Less than 1 year", desc: "Just starting out" },
  { id: "1_2", label: "1–2 years", desc: "Building experience" },
  { id: "3_5", label: "3–5 years", desc: "Experienced professional" },
  { id: "5_10", label: "5–10 years", desc: "Highly experienced" },
  { id: "10_plus", label: "10+ years", desc: "Industry expert" },
];

export function ExperienceLevelSelector({ value, onChange, error }: ExperienceLevelSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {levels.map((level) => {
        const isSelected = value === level.id;
        
        return (
          <motion.button
            key={level.id}
            type="button"
            onClick={() => onChange(level.id)}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "relative w-full p-4 rounded-2xl border-2 text-left transition-all duration-300 outline-none overflow-hidden group",
              error && !value
                ? "border-red-300 bg-red-50 hover:border-red-400"
                : isSelected
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-sm shadow-primary/10"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
            )}
          >
            <div className="flex flex-col gap-1 pr-6">
              <h4 className={cn(
                "font-extrabold text-sm transition-colors duration-300",
                isSelected ? "text-[var(--color-primary)]" : "text-slate-800"
              )}>
                {level.label}
              </h4>
              <p className="text-xs font-medium text-slate-500">
                {level.desc}
              </p>
            </div>

            {/* Check Indicator */}
            <div className={cn(
              "absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300",
              isSelected 
                ? "border-[var(--color-primary)] bg-[var(--color-primary)]" 
                : "border-slate-300 bg-white group-hover:border-[var(--color-primary)]/50"
            )}>
              <motion.div
                initial={false}
                animate={{ scale: isSelected ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </motion.div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
