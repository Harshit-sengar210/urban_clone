"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, Check, Globe, Clock } from "lucide-react";
import { VendorAccountSettings } from "@/types/vendor";
import { SectionCard, SettingRow, SaveButton } from "../shared/SettingsShared";
import { cn } from "@/lib/utils";

type ModalType = "email" | "phone" | null;
type FlowStep = "form" | "verify" | "success";
type SaveState = "idle" | "saving" | "saved";

interface AccountSectionProps {
  data: VendorAccountSettings;
  onChange: (data: VendorAccountSettings) => void;
  onToast: (msg: string) => void;
}

function EmailModal({ isOpen, onClose, onSuccess }: { isOpen: boolean; onClose: () => void; onSuccess: () => void }) {
  const [step, setStep] = useState<FlowStep>("form");
  const [newEmail, setNewEmail] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!newEmail.includes("@")) { setError("Enter a valid email."); return; }
    if (newEmail !== confirm) { setError("Emails do not match."); return; }
    setError(""); setStep("verify");
  };

  const handleVerify = () => { setStep("success"); setTimeout(() => { onSuccess(); setStep("form"); setNewEmail(""); setConfirm(""); }, 1500); };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 z-10"
          >
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"><X className="w-4 h-4 text-slate-400" /></button>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4"><Mail className="w-5 h-5 text-indigo-600" /></div>
            <AnimatePresence mode="wait">
              {step === "form" && (
                <motion.div key="form" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                  <h3 className="font-extrabold text-slate-900 text-lg mb-4">Change Email Address</h3>
                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1.5">New Email</label>
                      <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/30 outline-none" placeholder="new@example.com" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Confirm New Email</label>
                      <input type="email" value={confirm} onChange={e => setConfirm(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/30 outline-none" placeholder="Confirm email" />
                    </div>
                    {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
                  </div>
                  <button onClick={handleContinue} className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-colors">Continue</button>
                </motion.div>
              )}
              {step === "verify" && (
                <motion.div key="verify" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                  <h3 className="font-extrabold text-slate-900 text-lg mb-1">Verify Email</h3>
                  <p className="text-sm text-slate-500 mb-4">Demo: A verification link would be sent to <strong>{newEmail}</strong>. Click confirm to simulate.</p>
                  <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl text-xs text-amber-700 font-medium mb-4">⚠️ Demo only — no real email is sent.</div>
                  <button onClick={handleVerify} className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-colors">Confirm (Demo)</button>
                </motion.div>
              )}
              {step === "success" && (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3"><Check className="w-7 h-7 text-emerald-500" /></div>
                  <h3 className="font-extrabold text-slate-900">Email updated!</h3>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function OTPInput({ onComplete }: { onComplete: () => void }) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const handleChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val && i < 5) document.getElementById(`otp-${i + 1}`)?.focus();
    if (next.every(d => d !== "")) onComplete();
  };
  return (
    <div className="flex gap-2 my-4 justify-center">
      {digits.map((d, i) => (
        <input key={i} id={`otp-${i}`} type="text" inputMode="numeric" maxLength={1} value={d}
          onChange={e => handleChange(i, e.target.value)}
          className="w-10 h-12 text-center rounded-xl border-2 border-slate-200 font-black text-lg focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
        />
      ))}
    </div>
  );
}

function PhoneModal({ isOpen, onClose, onSuccess }: { isOpen: boolean; onClose: () => void; onSuccess: () => void }) {
  const [step, setStep] = useState<FlowStep>("form");
  const [phone, setPhone] = useState("");

  const handleOTPComplete = () => { setTimeout(() => { setStep("success"); setTimeout(() => { onSuccess(); setStep("form"); setPhone(""); }, 1500); }, 400); };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 z-10">
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"><X className="w-4 h-4 text-slate-400" /></button>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4"><Phone className="w-5 h-5 text-indigo-600" /></div>
            <AnimatePresence mode="wait">
              {step === "form" && (
                <motion.div key="form" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                  <h3 className="font-extrabold text-slate-900 text-lg mb-4">Change Phone Number</h3>
                  <div className="mb-4">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1.5">New Phone Number</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/30 outline-none" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <button onClick={() => phone.length > 5 && setStep("verify")} className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-colors">Send Demo OTP</button>
                </motion.div>
              )}
              {step === "verify" && (
                <motion.div key="verify" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                  <h3 className="font-extrabold text-slate-900 text-lg mb-1">Enter OTP</h3>
                  <p className="text-sm text-slate-500 mb-1">Enter any 6 digits to simulate verification.</p>
                  <div className="bg-amber-50 border border-amber-100 p-2 rounded-lg text-xs text-amber-700 font-medium mb-2">Demo verification — no SMS sent.</div>
                  <OTPInput onComplete={handleOTPComplete} />
                </motion.div>
              )}
              {step === "success" && (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3"><Check className="w-7 h-7 text-emerald-500" /></div>
                  <h3 className="font-extrabold text-slate-900">Phone number updated!</h3>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function AccountSection({ data, onToast }: AccountSectionProps) {
  const [modal, setModal] = useState<ModalType>(null);
  const [langState, setLangState] = useState<SaveState>("idle");
  const [lang, setLang] = useState(data.language);
  const [tz, setTz] = useState(data.timezone);

  const maskEmail = (e: string) => e.replace(/^(.{2}).*(@)/, "$1•••$2");
  const maskPhone = (p: string) => p.replace(/(\+?\d{2})\s?\d+(\d{4})$/, "$1 XXXXX $2");

  const handleLangSave = () => {
    setLangState("saving");
    setTimeout(() => { setLangState("saved"); onToast("Language & region saved."); setTimeout(() => setLangState("idle"), 2000); }, 1000);
  };

  return (
    <div className="space-y-5">
      <SectionCard title="Account Information" description="Your contact and identity information." delay={0}>
        <SettingRow label="Email Address" value={maskEmail(data.email)} onAction={() => setModal("email")} actionLabel="Change Email" />
        <SettingRow label="Phone Number" value={maskPhone(data.phone)} onAction={() => setModal("phone")} actionLabel="Change Phone" />
        <SettingRow label="Account ID" value={data.accountId} badge="Demo" mono />
      </SectionCard>

      <SectionCard title="Language & Region" description="Localisation preferences for your partner account." delay={0.05}
        actions={<SaveButton state={langState} onClick={handleLangSave} />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
          {[
            { label: "Language", value: lang, options: [{ v: "en", l: "English" }], onChange: setLang },
            { label: "Timezone", value: tz, options: [{ v: "Asia/Kolkata", l: "India Standard Time (IST)" }], onChange: setTz },
          ].map(field => (
            <div key={field.label}>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1.5">{field.label}</label>
              <div className="relative">
                <select value={field.value} onChange={e => field.onChange(e.target.value)} className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/30 outline-none appearance-none">
                  {field.options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                </select>
                <Globe className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
          ))}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Region</label>
            <div className="relative">
              <select value="in" className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/30 outline-none appearance-none" onChange={() => {}}>
                <option value="in">India</option>
              </select>
              <Globe className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Currency</label>
            <div className="relative">
              <select value="INR" className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/30 outline-none appearance-none" onChange={() => {}}>
                <option value="INR">INR — Indian Rupee</option>
              </select>
              <Globe className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </SectionCard>

      <EmailModal isOpen={modal === "email"} onClose={() => setModal(null)} onSuccess={() => { setModal(null); onToast("Email updated successfully."); }} />
      <PhoneModal isOpen={modal === "phone"} onClose={() => setModal(null)} onSuccess={() => { setModal(null); onToast("Phone number updated."); }} />
    </div>
  );
}
