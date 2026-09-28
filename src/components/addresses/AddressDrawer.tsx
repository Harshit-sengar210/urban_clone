"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Address, AddressFormData } from "@/data/addresses";
import { AddressForm } from "./AddressForm";

interface AddressDrawerProps {
  open: boolean;
  editTarget: Address | null;
  onClose: () => void;
  onSave: (data: AddressFormData) => void;
  loading?: boolean;
}

// Discard-changes confirmation modal
function DiscardModal({ open, onKeep, onDiscard }: { open: boolean; onKeep: () => void; onDiscard: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40" onClick={onKeep} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            className="relative z-10 bg-white rounded-2xl shadow-xl p-6 w-full max-w-xs"
          >
            <h3 className="font-bold text-[var(--color-foreground)] mb-2">Discard changes?</h3>
            <p className="text-sm text-[var(--color-muted)] mb-5">You have unsaved changes. Are you sure you want to discard them?</p>
            <div className="flex gap-3">
              <button onClick={onKeep} className="flex-1 h-10 rounded-xl border border-[var(--color-border)] text-sm font-semibold hover:bg-slate-50 transition-colors">Continue Editing</button>
              <button onClick={onDiscard} className="flex-1 h-10 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors">Discard</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function AddressDrawer({ open, editTarget, onClose, onSave, loading = false }: AddressDrawerProps) {
  const [showDiscard, setShowDiscard] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (!open) { setDirty(false); setShowDiscard(false); }
  }, [open]);

  const handleClose = () => {
    if (dirty) setShowDiscard(true);
    else onClose();
  };

  const isEditing = !!editTarget;
  const title = isEditing ? "Edit Address" : "Add New Address";
  const subtitle = isEditing ? "Update your saved location." : "Save a location for faster bookings.";

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[200] flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={handleClose}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="absolute right-0 top-0 bottom-0 w-full sm:w-[460px] bg-white flex flex-col shadow-2xl"
              style={{ maxWidth: "100vw" }}
            >
              {/* Drawer Header */}
              <div className="flex items-start justify-between px-6 py-5 border-b border-[var(--color-border)] flex-shrink-0">
                <div>
                  <h2 className="text-lg font-extrabold text-[var(--color-foreground)]">{title}</h2>
                  <p className="text-xs text-[var(--color-muted)] mt-0.5">{subtitle}</p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-colors flex-shrink-0 ml-4"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {/* Form — fills remaining height */}
              <div className="flex-1 overflow-hidden flex flex-col">
                <AddressForm
                  key={editTarget?.id ?? "new"}
                  initial={editTarget ?? undefined}
                  onSubmit={(d) => { onSave(d); setDirty(false); }}
                  onCancel={handleClose}
                  submitLabel={isEditing ? "Save Changes" : "Save Address"}
                  loading={loading}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <DiscardModal
        open={showDiscard}
        onKeep={() => setShowDiscard(false)}
        onDiscard={() => { setShowDiscard(false); onClose(); }}
      />
    </>
  );
}
