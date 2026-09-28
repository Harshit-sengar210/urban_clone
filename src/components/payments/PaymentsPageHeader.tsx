"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home, Wallet } from "lucide-react";

export function PaymentsPageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-7"
    >
      <nav className="flex items-center gap-1.5 text-xs text-[var(--color-muted)] font-medium mb-3">
        <Link href="/dashboard" className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-1">
          <Home className="w-3 h-3" /> Dashboard
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-300" />
        <span className="text-[var(--color-foreground)]">Wallet & Payments</span>
      </nav>
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center">
          <Wallet className="w-5 h-5 text-[var(--color-primary)]" />
        </div>
        <h1 className="text-2xl font-extrabold text-[var(--color-foreground)] tracking-tight">Wallet & Payments</h1>
      </div>
      <p className="text-sm text-[var(--color-muted)] font-medium ml-[52px]">
        Manage your wallet, payment methods and transaction history.
      </p>
    </motion.div>
  );
}
