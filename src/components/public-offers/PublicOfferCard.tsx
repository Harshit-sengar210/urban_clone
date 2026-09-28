"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Copy, CheckCircle2, Clock } from "lucide-react";
import { Offer } from "@/lib/offers/offers.types";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/bookings/Toast";

interface PublicOfferCardProps {
  offer: Offer;
  onViewDetails: (offer: Offer) => void;
  onToggleSave: (id: string) => void;
}

export function PublicOfferCard({ offer, onViewDetails, onToggleSave }: PublicOfferCardProps) {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const isExpired = offer.status === "expired";
  
  // Calculate if ending soon (within 7 days)
  const expiryDate = new Date(offer.validUntil);
  const now = new Date();
  const daysLeft = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
  const isEndingSoon = daysLeft > 0 && daysLeft <= 7 && !isExpired;

  const dateStr = expiryDate.toLocaleDateString("en-IN", { day: "numeric", month: "short" });

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(offer.code);
    setCopied(true);
    showToast(`Code ${offer.code} copied!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSave(offer.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={isExpired ? {} : { y: -4, boxShadow: "0 12px 30px -10px rgba(0, 0, 0, 0.08)" }}
      className={cn(
        "relative flex flex-col h-full bg-white border border-[var(--color-border)] rounded-2xl p-6 transition-all duration-300 overflow-hidden",
        isExpired && "opacity-60 bg-slate-50"
      )}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded mb-2">
            {offer.category.replace("-", " ")}
          </span>
          <h3 className={cn(
            "text-2xl font-black tracking-tight mb-1",
            isExpired ? "text-slate-500" : "text-[var(--color-foreground)]"
          )}>
            {offer.title}
          </h3>
        </div>
        
        <button 
          onClick={handleSaveToggle} 
          className="p-1.5 -mr-1.5 -mt-1.5 rounded-full hover:bg-slate-100 transition-colors"
          aria-label={offer.saved ? "Remove saved offer" : "Save offer"}
        >
          <motion.div whileTap={{ scale: 0.8 }}>
            <Heart className={cn("w-5 h-5 transition-colors", offer.saved ? "fill-[var(--color-primary)] text-[var(--color-primary)]" : "text-slate-400")} />
          </motion.div>
        </button>
      </div>

      <p className="text-sm text-[var(--color-muted)] font-medium mb-6 line-clamp-2 min-h-[40px]">
        {offer.description}
      </p>

      {/* Code box */}
      <div className="mt-auto flex items-center justify-between p-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 mb-5">
        <span className="font-mono font-bold text-lg text-[var(--color-foreground)] tracking-wider">
          {offer.code}
        </span>
        <button
          onClick={handleCopy}
          disabled={isExpired}
          className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-[var(--color-foreground)] flex items-center gap-1.5 transition-colors disabled:opacity-50"
        >
          {copied ? (
            <><CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Copied</>
          ) : (
            <><Copy className="w-3.5 h-3.5" /> Copy Code</>
          )}
        </button>
      </div>

      {/* Info row */}
      <div className="flex items-center justify-between text-xs font-medium mb-5">
        <span className="text-[var(--color-primary)] font-bold">
          {offer.maximumDiscount ? `Save up to ₹${offer.maximumDiscount}` : 'Special Discount'}
        </span>
        
        <span className={cn(
          "flex items-center gap-1",
          isExpired ? "text-red-500" : isEndingSoon ? "text-amber-600 font-bold" : "text-slate-500"
        )}>
          {isEndingSoon && <Clock className="w-3.5 h-3.5" />}
          {isExpired ? "Expired" : isEndingSoon ? "Ends soon" : `Valid until ${dateStr}`}
        </span>
      </div>

      {/* Action */}
      <button
        onClick={() => onViewDetails(offer)}
        className="w-full py-2.5 rounded-xl bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] text-sm font-bold hover:bg-[var(--color-primary)] hover:text-white transition-colors"
      >
        View Details
      </button>

      {/* Status Overlay for expired/limited */}
      {offer.status === "limited" && !isEndingSoon && (
        <div className="absolute top-0 right-0 px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold uppercase rounded-bl-xl">
          Limited
        </div>
      )}
    </motion.div>
  );
}
