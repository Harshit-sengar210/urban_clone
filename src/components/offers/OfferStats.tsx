"use client";

import { motion } from "framer-motion";
import { OfferStats as Stats } from "@/data/offers";

export function OfferStats({ stats }: { stats: Stats }) {
  const ITEMS = [
    { label: "Total Saved",     value: `₹${stats.totalSaved.toLocaleString()}` },
    { label: "Offers Used",     value: stats.offersUsed.toString() },
    { label: "Available Offers",value: stats.availableOffers.toString() },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-8">
      {ITEMS.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white border border-[var(--color-border)] rounded-2xl p-4 shadow-sm text-center md:text-left flex flex-col md:flex-row md:items-center justify-center md:justify-start gap-1 md:gap-3"
        >
          <span className="text-xl md:text-2xl font-extrabold text-[var(--color-foreground)]">{item.value}</span>
          <span className="text-[10px] md:text-xs text-[var(--color-muted)] font-semibold uppercase tracking-wider">{item.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
