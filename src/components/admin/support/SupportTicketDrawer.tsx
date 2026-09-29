"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, AlertCircle, Clock, Tag, User, ExternalLink, Send, CheckCircle2 } from "lucide-react";
import type { AdminSupportTicket } from "@/data/adminSupportData";
import { useState } from "react";

export function SupportTicketDrawer({
  ticket,
  onClose,
  onUpdateStatus,
  onReply,
  onStatusChange,
  onAssign,
  onAddInternalNote
}: {
  ticket: AdminSupportTicket | null;
  onClose: () => void;
  onUpdateStatus?: (status: string) => void;
  onReply?: (text: string) => void;
  onStatusChange?: (status: string) => void;
  onAssign?: (assigneeId: string) => void;
  onAddInternalNote?: (note: string) => void;
}) {
  const [replyText, setReplyText] = useState("");

  if (!ticket) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[150] flex justify-end"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-lg font-bold text-[#0A192F]">{ticket.id}</h2>
                <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border ${
                  ticket.status === 'open' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                  ticket.status === 'in_progress' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                  ticket.status === 'resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                  'bg-slate-50 text-slate-700 border-slate-200'
                }`}>
                  {ticket.status.replace(/_/g, ' ')}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${
                  ticket.priority === 'urgent' ? 'bg-rose-50 text-rose-700 border-rose-200' : 
                  ticket.priority === 'high' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                  'bg-slate-50 text-slate-600 border-slate-200'
                }`}>
                  <AlertCircle className="w-3 h-3" /> {ticket.priority}
                </span>
              </div>
              <p className="text-sm font-bold text-slate-700 mt-2">{ticket.subject}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors self-start mt-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto bg-slate-50">
            
            {/* Meta Info Bar */}
            <div className="bg-white border-b border-slate-100 px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Requester</p>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#0A192F]">{ticket.requester.name}</span>
                  <span className="text-[10px] text-slate-500 uppercase">{ticket.requester.type}</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Category</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-slate-700">
                  <Tag className="w-4 h-4 text-slate-400" /> {ticket.category}
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Assignee</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-slate-700">
                  <User className="w-4 h-4 text-slate-400" /> {ticket.assigneeName || 'Unassigned'}
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">SLA Target</p>
                <span className={`inline-flex items-center gap-1 text-sm font-medium ${ticket.sla === 'at_risk' ? 'text-rose-600' : 'text-slate-700'}`}>
                  <Clock className="w-4 h-4" /> {Math.floor(ticket.slaRemainingMinutes / 60)}h {ticket.slaRemainingMinutes % 60}m
                </span>
              </div>
            </div>

            {/* Context Linking (if any) */}
            {ticket.relatedBooking && (
              <div className="px-6 py-4">
                <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Related Booking</p>
                    <p className="font-bold text-[#0A192F]">Booking {ticket.relatedBooking.id}</p>
                  </div>
                  <button className="flex items-center gap-1 text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] bg-[var(--color-primary)]/10 px-3 py-1.5 rounded-lg transition-colors">
                    View Details <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* Messages Thread */}
            <div className="px-6 py-4 space-y-6">
              {ticket.messages.map((msg) => (
                <div key={msg.id} className={`flex gap-4 ${msg.type === 'admin' ? 'flex-row-reverse' : ''}`}>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 uppercase">
                    {msg.senderName.charAt(0)}
                  </div>
                  <div className={`flex flex-col ${msg.type === 'admin' ? 'items-end' : 'items-start'} max-w-[80%]`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-700">{msg.senderName}</span>
                      <span className="text-[10px] text-slate-400">{new Date(msg.timestamp).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "numeric" })}</span>
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.type === 'admin' 
                        ? 'bg-[var(--color-primary)] text-white rounded-tr-none' 
                        : msg.type === 'internal_note'
                        ? 'bg-amber-50 border border-amber-200 text-amber-800 rounded-tl-none shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                    }`}>
                      {msg.type === 'internal_note' && <span className="block text-[10px] font-bold text-amber-600 uppercase mb-1">Internal Note</span>}
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Footer Actions / Reply Box */}
          <div className="p-4 border-t border-slate-200 bg-white sticky bottom-0">
            {ticket.status !== 'resolved' && ticket.status !== 'closed' ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:border-[var(--color-primary)] focus-within:ring-1 focus-within:ring-[var(--color-primary)] transition-all">
                    <textarea 
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply to the customer..."
                      className="w-full p-3 bg-transparent text-sm focus:outline-none resize-none"
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => onUpdateStatus && onUpdateStatus('resolved')}
                      className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Mark as Resolved
                    </button>
                  </div>
                  <button 
                    disabled={!replyText.trim()}
                    onClick={() => {
                      if (onReply) {
                        onReply(replyText);
                        setReplyText("");
                      }
                    }}
                    className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-bold hover:bg-[var(--color-primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Reply</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-4 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-2" />
                <h3 className="text-sm font-bold text-slate-800">Ticket is {ticket.status.replace(/_/g, ' ')}</h3>
                <p className="text-xs text-slate-500 mt-1">You cannot reply to a closed ticket. To continue the conversation, reopen it.</p>
                <button 
                  onClick={() => onUpdateStatus && onUpdateStatus('open')}
                  className="mt-4 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors"
                >
                  Reopen Ticket
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
