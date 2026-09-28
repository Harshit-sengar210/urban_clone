"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CalendarCheck, ChevronRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BookingsPageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6"
    >
      <div>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[var(--color-muted)] font-medium mb-3">
          <Link href="/dashboard" className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-1">
            <Home className="w-3 h-3" />
            Dashboard
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-[var(--color-foreground)]">My Bookings</span>
        </nav>

        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center">
            <CalendarCheck className="w-5 h-5 text-[var(--color-primary)]" />
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--color-foreground)] tracking-tight">My Bookings</h1>
        </div>
        <p className="text-sm text-[var(--color-muted)] font-medium ml-[52px]">
          Manage and track all your UrbanClone services in one place.
        </p>
      </div>

      <Link href="/services" className="flex-shrink-0">
        <Button className="h-10 px-5 font-semibold shadow-md shadow-primary/20 hover:-translate-y-0.5 transition-transform">
          + Book a Service
        </Button>
      </Link>
    </motion.div>
  );
}
