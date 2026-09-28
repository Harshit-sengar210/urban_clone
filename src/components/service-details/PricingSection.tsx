"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

interface PricingSectionProps {
  selectedPackageName?: string;
  price: number;
}

export function PricingSection({ selectedPackageName = "Standard Service", price }: PricingSectionProps) {
  const taxes = Math.round(price * 0.18); // 18% demo tax
  const total = price + taxes;

  return (
    <div className="mt-20 mb-16 max-w-lg">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="mb-8"
      >
        <h2 className="text-2xl lg:text-3xl font-bold text-[#0A192F] mb-2">Simple, transparent pricing</h2>
        <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 w-fit px-3 py-1.5 rounded-lg mt-4">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-sm font-bold">No hidden charges</span>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.1 }}
        className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm"
      >
        <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-slate-100">
          <div className="flex justify-between items-center text-slate-700">
            <span className="font-medium">{selectedPackageName}</span>
            <span className="font-bold text-[#0A192F]">₹{price}</span>
          </div>
          <div className="flex justify-between items-center text-slate-500">
            <span>Service Charge</span>
            <span>₹0</span>
          </div>
          <div className="flex justify-between items-center text-slate-500">
            <span>Taxes & Fee (Demo)</span>
            <span>₹{taxes}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-[#0A192F]">Total</span>
          <motion.span 
            key={total}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl font-bold text-[#0A192F]"
          >
            ₹{total}
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}
