"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ExternalLink, CreditCard, CheckCircle2 } from "lucide-react";
import { SectionCard, SettingsToggle, SettingRow } from "../shared/SettingsShared";

interface PayoutPrefsSectionProps {
  onToast: (msg: string) => void;
}

export function PayoutPreferencesSection({ onToast }: PayoutPrefsSectionProps) {
  const [autoPayout, setAutoPayout] = useState(true);
  const router = useRouter();

  return (
    <div className="space-y-5">
      <SectionCard title="Payout Preferences" description="How and when your earnings are transferred." delay={0}>
        <SettingRow label="Payout Method" value="Bank Account •••• 4821" />
        <SettingRow label="Payout Frequency" value="Monthly" badge="Demo" />
        <SettingsToggle
          id="auto-payout"
          checked={autoPayout}
          onChange={v => { setAutoPayout(v); onToast(v ? "Auto payout enabled." : "Auto payout disabled."); }}
          label="Auto Payout"
          description="Automatically transfer your available balance at the end of each cycle."
        />
      </SectionCard>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm">Payout details configured</p>
            <p className="text-xs text-slate-400">Bank account and UPI registered. (Demo)</p>
          </div>
        </div>
        <button
          onClick={() => router.push("/vendor/earnings")}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-colors"
        >
          <ExternalLink className="w-4 h-4" /> Manage Payout Details
        </button>
      </motion.div>

      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-xs text-amber-700 font-medium">
        ⚠️ This is a demo environment. No real financial transactions are performed and no banking credentials are stored.
      </div>
    </div>
  );
}
