"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageSquareText } from "lucide-react";
import { SupportTicket } from "@/data/support";
import { cn } from "@/lib/utils";

export function SupportTicketCard({ ticket }: { ticket: SupportTicket }) {
  const dateStr = new Date(ticket.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  
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

  const getStatusLabel = (status: string) => {
    return status.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-[var(--color-border)] rounded-2xl p-5 hover:border-[var(--color-primary)]/30 hover:shadow-md transition-all group flex flex-col"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">{ticket.ticketNumber}</span>
        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded", getStatusColor(ticket.status))}>
          {getStatusLabel(ticket.status)}
        </span>
      </div>

      <h3 className="font-bold text-[var(--color-foreground)] text-sm mb-1">{ticket.title}</h3>
      {ticket.bookingId && (
        <p className="text-xs text-[var(--color-muted)] font-medium mb-4">
          Booking: <Link href={`/dashboard/bookings/${ticket.bookingId}`} className="text-[var(--color-primary)] hover:underline">{ticket.bookingId}</Link>
        </p>
      )}

      {ticket.lastMessagePreview && (
        <div className="mt-auto mb-4 bg-slate-50 rounded-xl p-3 flex items-start gap-2">
          <MessageSquareText className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-slate-600 font-medium line-clamp-2">{ticket.lastMessagePreview}</p>
        </div>
      )}

      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="text-[10px] text-slate-400">Created {dateStr}</span>
        <Link href={`/dashboard/support/${ticket.id}`} className="flex items-center text-xs font-bold text-[var(--color-primary)] group-hover:translate-x-1 transition-transform">
          View Conversation <ArrowRight className="w-3 h-3 ml-1" />
        </Link>
      </div>
    </motion.div>
  );
}
