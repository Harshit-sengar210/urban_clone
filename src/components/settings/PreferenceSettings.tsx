"use client";

import { useState } from "react";
import { SettingsCard, SettingsRow, SettingsToggle } from "./SettingsLayout";
import { ServicePreferences, MOCK_PREFERENCES } from "@/data/settings";
import { useToast } from "@/components/bookings/Toast";

export function PreferenceSettings() {
  const { showToast } = useToast();
  const [prefs, setPrefs] = useState(MOCK_PREFERENCES);
  const [saving, setSaving] = useState(false);

  const toggle = (key: keyof ServicePreferences) => {
    setPrefs(p => ({ ...p, [key]: !p[key] as any }));
    showToast("Preferences updated");
  };

  const SelectControl = ({ value, options, onChange }: { value: string, options: { value: string, label: string }[], onChange: (v: string) => void }) => (
    <select value={value} onChange={(e) => { onChange(e.target.value); showToast("Preference updated"); }} className="h-10 px-3 pr-8 w-full sm:w-48 rounded-lg border border-[var(--color-border)] text-sm font-semibold bg-white outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20">
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h2 className="text-xl font-extrabold text-[var(--color-foreground)]">Service Preferences</h2>
        <p className="text-sm font-medium text-[var(--color-muted)] mt-1">Customize your default service experience.</p>
      </div>

      <SettingsCard title="Default Booking Settings">
        <SettingsRow label="Preferred Service Time" control={
          <SelectControl value={prefs.preferredTime} onChange={(v) => setPrefs(p => ({ ...p, preferredTime: v as any }))} options={[
            { value: "morning", label: "Morning (8 AM - 12 PM)" },
            { value: "afternoon", label: "Afternoon (12 PM - 4 PM)" },
            { value: "evening", label: "Evening (4 PM - 8 PM)" },
            { value: "flexible", label: "Flexible" },
          ]} />
        } />
        <SettingsRow label="Preferred Professional" control={
          <SelectControl value={prefs.preferredProfessional} onChange={(v) => setPrefs(p => ({ ...p, preferredProfessional: v as any }))} options={[
            { value: "no_preference", label: "No Preference" },
            { value: "same", label: "Same professional whenever possible" },
          ]} />
        } />
        <SettingsRow label="Service Reminders" control={
          <SelectControl value={prefs.serviceReminders} onChange={(v) => setPrefs(p => ({ ...p, serviceReminders: v as any }))} options={[
            { value: "1_hour", label: "1 hour before" },
            { value: "3_hours", label: "3 hours before" },
            { value: "1_day", label: "1 day before" },
          ]} />
        } />
      </SettingsCard>

      <SettingsCard title="Additional Preferences">
        <SettingsRow label="Contactless Service" description="Where applicable, professionals will maintain distance." control={<SettingsToggle checked={prefs.contactless} onChange={() => toggle("contactless")} />} />
        <SettingsRow label="Eco-friendly Products" description="Prefer professionals using eco-friendly cleaning supplies." control={<SettingsToggle checked={prefs.ecoFriendly} onChange={() => toggle("ecoFriendly")} />} />
        <SettingsRow label="Save Frequently Used Instructions" description="Automatically apply your default instructions to new bookings." control={<SettingsToggle checked={prefs.saveInstructions} onChange={() => toggle("saveInstructions")} />} />
        
        {prefs.saveInstructions && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <label className="block text-sm font-bold text-[var(--color-foreground)] mb-2">Default Service Instructions</label>
            <textarea 
              value={prefs.defaultInstructions} 
              onChange={(e) => setPrefs(p => ({ ...p, defaultInstructions: e.target.value }))}
              placeholder="E.g., Please call before arriving."
              className="w-full h-24 p-3 rounded-xl border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 resize-none"
            />
            <div className="flex justify-end mt-2">
              <button 
                onClick={() => { setSaving(true); setTimeout(() => { setSaving(false); showToast("Instructions saved"); }, 500); }} 
                className="px-4 py-1.5 bg-[var(--color-primary)] text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity"
              >
                {saving ? "Saving..." : "Save Instructions"}
              </button>
            </div>
          </div>
        )}
      </SettingsCard>
    </div>
  );
}
