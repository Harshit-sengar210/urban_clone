"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronRight, Home, ArrowLeft, CheckCircle2 } from "lucide-react";
import { MOCK_TICKETS, MOCK_MESSAGES, SupportTicket, SupportMessage } from "@/data/support";
import { SupportConversation } from "@/components/support/SupportConversation";
import { ToastContainer, useToast } from "@/components/bookings/Toast";
import { cn } from "@/lib/utils";

export default function TicketDetailPage() {
  const { ticketId } = useParams();
  const router = useRouter();
  const { toasts, showToast, removeToast } = useToast();

  const [ticket, setTicket] = useState<SupportTicket | null>(null);
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [resolving, setResolving] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      const foundTicket = MOCK_TICKETS.find(t => t.id === ticketId);
      if (foundTicket) {
        setTicket(foundTicket);
        setMessages(MOCK_MESSAGES[foundTicket.id] || []);
      }
      setLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, [ticketId]);

  if (!loading && !ticket) {
    return (
      <div className="px-6 py-20 text-center">
        <h2 className="text-xl font-bold mb-2">Ticket not found</h2>
        <p className="text-sm text-slate-500 mb-6">The support request you're looking for doesn't exist.</p>
        <button onClick={() => router.push("/dashboard/support")} className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-xl font-bold">Back to Support</button>
      </div>
    );
  }

  const handleSendMessage = (msg: string, files: File[]) => {
    if (!ticket) return;
    
    // Simulate attachments upload
    const attachments = files.map(f => ({
      name: f.name,
      url: URL.createObjectURL(f),
      size: f.size
    }));

    const newMsg: SupportMessage = {
      id: `msg_${Date.now()}`,
      ticketId: ticket.id,
      sender: "customer",
      message: msg,
      timestamp: new Date().toISOString(),
      attachments: attachments.length > 0 ? attachments : undefined
    };

    setMessages(prev => [...prev, newMsg]);
    
    if (ticket.status !== "in_progress") {
      setTicket(prev => prev ? { ...prev, status: "in_progress" } : prev);
    }

    // Mock Support Response
    setTimeout(() => {
      const reply: SupportMessage = {
        id: `msg_r_${Date.now()}`,
        ticketId: ticket!.id,
        sender: "support",
        message: "Thank you for the additional information. We will look into this right away.",
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, reply]);
    }, 3000);
  };

  const handleReopen = () => {
    setTicket(prev => prev ? { ...prev, status: "open" } : prev);
    showToast("Support request reopened.");
  };

  const handleResolve = () => {
    setResolving(true);
  };

  const confirmResolve = () => {
    setTicket(prev => prev ? { ...prev, status: "resolved" } : prev);
    setResolving(false);
    showToast("Ticket marked as resolved.");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-purple-100 text-purple-700";
      case "in_progress": return "bg-blue-100 text-blue-700";
      case "waiting_for_user": return "bg-amber-100 text-amber-700";
      case "resolved": return "bg-green-100 text-green-700";
      case "closed": return "bg-slate-100 text-slate-600";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  const isResolved = ticket?.status === "resolved" || ticket?.status === "closed";

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
            <Link href="/dashboard/support" className="hover:text-[var(--color-primary)] transition-colors">Support</Link>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <Link href="/dashboard/support/requests" className="hover:text-[var(--color-primary)] transition-colors">Requests</Link>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-[var(--color-foreground)]">{ticket?.ticketNumber || "Ticket"}</span>
          </nav>
          
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 mb-1">
              <button onClick={() => router.back()} className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div>
                <h1 className="text-2xl font-extrabold text-[var(--color-foreground)] tracking-tight">Support Request</h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs font-bold text-[var(--color-muted)]">{ticket?.ticketNumber}</span>
                  {ticket && (
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded", getStatusColor(ticket.status))}>
                      {ticket.status.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                    </span>
                  )}
                </div>
              </div>
            </div>
            {ticket && !isResolved && (
              <button onClick={handleResolve} className="hidden sm:flex px-4 py-2 bg-white border border-[var(--color-border)] text-sm font-bold text-[var(--color-foreground)] rounded-xl shadow-sm hover:bg-slate-50 transition-colors">
                Mark as Resolved
              </button>
            )}
          </div>
        </motion.div>

        {loading ? (
          <div className="animate-pulse space-y-6 pt-4">
            <div className="h-24 bg-slate-100 rounded-2xl" />
            <div className="h-[400px] bg-slate-100 rounded-3xl" />
          </div>
        ) : ticket && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
            
            {/* Main Chat Area */}
            <div className="order-2 lg:order-1">
              <SupportConversation
                messages={messages}
                onSendMessage={handleSendMessage}
                resolved={isResolved}
                onReopen={handleReopen}
              />
              {!isResolved && (
                <button onClick={handleResolve} className="sm:hidden mt-4 w-full px-4 py-3 bg-white border border-[var(--color-border)] text-sm font-bold text-[var(--color-foreground)] rounded-xl shadow-sm transition-colors">
                  Mark as Resolved
                </button>
              )}
            </div>

            {/* Context Sidebar */}
            <div className="order-1 lg:order-2 space-y-4">
              <div className="bg-white border border-[var(--color-border)] rounded-2xl p-5 shadow-sm">
                <h3 className="text-sm font-bold text-[var(--color-foreground)] mb-4">Ticket Details</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-[var(--color-muted)] font-medium block mb-0.5">Issue</span>
                    <span className="font-bold text-[var(--color-foreground)]">{ticket.title}</span>
                  </div>
                  {ticket.bookingId && (
                    <div>
                      <span className="text-[var(--color-muted)] font-medium block mb-0.5">Booking</span>
                      <Link href={`/dashboard/bookings/${ticket.bookingId}`} className="font-bold text-[var(--color-primary)] hover:underline">
                        {ticket.bookingId}
                      </Link>
                    </div>
                  )}
                  <div>
                    <span className="text-[var(--color-muted)] font-medium block mb-0.5">Created</span>
                    <span className="font-bold text-[var(--color-foreground)]">
                      {new Date(ticket.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Resolve Confirmation Modal */}
      <AnimatePresence>
        {resolving && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setResolving(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="font-bold text-lg text-[var(--color-foreground)] mb-2">Mark as Resolved?</h2>
              <p className="text-sm text-[var(--color-muted)] mb-6">Are you sure you want to mark this request as resolved? You can always reopen it later if needed.</p>
              <div className="flex gap-3">
                <button onClick={() => setResolving(false)} className="flex-1 h-11 rounded-xl border border-[var(--color-border)] text-sm font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
                <button onClick={confirmResolve} className="flex-1 h-11 rounded-xl bg-green-600 text-white text-sm font-bold hover:bg-green-700 transition-colors">Mark Resolved</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
