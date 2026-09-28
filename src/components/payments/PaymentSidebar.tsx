"use client";

import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, Receipt, RotateCcw } from "lucide-react";
import { PaymentSummaryData, WalletCredit, Transaction } from "@/data/payments";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

// ─── Payment Summary ─────────────────────────────────────────────────────────
export function PaymentSummaryCard({ summary }: { summary: PaymentSummaryData }) {
  const STATS = [
    { label: "Total Spent",   value: `₹${summary.totalSpent.toLocaleString()}`,   icon: TrendingDown, color: "text-red-500",   bg: "bg-red-50" },
    { label: "Payments",      value: String(summary.transactionCount),             icon: Receipt,      color: "text-blue-600",  bg: "bg-blue-50" },
    { label: "Refunded",      value: `₹${summary.totalRefunded.toLocaleString()}`, icon: RotateCcw,    color: "text-green-600", bg: "bg-green-50" },
    { label: "Wallet Added",  value: `₹${summary.walletAdded.toLocaleString()}`,   icon: TrendingUp,   color: "text-purple-600",bg: "bg-purple-50" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="bg-white border border-[var(--color-border)] rounded-2xl shadow-sm p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-[var(--color-foreground)]">Payment Summary</h3>
        <span className="text-xs text-[var(--color-muted)] bg-slate-50 px-2.5 py-1 rounded-full font-medium">{summary.month}</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {STATS.map((s) => (
          <div key={s.label} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/60">
            <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center flex-shrink-0`}>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <div>
              <p className="text-sm font-extrabold text-[var(--color-foreground)]">{s.value}</p>
              <p className="text-[10px] text-[var(--color-muted)] font-medium">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Available Credits ────────────────────────────────────────────────────────
export function AvailableCredits({ credits }: { credits: WalletCredit[] }) {
  if (credits.length === 0) return null;
  const total = credits.reduce((s, c) => s + c.amount, 0);
  const nearest = credits.sort((a, b) => new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime())[0];
  const expiresLabel = new Date(nearest.expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-5"
    >
      <div className="flex items-start justify-between mb-2">
        <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">Available Credits</p>
        <Link href="/dashboard/offers" className="text-xs font-bold text-amber-600 hover:underline">View Offers →</Link>
      </div>
      <p className="text-2xl font-extrabold text-amber-700 mb-1">₹{total.toLocaleString()}</p>
      <p className="text-xs text-amber-600">{nearest.title}</p>
      <p className="text-[10px] text-amber-500 mt-0.5">Expires {expiresLabel}</p>
    </motion.div>
  );
}

// ─── Payment Security Card ────────────────────────────────────────────────────
export function PaymentSecurityCard() {
  return (
    <div className="flex items-start gap-3 p-4 bg-slate-50 border border-[var(--color-border)] rounded-2xl">
      <ShieldCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-bold text-[var(--color-foreground)] mb-1">Payment Security</p>
        <p className="text-xs text-[var(--color-muted)] leading-relaxed">
          Your payment information is protected and never displayed in full. Never share your OTP, PIN or CVV with anyone, including UrbanClone support.
        </p>
      </div>
    </div>
  );
}
