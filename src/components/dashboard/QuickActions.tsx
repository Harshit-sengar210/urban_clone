"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, MapPin, Wallet, ChevronRight } from "lucide-react";

const ACTIONS = [
  {
    label: "Book a Service",
    desc: "Find and book trusted professionals",
    icon: Search,
    href: "/services",
    iconBg: "bg-[var(--color-primary)]/10",
    iconColor: "text-[var(--color-primary)]",
  },
  {
    label: "Manage Addresses",
    desc: "View & edit saved addresses",
    icon: MapPin,
    href: "/dashboard/addresses",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    label: "Wallet & Payments",
    desc: "Manage payments and refunds",
    icon: Wallet,
    href: "/dashboard/payments",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
  },
];

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-white border border-[var(--color-border)] rounded-2xl shadow-sm p-5"
    >
      <h3 className="font-bold text-[var(--color-foreground)] mb-4">Quick Actions</h3>
      <div className="space-y-2">
        {ACTIONS.map((action, i) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.07 }}
          >
            <Link
              href={action.href}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 hover:shadow-sm transition-all group"
            >
              <div className={`w-9 h-9 rounded-xl ${action.iconBg} flex items-center justify-center flex-shrink-0`}>
                <action.icon className={`w-4.5 h-4.5 ${action.iconColor}`} style={{ width: "18px", height: "18px" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--color-foreground)]">{action.label}</p>
                <p className="text-xs text-[var(--color-muted)] truncate">{action.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[var(--color-primary)] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
