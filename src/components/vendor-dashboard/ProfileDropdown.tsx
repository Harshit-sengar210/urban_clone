"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User, FileText, Landmark, Settings, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/backend/firebase";
import type { VendorProfileData } from "@/hooks/useVendorProfile";

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  profile: VendorProfileData | null;
}

export function ProfileDropdown({ isOpen, onClose, profile }: ProfileDropdownProps) {
  const router = useRouter();

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const displayName = profile?.displayName || "Partner";
  const fullName = profile?.fullName || "";
  const email = profile?.email || "";
  const profilePhoto = profile?.profilePhoto || null;
  const initials = profile?.initials || "VP";
  const professionalName = profile?.professionalName || "";

  // Subtitle: show professional name under full name if they're different
  const subtitle = professionalName && professionalName !== fullName
    ? professionalName
    : "Service Partner";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile backdrop */}
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
            className="absolute right-0 top-[calc(100%+0.5rem)] w-[320px] sm:w-[290px] bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 z-50 overflow-hidden"
          >
            {/* Profile Header */}
            <div className="p-5 border-b border-slate-100 bg-gradient-to-br from-indigo-50 to-slate-50">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-md bg-indigo-100 shrink-0">
                  {profilePhoto ? (
                    <Image
                      src={profilePhoto}
                      alt={displayName}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-extrabold text-indigo-600">{initials}</span>
                  )}
                </div>

                {/* Names */}
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm truncate">{displayName}</h4>
                  {fullName && fullName !== displayName && (
                    <p className="text-xs text-slate-500 truncate">{fullName}</p>
                  )}
                  <p className="text-xs text-indigo-500 font-medium mt-0.5">{subtitle}</p>
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </div>
              </div>

              {/* Email */}
              {email && (
                <p className="text-[11px] text-slate-400 mt-3 truncate">{email}</p>
              )}
            </div>

            {/* Menu Items */}
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

            {/* Logout */}
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
