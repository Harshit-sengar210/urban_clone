"use client";

import { Menu, Search, Bell, Plus, User, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

export function AdminTopbar({
  mobileOpen,
  setMobileOpen
}: {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}) {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center px-4 lg:px-8 gap-4 shadow-sm">
      
      {/* Mobile Menu Toggle */}
      <button 
        className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Breadcrumbs (Desktop Only) */}
      <div className="hidden lg:flex items-center gap-2 text-sm font-medium">
        {pathSegments.map((segment, i) => {
          const isLast = i === pathSegments.length - 1;
          const formatted = segment.charAt(0).toUpperCase() + segment.slice(1);
          return (
            <div key={i} className="flex items-center gap-2">
              <span className={isLast ? "text-[#0A192F]" : "text-slate-400"}>
                {formatted}
              </span>
              {!isLast && <ChevronRight className="w-4 h-4 text-slate-300" />}
            </div>
          );
        })}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search Bar */}
      <div className="relative max-w-md w-full hidden md:block mr-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text"
          placeholder="Search users, vendors, bookings..."
          className="w-full pl-9 pr-4 h-9 bg-slate-50 border border-slate-200 rounded-full text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search Icon */}
        <button className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-500 transition-colors">
          <Search className="w-5 h-5" />
        </button>

        {/* Quick Action */}
        <button className="hidden sm:flex items-center gap-1.5 px-3 h-9 bg-[var(--color-primary)] text-white rounded-full text-sm font-medium hover:bg-[var(--color-primary-dark)] transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          <span>New</span>
        </button>

        <button className="sm:hidden w-9 h-9 flex items-center justify-center rounded-full bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors shadow-sm">
          <Plus className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-500 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border border-white" />
        </button>

        {/* Profile */}
        <button className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden hover:ring-2 hover:ring-[var(--color-primary)]/20 transition-all ml-1">
          <User className="w-5 h-5 text-slate-500" />
        </button>
      </div>
    </header>
  );
}
