"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertTriangle, LogOut, PowerOff, Trash2 } from "lucide-react";
import { ConfirmModal } from "../shared/ConfirmModal";
import { cn } from "@/lib/utils";

interface DangerZoneSectionProps {
  onToast: (msg: string) => void;
}

type DangerModal = "logout" | "deactivate" | "delete" | null;

export function DangerZoneSection({ onToast }: DangerZoneSectionProps) {
  const router = useRouter();
  const [modal, setModal] = useState<DangerModal>(null);
  const [deleteStep, setDeleteStep] = useState<1 | 2>(1);
  const [deleteInput, setDeleteInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setModal(null);
      onToast("Logged out (demo).");
      setTimeout(() => router.push("/"), 500);
    }, 1200);
  };

  const handleDeactivate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setModal(null);
      onToast("Deactivation simulated (demo — no real action taken).");
    }, 1200);
  };

  const handleDelete = () => {
    if (deleteStep === 1) { setDeleteStep(2); return; }
    if (deleteInput !== "DELETE") return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setModal(null);
      setDeleteStep(1);
      setDeleteInput("");
      onToast("Demo action — no account was deleted.");
    }, 1500);
  };

  const closeModal = () => {
    setModal(null);
    setDeleteStep(1);
    setDeleteInput("");
    setIsLoading(false);
  };

  return (
    <div className="space-y-5">
      {/* Log Out */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <h2 className="font-bold text-slate-900">Log Out</h2>
          <p className="text-xs text-slate-500 mt-0.5">Sign out of this partner account.</p>
        </div>
        <div className="p-6">
          <button
            onClick={() => setModal("logout")}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="bg-white rounded-3xl border-2 border-red-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-red-100 bg-red-50/50 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <div>
            <h2 className="font-bold text-red-900">Danger Zone</h2>
            <p className="text-xs text-red-400 mt-0.5">These actions affect your partner account status.</p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Deactivate */}
          <div className="flex items-start justify-between gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
            <div>
              <p className="font-bold text-slate-900 text-sm">Deactivate Partner Account</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Temporarily pause your partner status. Your profile may not appear in new service requests.
              </p>
            </div>
            <button
              onClick={() => setModal("deactivate")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-amber-200 text-xs font-bold text-amber-700 hover:bg-amber-50 transition-colors shrink-0"
            >
              <PowerOff className="w-3.5 h-3.5" /> Deactivate
            </button>
          </div>

          {/* Delete */}
          <div className="flex items-start justify-between gap-4 p-4 rounded-2xl border border-red-100 bg-red-50/30">
            <div>
              <p className="font-bold text-red-900 text-sm">Delete Partner Account</p>
              <p className="text-xs text-red-400 mt-1 leading-relaxed">
                Permanently remove your partner account and all associated data. This cannot be undone.
              </p>
            </div>
            <button
              onClick={() => setModal("delete")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-xs font-bold text-red-600 hover:bg-red-100 transition-colors shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
        </div>
      </motion.div>

      {/* Logout Modal */}
      <ConfirmModal
        isOpen={modal === "logout"}
        title="Log out of UrbanClone?"
        message="You will be returned to the login page. Your data and settings will be preserved."
        confirmLabel="Log Out"
        cancelLabel="Cancel"
        isLoading={isLoading}
        onConfirm={handleLogout}
        onCancel={closeModal}
      />

      {/* Deactivate Modal */}
      <ConfirmModal
        isOpen={modal === "deactivate"}
        title="Deactivate your partner account?"
        message={
          <span>
            Your partner profile may no longer be available for new service requests while deactivated.
            You can reactivate at any time.<br /><br />
            <span className="text-amber-600 font-bold">Demo: No real action will be taken.</span>
          </span>
        }
        confirmLabel="Continue"
        cancelLabel="Cancel"
        isDestructive
        isLoading={isLoading}
        onConfirm={handleDeactivate}
        onCancel={closeModal}
      />

      {/* Delete Modal */}
      {modal === "delete" && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={closeModal} className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-md p-6 z-10"
            role="dialog" aria-modal aria-label="Delete account confirmation"
          >
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>

            {deleteStep === 1 ? (
              <>
                <h3 className="font-extrabold text-slate-900 text-lg mb-2">Delete your partner account?</h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                  This action is permanent. All your profile data, services, booking history, and earnings records will be permanently removed. <strong>This cannot be undone.</strong>
                  <br /><br />
                  <span className="text-amber-600 font-bold">Demo: No real deletion will occur.</span>
                </p>
                <div className="flex gap-3">
                  <button onClick={closeModal} className="flex-1 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                  <button onClick={handleDelete} className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors">
                    Continue
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-extrabold text-slate-900 text-lg mb-2">Final confirmation</h3>
                <p className="text-sm text-slate-500 mb-4">Type <strong className="text-slate-900">DELETE</strong> to confirm account deletion.</p>
                <input
                  type="text"
                  value={deleteInput}
                  onChange={e => setDeleteInput(e.target.value)}
                  placeholder="Type DELETE"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 mb-4 focus:ring-2 focus:ring-red-500/30 outline-none"
                  autoFocus
                />
                <div className="flex gap-3">
                  <button onClick={closeModal} className="flex-1 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                  <button
                    onClick={handleDelete}
                    disabled={deleteInput !== "DELETE" || isLoading}
                    className={cn("flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all flex items-center justify-center gap-2", "bg-red-500 hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed")}
                  >
                    {isLoading ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                    ) : "Delete Account"}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
