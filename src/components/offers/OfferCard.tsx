"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Offer } from "@/data/offers";
import { CouponCode } from "./CouponCode";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/bookings/Toast";

interface OfferCardProps {
  offer: Offer;
  onViewDetails: (offer: Offer) => void;
  onToggleSave: (offerId: string) => void;
}

export function OfferCard({ offer, onViewDetails, onToggleSave }: OfferCardProps) {
  const { showToast } = useToast();
  const isExpired = offer.status === "expired";
  const isUsed = offer.status === "used";
  const disabled = isExpired || isUsed;
  const isSaved = offer.status === "saved";
  
  const expiryDate = new Date(offer.validUntil);
  const now = new Date();
  const daysLeft = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
  const expiringSoon = daysLeft > 0 && daysLeft <= 3 && !disabled;

  const dateStr = expiryDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  const getBadgeText = () => {
    if (offer.type === "flat") return `₹${offer.discountValue} OFF`;
    if (offer.type === "percentage") return `${offer.discountValue}% OFF`;
    return `${offer.discountValue}% CASHBACK`;
  };

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSave(offer.id);
    showToast(isSaved ? "Offer removed from saved" : "Offer saved");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={disabled ? {} : { y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)" }}
      className={cn(
        "relative bg-white border border-[var(--color-border)] rounded-2xl p-5 transition-all flex flex-col h-full overflow-hidden",
        disabled && "opacity-60 bg-slate-50"
      )}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-lg font-black tracking-tight",
            disabled ? "text-slate-500" : "text-[var(--color-foreground)]"
          )}>
            {getBadgeText()}
          </span>
          {isUsed && <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded uppercase">Used</span>}
        </div>
        {!disabled && (
          <button onClick={handleSaveToggle} className="p-1 -mr-1 text-slate-400 hover:text-red-500 transition-colors focus:outline-none">
            <Heart className={cn("w-5 h-5", isSaved && "fill-red-500 text-red-500")} />
          </button>
        )}
      </div>

      <p className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider mb-1">{offer.category}</p>
      <p className="text-sm text-[var(--color-muted)] font-medium mb-5 line-clamp-2 min-h-[40px]">
        {offer.shortDescription}
      </p>

      {/* Code */}
      <div className="mt-auto mb-4">
        <CouponCode code={offer.couponCode} disabled={disabled} />
      </div>

      {/* Rules */}
      <div className="text-[10px] font-medium space-y-1 mb-5">
        <p className="text-slate-500">Min. booking ₹{offer.minBookingAmount}</p>
        <p className={cn(
          isExpired ? "text-red-500 font-bold" : expiringSoon ? "text-amber-600 font-bold" : "text-slate-500"
        )}>
          {isExpired ? `Expired ${dateStr}` : expiringSoon ? `Expires in ${daysLeft} days` : `Valid till ${dateStr}`}
        </p>
      </div>

      <button
        onClick={() => onViewDetails(offer)}
        className={cn(
          "w-full py-2.5 rounded-xl border text-sm font-bold transition-colors",
          disabled 
            ? "border-slate-200 text-slate-400 bg-transparent hover:bg-slate-100" 
            : "border-[var(--color-primary)]/20 text-[var(--color-primary)] bg-[var(--color-primary)]/5 hover:bg-[var(--color-primary)] hover:text-white"
        )}
      >
        View Details
      </button>
    </motion.div>
  );
}
