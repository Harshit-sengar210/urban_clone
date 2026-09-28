"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Monitor, Smartphone, Laptop } from "lucide-react";
import { VendorSecuritySettings, MockSession } from "@/types/vendor";
import { SectionCard, SettingsToggle, SaveButton } from "../shared/SettingsShared";
import { ConfirmModal } from "../shared/ConfirmModal";
import { cn } from "@/lib/utils";

type SaveState = "idle" | "saving" | "saved";

interface SecuritySectionProps {
  data: VendorSecuritySettings;
  onChange: (data: VendorSecuritySettings) => void;
  onToast: (msg: string) => void;
}

const MOCK_SESSIONS: MockSession[] = [
  { id: "s1", device: "Windows PC", browser: "Chrome", isCurrent: true, lastActive: "Now", location: "Delhi, IN" },
  { id: "s2", device: "Android App", browser: "UrbanClone App", isCurrent: false, lastActive: "2 hours ago", location: "Delhi, IN" },
  { id: "s3", device: "MacBook", browser: "Safari", isCurrent: false, lastActive: "Yesterday", location: "Mumbai, IN" },
];

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "At least 8 characters", pass: password.length >= 8 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(password) },
    { label: "Lowercase letter", pass: /[a-z]/.test(password) },
    { label: "Number", pass: /\d/.test(password) },
  ];
  const strength = checks.filter(c => c.pass).length;
  const colors = ["bg-slate-200", "bg-red-400", "bg-amber-400", "bg-blue-400", "bg-emerald-500"];
  const labels = ["", "Weak", "Fair", "Good", "Strong"];

  return (
    <div className="space-y-2 mt-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map(i => (
          <motion.div
            key={i}
            className={cn("h-1.5 flex-1 rounded-full transition-colors duration-300", i < strength ? colors[strength] : "bg-slate-100")}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: i * 0.05 }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <p className={cn("text-xs font-bold transition-colors", strength === 0 ? "text-slate-400" : strength <= 1 ? "text-red-500" : strength <= 2 ? "text-amber-500" : strength <= 3 ? "text-blue-500" : "text-emerald-500")}>
          {labels[strength] || "Enter password"}
        </p>
      </div>
      <ul className="space-y-1">
        {checks.map(c => (
          <motion.li key={c.label} className="flex items-center gap-2" animate={{ opacity: 1 }}>
            <div className={cn("w-3.5 h-3.5 rounded-full flex items-center justify-center text-white text-[8px] font-black shrink-0", c.pass ? "bg-emerald-500" : "bg-slate-200")}>{c.pass ? "✓" : ""}</div>
            <span className={cn("text-xs font-medium", c.pass ? "text-emerald-700" : "text-slate-500")}>{c.label}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function SecuritySection({ data, onChange, onToast }: SecuritySectionProps) {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [pwError, setPwError] = useState("");
  const [pwState, setPwState] = useState<SaveState>("idle");
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [signOutLoading, setSignOutLoading] = useState(false);
  const [sessions] = useState<MockSession[]>(MOCK_SESSIONS);

  const handlePasswordSave = () => {
    if (!currentPw) { setPwError("Enter your current password."); return; }
    if (newPw.length < 8) { setPwError("Password must be at least 8 characters."); return; }
    if (newPw !== confirmPw) { setPwError("Passwords do not match."); return; }
    setPwError("");
    setPwState("saving");
    setTimeout(() => {
      setPwState("saved");
      onToast("Password updated successfully.");
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
      setTimeout(() => setPwState("idle"), 2500);
    }, 1200);
  };

  const handleSignOut = () => {
    setSignOutLoading(true);
    setTimeout(() => {
      setSignOutLoading(false);
      setShowSignOutModal(false);
      onToast("Other sessions signed out (demo).");
    }, 1200);
  };

  const DeviceIcon = ({ device }: { device: string }) => {
    if (device.toLowerCase().includes("android") || device.toLowerCase().includes("iphone"))
      return <Smartphone className="w-4 h-4 text-slate-500" />;
    if (device.toLowerCase().includes("mac") || device.toLowerCase().includes("laptop"))
      return <Laptop className="w-4 h-4 text-slate-500" />;
    return <Monitor className="w-4 h-4 text-slate-500" />;
  };

  return (
    <div className="space-y-5">
      {/* Password */}
      <SectionCard title="Change Password" description="Use a strong, unique password." delay={0} actions={<SaveButton state={pwState} onClick={handlePasswordSave} />}>
        <div className="space-y-4 py-4">
          {[
            { label: "Current Password", val: currentPw, set: setCurrentPw, showStrength: false },
            { label: "New Password", val: newPw, set: setNewPw, showStrength: true },
            { label: "Confirm New Password", val: confirmPw, set: setConfirmPw, showStrength: false },
          ].map(field => (
            <div key={field.label}>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1.5">{field.label}</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={field.val}
                  onChange={e => field.set(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-indigo-500/30 outline-none"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label={showPw ? "Hide password" : "Show password"}>
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {field.showStrength && newPw && <PasswordStrength password={newPw} />}
            </div>
          ))}
          {pwError && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-500 font-medium">{pwError}</motion.p>}
        </div>
      </SectionCard>

      {/* Active Sessions */}
      <SectionCard title="Active Sessions" description="Devices currently signed in to your account." delay={0.07}>
        <div className="divide-y divide-slate-50">
          {sessions.map(session => (
            <div key={session.id} className="flex items-center gap-4 py-4">
              <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                <DeviceIcon device={session.device} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">{session.device}</span>
                  {session.isCurrent && <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-full uppercase tracking-wider">Current</span>}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{session.browser} · {session.lastActive} · {session.location}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="pb-3">
          <button onClick={() => setShowSignOutModal(true)} className="text-sm font-bold text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors">
            Sign Out Other Sessions
          </button>
        </div>
      </SectionCard>

      {/* Login Security */}
      <SectionCard title="Login Security" description="Control how you sign in to your account." delay={0.14}>
        <SettingsToggle id="login-alerts" checked={data.loginAlerts} onChange={v => onChange({ ...data, loginAlerts: v })} label="Login Alerts" description="Get notified when a new device signs in to your account." />
        <SettingsToggle id="trusted-device" checked={data.trustedDevice} onChange={v => onChange({ ...data, trustedDevice: v })} label="Remember Trusted Device" description="Stay signed in on trusted devices." />
        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-sm font-bold text-slate-900">Two-Factor Authentication</p>
            <p className="text-xs text-slate-500 mt-0.5">Add an extra layer of login security.</p>
          </div>
          <span className="text-xs font-black text-slate-400 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full uppercase tracking-widest">Coming Soon</span>
        </div>
      </SectionCard>

      <ConfirmModal
        isOpen={showSignOutModal}
        title="Sign out of all other sessions?"
        message="This will sign you out of all devices except your current session. You will need to sign back in on those devices."
        confirmLabel="Sign Out"
        isDestructive
        isLoading={signOutLoading}
        onConfirm={handleSignOut}
        onCancel={() => setShowSignOutModal(false)}
      />
    </div>
  );
}
