"use client";

import { useState } from "react";
import { Sun, Moon, Laptop } from "lucide-react";
import { SettingsCard, SettingsRow, SettingsToggle } from "./SettingsLayout";
import { AppearanceSettings, MOCK_APPEARANCE } from "@/data/settings";
import { useToast } from "@/components/bookings/Toast";
import { cn } from "@/lib/utils";

export function AppearanceSettingsSection() {
  const { showToast } = useToast();
  const [prefs, setPrefs] = useState(MOCK_APPEARANCE);

  const toggle = (key: keyof AppearanceSettings) => {
    setPrefs(p => ({ ...p, [key]: !p[key] as any }));
    showToast("Appearance settings updated");
  };

  const THEMES = [
    { id: "light", label: "Light", icon: Sun, desc: "Default bright theme" },
    { id: "dark", label: "Dark", icon: Moon, desc: "Easier on the eyes" },
    { id: "system", label: "System", icon: Laptop, desc: "Matches your device" },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h2 className="text-xl font-extrabold text-[var(--color-foreground)]">Appearance</h2>
        <p className="text-sm font-medium text-[var(--color-muted)] mt-1">Customize how the dashboard looks and feels.</p>
      </div>

      <SettingsCard title="Theme">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {THEMES.map(theme => (
            <button
              key={theme.id}
              onClick={() => { setPrefs(p => ({ ...p, theme: theme.id })); showToast("Theme updated"); }}
              className={cn(
                "p-4 rounded-xl border text-left transition-all",
                prefs.theme === theme.id
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 ring-1 ring-[var(--color-primary)]"
                  : "border-[var(--color-border)] hover:border-slate-300 bg-white"
              )}
            >
              <theme.icon className={cn("w-6 h-6 mb-3", prefs.theme === theme.id ? "text-[var(--color-primary)]" : "text-slate-400")} />
              <h3 className="text-sm font-bold text-[var(--color-foreground)] mb-1">{theme.label}</h3>
              <p className="text-xs text-[var(--color-muted)] font-medium">{theme.desc}</p>
            </button>
          ))}
        </div>
      </SettingsCard>

      <SettingsCard title="Layout & Animations">
        <SettingsRow label="Reduce Motion" description="Minimize animations throughout the app." control={<SettingsToggle checked={prefs.reduceMotion} onChange={() => toggle("reduceMotion")} />} />
        <SettingsRow label="Compact Layout" description="Reduce spacing to fit more content on screen." control={<SettingsToggle checked={prefs.compactLayout} onChange={() => toggle("compactLayout")} />} />
        <SettingsRow label="Enable Animations" description="Show micro-interactions and transitions." control={<SettingsToggle checked={prefs.animations} onChange={() => toggle("animations")} />} />
      </SettingsCard>
    </div>
  );
}
