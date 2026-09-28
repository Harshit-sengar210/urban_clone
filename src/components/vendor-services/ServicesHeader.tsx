"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface ServicesHeaderProps {
  onAddService: () => void;
}

export function ServicesHeader({ onAddService }: ServicesHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
          My Services
        </h1>
        <p className="text-slate-500 font-medium text-sm">
          Manage the services you provide, pricing, availability, and service details.
        </p>
      </div>

      <button
        onClick={onAddService}
        className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all overflow-hidden shadow-lg shadow-indigo-600/20 active:scale-[0.98] shrink-0"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <Plus className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90 relative z-10" />
        <span className="relative z-10">Add New Service</span>
      </button>
    </motion.div>
  );
}
