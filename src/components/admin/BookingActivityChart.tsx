"use client";

import { motion } from "framer-motion";
import type { BookingActivityData } from "@/data/adminDashboardData";

export function BookingActivityChart({ data }: { data: BookingActivityData[] }) {
  const maxBookings = Math.max(...data.map(d => d.bookings));
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 lg:p-8 flex flex-col h-full"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-lg font-bold text-[#0A192F]">Booking Activity</h3>
          <p className="text-sm text-slate-500 mt-1">Booking volume over the selected period</p>
        </div>
        
        <div className="flex p-1 bg-slate-50 rounded-lg border border-slate-100">
          {["Bookings", "Completed", "Cancelled"].map((tab, i) => (
            <button 
              key={tab}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                i === 0 
                  ? "bg-white text-[#0A192F] shadow-sm border border-slate-200/50" 
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      {/* Simple lightweight bar chart visualization */}
      <div className="flex-1 mt-auto flex items-end justify-between gap-2 sm:gap-4 h-48 relative">
        {/* Horizontal grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="w-full border-t border-slate-100 border-dashed" />
          ))}
        </div>
        
        {data.map((item, i) => {
          const height = `${(item.bookings / maxBookings) * 100}%`;
          return (
            <div key={item.day} className="relative flex flex-col items-center gap-3 h-full justify-end group z-10 w-full">
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height }}
                transition={{ duration: 0.8, delay: 0.4 + (i * 0.05), type: "spring", damping: 15 }}
                className="w-full max-w-[48px] bg-slate-100 rounded-t-lg group-hover:bg-[var(--color-primary)] transition-colors relative"
              >
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0A192F] text-white text-[10px] font-bold px-2.5 py-1.5 rounded-md pointer-events-none whitespace-nowrap shadow-lg">
                  {item.bookings} Bookings
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#0A192F]" />
                </div>
              </motion.div>
              <span className="text-xs font-medium text-slate-400 group-hover:text-slate-900 transition-colors">
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
