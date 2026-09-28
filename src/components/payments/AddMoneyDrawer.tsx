"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Wallet, CreditCard, Smartphone, CheckCircle2, Loader2 } from "lucide-react";
import { PaymentMethod } from "@/data/payments";

const QUICK_AMOUNTS = [500, 1000, 2000, 5000];

interface AddMoneyDrawerProps {
  open: boolean;
  onClose: () => void;
  paymentMethods: PaymentMethod[];
  onConfirm: (amount: number, methodId: string) => void;
}

type Step = "form" | "processing" | "success";

export function AddMoneyDrawer({ open, onClose, paymentMethods, onConfirm }: AddMoneyDrawerProps) {
  const [amount, setAmount] = useState<number | "">(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods.find(m => m.isDefault)?.id ?? paymentMethods[0]?.id ?? "");
  const [step, setStep] = useState<Step>("form");
  const [amountError, setAmountError] = useState("");

  const finalAmount = customAmount ? Number(customAmount) : (amount || 0);

  const validate = () => {
    if (!finalAmount || finalAmount < 100) { setAmountError("Minimum amount is ₹100."); return false; }
    if (finalAmount > 50000) { setAmountError("Maximum amount is ₹50,000."); return false; }
    setAmountError("");
    return true;
  };

  const handleContinue = () => {
    if (!validate()) return;
    setStep("processing");
    setTimeout(() => {
      setStep("success");
      onConfirm(finalAmount, selectedMethod);
    }, 1800);
  };

  const handleClose = () => {
    setStep("form");
    setAmount(1000);
    setCustomAmount("");
    setAmountError("");
    onClose();
  };

  const methodLabel = (m: PaymentMethod) =>
    m.type === "upi" ? m.upiId : `${m.brand} •••• ${m.last4}`;

  const methodIcon = (m: PaymentMethod) =>
    m.type === "upi" ? <Smartphone className="w-4 h-4 text-green-500" /> : <CreditCard className="w-4 h-4 text-blue-500" />;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="absolute right-0 top-0 bottom-0 w-full sm:w-[460px] bg-white flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border)] flex-shrink-0">
              <div>
                <h2 className="text-lg font-extrabold text-[var(--color-foreground)]">Add Money</h2>
                <p className="text-xs text-[var(--color-muted)] mt-0.5">Top up your UrbanClone wallet</p>
              </div>
              <button onClick={handleClose} className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-colors">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {step === "form" && (
                <div className="space-y-5">
                  {/* Quick Amounts */}
                  <div>
                    <p className="text-xs font-bold text-[var(--color-foreground)] mb-3 uppercase tracking-wider">Choose amount</p>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {QUICK_AMOUNTS.map((a) => (
                        <button
                          key={a}
                          onClick={() => { setAmount(a); setCustomAmount(""); setAmountError(""); }}
                          className={`py-3 rounded-xl border text-sm font-bold transition-all ${
                            amount === a && !customAmount
                              ? "border-[var(--color-primary)] bg-[var(--color-primary)]/8 text-[var(--color-primary)]"
                              : "border-[var(--color-border)] text-[var(--color-foreground)] hover:border-[var(--color-primary)]"
                          }`}
                        >
                          ₹{a.toLocaleString()}
                        </button>
                      ))}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[var(--color-foreground)] mb-1.5 uppercase tracking-wider">Custom Amount</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[var(--color-muted)]">₹</span>
                        <input
                          type="number"
                          min={100}
                          max={50000}
                          value={customAmount}
                          onChange={(e) => { setCustomAmount(e.target.value); setAmount(""); setAmountError(""); }}
                          placeholder="Enter amount"
                          className={`w-full h-11 pl-8 pr-4 rounded-xl border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all ${amountError ? "border-red-300 focus:border-red-400" : "border-[var(--color-border)] focus:border-[var(--color-primary)]"}`}
                        />
                      </div>
                      {amountError && <p className="text-xs text-red-500 font-medium mt-1">{amountError}</p>}
                    </div>
                  </div>

                  {/* Payment Method */}
                  {paymentMethods.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-[var(--color-foreground)] mb-3 uppercase tracking-wider">Payment Method</p>
                      <div className="space-y-2">
                        {paymentMethods.map((m) => (
                          <button
                            key={m.id}
                            onClick={() => setSelectedMethod(m.id)}
                            className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                              selectedMethod === m.id ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5" : "border-[var(--color-border)] hover:border-slate-300"
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedMethod === m.id ? "border-[var(--color-primary)]" : "border-slate-300"}`}>
                              {selectedMethod === m.id && <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]" />}
                            </div>
                            <div className="flex items-center gap-2 flex-1">
                              {methodIcon(m)}
                              <span className="text-sm font-semibold text-[var(--color-foreground)]">{methodLabel(m)}</span>
                            </div>
                            {m.isDefault && <span className="text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full">Default</span>}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === "processing" && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Loader2 className="w-12 h-12 text-[var(--color-primary)] animate-spin mb-4" />
                  <p className="font-bold text-[var(--color-foreground)] text-lg mb-1">Processing payment...</p>
                  <p className="text-sm text-[var(--color-muted)]">Please wait while we process your transaction.</p>
                </div>
              )}

              {step === "success" && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-9 h-9 text-green-600" />
                  </div>
                  <p className="font-extrabold text-[var(--color-foreground)] text-xl mb-2">Payment Successful</p>
                  <p className="text-sm text-[var(--color-muted)] mb-1">
                    <span className="font-bold text-[var(--color-foreground)]">₹{finalAmount.toLocaleString()}</span> added to your UrbanClone wallet.
                  </p>
                  <p className="text-xs text-[var(--color-muted)]">Your wallet balance has been updated.</p>
                </div>
              )}
            </div>

            {/* Footer */}
            {step === "form" && (
              <div className="px-6 py-5 border-t border-[var(--color-border)] bg-white flex-shrink-0">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-[var(--color-muted)]">Adding to wallet</span>
                  <span className="text-lg font-extrabold text-[var(--color-primary)]">
                    {finalAmount ? `₹${finalAmount.toLocaleString()}` : "—"}
                  </span>
                </div>
                <button
                  onClick={handleContinue}
                  disabled={!finalAmount}
                  className="w-full h-11 rounded-xl bg-[var(--color-primary)] text-white text-sm font-bold hover:opacity-90 disabled:opacity-40 transition-all"
                >
                  Continue to Payment
                </button>
              </div>
            )}
            {step === "success" && (
              <div className="px-6 py-5 border-t border-[var(--color-border)] bg-white flex-shrink-0">
                <button onClick={handleClose} className="w-full h-11 rounded-xl bg-[var(--color-primary)] text-white text-sm font-bold hover:opacity-90 transition-all">
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
