"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, User, Settings, HeadphonesIcon, LogOut } from "lucide-react";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { auth } from "@/backend/firebase";
import { signOut } from "firebase/auth";

export function UserProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useCurrentUser();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const menuItems = [
    { label: "Profile", href: "/dashboard/profile", icon: User },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
    { label: "Help & Support", href: "/dashboard/support", icon: HeadphonesIcon },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 hover:bg-slate-100 rounded-xl px-3 py-2 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
          {user?.initials || "U"}
        </div>
        <span className="hidden md:block text-sm font-semibold text-[var(--color-foreground)]">
          {user?.firstName || ""}
        </span>
        <ChevronDown className={`hidden md:block w-4 h-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-12 w-60 bg-white border border-[var(--color-border)] rounded-2xl shadow-2xl shadow-black/10 z-50 overflow-hidden"
          >
            {/* User Info */}
            <div className="px-5 py-4 border-b border-[var(--color-border)]">
              <p className="font-bold text-sm text-[var(--color-foreground)]">{user?.name || ""}</p>
              <p className="text-xs text-[var(--color-muted)] mt-0.5">{user?.email || ""}</p>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-5 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-[var(--color-foreground)] transition-colors font-medium"
                >
                  <item.icon className="w-4 h-4 text-slate-400" />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Logout */}
            <div className="border-t border-[var(--color-border)] py-2">
              <button
                className="flex items-center gap-3 w-full px-5 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-semibold"
                onClick={async () => { setOpen(false); await signOut(auth); window.location.href = "/login"; }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
