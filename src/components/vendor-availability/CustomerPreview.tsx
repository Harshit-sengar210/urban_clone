"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Eye, ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin } from "lucide-react";
import { AvailabilitySettings, DayOfWeek } from "@/types/vendor";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CustomerPreviewProps {
  settings: AvailabilitySettings;
}

export function CustomerPreview({ settings }: CustomerPreviewProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Quick hack to generate calendar days for the current month
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday
  
  // Adjust so Monday is 0
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  
  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const day = i - startOffset + 1;
    return new Date(year, month, day);
  });

  const nextMonth = () => setSelectedDate(new Date(year, month + 1, 1));
  const prevMonth = () => setSelectedDate(new Date(year, month - 1, 1));

  // Determine if a date is available
  const isDateAvailable = (date: Date) => {
    if (!settings.acceptingBookings) return false;
    
    // Check time off
    const dateStr = date.toISOString().split('T')[0];
    const isTimeOff = settings.timeOff.some(t => dateStr >= t.startDate && dateStr <= t.endDate);
    if (isTimeOff) return false;

    // Check same-day policy
    const today = new Date();
    today.setHours(0,0,0,0);
    const isToday = date.getTime() === today.getTime();
    if (isToday && !settings.allowSameDayBookings) return false;

    // Check advance window
    const diffDays = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays > settings.advanceBookingDays) return false;
    if (diffDays < 0) return false; // past dates

    // Check weekly schedule
    const days: DayOfWeek[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const dayName = days[date.getDay()];
    
    const daySchedule = settings.weeklySchedule.find(s => s.day === dayName);
    return daySchedule?.enabled && daySchedule.ranges.length > 0;
  };

  // Generate mock slots for selected date
  const generateSlots = (date: Date) => {
    if (!isDateAvailable(date)) return [];
    
    const days: DayOfWeek[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const dayName = days[date.getDay()];
    const daySchedule = settings.weeklySchedule.find(s => s.day === dayName);
    
    if (!daySchedule || !daySchedule.enabled) return [];

    const slots: string[] = [];
    
    daySchedule.ranges.forEach(range => {
      let [h, m] = range.start.split(':').map(Number);
      const [eh, em] = range.end.split(':').map(Number);
      
      const endMins = eh * 60 + em;
      
      while (h * 60 + m < endMins) {
        // Skip if in break
        let inBreak = false;
        daySchedule.breaks.forEach(b => {
          const [bh, bm] = b.start.split(':').map(Number);
          const [beh, bem] = b.end.split(':').map(Number);
          const currentMins = h * 60 + m;
          if (currentMins >= (bh * 60 + bm) && currentMins < (beh * 60 + bem)) {
            inBreak = true;
          }
        });

        if (!inBreak) {
          const ampm = h >= 12 ? 'PM' : 'AM';
          const dh = h % 12 || 12;
          const dm = m.toString().padStart(2, '0');
          slots.push(`${dh}:${dm} ${ampm}`);
        }

        m += 60; // 1 hr slots for demo
        if (m >= 60) {
          h++;
          m = 0;
        }
      }
    });

    return slots;
  };

  const currentSlots = generateSlots(selectedDate);

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden h-full flex flex-col relative text-white">
      {/* Badge */}
      <div className="absolute top-4 right-4 bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 z-10 border border-indigo-500/30">
        <Eye className="w-3.5 h-3.5" /> Customer Preview
      </div>

      {/* App Header Mock */}
      <div className="p-6 pb-4 border-b border-slate-800">
        <h2 className="text-xl font-bold mb-1">Book Service</h2>
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
          <MapPin className="w-3.5 h-3.5" /> Harsh Electricals & Maintenance
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col">
        
        {/* Calendar Nav */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-800 transition-colors"><ChevronLeft className="w-5 h-5 text-slate-400" /></button>
          <div className="font-bold">
            {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </div>
          <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-800 transition-colors"><ChevronRight className="w-5 h-5 text-slate-400" /></button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs font-bold text-slate-500">
          <div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div><div>Su</div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((date, i) => {
            const isCurrentMonth = date.getMonth() === month;
            const available = isDateAvailable(date);
            const isSelected = date.getTime() === selectedDate.getTime();

            return (
              <button
                key={i}
                onClick={() => isCurrentMonth && setSelectedDate(date)}
                disabled={!isCurrentMonth}
                className={cn(
                  "aspect-square rounded-full flex items-center justify-center text-sm transition-all relative",
                  !isCurrentMonth && "opacity-0 cursor-default",
                  isCurrentMonth && !available && "text-slate-600 hover:bg-slate-800",
                  isCurrentMonth && available && !isSelected && "text-white font-bold hover:bg-slate-800",
                  isCurrentMonth && isSelected && "bg-indigo-600 text-white font-black shadow-lg shadow-indigo-600/30"
                )}
              >
                {date.getDate()}
                {isCurrentMonth && available && !isSelected && (
                  <div className="absolute bottom-1 w-1 h-1 bg-indigo-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Time Slots */}
        <div className="mt-8 flex-1">
          <div className="flex items-center gap-2 mb-4">
            <CalendarIcon className="w-4 h-4 text-slate-400" />
            <h3 className="font-bold text-slate-300 text-sm">
              Available Times
            </h3>
          </div>

          <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 min-h-[160px]">
            <AnimatePresence mode="wait">
              {!settings.acceptingBookings ? (
                <motion.div key="not-accepting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center h-32 text-slate-500 text-sm text-center">
                  Currently not accepting new bookings.
                </motion.div>
              ) : currentSlots.length > 0 ? (
                <motion.div key="slots" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-2 gap-2">
                  {currentSlots.map((slot, i) => (
                    <button key={i} className="py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-indigo-600 hover:border-indigo-500 transition-colors text-sm font-bold shadow-sm">
                      {slot}
                    </button>
                  ))}
                </motion.div>
              ) : (
                <motion.div key="no-slots" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center h-32 text-slate-500 text-sm text-center">
                  No slots available on this date.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
