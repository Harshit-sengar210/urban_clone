"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { chipEnter } from "./animations";

interface StrengthSelectorProps {
  selectedStrengths: string[];
  onChange: (strengths: string[]) => void;
}

const AVAILABLE_STRENGTHS = [
  "Reliable",
  "Fast Response",
  "Attention to Detail",
  "Clean Work",
  "Professional Behavior",
  "On-Time Service",
  "Quality Work",
  "Customer Friendly"
];

export function StrengthSelector({ selectedStrengths, onChange }: StrengthSelectorProps) {
  const toggleStrength = (strength: string) => {
    if (selectedStrengths.includes(strength)) {
      onChange(selectedStrengths.filter(s => s !== strength));
    } else {
      onChange([...selectedStrengths, strength]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <AnimatePresence>
        {AVAILABLE_STRENGTHS.map(strength => {
          const isSelected = selectedStrengths.includes(strength);
          
          return (
            <motion.button
              key={strength}
              layout="position"
              variants={chipEnter}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => toggleStrength(strength)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-full transition-all border",
                isSelected
                  ? "bg-purple-100 text-purple-700 border-purple-200 shadow-sm shadow-purple-200/50"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
              )}
            >
              {isSelected ? (
                <Check className="w-3.5 h-3.5 text-purple-600" />
              ) : (
                <Plus className="w-3.5 h-3.5 text-slate-400" />
              )}
              {strength}
            </motion.button>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
