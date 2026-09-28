"use client";

import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { VendorVerificationSummary } from "@/types/vendor";
import { cn } from "@/lib/utils";

interface ProfileHeaderProps {
  verification: VendorVerificationSummary;
  onPreviewProfile: () => void;
}

export function ProfileHeader({ verification, onPreviewProfile }: ProfileHeaderProps) {
  
  // SVG Circular Progress logic
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (verification.progress / 100) * circumference;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
          Partner Profile
        </h1>
        <p className="text-slate-500 font-medium text-sm">
          Manage your professional information and how customers see you.
        </p>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
        {/* Completion Indicator */}
        <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative w-14 h-14 flex items-center justify-center">
            {/* Background circle */}
            <svg className="w-14 h-14 transform -rotate-90">
              <circle
                className="text-slate-100"
                strokeWidth="4"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="28"
                cy="28"
              />
              {/* Progress circle */}
              <motion.circle
                className={cn(
                  verification.progress === 100 ? "text-emerald-500" : "text-indigo-600"
                )}
                strokeWidth="4"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="28"
                cy="28"
              />
            </svg>
            <span className="absolute text-xs font-black text-slate-700">
              {verification.progress}%
            </span>
          </div>
          <div className="pr-2">
            <div className="text-xs font-bold text-slate-900">Profile Complete</div>
            <div className="text-[10px] text-slate-500 mt-0.5 max-w-[120px] leading-tight">
              {verification.progress === 100 
                ? "Looking great!" 
                : "Complete your profile to improve your presence."}
            </div>
          </div>
        </div>

        <button
          onClick={onPreviewProfile}
          className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-all shadow-sm shrink-0"
        >
          <Eye className="w-4 h-4" />
          <span className="hidden sm:inline">Preview Profile</span>
          <span className="sm:hidden">Preview</span>
        </button>
      </div>
    </motion.div>
  );
}
