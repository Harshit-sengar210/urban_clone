"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CalendarDays, 
  Copy, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Timer,
  Info
} from "lucide-react";

import { VendorOnboardingHeader } from "@/components/vendor-onboarding/VendorOnboardingHeader";
import { OnboardingProgress } from "@/components/vendor-onboarding/OnboardingProgress";
import { OnboardingNavigation } from "@/components/vendor-onboarding/OnboardingNavigation";
import { AvailabilityVisual } from "@/components/vendor-onboarding/AvailabilityVisual";
import { cn } from "@/lib/utils";
import {
  onboardingPageVariants, 
  staggerContainer, 
  staggerItem, 
  shakeAnimation 
} from "@/components/vendor-onboarding/animations";
import { useVendorOnboarding } from "@/contexts/vendor/VendorOnboardingProvider";


type DayOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

interface AvailabilityDay {
  day: DayOfWeek;
  enabled: boolean;
  startTime: string;
  endTime: string;
}

interface VendorAvailabilityPreferences {
  acceptSameDayRequests: boolean;
  advanceBookingDays: number;
  maxBookingsPerDay: number;
  autoAcceptBookings: boolean;
  nearbyBookingAlerts: boolean;
}

interface VendorAvailabilityData {
  weeklySchedule: AvailabilityDay[];
  preferences: VendorAvailabilityPreferences;
}

const DEFAULT_SCHEDULE: AvailabilityDay[] = [
  { day: "monday", enabled: true, startTime: "09:00", endTime: "18:00" },
  { day: "tuesday", enabled: true, startTime: "09:00", endTime: "18:00" },
  { day: "wednesday", enabled: true, startTime: "09:00", endTime: "18:00" },
  { day: "thursday", enabled: true, startTime: "09:00", endTime: "18:00" },
  { day: "friday", enabled: true, startTime: "09:00", endTime: "18:00" },
  { day: "saturday", enabled: true, startTime: "09:00", endTime: "18:00" },
  { day: "sunday", enabled: false, startTime: "09:00", endTime: "18:00" },
];

const DEFAULT_PREFERENCES: VendorAvailabilityPreferences = {
  acceptSameDayRequests: false,
  advanceBookingDays: 7,
  maxBookingsPerDay: 5,
  autoAcceptBookings: false,
  nearbyBookingAlerts: true,
};

