"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { SettingsCard, SettingsRow, SettingsToggle } from "./SettingsLayout";
import { PrivacyPreferences, MOCK_PRIVACY } from "@/data/settings";
import { useToast } from "@/components/bookings/Toast";

export function PrivacySettings() {
  const { showToast } = useToast();
  const [prefs, setPrefs] = useState(MOCK_PRIVACY);

  const toggle = (key: keyof PrivacyPreferences) => {
    setPrefs(p => ({ ...p, [key]: !p[key] as any }));
    showToast("Privacy settings updated");
  };

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h2 className="text-xl font-extrabold text-[var(--color-foreground)]">Privacy</h2>
        <p className="text-sm font-medium text-[var(--color-muted)] mt-1">Control your privacy and data preferences.</p>
      </div>

      <SettingsCard title="Profile Visibility">
        <SettingsRow 
          label="Who can see my profile" 
          description="Controls who can see your name and photo." 
          control={
            <select value={prefs.profileVisibility} onChange={(e) => { setPrefs(p => ({ ...p, profileVisibility: e.target.value as any })); showToast("Settings updated"); }} className="h-10 px-3 rounded-lg border border-[var(--color-border)] text-sm font-semibold bg-white outline-none">
              <option value="professionals">Only assigned professionals</option>
              <option value="everyone">Everyone</option>
              <option value="none">No one</option>
            </select>
          } 
        />
      </SettingsCard>

      <SettingsCard title="Location & Personalization">
        <SettingsRow label="Allow Personalized Recommendations" description="Show services based on your past bookings." control={<SettingsToggle checked={prefs.allowPersonalization} onChange={() => toggle("allowPersonalization")} />} />
        <SettingsRow label="Use Location for Discovery" description="Allow UrbanClone to use your location to show available services." control={<SettingsToggle checked={prefs.useLocationForDiscovery} onChange={() => toggle("useLocationForDiscovery")} />} />
        <SettingsRow label="Usage Analytics" description="Share anonymous usage data to help us improve the app." control={<SettingsToggle checked={prefs.allowAnalytics} onChange={() => toggle("allowAnalytics")} />} />
      </SettingsCard>

      <SettingsCard title="Your Data">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-[var(--color-foreground)]">Download My Data</h3>
            <p className="text-xs text-[var(--color-muted)] font-medium mt-1">Request a copy of your personal data, booking history, and preferences.</p>
          </div>
          <button onClick={() => showToast("Data export requested. You will receive an email shortly.")} className="px-4 py-2 bg-white border border-[var(--color-border)] text-[var(--color-foreground)] text-sm font-bold rounded-xl shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Data
          </button>
        </div>
      </SettingsCard>
    </div>
  );
}
