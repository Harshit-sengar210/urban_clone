"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ClipboardCheck } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SubmitConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
}

export function SubmitConfirmationModal({ isOpen, onClose, onSubmit }: SubmitConfirmationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit();
      // On success, the VendorOnboardingProvider will automatically redirect the user
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
    }
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
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
          >
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                  <ClipboardCheck className="w-6 h-6 text-indigo-600" />
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
                Submit Your Partner Application?
              </h2>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                You're about to submit your UrbanClone vendor application for review. Please make sure all information is correct.
              </p>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-8 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-500 uppercase tracking-widest">Profile Status</span>
                  <span className="font-bold text-emerald-600">Complete</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-500 uppercase tracking-widest">Identity</span>
                  <span className="font-bold text-emerald-600">Ready for Review</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-500 uppercase tracking-widest">Payout</span>
                  <span className="font-bold text-emerald-600">Ready</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-500 uppercase tracking-widest">Availability</span>
                  <span className="font-bold text-emerald-600">Configured</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:border-slate-300 hover:bg-slate-50 transition-all disabled:opacity-50"
                >
                  Go Back
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-90 relative overflow-hidden group"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
