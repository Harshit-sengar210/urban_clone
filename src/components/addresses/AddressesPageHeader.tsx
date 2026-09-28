"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddressesPageHeaderProps {
  count: number;
  onAdd: () => void;
}

export function AddressesPageHeader({ count, onAdd }: AddressesPageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8"
    >
      <div>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[var(--color-muted)] font-medium mb-3">
          <Link href="/dashboard" className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-1">
            <Home className="w-3 h-3" /> Dashboard
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-[var(--color-foreground)]">My Addresses</span>
        </nav>

        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-[var(--color-foreground)] tracking-tight">My Addresses</h1>
          </div>
        </div>
        <p className="text-sm text-[var(--color-muted)] font-medium ml-[52px]">
          Save your frequently used locations for faster booking.
        </p>
      </div>

      <button
        onClick={onAdd}
        className="flex-shrink-0 flex items-center gap-2 h-10 px-5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-bold shadow-md shadow-primary/20 hover:opacity-90 hover:-translate-y-0.5 transition-all"
      >
        <Plus className="w-4 h-4" /> Add New Address
      </button>
    </motion.div>
  );
}
