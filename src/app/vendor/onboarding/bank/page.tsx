"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Landmark, Wallet, CheckCircle2, ShieldCheck, HelpCircle } from "lucide-react";

import { VendorOnboardingHeader } from "@/components/vendor-onboarding/VendorOnboardingHeader";
import { OnboardingProgress } from "@/components/vendor-onboarding/OnboardingProgress";
import { OnboardingNavigation } from "@/components/vendor-onboarding/OnboardingNavigation";
import { BankVisual } from "@/components/vendor-onboarding/BankVisual";
import { PrivacyCard } from "@/components/vendor-onboarding/PrivacyCard";
import { cn } from "@/lib/utils";
import { 
  onboardingPageVariants, 
  staggerContainer, 
  staggerItem, 
  shakeAnimation 
} from "@/components/vendor-onboarding/animations";
import { useVendorOnboarding } from "@/contexts/vendor/VendorOnboardingProvider";


type PayoutMethod = "bank_account" | "upi";

interface VendorBankDetails {
  accountHolderName: string;
  accountNumber: string;
  confirmAccountNumber: string;
  ifscCode: string;
  bankName: string;
  branchName?: string;
}

interface VendorUPIDetails {
  upiId: string;
}

interface VendorPayoutData {
  method: PayoutMethod;
  bank: VendorBankDetails;
  upi: VendorUPIDetails;
  isPrimary: boolean;
}

const DEFAULT_STATE: VendorPayoutData = {
  method: "bank_account",
  bank: {
    accountHolderName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    bankName: "",
    branchName: "",
  },
  upi: {
    upiId: "",
  },
  isPrimary: true,
};

