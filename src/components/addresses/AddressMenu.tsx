"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical, Pencil, Star, Trash2, CheckCircle2 } from "lucide-react";
import { Address } from "@/data/addresses";
import { cn } from "@/lib/utils";

interface AddressMenuProps {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}

export function AddressMenu({ address, onEdit, onDelete, onSetDefault }: AddressMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const item = "flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-medium text-left transition-colors hover:bg-slate-50";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        aria-label="Address options"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 w-48 bg-white border border-[var(--color-border)] rounded-2xl shadow-xl py-1.5 overflow-hidden">
          <button onClick={() => { onEdit(); setOpen(false); }} className={cn(item, "text-[var(--color-foreground)]")}>
            <Pencil className="w-3.5 h-3.5 text-slate-400" /> Edit Address
          </button>

          {address.isDefault ? (
            <div className={cn(item, "text-green-600 cursor-default opacity-70")}>
              <CheckCircle2 className="w-3.5 h-3.5" /> Default Address
            </div>
          ) : (
            <button onClick={() => { onSetDefault(); setOpen(false); }} className={cn(item, "text-[var(--color-foreground)]")}>
              <Star className="w-3.5 h-3.5 text-slate-400" /> Set as Default
            </button>
          )}

          <div className="my-1 border-t border-slate-100" />

          <button onClick={() => { onDelete(); setOpen(false); }} className={cn(item, "text-red-500 hover:bg-red-50")}>
            <Trash2 className="w-3.5 h-3.5" /> Delete Address
          </button>
        </div>
      )}
    </div>
  );
}
