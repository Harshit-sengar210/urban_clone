"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Minus, Users, UserCheck, UserPlus, UserMinus } from "lucide-react";
import type { adminUsersData } from "@/data/adminUsersData";

const iconMap: Record<string, React.ElementType> = {
  Users,
  UserCheck,
  UserPlus,
  UserMinus
};

export function UsersSummaryCards({ summary }: { summary: typeof adminUsersData.summary }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      {summary.map((stat, i) => {
        const Icon = iconMap[stat.icon] || Users;
        const isPositive = stat.trend === "up";
        const isNeutral = stat.trend === "neutral";

        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-[var(--color-primary)]/5 group-hover:text-[var(--color-primary)] transition-colors group-hover:-translate-y-0.5">
                <Icon className="w-5 h-5" />
              </div>
              
              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md ${
                isPositive ? 'text-emerald-700 bg-emerald-50' : 
                isNeutral ? 'text-slate-600 bg-slate-50' : 
                'text-rose-700 bg-rose-50'
              }`}>
                {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : 
                 isNeutral ? <Minus className="w-3.5 h-3.5" /> : 
                 <ArrowDownRight className="w-3.5 h-3.5" />}
                {stat.change}%
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-[#0A192F] tracking-tight">{stat.value}</h3>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
