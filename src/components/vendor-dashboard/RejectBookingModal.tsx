"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface RejectBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

const REASONS = [
  "Not available at this time",
  "Location is outside my service area",
  "Schedule conflict",
  "Other"
];

export function RejectBookingModal({ isOpen, onClose, onConfirm }: RejectBookingModalProps) {
  const [selectedReason, setSelectedReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = () => {
    if (!selectedReason) return;
    setIsSubmitting(true);
    // Simulate delay
    setTimeout(() => {
      onConfirm(selectedReason);
      setIsSubmitting(false);
      setSelectedReason("");
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isSubmitting ? onClose : undefined}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-full"
          >
            <div className="p-6 sm:p-8 overflow-y-auto no-scrollbar">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                {!isSubmitting && (
                  <button 
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <h2 className="text-xl font-extrabold text-slate-900 mb-2">
                Reject Booking?
              </h2>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                Are you sure you want to reject this booking request? This action cannot be undone.
              </p>

              <div className="mb-8">
                <label className="text-xs font-bold text-slate-700 block mb-3 uppercase tracking-widest">
                  Reason for Rejection
                </label>
                <div className="space-y-2">
                  {REASONS.map(reason => (
                    <label 
                      key={reason}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl border transition-colors cursor-pointer",
                        selectedReason === reason 
                          ? "border-red-500 bg-red-50 text-red-900" 
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700"
                      )}
                    >
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                        selectedReason === reason ? "border-red-500" : "border-slate-300"
                      )}>
                        {selectedReason === reason && <div className="w-2 h-2 rounded-full bg-red-500" />}
                      </div>
                      <span className="text-sm font-semibold">{reason}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:border-slate-300 hover:bg-slate-50 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirm}
                  disabled={isSubmitting || !selectedReason}
                  className="flex-1 py-3 px-4 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Rejecting..." : "Reject Booking"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
