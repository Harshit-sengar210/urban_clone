"use client";

import { useState } from "react";
import { Camera, CheckCircle2, AlertCircle } from "lucide-react";
import { SettingsCard } from "./SettingsLayout";
import { AccountProfile, MOCK_PROFILE } from "@/data/settings";
import { useToast } from "@/components/bookings/Toast";

export function AccountSettings() {
  const { showToast } = useToast();
  const [profile, setProfile] = useState(MOCK_PROFILE);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (field: keyof AccountProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setHasChanges(false);
      showToast("Profile updated successfully");
    }, 800);
  };

  return (
    <div className="space-y-6">
      <SettingsCard title="Personal Information" description="Update your photo and personal details.">
        
        {/* Avatar */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-6 pb-6 border-b border-slate-100">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-bold text-slate-400">{profile.fullName.charAt(0)}</span>
              )}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-[var(--color-border)] rounded-full flex items-center justify-center shadow-sm text-slate-600 hover:text-[var(--color-primary)] transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="text-center sm:text-left flex-1">
            <h3 className="text-sm font-bold text-[var(--color-foreground)] mb-1">Profile Photo</h3>
            <p className="text-xs text-[var(--color-muted)] mb-3">JPG, GIF or PNG. Max size of 5MB.</p>
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <button className="px-4 py-1.5 rounded-lg bg-[var(--color-primary)] text-white text-xs font-bold hover:opacity-90 transition-opacity">Upload New</button>
              <button className="px-4 py-1.5 rounded-lg bg-white border border-[var(--color-border)] text-[var(--color-foreground)] text-xs font-bold hover:bg-slate-50 transition-colors">Remove</button>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--color-foreground)]">Full Name</label>
            <input type="text" value={profile.fullName} onChange={(e) => handleChange("fullName", e.target.value)} className="w-full h-11 px-4 rounded-xl border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--color-foreground)]">Date of Birth</label>
            <input type="date" value={profile.dob} onChange={(e) => handleChange("dob", e.target.value)} className="w-full h-11 px-4 rounded-xl border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--color-foreground)]">Email Address</label>
            <div className="relative">
              <input type="email" value={profile.email} onChange={(e) => handleChange("email", e.target.value)} className="w-full h-11 pl-4 pr-10 rounded-xl border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]" />
              {profile.emailVerified && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--color-foreground)]">Phone Number</label>
            <div className="relative">
              <input type="tel" value={profile.phone} onChange={(e) => handleChange("phone", e.target.value)} className="w-full h-11 pl-4 pr-10 rounded-xl border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]" />
              {profile.phoneVerified && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />}
            </div>
          </div>
        </div>

        {/* Save Actions */}
        {hasChanges && (
          <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-end gap-3">
            <button onClick={() => { setProfile(MOCK_PROFILE); setHasChanges(false); }} className="px-5 py-2.5 rounded-xl border border-[var(--color-border)] text-sm font-bold text-[var(--color-foreground)] hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button onClick={handleSave} disabled={saving} className="px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center gap-2">
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </SettingsCard>

      <SettingsCard title="Account Information">
        <div className="space-y-4 text-sm">
          <div className="flex justify-between py-2 border-b border-slate-100 last:border-0"><span className="text-[var(--color-muted)] font-medium">User ID</span><span className="font-bold text-[var(--color-foreground)]">{profile.userId}</span></div>
          <div className="flex justify-between py-2 border-b border-slate-100 last:border-0"><span className="text-[var(--color-muted)] font-medium">Account Created</span><span className="font-bold text-[var(--color-foreground)]">{new Date(profile.joinedDate).toLocaleDateString("en-IN", { day:"numeric", month:"long", year:"numeric"})}</span></div>
          <div className="flex justify-between py-2 border-b border-slate-100 last:border-0">
            <span className="text-[var(--color-muted)] font-medium">Verification Status</span>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded"><CheckCircle2 className="w-3 h-3"/> Email</span>
              <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded"><CheckCircle2 className="w-3 h-3"/> Phone</span>
            </div>
          </div>
        </div>
      </SettingsCard>
    </div>
  );
}
