"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Toggle Switch ─────────────────────────────────────────────────────────

interface SettingsToggleProps {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
}

export function SettingsToggle({ id, checked, onChange, label, description, disabled }: SettingsToggleProps) {
  return (
    <motion.div
      layout
      className={cn(
        "flex items-start justify-between gap-4 py-4 border-b border-slate-100 last:border-0",
        checked && "bg-indigo-50/30 -mx-6 px-6 rounded-xl"
      )}
      transition={{ duration: 0.15 }}
    >
      <div className="flex-1">
        <label htmlFor={id} className="text-sm font-bold text-slate-900 cursor-pointer select-none">
          {label}
        </label>
        {description && (
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{description}</p>
        )}
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          "relative w-11 h-6 rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-indigo-500/40 focus-visible:outline-none shrink-0 mt-0.5",
          checked ? "bg-indigo-600" : "bg-slate-200",
          disabled && "opacity-40 cursor-not-allowed"
        )}
      >
        <motion.span
          className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
          animate={{ x: checked ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
        />
        <span className="sr-only">{checked ? "Enabled" : "Disabled"}</span>
      </button>
    </motion.div>
  );
}

// ─── Setting Row ──────────────────────────────────────────────────────────

interface SettingRowProps {
  label: string;
  value: string;
  onAction?: () => void;
  actionLabel?: string;
  mono?: boolean;
  badge?: string;
}

export function SettingRow({ label, value, onAction, actionLabel, mono, badge }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0 gap-4">
      <div className="min-w-0">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">{label}</div>
        <div className="flex items-center gap-2">
          <span className={cn("text-sm font-bold text-slate-900 truncate", mono && "font-mono")}>{value}</span>
          {badge && (
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full shrink-0">
              {badge}
            </span>
          )}
        </div>
      </div>
      {onAction && (
        <button
          onClick={onAction}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline shrink-0 focus-visible:ring-2 focus-visible:ring-indigo-500/40 rounded px-1 outline-none"
        >
          {actionLabel ?? "Edit"}
        </button>
      )}
    </div>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────

interface SectionCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  delay?: number;
  actions?: React.ReactNode;
}

export function SectionCard({ title, description, children, delay = 0, actions }: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
    >
      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-bold text-slate-900">{title}</h2>
          {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
        </div>
        {actions}
      </div>
      <div className="px-6 py-2">{children}</div>
    </motion.div>
  );
}

// ─── Save Button ──────────────────────────────────────────────────────────

type SaveState = "idle" | "saving" | "saved";

interface SaveButtonProps {
  state: SaveState;
  onClick: () => void;
  label?: string;
}

export function SaveButton({ state, onClick, label = "Save Changes" }: SaveButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={state !== "idle"}
      className={cn(
        "px-5 py-2.5 rounded-xl text-sm font-bold transition-all min-w-[130px] flex items-center justify-center gap-2",
        state === "saved"
          ? "bg-emerald-500 text-white"
          : "bg-indigo-600 text-white hover:bg-indigo-700",
        state !== "idle" && "opacity-80 cursor-not-allowed"
      )}
    >
      {state === "saving" && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
        />
      )}
      {state === "saving" ? "Saving..." : state === "saved" ? "✓ Saved" : label}
    </button>
  );
}
