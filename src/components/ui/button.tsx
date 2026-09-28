import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]",
          {
            "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-md shadow-primary/20": variant === "default",
            "border border-[var(--color-border)] bg-transparent hover:bg-[var(--color-surface-hover)] text-[var(--color-foreground)]": variant === "outline",
            "hover:bg-[var(--color-surface-hover)] text-[var(--color-foreground)]": variant === "ghost",
            "text-[var(--color-primary)] underline-offset-4 hover:underline": variant === "link",
            "h-11 px-6 py-2": size === "default",
            "h-9 rounded-md px-3": size === "sm",
            "h-12 rounded-xl px-8 text-base": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
