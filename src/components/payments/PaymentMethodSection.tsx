"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Smartphone, ShieldCheck, CheckCircle2, Star, Trash2, MoreVertical, Plus } from "lucide-react";
import { PaymentMethod } from "@/data/payments";
import { cn } from "@/lib/utils";

// ─── Payment Method Card ─────────────────────────────────────────────────────
interface PaymentMethodCardProps {
  method: PaymentMethod;
  onSetDefault: () => void;
  onRemove: () => void;
}

function MethodCard({ method, onSetDefault, onRemove }: PaymentMethodCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isCard = method.type === "card";
  const label = isCard ? `${method.brand} •••• ${method.last4}` : method.upiId;
  const sub   = isCard ? `Expires ${String(method.expiryMonth).padStart(2, "0")}/${method.expiryYear}` : "UPI ID";
  const addedDate = new Date(method.addedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      whileHover={{ y: -2 }}
      className={cn(
        "relative bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200",
        method.isDefault ? "border-[var(--color-primary)]/25 ring-2 ring-[var(--color-primary)]/10" : "border-[var(--color-border)]"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", isCard ? "bg-blue-50" : "bg-green-50")}>
            {isCard ? <CreditCard className="w-5 h-5 text-blue-600" /> : <Smartphone className="w-5 h-5 text-green-600" />}
          </div>
          <div>
            <p className="font-bold text-sm text-[var(--color-foreground)]">{isCard ? method.brand : "UPI"}</p>
            {method.isDefault && (
              <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 mt-0.5">
                <CheckCircle2 className="w-3 h-3" /> Default
              </div>
            )}
          </div>
        </div>
        {/* Menu */}
        <div className="relative">
          <button onClick={() => setMenuOpen(v => !v)} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-9 z-50 w-44 bg-white border border-[var(--color-border)] rounded-2xl shadow-xl py-1.5">
              {!method.isDefault && (
                <button onClick={() => { onSetDefault(); setMenuOpen(false); }} className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-medium hover:bg-slate-50 text-[var(--color-foreground)]">
                  <Star className="w-3.5 h-3.5 text-slate-400" /> Set as Default
                </button>
              )}
              <button onClick={() => { onRemove(); setMenuOpen(false); }} className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-medium hover:bg-red-50 text-red-500">
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="font-semibold text-[var(--color-foreground)] mb-0.5">{label}</p>
      <p className="text-xs text-[var(--color-muted)]">{sub}</p>
      <p className="text-[10px] text-slate-400 mt-1">Added {addedDate}</p>

      {!method.isDefault && (
        <button onClick={onSetDefault} className="mt-3 text-xs font-semibold text-[var(--color-primary)] hover:underline">
          Set as Default
        </button>
      )}
    </motion.div>
  );
}

// ─── Remove Confirmation Modal ───────────────────────────────────────────────
function RemoveModal({ method, onClose, onConfirm }: { method: PaymentMethod | null; onClose: () => void; onConfirm: () => void }) {
  if (!method) return null;
  const isDefault = method.isDefault;
  const label = method.type === "card" ? `${method.brand} ending in ${method.last4}` : method.upiId;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6">
          <h2 className="font-bold text-[var(--color-foreground)] mb-2">{isDefault ? "Default Payment Method" : "Remove Payment Method?"}</h2>
          <p className="text-sm text-[var(--color-muted)] mb-2">{label}</p>
          {isDefault ? (
            <p className="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-xl p-3 mb-5">
              This is your default payment method. Please choose another default before removing it.
            </p>
          ) : (
            <p className="text-sm text-[var(--color-muted)] mb-5">You will no longer be able to use this payment method for future bookings.</p>
          )}
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 h-11 rounded-xl border border-[var(--color-border)] text-sm font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
            {!isDefault && (
              <button onClick={() => { onConfirm(); onClose(); }} className="flex-1 h-11 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors">Remove</button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// ─── Add Payment Drawer ──────────────────────────────────────────────────────
interface AddPaymentDrawerProps {
  open: boolean;
  onClose: () => void;
  onAdd: (method: Omit<PaymentMethod, "id" | "addedAt">) => void;
}

function AddPaymentDrawer({ open, onClose, onAdd }: AddPaymentDrawerProps) {
  const [type, setType] = useState<"upi" | "card">("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const reset = () => { setUpiId(""); setCardNumber(""); setExpiry(""); setName(""); setError(""); };

  const handleAdd = () => {
    if (type === "upi") {
      if (!/^[\w.\-]{3,}@[\w]{2,}$/.test(upiId)) { setError("Enter a valid UPI ID (e.g. name@upi)."); return; }
      onAdd({ type: "upi", upiId, isDefault: false } as any);
    } else {
      if (cardNumber.replace(/\s/g, "").length < 16) { setError("Enter a valid 16-digit card number."); return; }
      const [mm] = expiry.split("/");
      const brand = cardNumber.startsWith("4") ? "Visa" : "Mastercard";
      onAdd({ type: "card", brand, last4: cardNumber.slice(-4), expiryMonth: Number(mm) || 12, expiryYear: 2029, nameOnCard: name, isDefault: false } as any);
    }
    reset(); onClose();
  };

  const inp = "w-full h-11 px-4 rounded-xl border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all";

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => { reset(); onClose(); }} />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="absolute right-0 top-0 bottom-0 w-full sm:w-[460px] bg-white flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border)] flex-shrink-0">
              <div>
                <h2 className="text-lg font-extrabold text-[var(--color-foreground)]">Add Payment Method</h2>
                <p className="text-xs text-[var(--color-muted)] mt-0.5">Securely add your payment details</p>
              </div>
              <button onClick={() => { reset(); onClose(); }} className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-colors">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {/* Type Selector */}
              <div>
                <p className="text-xs font-bold text-[var(--color-foreground)] mb-3 uppercase tracking-wider">Choose a payment method</p>
                <div className="grid grid-cols-2 gap-3">
                  {([["upi", "UPI", "Fast & convenient", Smartphone], ["card", "Credit / Debit Card", "Visa, Mastercard & more", CreditCard]] as const).map(([val, label, sub, Icon]) => (
                    <button key={val} onClick={() => { setType(val); setError(""); }} className={cn("flex flex-col items-start gap-1 p-4 rounded-2xl border transition-all text-left", type === val ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5" : "border-[var(--color-border)] hover:border-slate-300")}>
                      <Icon className={cn("w-5 h-5 mb-1", type === val ? "text-[var(--color-primary)]" : "text-slate-400")} />
                      <p className="text-sm font-bold text-[var(--color-foreground)]">{label}</p>
                      <p className="text-xs text-[var(--color-muted)]">{sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              {type === "upi" ? (
                <div>
                  <label className="block text-xs font-bold text-[var(--color-foreground)] mb-1.5 uppercase tracking-wider">UPI ID</label>
                  <input value={upiId} onChange={e => { setUpiId(e.target.value); setError(""); }} placeholder="yourname@upi" className={inp} />
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-foreground)] mb-1.5 uppercase tracking-wider">Card Number</label>
                    <input value={cardNumber} onChange={e => { setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16)); setError(""); }} placeholder="•••• •••• •••• ••••" className={inp} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[var(--color-foreground)] mb-1.5 uppercase tracking-wider">Expiry (MM/YY)</label>
                      <input value={expiry} onChange={e => setExpiry(e.target.value)} placeholder="08/29" className={inp} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[var(--color-foreground)] mb-1.5 uppercase tracking-wider">CVV</label>
                      <input type="password" maxLength={4} placeholder="•••" className={inp} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-foreground)] mb-1.5 uppercase tracking-wider">Name on Card</label>
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="Ravi Kumar" className={inp} />
                  </div>
                </div>
              )}

              {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

              <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-[var(--color-muted)]">Your payment details are securely handled and never stored in full on our servers.</p>
              </div>
            </div>

            <div className="px-6 py-5 border-t border-[var(--color-border)] bg-white flex-shrink-0">
              <button onClick={handleAdd} className="w-full h-11 rounded-xl bg-[var(--color-primary)] text-white text-sm font-bold hover:opacity-90 transition-all">
                Add Payment Method
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ─── Payment Methods Section ─────────────────────────────────────────────────
interface PaymentMethodSectionProps {
  methods: PaymentMethod[];
  onSetDefault: (id: string) => void;
  onRemove: (id: string) => void;
  onAdd: (m: Omit<PaymentMethod, "id" | "addedAt">) => void;
}

export function PaymentMethodSection({ methods, onSetDefault, onRemove, onAdd }: PaymentMethodSectionProps) {
  const [removeTarget, setRemoveTarget] = useState<PaymentMethod | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-bold text-[var(--color-foreground)]">Payment Methods</h2>
            <p className="text-xs text-[var(--color-muted)] mt-0.5">Your saved payment options</p>
          </div>
          <button onClick={() => setAddOpen(true)} className="flex items-center gap-1.5 text-sm font-bold text-[var(--color-primary)] hover:underline">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        {methods.length === 0 ? (
          <div className="flex flex-col items-center py-10 text-center border border-dashed border-slate-200 rounded-2xl">
            <CreditCard className="w-10 h-10 text-slate-300 mb-3" />
            <p className="font-semibold text-[var(--color-foreground)] mb-1">No saved payment methods</p>
            <p className="text-xs text-[var(--color-muted)] mb-4">Add a method for faster checkout.</p>
            <button onClick={() => setAddOpen(true)} className="flex items-center gap-1.5 px-4 py-2 bg-[var(--color-primary)] text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4" /> Add Payment Method
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            <AnimatePresence>
              {methods.map(m => (
                <MethodCard key={m.id} method={m} onSetDefault={() => onSetDefault(m.id)} onRemove={() => setRemoveTarget(m)} />
              ))}
            </AnimatePresence>
            <button onClick={() => setAddOpen(true)} className="flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-slate-200 text-sm font-semibold text-slate-400 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
              <Plus className="w-4 h-4" /> Add Payment Method
            </button>
          </div>
        )}
      </div>

      {removeTarget && <RemoveModal method={removeTarget} onClose={() => setRemoveTarget(null)} onConfirm={() => onRemove(removeTarget.id)} />}
      <AddPaymentDrawer open={addOpen} onClose={() => setAddOpen(false)} onAdd={(m) => { onAdd(m); setAddOpen(false); }} />
    </>
  );
}
