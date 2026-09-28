"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, ShieldCheck, UserPlus } from "lucide-react";
import type { AdminUser } from "@/data/adminUsersData";

type ModalType = "suspend" | "restore" | "disable" | "add" | null;

interface UserModalsProps {
  modalType: ModalType;
  selectedUser: AdminUser | null;
  onClose: () => void;
  onConfirmAction: () => void;
}

export function UserModals({ modalType, selectedUser, onClose, onConfirmAction }: UserModalsProps) {
  const [disableConfirmText, setDisableConfirmText] = useState("");
  
  if (!modalType) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* SUSPEND MODAL */}
          {modalType === "suspend" && selectedUser && (
            <>
              <div className="p-6 border-b border-slate-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0A192F]">Suspend Customer?</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    This will prevent {selectedUser.name} from using their account until access is restored.
                  </p>
                </div>
              </div>
              <div className="p-6">
                <label className="block text-sm font-bold text-slate-700 mb-2">Reason for suspension (Optional)</label>
                <textarea 
                  className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] outline-none resize-none h-24"
                  placeholder="E.g., Violation of terms of service..."
                />
              </div>
              <div className="p-4 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
                <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors">
                  Cancel
                </button>
                <button onClick={onConfirmAction} className="px-4 py-2 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-lg shadow-sm transition-colors">
                  Suspend User
                </button>
              </div>
            </>
          )}

          {/* RESTORE MODAL */}
          {modalType === "restore" && selectedUser && (
            <>
              <div className="p-6 border-b border-slate-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0A192F]">Restore Customer?</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {selectedUser.name} will regain full access to their account.
                  </p>
                </div>
              </div>
              <div className="p-4 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
                <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors">
                  Cancel
                </button>
                <button onClick={onConfirmAction} className="px-4 py-2 text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg shadow-sm transition-colors">
                  Restore User
                </button>
              </div>
            </>
          )}

          {/* DISABLE MODAL */}
          {modalType === "disable" && selectedUser && (
            <>
              <div className="p-6 border-b border-slate-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0">
                  <X className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0A192F]">Disable Account?</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    The account for {selectedUser.name} will remain completely inaccessible until an administrator explicitly restores it.
                  </p>
                </div>
              </div>
              <div className="p-6">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Type <span className="text-rose-600 select-all">DISABLE</span> to confirm
                </label>
                <input 
                  type="text"
                  value={disableConfirmText}
                  onChange={(e) => setDisableConfirmText(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none"
                  placeholder="DISABLE"
                />
              </div>
              <div className="p-4 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
                <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors">
                  Cancel
                </button>
                <button 
                  onClick={onConfirmAction} 
                  disabled={disableConfirmText !== "DISABLE"}
                  className="px-4 py-2 text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition-colors"
                >
                  Disable Account
                </button>
              </div>
            </>
          )}

          {/* ADD USER MODAL */}
          {modalType === "add" && (
            <>
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0A192F]">Add Customer</h3>
                </div>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Full Name *</label>
                  <input type="text" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none" placeholder="e.g. John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Email Address *</label>
                  <input type="email" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input type="tel" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>
              <div className="p-4 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
                <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors">
                  Cancel
                </button>
                <button onClick={onConfirmAction} className="px-4 py-2 text-sm font-bold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] rounded-lg shadow-sm transition-colors">
                  Create User
                </button>
              </div>
            </>
          )}

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
