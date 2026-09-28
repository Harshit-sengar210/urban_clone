"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function SettingsCard({ title, description, children, className, destructive }: { title?: string, description?: string, children: ReactNode, className?: string, destructive?: boolean }) {
  return (
    <div className={cn("bg-white rounded-2xl border mb-6 overflow-hidden", destructive ? "border-red-200 shadow-sm" : "border-[var(--color-border)] shadow-sm", className)}>
      {(title || description) && (
        <div className={cn("p-5 border-b", destructive ? "border-red-100 bg-red-50/50" : "border-[var(--color-border)]")}>
          {title && <h2 className={cn("text-base font-bold", destructive ? "text-red-700" : "text-[var(--color-foreground)]")}>{title}</h2>}
          {description && <p className="text-sm font-medium text-[var(--color-muted)] mt-1">{description}</p>}
        </div>
      )}
      <div className="p-5 space-y-5">
        {children}
      </div>
    </div>
  );
}

export function SettingsRow({ label, description, control }: { label: string, description?: string, control: ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-1 border-b border-slate-100 last:border-0 last:pb-0">
      <div className="flex-1 pr-4">
        <p className="text-sm font-bold text-[var(--color-foreground)]">{label}</p>
        {description && <p className="text-xs font-medium text-[var(--color-muted)] mt-0.5 leading-relaxed">{description}</p>}
      </div>
      <div className="flex-shrink-0">
        {control}
      </div>
    </div>
  );
}

export function SettingsToggle({ checked, onChange, disabled }: { checked: boolean; onChange: (c: boolean) => void; disabled?: boolean }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      disabled={disabled}
      className={cn(
        "relative w-11 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]/50",
        checked ? "bg-[var(--color-primary)]" : "bg-slate-200",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <span
        className={cn(
          "absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform shadow-sm",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
}
