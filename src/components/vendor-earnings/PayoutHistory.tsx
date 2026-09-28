"use client";

import { motion } from "framer-motion";
import { VendorPayout, PayoutStatus } from "@/types/vendor";
import { cn } from "@/lib/utils";
import { ArrowRight, Settings } from "lucide-react";

interface PayoutHistoryProps {
  payouts: VendorPayout[];
  onViewPayout: (p: VendorPayout) => void;
  onManageSettings: () => void;
}

const statusConfig: Record<PayoutStatus, { label: string, color: string, bg: string, dot: string }> = {
  pending: { label: "Pending", color: "text-amber-700", bg: "bg-amber-100", dot: "bg-amber-500" },
  processing: { label: "Processing", color: "text-blue-700", bg: "bg-blue-100", dot: "bg-blue-500" },
  paid: { label: "Paid", color: "text-emerald-700", bg: "bg-emerald-100", dot: "bg-emerald-500" },
  failed: { label: "Failed", color: "text-red-700", bg: "bg-red-100", dot: "bg-red-500" },
  cancelled: { label: "Cancelled", color: "text-slate-700", bg: "bg-slate-100", dot: "bg-slate-500" },
};

export function PayoutHistory({ payouts, onViewPayout, onManageSettings }: PayoutHistoryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
    >
      <div className="p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Payout History</h2>
          <p className="text-sm text-slate-500 mt-1">Review your recent transfers to bank.</p>
        </div>
        <button 
          onClick={onManageSettings}
          className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-2"
        >
          <Settings className="w-4 h-4" />
          Payout Settings
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <th className="px-6 md:px-8 py-4">Payout ID</th>
              <th className="px-6 md:px-8 py-4">Date</th>
              <th className="px-6 md:px-8 py-4">Method</th>
              <th className="px-6 md:px-8 py-4">Status</th>
              <th className="px-6 md:px-8 py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((payout, i) => {
              const config = statusConfig[payout.status];
              return (
                <motion.tr
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  key={payout.id}
                  onClick={() => onViewPayout(payout)}
                  className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  <td className="px-6 md:px-8 py-4 align-middle">
                    <div className="text-sm font-bold text-slate-500 group-hover:text-slate-900 transition-colors">{payout.id}</div>
                  </td>
                  <td className="px-6 md:px-8 py-4 align-middle text-sm font-medium text-slate-900">
                    {payout.date}
                  </td>
                  <td className="px-6 md:px-8 py-4 align-middle">
                    <div className="font-bold text-slate-700 text-sm">{payout.method}</div>
                    <div className="text-xs text-slate-400">{payout.maskedAccount}</div>
                  </td>
                  <td className="px-6 md:px-8 py-4 align-middle">
                    <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full", config.bg)}>
                      <div className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
                      <span className={cn("text-[10px] font-bold uppercase tracking-wider", config.color)}>{config.label}</span>
                    </div>
                  </td>
                  <td className="px-6 md:px-8 py-4 align-middle text-right font-black text-slate-900">
                    {formatCurrency(payout.amount)}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-center">
        <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors">
          View All History <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
