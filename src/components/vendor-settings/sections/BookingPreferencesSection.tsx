"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ExternalLink, Minus, Plus } from "lucide-react";
import { VendorBookingPreferences } from "@/types/vendor";
import { SectionCard, SettingsToggle, SaveButton } from "../shared/SettingsShared";
import { cn } from "@/lib/utils";

type SaveState = "idle" | "saving" | "saved";

interface BookingPrefsSectionProps {
  data: VendorBookingPreferences;
  onChange: (data: VendorBookingPreferences) => void;
  onToast: (msg: string) => void;
}

function NumberStepper({ value, min, max, step, onChange, suffix }: {
  value: number; min: number; max: number; step: number; onChange: (v: number) => void; suffix?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(min, value - step))}
        disabled={value <= min}
        className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Decrease"
      >
        <Minus className="w-4 h-4 text-slate-600" />
      </button>
      <span className="text-base font-black text-slate-900 min-w-[60px] text-center">
        {value}{suffix ? ` ${suffix}` : ""}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + step))}
        disabled={value >= max}
        className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Increase"
      >
        <Plus className="w-4 h-4 text-slate-600" />
      </button>
    </div>
  );
}

export function BookingPreferencesSection({ data, onChange, onToast }: BookingPrefsSectionProps) {
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const router = useRouter();

  const handleSave = () => {
    setSaveState("saving");
    setTimeout(() => {
      setSaveState("saved");
      onToast("Booking preferences saved.");
      setTimeout(() => setSaveState("idle"), 2500);
    }, 1000);
  };

  return (
    <div className="space-y-5">
      <SectionCard title="Booking Preferences" description="Configure how you receive and manage booking requests." delay={0} actions={<SaveButton state={saveState} onClick={handleSave} />}>
        <SettingsToggle
          id="bp-auto-accept"
          checked={data.autoAccept}
          onChange={v => onChange({ ...data, autoAccept: v })}
          label="Auto-Accept Booking Requests"
          description="Automatically confirm bookings that match your availability without manual review."
        />
        <SettingsToggle
          id="bp-same-day"
          checked={data.allowSameDayBookings}
          onChange={v => onChange({ ...data, allowSameDayBookings: v })}
          label="Allow Same-Day Requests"
          description="Let customers book you for the same day with sufficient notice."
        />

        <div className="py-4 border-b border-slate-100 space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-slate-900">Maximum Bookings Per Day</p>
              <p className="text-xs text-slate-500 mt-0.5">Limit how many bookings you accept each day.</p>
            </div>
            <NumberStepper value={data.maxBookingsPerDay} min={1} max={20} step={1} onChange={v => onChange({ ...data, maxBookingsPerDay: v })} />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-slate-900">Minimum Notice Period</p>
              <p className="text-xs text-slate-500 mt-0.5">How many hours in advance customers must book.</p>
            </div>
            <NumberStepper value={data.minimumNoticeHours} min={1} max={48} step={1} onChange={v => onChange({ ...data, minimumNoticeHours: v })} suffix="hrs" />
          </div>
        </div>
      </SectionCard>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 flex items-start justify-between gap-4"
      >
        <div>
          <p className="font-bold text-indigo-900 text-sm">Full Availability Management</p>
          <p className="text-xs text-indigo-600 mt-1 leading-relaxed">
            Set your working hours, breaks, exceptions, and time-off in the dedicated Availability page.
          </p>
        </div>
        <button
          onClick={() => router.push("/vendor/availability")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors shrink-0"
        >
          <ExternalLink className="w-3.5 h-3.5" /> Manage Availability
        </button>
      </motion.div>
    </div>
  );
}
