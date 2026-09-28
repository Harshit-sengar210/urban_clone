"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useState } from "react";

export function EarningsHeader() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      // In a real app this would trigger a file download.
      // We will show a toast from the parent component.
      const event = new CustomEvent("show-toast", { detail: "Statement prepared in demo mode." });
      window.dispatchEvent(event);
    }, 1200);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
          Earnings
        </h1>
        <p className="text-slate-500 font-medium text-sm">
          Track your earnings, payouts, and service income.
        </p>
      </div>

      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm disabled:opacity-70"
      >
        {isDownloading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-4 h-4 border-2 border-slate-300 border-t-slate-700 rounded-full"
          />
        ) : (
          <Download className="w-4 h-4" />
        )}
        Download Statement
      </button>
    </motion.div>
  );
}
