"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Landmark, Wallet, CreditCard, ArrowDownToLine, IndianRupee, CheckCircle2, ShieldCheck, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { floatAnimation, staggerContainer, staggerItem } from "./animations";

interface BankVisualProps {
  method: "bank_account" | "upi";
  accountHolder: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  upiId: string;
}

export function BankVisual({
  method,
  accountHolder,
  accountNumber,
  ifscCode,
  bankName,
  upiId,
}: BankVisualProps) {
  const maskedAccount = accountNumber 
    ? "•••• " + accountNumber.slice(-4).padStart(4, "•")
    : "•••• ••••";
    
  const maskedIfsc = ifscCode 
    ? "••••" + ifscCode.slice(-3).padStart(3, "•")
    : "••••••••";

  const maskedUpi = upiId 
    ? "••••••@" + (upiId.split("@")[1] || "••••")
    : "••••••@••••";

  const isBankReady = method === "bank_account" && accountHolder && accountNumber && ifscCode;
  const isUpiReady = method === "upi" && upiId;
  const isReady = isBankReady || isUpiReady;

  return (
    <div className="w-full h-full flex flex-col justify-center py-6 px-6 lg:px-10 bg-slate-50 relative overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-emerald-100/20 rounded-full blur-3xl pointer-events-none" />

      {/* Abstract Earnings Flow */}
      <div className="relative w-full max-w-[280px] mx-auto flex flex-col mb-8">
        
        {/* Connection Line */}
        <div className="absolute top-4 bottom-4 left-[15px] w-0.5 bg-gradient-to-b from-slate-200 via-indigo-200 to-slate-200" />
        
        {/* Floating Particles */}
        <motion.div 
          animate={{ y: [0, 120], opacity: [0, 1, 0] }} 
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className="absolute top-4 left-[13.5px] w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)] z-10" 
        />

        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="w-full flex flex-col gap-2">
          
          {/* Step 1 */}
          <motion.div variants={staggerItem} className="w-full relative pl-10">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 scale-90 rounded-full bg-white border border-slate-200 flex items-center justify-center z-20 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="bg-white p-2.5 rounded-xl shadow-sm border border-slate-100">
              <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400 leading-tight">Step 1</p>
              <p className="text-[11px] font-semibold text-slate-700 leading-tight">Completed Booking</p>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div variants={staggerItem} className="w-full relative pl-10">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 scale-90 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center z-20 shadow-sm">
              <IndianRupee className="w-3.5 h-3.5 text-indigo-500" />
            </div>
            <div className="bg-white p-2.5 rounded-xl shadow-md border border-indigo-50 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />
              <p className="text-[8px] font-bold uppercase tracking-wider text-indigo-400 pl-1 leading-tight">Step 2</p>
              <p className="text-[11px] font-bold text-slate-800 pl-1 leading-tight">Vendor Earnings</p>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div variants={staggerItem} className="w-full relative pl-10">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 scale-90 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center z-20 shadow-sm">
              <ArrowDownToLine className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="bg-white p-2.5 rounded-xl shadow-sm border border-emerald-50">
              <p className="text-[8px] font-bold uppercase tracking-wider text-emerald-400 leading-tight">Step 3</p>
              <p className="text-[11px] font-semibold text-slate-700 leading-tight">Payout Account</p>
            </div>
          </motion.div>
          
        </motion.div>
      </div>

      {/* Live Preview Card */}
      <motion.div 
        layout
        className="w-full max-w-[320px] mx-auto bg-white rounded-2xl shadow-xl shadow-indigo-900/5 border border-slate-100 overflow-hidden shrink-0 z-20"
      >
        <div className="bg-slate-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Your Payout Profile</span>
          </div>
          <span className={cn(
            "text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full",
            isReady ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-700 text-slate-400"
          )}>
            {isReady ? "Ready" : "Incomplete"}
          </span>
        </div>

        <div className="p-5 space-y-5">
          {/* Method Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
              {method === "bank_account" ? (
                <Landmark className="w-5 h-5 text-indigo-500" />
              ) : (
                <Wallet className="w-5 h-5 text-indigo-500" />
              )}
            </div>
            <div className="overflow-hidden">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Payout Method</p>
              <p className="text-sm font-bold text-slate-800 truncate">
                {method === "bank_account" ? "Bank Account" : "UPI Transfer"}
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {method === "bank_account" ? (
              <motion.div 
                key="bank"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Account Holder</p>
                  <p className="text-sm font-semibold text-slate-700 truncate">
                    {accountHolder || <span className="text-slate-300">Name on account</span>}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                  <p className="text-xs font-semibold text-slate-700 truncate">
                    {bankName || <span className="text-slate-300">Bank Name</span>}
                  </p>
                </div>

                <div className="flex gap-4 pt-4 border-t border-slate-100">
                  <div className="flex-1 overflow-hidden">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Account</p>
                    <p className="text-xs font-mono font-bold text-slate-600 truncate">
                      {maskedAccount}
                    </p>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">IFSC</p>
                    <p className="text-xs font-mono font-bold text-slate-600 truncate">
                      {maskedIfsc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="upi"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">UPI ID</p>
                  <p className="text-sm font-mono font-semibold text-slate-700 truncate">
                    {maskedUpi}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

    </div>
  );
}
