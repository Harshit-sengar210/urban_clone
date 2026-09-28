"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, IndianRupee, Clock, Briefcase, MapPin, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { expandCollapse, shakeAnimation } from "./animations";

interface ServiceConfiguration {
  serviceId: string;
  experience: string;
  startingPrice: number | null;
  duration: string;
  serviceType: "customer_location" | "online" | "vendor_location" | "both";
}

interface ServiceConfigurationCardProps {
  name: string;
  config: ServiceConfiguration;
  onChange: (config: ServiceConfiguration) => void;
  error?: boolean;
}

export function ServiceConfigurationCard({ name, config, onChange, error }: ServiceConfigurationCardProps) {
  // Check if fully configured to show summary or expanded view
  const isConfigured = config.experience && config.startingPrice && config.duration;
  // Default to expanded if not configured
  const [isExpanded, setIsExpanded] = useState(!isConfigured);

  // Sync expanded state if error occurs
  useEffect(() => {
    if (error) setIsExpanded(true);
  }, [error]);

  const updateField = <K extends keyof ServiceConfiguration>(field: K, value: ServiceConfiguration[K]) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <motion.div
      layout
      animate={error ? shakeAnimation : {}}
      className={cn(
        "bg-white rounded-2xl border transition-all duration-300 overflow-hidden",
        error ? "border-red-400 shadow-sm shadow-red-100" : isExpanded ? "border-[var(--color-primary)] shadow-md shadow-primary/5" : "border-slate-200 hover:border-slate-300"
      )}
    >
      {/* Header (Always visible) */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-5 py-4 flex items-center justify-between outline-none"
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
            isConfigured ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"
          )}>
            {isConfigured ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-slate-400" />}
          </div>
          <div className="text-left">
            <h4 className="text-sm font-bold text-slate-800">{name}</h4>
            {!isExpanded && isConfigured && (
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                ₹{config.startingPrice} • {config.duration}
              </p>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 text-slate-400"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      {/* Expanded Configuration Form */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            variants={expandCollapse}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="px-5 pb-5 border-t border-slate-100 pt-5 bg-slate-50/50"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Starting Price */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <IndianRupee className="w-3.5 h-3.5 text-slate-400" /> Starting Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-semibold text-sm">₹</span>
                  <input
                    type="number"
                    placeholder="999"
                    value={config.startingPrice || ""}
                    onChange={(e) => updateField("startingPrice", e.target.value ? Number(e.target.value) : null)}
                    className={cn(
                      "w-full h-11 pl-7 pr-4 rounded-xl border focus:ring-4 transition-all outline-none text-sm font-semibold",
                      error && !config.startingPrice 
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100 bg-red-50" 
                        : "border-slate-200 focus:border-[var(--color-primary)] focus:ring-primary/10 bg-white"
                    )}
                  />
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" /> Experience
                </label>
                <select
                  value={config.experience}
                  onChange={(e) => updateField("experience", e.target.value)}
                  className={cn(
                    "w-full h-11 px-3 rounded-xl border focus:ring-4 transition-all outline-none text-sm font-semibold appearance-none",
                    error && !config.experience 
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100 bg-red-50" 
                        : "border-slate-200 focus:border-[var(--color-primary)] focus:ring-primary/10 bg-white"
                  )}
                >
                  <option value="" disabled>Select experience</option>
                  <option value="Less than 1 year">Less than 1 year</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5-10 years">5-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </div>

              {/* Duration */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> Typical Duration
                </label>
                <select
                  value={config.duration}
                  onChange={(e) => updateField("duration", e.target.value)}
                  className={cn(
                    "w-full h-11 px-3 rounded-xl border focus:ring-4 transition-all outline-none text-sm font-semibold appearance-none",
                    error && !config.duration 
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100 bg-red-50" 
                        : "border-slate-200 focus:border-[var(--color-primary)] focus:ring-primary/10 bg-white"
                  )}
                >
                  <option value="" disabled>Select duration</option>
                  <option value="30 min">30 min</option>
                  <option value="1 hour">1 hour</option>
                  <option value="2 hours">2 hours</option>
                  <option value="3 hours">3 hours</option>
                  <option value="4+ hours">4+ hours</option>
                </select>
              </div>

              {/* Service Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> Service Location
                </label>
                <select
                  value={config.serviceType}
                  onChange={(e) => updateField("serviceType", e.target.value as any)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-primary/10 bg-white transition-all outline-none text-sm font-semibold appearance-none"
                >
                  <option value="customer_location">At Customer Location</option>
                  <option value="vendor_location">At My Location</option>
                  <option value="online">Online</option>
                  <option value="both">Both</option>
                </select>
              </div>

            </div>

            {/* Configured Status feedback */}
            <div className="mt-5 flex justify-end">
              <button 
                type="button" 
                onClick={() => setIsExpanded(false)}
                className="text-xs font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-4 py-2 rounded-lg hover:bg-[var(--color-primary)]/20 transition-colors"
              >
                Done
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
