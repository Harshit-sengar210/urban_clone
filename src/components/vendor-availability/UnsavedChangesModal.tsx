"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface UnsavedChangesModalProps {
  isOpen: boolean;
  onStay: () => void;
  onDiscard: () => void;
}

export function UnsavedChangesModal({ isOpen, onStay, onDiscard }: UnsavedChangesModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>
            
            <h2 className="text-xl font-black text-slate-900 mb-2">Unsaved Changes</h2>
            <p className="text-slate-600 text-sm font-medium mb-8">
              You have modified your availability schedule. Are you sure you want to discard these changes?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button 
                onClick={onStay}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors"
              >
                Keep Editing
              </button>
              <button 
                onClick={onDiscard}
                className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-colors"
              >
                Discard
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
