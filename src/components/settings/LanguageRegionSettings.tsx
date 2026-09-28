"use client";

import { useState } from "react";
import { SettingsCard, SettingsRow } from "./SettingsLayout";
import { LanguageSettings, MOCK_LANGUAGE } from "@/data/settings";
import { useToast } from "@/components/bookings/Toast";

export function LanguageRegionSettings() {
  const { showToast } = useToast();
  const [prefs, setPrefs] = useState(MOCK_LANGUAGE);

  const updatePref = (key: keyof LanguageSettings, value: string) => {
    setPrefs(p => ({ ...p, [key]: value }));
    showToast("Region settings updated");
  };

  const SelectControl = ({ value, options, onChange }: { value: string, options: { value: string, label: string }[], onChange: (v: string) => void }) => (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="h-10 px-3 pr-8 w-full sm:w-48 rounded-lg border border-[var(--color-border)] text-sm font-semibold bg-white outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20">
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h2 className="text-xl font-extrabold text-[var(--color-foreground)]">Language & Region</h2>
        <p className="text-sm font-medium text-[var(--color-muted)] mt-1">These settings affect how information is displayed throughout your account.</p>
      </div>

      <SettingsCard>
        <SettingsRow label="Language" control={
          <SelectControl value={prefs.language} onChange={(v) => updatePref("language", v)} options={[
            { value: "en-IN", label: "English (India)" },
            { value: "en-US", label: "English (US)" },
            { value: "hi-IN", label: "Hindi" },
          ]} />
        } />
        <SettingsRow label="Region" control={
          <SelectControl value={prefs.region} onChange={(v) => updatePref("region", v)} options={[
            { value: "IN", label: "India" },
            { value: "US", label: "United States" },
            { value: "AE", label: "UAE" },
          ]} />
        } />
        <SettingsRow label="Currency" control={
          <SelectControl value={prefs.currency} onChange={(v) => updatePref("currency", v)} options={[
            { value: "INR", label: "INR (₹)" },
            { value: "USD", label: "USD ($)" },
            { value: "AED", label: "AED" },
          ]} />
        } />
        <SettingsRow label="Date Format" control={
          <SelectControl value={prefs.dateFormat} onChange={(v) => updatePref("dateFormat", v)} options={[
            { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
            { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
          ]} />
        } />
        <SettingsRow label="Time Format" control={
          <SelectControl value={prefs.timeFormat} onChange={(v) => updatePref("timeFormat", v)} options={[
            { value: "12-hour", label: "12-hour (1:00 PM)" },
            { value: "24-hour", label: "24-hour (13:00)" },
          ]} />
        } />
        <SettingsRow label="First Day of Week" control={
          <SelectControl value={prefs.firstDayOfWeek} onChange={(v) => updatePref("firstDayOfWeek", v)} options={[
            { value: "monday", label: "Monday" },
            { value: "sunday", label: "Sunday" },
          ]} />
        } />
      </SettingsCard>
    </div>
  );
}
