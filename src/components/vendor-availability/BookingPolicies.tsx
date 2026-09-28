"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Timer, Layers, Zap, CalendarClock } from "lucide-react";
import { AvailabilitySettings } from "@/types/vendor";
import { cn } from "@/lib/utils";

interface BookingPoliciesProps {
  settings: AvailabilitySettings;
  onChange: (settings: AvailabilitySettings) => void;
}

export function BookingPolicies({ settings, onChange }: BookingPoliciesProps) {
  
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden h-full">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-900">Booking Policies</h2>
        <p className="text-sm text-slate-500 mt-1">Control how and when customers can book.</p>
      </div>

      <div className="p-6 md:p-8 space-y-8 divide-y divide-slate-100">
        
        {/* Booking Buffer */}
        <div className="pb-8">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <Timer className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 mb-1">Booking Buffer</h3>
              <p className="text-sm text-slate-500 mb-4">Add time between bookings for travel or prep.</p>
              
              <div className="flex flex-wrap gap-2">
                {[0, 15, 30, 45, 60].map(val => (
                  <button
                    key={val}
                    onClick={() => onChange({ ...settings, bookingBufferMinutes: val })}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-bold transition-all border",
                      settings.bookingBufferMinutes === val
                        ? "bg-amber-50 border-amber-200 text-amber-700 shadow-sm"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    {val === 0 ? "No Buffer" : `${val} min`}
                  </button>
                ))}
              </div>
              
              {settings.bookingBufferMinutes > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-slate-500 flex items-center gap-1 overflow-hidden"
                >
                  <div className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-700">Booking 1</div>
                  <div className="flex-1 border-t-2 border-dashed border-amber-200 mx-2 relative">
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] text-amber-600 bg-slate-50 px-1">{settings.bookingBufferMinutes}m</span>
                  </div>
                  <div className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-700">Booking 2</div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Max Bookings per day */}
        <div className="py-8">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Daily Booking Limit</h3>
                  <p className="text-sm text-slate-500">Limit how many services you can accept in one day.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white border border-slate-200 rounded-xl shadow-sm p-1">
                  <button 
                    onClick={() => onChange({ ...settings, maxBookingsPerDay: Math.max(1, settings.maxBookingsPerDay - 1) })}
                    className="w-10 h-10 rounded-lg hover:bg-slate-50 flex items-center justify-center text-xl font-bold text-slate-600"
                  >
                    -
                  </button>
                  <div className="w-12 text-center font-black text-lg text-slate-900">
                    {settings.maxBookingsPerDay}
                  </div>
                  <button 
                    onClick={() => onChange({ ...settings, maxBookingsPerDay: Math.min(20, settings.maxBookingsPerDay + 1) })}
                    className="w-10 h-10 rounded-lg hover:bg-slate-50 flex items-center justify-center text-xl font-bold text-slate-600"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm font-bold text-slate-500">Maximum bookings per day</span>
              </div>
            </div>
          </div>
        </div>

        {/* Same-day Bookings */}
        <div className="py-8">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Same-Day Bookings</h3>
                  <p className="text-sm text-slate-500">Allow customers to request services for today.</p>
                </div>
                <button
                  onClick={() => onChange({ ...settings, allowSameDayBookings: !settings.allowSameDayBookings })}
                  className={cn(
                    "w-12 h-6 rounded-full transition-colors relative shrink-0",
                    settings.allowSameDayBookings ? "bg-purple-500" : "bg-slate-200"
                  )}
                >
                  <motion.div 
                    className="w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm"
                    animate={{ left: settings.allowSameDayBookings ? "26px" : "2px" }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              <AnimatePresence>
                {settings.allowSameDayBookings && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2 mt-4"
                  >
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Minimum Notice</label>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 4, 6].map(hours => (
                        <button
                          key={hours}
                          onClick={() => onChange({ ...settings, minimumNoticeHours: hours })}
                          className={cn(
                            "px-4 py-2 rounded-xl text-sm font-bold transition-all border",
                            settings.minimumNoticeHours === hours
                              ? "bg-purple-50 border-purple-200 text-purple-700 shadow-sm"
                              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                          )}
                        >
                          {hours} hour{hours > 1 ? 's' : ''}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Advance Booking Window */}
        <div className="pt-8">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
              <CalendarClock className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 mb-1">Advance Booking Window</h3>
              <p className="text-sm text-slate-500 mb-4">How far in advance customers can book you.</p>
              
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {[7, 14, 30, 60, 90].map(days => (
                  <button
                    key={days}
                    onClick={() => onChange({ ...settings, advanceBookingDays: days })}
                    className={cn(
                      "px-2 py-3 rounded-xl text-sm font-bold transition-all border text-center",
                      settings.advanceBookingDays === days
                        ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    {days} days
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
