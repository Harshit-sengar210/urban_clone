"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Wrench, Wind, Home, ShieldCheck, Lock, Award } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  marketingTitleLine1: string;
  marketingTitleLine2: string;
  marketingDescription: string;
  oppositeLinkText: string;
  oppositeLinkHref: string;
  oppositeLinkLabel: string;
}

export function AuthLayout({
  children,
  marketingTitleLine1,
  marketingTitleLine2,
  marketingDescription,
  oppositeLinkText,
  oppositeLinkHref,
  oppositeLinkLabel,
}: AuthLayoutProps) {
  return (
    <div className="h-screen overflow-hidden flex flex-col md:flex-row bg-[#fdfcff]">

      {/* Mobile Header (Hidden on Desktop) */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-[var(--color-border)] flex-shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold text-lg">
            U
          </div>
          <span className="text-lg font-bold tracking-tight text-[var(--color-foreground)]">
            Urban<span className="text-[var(--color-primary)]">Clone</span>
          </span>
        </Link>
        <Link href={oppositeLinkHref} className="text-sm font-semibold text-[var(--color-primary)]">
          {oppositeLinkText}
        </Link>
      </div>

      {/* Left Panel: Marketing — hidden on mobile, fixed height on desktop */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="hidden md:flex md:w-[45%] lg:w-[42%] flex-col justify-between p-10 lg:p-14 relative overflow-hidden h-full"
      >
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50 to-[var(--color-primary)]/10 z-0" />

        {/* Desktop Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold text-2xl shadow-md">
              U
            </div>
            <span className="text-2xl font-bold tracking-tight text-[var(--color-foreground)]">
              Urban<span className="text-[var(--color-primary)]">Clone</span>
            </span>
          </Link>
        </div>

        {/* Marketing Content — centered vertically */}
        <div className="relative z-10 flex-grow flex flex-col justify-center py-6">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-[1.1]">
            {marketingTitleLine1} <br />
            <span className="text-[var(--color-primary)]">{marketingTitleLine2}</span>
          </h1>
          <p className="text-base text-[var(--color-muted)] font-medium max-w-sm mb-8 leading-relaxed">
            {marketingDescription}
          </p>

          {/* Compact Floating Illustration */}
          <div className="relative w-full max-w-[220px] h-[220px] rounded-full border border-dashed border-[var(--color-primary)]/20 flex items-center justify-center">
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-16 h-16 rounded-2xl bg-white shadow-xl shadow-primary/10 flex items-center justify-center border border-[var(--color-border)] z-10"
            >
              <Home className="w-8 h-8 text-[var(--color-primary)]" />
            </motion.div>

            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute top-3 right-6 w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100 shadow-sm"
            >
              <Sparkles className="w-5 h-5 text-blue-500" />
            </motion.div>

            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="absolute bottom-8 right-2 w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100 shadow-sm"
            >
              <Wrench className="w-5 h-5 text-orange-500" />
            </motion.div>

            <motion.div
              animate={{ y: [3, -3, 3] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute top-16 left-2 w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center border border-cyan-100 shadow-sm"
            >
              <Wind className="w-5 h-5 text-cyan-500" />
            </motion.div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="relative z-10 flex gap-5">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-[var(--color-foreground)]">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            Verified
          </div>
          <div className="flex items-center gap-1.5 text-sm font-semibold text-[var(--color-foreground)]">
            <Lock className="w-4 h-4 text-blue-500" />
            Secure
          </div>
          <div className="flex items-center gap-1.5 text-sm font-semibold text-[var(--color-foreground)]">
            <Award className="w-4 h-4 text-purple-500" />
            Quality
          </div>
        </div>
      </motion.div>

      {/* Right Panel: Form — fills remaining height, scrolls internally if needed */}
      <div className="flex-1 bg-white relative z-20 flex flex-col h-full overflow-y-auto shadow-[-20px_0_40px_rgba(0,0,0,0.02)]">

        {/* Desktop Opposite Link */}
        <div className="hidden md:flex justify-end items-center gap-2 p-6 flex-shrink-0">
          <span className="text-sm text-[var(--color-muted)] font-medium">{oppositeLinkLabel}</span>
          <Link href={oppositeLinkHref} className="text-sm font-bold text-[var(--color-primary)] hover:underline">
            {oppositeLinkText}
          </Link>
        </div>

        {/* Main Card — centered vertically in remaining space */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="flex-1 flex items-center justify-center px-6 py-6"
        >
          <div className="w-full max-w-[420px]">
            <div className="bg-white border border-[var(--color-border)] shadow-xl shadow-black/5 rounded-[24px] p-8">
              {children}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
