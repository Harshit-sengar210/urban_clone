"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home, Gift } from "lucide-react";

export function OffersPageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-6"
    >
      <nav className="flex items-center gap-1.5 text-xs text-[var(--color-muted)] font-medium mb-3">
        <Link href="/dashboard" className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-1">
          <Home className="w-3 h-3" /> Dashboard
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-300" />
        <span className="text-[var(--color-foreground)]">Offers & Rewards</span>
      </nav>
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center">
          <Gift className="w-5 h-5 text-[var(--color-primary)]" />
        </div>
        <h1 className="text-2xl font-extrabold text-[var(--color-foreground)] tracking-tight">Offers & Rewards</h1>
      </div>
      <p className="text-sm text-[var(--color-muted)] font-medium ml-[52px]">
        Save more on your home services with exclusive offers and rewards.
      </p>
    </motion.div>
  );
}
