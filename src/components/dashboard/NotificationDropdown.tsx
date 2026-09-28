"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCircle2, Gift, Info } from "lucide-react";
import { DEMO_NOTIFICATIONS } from "@/data/notifications";
import { cn } from "@/lib/utils";

export function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const unread = DEMO_NOTIFICATIONS.filter((n) => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const iconMap = {
    booking: CheckCircle2,
    offer: Gift,
    system: Info,
  };

  return (
    <div className="relative" ref={ref}>
      <button
        aria-label="Notifications"
        onClick={() => setOpen((v) => !v)}
        className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors"
      >
        <Bell className="w-5 h-5 text-slate-600" />
        {unread > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-12 w-80 bg-white border border-[var(--color-border)] rounded-2xl shadow-2xl shadow-black/10 z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
              <h3 className="font-bold text-sm text-[var(--color-foreground)]">Notifications</h3>
              {unread > 0 && (
                <span className="text-xs font-semibold bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-2 py-0.5 rounded-full">
                  {unread} new
                </span>
              )}
            </div>
            <div className="max-h-72 overflow-y-auto divide-y divide-[var(--color-border)]">
              {DEMO_NOTIFICATIONS.map((n) => {
                const Icon = iconMap[n.type];
                return (
                  <div
                    key={n.id}
                    className={cn(
                      "flex gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors cursor-pointer",
                      !n.read && "bg-[var(--color-primary)]/3"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5",
                      n.type === "booking" && "bg-green-50",
                      n.type === "offer" && "bg-purple-50",
                      n.type === "system" && "bg-blue-50",
                    )}>
                      <Icon className={cn(
                        "w-4 h-4",
                        n.type === "booking" && "text-green-500",
                        n.type === "offer" && "text-purple-500",
                        n.type === "system" && "text-blue-500",
                      )} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[var(--color-foreground)] leading-tight">{n.title}</p>
                      <p className="text-xs text-[var(--color-muted)] mt-0.5 leading-relaxed">{n.description}</p>
                      <p className="text-[10px] text-[var(--color-muted)] mt-1.5 font-medium">{n.time}</p>
                    </div>
                    {!n.read && <div className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full mt-2 flex-shrink-0" />}
                  </div>
                );
              })}
            </div>
            <div className="px-5 py-3 border-t border-[var(--color-border)] bg-slate-50/60">
              <button className="text-xs font-bold text-[var(--color-primary)] hover:underline w-full text-center">
                View all notifications →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
