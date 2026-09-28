"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, FileText, User, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

type ApplicationStatus = "draft" | "submitted" | "under_review" | "approved" | "needs_changes";

const STATUS_FLOW: { key: ApplicationStatus; label: string }[] = [
  { key: "draft", label: "Draft" },
  { key: "submitted", label: "Submitted" },
  { key: "under_review", label: "Under Review" },
  { key: "approved", label: "Approved" },
];

const STATUS_CONFIG: Record<ApplicationStatus, { label: string; color: string; description: string }> = {
  draft: { label: "Draft", color: "text-slate-500 bg-slate-100 border-slate-200", description: "Your application is incomplete." },
  submitted: { label: "Submitted", color: "text-blue-700 bg-blue-50 border-blue-200", description: "Your application has been submitted for review." },
  under_review: { label: "Under Review", color: "text-amber-700 bg-amber-50 border-amber-200", description: "Our team is reviewing your application." },
  approved: { label: "Verified Partner", color: "text-emerald-700 bg-emerald-50 border-emerald-200", description: "Your account is verified. You can accept bookings." },
  needs_changes: { label: "Needs Changes", color: "text-red-700 bg-red-50 border-red-200", description: "Please review and update the requested information." },
};

export function VerificationSection() {
  const router = useRouter();
  const currentStatus: ApplicationStatus = "under_review";
  const cfg = STATUS_CONFIG[currentStatus];
  const currentIndex = STATUS_FLOW.findIndex(s => s.key === currentStatus);

  const docs = [
    { label: "Identity Documents", icon: FileText, status: "Submitted" },
    { label: "Profile Information", icon: User, status: "Complete" },
    { label: "Service Categories", icon: CheckCircle2, status: "Complete" },
  ];

  return (
    <div className="space-y-5">
      {/* Status Card */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="font-bold text-slate-900">Application Status</h2>
              <p className="text-xs text-slate-500 mt-0.5">Your partner account verification progress.</p>
            </div>
            <span className={cn("text-xs font-black px-3 py-1.5 rounded-full border", cfg.color)}>{cfg.label}</span>
          </div>
        </div>

        <div className="p-6">
          <p className="text-sm text-slate-600 mb-6">{cfg.description}</p>

          {/* Status timeline */}
          <div className="flex items-center gap-0 mb-6">
            {STATUS_FLOW.map((s, i) => {
              const isCompleted = i < currentIndex;
              const isCurrent = i === currentIndex;
              return (
                <div key={s.key} className="flex items-center flex-1">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-all",
                      isCompleted ? "bg-emerald-500 border-emerald-500" :
                      isCurrent ? "bg-indigo-600 border-indigo-600 ring-4 ring-indigo-100" :
                      "bg-white border-slate-200"
                    )}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4 text-white" /> :
                     isCurrent ? <Clock className="w-3.5 h-3.5 text-white" /> :
                     <div className="w-2 h-2 rounded-full bg-slate-300" />}
                  </motion.div>
                  {i < STATUS_FLOW.length - 1 && (
                    <div className={cn("flex-1 h-0.5", i < currentIndex ? "bg-emerald-300" : "bg-slate-100")} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between">
            {STATUS_FLOW.map(s => (
              <span key={s.key} className={cn("text-[10px] font-bold", s.key === currentStatus ? "text-indigo-600" : "text-slate-400")}>
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Documents */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <h2 className="font-bold text-slate-900">Submitted Information</h2>
        </div>
        <div className="px-6 divide-y divide-slate-50">
          {docs.map(doc => (
            <div key={doc.label} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                  <doc.icon className="w-4 h-4 text-slate-500" />
                </div>
                <span className="text-sm font-bold text-slate-900">{doc.label}</span>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">{doc.status}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <button
        onClick={() => router.push("/vendor/profile")}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
      >
        <ExternalLink className="w-4 h-4" /> View Full Profile & Verification
      </button>
    </div>
  );
}
