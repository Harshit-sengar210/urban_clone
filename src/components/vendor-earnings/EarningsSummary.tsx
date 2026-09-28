"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { IndianRupee, TrendingUp, Clock, Wallet } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EarningsSummary as EarningsSummaryType } from "@/types/vendor";
import { cn } from "@/lib/utils";

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

// CountUp Component
function CountUp({ to, formatString }: { to: number; formatString: (val: number) => string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let startTimestamp: number | null = null;
    const duration = 1500; // ms

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * to));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(to);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [to, inView]);

  return <span ref={ref}>{formatString(count)}</span>;
}

export function EarningsSummary({ summary }: { summary: EarningsSummaryType }) {
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const cards = [
    {
      title: "Total Earnings",
      value: summary.totalEarnings,
      change: "All-time earnings",
      icon: IndianRupee,
      color: "text-slate-700",
      bg: "bg-slate-100",
      border: "border-slate-200",
    },
    {
      title: "This Month",
      value: summary.monthlyEarnings,
      change: "↑ 12.4% vs prev. month",
      changeColor: "text-emerald-600",
      icon: TrendingUp,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
    },
    {
      title: "Pending Earnings",
      value: summary.pendingEarnings,
      change: "Awaiting completion",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
    },
    {
      title: "Available for Payout",
      value: summary.availableForPayout,
      change: "Ready for payout",
      icon: Wallet,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    }
  ];

  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {cards.map((card, i) => (
        <motion.div 
          key={i}
          variants={staggerItem}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className={cn(
            "bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md transition-all group relative overflow-hidden",
            card.border
          )}
        >
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-slate-50/50 -z-10" />

          <div className="flex justify-between items-start mb-4">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3", card.bg, card.color)}>
              <card.icon className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{card.title}</p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              <CountUp to={card.value} formatString={formatCurrency} />
            </h3>
            <p className={cn("text-xs mt-2 font-medium", card.changeColor || "text-slate-400")}>
              {card.change}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
