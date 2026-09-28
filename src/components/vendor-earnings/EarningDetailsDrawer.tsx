"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, Info, IndianRupee, HelpCircle } from "lucide-react";
import { VendorEarning, EarningStatus } from "@/types/vendor";
import { cn } from "@/lib/utils";

interface EarningDetailsDrawerProps {
  earning: VendorEarning | null;
  onClose: () => void;
}

const statusConfig: Record<EarningStatus, { label: string, color: string, bg: string, dot: string }> = {
  pending: { label: "Pending", color: "text-amber-700", bg: "bg-amber-100", dot: "bg-amber-500" },
  available: { label: "Available", color: "text-blue-700", bg: "bg-blue-100", dot: "bg-blue-500" },
  paid: { label: "Paid", color: "text-emerald-700", bg: "bg-emerald-100", dot: "bg-emerald-500" },
  refunded: { label: "Refunded", color: "text-red-700", bg: "bg-red-100", dot: "bg-red-500" },
  adjusted: { label: "Adjusted", color: "text-slate-700", bg: "bg-slate-100", dot: "bg-slate-500" },
};

export function EarningDetailsDrawer({ earning, onClose }: EarningDetailsDrawerProps) {
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <AnimatePresence>
      {earning && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100 bg-white">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  {earning.id}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-500 font-medium">
                    Booking: <span className="text-indigo-600 font-bold">{earning.bookingId}</span>
                  </span>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-slate-50/50">
              
              {/* Status Badge */}
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <span className="text-sm font-bold text-slate-700">Status</span>
                <div className={cn("px-3 py-1.5 rounded-full flex items-center gap-2", statusConfig[earning.status].bg)}>
                  <div className={cn("w-2 h-2 rounded-full", statusConfig[earning.status].dot)} />
                  <span className={cn("text-xs font-bold uppercase tracking-wider", statusConfig[earning.status].color)}>
                    {statusConfig[earning.status].label}
                  </span>
                </div>
              </div>

              {/* Service & Customer */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Service</h3>
                    <div className="font-bold text-slate-900">{earning.serviceName}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Customer</h3>
                    <div className="font-bold text-slate-900">{earning.customerName}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Completion Date</h3>
                    <div className="font-bold text-slate-900">{earning.date}</div>
                  </div>
                </div>
              </div>

              {/* Earnings Breakdown */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-50 to-transparent rounded-bl-full pointer-events-none" />
                
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <IndianRupee className="w-4 h-4" /> Breakdown
                </h3>
                
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600 font-medium">Gross Amount</span>
                    <span className="font-bold text-slate-900">{formatCurrency(earning.grossAmount)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-4">
                    <span className="text-slate-600 font-medium flex items-center gap-1 cursor-help group relative">
                      Platform Fee (Est.)
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                    </span>
                    <span className="font-medium text-red-500">
                      -{formatCurrency(earning.grossAmount - earning.partnerEarnings)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm font-bold text-slate-900">Partner Earnings</span>
                    <span className="text-2xl font-black text-emerald-600">
                      {formatCurrency(earning.partnerEarnings)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 text-blue-800 text-xs font-medium rounded-xl border border-blue-100 leading-relaxed">
                <strong className="font-bold block mb-1">Notice</strong>
                If this earning is pending, it will become available for payout according to your standard processing timeline (usually 1-2 business days).
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
