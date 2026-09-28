"use client";

import React, { useState } from "react";
import { VendorProfile } from "@/types/vendor";
import { Wrench, MapPin, Landmark, Clock, ArrowRight, X, Building2, Plus, CheckCircle2, ChevronLeft, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/backend/firebase";

export function ProfileSummaries({ profile }: { profile: VendorProfile }) {
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  
  // Adding New Bank Account State
  const [isAddingBank, setIsAddingBank] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newBank, setNewBank] = useState({
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    upiId: ""
  });

  interface CardWrapperProps {
    title: string;
    icon: React.ReactNode;
    actionText: string;
    onAction?: () => void;
    children: React.ReactNode;
  }

  const CardWrapper = ({ title, icon, actionText, onAction, children }: CardWrapperProps) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 shrink-0 border border-slate-100">
          {icon}
        </div>
        <h3 className="text-base font-bold text-slate-900 leading-tight">{title}</h3>
      </div>
      
      <div className="flex-1">
        {children}
      </div>

      <button 
        onClick={onAction}
        className="w-full mt-5 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-sm font-bold text-slate-600 transition-colors flex items-center justify-center gap-2 group border border-slate-100"
      >
        {actionText}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );

  const handleSaveNewBank = async () => {
    if (!newBank.bankName || !newBank.accountNumber || !newBank.accountHolderName || !newBank.ifscCode) {
      alert("Please fill all required bank details.");
      return;
    }

    setIsSaving(true);
    try {
      const docRef = doc(db, "vendorApplications", profile.id);
      
      const additionalAccount = {
        bankName: newBank.bankName,
        accountHolderName: newBank.accountHolderName,
        accountNumber: newBank.accountNumber,
        ifscCode: newBank.ifscCode,
        upiId: newBank.upiId || ""
      };

      await updateDoc(docRef, {
        "payouts.additionalAccounts": arrayUnion(additionalAccount)
      });

      // Reset form and return to list
      setNewBank({ bankName: "", accountHolderName: "", accountNumber: "", ifscCode: "", upiId: "" });
      setIsAddingBank(false);
      
      window.dispatchEvent(new CustomEvent('show-toast', { detail: "New bank account added successfully!" }));
    } catch (err) {
      console.error(err);
      alert("Failed to add bank account.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSetPrimaryBank = async (accountToPromote: any, index: number) => {
    try {
      const currentPrimary = profile.payout.rawPayoutDetails?.bank;
      const docRef = doc(db, "vendorApplications", profile.id);
      
      const newAdditionalAccounts = [...additionalAccounts];
      // Remove the promoted account from additionalAccounts
      newAdditionalAccounts.splice(index, 1);
      
      // If there was an existing primary account, push it to additionalAccounts
      if (currentPrimary && currentPrimary.accountNumber) {
        newAdditionalAccounts.push(currentPrimary);
      }

      await updateDoc(docRef, {
        "payouts.bank": accountToPromote,
        "payouts.additionalAccounts": newAdditionalAccounts
      });

      window.dispatchEvent(new CustomEvent('show-toast', { detail: "Primary bank account updated!" }));
    } catch (err) {
      console.error("Failed to set primary bank:", err);
      alert("Failed to update primary bank account.");
    }
  };

  const additionalAccounts = profile.payout.rawPayoutDetails?.additionalAccounts || [];

  return (
    <>
      <div className="flex flex-col gap-6">
        
        {/* Services Summary */}
        <CardWrapper title="Services & Expertise" icon={<Wrench className="w-5 h-5" />} actionText="Manage Services">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-xl border border-indigo-100">
              <span className="font-bold text-indigo-900">{profile.services.length} Active Services</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.services.slice(0, 5).map(s => (
                <span key={s.id} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700">
                  {s.serviceName}
                </span>
              ))}
              {profile.services.length > 5 && (
                <span className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-500">
                  +{profile.services.length - 5} more
                </span>
              )}
            </div>
          </div>
        </CardWrapper>

        {/* Service Area Summary */}
        <CardWrapper title="Service Area" icon={<MapPin className="w-5 h-5" />} actionText="Edit Service Area">
          <div className="space-y-4 relative">
            <div className="absolute inset-0 bg-slate-50 rounded-xl overflow-hidden -z-10 opacity-50 flex items-center justify-center">
              <div className="w-full h-full border border-indigo-100 rounded-full scale-150 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-indigo-200 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-indigo-100/50 rounded-full" />
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-100">
              <div className="font-black text-slate-900 text-lg">{profile.serviceArea.primaryCity}</div>
              <div className="text-sm font-bold text-indigo-600 mt-1">{profile.serviceArea.radiusKm} km radius</div>
              
              <div className="mt-3 pt-3 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Additional Areas</div>
                <div className="flex flex-wrap gap-1.5">
                  {profile.serviceArea.additionalAreas.map(area => (
                    <span key={area} className="text-xs font-bold text-slate-700 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm">{area}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardWrapper>

        {/* Payout Summary */}
        <CardWrapper 
          title="Payout Information" 
          icon={<Landmark className="w-5 h-5" />} 
          actionText="Manage Payout Details"
          onAction={() => setIsPayoutModalOpen(true)}
        >
          <div className="space-y-3">
            <div className="flex justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="font-bold text-slate-700">Bank Account</div>
              <div className="font-mono font-medium text-slate-500">{profile.payout.bankMasked}</div>
            </div>
            <div className="flex justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="font-bold text-slate-700">UPI ID</div>
              <div className="font-mono font-medium text-slate-500">{profile.payout.upiMasked}</div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Configured & Verified</span>
            </div>
          </div>
        </CardWrapper>

        {/* Availability Summary */}
        <CardWrapper title="Availability" icon={<Clock className="w-5 h-5" />} actionText="Manage Availability">
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1 p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
                <div className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1">Auto Accept</div>
                <div className="font-black text-emerald-900">{profile.availability.autoAccept ? "On" : "Off"}</div>
              </div>
              <div className="flex-1 p-3 bg-indigo-50 rounded-xl border border-indigo-100 text-center">
                <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-1">Max/Day</div>
                <div className="font-black text-indigo-900">{profile.availability.maxBookingsPerDay} Bookings</div>
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-xl border border-slate-100 p-4">
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {profile.availability.schedule.filter(s => s.isAvailable).map(s => (
                  <div key={s.day} className="flex items-center gap-2 w-[calc(50%-1rem)]">
                    <span className="text-xs font-bold text-slate-900 w-8">{s.day}</span>
                    <span className="text-xs font-medium text-slate-500">{s.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardWrapper>

      </div>

      {/* Payout Details Modal */}
      <AnimatePresence>
        {isPayoutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => {
                setIsPayoutModalOpen(false);
                setIsAddingBank(false);
              }}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  {isAddingBank ? (
                    <button 
                      onClick={() => setIsAddingBank(false)}
                      className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors mr-2"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  ) : (
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                      <Landmark className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{isAddingBank ? "Add Bank Account" : "Payout Details"}</h2>
                    <p className="text-sm text-slate-500 font-medium">{isAddingBank ? "Enter your new payout details" : "Manage where you receive your earnings"}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setIsPayoutModalOpen(false);
                    setIsAddingBank(false);
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {!isAddingBank ? (
                    <motion.div 
                      key="list"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      {/* Current Active Bank Account */}
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                          Active Bank Account
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-md text-[10px] uppercase tracking-wider font-bold">Primary</span>
                        </h3>
                        
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <Building2 className="w-24 h-24" />
                          </div>
                          <div className="space-y-4 relative z-10">
                            <div>
                              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Bank Name</div>
                              <div className="font-bold text-slate-900">{profile.payout.rawPayoutDetails?.bank?.bankName || "N/A"}</div>
                            </div>
                            
                            <div>
                              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Account Holder</div>
                              <div className="font-bold text-slate-900">{profile.payout.rawPayoutDetails?.bank?.accountHolderName || "N/A"}</div>
                            </div>
                            
                            <div className="flex items-center gap-6">
                              <div>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Account No.</div>
                                <div className="font-mono font-medium text-slate-700 tracking-wider">
                                  {profile.payout.rawPayoutDetails?.bank?.accountNumber || "N/A"}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">IFSC Code</div>
                                <div className="font-mono font-medium text-slate-700 tracking-wider">
                                  {profile.payout.rawPayoutDetails?.bank?.ifscCode || "N/A"}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Current UPI */}
                      {profile.payout.rawPayoutDetails?.upi?.upiId && (
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 mb-3">UPI Details</h3>
                          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                            <div>
                              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">UPI ID</div>
                              <div className="font-mono font-medium text-slate-900">{profile.payout.rawPayoutDetails?.upi?.upiId}</div>
                            </div>
                            <div className="text-emerald-500">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Additional Accounts */}
                      {additionalAccounts.length > 0 && (
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 mb-3">Other Bank Accounts</h3>
                          <div className="space-y-3">
                            {additionalAccounts.map((acc: any, i: number) => (
                              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                                <div>
                                  <div className="font-bold text-slate-900 text-sm">{acc.bankName}</div>
                                  <div className="font-mono font-medium text-slate-500 text-xs mt-1">•••• {acc.accountNumber?.slice(-4)}</div>
                                </div>
                                <button 
                                  onClick={() => handleSetPrimaryBank(acc, i)}
                                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                                >
                                  Set Primary
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Add New Bank Account Action */}
                      <div className="pt-2">
                        <button 
                          className="w-full py-4 border-2 border-dashed border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 rounded-2xl flex items-center justify-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-bold group"
                          onClick={() => setIsAddingBank(true)}
                        >
                          <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          Add Another Bank Account
                        </button>
                        <p className="text-xs text-center text-slate-400 mt-3 px-4">
                          You can add multiple bank accounts and switch your primary payout method at any time.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-5"
                    >
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Bank Name</label>
                        <input
                          type="text"
                          value={newBank.bankName}
                          onChange={(e) => setNewBank({...newBank, bankName: e.target.value})}
                          placeholder="e.g. State Bank of India"
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-sm font-semibold"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Account Holder Name</label>
                        <input
                          type="text"
                          value={newBank.accountHolderName}
                          onChange={(e) => setNewBank({...newBank, accountHolderName: e.target.value})}
                          placeholder="Name as it appears on bank account"
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-sm font-semibold"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">Account Number</label>
                          <input
                            type="text"
                            value={newBank.accountNumber}
                            onChange={(e) => setNewBank({...newBank, accountNumber: e.target.value.replace(/\D/g, '')})}
                            placeholder="e.g. 1234567890"
                            className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-sm font-mono font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">IFSC Code</label>
                          <input
                            type="text"
                            value={newBank.ifscCode}
                            onChange={(e) => setNewBank({...newBank, ifscCode: e.target.value.toUpperCase()})}
                            placeholder="e.g. HDFC0001234"
                            maxLength={11}
                            className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-sm font-mono font-semibold uppercase"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">UPI ID (Optional)</label>
                        <input
                          type="text"
                          value={newBank.upiId}
                          onChange={(e) => setNewBank({...newBank, upiId: e.target.value})}
                          placeholder="name@upi"
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-sm font-semibold"
                        />
                      </div>

                      <div className="pt-4 flex gap-3">
                        <button
                          onClick={() => setIsAddingBank(false)}
                          className="flex-1 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveNewBank}
                          disabled={isSaving}
                          className="flex-1 py-3 rounded-xl bg-indigo-600 font-bold text-white hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Account"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
