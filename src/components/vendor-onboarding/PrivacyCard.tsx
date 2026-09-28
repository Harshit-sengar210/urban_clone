"use client";

import { ShieldCheck } from "lucide-react";

export function PrivacyCard() {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex gap-4">
      <div className="w-10 h-10 rounded-xl bg-slate-200/50 flex items-center justify-center shrink-0">
        <ShieldCheck className="w-5 h-5 text-slate-500" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-slate-800 mb-1">Protecting Your Information</h4>
        <p className="text-xs font-medium text-slate-600 leading-relaxed mb-3">
          Identity documents contain sensitive information. In this prototype, document files are handled locally for preview and are <span className="font-bold">not sent</span> to a verification service.
        </p>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Production verification should use a secure identity-verification service and appropriate data-protection controls.
        </p>
      </div>
    </div>
  );
}
