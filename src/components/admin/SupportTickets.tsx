"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import type { SupportTicket } from "@/data/adminDashboardData";
import Link from "next/link";

const getTicketStatusBadge = (status: string) => {
  switch (status) {
    case "Open":
      return <span className="w-2 h-2 rounded-full bg-rose-500" title="Open" />;
    case "In Progress":
      return <span className="w-2 h-2 rounded-full bg-amber-400" title="In Progress" />;
    case "Waiting":
      return <span className="w-2 h-2 rounded-full bg-blue-500" title="Waiting on Customer" />;
    case "Resolved":
      return <span className="w-2 h-2 rounded-full bg-emerald-500" title="Resolved" />;
    default:
      return <span className="w-2 h-2 rounded-full bg-slate-300" />;
  }
};

export function SupportTickets({ tickets }: { tickets: SupportTicket[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.65 }}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full"
    >
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#0A192F]">Support Tickets</h3>
        <Link href="/admin/support" className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors">
          View Support <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex-1 divide-y divide-slate-100">
        {tickets.length === 0 ? (
          <div className="p-8 flex flex-col items-center justify-center text-center h-full">
            <MessageSquare className="w-10 h-10 text-slate-200 mb-3" />
            <p className="font-bold text-[#0A192F]">No active support tickets</p>
          </div>
        ) : (
          tickets.map((ticket, i) => (
            <motion.div 
              key={ticket.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.75 + (i * 0.1) }}
              className="p-5 hover:bg-slate-50 transition-colors group cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 flex-shrink-0">
                  {getTicketStatusBadge(ticket.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-400">{ticket.id}</span>
                    <span className="text-xs font-medium text-slate-500 whitespace-nowrap">{ticket.timeAgo}</span>
                  </div>
                  <h4 className="font-bold text-[#0A192F] text-sm leading-snug mb-1.5 truncate group-hover:text-[var(--color-primary)] transition-colors">
                    "{ticket.issue}"
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      ticket.userType === 'Customer' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                    }`}>
                      {ticket.userType}
                    </span>
                    <span className="text-xs font-medium text-slate-500">{ticket.status}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
