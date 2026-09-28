"use client";

import { motion } from "framer-motion";
import { CalendarCheck, IndianRupee, Star, AlertCircle } from "lucide-react";

interface StatsProps {
  stats: {
    totalBookings: number;
    bookingsChange: number;
    totalEarnings: number;
    averageRating: number;
    pendingBookings: number;
  };
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

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

export function DashboardStats({ stats }: StatsProps) {
  const cards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      change: `+${stats.bookingsChange} this week`,
      icon: CalendarCheck,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      changeColor: "text-emerald-600"
    },
    {
      title: "Total Earnings",
      value: formatCurrency(stats.totalEarnings),
      change: "+12% this week", // Mock stat
      icon: IndianRupee,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      changeColor: "text-emerald-600"
    },
    {
      title: "Average Rating",
      value: stats.averageRating,
      change: "8 reviews",
      icon: Star,
      color: "text-amber-500",
      bg: "bg-amber-50",
      changeColor: "text-slate-500"
    },
    {
      title: "Pending Bookings",
      value: stats.pendingBookings,
      change: "Needs your attention",
      icon: AlertCircle,
      color: "text-red-500",
      bg: "bg-red-50",
      changeColor: "text-red-500 font-medium"
    }
  ];

  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
    >
      {cards.map((card, i) => (
        <motion.div 
          key={i}
          variants={staggerItem}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${card.bg} ${card.color}`}>
              <card.icon className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{card.title}</p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{card.value}</h3>
            <p className={`text-xs mt-2 ${card.changeColor}`}>
              {card.change}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
