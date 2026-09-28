"use client";

import { motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

type BusinessType =
  | "individual"
  | "proprietorship"
  | "partnership"
  | "private_limited"
  | "llp"
  | "other"
  | "";

interface BusinessTypeSelectorProps {
  value: BusinessType;
  onChange: (value: BusinessType) => void;
  error?: string;
}

const OPTIONS: { id: Exclude<BusinessType, "">; label: string }[] = [
  { id: "individual", label: "Individual / Freelancer" },
  { id: "proprietorship", label: "Proprietorship" },
  { id: "partnership", label: "Partnership" },
  { id: "private_limited", label: "Private Limited Company" },
  { id: "llp", label: "LLP" },
  { id: "other", label: "Other" },
];

export function BusinessTypeSelector({ value, onChange, error }: BusinessTypeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLabel = value 
    ? OPTIONS.find(opt => opt.id === value)?.label 
    : "Select business type";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full h-12 px-4 rounded-xl border flex items-center justify-between transition-all duration-300 outline-none text-left bg-white",
          isOpen ? "border-[var(--color-primary)] ring-4 ring-primary/10" : "border-slate-200 hover:border-slate-300",
          error && !isOpen ? "border-red-400" : ""
        )}
      >
        <span className={cn(
          "text-sm font-semibold truncate",
          value ? "text-slate-900" : "text-slate-400 font-normal"
        )}>
          {selectedLabel}
        </span>
        <ChevronDown className={cn(
          "w-5 h-5 text-slate-400 transition-transform duration-300",
          isOpen ? "rotate-180 text-[var(--color-primary)]" : ""
        )} />
      </button>

      {/* Dropdown Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, scale: 1, y: 0, display: "block" } : { opacity: 0, scale: 0.97, y: -6, transitionEnd: { display: "none" } }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-xl shadow-slate-200/50 overflow-hidden"
      >
        <div className="max-h-60 overflow-y-auto p-1">
          {OPTIONS.map((option) => {
            const isSelected = value === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200",
                  isSelected 
                    ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]" 
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                {option.label}
                {isSelected && <Check className="w-4 h-4" />}
              </button>
            );
          })}
        </div>
      </motion.div>

      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -4 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-xs font-bold text-red-500 absolute -bottom-5 left-0"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