export default function AvailabilitySetupPage() {
  const router = useRouter();
  const [schedule, setSchedule] = useState<AvailabilityDay[]>(DEFAULT_SCHEDULE);
  const [preferences, setPreferences] = useState<VendorAvailabilityPreferences>(DEFAULT_PREFERENCES);
  const [isLoaded, setIsLoaded] = useState(false);

  const { application, loading, saveAvailability } = useVendorOnboarding();

  useEffect(() => {
    if (application?.availability) {
      if (application.availability.weeklySchedule) setSchedule(application.availability.weeklySchedule as any);
      if (application.availability.preferences) setPreferences(application.availability.preferences as any);
    }
  }, [application]);

  const [toastMessage, setToastMessage] = useState("");
  const [errors, setErrors] = useState<Partial<Record<DayOfWeek, boolean>>>({});
  const [copySourceDay, setCopySourceDay] = useState<DayOfWeek | null>(null);



  

  // Calculate Weekly Hours
  const calculateWeeklyHours = () => {
    let total = 0;
    schedule.forEach(day => {
      if (day.enabled && day.startTime && day.endTime) {
        const [startH, startM] = day.startTime.split(":").map(Number);
        const [endH, endM] = day.endTime.split(":").map(Number);
        const diffHours = (endH + endM / 60) - (startH + startM / 60);
        if (diffHours > 0) total += diffHours;
      }
    });
    return Math.round(total);
  };

  const weeklyHours = calculateWeeklyHours();

  // Validate Schedule for submission
  const validate = () => {
    let newErrors: Partial<Record<DayOfWeek, boolean>> = {};
    let isValid = true;
    let hasEnabledDay = false;

    schedule.forEach(day => {
      if (day.enabled) {
        hasEnabledDay = true;
        const [startH, startM] = day.startTime.split(":").map(Number);
        const [endH, endM] = day.endTime.split(":").map(Number);
        const diffHours = (endH + endM / 60) - (startH + startM / 60);
        if (diffHours <= 0) {
          newErrors[day.day] = true;
          isValid = false;
        }
      }
    });

    if (!hasEnabledDay) {
      setToastMessage("Please enable at least one available day.");
      return false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Pure check for UI ready state
  const checkIsReady = () => {
    let hasEnabledDay = false;
    let hasErrors = false;
    schedule.forEach(day => {
      if (day.enabled) {
        hasEnabledDay = true;
        const [startH, startM] = day.startTime.split(":").map(Number);
        const [endH, endM] = day.endTime.split(":").map(Number);
        const diffHours = (endH + endM / 60) - (startH + startM / 60);
        if (diffHours <= 0) hasErrors = true;
      }
    });
    return hasEnabledDay && !hasErrors;
  };

  const isReady = checkIsReady();

  const handleUpdateDay = (dayName: DayOfWeek, updates: Partial<AvailabilityDay>) => {
    setSchedule(prev => prev.map(d => d.day === dayName ? { ...d, ...updates } : d));
    if (errors[dayName]) {
      setErrors(prev => ({ ...prev, [dayName]: undefined }));
    }
  };

  const handleApplyHours = (targetDays: DayOfWeek[]) => {
    if (!copySourceDay) return;
    const sourceData = schedule.find(d => d.day === copySourceDay);
    if (!sourceData) return;

    setSchedule(prev => prev.map(d => {
      if (targetDays.includes(d.day)) {
        return { ...d, startTime: sourceData.startTime, endTime: sourceData.endTime, enabled: true };
      }
      return d;
    }));
    setCopySourceDay(null);
    setToastMessage(`Hours applied to selected days.`);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleQuickAction = (action: "weekdays" | "weekends" | "everyday" | "clear") => {
    if (action === "clear") {
      setSchedule(prev => prev.map(d => ({ ...d, enabled: false })));
      return;
    }
    
    setSchedule(prev => prev.map(d => {
      const isWeekend = d.day === "saturday" || d.day === "sunday";
      if (action === "weekdays") return { ...d, enabled: !isWeekend };
      if (action === "weekends") return { ...d, enabled: isWeekend };
      if (action === "everyday") return { ...d, enabled: true };
      return d;
    }));
  };

  const handleSave = async () => {
    try {
      await saveAvailability({ weeklySchedule: schedule, preferences });
      setToastMessage("Your onboarding progress has been saved.");
    } catch (e) {
      setToastMessage("Could not save progress.");
    }
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleContinue = async () => {
    if (validate()) {
      try {
        setToastMessage("Saving availability preferences...");
        
        await saveAvailability({ weeklySchedule: schedule, preferences });
        
        setToastMessage("Availability saved successfully!");
        
        setTimeout(() => {
          // This is the last step, navigate to final review
          router.push("/vendor/onboarding/review");
        }, 1000);
      } catch (error) {
        console.error("Error saving availability:", error);
        setToastMessage("Failed to save availability details.");
      }
    } else {
      setToastMessage("Please review the highlighted time ranges.");
      setTimeout(() => setToastMessage(""), 3000);
      
      setTimeout(() => {
        let hasEnabledDay = false;
        let firstErrorDay: string | null = null;
        schedule.forEach(day => {
          if (day.enabled) {
            hasEnabledDay = true;
            const [startH, startM] = day.startTime.split(":").map(Number);
            const [endH, endM] = day.endTime.split(":").map(Number);
            const diffHours = (endH + endM / 60) - (startH + startM / 60);
            if (diffHours <= 0 && !firstErrorDay) {
              firstErrorDay = day.day;
            }
          }
        });
        
        if (!hasEnabledDay) {
          document.getElementById('availability-schedule-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (firstErrorDay) {
          document.getElementById(`day-${firstErrorDay}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          document.getElementById('onboarding-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
      return false;
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen md:h-screen md:overflow-hidden bg-white flex flex-col font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <VendorOnboardingHeader />

      <div className="flex-1 flex flex-col md:flex-row md:overflow-hidden">
        
        {/* Left Visual Area */}
        <div className="hidden md:flex w-[40%] h-full relative order-1 bg-slate-50 border-r border-slate-100">
          <AvailabilityVisual 
            schedule={schedule}
            weeklyHours={weeklyHours}
            isReady={isReady}
            preferences={{
              sameDay: preferences.acceptSameDayRequests,
              autoAccept: preferences.autoAcceptBookings,
              maxBookings: preferences.maxBookingsPerDay,
              advanceDays: preferences.advanceBookingDays
            }}
          />
        </div>

        {/* Right Form Area */}
        <div id="onboarding-scroll-container" className="w-full md:w-[60%] md:h-full md:overflow-y-auto bg-white p-6 md:p-12 lg:p-16 flex items-start justify-center order-2">
          <motion.div 
            variants={onboardingPageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full max-w-2xl pb-12"
          >
            {/* Mobile Header */}
            <div className="block md:hidden mb-8">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                <CalendarDays className="w-4 h-4" /> Step 9 of 9
              </div>
            </div>

            <div className="hidden md:block mb-8">
              <OnboardingProgress currentStep={9} totalSteps={9} label="Availability & Preferences" />
            </div>

            <div className="mb-10">
              <h1 className="text-3xl font-extrabold text-[var(--color-foreground)] tracking-tight mb-2">
                Set Your Availability
              </h1>
              <p className="text-slate-500 font-medium">
                Tell us when you're available so customers can request services at times that work for you.
                <span className="block text-xs mt-1 text-slate-400">You can update your availability later from your vendor dashboard.</span>
              </p>
            </div>

            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-12">
              
              {/* Almost There Alert */}
              <motion.div variants={staggerItem} className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-emerald-800 mb-1">You're Almost There!</h4>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    Complete your availability preferences and review your information before submitting your partner application.
                  </p>
                </div>
              </motion.div>

              {/* Weekly Availability */}
              <motion.section variants={staggerItem} className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-1">
                      Weekly Availability
                    </h3>
                    <p className="text-xs text-slate-500">Choose the days you normally accept service requests.</p>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <button onClick={() => handleQuickAction("weekdays")} className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">Weekdays</button>
                    <button onClick={() => handleQuickAction("weekends")} className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">Weekends</button>
                    <button onClick={() => handleQuickAction("clear")} className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors">Clear All</button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {schedule.map(dayItem => (
                    <div id={`day-${dayItem.day}`} key={dayItem.day} className="relative">
                      <motion.div 
                        animate={errors[dayItem.day] ? shakeAnimation : {}}
                        className={cn(
                          "w-full rounded-2xl border transition-all duration-300 p-4",
                          dayItem.enabled ? "bg-white border-slate-200 shadow-sm" : "bg-slate-50 border-slate-100 opacity-60",
                          errors[dayItem.day] && "border-red-300 bg-red-50"
                        )}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4 w-full sm:w-1/3">
                            {/* Toggle Switch */}
                            <button
                              type="button"
                              onClick={() => handleUpdateDay(dayItem.day, { enabled: !dayItem.enabled })}
                              className={cn(
                                "relative w-10 h-5 rounded-full transition-colors",
                                dayItem.enabled ? "bg-indigo-600" : "bg-slate-300"
                              )}
                            >
                              <span className={cn(
                                "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform",
                                dayItem.enabled ? "translate-x-5" : "translate-x-0"
                              )} />
                            </button>
                            <span className="font-bold text-sm text-slate-700 capitalize w-24">
                              {dayItem.day}
                            </span>
                          </div>

                          <div className="flex-1 flex items-center gap-2 sm:justify-end">
                            <AnimatePresence mode="wait">
                              {dayItem.enabled ? (
                                <motion.div 
                                  initial={{ opacity: 0, width: 0 }}
                                  animate={{ opacity: 1, width: "auto" }}
                                  exit={{ opacity: 0, width: 0 }}
                                  className="flex items-center gap-2 overflow-hidden"
                                >
                                  <input 
                                    type="time" 
                                    value={dayItem.startTime}
                                    onChange={(e) => handleUpdateDay(dayItem.day, { startTime: e.target.value })}
                                    className="h-10 px-3 rounded-lg border border-slate-200 text-xs font-semibold focus:border-indigo-500 outline-none w-[110px]"
                                  />
                                  <span className="text-slate-400 text-xs font-bold">—</span>
                                  <input 
                                    type="time" 
                                    value={dayItem.endTime}
                                    onChange={(e) => handleUpdateDay(dayItem.day, { endTime: e.target.value })}
                                    className={cn(
                                      "h-10 px-3 rounded-lg border text-xs font-semibold focus:border-indigo-500 outline-none w-[110px]",
                                      errors[dayItem.day] ? "border-red-400 bg-red-50" : "border-slate-200"
                                    )}
                                  />
                                  <button 
                                    onClick={() => setCopySourceDay(copySourceDay === dayItem.day ? null : dayItem.day)}
                                    className="w-10 h-10 ml-2 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors shrink-0"
                                    title="Copy hours"
                                  >
                                    <Copy className="w-4 h-4 text-slate-400" />
                                  </button>
                                </motion.div>
                              ) : (
                                <motion.span 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="text-xs font-bold text-slate-400 uppercase tracking-widest sm:mr-8"
                                >
                                  Unavailable
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                        {errors[dayItem.day] && (
                          <p className="text-[10px] font-bold text-red-500 mt-2">End time must be later than start time.</p>
                        )}
                      </motion.div>

                      {/* Copy Hours Popover */}
                      <AnimatePresence>
                        {copySourceDay === dayItem.day && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-2 bg-white rounded-xl shadow-lg border border-slate-200 p-4 relative z-10"
                          >
                            <p className="text-xs font-bold text-slate-700 mb-3">Apply {dayItem.day}'s hours to:</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {schedule.map(d => d.day !== dayItem.day && (
                                <label key={d.day} className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 hover:border-indigo-200 transition-colors">
                                  <input 
                                    type="checkbox" 
                                    className="accent-indigo-600"
                                    id={`copy-${d.day}`}
                                  />
                                  <span className="text-xs font-medium text-slate-600 capitalize">{d.day.slice(0, 3)}</span>
                                </label>
                              ))}
                            </div>
                            <div className="flex justify-end gap-2">
                              <button onClick={() => setCopySourceDay(null)} className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">Cancel</button>
                              <button 
                                onClick={() => {
                                  const targets: DayOfWeek[] = [];
                                  schedule.forEach(d => {
                                    if (d.day !== dayItem.day) {
                                      const cb = document.getElementById(`copy-${d.day}`) as HTMLInputElement;
                                      if (cb && cb.checked) targets.push(d.day);
                                    }
                                  });
                                  handleApplyHours(targets);
                                }}
                                className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                              >
                                Apply Hours
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Booking Preferences */}
              <motion.section variants={staggerItem} className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-1">
                    Booking Preferences
                  </h3>
                  <p className="text-xs text-slate-500">Manage how and when customers can book your services.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Same-Day Requests */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                        <Timer className="w-4 h-4 text-indigo-500" />
                      </div>
                      <button
                        type="button"
                        onClick={() => setPreferences(prev => ({ ...prev, acceptSameDayRequests: !prev.acceptSameDayRequests }))}
                        className={cn(
                          "relative w-10 h-5 rounded-full transition-colors",
                          preferences.acceptSameDayRequests ? "bg-indigo-600" : "bg-slate-300"
                        )}
                      >
                        <span className={cn(
                          "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform",
                          preferences.acceptSameDayRequests ? "translate-x-5" : "translate-x-0"
                        )} />
                      </button>
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 mb-1">Same-Day Requests</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">Allow customers to request services on the same day.</p>
                  </div>

                  {/* Auto-Accept */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </div>
                      <button
                        type="button"
                        onClick={() => setPreferences(prev => ({ ...prev, autoAcceptBookings: !prev.autoAcceptBookings }))}
                        className={cn(
                          "relative w-10 h-5 rounded-full transition-colors",
                          preferences.autoAcceptBookings ? "bg-indigo-600" : "bg-slate-300"
                        )}
                      >
                        <span className={cn(
                          "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform",
                          preferences.autoAcceptBookings ? "translate-x-5" : "translate-x-0"
                        )} />
                      </button>
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 mb-1">Auto-Accept Bookings</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">Automatically accept bookings that match your availability.</p>
                  </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Advance Booking Limit */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Advance Booking Limit</label>
                    <select 
                      value={preferences.advanceBookingDays}
                      onChange={(e) => setPreferences(prev => ({ ...prev, advanceBookingDays: Number(e.target.value) }))}
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm font-semibold outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    >
                      <option value={1}>1 Day</option>
                      <option value={2}>2 Days</option>
                      <option value={3}>3 Days</option>
                      <option value={7}>7 Days (1 Week)</option>
                      <option value={14}>14 Days (2 Weeks)</option>
                      <option value={30}>30 Days (1 Month)</option>
                    </select>
                  </div>

                  {/* Max Bookings Per Day */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Max Bookings / Day</label>
                    <select 
                      value={preferences.maxBookingsPerDay}
                      onChange={(e) => setPreferences(prev => ({ ...prev, maxBookingsPerDay: Number(e.target.value) }))}
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm font-semibold outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    >
                      {[1,2,3,4,5,6,8,10].map(num => (
                        <option key={num} value={num}>{num} Bookings</option>
                      ))}
                    </select>
                  </div>

                </div>
              </motion.section>

            </motion.div>

            <div className="mt-12">
              <OnboardingNavigation 
                onBack={() => router.push("/vendor/onboarding/bank")}
                onSave={handleSave}
                onContinue={handleContinue}
                isNextDisabled={!isReady}
              />
            </div>
          </motion.div>
        </div>

      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl font-medium text-sm flex items-center gap-2"
          >
            <Info className="w-4 h-4 text-blue-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
