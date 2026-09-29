"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChartDataPoint {
  label: string;
  amount: number;
}

interface EarningsOverviewProps {
  data: ChartDataPoint[];
  rawEarnings?: any[];
}

export function EarningsOverview({ data, rawEarnings }: EarningsOverviewProps) {
  const [period, setPeriod] = useState("This Month");
  const periods = ["Today", "This Week", "This Month", "This Year"];

  const chartData = useMemo(() => {
    if (!rawEarnings || rawEarnings.length === 0) return data;
    
    const now = new Date();
    
    if (period === "Today") {
      const blocks = [0, 0, 0, 0, 0, 0];
      const labels = ["8 AM", "11 AM", "2 PM", "5 PM", "8 PM", "11 PM"];
      
      rawEarnings.forEach(e => {
        const d = new Date(e.date);
        if (d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()) {
           const h = d.getHours();
           let idx = 0;
           if (h >= 11 && h < 14) idx = 1;
           else if (h >= 14 && h < 17) idx = 2;
           else if (h >= 17 && h < 20) idx = 3;
           else if (h >= 20 && h < 23) idx = 4;
           else if (h >= 23 || h < 8) idx = 5;
           blocks[idx] += e.partnerEarnings;
        }
      });
      return labels.map((l, i) => ({ label: l, amount: blocks[i] }));
    } 
    
    if (period === "This Week") {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const blocks = [0, 0, 0, 0, 0, 0, 0];
      
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0,0,0,0);
      
      rawEarnings.forEach(e => {
        const d = new Date(e.date);
        if (d >= startOfWeek && d <= now) {
          blocks[d.getDay()] += e.partnerEarnings;
        }
      });
      return days.map((l, i) => ({ label: l, amount: blocks[i] }));
    }
    
    if (period === "This Year") {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const blocks = new Array(12).fill(0);
      
      rawEarnings.forEach(e => {
        const d = new Date(e.date);
        if (d.getFullYear() === now.getFullYear()) {
          blocks[d.getMonth()] += e.partnerEarnings;
        }
      });
      return months.map((l, i) => ({ label: l, amount: blocks[i] }));
    }
    
    // Default to This Month
    const blocks = [0, 0, 0, 0];
    rawEarnings.forEach(e => {
      const d = new Date(e.date);
      if (d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()) {
         const day = d.getDate();
         const weekIdx = Math.min(3, Math.floor((day - 1) / 7));
         blocks[weekIdx] += e.partnerEarnings;
      }
    });
    return [
      { label: "Week 1", amount: blocks[0] },
      { label: "Week 2", amount: blocks[1] },
      { label: "Week 3", amount: blocks[2] },
      { label: "Week 4", amount: blocks[3] }
    ];
  }, [period, rawEarnings, data]);

  // Find max for scaling the chart
  const maxAmount = Math.max(...chartData.map(d => d.amount), 1000); // 1000 min scale
  const totalAmount = chartData.reduce((sum, d) => sum + d.amount, 0);

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">Earnings Overview</h2>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-slate-500">Total:</span>
            <span className="font-black text-indigo-600">{formatCurrency(totalAmount)}</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1 text-xs bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" /> 12.4%
            </span>
          </div>
        </div>
        
        <select 
          value={period} 
          onChange={(e) => setPeriod(e.target.value)}
          className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer appearance-none min-w-[140px]"
        >
          {periods.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {/* Custom CSS Bar Chart */}
      <div className="h-64 mt-4 relative">
        {/* Y-Axis Guidelines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[4, 3, 2, 1, 0].map((step, i) => (
            <div key={i} className="flex items-end w-full h-0 border-b border-dashed border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 -translate-y-2 absolute right-0 bg-white pl-2">
                {step === 0 ? "₹0" : formatCurrency((maxAmount / 4) * step).replace("₹", "₹ ")}
              </span>
            </div>
          ))}
        </div>

        {/* Chart Bars */}
        <div className="absolute inset-0 right-16 flex items-end justify-between px-2 sm:px-6">
          {chartData.map((point, index) => {
            const heightPercent = (point.amount / maxAmount) * 100;
            return (
              <div key={index} className="flex flex-col items-center justify-end h-full group relative w-12 sm:w-16">
                
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 pointer-events-none transition-opacity z-10 flex flex-col items-center">
                  <div className="bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                    {formatCurrency(point.amount)}
                  </div>
                  <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1" />
                </div>

                {/* Animated Bar */}
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: `${heightPercent}%` }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.2 + index * 0.1, 
                    type: "spring", 
                    bounce: 0.2 
                  }}
                  className={cn(
                    "w-full rounded-t-xl bg-gradient-to-t from-indigo-500 to-indigo-400 group-hover:opacity-80 transition-opacity relative overflow-hidden",
                    // Highlight the last bar to represent 'Current'
                    index === data.length - 1 ? "from-emerald-500 to-emerald-400" : ""
                  )}
                >
                  <div className="absolute inset-0 bg-white/20 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
                
                {/* X-Axis Label */}
                <div className="absolute top-full mt-3 text-xs font-bold text-slate-400 whitespace-nowrap">
                  {point.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
