"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DateTimeSelectionProps {
  selectedDate: string;
  selectedTime: string;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
}

export function DateTimeSelection({ selectedDate, selectedTime, onDateSelect, onTimeSelect }: DateTimeSelectionProps) {
  // Mock dates for next 7 days
  const getNextDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      
      const isToday = i === 0;
      const isTomorrow = i === 1;
      
      let dayName = nextDate.toLocaleDateString('en-US', { weekday: 'short' });
      if (isToday) dayName = "Today";
      if (isTomorrow) dayName = "Tmrw";
      
      days.push({
        fullDate: nextDate.toISOString().split('T')[0],
        dayName,
        dateNum: nextDate.getDate()
      });
    }
    return days;
  };

  const dates = getNextDays();
  
  const timeSlots = {
    Morning: ["09:00 AM", "10:00 AM", "11:00 AM"],
    Afternoon: ["12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM"],
    Evening: ["04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"]
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">Choose date</h2>
        
        <div className="relative flex items-center">
          <button className="w-8 h-8 rounded-full bg-white border border-[var(--color-border)] shadow-sm flex items-center justify-center shrink-0 z-10 -mr-4 hover:bg-[var(--color-surface-hover)]">
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="flex gap-3 overflow-x-auto hide-scrollbar px-6 py-2 w-full">
            {dates.map((date) => {
              const isSelected = selectedDate === date.fullDate;
              return (
                <button
                  key={date.fullDate}
                  onClick={() => onDateSelect(date.fullDate)}
                  className={cn(
                    "flex flex-col items-center justify-center min-w-[70px] h-[90px] rounded-2xl border transition-all shrink-0",
                    isSelected
                      ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-lg shadow-primary/20"
                      : "bg-white text-[var(--color-foreground)] border-[var(--color-border)] hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-surface-hover)]"
                  )}
                >
                  <span className={cn("text-xs font-semibold mb-1 uppercase tracking-wider", isSelected ? "text-white/90" : "text-[var(--color-muted)]")}>
                    {date.dayName}
                  </span>
                  <span className="text-2xl font-bold">{date.dateNum}</span>
                </button>
              );
            })}
          </div>
          
          <button className="w-8 h-8 rounded-full bg-white border border-[var(--color-border)] shadow-sm flex items-center justify-center shrink-0 z-10 -ml-4 hover:bg-[var(--color-surface-hover)]">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">Choose time</h2>
        
        <div className="space-y-6">
          {Object.entries(timeSlots).map(([period, slots]) => (
            <div key={period}>
              <h3 className="text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-3">{period}</h3>
              <div className="flex flex-wrap gap-3">
                {slots.map(time => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      onClick={() => onTimeSelect(time)}
                      className={cn(
                        "px-5 py-3 rounded-xl border font-semibold text-sm transition-all",
                        isSelected
                          ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md shadow-primary/20"
                          : "bg-white text-[var(--color-foreground)] border-[var(--color-border)] hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-surface-hover)]"
                      )}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
