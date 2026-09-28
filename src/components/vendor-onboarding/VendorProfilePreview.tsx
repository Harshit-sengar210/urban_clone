"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck, MapPin, User } from "lucide-react";
import Image from "next/image";

interface VendorProfilePreviewProps {
  fullName: string;
  profilePhoto: string | null;
}

export function VendorProfilePreview({ fullName, profilePhoto }: VendorProfilePreviewProps) {
  const displayName = fullName.trim() || "Your Name";

  return (
    <div className="h-full flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12 bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/50 rounded-3xl md:rounded-none relative overflow-hidden">
      {/* Slow Moving Background Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-64 h-64 bg-white/60 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3 z-0" 
      />
      <motion.div 
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100/40 blur-3xl rounded-full -translate-x-1/3 translate-y-1/3 z-0" 
      />

      <div className="relative z-10 max-w-md mx-auto w-full">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--color-foreground)] tracking-tight leading-[1.1] mb-4">
          Let's get to <br className="hidden lg:block" />
          <span className="text-[var(--color-primary)]">know you</span>
        </h2>
        <p className="text-lg text-[var(--color-muted)] mb-10 leading-relaxed font-medium">
          Tell us a little about yourself so customers can recognize and trust the professional behind the service.
        </p>

        {/* Profile Card */}
        <motion.div 
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative bg-white/90 backdrop-blur-xl rounded-[2rem] p-6 shadow-2xl shadow-indigo-900/10 border border-white max-w-[320px] mx-auto md:mx-0 group"
        >
          {/* Subtle glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none" />

          <div className="flex flex-col items-center text-center">
            
            {/* Avatar Area */}
            <div className="relative w-28 h-28 rounded-full overflow-hidden mb-5 border-4 border-white shadow-md bg-slate-100 flex items-center justify-center">
              <AnimatePresence mode="popLayout">
                {profilePhoto ? (
                  <motion.div
                    key="photo"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full relative"
                  >
                    <Image src={profilePhoto} alt="Profile preview" fill className="object-cover" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-slate-300"
                  >
                    <User className="w-12 h-12" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Verification Badge */}
            <motion.div 
              className="absolute top-24 right-1/4 translate-x-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300"
            >
              <BadgeCheck className="w-5 h-5 text-blue-500" />
            </motion.div>

            {/* Name */}
            <AnimatePresence mode="wait">
              <motion.h3
                key={displayName}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className={`text-xl font-bold mb-1 ${!fullName.trim() ? "text-slate-400" : "text-[var(--color-foreground)]"}`}
              >
                {displayName}
              </motion.h3>
            </AnimatePresence>
            
            <p className="text-sm font-semibold text-[var(--color-primary)] mb-4">
              Service Professional
            </p>

            {/* Location & Status */}
            <div className="w-full bg-slate-50 rounded-2xl p-4 flex items-center justify-between border border-slate-100">
              <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                <MapPin className="w-4 h-4" />
                <span>Location pending...</span>
              </div>
              <div className="px-2.5 py-1 bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest rounded-full">
                Verified
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
