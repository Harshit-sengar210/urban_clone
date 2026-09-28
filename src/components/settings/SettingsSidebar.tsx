"use client";

import { motion } from "framer-motion";
import { User, Bell, Shield, Lock, Palette, Globe, CreditCard, MessageCircle, Sliders, UserX } from "lucide-react";
import { SettingsSection } from "@/data/settings";
import { cn } from "@/lib/utils";

interface SettingsSidebarProps {
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
}

const NAV_ITEMS: { id: SettingsSection; label: string; desc: string; icon: any }[] = [
  { id: "account", label: "Account", desc: "Personal information and details", icon: User },
  { id: "notifications", label: "Notifications", desc: "Manage alerts and reminders", icon: Bell },
  { id: "privacy", label: "Privacy", desc: "Control your privacy preferences", icon: Shield },
  { id: "security", label: "Security", desc: "Password and account security", icon: Lock },
  { id: "appearance", label: "Appearance", desc: "Customize how the dashboard looks", icon: Palette },
  { id: "language", label: "Language & Region", desc: "Language, currency and regional settings", icon: Globe },
  { id: "payments", label: "Payments", desc: "Manage payment preferences", icon: CreditCard },
  { id: "communication", label: "Communication", desc: "Control how we contact you", icon: MessageCircle },
  { id: "preferences", label: "Preferences", desc: "Customize your service experience", icon: Sliders },
  { id: "account-management", label: "Account Management", desc: "Deactivate or delete your account", icon: UserX },
];

export function SettingsSidebar({ activeSection, onSectionChange }: SettingsSidebarProps) {
  return (
    <div className="hidden md:flex flex-col gap-1 w-64 lg:w-72 flex-shrink-0 sticky top-6">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => onSectionChange(item.id)}
          className={cn(
            "w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all relative overflow-hidden",
            activeSection === item.id 
              ? "bg-[var(--color-primary)] text-white shadow-md shadow-primary/20" 
              : "hover:bg-slate-100 text-slate-700"
          )}
        >
          {activeSection === item.id && (
            <motion.div layoutId="sidebar-active" className="absolute inset-0 bg-[var(--color-primary)] -z-10 rounded-xl" />
          )}
          <item.icon className={cn("w-5 h-5 mt-0.5", activeSection === item.id ? "text-white" : "text-slate-500")} />
          <div className="relative z-10">
            <div className="font-bold text-sm">{item.label}</div>
            <div className={cn("text-xs font-medium line-clamp-1", activeSection === item.id ? "text-white/80" : "text-[var(--color-muted)]")}>{item.desc}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

export function SettingsMobileNav({ activeSection, onSectionChange }: SettingsSidebarProps) {
  return (
    <div className="md:hidden mb-6">
      <div className="relative">
        <select
          value={activeSection}
          onChange={(e) => onSectionChange(e.target.value as SettingsSection)}
          className="w-full h-12 pl-4 pr-10 rounded-xl bg-white border border-[var(--color-border)] text-sm font-bold text-[var(--color-foreground)] appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 shadow-sm"
        >
          {NAV_ITEMS.map(item => (
            <option key={item.id} value={item.id}>{item.label}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>
    </div>
  );
}
