"use client";

import { motion } from "framer-motion";
import { Check, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvailabilityHeaderProps {
  acceptingBookings: boolean;
  onToggleAccepting: (val: boolean) => void;
  onSave: () => void;
  onReset: () => void;
  isSaving: boolean;
  hasChanges: boolean;
}

export function AvailabilityHeader({ 
  acceptingBookings, 
  onToggleAccepting, 
  onSave, 
  onReset,
  isSaving,
  hasChanges 
}: AvailabilityHeaderProps) {
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
          Availability
        </h1>
        <p className="text-slate-500 font-medium text-sm">
          Set when you're available to receive and complete service bookings.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-between md:justify-end">
        
        {/* Global Toggle */}
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm cursor-pointer" onClick={() => onToggleAccepting(!acceptingBookings)}>
          <div className="flex flex-col">
            <span className={cn("text-sm font-bold", acceptingBookings ? "text-emerald-700" : "text-slate-500")}>
              {acceptingBookings ? "Accepting Bookings" : "Not Accepting Bookings"}
            </span>
          </div>
          <button
            className={cn(
              "w-12 h-6 rounded-full transition-colors relative",
              acceptingBookings ? "bg-emerald-500" : "bg-slate-200"
            )}
          >
            <motion.div 
              className="w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm"
              animate={{ left: acceptingBookings ? "26px" : "2px" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {hasChanges && (
            <button
              onClick={onReset}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          )}

          <button
            onClick={onSave}
            disabled={isSaving || !hasChanges}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-all shadow-sm shrink-0 min-w-[140px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                Saving...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
