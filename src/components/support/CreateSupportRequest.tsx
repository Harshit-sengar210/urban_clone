"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { SupportAttachment } from "@/data/support";

const ISSUES_BY_CATEGORY: Record<string, { id: string; label: string }[]> = {
  booking: [
    { id: "cancellation", label: "Booking cancellation" },
    { id: "reschedule", label: "Reschedule booking" },
    { id: "pro_no_show", label: "Professional didn't arrive" },
    { id: "pro_late", label: "Professional is late" },
    { id: "service_quality", label: "Service quality issue" },
    { id: "wrong_service", label: "Wrong service" },
    { id: "other", label: "Other booking issue" },
  ],
  payment: [
    { id: "failed", label: "Payment failed" },
    { id: "charged_twice", label: "Payment charged twice" },
    { id: "wrong_amount", label: "Wrong amount charged" },
    { id: "pending", label: "Payment pending" },
    { id: "wallet", label: "Wallet issue" },
    { id: "other", label: "Other payment issue" },
  ],
  refund: [
    { id: "cancelled", label: "Booking cancelled" },
    { id: "incomplete", label: "Service not completed" },
    { id: "quality", label: "Service issue" },
    { id: "duplicate", label: "Duplicate payment" },
    { id: "other", label: "Other refund request" },
  ],
  service: [
    { id: "poor_quality", label: "Poor service quality" },
    { id: "incomplete", label: "Service incomplete" },
    { id: "wrong_service", label: "Wrong service provided" },
    { id: "damage", label: "Damage during service" },
    { id: "behavior", label: "Professional behavior" },
    { id: "other", label: "Other" },
  ],
  pro: [
    { id: "late", label: "Professional is late" },
    { id: "no_show", label: "Professional didn't arrive" },
    { id: "cancelled", label: "Professional cancelled" },
    { id: "behavior", label: "Behavior concern" },
    { id: "unreachable", label: "Unable to contact professional" },
    { id: "other", label: "Other" },
  ],
  safety: [
    { id: "unsafe_behavior", label: "Unsafe behavior" },
    { id: "property_damage", label: "Property damage" },
    { id: "harassment", label: "Harassment" },
    { id: "threatening", label: "Threatening behavior" },
    { id: "other", label: "Other" },
  ],
  other: [
    { id: "general", label: "General Query" }
  ]
};

// Mock Bookings for selection
const MOCK_RECENT_BOOKINGS = [
  { id: "UC-2026-00201", name: "Home Cleaning", date: "20 Sep 2026", amount: 899, status: "Completed" },
  { id: "UC-2026-00215", name: "AC Service & Repair", date: "15 Sep 2026", amount: 1499, status: "Completed" }
];

interface CreateSupportRequestProps {
  open: boolean;
  onClose: () => void;
  initialCategory?: string;
  onSubmit: (data: any) => void;
}

