"use client";

import { motion } from "framer-motion";
import { Calendar, CreditCard, RefreshCcw, Wrench, User, MessageSquareText, ArrowRight } from "lucide-react";

interface SupportQuickActionsProps {
  onActionClick: (category: string) => void;
}

export function SupportQuickActions({ onActionClick }: SupportQuickActionsProps) {
  const ACTIONS = [
    { id: "booking",  title: "Booking Issue",      desc: "Manage or report booking problems", icon: Calendar, color: "text-blue-500", bg: "bg-blue-50" },
    { id: "payment",  title: "Payment Issue",      desc: "Failed payments or charges",        icon: CreditCard, color: "text-amber-500", bg: "bg-amber-50" },
    { id: "refund",   title: "Refund Request",     desc: "Track or request a refund",         icon: RefreshCcw, color: "text-green-500", bg: "bg-green-50" },
    { id: "service",  title: "Service Issue",      desc: "Quality or damage concerns",        icon: Wrench,     color: "text-purple-500", bg: "bg-purple-50" },
    { id: "pro",      title: "Professional Issue", desc: "Late arrivals or behavior",         icon: User,       color: "text-indigo-500", bg: "bg-indigo-50" },
    { id: "other",    title: "Other",              desc: "General queries and issues",        icon: MessageSquareText, color: "text-slate-500", bg: "bg-slate-50" },
  ];

  return (
    <div className="mb-12">
      <h2 className="text-lg font-bold text-[var(--color-foreground)] mb-5">What do you need help with?</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {ACTIONS.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onActionClick(a.id)}
            className="group cursor-pointer bg-white border border-[var(--color-border)] rounded-2xl p-5 hover:border-[var(--color-primary)]/50 hover:shadow-md transition-all flex flex-col"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${a.bg}`}>
              <a.icon className={`w-5 h-5 ${a.color}`} />
            </div>
            <h3 className="font-bold text-[var(--color-foreground)] text-sm mb-1">{a.title}</h3>
            <p className="text-xs text-[var(--color-muted)] font-medium mb-4">{a.desc}</p>
            <div className="mt-auto flex items-center text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
              Get Help <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
