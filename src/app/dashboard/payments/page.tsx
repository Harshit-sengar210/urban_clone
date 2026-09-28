"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, BellOff, CreditCard, ToggleLeft, ToggleRight } from "lucide-react";
import {
  MOCK_WALLET, MOCK_PAYMENT_METHODS, MOCK_TRANSACTIONS, MOCK_CREDITS, MOCK_PAYMENT_SUMMARY, MOCK_PREFERENCES,
  Wallet, PaymentMethod, Transaction, WalletCredit, PaymentSummaryData, PaymentPreferences,
} from "@/data/payments";
import { PaymentsPageHeader } from "@/components/payments/PaymentsPageHeader";
import { WalletBalanceCard } from "@/components/payments/WalletBalanceCard";
import { AddMoneyDrawer } from "@/components/payments/AddMoneyDrawer";
import { PaymentMethodSection } from "@/components/payments/PaymentMethodSection";
import { PaymentSummaryCard, AvailableCredits, PaymentSecurityCard } from "@/components/payments/PaymentSidebar";
import { TransactionSection } from "@/components/payments/TransactionSection";
import { PaymentSkeleton } from "@/components/payments/PaymentSkeleton";
import { ToastContainer, useToast } from "@/components/bookings/Toast";

// ─── Payment Preferences Card ─────────────────────────────────────────────────
function PreferencesCard({ prefs, methods, onChange }: {
  prefs: PaymentPreferences;
  methods: PaymentMethod[];
  onChange: (p: PaymentPreferences) => void;
}) {
  const defaultMethod = methods.find(m => m.id === prefs.defaultMethodId);
  const defaultLabel = defaultMethod
    ? (defaultMethod.type === "card" ? `${defaultMethod.brand} •••• ${defaultMethod.last4}` : defaultMethod.upiId)
    : "Wallet";

  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button onClick={onToggle} className="text-[var(--color-primary)] hover:opacity-80 transition-opacity">
      {on ? <ToggleRight className="w-7 h-7" /> : <ToggleLeft className="w-7 h-7 text-slate-400" />}
    </button>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
      className="bg-white border border-[var(--color-border)] rounded-2xl shadow-sm p-5">
      <h3 className="font-bold text-[var(--color-foreground)] mb-4">Payment Preferences</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between py-2 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-slate-400" />
            <div>
              <p className="text-sm font-semibold text-[var(--color-foreground)]">Default Method</p>
              <p className="text-xs text-[var(--color-muted)]">{defaultLabel}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[var(--color-foreground)]">Save payment methods</p>
            <p className="text-xs text-[var(--color-muted)]">Faster checkout experience</p>
          </div>
          <Toggle on={prefs.savePaymentMethod} onToggle={() => onChange({ ...prefs, savePaymentMethod: !prefs.savePaymentMethod })} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[var(--color-foreground)]">Payment notifications</p>
            <p className="text-xs text-[var(--color-muted)]">Alerts on charges & refunds</p>
          </div>
          <Toggle on={prefs.paymentNotifications} onToggle={() => onChange({ ...prefs, paymentNotifications: !prefs.paymentNotifications })} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Wallet Info Card ────────────────────────────────────────────────────────
function WalletInfoCard({ maxBalance }: { maxBalance: number }) {
  return (
    <div className="bg-slate-50 border border-[var(--color-border)] rounded-2xl p-4 text-xs text-[var(--color-muted)] leading-relaxed">
      <p className="font-bold text-[var(--color-foreground)] mb-1">Wallet Information</p>
      Maximum wallet balance: ₹{maxBalance.toLocaleString()}. Wallet funds are non-transferable and may be subject to UrbanClone terms and conditions.
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function PaymentsPage() {
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState<Wallet>(MOCK_WALLET);
  const [methods, setMethods] = useState<PaymentMethod[]>(MOCK_PAYMENT_METHODS);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [credits] = useState<WalletCredit[]>(MOCK_CREDITS);
  const [summary] = useState<PaymentSummaryData>(MOCK_PAYMENT_SUMMARY);
  const [prefs, setPrefs] = useState<PaymentPreferences>(MOCK_PREFERENCES);
  const [addMoneyOpen, setAddMoneyOpen] = useState(false);
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  // ── Wallet ──────────────────────────────────────────────────────────────
  const handleWalletTopup = (amount: number, methodId: string) => {
    setWallet(w => ({ ...w, balance: Math.min(w.balance + amount, w.maxBalance) }));
    setTransactions(prev => [{
      id: `TXN-${Date.now()}`,
      type: "wallet_topup",
      direction: "credit",
      title: "Wallet Top-up",
      description: "Added via payment",
      amount,
      status: "completed",
      date: new Date().toISOString(),
      paymentMethodLabel: methods.find(m => m.id === methodId)?.type === "upi"
        ? (methods.find(m => m.id === methodId) as any).upiId
        : methods.find(m => m.id === methodId)?.type === "card"
          ? `${(methods.find(m => m.id === methodId) as any).brand} •••• ${(methods.find(m => m.id === methodId) as any).last4}`
          : "Unknown",
    }, ...prev]);
    showToast(`₹${amount.toLocaleString()} added to your wallet.`);
  };

  // ── Payment Methods ─────────────────────────────────────────────────────
  const handleSetDefault = (id: string) => {
    setMethods(prev => prev.map(m => ({ ...m, isDefault: m.id === id })));
    showToast("Default payment method updated.");
  };

  const handleRemove = (id: string) => {
    setMethods(prev => prev.filter(m => m.id !== id));
    showToast("Payment method removed.");
  };

  const handleAdd = (m: Omit<PaymentMethod, "id" | "addedAt">) => {
    const newMethod = { ...m, id: `pm_${Date.now()}`, addedAt: new Date().toISOString() } as PaymentMethod;
    setMethods(prev => [...prev, newMethod]);
    showToast("Payment method added.");
  };

  if (loading) {
    return (
      <div className="px-4 md:px-6 py-6 max-w-screen-xl mx-auto">
        <PaymentsPageHeader />
        <PaymentSkeleton />
      </div>
    );
  }

  return (
    <>
      <div className="px-4 md:px-6 py-6 max-w-screen-xl mx-auto space-y-6">
        <PaymentsPageHeader />

        {/* Wallet Card */}
        <WalletBalanceCard wallet={wallet} onAddMoney={() => setAddMoneyOpen(true)} />

        {/* Middle row: Payment Methods (left) + Summary/Credits (right) */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-5">
          <PaymentMethodSection
            methods={methods}
            onSetDefault={handleSetDefault}
            onRemove={handleRemove}
            onAdd={handleAdd}
          />
          <div className="space-y-4">
            <PaymentSummaryCard summary={summary} />
            <AvailableCredits credits={credits} />
            <PreferencesCard prefs={prefs} methods={methods} onChange={setPrefs} />
            <WalletInfoCard maxBalance={wallet.maxBalance} />
            <PaymentSecurityCard />
          </div>
        </div>

        {/* Transactions — full width */}
        <TransactionSection transactions={transactions} />
      </div>

      {/* Add Money Drawer */}
      <AddMoneyDrawer
        open={addMoneyOpen}
        onClose={() => setAddMoneyOpen(false)}
        paymentMethods={methods}
        onConfirm={handleWalletTopup}
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
