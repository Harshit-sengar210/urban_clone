"use client";

import { Smartphone, ShieldCheck, Monitor } from "lucide-react";
import { SettingsCard } from "./SettingsLayout";

interface SecuritySettingsProps {
  onOpenPasswordModal: () => void;
  onOpen2FAModal: () => void;
  onOpenLogoutModal: () => void;
}

export function SecuritySettings({ onOpenPasswordModal, onOpen2FAModal, onOpenLogoutModal }: SecuritySettingsProps) {
  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h2 className="text-xl font-extrabold text-[var(--color-foreground)]">Security</h2>
        <p className="text-sm font-medium text-[var(--color-muted)] mt-1">Manage your password and secure your account.</p>
      </div>

      <SettingsCard title="Password & Login">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-[var(--color-foreground)]">Password</h3>
            <p className="text-xs text-[var(--color-muted)] font-medium mt-1">Last changed 3 months ago</p>
          </div>
          <button onClick={onOpenPasswordModal} className="px-5 py-2 bg-white border border-[var(--color-border)] text-[var(--color-foreground)] text-sm font-bold rounded-xl shadow-sm hover:bg-slate-50 transition-colors">
            Change Password
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--color-foreground)]">Two-Factor Authentication</h3>
              <p className="text-xs text-[var(--color-muted)] font-medium mt-1">Add an extra layer of security to your account.</p>
            </div>
          </div>
          <button onClick={onOpen2FAModal} className="px-5 py-2 bg-[var(--color-primary)] text-white text-sm font-bold rounded-xl shadow-sm hover:opacity-90 transition-opacity">
            Setup 2FA
          </button>
        </div>
      </SettingsCard>

      <SettingsCard title="Active Sessions">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><Monitor className="w-5 h-5" /></div>
              <div>
                <p className="text-sm font-bold text-[var(--color-foreground)]">Windows • Chrome</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">Current Session</span>
                  <span className="text-xs text-[var(--color-muted)]">Mumbai, IN</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500"><Smartphone className="w-5 h-5" /></div>
              <div>
                <p className="text-sm font-bold text-[var(--color-foreground)]">Android • Chrome</p>
                <p className="text-xs text-[var(--color-muted)] mt-0.5">Last active 2 hours ago • Mumbai, IN</p>
              </div>
            </div>
            <button className="text-xs font-bold text-slate-500 hover:text-red-500 transition-colors">Sign Out</button>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <button onClick={onOpenLogoutModal} className="text-sm font-bold text-red-600 hover:underline">
            Sign out of all other sessions
          </button>
        </div>
      </SettingsCard>
    </div>
  );
}
