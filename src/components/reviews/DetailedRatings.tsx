"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { DetailedRatings } from "@/data/reviews";
import { StarRating } from "./StarRating";
import { cn } from "@/lib/utils";

interface DetailedRatingsProps {
  value: DetailedRatings;
  readonly?: boolean;
  onChange?: (v: DetailedRatings) => void;
}

const AREAS: { key: keyof DetailedRatings; label: string }[] = [
  { key: "professionalism", label: "Professionalism" },
  { key: "punctuality",     label: "Punctuality" },
  { key: "quality",         label: "Quality of Work" },
  { key: "value",           label: "Value for Money" },
];

export function DetailedRatingsSection({ value, readonly = false, onChange }: DetailedRatingsProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-[var(--color-border)] rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-50/60 hover:bg-slate-100/60 transition-colors"
      >
        <span className="text-sm font-bold text-[var(--color-foreground)]">
          {readonly ? "Detailed Ratings" : "Rate Specific Areas"}
        </span>
        {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>
      {expanded && (
        <div className="px-4 py-3 space-y-3">
          {AREAS.map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between gap-3">
              <span className={cn("text-sm font-medium text-[var(--color-foreground)] flex-1", readonly && "text-[var(--color-muted)]")}>{label}</span>
              <StarRating
                value={value[key]}
                size="sm"
                readonly={readonly}
                onChange={(v) => onChange?.({ ...value, [key]: v })}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
