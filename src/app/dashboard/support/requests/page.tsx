"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home, Search, MessageSquareText } from "lucide-react";
import { MOCK_TICKETS, SupportTicket } from "@/data/support";
import { SupportTicketCard } from "@/components/support/SupportTicketCard";
import { SupportEmptyState } from "@/components/support/SupportEmptyState";
import { cn } from "@/lib/utils";

type FilterTab = "All" | "Open" | "In Progress" | "Resolved" | "Closed";
const TABS: FilterTab[] = ["All", "Open", "In Progress", "Resolved", "Closed"];

export default function SupportRequestsPage() {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      setTickets(MOCK_TICKETS);
      setLoading(false);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  const filteredTickets = tickets.filter(t => {
    if (activeTab !== "All") {
      const statusLabel = t.status.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      if (statusLabel !== activeTab) return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return t.ticketNumber.toLowerCase().includes(q) 
        || t.title.toLowerCase().includes(q) 
        || (t.bookingId && t.bookingId.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <div className="px-4 md:px-6 py-6 max-w-screen-xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <nav className="flex items-center gap-1.5 text-xs text-[var(--color-muted)] font-medium mb-3">
          <Link href="/dashboard" className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-1">
            <Home className="w-3 h-3" /> Dashboard
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <Link href="/dashboard/support" className="hover:text-[var(--color-primary)] transition-colors">Support</Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-[var(--color-foreground)]">Requests</span>
        </nav>
        <h1 className="text-2xl font-extrabold text-[var(--color-foreground)] tracking-tight mb-1">My Support Requests</h1>
        <p className="text-sm text-[var(--color-muted)] font-medium">Track your previous and ongoing support conversations.</p>
      </motion.div>

      {loading ? (
        <div className="animate-pulse space-y-6 pt-4">
          <div className="h-10 bg-slate-100 rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => <div key={i} className="h-40 bg-slate-100 rounded-2xl" />)}
          </div>
        </div>
      ) : (
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 hide-scrollbar gap-2">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all border",
                    activeTab === tab
                      ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-sm"
                      : "bg-white text-slate-600 border-[var(--color-border)] hover:border-slate-300"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ticket..."
                className="w-full h-11 pl-9 pr-4 rounded-xl border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all bg-white"
              />
            </div>
          </div>

          {filteredTickets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {filteredTickets.map(t => (
                  <SupportTicketCard key={t.id} ticket={t} />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="mt-8">
              <SupportEmptyState />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
