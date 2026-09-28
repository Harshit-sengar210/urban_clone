"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Navigation, MapPin, Activity } from "lucide-react";
import { summaryUpdate } from "./animations";

interface ServiceAreaSummaryProps {
  city: string;
  locality: string;
  pinCode: string;
  radiusKm: number;
  additionalAreas: string[];
}

export function ServiceAreaSummary({ city, locality, pinCode, radiusKm, additionalAreas }: ServiceAreaSummaryProps) {
  const isComplete = city && locality && pinCode && radiusKm > 0;

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-4">
      {/* Status Indicator */}
      <div className="flex items-center gap-2 px-1">
        <div className={`w-2 h-2 rounded-full ${isComplete ? 'bg-green-500' : 'bg-amber-500'}`} />
        <span className={`text-xs font-bold uppercase tracking-wider ${isComplete ? 'text-green-600' : 'text-amber-600'}`}>
          {isComplete ? 'Service area configured' : 'Complete primary location'}
        </span>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
        <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600" />
        
        <div className="p-5 md:p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
              <Navigation className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Your Service Area</h3>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                {isComplete ? 'Ready to serve nearby customers' : 'Setup pending'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Primary Location */}
            <div>
              <span className="text-xs font-bold text-slate-400 block mb-1">Primary Location</span>
              <AnimatePresence mode="wait">
                {isComplete ? (
                  <motion.div key="filled" variants={summaryUpdate} initial="initial" animate="animate" exit="exit" className="text-sm font-semibold text-slate-800">
                    <p className="truncate text-base">{locality}</p>
                    <p className="text-slate-500 font-medium">{city}, {pinCode}</p>
                  </motion.div>
                ) : (
                  <motion.p key="empty" variants={summaryUpdate} initial="initial" animate="animate" exit="exit" className="text-sm font-medium text-slate-300 italic">
                    Not configured
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Radius */}
            <div>
              <span className="text-xs font-bold text-slate-400 block mb-1">Service Radius</span>
              <AnimatePresence mode="wait">
                <motion.div key={radiusKm} variants={summaryUpdate} initial="initial" animate="animate" exit="exit" className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-[var(--color-primary)]" />
                  <span className="text-sm font-extrabold text-[var(--color-primary)]">{radiusKm} km</span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Additional Areas */}
            <div>
              <span className="text-xs font-bold text-slate-400 block mb-1">Additional Areas</span>
              <AnimatePresence mode="wait">
                {additionalAreas.length > 0 ? (
                  <motion.div key={additionalAreas.length} variants={summaryUpdate} initial="initial" animate="animate" exit="exit" className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-800">{additionalAreas.length} area{additionalAreas.length > 1 ? 's' : ''}</span>
                  </motion.div>
                ) : (
                  <motion.p key="none" variants={summaryUpdate} initial="initial" animate="animate" exit="exit" className="text-sm font-medium text-slate-300">
                    None
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
