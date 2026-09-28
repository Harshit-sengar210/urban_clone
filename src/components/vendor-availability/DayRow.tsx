"use client";

import { DayAvailability, TimeRange, BreakTime } from "@/types/vendor";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Coffee, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DayRowProps {
  dayInfo: DayAvailability;
  onChange: (day: DayAvailability) => void;
}

export function DayRow({ dayInfo, onChange }: DayRowProps) {
  
  const handleToggle = () => {
    let newRanges = dayInfo.ranges;
    if (!dayInfo.enabled && newRanges.length === 0) {
      newRanges = [{ id: `r-${Date.now()}`, start: "09:00", end: "18:00" }];
    }
    onChange({ ...dayInfo, enabled: !dayInfo.enabled, ranges: newRanges });
  };

  const addRange = () => {
    onChange({
      ...dayInfo,
      ranges: [...dayInfo.ranges, { id: `r-${Date.now()}`, start: "09:00", end: "17:00" }]
    });
  };

  const removeRange = (id: string) => {
    onChange({
      ...dayInfo,
      ranges: dayInfo.ranges.filter(r => r.id !== id)
    });
  };

  const updateRange = (id: string, field: 'start' | 'end', value: string) => {
    onChange({
      ...dayInfo,
      ranges: dayInfo.ranges.map(r => r.id === id ? { ...r, [field]: value } : r)
    });
  };

  const addBreak = () => {
    onChange({
      ...dayInfo,
      breaks: [...dayInfo.breaks, { id: `b-${Date.now()}`, start: "13:00", end: "14:00", label: "Break" }]
    });
  };

  const removeBreak = (id: string) => {
    onChange({
      ...dayInfo,
      breaks: dayInfo.breaks.filter(b => b.id !== id)
    });
  };

  const updateBreak = (id: string, field: 'start' | 'end' | 'label', value: string) => {
    onChange({
      ...dayInfo,
      breaks: dayInfo.breaks.map(b => b.id === id ? { ...b, [field]: value } : b)
    });
  };

  // Basic validation check for display
  const validateRange = (start: string, end: string) => {
    if (!start || !end) return "Time is required";
    if (start >= end) return "End time must be after start time";
    return null;
  };

  return (
    <div className="p-4 md:p-6 hover:bg-slate-50/50 transition-colors">
      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
        
        {/* Day Header & Toggle */}
        <div className="w-40 flex items-center justify-between shrink-0 mt-2">
          <span className="font-bold text-slate-900 capitalize">{dayInfo.day}</span>
          
          <button
            onClick={handleToggle}
            className={cn(
              "w-10 h-5 rounded-full transition-colors relative",
              dayInfo.enabled ? "bg-emerald-500" : "bg-slate-200"
            )}
          >
            <motion.div 
              className="w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm"
              animate={{ left: dayInfo.enabled ? "22px" : "2px" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
        </div>

        {/* Ranges & Breaks */}
        <div className="flex-1">
          <AnimatePresence mode="popLayout">
            {!dayInfo.enabled ? (
              <motion.div 
                key="disabled"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="py-2 text-sm font-bold text-slate-400"
              >
                Not accepting bookings
              </motion.div>
            ) : (
              <motion.div 
                key="enabled"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                {/* Working Ranges */}
                <div className="space-y-3">
                  <AnimatePresence>
                    {dayInfo.ranges.map(range => {
                      const error = validateRange(range.start, range.end);
                      return (
                        <motion.div 
                          key={range.id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex flex-col sm:flex-row sm:items-center gap-3"
                        >
                          <div className="flex items-center gap-2">
                            <input 
                              type="time" 
                              value={range.start}
                              onChange={(e) => updateRange(range.id, 'start', e.target.value)}
                              className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/50 outline-none w-32"
                            />
                            <span className="text-slate-400 font-medium">—</span>
                            <input 
                              type="time" 
                              value={range.end}
                              onChange={(e) => updateRange(range.id, 'end', e.target.value)}
                              className={cn(
                                "px-3 py-2 rounded-lg border bg-white text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/50 outline-none w-32",
                                error ? "border-red-300 ring-1 ring-red-300" : "border-slate-200"
                              )}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between sm:justify-start flex-1 gap-3">
                            {error ? (
                              <span className="text-[10px] font-bold text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> {error}
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-1 rounded">Working</span>
                            )}
                            
                            <button 
                              onClick={() => removeRange(range.id)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-auto sm:ml-0"
                              aria-label="Remove time range"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Break Ranges */}
                {dayInfo.breaks.length > 0 && (
                  <div className="space-y-3 pt-3 border-t border-slate-100/50">
                    <AnimatePresence>
                      {dayInfo.breaks.map(b => {
                        const error = validateRange(b.start, b.end);
                        return (
                          <motion.div 
                            key={b.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex flex-col sm:flex-row sm:items-center gap-3"
                          >
                            <div className="flex items-center gap-2">
                              <input 
                                type="time" 
                                value={b.start}
                                onChange={(e) => updateBreak(b.id, 'start', e.target.value)}
                                className="px-3 py-2 rounded-lg border border-orange-200 bg-orange-50 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-orange-500/50 outline-none w-32"
                              />
                              <span className="text-slate-400 font-medium">—</span>
                              <input 
                                type="time" 
                                value={b.end}
                                onChange={(e) => updateBreak(b.id, 'end', e.target.value)}
                                className={cn(
                                  "px-3 py-2 rounded-lg border bg-orange-50 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-orange-500/50 outline-none w-32",
                                  error ? "border-red-300 ring-1 ring-red-300" : "border-orange-200"
                                )}
                              />
                            </div>
                            
                            <div className="flex items-center justify-between sm:justify-start flex-1 gap-3">
                              {error ? (
                                <span className="text-[10px] font-bold text-red-500 flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" /> {error}
                                </span>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider bg-orange-100/50 px-2 py-1 rounded flex items-center gap-1">
                                    <Coffee className="w-3 h-3" /> Break
                                  </span>
                                  <input 
                                    type="text" 
                                    value={b.label}
                                    onChange={(e) => updateBreak(b.id, 'label', e.target.value)}
                                    placeholder="Break name"
                                    className="bg-transparent border-none text-xs font-medium text-slate-500 w-24 focus:ring-0 px-0"
                                  />
                                </div>
                              )}
                              
                              <button 
                                onClick={() => removeBreak(b.id)}
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-auto sm:ml-0"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                )}

                {/* Add Actions */}
                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={addRange}
                    className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Hours
                  </button>
                  <button 
                    onClick={addBreak}
                    className="flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Break
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
