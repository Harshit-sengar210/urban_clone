"use client";

import { MessageCircle, Mail, Phone, ShieldAlert } from "lucide-react";

interface SupportContactProps {
  onStartRequest: () => void;
  onSafetyReport: () => void;
}

export function SupportContact({ onStartRequest, onSafetyReport }: SupportContactProps) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-50 border border-[var(--color-border)] rounded-3xl p-6 md:p-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-extrabold text-[var(--color-foreground)] mb-2">Still need help?</h2>
          <p className="text-sm text-[var(--color-muted)] font-medium mb-4 max-w-sm mx-auto md:mx-0">
            Our support team is here for you. We typically reply within a few minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
            <button onClick={onStartRequest} className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-bold shadow-md shadow-primary/20 hover:opacity-90 transition-opacity">
              Start a Support Request
            </button>
            <button onClick={onStartRequest} className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white border border-[var(--color-border)] text-[var(--color-foreground)] text-sm font-bold shadow-sm hover:bg-slate-100 transition-colors">
              Contact Support
            </button>
          </div>
        </div>

        {/* Contact Info blocks */}
        <div className="flex flex-col gap-3 w-full md:w-auto">
          <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[var(--color-border)] shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-[var(--color-foreground)]">Chat Support</p>
              <p className="text-[10px] text-[var(--color-muted)]">Usually replies in minutes</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[var(--color-border)] shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
              <Mail className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-[var(--color-foreground)]">Email Support</p>
              <a href="mailto:support@urbanclone.demo" className="text-[10px] text-[var(--color-primary)] hover:underline font-medium">support@urbanclone.demo</a>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[var(--color-border)] shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
              <Phone className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-[var(--color-foreground)]">Phone Support</p>
              <p className="text-[10px] text-[var(--color-muted)]">1800-000-000</p>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="bg-white border border-red-200 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
            <ShieldAlert className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-[var(--color-foreground)] text-sm mb-0.5">Safety concern?</h3>
            <p className="text-xs text-[var(--color-muted)] font-medium leading-relaxed">
              If a situation involves immediate danger, contact local emergency services immediately. For non-emergency safety concerns with professionals or services, let us know.
            </p>
          </div>
        </div>
        <button onClick={onSafetyReport} className="flex-shrink-0 w-full md:w-auto px-4 py-2 rounded-lg border border-red-200 text-red-600 text-xs font-bold hover:bg-red-50 transition-colors">
          Report a Safety Concern
        </button>
      </div>
    </div>
  );
}
