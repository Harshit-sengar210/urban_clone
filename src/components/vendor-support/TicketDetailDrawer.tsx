"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, Clock } from "lucide-react";
import { SupportTicket, SupportTicketStatus, SupportCategory } from "@/types/vendor";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<SupportTicketStatus, { label: string; color: string }> = {
  open: { label: "Open", color: "bg-blue-50 text-blue-700 border-blue-200" },
  in_progress: { label: "In Progress", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  waiting_for_response: { label: "Waiting for Response", color: "bg-amber-50 text-amber-700 border-amber-200" },
  resolved: { label: "Resolved", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  closed: { label: "Closed", color: "bg-slate-100 text-slate-500 border-slate-200" },
};

const STATUS_FLOW: SupportTicketStatus[] = ["open", "in_progress", "waiting_for_response", "resolved"];

interface TicketDetailDrawerProps {
  ticket: SupportTicket | null;
  onClose: () => void;
  onReply: (ticketId: string, message: string) => void;
}

export function TicketDetailDrawer({ ticket, onClose, onReply }: TicketDetailDrawerProps) {
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!ticket || !replyText.trim()) return;
    setIsSending(true);
    setTimeout(() => {
      onReply(ticket.id, replyText.trim());
      setReplyText("");
      setIsSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 2000);
    }, 900);
  };

  if (!ticket) return null;
  const statusCfg = STATUS_CONFIG[ticket.status];
  const currentStatusIndex = STATUS_FLOW.indexOf(ticket.status);

  return (
    <AnimatePresence>
      {ticket && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            role="dialog"
            aria-modal
            aria-label={`Ticket ${ticket.id}`}
            className="relative w-full md:max-w-2xl bg-white h-full shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-3">
                <code className="text-sm font-black text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">{ticket.id}</code>
                <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full border", statusCfg.color)}>{statusCfg.label}</span>
              </div>
              <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors" aria-label="Close ticket">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">

              {/* Ticket Info */}
              <div className="p-6 md:p-8 border-b border-slate-100">
                <h2 className="text-lg font-extrabold text-slate-900 mb-4 leading-tight">{ticket.subject}</h2>

                {/* Status Timeline */}
                <div className="flex items-center gap-0 mb-6">
                  {STATUS_FLOW.map((s, i) => {
                    const isCompleted = i < currentStatusIndex;
                    const isCurrent = i === currentStatusIndex;
                    return (
                      <div key={s} className="flex items-center flex-1">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className={cn(
                            "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                            isCompleted ? "bg-emerald-500 border-emerald-500" :
                            isCurrent ? "bg-indigo-600 border-indigo-600 ring-4 ring-indigo-100" :
                            "bg-white border-slate-200"
                          )}
                        >
                          {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                          {isCurrent && <div className="w-2 h-2 bg-white rounded-full" />}
                        </motion.div>
                        {i < STATUS_FLOW.length - 1 && (
                          <div className={cn("flex-1 h-0.5 mx-1", i < currentStatusIndex ? "bg-emerald-300" : "bg-slate-100")} />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <div className="text-xs text-slate-400 mb-1 font-bold uppercase tracking-wider">Category</div>
                    <div className="font-bold text-slate-700 capitalize">{ticket.category}</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <div className="text-xs text-slate-400 mb-1 font-bold uppercase tracking-wider">Priority</div>
                    <div className={cn("font-bold capitalize", ticket.priority === "high" ? "text-red-600" : ticket.priority === "normal" ? "text-blue-600" : "text-slate-600")}>
                      {ticket.priority}
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <div className="text-xs text-slate-400 mb-1 font-bold uppercase tracking-wider">Created</div>
                    <div className="font-bold text-slate-700">{new Date(ticket.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</div>
                  </div>
                </div>
              </div>

              {/* Conversation */}
              <div className="p-6 md:p-8 space-y-4">
                <h3 className="font-bold text-slate-900 mb-4">Conversation</h3>
                {ticket.messages.map((msg, i) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className={cn("flex", msg.sender === "partner" ? "justify-end" : "justify-start")}
                  >
                    <div className={cn(
                      "max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed",
                      msg.sender === "partner"
                        ? "bg-indigo-600 text-white rounded-br-sm"
                        : "bg-slate-100 text-slate-700 rounded-bl-sm"
                    )}>
                      {msg.sender === "support" && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-5 h-5 rounded-full bg-slate-300 flex items-center justify-center text-[9px] font-black text-slate-600">S</div>
                          <span className="text-xs font-bold text-slate-500">UrbanClone Support · Demo</span>
                        </div>
                      )}
                      <p>{msg.message}</p>
                      <div className={cn("text-[10px] mt-2 flex items-center gap-1", msg.sender === "partner" ? "text-indigo-200 justify-end" : "text-slate-400")}>
                        <Clock className="w-3 h-3" />
                        {new Date(msg.createdAt).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Reply Box */}
            {ticket.status !== "resolved" && ticket.status !== "closed" && (
              <div className="p-4 md:p-6 border-t border-slate-100 bg-slate-50/50 shrink-0">
                <div className="flex items-end gap-3">
                  <textarea
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    rows={2}
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-900 resize-none focus:ring-2 focus:ring-indigo-500/30 outline-none placeholder:text-slate-400 transition"
                    aria-label="Reply message"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!replyText.trim() || isSending}
                    className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                    aria-label="Send reply"
                  >
                    {isSending ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                    ) : sent ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
