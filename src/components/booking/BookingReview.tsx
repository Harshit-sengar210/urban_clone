"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PricingVariant } from "@/data/services";
import { Address } from "./AddressSelection";
import { Tag, X, CheckCircle2, ChevronDown, ChevronUp, Gift } from "lucide-react";

interface BookingReviewProps {
  variant: PricingVariant;
  date: string;
  time: string;
  address: Address;
  paymentMethod: string;
  contactName: string;
  contactPhone: string;
  onContactNameChange: (val: string) => void;
  onContactPhoneChange: (val: string) => void;
}

// Mock available coupons
const AVAILABLE_COUPONS = [
  { code: "URBAN10", discount: 10, type: "percent" as const, desc: "10% off on your booking" },
  { code: "FIRST50", discount: 50, type: "flat" as const, desc: "₹50 flat off for new users" },
  { code: "CLEAN20", discount: 20, type: "percent" as const, desc: "20% off on cleaning services" },
];

export function BookingReview({ 
  variant, 
  date, 
  time, 
  address, 
  paymentMethod,
  contactName,
  contactPhone,
  onContactNameChange,
  onContactPhoneChange
}: BookingReviewProps) {
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<typeof AVAILABLE_COUPONS[0] | null>(null);
  const [couponError, setCouponError] = useState("");
  const [showOffers, setShowOffers] = useState(false);

  const servicePrice = variant.price;
  const taxes = Math.round(servicePrice * 0.18);
  const platformFee = 20;

  const discountAmount = appliedCoupon
    ? appliedCoupon.type === "percent"
      ? Math.round(servicePrice * (appliedCoupon.discount / 100))
      : appliedCoupon.discount
    : 0;

  const total = servicePrice + taxes + platformFee - discountAmount;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const applyCoupon = (code: string) => {
    const found = AVAILABLE_COUPONS.find(
      (c) => c.code.toUpperCase() === code.trim().toUpperCase()
    );
    if (found) {
      setAppliedCoupon(found);
      setCouponInput(found.code);
      setCouponError("");
      setShowOffers(false);
    } else {
      setCouponError("Invalid coupon code. Please try again.");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Review your booking</h2>

      {/* Booking Details */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-6 md:p-8 space-y-6">
        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-[var(--color-border)]">
          <div>
            <span className="text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wider block mb-1">Service</span>
            <span className="font-semibold text-[var(--color-foreground)] text-lg">{variant.name}</span>
          </div>
          <div>
            <span className="text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wider block mb-1">Date &amp; Time</span>
            <span className="font-semibold text-[var(--color-foreground)] text-lg block">{formattedDate}</span>
            <span className="text-[var(--color-muted)]">{time}</span>
          </div>
          <div>
            <span className="text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wider block mb-1">Address</span>
            <span className="font-semibold text-[var(--color-foreground)] text-lg block">{address.type}</span>
            <span className="text-[var(--color-muted)]">{address.fullAddress}, {address.city}</span>
          </div>
          <div>
            <span className="text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wider block mb-1">Professional</span>
            <span className="text-[var(--color-primary)] font-medium block">Assigned after booking</span>
          </div>
          <div>
            <span className="text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wider block mb-1">Payment</span>
            <span className="font-semibold text-[var(--color-foreground)] text-lg block">
              {paymentMethod === "card" ? "Card" : paymentMethod === "upi" ? "UPI" : "Pay after service"}
            </span>
          </div>
        </div>

        {/* ─── Contact Details Section ─── */}
        <div className="pb-6 border-b border-[var(--color-border)]">
          <h3 className="font-bold text-[var(--color-foreground)] mb-4">Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-muted)] mb-1">Full Name</label>
              <input 
                type="text" 
                required 
                value={contactName} 
                onChange={e => onContactNameChange(e.target.value)}
                placeholder="Enter your name"
                className="w-full h-11 px-4 rounded-xl border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none transition-colors bg-white text-[var(--color-foreground)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-muted)] mb-1">Phone Number</label>
              <input 
                type="tel" 
                required 
                value={contactPhone} 
                onChange={e => onContactPhoneChange(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full h-11 px-4 rounded-xl border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none transition-colors bg-white text-[var(--color-foreground)]"
              />
            </div>
          </div>
        </div>

        {/* ─── Coupon / Offers Section ─── */}
        <div className="pb-6 border-b border-[var(--color-border)]">
          <h3 className="font-bold text-[var(--color-foreground)] mb-3 flex items-center gap-2">
            <Tag className="w-4 h-4 text-[var(--color-primary)]" />
            Coupons &amp; Offers
          </h3>

          {/* Coupon Input */}
          {!appliedCoupon ? (
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && applyCoupon(couponInput)}
                  placeholder="Enter coupon code"
                  className={`w-full h-11 px-4 rounded-xl border text-sm font-semibold uppercase tracking-wider bg-white transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20
                    ${couponError ? "border-red-400 focus:border-red-400" : "border-[var(--color-border)] focus:border-[var(--color-primary)]"}`}
                />
              </div>
              <button
                onClick={() => applyCoupon(couponInput)}
                disabled={!couponInput.trim()}
                className="px-5 h-11 rounded-xl bg-[var(--color-primary)] text-white text-sm font-bold hover:opacity-90 disabled:opacity-40 transition-all"
              >
                Apply
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-green-700">{appliedCoupon.code} applied!</p>
                  <p className="text-xs text-green-600">{appliedCoupon.desc}</p>
                </div>
              </div>
              <button onClick={removeCoupon} className="text-green-600 hover:text-green-800 transition-colors ml-3">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* Coupon Error */}
          {couponError && (
            <p className="text-xs text-red-500 font-medium mt-2">{couponError}</p>
          )}

          {/* Available Offers Toggle */}
          <button
            onClick={() => setShowOffers((v) => !v)}
            className="flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] mt-3 hover:underline"
          >
            <Gift className="w-4 h-4" />
            {showOffers ? "Hide" : "View"} available offers
            {showOffers ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <AnimatePresence>
            {showOffers && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-3 space-y-2">
                  {AVAILABLE_COUPONS.map((coupon) => (
                    <div
                      key={coupon.code}
                      className="flex items-center justify-between bg-[var(--color-primary)]/4 border border-[var(--color-primary)]/15 rounded-xl px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                          <Tag className="w-4 h-4 text-[var(--color-primary)]" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[var(--color-foreground)] tracking-wider">{coupon.code}</p>
                          <p className="text-xs text-[var(--color-muted)]">{coupon.desc}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => applyCoupon(coupon.code)}
                        disabled={appliedCoupon?.code === coupon.code}
                        className="text-xs font-bold text-[var(--color-primary)] border border-[var(--color-primary)]/30 px-3 py-1.5 rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition-all disabled:opacity-40"
                      >
                        {appliedCoupon?.code === coupon.code ? "Applied" : "Apply"}
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Payment Summary */}
        <div>
          <h3 className="font-bold text-[var(--color-foreground)] mb-4">Payment Summary</h3>
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-[var(--color-muted)]">
              <span>Service price</span>
              <span className="text-[var(--color-foreground)] font-medium">₹{servicePrice}</span>
            </div>
            <div className="flex justify-between text-[var(--color-muted)]">
              <span>Taxes (18%)</span>
              <span className="text-[var(--color-foreground)] font-medium">₹{taxes}</span>
            </div>
            <div className="flex justify-between text-[var(--color-muted)]">
              <span>Platform fee</span>
              <span className="text-[var(--color-foreground)] font-medium">₹{platformFee}</span>
            </div>

            {/* Discount row — only shown when coupon is applied */}
            <AnimatePresence>
              {appliedCoupon && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex justify-between text-green-600 font-semibold"
                >
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    Discount ({appliedCoupon.code})
                  </span>
                  <span>− ₹{discountAmount}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-[var(--color-border)]">
            <span className="font-bold text-lg text-[var(--color-foreground)]">Total</span>
            <div className="text-right">
              {appliedCoupon && (
                <p className="text-sm text-[var(--color-muted)] line-through mb-0.5">
                  ₹{servicePrice + taxes + platformFee}
                </p>
              )}
              <span className="font-bold text-2xl text-[var(--color-primary)]">₹{total}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
