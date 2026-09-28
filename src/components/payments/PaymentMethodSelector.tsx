"use client";

import { useState } from "react";
import { CreditCard, Smartphone, Wallet, CheckCircle2, AlertCircle } from "lucide-react";
import { PaymentMethod, Wallet as WalletType } from "@/data/payments";
import { cn } from "@/lib/utils";

interface PaymentMethodSelectorProps {
  paymentMethods: PaymentMethod[];
  wallet: WalletType;
  amount: number;
  selectedId: string;
  onSelect: (id: string) => void;
}

export function PaymentMethodSelector({ paymentMethods, wallet, amount, selectedId, onSelect }: PaymentMethodSelectorProps) {
  const walletInsufficient = wallet.balance < amount;

  const OPTIONS = [
    {
      id: "wallet",
      icon: <Wallet className="w-4 h-4 text-[var(--color-primary)]" />,
      label: "UrbanClone Wallet",
      sub: walletInsufficient
        ? `Balance ₹${wallet.balance.toLocaleString()} — ₹${(amount - wallet.balance).toLocaleString()} short`
        : `Balance ₹${wallet.balance.toLocaleString()}`,
      disabled: walletInsufficient,
    },
    ...paymentMethods.map(m => ({
      id: m.id,
      icon: m.type === "upi"
        ? <Smartphone className="w-4 h-4 text-green-500" />
        : <CreditCard className="w-4 h-4 text-blue-500" />,
      label: m.type === "upi" ? m.upiId : `${m.brand} •••• ${m.last4}`,
      sub: m.type === "card" ? `Expires ${String(m.expiryMonth).padStart(2, "0")}/${m.expiryYear}` : "UPI",
      disabled: false,
    })),
  ];

  return (
    <div className="space-y-2">
      {OPTIONS.map(opt => (
        <button
          key={opt.id}
          onClick={() => !opt.disabled && onSelect(opt.id)}
          disabled={opt.disabled}
          className={cn(
            "w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all",
            opt.disabled ? "opacity-50 cursor-not-allowed border-[var(--color-border)]" :
            selectedId === opt.id
              ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
              : "border-[var(--color-border)] hover:border-slate-300"
          )}
        >
          <div className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors",
            selectedId === opt.id ? "border-[var(--color-primary)]" : "border-slate-300"
          )}>
            {selectedId === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]" />}
          </div>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {opt.icon}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[var(--color-foreground)] truncate">{opt.label}</p>
              <p className={cn("text-xs mt-0.5 truncate", opt.disabled ? "text-red-400" : "text-[var(--color-muted)]")}>{opt.sub}</p>
            </div>
          </div>
          {selectedId === opt.id && !opt.disabled && (
            <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0" />
          )}
          {opt.disabled && (
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          )}
        </button>
      ))}
    </div>
  );
}
