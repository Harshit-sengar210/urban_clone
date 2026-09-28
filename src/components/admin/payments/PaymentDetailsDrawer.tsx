"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, ShoppingBag, CreditCard, ExternalLink, Download, Printer } from "lucide-react";
import type { AdminTransaction } from "@/data/adminPaymentsData";

export function PaymentDetailsDrawer({
  transaction,
  onClose,
  onViewBooking,
}: {
  transaction: AdminTransaction | null;
  onClose: () => void;
  onViewBooking?: (bookingId: string) => void;
}) {
  if (!transaction) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[150] flex justify-end"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-lg font-bold text-[#0A192F] uppercase tracking-wide">TXN: {transaction.id}</h2>
                <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border ${
                  transaction.status === 'paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                  transaction.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  'bg-slate-50 text-slate-700 border-slate-200'
                }`}>
                  {transaction.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-slate-500">Processed on {new Date(transaction.createdAt).toLocaleString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Amount & Method */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 text-center">
              <p className="text-sm font-medium text-slate-500 mb-1">Total Amount</p>
              <h3 className="text-3xl font-bold text-[#0A192F] mb-3">₹{transaction.amount}</h3>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg">
                <CreditCard className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{transaction.paymentMethod.replace('_', ' ')}</span>
              </div>
            </div>

            {/* Related Entities */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-slate-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-4 h-4 text-slate-400" />
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</h4>
                </div>
                <p className="font-bold text-slate-800">{transaction.customer.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{transaction.customer.id}</p>
              </div>
              
              <div className="border border-slate-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <ShoppingBag className="w-4 h-4 text-slate-400" />
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vendor</h4>
                </div>
                <p className="font-bold text-slate-800">{transaction.vendor.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{transaction.vendor.id}</p>
              </div>
            </div>

            {/* Booking Link */}
            <div className="border border-slate-100 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Associated Booking</p>
                <p className="font-bold text-[#0A192F]">{transaction.bookingId}</p>
              </div>
              <button 
                onClick={() => onViewBooking && onViewBooking(transaction.bookingId)}
                className="flex items-center gap-1 text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] bg-[var(--color-primary)]/10 px-3 py-1.5 rounded-lg transition-colors"
              >
                View Booking <ExternalLink className="w-3 h-3" />
              </button>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-4 md:p-6 border-t border-slate-100 bg-slate-50 flex flex-wrap sm:flex-nowrap items-center justify-end gap-3 sticky bottom-0">
            {transaction.status === "paid" && (
              <button className="w-full sm:w-auto px-4 py-2.5 bg-white border border-rose-200 text-rose-600 rounded-lg text-sm font-bold hover:bg-rose-50 transition-colors">
                Issue Refund
              </button>
            )}
            <button 
              className="w-full sm:w-auto px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
              onClick={() => { window.print(); }}
            >
              <Printer className="w-4 h-4" />
              <span>Print Payment</span>
            </button>
            <button className="w-full sm:w-auto px-6 py-2.5 bg-[var(--color-primary)] text-white rounded-lg text-sm font-bold hover:bg-[var(--color-primary-dark)] shadow-sm transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              <span>Download Invoice</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
