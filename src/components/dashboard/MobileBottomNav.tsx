"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarCheck, Layers, Wallet, User } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Home", href: "/dashboard", icon: LayoutDashboard },
  { label: "Bookings", href: "/dashboard/bookings", icon: CalendarCheck },
  { label: "Services", href: "/services", icon: Layers },
  { label: "Wallet", href: "/dashboard/payments", icon: Wallet },
  { label: "Profile", href: "/dashboard/profile", icon: User },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[var(--color-border)] flex items-center safe-area-pb">
      {NAV.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex-1 flex flex-col items-center py-2.5 gap-1 transition-colors",
              isActive ? "text-[var(--color-primary)]" : "text-slate-400 hover:text-slate-600"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-semibold">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
