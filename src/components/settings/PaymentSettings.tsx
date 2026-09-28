"use client";

import { Plus, CreditCard, ReceiptIndianRupee, Banknote } from "lucide-react";
import { SettingsCard, SettingsRow, SettingsToggle } from "./SettingsLayout";
import { useToast } from "@/components/bookings/Toast";
import { useState } from "react";

interface PaymentSettingsProps {
  onAddPaymentMethod: () => void;
}

export function PaymentSettings({ onAddPaymentMethod }: PaymentSettingsProps) {
  const { showToast } = useToast();
  const [emailReceipts, setEmailReceipts] = useState(true);

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h2 className="text-xl font-extrabold text-[var(--color-foreground)]">Payment Preferences</h2>
        <p className="text-sm font-medium text-[var(--color-muted)] mt-1">Manage your saved payment methods and receipts.</p>
      </div>

      <SettingsCard title="Saved Payment Methods">
        <div className="space-y-4 mb-4">
          
          <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--color-primary)] bg-[var(--color-primary)]/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-white border border-slate-200 rounded flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--color-foreground)]">Visa ending in 4242</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-bold text-[var(--color-primary)] bg-primary/10 px-2 py-0.5 rounded">Default</span>
                  <span className="text-xs text-[var(--color-muted)]">Expires 12/28</span>
                </div>
              </div>
            </div>
            <button onClick={() => showToast("Cannot remove default payment method")} className="text-xs font-bold text-slate-500 hover:text-red-500 transition-colors">Remove</button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--color-border)]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-white border border-slate-200 rounded flex items-center justify-center">
                <ReceiptIndianRupee className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--color-foreground)]">UPI</p>
                <p className="text-xs text-[var(--color-muted)] mt-0.5">user@upi</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => showToast("Default payment method updated")} className="text-xs font-bold text-slate-500 hover:text-[var(--color-primary)] transition-colors">Set Default</button>
              <button className="text-xs font-bold text-slate-500 hover:text-red-500 transition-colors">Remove</button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--color-border)]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-white border border-slate-200 rounded flex items-center justify-center">
                <Banknote className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--color-foreground)]">Cash on Delivery</p>
                <p className="text-xs text-[var(--color-muted)] mt-0.5">Pay after service completion</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => showToast("Default payment method updated")} className="text-xs font-bold text-slate-500 hover:text-[var(--color-primary)] transition-colors">Set Default</button>
            </div>
          </div>
        </div>

        <button onClick={onAddPaymentMethod} className="w-full py-3 rounded-xl border border-dashed border-slate-300 text-[var(--color-primary)] text-sm font-bold hover:bg-[var(--color-primary)]/5 hover:border-[var(--color-primary)]/50 transition-all flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" /> Add Payment Method
        </button>
      </SettingsCard>

      <SettingsCard title="Payment Receipts">
        <SettingsRow label="Email me payment receipts" description="Receive a tax invoice after every completed service." control={<SettingsToggle checked={emailReceipts} onChange={(c) => { setEmailReceipts(c); showToast("Preference updated"); }} />} />
      </SettingsCard>
    </div>
  );
}
