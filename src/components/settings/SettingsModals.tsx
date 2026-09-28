"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/bookings/Toast";
import { cn } from "@/lib/utils";

// Shared Modal Wrapper
function ModalWrapper({ open, onClose, title, children, destructive }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; destructive?: boolean }) {
  if (!open) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
          <div className={cn("flex items-center justify-between px-6 py-4 border-b", destructive ? "border-red-100 bg-red-50/50" : "border-[var(--color-border)]")}>
            <h2 className={cn("text-lg font-bold", destructive ? "text-red-700" : "text-[var(--color-foreground)]")}>{title}</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-colors">
              <X className={cn("w-4 h-4", destructive ? "text-red-400" : "text-slate-500")} />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export function ChangePasswordModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = () => {
    if (!current || !newPass || newPass !== confirm) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Password updated successfully");
      onClose();
      setCurrent(""); setNewPass(""); setConfirm("");
    }, 1000);
  };

  const getStrength = () => {
    if (newPass.length === 0) return { label: "", color: "bg-slate-200" };
    if (newPass.length < 8) return { label: "Weak", color: "bg-red-500" };
    if (/[A-Z]/.test(newPass) && /[0-9]/.test(newPass) && /[^A-Za-z0-9]/.test(newPass)) return { label: "Strong", color: "bg-green-500" };
    return { label: "Fair", color: "bg-amber-500" };
  };
  const strength = getStrength();

  return (
    <ModalWrapper open={open} onClose={onClose} title="Change Password">
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-[var(--color-foreground)]">Current Password</label>
          <input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} className="w-full h-11 px-4 mt-1 rounded-xl border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20" />
        </div>
        <div>
          <label className="text-xs font-bold text-[var(--color-foreground)]">New Password</label>
          <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} className="w-full h-11 px-4 mt-1 rounded-xl border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20" />
          {newPass.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden"><div className={cn("h-full transition-all", strength.color, strength.label === "Weak" ? "w-1/3" : strength.label === "Fair" ? "w-2/3" : "w-full")} /></div>
              <span className={cn("text-[10px] font-bold", strength.label === "Weak" ? "text-red-600" : strength.label === "Fair" ? "text-amber-600" : "text-green-600")}>{strength.label}</span>
            </div>
          )}
        </div>
        <div>
          <label className="text-xs font-bold text-[var(--color-foreground)]">Confirm New Password</label>
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full h-11 px-4 mt-1 rounded-xl border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20" />
        </div>
        
        <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-[var(--color-border)] text-sm font-bold text-[var(--color-foreground)] hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={handleSubmit} disabled={loading || !current || !newPass || newPass !== confirm} className="px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-bold hover:opacity-90 disabled:opacity-50 transition-opacity">
            {loading ? "Saving..." : "Update Password"}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}

export function DeleteAccountModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const handleDelete = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Account deleted (Mock)");
      onClose();
    }, 1500);
  };

  return (
    <ModalWrapper open={open} onClose={onClose} title="Delete Account" destructive>
      <div className="space-y-4">
        <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-800 font-medium">This action cannot be undone. All your data, active bookings, and wallet balance will be permanently erased.</p>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} className="mt-1" />
          <span className="text-sm font-medium text-[var(--color-foreground)]">I understand that this action cannot be undone.</span>
        </label>

        {checked && (
          <div className="animate-in fade-in slide-in-from-top-2">
            <label className="text-xs font-bold text-[var(--color-foreground)]">Type DELETE to confirm</label>
            <input type="text" value={confirmText} onChange={(e) => setConfirmText(e.target.value)} placeholder="DELETE" className="w-full h-11 px-4 mt-1 rounded-xl border border-red-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20" />
          </div>
        )}

        <div className="pt-4 mt-4 border-t border-red-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={handleDelete} disabled={loading || !checked || confirmText !== "DELETE"} className="px-5 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold hover:opacity-90 disabled:opacity-50 transition-opacity">
            {loading ? "Deleting..." : "Permanently Delete"}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
