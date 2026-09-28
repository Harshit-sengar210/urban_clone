"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Users, UserCheck, Briefcase, Calendar, 
  CreditCard, Tag, Star, BarChart3, HeadphonesIcon, Bell, 
  Settings, LogOut, User, ChevronRight, Menu, X
} from "lucide-react";

export function AdminSidebar({ 
  collapsed, 
  setCollapsed,
  mobileOpen,
  setMobileOpen
}: { 
  collapsed: boolean, 
  setCollapsed: (v: boolean) => void,
  mobileOpen: boolean,
  setMobileOpen: (v: boolean) => void
}) {
  const pathname = usePathname();

  const navGroups = [
    {
      title: "OVERVIEW",
      items: [{ label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" }]
    },
    {
      title: "MANAGEMENT",
      items: [
        { label: "Users", icon: Users, href: "/admin/users" },
        { label: "Vendors", icon: UserCheck, href: "/admin/vendors" },
        { label: "Services", icon: Briefcase, href: "/admin/services" },
        { label: "Bookings", icon: Calendar, href: "/admin/bookings" },
        { label: "Payments", icon: CreditCard, href: "/admin/payments" }
      ]
    },
    {
      title: "GROWTH",
      items: [
        { label: "Offers", icon: Tag, href: "/admin/offers" },
        { label: "Reviews", icon: Star, href: "/admin/reviews" },
        { label: "Reports", icon: BarChart3, href: "/admin/reports" }
      ]
    },
    {
      title: "OPERATIONS",
      items: [
        { label: "Support", icon: HeadphonesIcon, href: "/admin/support" },
        { label: "Notifications", icon: Bell, href: "/admin/notifications" }
      ]
    },
    {
      title: "SYSTEM",
      items: [
        { label: "Settings", icon: Settings, href: "/admin/settings" }
      ]
    }
  ];

  const SidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Brand */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 flex-shrink-0">
        <Link href="/admin/dashboard" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform shadow-sm">
            U
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-[#0A192F] leading-none">
                Urban<span className="text-[var(--color-primary)]">Clone</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-widest mt-0.5">ADMIN CONSOLE</span>
            </div>
          )}
        </Link>
        
        {/* Mobile close button */}
        <button 
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-2 -mr-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 hide-scrollbar">
        <div className="px-4 space-y-8">
          {navGroups.map((group, i) => (
            <div key={i}>
              {!collapsed && (
                <h4 className="px-3 mb-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {group.title}
                </h4>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      title={collapsed ? item.label : undefined}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                        ${isActive 
                          ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium" 
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}
                      `}
                    >
                      <Icon className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? "text-[var(--color-primary)]" : "text-slate-400 group-hover:text-slate-600"}`} />
                      {!collapsed && (
                        <span className="truncate">{item.label}</span>
                      )}
                      {!collapsed && isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] ml-auto" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admin Profile */}
      <div className="p-4 border-t border-slate-100 flex-shrink-0">
        <button className="flex items-center gap-3 w-full p-2 hover:bg-slate-50 rounded-xl transition-colors group text-left">
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <User className="w-5 h-5 text-slate-500" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#0A192F] truncate">Admin User</p>
              <p className="text-xs text-slate-500 truncate">Administrator</p>
            </div>
          )}
          {!collapsed && (
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 flex-shrink-0" />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden lg:block fixed top-0 left-0 bottom-0 z-40 transition-all duration-300 ease-in-out ${collapsed ? "w-20" : "w-[270px]"}`}
      >
        {SidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`
          lg:hidden fixed top-0 bottom-0 left-0 z-50 w-[270px] bg-white transition-transform duration-300 ease-in-out shadow-2xl
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {SidebarContent}
      </aside>
    </>
  );
}
