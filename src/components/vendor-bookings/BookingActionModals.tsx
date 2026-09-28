"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, MessageSquareX, CalendarX, Play, CheckSquare } from "lucide-react";
import { useState } from "react";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data?: any) => void;
  isSubmitting: boolean;
}

export interface CompleteServiceData {
  paymentType: "cash" | "online";
  amountCollected: string;
  screenshotBase64?: string;
}

// ----------------------------------------------------------------------
// REJECT MODAL
// ----------------------------------------------------------------------
export function RejectBookingModal({ isOpen, onClose, onConfirm, isSubmitting }: ActionModalProps) {
  const [reason, setReason] = useState("");
  const reasons = ["Not available", "Outside service area", "Schedule conflict", "Other"];

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      isSubmitting={isSubmitting}
      icon={<MessageSquareX className="w-6 h-6 text-red-600" />}
      iconBg="bg-red-50"
      title="Reject Booking?"
      description="Are you sure you want to reject this booking request? This action cannot be undone."
      confirmText="Reject Booking"
      confirmColor="bg-red-600 hover:bg-red-700"
      onConfirm={() => onConfirm(reason)}
    >
      <div className="mb-6 space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Reason (Optional)</label>
        <select 
          value={reason} 
          onChange={(e) => setReason(e.target.value)}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 appearance-none"
        >
          <option value="">Select a reason</option>
          {reasons.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
    </BaseModal>
  );
}

// ----------------------------------------------------------------------
// CANCEL MODAL
// ----------------------------------------------------------------------
export function CancelBookingModal({ isOpen, onClose, onConfirm, isSubmitting }: ActionModalProps) {
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const reasons = ["Schedule conflict", "Unable to provide service", "Customer requested cancellation", "Other"];

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      isSubmitting={isSubmitting}
      icon={<CalendarX className="w-6 h-6 text-red-600" />}
      iconBg="bg-red-50"
      title="Cancel Confirmed Booking?"
      description="Are you sure you want to cancel this booking? Frequent cancellations may affect your partner rating."
      confirmText="Cancel Booking"
      confirmColor="bg-red-600 hover:bg-red-700"
      onConfirm={() => onConfirm(reason === "Other" ? `Other: ${customReason}` : reason)}
      disableConfirm={!reason || (reason === "Other" && !customReason.trim())}
    >
      <div className="mb-6 space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Reason (Required)</label>
        <select 
          value={reason} 
          onChange={(e) => setReason(e.target.value)}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 appearance-none"
        >
          <option value="">Select a reason</option>
          {reasons.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        
        <AnimatePresence>
          {reason === "Other" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-3"
            >
              <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Please tell us more (Required)</label>
              <textarea
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Write your reason here..."
                rows={3}
                className="w-full mt-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 resize-none"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BaseModal>
  );
}

// ----------------------------------------------------------------------
// START SERVICE MODAL
// ----------------------------------------------------------------------
export function StartServiceModal({ isOpen, onClose, onConfirm, isSubmitting }: ActionModalProps) {
  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      isSubmitting={isSubmitting}
      icon={<Play className="w-6 h-6 text-indigo-600 ml-1" />}
      iconBg="bg-indigo-50"
      title="Start Service?"
      description="This will mark the booking as currently in progress. Ensure you have reached the customer's location before starting."
      confirmText="Start Service"
      confirmColor="bg-indigo-600 hover:bg-indigo-700"
      onConfirm={() => onConfirm()}
    />
  );
}

// ----------------------------------------------------------------------
// COMPLETE SERVICE MODAL
// ----------------------------------------------------------------------
export function CompleteServiceModal({ isOpen, onClose, onConfirm, isSubmitting }: ActionModalProps) {
  const [paymentType, setPaymentType] = useState<"cash" | "online">("cash");
  const [amountCollected, setAmountCollected] = useState("");
  const [screenshot, setScreenshot] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshot(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    onConfirm({
      paymentType,
      amountCollected,
      screenshotBase64: screenshot
    } as CompleteServiceData);
  };

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      isSubmitting={isSubmitting}
      icon={<CheckSquare className="w-6 h-6 text-emerald-600" />}
      iconBg="bg-emerald-50"
      title="Complete Service & Collect Payment"
      description="Mark this booking as completed and record the payment details."
      confirmText="Mark Completed"
      confirmColor="bg-emerald-600 hover:bg-emerald-700"
      onConfirm={handleConfirm}
      disableConfirm={!amountCollected || (paymentType === "online" && !screenshot)}
    >
      <div className="mb-6 space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Payment Method</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setPaymentType("cash")}
              className={`py-2 rounded-xl text-sm font-bold border-2 transition-all ${
                paymentType === "cash" ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
            >
              Cash
            </button>
            <button
              onClick={() => setPaymentType("online")}
              className={`py-2 rounded-xl text-sm font-bold border-2 transition-all ${
                paymentType === "online" ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
            >
              Online / UPI
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Amount Collected (₹)</label>
          <input
            type="number"
            value={amountCollected}
            onChange={(e) => setAmountCollected(e.target.value)}
            placeholder="e.g. 500"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        {paymentType === "online" && (
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Payment Screenshot</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
            {screenshot && (
              <div className="mt-2 text-xs text-emerald-600 font-medium">Screenshot attached ✓</div>
            )}
          </div>
        )}
      </div>
    </BaseModal>
  );
}

// ----------------------------------------------------------------------
// BASE MODAL WRAPPER
// ----------------------------------------------------------------------
interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
  title: string;
  description: string;
  confirmText: string;
  confirmColor: string;
  icon: React.ReactNode;
  iconBg: string;
  children?: React.ReactNode;
  disableConfirm?: boolean;
}

function BaseModal({ isOpen, onClose, onConfirm, isSubmitting, title, description, confirmText, confirmColor, icon, iconBg, children, disableConfirm }: BaseModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isSubmitting ? onClose : undefined}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconBg}`}>
                {icon}
              </div>
              {!isSubmitting && (
                <button 
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <h2 className="text-xl font-extrabold text-slate-900 mb-2">
              {title}
            </h2>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed whitespace-pre-line">
              {description}
            </p>

            {children}

            <div className="flex gap-3">
              <button 
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 py-3 px-4 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:border-slate-300 hover:bg-slate-50 transition-all disabled:opacity-50"
              >
                Go Back
              </button>
              <button 
                onClick={onConfirm}
                disabled={isSubmitting || disableConfirm}
                className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-lg ${confirmColor}`}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Wait...
                  </>
                ) : (
                  confirmText
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
