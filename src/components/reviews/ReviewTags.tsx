"use client";

import { ReviewTag, ALL_REVIEW_TAGS } from "@/data/reviews";
import { cn } from "@/lib/utils";

interface ReviewTagsProps {
  selected: ReviewTag[];
  readonly?: boolean;
  onChange?: (tags: ReviewTag[]) => void;
}

export function ReviewTags({ selected, readonly = false, onChange }: ReviewTagsProps) {
  const toggle = (tag: ReviewTag) => {
    if (readonly) return;
    const next = selected.includes(tag) ? selected.filter(t => t !== tag) : [...selected, tag];
    onChange?.(next);
  };

  return (
    <div>
      {!readonly && (
        <p className="text-xs font-bold text-[var(--color-foreground)] mb-2 uppercase tracking-wider">What stood out?</p>
      )}
      <div className="flex flex-wrap gap-2">
        {(readonly ? selected : ALL_REVIEW_TAGS).map((tag) => {
          const active = selected.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggle(tag)}
              disabled={readonly}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all",
                active
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                  : "border-[var(--color-border)] text-slate-500 hover:border-slate-300",
                readonly && "cursor-default"
              )}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
