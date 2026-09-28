"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home, LifeBuoy, ArrowRight } from "lucide-react";
import { MOCK_FAQS, MOCK_TICKETS } from "@/data/support";
import { SupportHero } from "@/components/support/SupportHero";
import { SupportQuickActions } from "@/components/support/SupportQuickActions";
import { FAQSection } from "@/components/support/FAQSection";
import { SupportContact } from "@/components/support/SupportContact";
import { SupportTicketCard } from "@/components/support/SupportTicketCard";
import { CreateSupportRequest } from "@/components/support/CreateSupportRequest";
import { SupportSkeleton, SupportEmptyState } from "@/components/support/SupportEmptyState";
import { ToastContainer, useToast } from "@/components/bookings/Toast";
import { cn } from "@/lib/utils";

export default function SupportPage() {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState(MOCK_TICKETS);
  const [searchQuery, setSearchQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [initialCategory, setInitialCategory] = useState<string | undefined>();
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const handleStartRequest = (category?: string) => {
    setInitialCategory(category);
    setDrawerOpen(true);
  };

  const handleSafetyReport = () => {
    setInitialCategory("safety");
    setDrawerOpen(true);
  };

  const handleSubmitRequest = (data: any) => {
    // Add mock ticket
    const newTicket = {
      id: `ticket_${Date.now()}`,
      ticketNumber: data.ticketId,
      category: data.category,
      issueType: data.issueType,
      title: data.issueType.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase()),
      bookingId: data.bookingId,
      status: "open" as const,
      priority: data.priority as "normal" | "high",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastMessagePreview: data.description
    };
    setTickets(prev => [newTicket, ...prev]);
    showToast("Support request submitted successfully.");
  };

  // Basic Search
  const filteredFaqs = searchQuery
    ? MOCK_FAQS.filter(f => f.question.toLowerCase().includes(searchQuery.toLowerCase()) || f.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())))
    : MOCK_FAQS;

  return (
    <>
      <div className="px-4 md:px-6 py-6 max-w-screen-xl mx-auto space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <nav className="flex items-center gap-1.5 text-xs text-[var(--color-muted)] font-medium mb-3">
            <Link href="/dashboard" className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-1">
              <Home className="w-3 h-3" /> Dashboard
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-[var(--color-foreground)]">Support</span>
          </nav>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center">
              <LifeBuoy className="w-5 h-5 text-blue-600" />
            </div>
            <h1 className="text-2xl font-extrabold text-[var(--color-foreground)] tracking-tight">Help & Support</h1>
          </div>
          <p className="text-sm text-[var(--color-muted)] font-medium ml-[52px]">
            We're here to help with your bookings, payments, services, and more.
          </p>
        </motion.div>

        {loading ? (
          <SupportSkeleton />
        ) : (
          <>
            <SupportHero 
              onSearch={setSearchQuery} 
              onPopularClick={(q) => setSearchQuery(q)} 
            />

            {searchQuery ? (
              <div className="mb-12">
                <h2 className="text-lg font-bold text-[var(--color-foreground)] mb-5">Search Results</h2>
                {filteredFaqs.length > 0 ? (
                  <FAQSection faqs={filteredFaqs} />
                ) : (
                  <SupportEmptyState type="search" />
                )}
              </div>
            ) : (
              <>
                <SupportQuickActions onActionClick={(cat) => handleStartRequest(cat)} />
                
                {/* Recent Tickets Section */}
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-[var(--color-foreground)]">My Support Requests</h2>
                    <Link href="/dashboard/support/requests" className="text-xs font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1">
                      View All <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                  {tickets.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {tickets.slice(0, 3).map(t => (
                        <SupportTicketCard key={t.id} ticket={t} />
                      ))}
                    </div>
                  ) : (
                    <SupportEmptyState />
                  )}
                </div>

                <FAQSection faqs={MOCK_FAQS} />
              </>
            )}

            <SupportContact onStartRequest={() => handleStartRequest()} onSafetyReport={handleSafetyReport} />
          </>
        )}
      </div>

      <CreateSupportRequest
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        initialCategory={initialCategory}
        onSubmit={handleSubmitRequest}
      />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
