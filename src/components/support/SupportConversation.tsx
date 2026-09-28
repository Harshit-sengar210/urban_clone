"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Paperclip, X, Image as ImageIcon } from "lucide-react";
import { SupportMessage } from "@/data/support";
import { cn } from "@/lib/utils";

interface SupportConversationProps {
  messages: SupportMessage[];
  onSendMessage: (msg: string, files: File[]) => void;
  resolved: boolean;
  onReopen: () => void;
}

export function SupportConversation({ messages, onSendMessage, resolved, onReopen }: SupportConversationProps) {
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() && files.length === 0) return;
    onSendMessage(input, files);
    setInput("");
    setFiles([]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)].slice(0, 5));
    }
  };

  return (
    <div className="bg-white border border-[var(--color-border)] rounded-3xl overflow-hidden flex flex-col h-[600px]">
      
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-slate-50/50" ref={scrollRef}>
        {messages.map((msg, idx) => {
          const isCustomer = msg.sender === "customer";
          const dateStr = new Date(msg.timestamp).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
          
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
              className={cn("flex flex-col max-w-[85%] md:max-w-[75%]", isCustomer ? "ml-auto items-end" : "mr-auto items-start")}
            >
              <span className="text-[10px] font-bold text-slate-400 mb-1 px-1">
                {isCustomer ? "You" : "Support"} · {dateStr}
              </span>
              <div className={cn(
                "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                isCustomer ? "bg-[var(--color-primary)] text-white rounded-tr-sm" : "bg-white border border-[var(--color-border)] text-[var(--color-foreground)] rounded-tl-sm shadow-sm"
              )}>
                {msg.message}
                {/* Attachments preview */}
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {msg.attachments.map((att, i) => (
                      <a key={i} href={att.url} target="_blank" rel="noreferrer" className={cn("flex items-center gap-1.5 px-2 py-1 rounded border text-[10px] font-semibold hover:opacity-80 transition-opacity", isCustomer ? "bg-white/10 border-white/20 text-white" : "bg-slate-50 border-slate-200 text-slate-600")}>
                        <ImageIcon className="w-3 h-3" /> {att.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Input Area */}
      {resolved ? (
        <div className="p-6 bg-white border-t border-[var(--color-border)] text-center">
          <p className="text-sm font-bold text-[var(--color-foreground)] mb-1">This support request is resolved.</p>
          <p className="text-xs text-[var(--color-muted)] mb-4">Need more help with this issue?</p>
          <button onClick={onReopen} className="px-6 py-2 rounded-xl bg-white border border-[var(--color-border)] text-sm font-bold text-[var(--color-foreground)] hover:bg-slate-50 transition-colors">
            Reopen Request
          </button>
        </div>
      ) : (
        <div className="p-4 bg-white border-t border-[var(--color-border)]">
          {/* File previews */}
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {files.map((f, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600">
                  <span className="truncate max-w-[120px]">{f.name}</span>
                  <button onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))} className="p-0.5 hover:bg-slate-200 rounded transition-colors"><X className="w-3 h-3" /></button>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-end gap-2">
            <button onClick={() => fileInputRef.current?.click()} className="h-11 w-11 flex-shrink-0 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-[var(--color-primary)] hover:bg-slate-100 transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <input type="file" ref={fileInputRef} className="hidden" multiple accept="image/*,.pdf" onChange={handleFileSelect} />
            
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Type your message..."
              className="flex-1 max-h-32 min-h-[44px] py-3 px-4 rounded-xl border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] resize-none transition-colors bg-slate-50 focus:bg-white"
              rows={input.split('\n').length > 1 ? Math.min(input.split('\n').length, 4) : 1}
            />
            
            <button
              onClick={handleSend}
              disabled={!input.trim() && files.length === 0}
              className="h-11 w-11 flex-shrink-0 flex items-center justify-center rounded-xl bg-[var(--color-primary)] text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:bg-slate-300"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
