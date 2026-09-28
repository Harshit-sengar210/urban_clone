"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OtpVerificationModal } from "./OtpVerificationModal";
import { shakeAnimation } from "./animations";

type VerificationStatus = "unverified" | "sending" | "pending" | "verified" | "failed";

interface VerificationFieldProps {
  id: string;
  label: string;
  type: "email" | "text" | "tel";
  value: string;
  onChange: (val: string) => void;
  status: VerificationStatus;
  onStatusChange: (status: VerificationStatus) => void;
  icon: React.ReactNode;
  placeholder: string;
  prefix?: string;
  error?: string;
}

export function VerificationField({
  id,
  label,
  type,
  value,
  onChange,
  status,
  onStatusChange,
  icon,
  placeholder,
  prefix,
  error
}: VerificationFieldProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSendCode = () => {
    if (!value || error) return;
    onStatusChange("sending");
    
    // Simulate API request to send OTP
    setTimeout(() => {
      onStatusChange("pending");
      setIsModalOpen(true);
    }, 800);
  };

  const handleOtpSuccess = () => {
    setIsModalOpen(false);
    onStatusChange("verified");
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    if (status === "verified" || status === "failed") {
      onStatusChange("unverified");
    }
  };

  const isVerified = status === "verified";
  const hasError = !!error && !isVerified;

  return (
    <div className="space-y-1.5 relative">
      <label className="text-sm font-semibold text-[var(--color-foreground)]" htmlFor={id}>
        {label}
      </label>
      
      <motion.div 
        className="relative flex items-center gap-2"
        animate={hasError ? shakeAnimation : {}}
      >
        <div className="relative flex-grow">
          {prefix && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-semibold z-10">
              {prefix}
            </div>
          )}
          
          <Input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleValueChange}
            disabled={isVerified}
            className={`h-12 w-full transition-all duration-300 ${prefix ? "pl-[3.25rem]" : "pl-10"} ${isVerified ? "border-green-300 bg-green-50/50 text-slate-600 font-semibold focus-visible:ring-0" : ""} ${hasError ? "border-red-400 focus-visible:ring-red-400/20" : ""}`}
          />
          
          {!prefix && (
            <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isVerified ? "text-green-500" : "text-slate-400"}`}>
              {icon}
            </div>
          )}

          <AnimatePresence>
            {isVerified && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-green-600 bg-white px-2 py-0.5 rounded shadow-sm border border-green-100"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
              </motion.div>
            )}
            
            {hasError && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
              >
                <AlertCircle className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!isVerified && (
          <Button 
            type="button"
            variant="outline"
            className="h-12 px-4 whitespace-nowrap shrink-0 font-bold border-slate-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all"
            onClick={handleSendCode}
            disabled={!value || !!error || status === "sending"}
          >
            {status === "sending" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Verify"
            )}
          </Button>
        )}
      </motion.div>

      <AnimatePresence>
        {hasError && (
          <motion.p 
            initial={{ opacity: 0, y: -4 }} 
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs font-bold text-red-500 absolute -bottom-5 left-0"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <OtpVerificationModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          onStatusChange("unverified");
        }}
        target={`${prefix ? prefix + " " : ""}${value}`}
        type={type === "tel" ? "phone" : "email"}
        onSuccess={handleOtpSuccess}
      />
    </div>
  );
}
