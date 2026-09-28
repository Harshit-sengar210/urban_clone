"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfessionalDescriptionProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProfessionalDescription({ value, onChange }: ProfessionalDescriptionProps) {
  const MAX_CHARS = 500;
  const currentChars = value.length;
  const isNearLimit = currentChars >= MAX_CHARS * 0.9;
  const isAtLimit = currentChars >= MAX_CHARS;

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARS) {
              onChange(e.target.value);
            }
          }}
          placeholder="Tell customers about your experience, the services you provide, and what makes your work reliable."
          className="w-full min-h-[140px] p-4 rounded-xl border border-slate-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-primary/10 transition-all duration-300 outline-none resize-none text-sm font-medium text-slate-800 placeholder:text-slate-400 placeholder:font-normal leading-relaxed"
        />
        
        {/* Animated Counter */}
        <div className="absolute bottom-3 right-4 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-md">
          <motion.span 
            key={currentChars}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "text-xs font-bold transition-colors duration-300",
              isAtLimit ? "text-red-500" : isNearLimit ? "text-amber-500" : "text-slate-500"
            )}
          >
            {currentChars}
          </motion.span>
          <span className="text-xs font-semibold text-slate-300">/ {MAX_CHARS}</span>
        </div>
      </div>

      {/* Helper Tip */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50/50 border border-blue-100/50 rounded-xl p-4 flex gap-3"
      >
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
          <Lightbulb className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-blue-900 uppercase tracking-widest mb-1">Tip</h4>
          <p className="text-xs font-medium text-blue-800/70 leading-relaxed">
            Keep your description clear and customer-friendly. Mention your experience, service strengths, and the type of work you specialize in.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
