"use client";

import { useState } from "react";
import { Search, Menu } from "lucide-react";
import { NotificationDropdown } from "./NotificationDropdown";
import { UserProfileMenu } from "./UserProfileMenu";
import { AnimatePresence, motion } from "framer-motion";

const SEARCH_SUGGESTIONS = [
  { type: "Services", items: ["Home Cleaning", "AC Service & Repair", "Plumbing"] },
  { type: "Categories", items: ["Cleaning", "AC & Appliances"] },
];

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const filtered = query.length > 1
    ? SEARCH_SUGGESTIONS.map((g) => ({
        ...g,
        items: g.items.filter((i) => i.toLowerCase().includes(query.toLowerCase())),
      })).filter((g) => g.items.length > 0)
    : [];

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[var(--color-border)] h-16 flex items-center px-4 md:px-6 gap-4">
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        aria-label="Open sidebar"
        className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors flex-shrink-0"
      >
        <Menu className="w-5 h-5 text-slate-600" />
      </button>

      {/* Search */}
      <div className="relative flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            placeholder="Search services, bookings, categories..."
            className="w-full pl-10 pr-4 h-10 rounded-xl bg-slate-50 border border-[var(--color-border)] text-sm text-[var(--color-foreground)] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
          />
        </div>

        {/* Search Suggestions */}
        <AnimatePresence>
          {focused && query.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="absolute top-12 left-0 right-0 bg-white border border-[var(--color-border)] rounded-2xl shadow-xl shadow-black/10 z-50 overflow-hidden"
            >
              {filtered.length > 0 ? (
                <div className="py-2">
                  {filtered.map((group) => (
                    <div key={group.type}>
                      <p className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {group.type}
                      </p>
                      {group.items.map((item) => (
                        <button
                          key={item}
                          className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-[var(--color-foreground)] hover:bg-slate-50 transition-colors font-medium text-left"
                          onMouseDown={() => {
                            setQuery(item);
                            setFocused(false);
                          }}
                        >
                          <Search className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                          {item}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-5 text-sm text-[var(--color-muted)] text-center">
                  No results for &quot;{query}&quot;
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
        <NotificationDropdown />
        <UserProfileMenu />
      </div>
    </header>
  );
}
