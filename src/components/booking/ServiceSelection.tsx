"use client";

import { PricingVariant } from "@/data/services";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ServiceSelectionProps {
  variants: PricingVariant[];
  selectedVariantId: string;
  onSelect: (id: string) => void;
}

export function ServiceSelection({ variants, selectedVariantId, onSelect }: ServiceSelectionProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">Choose your service</h2>
      
      {variants.map((variant) => {
        const isSelected = selectedVariantId === variant.id;
        
        return (
          <button
            key={variant.id}
            onClick={() => onSelect(variant.id)}
            className={cn(
              "w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-200 text-left",
              isSelected 
                ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-md shadow-primary/5" 
                : "border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-surface-hover)]"
            )}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                isSelected ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white" : "border-[var(--color-muted)] bg-transparent"
              )}>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </div>
              
              <div>
                <h3 className={cn(
                  "font-bold text-lg mb-1",
                  isSelected ? "text-[var(--color-primary)]" : "text-[var(--color-foreground)]"
                )}>
                  {variant.name}
                </h3>
                <div className="text-sm text-[var(--color-muted)] font-medium">
                  {variant.type === "starting" ? "Inspection from " : ""}₹{variant.price} · {variant.duration}
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </motion.div>
  );
}
