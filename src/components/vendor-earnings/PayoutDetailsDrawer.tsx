"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Building, Landmark, Download } from "lucide-react";
import { VendorPayout, PayoutStatus } from "@/types/vendor";
import { cn } from "@/lib/utils";

interface PayoutDetailsDrawerProps {
  payout: VendorPayout | null;
  onClose: () => void;
}

const statusConfig: Record<PayoutStatus, { label: string, color: string, bg: string, dot: string }> = {
  pending: { label: "Pending", color: "text-amber-700", bg: "bg-amber-100", dot: "bg-amber-500" },
  processing: { label: "Processing", color: "text-blue-700", bg: "bg-blue-100", dot: "bg-blue-500" },
  paid: { label: "Paid", color: "text-emerald-700", bg: "bg-emerald-100", dot: "bg-emerald-500" },
  failed: { label: "Failed", color: "text-red-700", bg: "bg-red-100", dot: "bg-red-500" },
  cancelled: { label: "Cancelled", color: "text-slate-700", bg: "bg-slate-100", dot: "bg-slate-500" },
};

export function PayoutDetailsDrawer({ payout, onClose }: PayoutDetailsDrawerProps) {
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <AnimatePresence>
      {payout && (
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
                  {payout.id}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-500 font-medium">
                    Payout Request
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
              
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <span className="text-sm font-bold text-slate-700">Status</span>
                <div className={cn("px-3 py-1.5 rounded-full flex items-center gap-2", statusConfig[payout.status].bg)}>
                  <div className={cn("w-2 h-2 rounded-full", statusConfig[payout.status].dot)} />
                  <span className={cn("text-xs font-bold uppercase tracking-wider", statusConfig[payout.status].color)}>
                    {statusConfig[payout.status].label}
                  </span>
                </div>
              </div>

              {/* Amount Highlight */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-slate-50 rounded-full mix-blend-multiply opacity-50" />
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-indigo-50 rounded-full mix-blend-multiply opacity-50" />
                
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 relative z-10">Total Payout</h3>
                <div className="text-4xl font-black text-slate-900 relative z-10">
                  {formatCurrency(payout.amount)}
                </div>
              </div>

              {/* Details */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Initiation Date</h3>
                    <div className="font-bold text-slate-900">{payout.date}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Destination</h3>
                    <div className="font-bold text-slate-900">{payout.method}</div>
                    <div className="text-sm text-slate-500">{payout.maskedAccount}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Provider ID</h3>
                    <div className="font-bold text-slate-900">UrbanClone Partner Services</div>
                  </div>
                </div>
              </div>

              {/* Download Receipt */}
              <button 
                onClick={() => {
                  const event = new CustomEvent("show-toast", { detail: "Receipt downloaded in demo mode." });
                  window.dispatchEvent(event);
                }}
                className="w-full py-4 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4" /> Download Receipt
              </button>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
