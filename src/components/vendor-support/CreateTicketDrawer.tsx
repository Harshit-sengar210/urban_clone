"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Upload, ChevronDown } from "lucide-react";
import { SupportTicket, SupportCategory, SupportPriority } from "@/types/vendor";
import { cn } from "@/lib/utils";

interface CreateTicketDrawerProps {
  isOpen: boolean;
  initialCategory?: SupportCategory;
  onClose: () => void;
  onSubmit: (ticket: SupportTicket) => void;
}

const CATEGORIES: { value: SupportCategory; label: string }[] = [
  { value: "booking", label: "Booking" },
  { value: "earnings", label: "Earnings & Payouts" },
  { value: "services", label: "Services" },
  { value: "verification", label: "Profile & Verification" },
  { value: "account", label: "Account & Security" },
  { value: "technical", label: "Technical Issue" },
  { value: "other", label: "Other" },
];

const PRIORITIES: { value: SupportPriority; label: string; color: string }[] = [
  { value: "low", label: "Low", color: "bg-slate-100 text-slate-600 border-slate-200" },
  { value: "normal", label: "Normal", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { value: "high", label: "High", color: "bg-red-50 text-red-700 border-red-200" },
];

export function CreateTicketDrawer({ isOpen, initialCategory, onClose, onSubmit }: CreateTicketDrawerProps) {
  const [category, setCategory] = useState<SupportCategory>(initialCategory ?? "booking");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<SupportPriority>("normal");
  const [bookingId, setBookingId] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubject(""); setDescription(""); setBookingId(""); setFileName(null);
      setErrors({}); setSuccessId(null); setIsSubmitting(false);
      setCategory(initialCategory ?? "booking");
    }, 300);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!subject.trim()) e.subject = "Subject is required.";
    if (!description.trim()) e.description = "Description is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      const demoId = `UC-DEMO-${1042 + Math.floor(Math.random() * 100)}`;
      const now = new Date().toISOString();
      const ticket: SupportTicket = {
        id: demoId,
        subject: subject.trim(),
        category,
        description: description.trim(),
        priority,
        status: "open",
        bookingId: bookingId.trim() || undefined,
        createdAt: now,
        updatedAt: now,
        messages: [{ id: `msg-${Date.now()}`, sender: "partner", message: description.trim(), createdAt: now }],
      };
      onSubmit(ticket);
      setIsSubmitting(false);
      setSuccessId(demoId);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            role="dialog"
            aria-modal
            aria-label="Create support request"
            className="relative w-full md:max-w-xl bg-white h-full shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
              <h2 className="font-bold text-slate-900 text-lg">Create Support Request</h2>
              <button onClick={handleClose} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors" aria-label="Close">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {successId ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center gap-5 py-16"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 mb-2">Support request created</h3>
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <code className="text-sm font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100">{successId}</code>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-200 px-2 py-1 rounded-full uppercase tracking-widest">Demo</span>
                    </div>
                    <p className="text-slate-500 text-sm">Your demo ticket has been created. Track it in the 'My Support Requests' section below.</p>
                  </div>
                  <button onClick={handleClose} className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors">
                    Done
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
                  className="space-y-5"
                >
                  {/* Category */}
                  <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Category <span className="text-red-400">*</span></label>
                    <div className="relative">
                      <select
                        value={category}
                        onChange={e => setCategory(e.target.value as SupportCategory)}
                        className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/30 outline-none appearance-none"
                      >
                        {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </motion.div>

                  {/* Subject */}
                  <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Subject <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      value={subject}
                      onChange={e => { setSubject(e.target.value); if (errors.subject) setErrors(p => ({ ...p, subject: "" })); }}
                      placeholder="Brief description of your issue"
                      className={cn("w-full px-4 py-3 rounded-xl border bg-white text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/30 outline-none transition", errors.subject ? "border-red-300 ring-1 ring-red-300" : "border-slate-200")}
                    />
                    {errors.subject && <p className="text-xs text-red-500 font-medium mt-1">{errors.subject}</p>}
                  </motion.div>

                  {/* Description */}
                  <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Description <span className="text-red-400">*</span></label>
                    <textarea
                      value={description}
                      onChange={e => { setDescription(e.target.value); if (errors.description) setErrors(p => ({ ...p, description: "" })); }}
                      placeholder="Describe your issue in detail. Include any relevant steps or what you expected to happen."
                      rows={5}
                      className={cn("w-full px-4 py-3 rounded-xl border bg-white text-sm font-medium text-slate-900 placeholder:text-slate-400 resize-none focus:ring-2 focus:ring-indigo-500/30 outline-none transition", errors.description ? "border-red-300 ring-1 ring-red-300" : "border-slate-200")}
                    />
                    {errors.description && <p className="text-xs text-red-500 font-medium mt-1">{errors.description}</p>}
                  </motion.div>

                  {/* Priority */}
                  <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Priority</label>
                    <div className="flex gap-2">
                      {PRIORITIES.map(p => (
                        <button
                          key={p.value}
                          onClick={() => setPriority(p.value)}
                          className={cn("flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all", priority === p.value ? p.color + " shadow-sm" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50")}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Optional Booking ID - Only shown for relevant categories */}
                  {["booking", "earnings", "services"].includes(category) && (
                    <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Booking ID <span className="text-slate-300 normal-case font-medium">(optional)</span></label>
                      <input
                        type="text"
                        value={bookingId}
                        onChange={e => setBookingId(e.target.value)}
                        placeholder="e.g. BK-4521"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/30 outline-none"
                      />
                    </motion.div>
                  )}

                  {/* Screenshot */}
                  <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Attachment <span className="text-slate-300 normal-case font-medium">(optional)</span></label>
                    <label className="w-full flex flex-col items-center gap-2 p-4 border-2 border-dashed border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors cursor-pointer">
                      <Upload className="w-6 h-6 text-slate-400" />
                      {fileName ? (
                        <span className="text-sm font-bold text-indigo-600">{fileName}</span>
                      ) : (
                        <>
                          <span className="text-sm font-bold text-slate-600">Upload Screenshot</span>
                          <span className="text-xs text-slate-400">Supported formats: JPG, PNG, PDF</span>
                        </>
                      )}
                      <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" onChange={e => setFileName(e.target.files?.[0]?.name ?? null)} />
                    </label>
                  </motion.div>

                  <div className="flex items-center gap-3 pt-2">
                    <button onClick={handleClose} className="flex-1 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex-1 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                      ) : "Submit Request"}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
