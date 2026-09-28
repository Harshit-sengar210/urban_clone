"use client";

import { motion } from "framer-motion";
import { AlertCircle, CalendarCheck, CheckCircle2, XCircle } from "lucide-react";

interface BookingSummaryCardsProps {
  pendingCount: number;
  confirmedCount: number;
  completedCount: number;
  cancelledCount: number;
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const staggerItem: any = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 30 }
  }
};

export function BookingSummaryCards({ 
  pendingCount, 
  confirmedCount, 
  completedCount, 
  cancelledCount 
}: BookingSummaryCardsProps) {
  
  const cards = [
    {
      title: "Pending Requests",
      value: pendingCount,
      change: "Needs your attention",
      icon: AlertCircle,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
    },
    {
      title: "Confirmed",
      value: confirmedCount,
      change: "Upcoming bookings",
      icon: CalendarCheck,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
    },
    {
      title: "Completed",
      value: completedCount,
      change: "This month",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      title: "Cancelled",
      value: cancelledCount,
      change: "This month",
      icon: XCircle,
      color: "text-slate-500",
      bg: "bg-slate-100",
      border: "border-slate-200",
    }
  ];

  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {cards.map((card, i) => (
        <motion.div 
          key={i}
          variants={staggerItem}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className={`bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md transition-all group ${card.border}`}
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${card.bg} ${card.color}`}>
              <card.icon className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{card.title}</p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{card.value}</h3>
            <p className="text-xs mt-2 text-slate-400 font-medium">
              {card.change}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