export default function BankSetupPage() {
  const router = useRouter();
  const [data, setData] = useState<VendorPayoutData>(DEFAULT_STATE);
  const { application, loading, saveBankPayout } = useVendorOnboarding();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (application?.payouts) {
      setData(prev => ({
        ...prev,
        ...application.payouts,
        method: (application.payouts?.method || "bank_account") as PayoutMethod,
        bank: {
          ...prev.bank,
          ...(application.payouts?.bank || {}),
          confirmAccountNumber: application.payouts?.bank?.accountNumber || ""
        } as any,
        upi: {
          ...prev.upi,
          ...(application.payouts?.upi || {})
        }
      }));
    }
  }, [application]);

  const [toastMessage, setToastMessage] = useState("");
  const [errors, setErrors] = useState<Partial<Record<string, boolean>>>({});
  const [showAccount, setShowAccount] = useState(false);



  const updateBankField = (field: keyof VendorBankDetails, value: string) => {
    setData(prev => ({ ...prev, bank: { ...prev.bank, [field]: value } }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const updateUpiField = (value: string) => {
    setData(prev => ({ ...prev, upi: { upiId: value } }));
    if (errors.upiId) setErrors(prev => ({ ...prev, upiId: undefined }));
  };

  const validate = () => {
    let newErrors: Partial<Record<string, boolean>> = {};
    let isValid = true;

    if (data.method === "bank_account") {
      if (!data.bank.accountHolderName) { newErrors.accountHolderName = true; isValid = false; }
      if (!data.bank.accountNumber) { newErrors.accountNumber = true; isValid = false; }
      if (!data.bank.confirmAccountNumber || data.bank.confirmAccountNumber !== data.bank.accountNumber) { 
        newErrors.confirmAccountNumber = true; 
        isValid = false; 
      }
      if (!data.bank.ifscCode || data.bank.ifscCode.length < 5) { newErrors.ifscCode = true; isValid = false; }
      if (!data.bank.bankName) { newErrors.bankName = true; isValid = false; }
    } else {
      if (!data.upi.upiId || !data.upi.upiId.includes("@")) { 
        newErrors.upiId = true; 
        isValid = false; 
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = async () => {
    try {
      await saveBankPayout(data);
      setToastMessage("Your onboarding progress has been saved.");
    } catch (e) {
      setToastMessage("Could not save progress.");
    }
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleContinue = async () => {
    if (validate()) {
      try {
        setToastMessage("Saving payout details...");
        await saveBankPayout(data);
        
        setToastMessage("Payout details saved successfully!");
        
        setTimeout(() => {
          router.push("/vendor/onboarding/availability");
        }, 1000);
      } catch (error) {
        console.error("Error saving bank details:", error);
        setToastMessage("Failed to save payout details.");
      }
    } else {
      if (data.method === "bank_account" && data.bank.accountNumber !== data.bank.confirmAccountNumber && data.bank.confirmAccountNumber) {
        setToastMessage("Account numbers do not match.");
      } else {
        setToastMessage("Please fill in all required fields correctly.");
      }
      setTimeout(() => setToastMessage(""), 3000);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return false;
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen md:h-screen md:overflow-hidden bg-white flex flex-col font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <VendorOnboardingHeader />

      <div className="flex-1 flex flex-col md:flex-row md:overflow-hidden">
        
        {/* Left Visual Area */}
        <div className="hidden md:flex w-[40%] h-full relative order-1 bg-slate-50 border-r border-slate-100">
          <BankVisual 
            method={data.method}
            accountHolder={data.bank.accountHolderName}
            accountNumber={data.bank.accountNumber}
            ifscCode={data.bank.ifscCode}
            bankName={data.bank.bankName}
            upiId={data.upi.upiId}
          />
        </div>

        {/* Right Form Area */}
        <div className="w-full md:w-[60%] md:h-full md:overflow-y-auto bg-white p-6 md:p-12 lg:p-16 flex items-start justify-center order-2">
          <motion.div 
            variants={onboardingPageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full max-w-2xl pb-12"
          >
            {/* Mobile Header */}
            <div className="block md:hidden mb-8">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Landmark className="w-4 h-4" /> Step 8 of 9
              </div>
            </div>

            <div className="hidden md:block mb-8">
              <OnboardingProgress currentStep={8} totalSteps={9} label="Bank & Payout" />
            </div>

            <div className="mb-10">
              <h1 className="text-3xl font-extrabold text-[var(--color-foreground)] tracking-tight mb-2">
                Set Up Your Payouts
              </h1>
              <p className="text-slate-500 font-medium">
                Add your payout details so you can receive earnings from completed bookings.
                <span className="block text-xs mt-1 text-slate-400">Your payout details can be updated later from your vendor account settings.</span>
              </p>
            </div>

            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-12">
              
              {/* Method Selection */}
              <motion.section variants={staggerItem} className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-1">
                    Choose Payout Method
                  </h3>
                  <p className="text-xs text-slate-500">Select how you want to receive your earnings.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.button
                    type="button"
                    onClick={() => setData(prev => ({ ...prev, method: "bank_account" }))}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "p-5 rounded-2xl border-2 text-left transition-all outline-none",
                      data.method === "bank_account"
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    )}
                  >
                    <Landmark className={cn("w-6 h-6 mb-3", data.method === "bank_account" ? "text-[var(--color-primary)]" : "text-slate-400")} />
                    <h4 className={cn("font-bold text-sm", data.method === "bank_account" ? "text-[var(--color-primary)]" : "text-slate-700")}>Bank Account</h4>
                    <p className="text-xs text-slate-500 mt-1">Receive payouts directly to your bank account.</p>
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    onClick={() => setData(prev => ({ ...prev, method: "upi" }))}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "p-5 rounded-2xl border-2 text-left transition-all outline-none",
                      data.method === "upi"
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    )}
                  >
                    <Wallet className={cn("w-6 h-6 mb-3", data.method === "upi" ? "text-[var(--color-primary)]" : "text-slate-400")} />
                    <h4 className={cn("font-bold text-sm flex items-center justify-between", data.method === "upi" ? "text-[var(--color-primary)]" : "text-slate-700")}>
                      UPI
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 uppercase tracking-widest">Demo</span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">Use a supported UPI ID for payouts.</p>
                  </motion.button>
                </div>
              </motion.section>

              {/* Dynamic Form Fields */}
              <AnimatePresence mode="wait">
                {data.method === "bank_account" ? (
                  <motion.section 
                    key="bank-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-1">
                        Bank Account Details
                      </h3>
                      <p className="text-xs text-slate-500">Enter the details of the account where you want to receive payments.</p>
                    </div>

                    <div className="space-y-5">
                      <motion.div animate={errors.accountHolderName ? shakeAnimation : {}}>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Account Holder Name</label>
                        <input
                          type="text"
                          value={data.bank.accountHolderName}
                          onChange={(e) => updateBankField("accountHolderName", e.target.value)}
                          placeholder="Name exactly as it appears on bank account"
                          autoComplete="off"
                          className={cn(
                            "w-full h-11 px-4 rounded-xl border transition-all outline-none text-sm font-semibold",
                            errors.accountHolderName ? "border-red-400 bg-red-50 focus:ring-4 focus:ring-red-100" : "border-slate-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-primary/10 bg-white"
                          )}
                        />
                      </motion.div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <motion.div animate={errors.accountNumber ? shakeAnimation : {}}>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex justify-between">
                            Account Number
                            <button type="button" onClick={() => setShowAccount(!showAccount)} className="text-[10px] text-[var(--color-primary)] uppercase tracking-wider font-bold">
                              {showAccount ? 'Hide' : 'Show'}
                            </button>
                          </label>
                          <input
                            type={showAccount ? "text" : "password"}
                            value={data.bank.accountNumber}
                            onChange={(e) => updateBankField("accountNumber", e.target.value.replace(/\D/g, ''))}
                            placeholder="e.g. 1234567890"
                            autoComplete="new-password"
                            className={cn(
                              "w-full h-11 px-4 rounded-xl border transition-all outline-none text-sm font-mono font-semibold",
                              errors.accountNumber ? "border-red-400 bg-red-50 focus:ring-4 focus:ring-red-100" : "border-slate-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-primary/10 bg-white"
                            )}
                          />
                        </motion.div>

                        <motion.div animate={errors.confirmAccountNumber ? shakeAnimation : {}}>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">Confirm Account Number</label>
                          <input
                            type="password"
                            value={data.bank.confirmAccountNumber}
                            onChange={(e) => updateBankField("confirmAccountNumber", e.target.value.replace(/\D/g, ''))}
                            placeholder="Re-enter account number"
                            autoComplete="new-password"
                            className={cn(
                              "w-full h-11 px-4 rounded-xl border transition-all outline-none text-sm font-mono font-semibold",
                              errors.confirmAccountNumber ? "border-red-400 bg-red-50 focus:ring-4 focus:ring-red-100" : "border-slate-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-primary/10 bg-white"
                            )}
                          />
                          {errors.confirmAccountNumber && <p className="text-[10px] font-bold text-red-500 mt-1">Account numbers do not match.</p>}
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <motion.div animate={errors.ifscCode ? shakeAnimation : {}}>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">IFSC Code</label>
                          <input
                            type="text"
                            value={data.bank.ifscCode}
                            onChange={(e) => updateBankField("ifscCode", e.target.value.toUpperCase())}
                            placeholder="e.g. HDFC0001234"
                            maxLength={11}
                            className={cn(
                              "w-full h-11 px-4 rounded-xl border transition-all outline-none text-sm font-mono font-semibold uppercase",
                              errors.ifscCode ? "border-red-400 bg-red-50 focus:ring-4 focus:ring-red-100" : "border-slate-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-primary/10 bg-white"
                            )}
                          />
                        </motion.div>

                        <motion.div animate={errors.bankName ? shakeAnimation : {}}>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">Bank Name</label>
                          <input
                            type="text"
                            value={data.bank.bankName}
                            onChange={(e) => updateBankField("bankName", e.target.value)}
                            placeholder="e.g. State Bank of India"
                            className={cn(
                              "w-full h-11 px-4 rounded-xl border transition-all outline-none text-sm font-semibold",
                              errors.bankName ? "border-red-400 bg-red-50 focus:ring-4 focus:ring-red-100" : "border-slate-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-primary/10 bg-white"
                            )}
                          />
                        </motion.div>
                      </div>
                      
                      <motion.div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Branch Name (Optional)</label>
                        <input
                          type="text"
                          value={data.bank.branchName}
                          onChange={(e) => updateBankField("branchName", e.target.value)}
                          placeholder="e.g. Connaught Place"
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 transition-all outline-none text-sm font-semibold focus:border-[var(--color-primary)] focus:ring-4 focus:ring-primary/10 bg-white"
                        />
                      </motion.div>
                    </div>
                  </motion.section>
                ) : (
                  <motion.section 
                    key="upi-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-1">
                        UPI Details
                      </h3>
                      <p className="text-xs text-slate-500">Enter your UPI ID to receive payments. UPI payout availability will depend on final payment configuration.</p>
                    </div>

                    <motion.div animate={errors.upiId ? shakeAnimation : {}}>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">UPI ID</label>
                      <input
                        type="text"
                        value={data.upi.upiId}
                        onChange={(e) => updateUpiField(e.target.value)}
                        placeholder="name@example"
                        className={cn(
                          "w-full h-11 px-4 rounded-xl border transition-all outline-none text-sm font-semibold",
                          errors.upiId ? "border-red-400 bg-red-50 focus:ring-4 focus:ring-red-100" : "border-slate-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-primary/10 bg-white"
                        )}
                      />
                      {errors.upiId && <p className="text-[10px] font-bold text-red-500 mt-1">Please enter a valid UPI ID containing '@'.</p>}
                    </motion.div>
                  </motion.section>
                )}
              </AnimatePresence>

              {/* Payout Preferences */}
              <motion.section variants={staggerItem} className="pt-6 border-t border-slate-100">
                <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-4">
                  Payout Preferences
                </h3>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 mt-0.5">
                    <input
                      type="checkbox"
                      checked={data.isPrimary}
                      onChange={(e) => setData(prev => ({ ...prev, isPrimary: e.target.checked }))}
                      className="peer w-5 h-5 rounded border-2 border-slate-300 appearance-none checked:border-[var(--color-primary)] checked:bg-[var(--color-primary)] transition-all cursor-pointer"
                    />
                    <CheckCircle2 className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                  <span className="text-xs font-medium leading-relaxed select-none transition-colors text-slate-600 group-hover:text-slate-900">
                    Use this account as my primary payout method for all future bookings.
                  </span>
                </label>
              </motion.section>

              {/* Security Information */}
              <motion.section variants={staggerItem} className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200/50 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Keep Your Payout Details Safe</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Bank and payout information is sensitive. In this prototype, details are handled locally and are not connected to a live payment system. 
                      <span className="block mt-2 text-[10px] uppercase font-bold text-slate-400">Production implementation should use secure server-side handling and an approved payment/payout provider.</span>
                    </p>
                  </div>
                </div>
              </motion.section>

            </motion.div>

            <div className="mt-12">
              <OnboardingNavigation 
                onBack={() => router.push("/vendor/onboarding/verification")}
                onSave={handleSave}
                onContinue={handleContinue}
                isNextDisabled={false}
              />
            </div>
          </motion.div>
        </div>

      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl font-medium text-sm flex items-center gap-2"
          >
            {toastMessage.includes("match") || toastMessage.includes("fill in") ? (
              <HelpCircle className="w-4 h-4 text-amber-400" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            )}
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
