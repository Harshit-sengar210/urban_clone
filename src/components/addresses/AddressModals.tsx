"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { Address } from "@/data/addresses";
import { AddressTypeIcon } from "./AddressTypeIcon";

// ─── Delete Confirmation ────────────────────────────────────────────────────
interface DeleteAddressModalProps {
  address: Address | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

function ModalShell({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6"
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function DeleteAddressModal({ address, open, onClose, onConfirm }: DeleteAddressModalProps) {
  if (!address) return null;
  return (
    <ModalShell open={open} onClose={onClose}>
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-5 h-5 text-red-500" />
        </div>
        <div>
          <h2 className="font-bold text-[var(--color-foreground)] mb-0.5">Delete Address?</h2>
          <p className="text-xs text-[var(--color-muted)]">This address will no longer be available during booking.</p>
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl mb-5">
        <AddressTypeIcon type={address.type} size="sm" />
        <div>
          <p className="text-sm font-bold text-[var(--color-foreground)]">{address.label}</p>
          <p className="text-xs text-[var(--color-muted)] mt-0.5">
            {address.flat}, {address.building}, {address.area}, {address.city}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 h-11 rounded-xl border border-[var(--color-border)] text-sm font-semibold hover:bg-slate-50 transition-colors">
          Keep Address
        </button>
        <button
          onClick={() => { onConfirm(address.id); onClose(); }}
          className="flex-1 h-11 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors"
        >
          Delete Address
        </button>
      </div>
    </ModalShell>
  );
}

// ─── Default Address Protection ─────────────────────────────────────────────
interface DefaultAddressModalProps {
  address: Address | null;
  open: boolean;
  onClose: () => void;
}

export function DefaultAddressProtectModal({ address, open, onClose }: DefaultAddressModalProps) {
  if (!address) return null;
  return (
    <ModalShell open={open} onClose={onClose}>
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
        </div>
        <div>
          <h2 className="font-bold text-[var(--color-foreground)] mb-0.5">Default Address</h2>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed">
            This is your default address. Please set another address as default before deleting this one.
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 h-11 rounded-xl border border-[var(--color-border)] text-sm font-semibold hover:bg-slate-50 transition-colors">
          Cancel
        </button>
        <button onClick={onClose} className="flex-1 h-11 rounded-xl bg-[var(--color-primary)] text-white text-sm font-bold hover:opacity-90 transition-opacity">
          Choose Another Address
        </button>
      </div>
    </ModalShell>
  );
}
