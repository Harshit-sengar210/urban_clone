"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, FileCheck, BadgeCheck, LockKeyhole, Fingerprint, CheckCircle2, Circle } from "lucide-react";
import { floatAnimation, pulseRing, staggerContainer, staggerItem } from "./animations";
import { cn } from "@/lib/utils";

import { IdentityDocumentType } from "./DocumentTypeSelector";

const timelineSteps = [
  { id: 1, label: "Profile Information", status: "completed" },
  { id: 2, label: "Professional Details", status: "completed" },
  { id: 3, label: "Identity Documents", status: "current" },
  { id: 4, label: "Account & Payout", status: "upcoming" },
  { id: 5, label: "Final Review", status: "upcoming" },
];

interface VerificationVisualProps {
  documentType: IdentityDocumentType | "";
  documentNumber: string;
  nameOnDocument: string;
  frontImage?: string;
  isEditing?: boolean;
}

export function VerificationVisual({
  documentType,
  documentNumber,
  nameOnDocument,
  frontImage,
  isEditing = false
}: VerificationVisualProps) {
  
  // Format the document number for display (masking part of it for realism, or just showing what they typed)
  const displayNum = documentNumber ? documentNumber : "•••• •••• ••••";
  const displayName = nameOnDocument ? nameOnDocument : "YOUR LEGAL NAME";
  
  return (
    <div className="w-full h-full flex flex-col pt-8 md:pt-16 px-6 lg:px-12 bg-slate-50 relative overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-indigo-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-purple-100/30 rounded-full blur-3xl" />
      
      {/* Floating Abstract Visual */}
      <motion.div 
        layout
        className={cn(
          "relative w-full flex items-center justify-center transition-all duration-700",
          isEditing ? "h-full mb-0 mt-[-5%]" : "h-64 md:h-80 mb-8"
        )}
      >
        
        {/* Pulsing Rings */}
        <AnimatePresence>
          {!isEditing && (
            <>
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="absolute w-48 h-48 rounded-full border border-indigo-200" />
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ delay: 0.2 }} className="absolute w-64 h-64 rounded-full border border-purple-200/50" />
            </>
          )}
        </AnimatePresence>
        
        {/* Central Identity Document Card */}
        <motion.div 
          layout
          variants={!isEditing ? floatAnimation : {}} 
          initial="initial" 
          animate={!isEditing ? "animate" : { y: 0, scale: 1.3 }} 
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={cn(
            "relative z-10 aspect-[1.586/1] bg-white rounded-2xl shadow-xl shadow-indigo-900/10 border border-slate-100 flex flex-col overflow-hidden transition-all duration-700",
            isEditing ? "w-64 md:w-80" : "w-48 md:w-56"
          )}
        >
          <AnimatePresence mode="wait">
            {frontImage ? (
              <motion.img 
                key="image"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                src={frontImage} 
                className="w-full h-full object-cover" 
                alt="Document Preview"
              />
            ) : (
              <motion.div 
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full relative bg-white transition-colors duration-500 overflow-hidden"
              >
                {/* Shining Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white via-white to-slate-50/50 pointer-events-none" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 blur-2xl rounded-full pointer-events-none" />
                
                {/* Left Pillar (Fingerprint + Photo Block) */}
                <div className="absolute top-8 bottom-0 md:bottom-8 left-8 md:left-10 w-16 md:w-20 flex flex-col items-center">
                  {/* Fingerprint Circle */}
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#f1f5f9] flex items-center justify-center shrink-0 z-10">
                    <Fingerprint className="w-7 h-7 md:w-10 md:h-10 text-[#6366f1]" strokeWidth={2.5} />
                  </div>
                  {/* Photo Block connecting seamlessly under the circle */}
                  <div className="w-16 md:w-20 flex-1 bg-[#f1f5f9] -mt-8 md:-mt-10 md:rounded-b-xl z-0" />
                </div>
                  
                {/* Details positioned to the right */}
                <div className="absolute top-1/2 -translate-y-1/2 left-[120px] md:left-[160px] flex flex-col justify-center w-[120px] md:w-[180px] overflow-hidden z-20">
                  <span className="text-[9px] md:text-[11px] font-extrabold uppercase tracking-widest text-[#94a3b8] mb-1">
                    Name
                  </span>
                  <span className="text-sm md:text-xl font-black text-[#1e293b] truncate">
                    {displayName}
                  </span>
                  
                  {documentType && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="mt-2 text-[9px] md:text-[11px] font-extrabold text-[#cbd5e1] uppercase tracking-widest"
                    >
                      {documentType.replace('_', ' ')}
                    </motion.div>
                  )}
                  
                  {/* Document Number */}
                  <span className="mt-1 text-[10px] md:text-sm font-bold text-[#64748b] font-mono tracking-wider truncate">
                    {displayNum}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Small floating elements */}
        <AnimatePresence>
          {!isEditing && (
            <>
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, y: [-5, 5, -5], rotate: [-2, 2, -2] }} 
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-8 left-[10%] bg-white p-2.5 rounded-xl shadow-lg shadow-slate-200/50 border border-slate-100 z-20 flex items-center gap-2"
              >
                <BadgeCheck className="w-4 h-4 text-blue-500" />
                <span className="text-[9px] font-bold text-slate-700 uppercase tracking-wider">Identity</span>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, y: [6, -6, 6], rotate: [2, -2, 2] }} 
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-12 right-[10%] bg-white p-2.5 rounded-xl shadow-lg shadow-slate-200/50 border border-slate-100 z-20 flex items-center gap-2"
              >
                <FileCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-[9px] font-bold text-slate-700 uppercase tracking-wider">Document</span>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, y: [-4, 4, -4] }} 
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute top-24 right-[15%] w-10 h-10 bg-white rounded-full shadow-lg shadow-slate-200/50 border border-slate-100 z-20 flex items-center justify-center"
              >
                <LockKeyhole className="w-4 h-4 text-slate-400" />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Verification Timeline */}
      <AnimatePresence>
        {!isEditing && (
          <motion.div 
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 20, height: 0 }}
            className="relative z-10 max-w-sm w-full mx-auto md:mx-0 overflow-hidden"
          >
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 ml-2">Verification Journey</h3>
            
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-0 relative pl-2">
              {/* Vertical line connecting steps */}
              <div className="absolute top-3 bottom-3 left-[15px] w-0.5 bg-slate-200 -z-10" />

              {timelineSteps.map((step, index) => (
                <motion.div key={step.id} variants={staggerItem} className="relative flex items-center gap-4 h-12">
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors duration-500",
                    step.status === "completed" ? "bg-green-500 text-white" :
                    step.status === "current" ? "bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] shadow-sm" :
                    "bg-slate-100 text-slate-300"
                  )}>
                    {step.status === "completed" ? <CheckCircle2 className="w-4 h-4" /> : 
                     step.status === "current" ? <Circle className="w-3 h-3 fill-current" /> :
                     <Circle className="w-3 h-3" />}
                  </div>
                  <span className={cn(
                    "text-sm transition-colors duration-500",
                    step.status === "completed" ? "font-semibold text-slate-600" :
                    step.status === "current" ? "font-extrabold text-[var(--color-foreground)] text-base" :
                    "font-medium text-slate-400"
                  )}>
                    {step.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
