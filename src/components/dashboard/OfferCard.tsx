"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";

export function OfferCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--color-primary)]/10 via-purple-50 to-white border border-[var(--color-primary)]/15 p-5"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-primary)]/10 rounded-full -translate-y-8 translate-x-8 pointer-events-none" />
      
      <div className="w-10 h-10 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-3">
        <Gift className="w-5 h-5 text-[var(--color-primary)]" />
      </div>

      <p className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider mb-1">Special Offer</p>
      <p className="text-xl font-extrabold text-[var(--color-foreground)] tracking-tight mb-1">
        Enjoy 10% OFF
      </p>
      <p className="text-sm text-[var(--color-muted)] font-medium mb-4">
        on your next booking!
      </p>

      <Link
        href="/dashboard/offers"
        className="inline-flex items-center justify-center w-full py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-bold hover:opacity-90 transition-opacity"
      >
        Explore Offers
      </Link>
    </motion.div>
  );
}
