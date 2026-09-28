"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, ShieldCheck, UserPlus, CheckCircle, HelpCircle, XCircle } from "lucide-react";
import type { AdminVendor } from "@/data/adminVendorsData";

export type VendorModalType = "suspend" | "restore" | "approve" | "reject" | "request_changes" | "add" | null;

interface VendorModalsProps {
  modalType: VendorModalType;
  selectedVendor: AdminVendor | null;
  onClose: () => void;
  onConfirmAction: (payload?: any) => void;
}

export function VendorModals({ modalType, selectedVendor, onClose, onConfirmAction }: VendorModalsProps) {
  const [reason, setReason] = useState("");

  if (!modalType) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
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
          {/* APPROVE MODAL */}
          {modalType === "approve" && selectedVendor && (
            <>
              <div className="p-6 border-b border-slate-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0A192F]">Approve Vendor?</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Approving this application will allow {selectedVendor.businessName} to access the marketplace and receive eligible booking requests.
                  </p>
                </div>
              </div>
              <div className="p-6 bg-slate-50 flex justify-end gap-3">
                <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors">
                  Cancel
                </button>
                <button onClick={() => onConfirmAction()} className="px-4 py-2 text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg shadow-sm transition-colors">
                  Approve Vendor
                </button>
              </div>
            </>
          )}

          {/* REQUEST CHANGES MODAL */}
          {modalType === "request_changes" && selectedVendor && (
            <>
              <div className="p-6 border-b border-slate-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0A192F]">Request Changes</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Tell the vendor what information needs to be updated before approval.
                  </p>
                </div>
              </div>
              <div className="p-6">
                <label className="block text-sm font-bold text-slate-700 mb-2">Feedback for vendor *</label>
                <textarea 
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] outline-none resize-none h-24"
                  placeholder="E.g., Please upload clearer photos of your government ID."
                />
              </div>
              <div className="p-4 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
                <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors">
                  Cancel
                </button>
                <button 
                  onClick={() => onConfirmAction({ reason })} 
                  disabled={!reason.trim()}
                  className="px-4 py-2 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition-colors"
                >
                  Send Request
                </button>
              </div>
            </>
          )}

          {/* REJECT MODAL */}
          {modalType === "reject" && selectedVendor && (
            <>
              <div className="p-6 border-b border-slate-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0A192F]">Reject Vendor Application?</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    The vendor will not be approved based on the current application.
                  </p>
                </div>
              </div>
              <div className="p-6">
                <label className="block text-sm font-bold text-slate-700 mb-2">Rejection reason *</label>
                <textarea 
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none resize-none h-24"
                  placeholder="Reason for rejection..."
                />
              </div>
              <div className="p-4 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
                <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors">
                  Cancel
                </button>
                <button 
                  onClick={() => onConfirmAction({ reason })} 
                  disabled={!reason.trim()}
                  className="px-4 py-2 text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition-colors"
                >
                  Reject Application
                </button>
              </div>
            </>
          )}

          {/* SUSPEND MODAL */}
          {modalType === "suspend" && selectedVendor && (
            <>
              <div className="p-6 border-b border-slate-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0A192F]">Suspend Vendor?</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Suspending this vendor will prevent them from receiving new eligible bookings.
                  </p>
                </div>
              </div>
              <div className="p-4 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
                <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors">
                  Cancel
                </button>
                <button onClick={() => onConfirmAction()} className="px-4 py-2 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-lg shadow-sm transition-colors">
                  Suspend Vendor
                </button>
              </div>
            </>
          )}

          {/* RESTORE MODAL */}
          {modalType === "restore" && selectedVendor && (
            <>
              <div className="p-6 border-b border-slate-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0A192F]">Restore Vendor?</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    This vendor will become available for marketplace operations again.
                  </p>
                </div>
              </div>
              <div className="p-4 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
                <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors">
                  Cancel
                </button>
                <button onClick={() => onConfirmAction()} className="px-4 py-2 text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg shadow-sm transition-colors">
                  Restore Vendor
                </button>
              </div>
            </>
          )}

          {/* ADD MODAL */}
          {modalType === "add" && (
            <>
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0A192F]">Add Vendor</h3>
                </div>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Full Name *</label>
                  <input type="text" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-[var(--color-primary)] outline-none" placeholder="e.g. Ravi Sharma" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Email *</label>
                  <input type="email" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-[var(--color-primary)] outline-none" placeholder="ravi@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Business Name</label>
                  <input type="text" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-[var(--color-primary)] outline-none" placeholder="Ravi Services" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">City *</label>
                  <input type="text" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-[var(--color-primary)] outline-none" placeholder="Noida" />
                </div>
              </div>
              <div className="p-4 bg-slate-50 flex justify-end gap-3 rounded-b-2xl border-t border-slate-100">
                <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors">
                  Cancel
                </button>
                <button onClick={() => onConfirmAction()} className="px-4 py-2 text-sm font-bold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] rounded-lg shadow-sm transition-colors">
                  Create Vendor
                </button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
