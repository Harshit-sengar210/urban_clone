"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const LABELS = ["", "Poor", "Below Average", "Good", "Very Good", "Excellent"];

interface StarRatingProps {
  value: number;
  max?: number;
  readonly?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  onChange?: (v: number) => void;
  showLabel?: boolean;
}

export function StarRating({ value, max = 5, readonly = false, size = "md", onChange, showLabel = false }: StarRatingProps) {
  const [hovered, setHovered] = useState(0);

  const px = { sm: 14, md: 20, lg: 28, xl: 40 }[size];
  const gap = { sm: "gap-0.5", md: "gap-1", lg: "gap-1.5", xl: "gap-2" }[size];

  const display = readonly ? value : (hovered || value);

  return (
    <div className="flex flex-col items-start gap-1">
      <div
        className={cn("flex", gap)}
        role={readonly ? undefined : "group"}
        aria-label={readonly ? `Rating: ${value} out of ${max}` : "Star rating"}
      >
        {Array.from({ length: max }, (_, i) => {
          const starVal = i + 1;
          const filled = starVal <= display;
          return (
            <motion.button
              key={i}
              type="button"
              disabled={readonly}
              onClick={() => !readonly && onChange?.(starVal)}
              onMouseEnter={() => !readonly && setHovered(starVal)}
              onMouseLeave={() => !readonly && setHovered(0)}
              whileTap={readonly ? undefined : { scale: 1.2 }}
              aria-label={`${starVal} star${starVal !== 1 ? "s" : ""}`}
              className={cn("focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded", readonly && "cursor-default")}
            >
              <Star
                style={{ width: px, height: px }}
                className={cn(
                  "transition-all duration-150",
                  filled ? "fill-yellow-400 text-yellow-400" : "fill-transparent text-slate-300",
                  !readonly && !filled && "hover:text-yellow-200"
                )}
              />
            </motion.button>
          );
        })}
      </div>
      {showLabel && !readonly && display > 0 && (
        <span className="text-xs font-bold text-[var(--color-primary)]">{LABELS[display]}</span>
      )}
    </div>
  );
}
