"use client";

import Link from "next/link";
import { CalendarCheck, Package, XCircle, CheckCircle2 } from "lucide-react";

const EMPTY_CONFIG = {
  all:         { icon: Package,       title: "No bookings yet",          desc: "Your bookings will appear here once you book a service." },
  upcoming:    { icon: CalendarCheck, title: "No upcoming bookings",     desc: "You don't have any upcoming services. Book one today!" },
  in_progress: { icon: Package,       title: "No active bookings",       desc: "Your in-progress services will appear here." },
  completed:   { icon: CheckCircle2,  title: "No completed bookings",    desc: "Your completed services will show up here." },
  cancelled:   { icon: XCircle,       title: "No cancelled bookings",    desc: "You haven't cancelled any bookings — great!" },
};

interface BookingEmptyStateProps {
  tab: string;
}

export function BookingEmptyState({ tab }: BookingEmptyStateProps) {
  const cfg = EMPTY_CONFIG[tab as keyof typeof EMPTY_CONFIG] ?? EMPTY_CONFIG.all;
  const Icon = cfg.icon;

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-3xl bg-[var(--color-primary)]/8 flex items-center justify-center mb-5">
        <Icon className="w-8 h-8 text-[var(--color-primary)]/60" />
      </div>
      <h3 className="text-lg font-bold text-[var(--color-foreground)] mb-2">{cfg.title}</h3>
      <p className="text-sm text-[var(--color-muted)] max-w-xs mb-6">{cfg.desc}</p>
      {(tab === "all" || tab === "upcoming") && (
        <Link
          href="/services"
          className="px-6 py-2.5 bg-[var(--color-primary)] text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity"
        >
          Explore Services
        </Link>
      )}
    </div>
  );
}
