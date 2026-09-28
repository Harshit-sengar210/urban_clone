"use client";

import { motion } from "framer-motion";
import { FileCheck2, CheckCircle2 } from "lucide-react";
import { VendorVerificationSummary } from "@/types/vendor";
import { cn } from "@/lib/utils";

export function VerificationTimeline({ verification }: { verification: VendorVerificationSummary }) {
  
  const steps = [
    { id: "draft", label: "Profile Draft", completed: true },
    { id: "submitted", label: "Application Submitted", completed: true },
    { id: "under_review", label: "Admin Review", completed: verification.status === "approved" || verification.status === "needs_changes" },
    { id: "approved", label: "Verified Partner", completed: verification.status === "approved" }
  ];

  // Determine current active step index
  const currentIndex = steps.findIndex(s => s.id === verification.status);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm"
    >
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-500 shadow-sm border border-slate-100">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Verification & Application</h3>
        </div>
      </div>

      <div className="relative">
        {/* Mobile Vertical Line */}
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-100 md:hidden" />
        
        {/* Desktop Horizontal Line */}
        <div className="hidden md:block absolute top-4 left-4 right-4 h-0.5 bg-slate-100" />

        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4 relative z-10">
          {steps.map((step, index) => {
            const isCompleted = step.completed;
            const isCurrent = index === currentIndex;
            
            return (
              <div key={step.id} className="flex md:flex-col items-center gap-4 md:gap-3 group">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 bg-white transition-colors shrink-0",
                  isCompleted ? "border-emerald-500 text-emerald-500" :
                  isCurrent ? "border-indigo-500 ring-4 ring-indigo-100" :
                  "border-slate-200 text-slate-300"
                )}>
                  {isCompleted && <CheckCircle2 className="w-4 h-4" />}
                  {isCurrent && <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full" />}
                </div>
                
                <div className="md:text-center">
                  <div className={cn(
                    "font-bold text-sm",
                    isCompleted ? "text-slate-900" :
                    isCurrent ? "text-indigo-700" :
                    "text-slate-400"
                  )}>
                    {step.label}
                  </div>
                  {isCurrent && (
                    <div className="text-xs text-slate-500 mt-1 md:mx-auto max-w-[120px]">
                      Your application is currently at this stage.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {verification.status === "needs_changes" && (
        <div className="mt-8 p-4 bg-red-50 text-red-800 text-sm font-medium rounded-xl border border-red-100">
          <strong className="font-bold block mb-1">Action Required</strong>
          The admin team has requested some changes to your profile before approval. Please check your notifications for details.
        </div>
      )}

      {verification.status === "under_review" && (
        <div className="mt-8 flex justify-center">
          <button className="px-6 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 transition-colors text-sm">
            View Submitted Information
          </button>
        </div>
      )}
    </motion.div>
  );
}
