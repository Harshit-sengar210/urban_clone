"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User, FileText, Landmark, Settings, LogOut, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/backend/firebase";

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileDropdown({ isOpen, onClose }: ProfileDropdownProps) {
  const router = useRouter();
  
  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 sm:hidden"
          />
          
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-[calc(100%+0.5rem)] w-[320px] bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 z-50 overflow-hidden sm:w-[280px]"
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
                  <User className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Harsh Bhati</h4>
                  <p className="text-xs text-slate-500 mb-1">Service Partner</p>
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active
                  </span>
                </div>
              </div>
            </div>

            {/* Completion */}
            <div className="px-5 py-3 border-b border-slate-100">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-slate-600">Profile Completion</span>
                <span className="text-xs font-bold text-indigo-600">100%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full w-full" />
              </div>
            </div>

            {/* Menu */}
            <div className="p-2">
              <Link 
                href="/vendor/profile" 
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-indigo-600 transition-colors text-sm font-medium"
              >
                <User className="w-4 h-4" /> Edit Profile
              </Link>
              <Link 
                href="/vendor/profile/business" 
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-indigo-600 transition-colors text-sm font-medium"
              >
                <FileText className="w-4 h-4" /> Business Details
              </Link>
              <Link 
                href="/vendor/profile/bank" 
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-indigo-600 transition-colors text-sm font-medium"
              >
                <Landmark className="w-4 h-4" /> Bank Details
              </Link>
              <Link 
                href="/vendor/settings" 
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-indigo-600 transition-colors text-sm font-medium"
              >
                <Settings className="w-4 h-4" /> Settings
              </Link>
            </div>

            <div className="p-2 border-t border-slate-100 bg-slate-50/50">
              <button 
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-red-600 transition-colors text-sm font-medium"
                onClick={async () => {
                  try {
                    await signOut(auth);
                    onClose();
                    router.push("/vendor/login");
                  } catch (error) {
                    console.error("Logout error", error);
                  }
                }}
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
