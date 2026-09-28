"use client";

import { CreditCard, Wallet, Coins, Check, ScanLine } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export type PaymentMethod = "card" | "upi" | "cod";

interface PaymentSelectionProps {
  selectedMethod: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

export function PaymentSelection({ selectedMethod, onSelect }: PaymentSelectionProps) {
  const methods = [
    {
      id: "card",
      title: "Credit / Debit Card",
      description: "Pay securely with your bank card",
      icon: CreditCard,
    },
    {
      id: "upi",
      title: "UPI",
      description: "Pay via Google Pay, PhonePe, Paytm",
      icon: Wallet,
    },
    {
      id: "cod",
      title: "Pay after service",
      description: "Pay via Cash or UPI after service completion",
      icon: Coins,
    }
  ] as const;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">Choose Payment Method</h2>

      <div className="space-y-4">
        {methods.map((method) => {
          const isSelected = selectedMethod === method.id;
          const Icon = method.icon;
          
          return (
            <div 
              key={method.id} 
              className={cn(
                "rounded-2xl border-2 transition-all overflow-hidden",
                isSelected
                  ? "border-[var(--color-primary)] shadow-md shadow-primary/5"
                  : "border-[var(--color-border)] hover:border-[var(--color-primary)]/40 bg-white"
              )}
            >
              <button
                onClick={() => onSelect(method.id as PaymentMethod)}
                className={cn(
                  "w-full p-5 text-left flex items-start gap-4 transition-colors",
                  isSelected ? "bg-[var(--color-primary)]/5" : "bg-white hover:bg-[var(--color-surface-hover)]"
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 shrink-0 transition-colors",
                  isSelected ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white" : "border-[var(--color-muted)] bg-transparent"
                )}>
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <Icon className={cn("w-5 h-5", isSelected ? "text-[var(--color-primary)]" : "text-[var(--color-muted)]")} />
                    <h4 className={cn("font-bold text-lg", isSelected ? "text-[var(--color-primary)]" : "text-[var(--color-foreground)]")}>
                      {method.title}
                    </h4>
                  </div>
                  <p className="text-[var(--color-muted)] text-sm leading-relaxed pl-8">
                    {method.description}
                  </p>
                </div>
              </button>

              <AnimatePresence>
                {isSelected && method.id === "upi" && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: "auto", opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }} 
                    className="px-5 pb-5 bg-[var(--color-primary)]/5"
                  >
                    <div className="pt-4 border-t border-[var(--color-primary)]/10 pl-14">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-1.5">Enter UPI ID</label>
                          <input type="text" placeholder="example@okhdfcbank" className="w-full h-11 px-4 rounded-xl border border-[var(--color-border)] bg-white focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
                        </div>
                        <div className="relative flex items-center py-2">
                          <div className="flex-grow border-t border-[var(--color-border)]"></div>
                          <span className="flex-shrink-0 mx-4 text-xs font-bold text-[var(--color-muted)] uppercase tracking-widest">OR</span>
                          <div className="flex-grow border-t border-[var(--color-border)]"></div>
                        </div>
                        <button className="w-full h-11 rounded-xl bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-bold flex items-center justify-center gap-2 hover:bg-[var(--color-primary)]/5 transition-colors">
                          <ScanLine className="w-5 h-5" />
                          Scan QR Code
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {isSelected && method.id === "card" && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: "auto", opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }} 
                    className="px-5 pb-5 bg-[var(--color-primary)]/5"
                  >
                    <div className="pt-4 border-t border-[var(--color-primary)]/10 pl-14">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-1.5">Card Number</label>
                          <input type="text" placeholder="0000 0000 0000 0000" className="w-full h-11 px-4 rounded-xl border border-[var(--color-border)] bg-white focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-1.5">Expiry (MM/YY)</label>
                            <input type="text" placeholder="MM/YY" className="w-full h-11 px-4 rounded-xl border border-[var(--color-border)] bg-white focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-1.5">CVV</label>
                            <input type="password" placeholder="123" className="w-full h-11 px-4 rounded-xl border border-[var(--color-border)] bg-white focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-1.5">Name on Card</label>
                          <input type="text" placeholder="John Doe" className="w-full h-11 px-4 rounded-xl border border-[var(--color-border)] bg-white focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
