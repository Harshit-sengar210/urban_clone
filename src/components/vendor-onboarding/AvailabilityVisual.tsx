"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Clock, CalendarDays, Timer, ShieldCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvailabilityDay {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
}

interface AvailabilityVisualProps {
  schedule: AvailabilityDay[];
  weeklyHours: number;
  isReady: boolean;
  preferences: {
    sameDay: boolean;
    autoAccept: boolean;
    maxBookings: number;
    advanceDays: number;
  };
}

export function AvailabilityVisual({
  schedule,
  weeklyHours,
  isReady,
  preferences,
}: AvailabilityVisualProps) {
  const formatTime = (time: string) => {
    if (!time) return "--:--";
    const [hours, minutes] = time.split(":");
    let h = parseInt(hours, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${minutes} ${ampm}`;
  };

  return (
    <div className="w-full h-full flex flex-col justify-center py-6 px-6 lg:px-10 bg-slate-50 relative overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-emerald-100/20 rounded-full blur-3xl pointer-events-none" />

      {/* Completion Celebration */}
      <AnimatePresence>
        {isReady && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-8 left-0 right-0 flex justify-center z-30"
          >
            <div className="bg-white px-4 py-2 rounded-full shadow-lg border border-emerald-100 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-xs font-bold text-slate-700">100% Complete</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schedule Preview Grid */}
      <div className="relative w-full max-w-[320px] mx-auto flex flex-col mb-6 mt-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
            <CalendarDays className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Weekly Schedule</h3>
            <p className="text-[10px] font-semibold text-slate-500">{weeklyHours} hours total</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 space-y-2 relative overflow-hidden z-20">
          {schedule.map((dayItem, index) => (
            <div key={dayItem.day} className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest w-12">
                {dayItem.day.slice(0, 3)}
              </span>
              
              <div className="flex-1 flex items-center gap-2">
                {dayItem.enabled ? (
                  <motion.div 
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "100%" }}
                    className="h-1.5 bg-indigo-500 rounded-full"
                  />
                ) : (
                  <div className="w-full h-1.5 bg-slate-100 rounded-full" />
                )}
              </div>
              
              <span className={cn(
                "text-[9px] font-mono font-bold w-20 text-right ml-4",
                dayItem.enabled ? "text-slate-700" : "text-slate-300"
              )}>
                {dayItem.enabled ? `${formatTime(dayItem.startTime)} - ${formatTime(dayItem.endTime)}` : "OFF"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences Summary Card */}
      <motion.div 
        layout
        className="w-full max-w-[320px] mx-auto bg-white rounded-2xl shadow-xl shadow-indigo-900/5 border border-slate-100 overflow-hidden shrink-0 z-20"
      >
        <div className="bg-slate-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Booking Preferences</span>
          </div>
          <span className={cn(
            "text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full",
            isReady ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-700 text-slate-400"
          )}>
            {isReady ? "Ready" : "Incomplete"}
          </span>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-50 pb-3">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-slate-400" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Same-Day</span>
            </div>
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-wider",
              preferences.sameDay ? "text-indigo-600" : "text-slate-400"
            )}>
              {preferences.sameDay ? "Enabled" : "Disabled"}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-50 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Advance Limit</span>
            </div>
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
              {preferences.advanceDays} Days
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-50 pb-3">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-slate-400" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Max Bookings</span>
            </div>
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
              {preferences.maxBookings} / day
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-slate-400" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Auto-Accept</span>
            </div>
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-wider",
              preferences.autoAccept ? "text-emerald-600" : "text-slate-400"
            )}>
              {preferences.autoAccept ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
