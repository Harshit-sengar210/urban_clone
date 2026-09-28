"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  isDestructive?: boolean;
  isSubmitting?: boolean;
}

export function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText,
  isDestructive = true,
  isSubmitting = false
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDestructive ? 'bg-red-50' : 'bg-amber-50'}`}>
                <AlertTriangle className={`w-6 h-6 ${isDestructive ? 'text-red-600' : 'text-amber-600'}`} />
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
              {title}
            </h2>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed whitespace-pre-line">
              {message}
            </p>

            <div className="flex gap-3">
              <button 
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 py-3 px-4 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:border-slate-300 hover:bg-slate-50 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={onConfirm}
                disabled={isSubmitting}
                className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isDestructive 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-amber-500 hover:bg-amber-600 text-white'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Wait...
                  </>
                ) : (
                  confirmText
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
