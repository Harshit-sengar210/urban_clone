import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "border-transparent bg-[var(--color-primary)] text-white shadow hover:bg-[var(--color-primary-hover)]": variant === "default",
          "border-transparent bg-[var(--color-surface-hover)] text-[var(--color-foreground)] hover:bg-[var(--color-border)]": variant === "secondary",
          "text-[var(--color-foreground)] border-[var(--color-border)]": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
