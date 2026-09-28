"use client";

import Link from "next/link";

export function VendorOnboardingHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100 sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-900 to-[var(--color-primary)] flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
          U
        </div>
        <span className="text-lg font-bold tracking-tight text-[var(--color-foreground)] hidden sm:block">
          Urban<span className="text-[var(--color-primary)]">Clone</span> <span className="text-slate-400 font-medium text-sm ml-1">Partner</span>
        </span>
      </Link>
      
      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-500 hidden sm:inline-block font-medium">Already a partner?</span>
        <Link href="/vendor/login" className="font-bold text-[var(--color-primary)] hover:underline">
          Login
        </Link>
      </div>
    </header>
  );
}
