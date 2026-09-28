"use client";

import { motion } from "framer-motion";
import { CreditCard, CheckCircle2, Clock } from "lucide-react";
import { Booking } from "@/data/bookings";

interface PaymentSummaryProps {
  booking: Booking;
}

export function PaymentSummary({ booking }: PaymentSummaryProps) {
  const taxes = Math.round(booking.amount * 0.18 / 1.18);
  const serviceCharge = booking.amount - taxes;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.08 }}
      className="bg-white border border-[var(--color-border)] rounded-2xl shadow-sm p-5"
    >
      <h3 className="font-bold text-[var(--color-foreground)] mb-4">Payment Summary</h3>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-[var(--color-muted)]">Service Charge</span>
          <span className="font-semibold text-[var(--color-foreground)]">₹{serviceCharge}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[var(--color-muted)]">Taxes & Fees (18%)</span>
          <span className="font-semibold text-[var(--color-foreground)]">₹{taxes}</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-[var(--color-border)]">
          <span className="font-bold text-[var(--color-foreground)]">Total</span>
          <span className="text-xl font-extrabold text-[var(--color-primary)]">₹{booking.amount.toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-2 pt-3 border-t border-[var(--color-border)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Payment Method</span>
          </div>
          <span className="text-xs font-semibold text-[var(--color-foreground)]">
            {booking.paymentMethod === "cod" ? "Pay on Service" : 
             booking.paymentMethod === "upi" ? "UPI" : 
             booking.paymentMethod === "card" ? "Credit/Debit Card" :
             booking.paymentMethod || "UPI"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
            {booking.paymentStatus === "paid" ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> : <Clock className="w-3.5 h-3.5 text-orange-400" />}
            <span>Payment Status</span>
          </div>
          <span className={`text-xs font-bold ${
            booking.paymentStatus === "paid" ? "text-green-600" :
            booking.paymentStatus === "refunded" ? "text-blue-600" : "text-orange-500"
          }`}>
            {booking.paymentStatus === "paid" ? "Paid ✓" : booking.paymentStatus === "refunded" ? "Refunded ↩" : "Pending"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
