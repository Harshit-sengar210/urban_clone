"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Offer } from "@/data/offers";
import { CouponCode } from "./CouponCode";

export function FeaturedOffer({ offer, onViewDetails }: { offer: Offer; onViewDetails: (o: Offer) => void }) {
  if (!offer) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-primary)] via-violet-700 to-indigo-900 shadow-xl shadow-primary/20 mb-8 p-6 md:p-8">
      {/* Animated Background blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
      />
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="text-white max-w-lg">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-extrabold uppercase tracking-widest text-white flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3 h-3 text-yellow-300" /> Limited Time
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black mb-2 leading-tight">Get {offer.type === "flat" ? `₹${offer.discountValue}` : `${offer.discountValue}%`} OFF your next service</h2>
          <p className="text-white/80 text-sm font-medium mb-6">Valid on selected home services. Minimum booking ₹{offer.minBookingAmount}.</p>
          
          <div className="flex flex-wrap items-center gap-4">
            <CouponCode code={offer.couponCode} />
            <button
              onClick={() => onViewDetails(offer)}
              className="text-white text-sm font-bold flex items-center gap-1.5 hover:text-white/80 transition-colors"
            >
              View Offer <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Decorative graphic right side (Desktop) */}
        <div className="hidden md:flex flex-col gap-2 opacity-20 rotate-12 scale-125 translate-x-4">
          <div className="w-32 h-6 rounded-full bg-white/40" />
          <div className="w-48 h-6 rounded-full bg-white/30" />
          <div className="w-24 h-6 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
}
