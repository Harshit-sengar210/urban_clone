"use client";

import { motion } from "framer-motion";
import { Star, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceSummaryCardProps {
  category: string;
  name: string;
  rating: number;
  reviewCount: number;
  description: string;
  startingPrice: number;
  duration: string;
  onBookNow: () => void;
  onViewPackages: () => void;
}

export function ServiceSummaryCard({
  category,
  name,
  rating,
  reviewCount,
  description,
  startingPrice,
  duration,
  onBookNow,
  onViewPackages
}: ServiceSummaryCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white rounded-[28px] p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100/50 relative"
    >
      <div className="text-xs font-bold tracking-wider text-[var(--color-primary)] uppercase mb-3">
        {category}
      </div>
      
      <h1 className="text-3xl lg:text-4xl font-bold text-[#0A192F] mb-4">
        {name}
      </h1>
      
      <div className="flex items-center gap-3 text-sm mb-6">
        <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-md">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="font-bold text-amber-700">{rating}</span>
        </div>
        <span className="text-slate-500 underline decoration-slate-300 underline-offset-4 cursor-pointer hover:text-slate-900 transition-colors">
          {reviewCount.toLocaleString()}+ reviews
        </span>
      </div>
      
      <p className="text-slate-600 leading-relaxed mb-8">
        {description}
      </p>
      
      <div className="flex items-end gap-2 mb-6">
        <span className="text-3xl font-bold text-[#0A192F]">₹{startingPrice}</span>
        <span className="text-slate-500 font-medium mb-1 line-through">₹{Math.round(startingPrice * 1.3)}</span>
      </div>
      
      <div className="flex items-center gap-4 text-sm font-medium text-slate-700 mb-8 bg-slate-50 p-3 rounded-xl border border-slate-100">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-indigo-500" />
          <span>{duration}</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-slate-300" />
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>Available today</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-3">
        <Button onClick={onBookNow} className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all">
          Book Now
        </Button>
        <Button onClick={onViewPackages} variant="outline" className="w-full h-14 rounded-2xl text-lg font-bold border-slate-200 text-slate-700 hover:bg-slate-50 transition-all">
          View Packages
        </Button>
      </div>
    </motion.div>
  );
}
