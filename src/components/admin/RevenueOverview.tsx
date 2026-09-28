"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { RevenueData } from "@/data/adminDashboardData";

export function RevenueOverview({ data }: { data: RevenueData }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 lg:p-8 flex flex-col h-full"
    >
      <div className="mb-8">
        <h3 className="text-lg font-bold text-[#0A192F]">Revenue Overview</h3>
        <p className="text-sm text-slate-500 mt-1">Revenue performance</p>
      </div>

      <div className="mb-8">
        <p className="text-sm font-medium text-slate-500 mb-1">This Month</p>
        <div className="flex items-end gap-3">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0A192F] tracking-tight">{data.thisMonth}</h2>
          <div className="flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-md text-emerald-700 bg-emerald-50 mb-1">
            <ArrowUpRight className="w-4 h-4" />
            {data.change}%
          </div>
        </div>
      </div>

      <div className="mt-auto space-y-4">
        {/* Progress Bar Visualization */}
        <div className="w-full h-3 flex rounded-full overflow-hidden mb-6">
          <div className="bg-[var(--color-primary)] h-full" style={{ width: '80%' }} />
          <div className="bg-amber-400 h-full" style={{ width: '15%' }} />
          <div className="bg-rose-400 h-full" style={{ width: '5%' }} />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]" />
              <span className="text-sm text-slate-600 font-medium">Completed Services</span>
            </div>
            <span className="text-sm font-bold text-[#0A192F]">{data.breakdown.completedServices}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="text-sm text-slate-600 font-medium">Pending Payments</span>
            </div>
            <span className="text-sm font-bold text-[#0A192F]">{data.breakdown.pendingPayments}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <span className="text-sm text-slate-600 font-medium">Refunds</span>
            </div>
            <span className="text-sm font-bold text-[#0A192F]">{data.breakdown.refunds}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
