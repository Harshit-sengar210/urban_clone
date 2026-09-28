"use client";

import { DayAvailability } from "@/types/vendor";
import { DayRow } from "./DayRow";

interface WeeklyScheduleProps {
  schedule: DayAvailability[];
  onChange: (schedule: DayAvailability[]) => void;
}

export function WeeklySchedule({ schedule, onChange }: WeeklyScheduleProps) {
  
  const updateDay = (updatedDay: DayAvailability) => {
    const newSchedule = schedule.map(d => d.day === updatedDay.day ? updatedDay : d);
    onChange(newSchedule);
  };

  const handleSetWeekdays = () => {
    const newSchedule = schedule.map(d => {
      const isWeekday = !["saturday", "sunday"].includes(d.day);
      if (isWeekday) {
        return {
          ...d,
          enabled: true,
          ranges: d.ranges.length ? d.ranges : [{ id: `r-${Date.now()}`, start: "09:00", end: "18:00" }],
          breaks: d.breaks.length ? d.breaks : [{ id: `b-${Date.now()}`, start: "13:00", end: "14:00", label: "Lunch Break" }]
        };
      }
      return d;
    });
    onChange(newSchedule);
  };

  const handleCopyMonday = () => {
    const monday = schedule.find(d => d.day === "monday");
    if (!monday) return;
    
    // In a real app we'd use the custom modal here. For simplicity in demo, we'll just apply it.
    const newSchedule = schedule.map(d => ({
      ...d,
      enabled: monday.enabled,
      ranges: JSON.parse(JSON.stringify(monday.ranges)),
      breaks: JSON.parse(JSON.stringify(monday.breaks))
    }));
    onChange(newSchedule);
  };

  const handleClearWeek = () => {
    const newSchedule = schedule.map(d => ({
      ...d,
      enabled: false,
      ranges: [],
      breaks: []
    }));
    onChange(newSchedule);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
      {/* Header & Quick Actions */}
      <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50/50">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Weekly Schedule</h2>
          <p className="text-sm text-slate-500 mt-1">Set your regular working hours.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={handleSetWeekdays} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            Set Weekdays
          </button>
          <button onClick={handleCopyMonday} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            Copy Mon to All
          </button>
          <button onClick={handleClearWeek} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors shadow-sm">
            Clear Week
          </button>
        </div>
      </div>

      {/* Days List */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-slate-100">
          {schedule.map(dayInfo => (
            <DayRow 
              key={dayInfo.day} 
              dayInfo={dayInfo} 
              onChange={updateDay} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
