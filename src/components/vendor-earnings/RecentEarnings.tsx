"use client";

import { motion } from "framer-motion";
import { VendorEarning, EarningStatus } from "@/types/vendor";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface RecentEarningsProps {
  earnings: VendorEarning[];
  onViewEarning: (e: VendorEarning) => void;
}

const statusConfig: Record<EarningStatus, { label: string, color: string, bg: string, dot: string }> = {
  pending: { label: "Pending", color: "text-amber-700", bg: "bg-amber-100", dot: "bg-amber-500" },
  available: { label: "Available", color: "text-blue-700", bg: "bg-blue-100", dot: "bg-blue-500" },
  paid: { label: "Paid", color: "text-emerald-700", bg: "bg-emerald-100", dot: "bg-emerald-500" },
  refunded: { label: "Refunded", color: "text-red-700", bg: "bg-red-100", dot: "bg-red-500" },
  adjusted: { label: "Adjusted", color: "text-slate-700", bg: "bg-slate-100", dot: "bg-slate-500" },
};

export function RecentEarnings({ earnings, onViewEarning }: RecentEarningsProps) {
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
      <div className="p-6 md:p-8 flex justify-between items-center border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-900">Recent Earnings</h2>
        <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors group">
          View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <th className="px-6 md:px-8 py-4">Service & Customer</th>
              <th className="px-6 md:px-8 py-4">Date</th>
              <th className="px-6 md:px-8 py-4">Status</th>
              <th className="px-6 md:px-8 py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {earnings.slice(0, 5).map((earning, i) => {
              const config = statusConfig[earning.status];
              return (
                <motion.tr
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  key={earning.id}
                  onClick={() => onViewEarning(earning)}
                  className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  <td className="px-6 md:px-8 py-4 align-middle">
                    <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{earning.serviceName}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{earning.customerName}</div>
                  </td>
                  <td className="px-6 md:px-8 py-4 align-middle text-sm font-medium text-slate-600">
                    {earning.date}
                  </td>
                  <td className="px-6 md:px-8 py-4 align-middle">
                    <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full", config.bg)}>
                      <div className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
                      <span className={cn("text-[10px] font-bold uppercase tracking-wider", config.color)}>{config.label}</span>
                    </div>
                  </td>
                  <td className="px-6 md:px-8 py-4 align-middle text-right font-black text-slate-900">
                    {formatCurrency(earning.partnerEarnings)}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
