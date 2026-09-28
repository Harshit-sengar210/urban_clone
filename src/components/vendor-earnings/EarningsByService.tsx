"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ServiceEarning {
  service: string;
  amount: number;
  percentage: number;
  color: string;
}

export function EarningsByService({ data }: { data: ServiceEarning[] }) {
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
      className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm"
    >
      <h2 className="text-xl font-bold text-slate-900 mb-6">Earnings by Service</h2>
      
      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-bold text-slate-700">{item.service}</span>
              <div className="text-right">
                <span className="text-sm font-black text-slate-900">{formatCurrency(item.amount)}</span>
                <span className="text-xs font-bold text-slate-400 ml-2">{item.percentage}%</span>
              </div>
            </div>
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${item.percentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                className={cn("h-full rounded-full transition-colors group-hover:opacity-80", item.color)}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
