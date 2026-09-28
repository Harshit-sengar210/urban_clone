"use client";

import { AlertTriangle, Trash2 } from "lucide-react";
import { SettingsCard } from "./SettingsLayout";

interface AccountManagementProps {
  onOpenDeactivate: () => void;
  onOpenDelete: () => void;
}

export function AccountManagement({ onOpenDeactivate, onOpenDelete }: AccountManagementProps) {
  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h2 className="text-xl font-extrabold text-[var(--color-foreground)]">Account Management</h2>
        <p className="text-sm font-medium text-[var(--color-muted)] mt-1">Manage the status of your account.</p>
      </div>

      <SettingsCard title="Deactivate Account">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="max-w-md">
            <p className="text-sm text-[var(--color-muted)] font-medium">
              Temporarily disable your account. Your profile, bookings, and data will be hidden but not permanently deleted. You can reactivate by logging back in.
            </p>
          </div>
          <button 
            onClick={onOpenDeactivate} 
            className="px-5 py-2.5 bg-white border border-[var(--color-border)] text-[var(--color-foreground)] text-sm font-bold rounded-xl shadow-sm hover:bg-slate-50 transition-colors whitespace-nowrap"
          >
            Deactivate Account
          </button>
        </div>
      </SettingsCard>

      <SettingsCard title="Delete Account" destructive>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <h3 className="text-sm font-bold text-red-600">Danger Zone</h3>
            </div>
            <p className="text-sm text-[var(--color-muted)] font-medium">
              Permanently delete your account and associated data. This action cannot be undone. You will lose access to all your bookings, wallet balance, and history.
            </p>
          </div>
          <button 
            onClick={onOpenDelete} 
            className="px-5 py-2.5 bg-red-50 border border-red-200 text-red-600 text-sm font-bold rounded-xl shadow-sm hover:bg-red-100 transition-colors whitespace-nowrap flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" /> Delete Account
          </button>
        </div>
      </SettingsCard>
    </div>
  );
}
