"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Grid2X2, IndianRupee } from "lucide-react";
import { VendorService } from "@/types/vendor";

interface ServiceStatsProps {
  services: VendorService[];
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

export function ServiceStats({ services }: ServiceStatsProps) {
  const activeCount = services.filter(s => s.status === "active").length;
  const inactiveCount = services.filter(s => s.status === "inactive").length;
  const categoriesCount = new Set(services.map(s => s.categoryId)).size;
  
  const avgPrice = services.length > 0 
    ? services.reduce((acc, curr) => acc + curr.startingPrice, 0) / services.length 
    : 0;

  const cards = [
    {
      title: "Active Services",
      value: activeCount,
      change: "Currently available",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Inactive Services",
      value: inactiveCount,
      change: "Not available for booking",
      icon: XCircle,
      color: "text-slate-500",
      bg: "bg-slate-100",
    },
    {
      title: "Service Categories",
      value: categoriesCount,
      change: "Unique categories",
      icon: Grid2X2,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      title: "Avg Starting Price",
      value: formatCurrency(Math.round(avgPrice)),
      change: "Across all services",
      icon: IndianRupee,
      color: "text-purple-600",
      bg: "bg-purple-50",
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
            <p className="text-xs mt-2 text-slate-400 font-medium">
              {card.change}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
