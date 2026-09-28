"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Wrench, 
  CalendarDays, 
  Banknote, 
  User, 
  Clock, 
  Star, 
  HelpCircle, 
  Settings,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/vendor/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/vendor/services", icon: Wrench, label: "My Services" },
  { href: "/vendor/bookings", icon: CalendarDays, label: "Bookings", badge: 3 },
  { href: "/vendor/earnings", icon: Banknote, label: "Earnings" },
  { href: "/vendor/profile", icon: User, label: "Profile" },
  { href: "/vendor/availability", icon: Clock, label: "Availability" },
  { href: "/vendor/reviews", icon: Star, label: "Reviews" },
  { href: "/vendor/support", icon: HelpCircle, label: "Support" },
  { href: "/vendor/settings", icon: Settings, label: "Settings" },
];

export function VendorSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-slate-100 py-6">
      <div className="px-6 mb-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" title="Go to UrbanClone website">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg leading-none">U</span>
          </div>
          <div>
            <span className="font-extrabold text-slate-900 tracking-tight block leading-tight">UrbanClone</span>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block leading-none">Partner Panel</span>
          </div>
        </Link>
        <button className="md:hidden p-2 -mr-2 text-slate-400" onClick={onClose}>
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto no-scrollbar">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              onClick={() => {
                if (window.innerWidth < 768) onClose();
              }}
              className={cn(
                "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200",
                isActive 
                  ? "bg-indigo-50 text-indigo-700" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-nav-indicator"
                  className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-indigo-600 rounded-r-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <item.icon className={cn(
                "w-5 h-5 transition-transform duration-200 group-hover:scale-110",
                isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
              )} />
              
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">{item.label}</span>
              
              {item.badge && (
                <span className={cn(
                  "ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full",
                  isActive ? "bg-indigo-200 text-indigo-800" : "bg-indigo-100 text-indigo-700"
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 h-screen fixed left-0 top-0 z-40">
        <SidebarContent />
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] z-50 md:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
