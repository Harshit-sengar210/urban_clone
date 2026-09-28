"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCategoryIcon } from "@/data/mockVendorServices";

interface ServiceCategoryCardProps {
  name: string;
  description: string;
  iconName: string;
  selected: boolean;
  onClick: () => void;
}

export function ServiceCategoryCard({ name, description, iconName, selected, onClick }: ServiceCategoryCardProps) {
  const Icon = getCategoryIcon(iconName);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative w-full p-4 rounded-2xl border-2 text-left transition-all duration-300 outline-none flex items-start gap-4 overflow-hidden",
        selected 
          ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-md shadow-primary/10" 
          : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50 hover:shadow-sm"
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300",
        selected ? "bg-[var(--color-primary)] text-white" : "bg-slate-100 text-slate-500"
      )}>
        <Icon className="w-6 h-6" />
      </div>

      <div className="flex-1 min-w-0 pr-6">
        <h4 className={cn(
          "font-bold text-sm mb-1 truncate transition-colors duration-300",
          selected ? "text-[var(--color-primary)]" : "text-slate-800"
        )}>
          {name}
        </h4>
        <p className="text-xs font-medium text-slate-500 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Selected Check Indicator */}
      <div className={cn(
        "absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-300",
        selected ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-slate-300 opacity-0 group-hover:opacity-100"
      )}>
        <motion.div
          initial={false}
          animate={{ scale: selected ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Check className="w-3 h-3 text-white" strokeWidth={3} />
        </motion.div>
      </div>
    </motion.button>
  );
}
