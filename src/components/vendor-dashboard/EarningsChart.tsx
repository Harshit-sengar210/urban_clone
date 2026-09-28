"use client";

import { motion } from "framer-motion";
import { ChevronDown, TrendingUp } from "lucide-react";
import { EarningsData } from "@/types/vendor";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export function EarningsChart({ data }: { data: EarningsData }) {
  const maxAmount = Math.max(...data.weeklyData.map(d => d.amount), 4000); // Baseline max of 4000

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            Earnings Overview
          </h3>
          <div className="flex items-end gap-3 mt-4">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {formatCurrency(data.total)}
            </span>
            <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">{data.percentageChange}%</span>
            </div>
          </div>
          <span className="text-xs text-slate-500 font-medium">vs last week</span>
        </div>
        
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
          This Week <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 min-h-[200px] flex items-end gap-2 sm:gap-4 mt-auto pt-6">
        {data.weeklyData.map((day, i) => {
          const heightPercent = Math.max((day.amount / maxAmount) * 100, 4); // Min 4% height for visibility
          return (
            <div key={day.day} className="flex-1 flex flex-col items-center justify-end group">
              {/* Tooltip on hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity mb-2 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap z-10 pointer-events-none transform translate-y-2 group-hover:translate-y-0 duration-200">
                {formatCurrency(day.amount)}
              </div>
              
              {/* Bar */}
              <div className="w-full max-w-[40px] bg-slate-100 rounded-t-lg relative overflow-hidden flex justify-end flex-col h-[150px]">
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: `${heightPercent}%` }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
                  className="w-full bg-indigo-500 rounded-t-lg"
                />
              </div>
              
              {/* Label */}
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-3">
                {day.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
