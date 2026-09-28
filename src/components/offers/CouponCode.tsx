"use client";

import { useState } from "react";
import { Copy, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/bookings/Toast";

interface CouponCodeProps {
  code: string;
  disabled?: boolean;
}

export function CouponCode({ code, disabled = false }: CouponCodeProps) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        setCopied(true);
        showToast("Coupon copied successfully");
        setTimeout(() => setCopied(false), 3000);
      }).catch(() => {
        showToast("Unable to copy coupon");
      });
    }
  };

  return (
    <button
      onClick={handleCopy}
      disabled={disabled}
      aria-label={`Copy coupon ${code}`}
      className={cn(
        "flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-xl border border-dashed bg-white transition-all w-fit",
        copied
          ? "border-green-400 text-green-600 bg-green-50"
          : disabled
            ? "border-slate-300 text-slate-400 bg-slate-50 cursor-not-allowed"
            : "border-[var(--color-primary)]/50 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 hover:border-[var(--color-primary)] cursor-pointer"
      )}
    >
      <span className="font-bold tracking-widest text-sm uppercase">{code}</span>
      <div className={cn(
        "flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg transition-colors",
        copied ? "bg-green-100 text-green-700" : disabled ? "bg-slate-200 text-slate-500" : "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
      )}>
        {copied ? (
          <>
            <CheckCircle2 className="w-3 h-3" />
            Copied
          </>
        ) : (
          <>
            <Copy className="w-3 h-3" />
            Copy
          </>
        )}
      </div>
    </button>
  );
}
