"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroBookingCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-white/90 backdrop-blur-xl p-4 md:p-5 rounded-2xl shadow-xl border border-white/40 w-[240px] md:w-[280px]"
      style={{
        animation: "float 6s ease-in-out infinite",
      }}
    >
      <div className="flex flex-col gap-3">
        <h4 className="font-semibold text-[var(--color-foreground)]">Book a Service</h4>
        <div className="flex justify-between items-center bg-[var(--color-surface-hover)] p-3 rounded-xl border border-[var(--color-border)]">
          <div className="flex flex-col">
            <span className="text-sm font-medium">Home Cleaning</span>
            <span className="text-xs text-[var(--color-muted)]">₹499 onwards</span>
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-md text-xs font-bold">
            <Star className="w-3 h-3 fill-current" />
            4.8
          </div>
        </div>
        <Button className="w-full h-10 shadow-lg shadow-primary/25">Book Now</Button>
      </div>
    </motion.div>
  );
}

export function HeroProCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="absolute top-12 right-4 md:top-24 md:-right-8 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/40 w-[200px]"
      style={{
        animation: "float 7s ease-in-out infinite alternate",
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-green-600 bg-green-50 w-fit px-2 py-1 rounded-full">
          <CheckCircle className="w-3.5 h-3.5" />
          Verified Pro
        </div>
        <div>
          <div className="font-semibold text-sm">Ravi Kumar</div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-[var(--color-muted)] flex items-center gap-1">
              4.9 <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
            </span>
            <span className="text-xs text-[var(--color-muted)]">1.2k+ jobs</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
