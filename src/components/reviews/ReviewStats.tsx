"use client";

import { motion } from "framer-motion";
import { MessageSquareText, Star, Clock } from "lucide-react";

interface ReviewStatsProps {
  submitted: number;
  pending: number;
  average: number;
}

export function ReviewStats({ submitted, pending, average }: ReviewStatsProps) {
  const STATS = [
    { label: "Reviews Submitted", value: submitted, icon: MessageSquareText, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Pending Reviews",   value: pending,   icon: Clock,             color: "text-amber-500",bg: "bg-amber-50" },
    { label: "Average Rating",    value: average > 0 ? average.toFixed(1) : "-", icon: Star, color: "text-green-500", bg: "bg-green-50" },
  ];

  return (
    <div className="mb-8">
      <h2 className="font-bold text-[var(--color-foreground)] mb-4">Your Review Activity</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-[var(--color-border)] rounded-2xl p-5 flex items-center gap-4 shadow-sm"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${s.bg}`}>
              <s.icon className={`w-6 h-6 ${s.color} ${s.icon === Star ? "fill-current" : ""}`} />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-[var(--color-foreground)]">{s.value}</p>
              <p className="text-xs text-[var(--color-muted)] font-medium mt-0.5">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
