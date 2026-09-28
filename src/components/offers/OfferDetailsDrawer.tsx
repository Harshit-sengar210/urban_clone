"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { Offer } from "@/data/offers";
import { CouponCode } from "./CouponCode";
import { cn } from "@/lib/utils";

interface OfferDetailsDrawerProps {
  open: boolean;
  onClose: () => void;
  offer: Offer | null;
  onApply: (o: Offer) => void;
}

export function OfferDetailsDrawer({ open, onClose, offer, onApply }: OfferDetailsDrawerProps) {
  const [termsOpen, setTermsOpen] = useState(false);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  if (!offer) return null;

  const handleApply = () => {
    setApplying(true);
    setTimeout(() => {
      setApplying(false);
      setApplied(true);
      setTimeout(() => {
        onApply(offer);
        onClose();
        setApplied(false);
        setTermsOpen(false);
      }, 1000);
    }, 800);
  };

  const getBadgeText = () => {
    if (offer.type === "flat") return `₹${offer.discountValue} OFF`;
    if (offer.type === "percentage") return `${offer.discountValue}% OFF`;
    return `${offer.discountValue}% CASHBACK`;
  };

  const dateStr = new Date(offer.validUntil).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const isUsable = offer.status === "active" || offer.status === "saved";

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="absolute right-0 top-0 bottom-0 w-full sm:w-[440px] bg-white flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border)] flex-shrink-0">
              <h2 className="text-lg font-extrabold text-[var(--color-foreground)]">Offer Details</h2>
              <button onClick={onClose} className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-colors">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              <div>
                <h3 className="text-3xl font-black text-[var(--color-foreground)] tracking-tight mb-2">{getBadgeText()}</h3>
                <p className="text-sm font-semibold text-[var(--color-muted)]">{offer.title}</p>
                <div className="mt-5">
                  <CouponCode code={offer.couponCode} disabled={!isUsable} />
                </div>
              </div>

              <div className="h-px w-full bg-slate-100" />

              <div className="space-y-4">
                <div className="flex justify-between items-start text-sm">
                  <span className="text-[var(--color-muted)] font-medium">Minimum Booking</span>
                  <span className="font-bold text-[var(--color-foreground)]">₹{offer.minBookingAmount}</span>
                </div>
                <div className="flex justify-between items-start text-sm">
                  <span className="text-[var(--color-muted)] font-medium">Maximum Discount</span>
                  <span className="font-bold text-[var(--color-foreground)]">₹{offer.maxDiscount}</span>
                </div>
                <div className="flex justify-between items-start text-sm">
                  <span className="text-[var(--color-muted)] font-medium">Valid Until</span>
                  <span className="font-bold text-[var(--color-foreground)]">{dateStr}</span>
                </div>
              </div>

              <div className="h-px w-full bg-slate-100" />

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-foreground)] mb-3">Eligible Services</h4>
                <div className="flex flex-wrap gap-2">
                  {offer.eligibleServices.map(s => (
                    <span key={s} className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold">{s}</span>
                  ))}
                </div>
              </div>

              {/* Terms Accordion */}
              <div className="border border-[var(--color-border)] rounded-2xl overflow-hidden mt-4">
                <button
                  onClick={() => setTermsOpen(v => !v)}
                  className="w-full px-4 py-3 bg-slate-50 flex items-center justify-between hover:bg-slate-100 transition-colors"
                >
                  <span className="text-sm font-bold text-[var(--color-foreground)]">Terms & Conditions</span>
                  {termsOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>
                <AnimatePresence>
                  {termsOpen && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="px-4 py-4 bg-white border-t border-[var(--color-border)] text-xs text-[var(--color-muted)] space-y-2">
                        {offer.terms.map((t, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-slate-300 mt-1.5 flex-shrink-0" />
                            <p>{t}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer */}
            {isUsable && (
              <div className="px-6 py-5 border-t border-[var(--color-border)] bg-white flex-shrink-0">
                <button
                  onClick={handleApply}
                  disabled={applying || applied}
                  className={cn(
                    "w-full h-12 rounded-xl text-white text-sm font-bold transition-all flex items-center justify-center gap-2",
                    applied ? "bg-green-600" : "bg-[var(--color-primary)] hover:opacity-90",
                    (applying || applied) && "pointer-events-none"
                  )}
                >
                  {applying ? "Checking Eligibility..." : applied ? <><CheckCircle2 className="w-4 h-4" /> Offer Selected</> : "Apply Offer"}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
