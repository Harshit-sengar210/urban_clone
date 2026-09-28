"use client";

import { motion } from "framer-motion";
import { PlusCircle, UserPlus, Tag, List, ChevronRight } from "lucide-react";
import type { QuickAction } from "@/data/adminDashboardData";
import Link from "next/link";

const iconMap: Record<string, React.ElementType> = {
  PlusCircle,
  UserPlus,
  Tag,
  List
};

export function QuickActions({ actions }: { actions: QuickAction[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.75 }}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full"
    >
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-lg font-bold text-[#0A192F]">Quick Actions</h3>
      </div>

      <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
        {actions.map((action, i) => {
          const Icon = iconMap[action.icon] || PlusCircle;
          
          return (
            <Link key={action.id} href={action.action}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 + (i * 0.1) }}
                className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-[var(--color-primary)]/30 hover:shadow-md transition-all duration-300 group cursor-pointer h-full"
              >
                <div className="mt-0.5 w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0 pr-2">
                  <h4 className="text-sm font-bold text-[#0A192F] mb-1 group-hover:text-[var(--color-primary)] transition-colors">{action.label}</h4>
                  <p className="text-[11px] text-slate-500 leading-tight">{action.description}</p>
                </div>
                <div className="flex-shrink-0 self-center">
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[var(--color-primary)] transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" />
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
