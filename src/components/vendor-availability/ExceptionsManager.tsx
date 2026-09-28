"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Palmtree, Plus, Trash2, CalendarX, Edit2 } from "lucide-react";
import { AvailabilitySettings, TimeOff } from "@/types/vendor";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ExceptionsManagerProps {
  settings: AvailabilitySettings;
  onChange: (settings: AvailabilitySettings) => void;
}

export function ExceptionsManager({ settings, onChange }: ExceptionsManagerProps) {
  const [isAddingTimeOff, setIsAddingTimeOff] = useState(false);
  const [newTimeOff, setNewTimeOff] = useState<Partial<TimeOff>>({ reason: "Holiday" });

  const handleAddTimeOff = () => {
    if (newTimeOff.startDate && newTimeOff.endDate) {
      const item: TimeOff = {
        id: `to-${Date.now()}`,
        startDate: newTimeOff.startDate,
        endDate: newTimeOff.endDate,
        reason: newTimeOff.reason || "Holiday",
        note: newTimeOff.note
      };
      onChange({ ...settings, timeOff: [item, ...settings.timeOff] });
      setIsAddingTimeOff(false);
      setNewTimeOff({ reason: "Holiday" });
    }
  };

  const handleRemoveTimeOff = (id: string) => {
    onChange({ ...settings, timeOff: settings.timeOff.filter(t => t.id !== id) });
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            Time Off <Palmtree className="w-5 h-5 text-emerald-500" />
          </h2>
          <p className="text-sm text-slate-500 mt-1">Temporarily block dates when you are unavailable.</p>
        </div>
        <button 
          onClick={() => setIsAddingTimeOff(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Time Off
        </button>
      </div>

      <div className="p-6 md:p-8 flex-1">
        
        <AnimatePresence>
          {isAddingTimeOff && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="bg-slate-50 p-5 rounded-2xl border border-slate-200 overflow-hidden"
            >
              <h3 className="font-bold text-slate-900 mb-4">New Time Off</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Start Date</label>
                  <input 
                    type="date"
                    value={newTimeOff.startDate || ""}
                    onChange={e => setNewTimeOff({...newTimeOff, startDate: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900 focus:ring-2 focus:ring-indigo-500/50 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">End Date</label>
                  <input 
                    type="date"
                    value={newTimeOff.endDate || ""}
                    onChange={e => setNewTimeOff({...newTimeOff, endDate: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900 focus:ring-2 focus:ring-indigo-500/50 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Reason</label>
                  <select
                    value={newTimeOff.reason}
                    onChange={e => setNewTimeOff({...newTimeOff, reason: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900 focus:ring-2 focus:ring-indigo-500/50 outline-none"
                  >
                    <option value="Holiday">Holiday</option>
                    <option value="Vacation">Vacation</option>
                    <option value="Personal">Personal</option>
                    <option value="Sick">Sick</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Note (Optional)</label>
                  <input 
                    type="text"
                    value={newTimeOff.note || ""}
                    onChange={e => setNewTimeOff({...newTimeOff, note: e.target.value})}
                    placeholder="e.g. Out of town"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900 focus:ring-2 focus:ring-indigo-500/50 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setIsAddingTimeOff(false)}
                  className="px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddTimeOff}
                  disabled={!newTimeOff.startDate || !newTimeOff.endDate}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50"
                >
                  Save Time Off
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-3">
          <AnimatePresence>
            {settings.timeOff.map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between group hover:border-emerald-200 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <CalendarX className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{item.reason}</h3>
                    <div className="text-sm text-slate-500 font-medium">
                      {new Date(item.startDate).toLocaleDateString()} — {new Date(item.endDate).toLocaleDateString()}
                    </div>
                    {item.note && <div className="text-xs text-slate-400 mt-0.5">{item.note}</div>}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleRemoveTimeOff(item.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
            
            {settings.timeOff.length === 0 && !isAddingTimeOff && (
              <div className="py-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl">
                <Palmtree className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="font-medium">No time off scheduled.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
