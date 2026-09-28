"use client";

import { useState } from "react";
import { SettingsCard, SettingsRow, SettingsToggle } from "./SettingsLayout";
import { CommunicationPreferences, MOCK_COMMUNICATION } from "@/data/settings";
import { useToast } from "@/components/bookings/Toast";

export function CommunicationSettings() {
  const { showToast } = useToast();
  const [prefs, setPrefs] = useState(MOCK_COMMUNICATION);

  const toggle = (key: keyof CommunicationPreferences) => {
    setPrefs(p => ({ ...p, [key]: !p[key] as any }));
    showToast("Communication preferences updated");
  };

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h2 className="text-xl font-extrabold text-[var(--color-foreground)]">Communication</h2>
        <p className="text-sm font-medium text-[var(--color-muted)] mt-1">Control how UrbanClone contacts you.</p>
      </div>

      <SettingsCard title="Preferred Contact Method">
        <SettingsRow 
          label="Primary Channel" 
          description="How we should reach you for urgent updates." 
          control={
            <select value={prefs.preferredContactMethod} onChange={(e) => { setPrefs(p => ({ ...p, preferredContactMethod: e.target.value as any })); showToast("Settings updated"); }} className="h-10 px-3 w-40 rounded-lg border border-[var(--color-border)] text-sm font-semibold bg-white outline-none">
              <option value="email">Email</option>
              <option value="phone">Phone Call</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          } 
        />
      </SettingsCard>

      <SettingsCard title="Service Professional Contact">
        <SettingsRow label="Allow professional to call me" description="Pros can call you for location help or service details." control={<SettingsToggle checked={prefs.allowProCall} onChange={() => toggle("allowProCall")} />} />
        <SettingsRow label="Allow professional to message me" description="In-app chat with the assigned professional." control={<SettingsToggle checked={prefs.allowProMessage} onChange={() => toggle("allowProMessage")} />} />
      </SettingsCard>

      <SettingsCard title="Support Communication">
        <SettingsRow label="Email Updates" control={<SettingsToggle checked={prefs.supportEmail} onChange={() => toggle("supportEmail")} />} />
        <SettingsRow label="In-app Notifications" control={<SettingsToggle checked={prefs.supportInApp} onChange={() => toggle("supportInApp")} />} />
      </SettingsCard>

      <SettingsCard title="Marketing Communication" description="Promotional offers and newsletters.">
        <SettingsRow label="Promotional Emails" control={<SettingsToggle checked={prefs.promoEmail} onChange={() => toggle("promoEmail")} />} />
        <SettingsRow label="Promotional SMS" control={<SettingsToggle checked={prefs.promoSms} onChange={() => toggle("promoSms")} />} />
        <SettingsRow label="WhatsApp Offers" control={<SettingsToggle checked={prefs.promoWhatsapp} onChange={() => toggle("promoWhatsapp")} />} />
      </SettingsCard>
    </div>
  );
}
