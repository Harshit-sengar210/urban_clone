"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  CalendarCheck,
  MapPin,
  Wallet,
  Star,
  Gift,
  HeadphonesIcon,
  Settings,
  X,
  Home,
  HelpCircle,
} from "lucide-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Bookings", href: "/dashboard/bookings", icon: CalendarCheck },
  { label: "My Addresses", href: "/dashboard/addresses", icon: MapPin },
  { label: "Wallet & Payments", href: "/dashboard/payments", icon: Wallet },
  { label: "Reviews & Ratings", href: "/dashboard/reviews", icon: Star },
  { label: "Offers", href: "/dashboard/offers", icon: Gift },
  { label: "Support", href: "/dashboard/support", icon: HeadphonesIcon },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { user } = useCurrentUser();

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-white border-r border-[var(--color-border)]">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-[var(--color-border)] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold text-lg">
            U
          </div>
          <span className="text-lg font-bold tracking-tight text-[var(--color-foreground)]">
            Urban<span className="text-[var(--color-primary)]">Clone</span>
          </span>
        </Link>
        {/* Mobile close */}
        <button onClick={onClose} className="lg:hidden text-[var(--color-muted)] hover:text-[var(--color-foreground)]">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* User Profile */}
      <div className="px-6 py-5 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {user?.initials || "U"}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-sm text-[var(--color-foreground)] truncate">{user?.name || "Loading..."}</p>
            <p className="text-xs text-[var(--color-muted)] truncate">{user?.email || ""}</p>
          </div>
        </div>
        <Link
          href="/dashboard/settings"
          className="text-xs font-semibold text-[var(--color-primary)] hover:underline"
        >
          Edit Profile →
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150",
                  isActive
                    ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[var(--color-foreground)]"
                )}
              >
                <item.icon
                  className={cn(
                    "w-4.5 h-4.5 flex-shrink-0",
                    isActive ? "text-[var(--color-primary)]" : "text-slate-400"
                  )}
                  style={{ width: "18px", height: "18px" }}
                />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Support Card */}
      <div className="px-4 py-4 border-t border-[var(--color-border)]">
        <div className="rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/8 to-purple-50 p-4 border border-[var(--color-primary)]/10">
          <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-3">
            <HelpCircle className="w-5 h-5 text-[var(--color-primary)]" />
          </div>
          <p className="font-bold text-sm text-[var(--color-foreground)] mb-0.5">Need help?</p>
          <p className="text-xs text-[var(--color-muted)] mb-3 leading-relaxed">
            Our support team is here for you 24/7.
          </p>
          <Link
            href="/dashboard/support"
            className="block w-full text-center text-xs font-bold py-2 px-3 rounded-lg bg-[var(--color-primary)] text-white hover:opacity-90 transition-opacity"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-72"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
