"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, User, Building2, ChevronRight, Briefcase } from "lucide-react";
import Image from "next/image";
import { previewTextChange } from "./animations";

interface VendorProfessionalPreviewProps {
  profileType: "individual" | "business";
  professionalName: string;
  businessName: string;
  businessType: string;
  description: string;
  businessLogo: string | null;
  profilePhoto?: string | null; // From step 2 (optional to pass)
}

export function VendorProfessionalPreview({
  profileType,
  professionalName,
  businessName,
  businessType,
  description,
  businessLogo,
  profilePhoto,
}: VendorProfessionalPreviewProps) {
  
  // Decide what image to show in the avatar spot
  const displayImage = profileType === "business" && businessLogo 
    ? businessLogo 
    : profilePhoto;

  const displayName = profileType === "business" && businessName 
    ? businessName 
    : (professionalName || "Your Name");
    
  const displaySubtitle = profileType === "business" 
    ? (businessType || "Business / Agency") 
    : "Individual Professional";

  return (
    <div className="h-full w-full flex flex-col justify-center px-6 py-12 md:px-12 bg-slate-50 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/40 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100/40 blur-3xl rounded-full -translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 w-full max-w-[360px] mx-auto">
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-2xl font-extrabold text-[var(--color-foreground)] mb-2">Your professional identity</h2>
          <p className="text-sm font-medium text-slate-500">This is how your professional profile can appear to customers.</p>
        </div>

        {/* Profile Card */}
        <motion.div 
          className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden group transition-all duration-300"
          whileHover={{ y: -5, scale: 1.01 }}
        >
          {/* Card Banner */}
          <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="px-6 pb-6 relative">
            {/* Avatar */}
            <motion.div 
              className="w-20 h-20 rounded-2xl bg-white p-1 shadow-lg absolute -top-10 left-6 border border-slate-100 transition-transform duration-300 group-hover:-translate-y-1"
              layout
            >
              <div className="w-full h-full rounded-xl bg-slate-50 overflow-hidden flex items-center justify-center relative">
                <AnimatePresence mode="popLayout">
                  {displayImage ? (
                    <motion.div 
                      key="image"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0"
                    >
                      <Image src={displayImage} alt="Profile" fill className="object-cover" />
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="icon"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-slate-300"
                    >
                      {profileType === "business" ? <Building2 className="w-8 h-8" /> : <User className="w-8 h-8" />}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Verification Badge */}
            <motion.div 
              className="absolute top-3 right-6 flex items-center gap-1 bg-green-50 text-green-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-green-100 transition-transform duration-300 group-hover:scale-105"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified
            </motion.div>

            <div className="pt-14">
              {/* Name and Title */}
              <div className="mb-5">
                <div className="h-8 relative overflow-hidden flex items-end">
                  <AnimatePresence mode="popLayout">
                    <motion.h3 
                      key={displayName}
                      variants={previewTextChange}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className={`text-xl font-extrabold truncate w-full ${!professionalName && !businessName ? 'text-slate-300' : 'text-slate-900'}`}
                    >
                      {displayName}
                    </motion.h3>
                  </AnimatePresence>
                </div>
                
                <div className="h-5 relative overflow-hidden mt-0.5">
                  <AnimatePresence mode="popLayout">
                    <motion.div 
                      key={displaySubtitle}
                      variants={previewTextChange}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="flex items-center text-sm font-semibold text-[var(--color-primary)]"
                    >
                      {displaySubtitle}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Services Placeholder */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Services</p>
                    <p className="text-[10px] font-medium text-slate-500">Will be added next</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>

              {/* Description */}
              <div className="relative">
                <AnimatePresence mode="popLayout">
                  {description ? (
                    <motion.p
                      key="desc-text"
                      variants={previewTextChange}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="text-sm font-medium text-slate-600 leading-relaxed line-clamp-4"
                    >
                      {description}
                    </motion.p>
                  ) : (
                    <motion.p
                      key="desc-placeholder"
                      variants={previewTextChange}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="text-sm font-medium text-slate-300 leading-relaxed italic"
                    >
                      Your professional description will appear here.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
