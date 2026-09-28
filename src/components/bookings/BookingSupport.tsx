"use client";

import Link from "next/link";
import { HeadphonesIcon } from "lucide-react";

export function BookingSupport() {
  return (
    <div className="bg-gradient-to-br from-[var(--color-primary)]/6 to-purple-50/40 border border-[var(--color-primary)]/10 rounded-2xl p-5">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
          <HeadphonesIcon className="w-4.5 h-4.5 text-[var(--color-primary)]" style={{ width: 18, height: 18 }} />
        </div>
        <div className="flex-1">
          <p className="font-bold text-sm text-[var(--color-foreground)] mb-0.5">Need help with this booking?</p>
          <p className="text-xs text-[var(--color-muted)] mb-3">Our support team is available 24/7 to assist you.</p>
          <Link
            href="/dashboard/support"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:underline"
          >
            Contact Support →
          </Link>
        </div>
      </div>
    </div>
  );
}
