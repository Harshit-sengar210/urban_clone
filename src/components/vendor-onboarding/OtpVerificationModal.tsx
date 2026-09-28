"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { modalVariants } from "./animations";

interface OtpVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  target: string;
  type: "phone" | "email";
  onSuccess: () => void;
}

export function OtpVerificationModal({ isOpen, onClose, target, type, onSuccess }: OtpVerificationModalProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(30);

  // Focus management
  const handleInput = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && countdown > 0) {
      timer = setInterval(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, countdown]);

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setOtp(["", "", "", "", "", ""]);
      setCountdown(30);
      setIsVerifying(false);
      setTimeout(() => {
        document.getElementById("otp-0")?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleVerify = () => {
    if (otp.join("").length !== 6) return;
    
    setIsVerifying(true);
    // Simulate network delay
    setTimeout(() => {
      setIsVerifying(false);
      onSuccess();
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-white rounded-3xl p-6 md:p-8 w-full max-w-sm shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-5 mx-auto">
              <KeyRound className="w-6 h-6" />
            </div>

            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-2">Verify {type === "phone" ? "Mobile" : "Email"}</h3>
              <p className="text-sm font-medium text-slate-500">
                We sent a 6-digit code to <br/>
                <span className="font-bold text-slate-800">{target}</span>
              </p>
            </div>

            <div className="flex justify-between gap-2 mb-8">
              {otp.map((digit, idx) => (
                <motion.input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInput(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  onFocus={(e) => e.target.select()}
                  whileFocus={{ scale: 1.05 }}
                  className="w-10 h-12 md:w-12 md:h-14 text-center text-xl font-bold rounded-xl border-2 border-slate-200 focus:border-[var(--color-primary)] focus:ring-0 outline-none transition-colors"
                />
              ))}
            </div>

            <Button 
              className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all mb-4"
              disabled={otp.join("").length !== 6 || isVerifying}
              onClick={handleVerify}
            >
              {isVerifying ? (
                <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Verifying...</span>
              ) : (
                "Verify Code"
              )}
            </Button>

            <div className="text-center">
              {countdown > 0 ? (
                <p className="text-xs font-medium text-slate-500">Resend code in {countdown}s</p>
              ) : (
                <button 
                  type="button" 
                  onClick={() => setCountdown(30)}
                  className="text-xs font-bold text-[var(--color-primary)] hover:underline"
                >
                  Resend code
                </button>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
