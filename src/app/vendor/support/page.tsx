"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "@/backend/firebase";
import {
  HelpCircle, Plus, ExternalLink, CheckCircle2,
  ArrowRight, BookOpen, MessageSquare, FileText,
  ChevronRight, Clock, Zap, AlertTriangle
} from "lucide-react";

import { VendorLayout } from "@/components/vendor-dashboard/VendorLayout";
import { SupportSearch } from "@/components/vendor-support/SupportSearch";
import { QuickHelpCards } from "@/components/vendor-support/QuickHelpCards";
import { ArticleDrawer } from "@/components/vendor-support/ArticleDrawer";
import { SupportFAQ } from "@/components/vendor-support/SupportFAQ";
import { CreateTicketDrawer } from "@/components/vendor-support/CreateTicketDrawer";
import { TicketDetailDrawer } from "@/components/vendor-support/TicketDetailDrawer";

import {
  mockSupportArticles,
  mockSupportTickets,
  mockFAQItems,
  supportCategoryMeta,
} from "@/data/mockSupportData";

import {
  SupportArticle, SupportCategory, SupportTicket, SupportTicketStatus, SupportMessage
} from "@/types/vendor";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<SupportTicketStatus, { label: string; color: string }> = {
  open: { label: "Open", color: "bg-blue-50 text-blue-700 border-blue-200" },
  in_progress: { label: "In Progress", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  waiting_for_response: { label: "Waiting for Response", color: "bg-amber-50 text-amber-700 border-amber-200" },
  resolved: { label: "Resolved", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  closed: { label: "Closed", color: "bg-slate-100 text-slate-500 border-slate-200" },
};

const PRIORITY_COLOR: Record<string, string> = {
  low: "text-slate-500",
  normal: "text-blue-600",
  high: "text-red-600",
};

export default function VendorSupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tickets, setTickets] = useState<SupportTicket[]>(mockSupportTickets);
  const [selectedArticle, setSelectedArticle] = useState<SupportArticle | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createCategory, setCreateCategory] = useState<SupportCategory>("booking");
  const [toastMessage, setToastMessage] = useState("");
  const [vendorId, setVendorId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setVendorId(user.uid);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!vendorId) return;
    const { subscribeToVendorTickets } = require("@/services/vendor/vendorSupportService");
    const unsub = subscribeToVendorTickets(vendorId, (loadedTickets: SupportTicket[]) => {
      setTickets(loadedTickets);
      
      // Update selected ticket if it's currently open
      setSelectedTicket(prev => {
        if (!prev) return null;
        const updated = loadedTickets.find(t => t.id === prev.id);
        return updated || prev;
      });
    });
    return () => unsub();
  }, [vendorId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return mockSupportArticles.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.category.includes(q)
    ).slice(0, 8);
  }, [searchQuery]);

  const relatedArticles = useMemo(() => {
    if (!selectedArticle) return [];
    return mockSupportArticles
      .filter(a => a.id !== selectedArticle.id && a.category === selectedArticle.category)
      .slice(0, 3);
  }, [selectedArticle]);

  const handleCreateTicket = async (ticket: SupportTicket) => {
    if (!vendorId) return;
    setIsCreateOpen(false);
    try {
      const { createSupportTicket } = await import("@/services/vendor/vendorSupportService");
      await createSupportTicket(vendorId, ticket);
      showToast(`Ticket ${ticket.id} created successfully.`);
    } catch (err) {
      console.error(err);
      showToast("Failed to create ticket.");
    }
  };

  const openCreateWithCategory = (category: SupportCategory) => {
    setCreateCategory(category);
    setIsCreateOpen(true);
  };

  const handleTicketReply = async (ticketId: string, message: string) => {
    const now = new Date().toISOString();
    const newMsg: SupportMessage = {
      id: `msg-${Date.now()}`,
      sender: "partner",
      message,
      createdAt: now,
    };
    try {
      const { addTicketMessage } = await import("@/services/vendor/vendorSupportService");
      await addTicketMessage(ticketId, newMsg);
    } catch (err) {
      console.error(err);
      showToast("Failed to send message.");
    }
  };

  const popularArticles = mockSupportArticles.slice(0, 6);
  const allCategories = (Object.keys(supportCategoryMeta) as SupportCategory[]);

  return (
    <VendorLayout>
      <div className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-8">

        {/* ── Page Header ── */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <HelpCircle className="w-7 h-7 text-indigo-500" />
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Support & Help Center</h1>
          </div>
          <p className="text-slate-500 font-medium">Find answers, report issues, and get help with your UrbanClone partner account.</p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <SupportSearch
              query={searchQuery}
              onChange={setSearchQuery}
              results={searchResults}
              onOpenArticle={(a) => { setSelectedArticle(a); setSearchQuery(""); }}
              onCreateTicket={() => setIsCreateOpen(true)}
            />
          </div>
        </motion.div>

        {/* ── Main Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">

          {/* ── Left Column ── */}
          <div className="space-y-10">

            {/* Quick Help Cards */}
            <QuickHelpCards onSelectCategory={openCreateWithCategory} />

            {/* Browse Help Topics */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Browse Help Topics</h2>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
              >
                {allCategories.map((cat) => {
                  const meta = supportCategoryMeta[cat];
                  return (
                    <motion.button
                      key={cat}
                      variants={{ hidden: { opacity: 0, scale: 0.96 }, visible: { opacity: 1, scale: 1 } }}
                      whileHover={{ y: -2 }}
                      onClick={() => openCreateWithCategory(cat)}
                      className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all text-center group"
                    >
                      <BookOpen className="w-5 h-5 text-indigo-400 group-hover:text-indigo-600 transition-colors" />
                      <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition-colors leading-tight">{meta.label}</span>
                      <span className="text-xs text-slate-400 font-medium">{meta.articleCount} articles</span>
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>

            {/* Popular Articles */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Popular Help Articles</h2>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {popularArticles.map((article) => (
                  <motion.button
                    key={article.id}
                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                    whileHover={{ y: -2 }}
                    onClick={() => setSelectedArticle(article)}
                    className="flex flex-col items-start gap-3 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all text-left group"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                        {supportCategoryMeta[article.category].label}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="w-3 h-3" />
                        {article.readingTimeMinutes} min
                      </div>
                    </div>
                    <h3 className="font-bold text-slate-900 group-hover:text-indigo-700 transition-colors leading-snug text-sm">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{article.description}</p>
                    <div className="flex items-center gap-1 text-xs font-bold text-indigo-500 group-hover:text-indigo-700 transition-colors mt-auto">
                      Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* FAQ */}
            <SupportFAQ items={mockFAQItems} />

          </div>

          {/* ── Right Sidebar ── */}
          <div className="space-y-6">

            {/* Contact Support Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-extrabold text-lg mb-2">Still need help?</h3>
              <p className="text-indigo-100 text-sm leading-relaxed mb-5">
                Can't find what you're looking for? Create a support request and describe the issue.
              </p>
              <button
                onClick={() => setIsCreateOpen(true)}
                className="w-full py-3 rounded-xl bg-white text-indigo-700 text-sm font-black hover:bg-indigo-50 transition-colors mb-2"
              >
                Create Support Request
              </button>
              <button
                onClick={() => document.getElementById("my-requests")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full py-3 rounded-xl bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors"
              >
                View My Requests
              </button>
            </motion.div>

            {/* Escalation Cards */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 space-y-3"
            >
              <h3 className="font-bold text-slate-900 mb-1">Important Issues</h3>
              {[
                { icon: <AlertTriangle className="w-4 h-4" />, label: "Booking issue?", category: "booking" as SupportCategory, color: "text-indigo-600 bg-indigo-50" },
                { icon: <Zap className="w-4 h-4" />, label: "Payment/Payout issue?", category: "earnings" as SupportCategory, color: "text-amber-600 bg-amber-50" },
                { icon: <AlertTriangle className="w-4 h-4" />, label: "Account access issue?", category: "account" as SupportCategory, color: "text-red-600 bg-red-50" },
              ].map(item => (
                <button
                  key={item.category}
                  onClick={() => openCreateWithCategory(item.category)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", item.color)}>{item.icon}</div>
                    <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                </button>
              ))}
            </motion.div>

            {/* My Support Requests */}
            <motion.div
              id="my-requests"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <h3 className="font-bold text-slate-900">My Support Requests</h3>
                <button onClick={() => setIsCreateOpen(true)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-600 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="divide-y divide-slate-50">
                <AnimatePresence initial={false}>
                  {tickets.length === 0 ? (
                    <div className="p-8 text-center">
                      <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="font-bold text-slate-700 mb-1 text-sm">No support requests yet</p>
                      <p className="text-xs text-slate-400">Create a request if you need help.</p>
                    </div>
                  ) : (
                    tickets.map((ticket, i) => {
                      const statusCfg = STATUS_CONFIG[ticket.status];
                      return (
                        <motion.button
                          key={ticket.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ delay: i * 0.05 }}
                          onClick={() => setSelectedTicket(ticket)}
                          className="w-full p-4 text-left hover:bg-slate-50 transition-colors group"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <code className="text-[10px] font-black text-slate-400">{ticket.id}</code>
                            <span className={cn("text-[10px] font-black px-2 py-0.5 rounded-full border", statusCfg.color)}>
                              {statusCfg.label}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors line-clamp-2 leading-snug">{ticket.subject}</p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                            <span className={cn("font-bold capitalize", PRIORITY_COLOR[ticket.priority])}>{ticket.priority}</span>
                            <span>&middot;</span>
                            <span>{new Date(ticket.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</span>
                          </div>
                        </motion.button>
                      );
                    })
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Drawers ── */}
      <ArticleDrawer
        article={selectedArticle}
        relatedArticles={relatedArticles}
        onClose={() => setSelectedArticle(null)}
        onOpenArticle={setSelectedArticle}
      />

      <CreateTicketDrawer
        isOpen={isCreateOpen}
        initialCategory={createCategory}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateTicket}
      />

      <TicketDetailDrawer
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
        onReply={handleTicketReply}
      />

      {/* ── Toast ── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 20, scale: 0.9, x: "-50%" }}
            className="fixed bottom-6 left-1/2 z-[200] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl font-medium text-sm flex items-center gap-2 border border-slate-700 whitespace-nowrap pointer-events-none"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </VendorLayout>
  );
}
