"use client";

import { motion } from "framer-motion";
import { Home, Sparkles, Wrench, Wind } from "lucide-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export function WelcomeBanner() {
  const { user } = useCurrentUser();
  const firstName = user?.firstName || "there";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--color-primary)]/8 via-purple-50/60 to-white border border-[var(--color-primary)]/10 p-6 md:p-8 flex items-center justify-between gap-6"
    >
      {/* Subtle glow */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-[var(--color-primary)]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Text Side */}
      <div className="relative z-10">
        <p className="text-sm font-semibold text-[var(--color-primary)] mb-1">Welcome back,</p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-foreground)] tracking-tight mb-2">
          Hi {firstName}! 👋
        </h2>
        <p className="text-sm text-[var(--color-muted)] font-medium max-w-sm leading-relaxed">
          Manage your bookings, track services and keep your home in the best shape.
        </p>
      </div>

      {/* Illustration Side */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="hidden sm:flex relative flex-shrink-0 w-32 h-28 items-center justify-center"
      >
        {/* Center home */}
        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="w-14 h-14 rounded-2xl bg-white shadow-lg shadow-[var(--color-primary)]/10 flex items-center justify-center border border-[var(--color-border)] z-10"
        >
          <Home className="w-7 h-7 text-[var(--color-primary)]" />
        </motion.div>

        {/* Small orbiting icons */}
        <motion.div
          animate={{ y: [3, -3, 3] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-blue-500" />
        </motion.div>

        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
          className="absolute bottom-1 right-2 w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100 shadow-sm"
        >
          <Wrench className="w-4 h-4 text-orange-500" />
        </motion.div>

        <motion.div
          animate={{ y: [2, -2, 2] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-4 left-0 w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center border border-cyan-100 shadow-sm"
        >
          <Wind className="w-4 h-4 text-cyan-500" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
