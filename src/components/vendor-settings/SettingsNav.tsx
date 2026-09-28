"use client";

import React from "react";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  User, Shield, Bell, Lock, Calendar, CreditCard,
  CheckCircle2, AlertTriangle, Settings2
} from "lucide-react";
import { cn } from "@/lib/utils";

export type SettingsSection =
  | "account" | "security" | "notifications" | "privacy"
  | "booking" | "payout" | "verification" | "danger";

interface NavItem {
  id: SettingsSection;
  label: string;
  icon: React.ReactNode;
  danger?: boolean;
}

const navItems: NavItem[] = [
  { id: "account", label: "Account", icon: <User className="w-4 h-4" /> },
  { id: "security", label: "Security", icon: <Shield className="w-4 h-4" /> },
  { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
  { id: "privacy", label: "Privacy", icon: <Lock className="w-4 h-4" /> },
  { id: "booking", label: "Booking Preferences", icon: <Calendar className="w-4 h-4" /> },
  { id: "payout", label: "Payout Preferences", icon: <CreditCard className="w-4 h-4" /> },
  { id: "verification", label: "Verification", icon: <CheckCircle2 className="w-4 h-4" /> },
  { id: "danger", label: "Danger Zone", icon: <AlertTriangle className="w-4 h-4" />, danger: true },
];

interface SettingsNavProps {
  active: SettingsSection;
  onChange: (s: SettingsSection) => void;
}

export function SettingsNav({ active, onChange }: SettingsNavProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex flex-col gap-1 w-56 shrink-0" aria-label="Settings navigation">
        <LayoutGroup id="settings-nav">
          {navItems.map(item => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChange(item.id)}
                className={cn(
                  "relative flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-colors text-left",
                  isActive
                    ? item.danger ? "text-red-600" : "text-indigo-700"
                    : item.danger
                    ? "text-red-400 hover:text-red-600 hover:bg-red-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="settings-nav-indicator"
                    className={cn(
                      "absolute inset-0 rounded-2xl",
                      item.danger ? "bg-red-50" : "bg-indigo-50"
                    )}
                    transition={{ type: "spring", stiffness: 350, damping: 35 }}
                  />
                )}
                <span className="relative z-10 shrink-0">{item.icon}</span>
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </LayoutGroup>
      </nav>

      {/* Mobile tabs */}
      <div className="md:hidden overflow-x-auto -mx-4 px-4 pb-1">
        <div className="flex gap-2 min-w-max">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                active === item.id
                  ? item.danger ? "bg-red-50 text-red-600" : "bg-indigo-600 text-white"
                  : item.danger ? "text-red-400 hover:bg-red-50" : "text-slate-600 bg-slate-100 hover:bg-slate-200"
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
