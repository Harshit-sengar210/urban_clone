"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, CheckCircle2, ChevronRight, Info, AlertTriangle } from "lucide-react";
import { Offer } from "@/lib/offers/offers.types";
import { useToast } from "@/components/bookings/Toast";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PublicOfferDetailsDrawerProps {
  offer: Offer | null;
  open: boolean;
  onClose: () => void;
}

export function PublicOfferDetailsDrawer({ offer, open, onClose }: PublicOfferDetailsDrawerProps) {
  const [copied, setCopied] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const { showToast } = useToast();

  if (!offer) return null;

  const isExpired = offer.status === "expired";

  const handleCopy = () => {
    navigator.clipboard.writeText(offer.code);
    setCopied(true);
    showToast(`Code ${offer.code} copied!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const dateStr = new Date(offer.validUntil).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric"
  });

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <h2 className="text-xl font-bold text-[var(--color-foreground)] tracking-tight">Offer Details</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              
              <div className="flex items-start justify-between mb-2">
                <span className="inline-block px-2.5 py-1 bg-purple-50 text-[var(--color-primary)] text-[10px] font-bold uppercase tracking-widest rounded mb-4">
                  {offer.category.replace("-", " ")}
                </span>
                {isExpired && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded">
                    <AlertTriangle className="w-3.5 h-3.5" /> Expired
                  </span>
                )}
              </div>
              
              <h3 className={cn(
                "text-4xl font-black tracking-tight mb-2",
                isExpired ? "text-slate-400" : "text-[var(--color-primary)]"
              )}>
                {offer.title}
              </h3>
              
              <p className="text-base text-slate-600 font-medium mb-8">
                {offer.description}
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-8">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Coupon Code</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-mono font-bold tracking-widest text-[var(--color-foreground)]">
                    {offer.code}
                  </span>
                  <button 
                    onClick={handleCopy}
                    disabled={isExpired}
                    className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors disabled:opacity-50 text-[var(--color-foreground)]"
                  >
                    {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-sm font-medium text-slate-500">Validity</span>
                  <span className="text-sm font-bold text-[var(--color-foreground)]">{dateStr}</span>
                </div>
                {offer.minimumBookingAmount && (
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <span className="text-sm font-medium text-slate-500">Min. Booking</span>
                    <span className="text-sm font-bold text-[var(--color-foreground)]">₹{offer.minimumBookingAmount}</span>
                  </div>
                )}
                {offer.maximumDiscount && (
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <span className="text-sm font-medium text-slate-500">Max Discount</span>
                    <span className="text-sm font-bold text-[var(--color-foreground)]">₹{offer.maximumDiscount}</span>
                  </div>
                )}
              </div>

              {/* Terms */}
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <button 
                  onClick={() => setTermsOpen(!termsOpen)}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-bold text-[var(--color-foreground)]">Terms & Conditions</span>
                  </div>
                  <ChevronRight className={cn("w-4 h-4 text-slate-400 transition-transform", termsOpen && "rotate-90")} />
                </button>
                <AnimatePresence>
                  {termsOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <ul className="p-4 pt-2 text-sm text-slate-600 list-disc list-inside space-y-2">
                        <li>Offer is valid on eligible services only.</li>
                        <li>One coupon per booking.</li>
                        <li>Cannot be combined with another promotional code.</li>
                        {offer.minimumBookingAmount && <li>Minimum booking amount of ₹{offer.minimumBookingAmount} applies.</li>}
                        <li>Promotional availability is subject to the offer's configured validity period.</li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[var(--color-border)] bg-white grid grid-cols-2 gap-3">
              <button 
                onClick={handleCopy}
                disabled={isExpired}
                className="h-12 rounded-xl bg-slate-100 text-[var(--color-foreground)] font-bold text-sm hover:bg-slate-200 transition-colors disabled:opacity-50"
              >
                {copied ? "Copied" : "Copy Code"}
              </button>
              <Link 
                href="/services"
                onClick={onClose}
                className={cn(
                  "h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-colors",
                  isExpired ? "bg-slate-300 text-slate-500 pointer-events-none" : "bg-[var(--color-primary)] text-white hover:bg-opacity-90"
                )}
              >
                Book a Service
              </Link>
            </div>
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
