"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, MapPin, Phone, MessageSquare, AlertCircle } from "lucide-react";
import type { AdminBooking } from "@/data/adminBookingsData";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  accepted: "bg-blue-50 text-blue-700 border-blue-200",
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  service_started: "bg-indigo-50 text-indigo-700 border-indigo-200",
  completed: "bg-teal-50 text-teal-700 border-teal-200",
  cancelled: "bg-slate-100 text-slate-700 border-slate-300",
  rejected: "bg-rose-50 text-rose-700 border-rose-200",
  no_show: "bg-orange-50 text-orange-700 border-orange-200",
};

export function BookingDetailsDrawer({
  booking,
  onClose,
}: {
  booking: AdminBooking | null;
  onClose: () => void;
}) {
  if (!booking) return null;

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
                <h2 className="text-lg font-bold text-[#0A192F]">#{booking.id}</h2>
                <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border ${STATUS_COLORS[booking.status]}`}>
                  {booking.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-slate-500">Booked on {booking.createdAt}</p>
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
            
            {/* Service & Schedule */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-5">
              <h3 className="text-sm font-bold text-[#0A192F] mb-4">Service Details</h3>
              <div className="flex justify-between items-start mb-4 pb-4 border-b border-slate-200">
                <div>
                  <p className="font-bold text-slate-800">{booking.service.serviceName}</p>
                  <p className="text-sm text-slate-500 mt-1">{booking.service.packageName}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-800">₹{booking.pricing.total}</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mt-1">{booking.paymentStatus}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date</p>
                    <p className="text-sm font-medium text-slate-800">{booking.bookingDate}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Time</p>
                    <p className="text-sm font-medium text-slate-800">{booking.bookingTime}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="border border-slate-100 rounded-xl p-5">
              <h3 className="text-sm font-bold text-[#0A192F] mb-4">Customer Info</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-slate-800">{booking.customer.name}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Phone className="w-4 h-4 text-slate-400" />
                  {booking.customer.phone}
                </div>
                <div className="flex items-start gap-2 text-sm text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <span>{booking.address}</span>
                </div>
              </div>
            </div>

            {/* Vendor Details */}
            <div className="border border-slate-100 rounded-xl p-5">
              <h3 className="text-sm font-bold text-[#0A192F] mb-4">Assigned Professional</h3>
              {booking.vendor ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-800">{booking.vendor.name}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                      <Phone className="w-4 h-4 text-slate-400" />
                      {booking.vendor.phone}
                    </div>
                  </div>
                  <button className="p-2 text-[var(--color-primary)] bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20 rounded-lg transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-3 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium">
                  <AlertCircle className="w-5 h-5" />
                  No professional assigned yet.
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="border border-slate-100 rounded-xl p-5">
              <h3 className="text-sm font-bold text-[#0A192F] mb-4">Payment Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>₹{booking.pricing.basePrice}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Taxes</span>
                  <span>₹{booking.pricing.tax}</span>
                </div>
                {booking.pricing.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount</span>
                    <span>-₹{booking.pricing.discount}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-slate-800 pt-2 border-t border-slate-100 mt-2">
                  <span>Total Amount</span>
                  <span>₹{booking.pricing.total}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-4 md:p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3 sticky bottom-0">
            {booking.status !== "cancelled" && booking.status !== "completed" && (
              <button className="px-4 py-2.5 bg-white border border-rose-200 text-rose-600 rounded-lg text-sm font-bold hover:bg-rose-50 transition-colors">
                Cancel Booking
              </button>
            )}
            <button className="px-6 py-2.5 bg-[var(--color-primary)] text-white rounded-lg text-sm font-bold hover:bg-[var(--color-primary-dark)] shadow-sm transition-colors flex items-center gap-2">
              Edit Details
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
