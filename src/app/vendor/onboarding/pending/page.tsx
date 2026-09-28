"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, ArrowRight, ShieldCheck, Clock3, UserCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { VendorOnboardingHeader } from "@/components/vendor-onboarding/VendorOnboardingHeader";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const staggerItem: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

export default function PendingVerificationPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <VendorOnboardingHeader />

      <main className="flex-1 flex flex-col items-center justify-center p-6 py-12 md:py-24">
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-indigo-900/5 border border-slate-100 overflow-hidden"
        >
          {/* Header Area */}
          <div className="bg-slate-900 p-8 sm:p-12 text-center relative overflow-hidden">
            {/* Decorative Orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none transform -translate-x-1/2 translate-y-1/2" />

            <motion.div 
              variants={staggerItem}
              className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center"
            >
              {/* Outer pulsing ring */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border-2 border-indigo-500/30"
              />
              <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-indigo-400/30">
                <ClipboardCheck className="w-10 h-10 text-indigo-300" />
              </div>
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-lg"
              >
                <CheckCircle2 className="w-5 h-5 text-white" />
              </motion.div>
            </motion.div>

            <motion.h1 variants={staggerItem} className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Application Submitted
            </motion.h1>
            <motion.p variants={staggerItem} className="text-indigo-200 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Your UrbanClone partner application has been successfully submitted for review.
            </motion.p>
            
            <motion.div variants={staggerItem} className="mt-8 inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 px-4 py-2 rounded-full">
              <Clock3 className="w-4 h-4 text-indigo-300" />
              <span className="text-xs font-bold text-indigo-200 uppercase tracking-widest">Verification Pending</span>
            </motion.div>
          </div>

          {/* Content Area */}
          <div className="p-8 sm:p-12">
            
            {/* Timeline */}
            <motion.div variants={staggerItem} className="mb-12">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6">What Happens Next</h3>
              
              <div className="relative pl-6 space-y-8">
                <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-slate-100" />
                
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Application Submitted</h4>
                    <p className="text-xs text-slate-500 mt-1">Your onboarding information is 100% complete.</p>
                  </div>
                </div>

                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 border-2 border-indigo-500 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-indigo-900">Identity Review</h4>
                    <p className="text-xs text-indigo-600/80 mt-1">Our team is verifying your submitted documents.</p>
                  </div>
                </div>

                <div className="relative z-10 flex items-start gap-4 opacity-50">
                  <div className="w-5 h-5 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Admin Review</h4>
                    <p className="text-xs text-slate-500 mt-1">Final review of your services and experience.</p>
                  </div>
                </div>

                <div className="relative z-10 flex items-start gap-4 opacity-50">
                  <div className="w-5 h-5 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Dashboard Access</h4>
                    <p className="text-xs text-slate-500 mt-1">Once approved, you'll get full access to your vendor dashboard.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Note Card */}
            <motion.div variants={staggerItem} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 mb-10 flex gap-4">
              <ShieldCheck className="w-6 h-6 text-slate-400 shrink-0" />
              <div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We'll notify you via email and SMS once the review is complete. If our team needs any additional information or changes, we will reach out to you directly.
                </p>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/vendor/onboarding/review"
                className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                View Application
              </Link>
              <Link 
                href="/"
                className="flex-1 h-12 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 font-bold rounded-xl transition-colors flex items-center justify-center"
              >
                Back to Home
              </Link>
            </motion.div>

          </div>
        </motion.div>
      </main>
    </div>
  );
}