export function CreateSupportRequest({ open, onClose, initialCategory, onSubmit }: CreateSupportRequestProps) {
  const [step, setStep] = useState(initialCategory ? 2 : 1);
  const [category, setCategory] = useState<string>(initialCategory || "");
  const [issue, setIssue] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState<SupportAttachment[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ticketId, setTicketId] = useState("");

  // Reset state when opened with new props
  const resetForm = () => {
    setStep(initialCategory ? 2 : 1);
    setCategory(initialCategory || "");
    setIssue("");
    setBookingId("");
    setDescription("");
    setAttachments([]);
    setSuccess(false);
    setTicketId("");
  };

  const isBookingRequired = ["booking", "refund", "service", "pro", "safety"].includes(category);

  const handleNext = () => {
    if (step === 2 && isBookingRequired && MOCK_RECENT_BOOKINGS.length > 0) setStep(3);
    else if (step === 2) setStep(4);
    else if (step === 3) setStep(4);
  };

  const handleBack = () => {
    if (step === 4 && isBookingRequired && MOCK_RECENT_BOOKINGS.length > 0) setStep(3);
    else if (step === 4) setStep(2);
    else if (step === 3) setStep(2);
    else if (step === 2 && !initialCategory) setStep(1);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      const newId = `SUP-${Math.floor(10000 + Math.random() * 90000)}`;
      setTicketId(newId);
      setTimeout(() => {
        onSubmit({
          category,
          issueType: issue,
          bookingId: bookingId || undefined,
          description,
          attachments,
          priority: category === "safety" ? "high" : "normal",
          ticketId: newId
        });
        setTimeout(() => {
          onClose();
          setTimeout(resetForm, 300);
        }, 1500);
      }, 2000);
    }, 1500);
  };

  if (!open) return null;

  const currentIssues = ISSUES_BY_CATEGORY[category] || ISSUES_BY_CATEGORY["other"];
  const textCount = description.length;
  const isTextValid = textCount >= 10 && textCount <= 1000;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={!submitting && !success ? onClose : undefined} />
        
        <motion.div
          initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 280 }}
          className="absolute right-0 top-0 bottom-0 w-full sm:w-[480px] bg-white flex flex-col shadow-2xl"
        >
          {success ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-extrabold text-[var(--color-foreground)] mb-2">Support request submitted</h3>
              <p className="text-sm text-[var(--color-muted)] mb-6">We've received your request. Ticket ID: <span className="font-bold text-[var(--color-foreground)]">{ticketId}</span><br />Our support team will review it shortly.</p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border)] flex-shrink-0">
                <div>
                  <h2 className="text-lg font-extrabold text-[var(--color-foreground)]">Create Support Request</h2>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                    <span className={cn(step >= 1 && "text-[var(--color-primary)]")}>Category</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className={cn(step >= 2 && "text-[var(--color-primary)]")}>Issue</span>
                    {isBookingRequired && (
                      <>
                        <ChevronRight className="w-3 h-3" />
                        <span className={cn(step >= 3 && "text-[var(--color-primary)]")}>Booking</span>
                      </>
                    )}
                    <ChevronRight className="w-3 h-3" />
                    <span className={cn(step >= 4 && "text-[var(--color-primary)]")}>Details</span>
                  </div>
                </div>
                <button onClick={onClose} disabled={submitting} className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-colors">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                
                {/* Step 1: Category */}
                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-[var(--color-foreground)] mb-4">What do you need help with?</h3>
                    {Object.keys(ISSUES_BY_CATEGORY).filter(k => k !== "other").map(cat => (
                      <button
                        key={cat}
                        onClick={() => { setCategory(cat); setStep(2); }}
                        className="w-full flex items-center justify-between p-4 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all text-left group"
                      >
                        <span className="text-sm font-semibold text-[var(--color-foreground)] capitalize">{cat} Issue</span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[var(--color-primary)] transition-colors" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 2: Issue Type */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-[var(--color-foreground)] mb-4">What went wrong?</h3>
                    {currentIssues.map(i => (
                      <button
                        key={i.id}
                        onClick={() => { setIssue(i.id); handleNext(); }}
                        className="w-full flex items-center justify-between p-4 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all text-left group"
                      >
                        <span className="text-sm font-semibold text-[var(--color-foreground)]">{i.label}</span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[var(--color-primary)] transition-colors" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 3: Booking */}
                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-[var(--color-foreground)] mb-4">Select related booking</h3>
                    {MOCK_RECENT_BOOKINGS.map(b => (
                      <button
                        key={b.id}
                        onClick={() => { setBookingId(b.id); handleNext(); }}
                        className="w-full flex items-center justify-between p-4 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all text-left"
                      >
                        <div>
                          <p className="text-sm font-bold text-[var(--color-foreground)] mb-1">{b.name}</p>
                          <p className="text-xs text-[var(--color-muted)]">{b.date} · {b.id}</p>
                        </div>
                        <span className="text-xs font-bold text-[var(--color-primary)]">Select</span>
                      </button>
                    ))}
                    <button
                      onClick={() => { setBookingId(""); handleNext(); }}
                      className="w-full text-center p-4 text-xs font-bold text-slate-500 hover:text-[var(--color-foreground)]"
                    >
                      Skip / Not related to a specific booking
                    </button>
                  </div>
                )}

                {/* Step 4: Details */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-[var(--color-foreground)] mb-2 uppercase tracking-wider">Tell us what happened</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value.slice(0, 1000))}
                        placeholder="Please provide as much detail as possible..."
                        className="w-full h-32 p-4 rounded-2xl border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all resize-none"
                      />
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-[10px] text-[var(--color-muted)]">Minimum 10 characters</span>
                        <span className={cn("text-xs font-medium", textCount > 950 ? "text-amber-500" : "text-slate-400")}>
                          {textCount} / 1000
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-5 border-t border-[var(--color-border)] bg-white flex gap-3 flex-shrink-0">
                {(step > 1 && !(step === 2 && initialCategory)) && (
                  <button onClick={handleBack} disabled={submitting} className="flex-1 h-11 rounded-xl border border-[var(--color-border)] text-sm font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50">
                    Back
                  </button>
                )}
                {step === 4 && (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting || !isTextValid}
                    className="flex-[2] h-11 rounded-xl bg-[var(--color-primary)] text-white text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center"
                  >
                    {submitting ? "Submitting..." : "Submit Request"}
                  </button>
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
