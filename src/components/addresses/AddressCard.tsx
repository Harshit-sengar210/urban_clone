"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Phone, Pencil, Trash2, Star } from "lucide-react";
import { Address } from "@/data/addresses";
import { AddressTypeIcon } from "./AddressTypeIcon";
import { AddressMenu } from "./AddressMenu";
import { cn } from "@/lib/utils";

interface AddressCardProps {
  address: Address;
  onEdit: (a: Address) => void;
  onDelete: (a: Address) => void;
  onSetDefault: (a: Address) => void;
}

export function AddressCard({ address, onEdit, onDelete, onSetDefault }: AddressCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
      className={cn(
        "group relative bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col",
        address.isDefault ? "border-[var(--color-primary)]/25 ring-2 ring-[var(--color-primary)]/10" : "border-[var(--color-border)]"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <AddressTypeIcon type={address.type} size="sm" />
          <div>
            <p className="font-bold text-[var(--color-foreground)] text-sm">{address.label}</p>
            {address.isDefault && (
              <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 mt-0.5">
                <CheckCircle2 className="w-3 h-3" /> Default
              </div>
            )}
          </div>
        </div>
        <AddressMenu
          address={address}
          onEdit={() => onEdit(address)}
          onDelete={() => onDelete(address)}
          onSetDefault={() => onSetDefault(address)}
        />
      </div>

      {/* Address body */}
      <div className="flex-1 mb-4 space-y-1">
        <p className="text-sm font-semibold text-[var(--color-foreground)]">{address.name}</p>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed">
          {address.flat}, {address.building}<br />
          {address.area}, {address.city}<br />
          {address.state} – {address.pincode}
        </p>
        {address.landmark && (
          <p className="text-xs text-[var(--color-muted)] italic">Near: {address.landmark}</p>
        )}
        {address.phone && (
          <div className="flex items-center gap-1.5 text-xs text-[var(--color-muted)] pt-1">
            <Phone className="w-3 h-3" /> {address.phone}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-[var(--color-border)]">
        <button
          onClick={() => onEdit(address)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-[var(--color-border)] text-xs font-semibold text-[var(--color-foreground)] hover:bg-slate-50 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all"
        >
          <Pencil className="w-3.5 h-3.5" /> Edit
        </button>
        {!address.isDefault && (
          <button
            onClick={() => onSetDefault(address)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-[var(--color-border)] text-xs font-semibold text-[var(--color-foreground)] hover:bg-slate-50 transition-colors"
          >
            <Star className="w-3.5 h-3.5 text-yellow-400" /> Set Default
          </button>
        )}
        <button
          onClick={() => onDelete(address)}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-[var(--color-border)] text-xs font-semibold text-red-400 hover:bg-red-50 hover:border-red-200 transition-all"
          aria-label="Delete address"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
