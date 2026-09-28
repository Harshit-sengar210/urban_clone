"use client";

import { motion } from "framer-motion";
import { Wallet, Plus, ArrowRight } from "lucide-react";
import { Wallet as WalletType } from "@/data/payments";

interface WalletBalanceCardProps {
  wallet: WalletType;
  onAddMoney: () => void;
}

export function WalletBalanceCard({ wallet, onAddMoney }: WalletBalanceCardProps) {
  const pct = Math.min((wallet.balance / wallet.maxBalance) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-primary)] via-violet-600 to-purple-700 p-6 text-white shadow-xl shadow-purple-500/20 mb-6"
    >
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-44 h-44 bg-white/5 rounded-full pointer-events-none" />
      <div className="absolute top-16 -right-6 w-24 h-24 bg-white/5 rounded-full pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
            <span className="font-bold text-white/90">UrbanClone Wallet</span>
          </div>
          <span className="text-xs bg-white/15 px-2.5 py-1 rounded-full font-semibold">Available</span>
        </div>

        <p className="text-sm text-white/60 font-medium mb-1">Available Balance</p>
        <p className="text-4xl font-extrabold tracking-tight mb-1">
          ₹{wallet.balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </p>
        <p className="text-xs text-white/50 mb-5">Usable for eligible UrbanClone bookings</p>

        {/* Progress bar */}
        <div className="mb-5">
          <div className="flex justify-between text-[10px] text-white/50 mb-1.5">
            <span>Balance</span>
            <span>Limit ₹{(wallet.maxBalance / 1000).toFixed(0)}k</span>
          </div>
          <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="h-full bg-white/70 rounded-full"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onAddMoney}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white text-[var(--color-primary)] text-sm font-extrabold rounded-xl hover:bg-white/90 transition-colors shadow-md"
          >
            <Plus className="w-4 h-4" /> Add Money
          </button>
          <a
            href="#transactions"
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white/15 text-white text-sm font-semibold rounded-xl hover:bg-white/25 transition-colors"
          >
            Transactions <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
