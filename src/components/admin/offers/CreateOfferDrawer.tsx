"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Tag, Percent, IndianRupee, Calendar as CalendarIcon, Users } from "lucide-react";
import { useState, useEffect } from "react";
import type { AdminOffer } from "@/data/adminOffersData";

export function CreateOfferDrawer({
  isOpen,
  onClose,
  onSave,
  offerToEdit
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  offerToEdit?: AdminOffer | null;
}) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    discountType: "percentage",
    discountValue: "",
    maximumDiscount: "",
    startDate: "",
    endDate: "",
    totalUsageLimit: "",
  });

  useEffect(() => {
    if (offerToEdit) {
      setFormData({
        name: offerToEdit.name,
        code: offerToEdit.code,
        description: offerToEdit.description,
        discountType: offerToEdit.discountType,
        discountValue: String(offerToEdit.discountValue),
        maximumDiscount: offerToEdit.maximumDiscount ? String(offerToEdit.maximumDiscount) : "",
        startDate: offerToEdit.validity.startDate.split('T')[0],
        endDate: offerToEdit.validity.endDate.split('T')[0],
        totalUsageLimit: String(offerToEdit.eligibility.totalUsageLimit),
      });
    } else {
      setFormData({
        name: "", code: "", description: "", discountType: "percentage", discountValue: "", maximumDiscount: "", startDate: "", endDate: "", totalUsageLimit: ""
      });
    }
  }, [offerToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      name: "", code: "", description: "", discountType: "percentage", discountValue: "", maximumDiscount: "", startDate: "", endDate: "", totalUsageLimit: ""
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[150] flex justify-end"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
              <div>
                <h2 className="text-lg font-bold text-[#0A192F]">{offerToEdit ? "Edit Offer" : "Create New Offer"}</h2>
                <p className="text-xs text-slate-500 mt-1">Configure promotional discount codes</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <form id="create-offer-form" onSubmit={handleSubmit} className="space-y-6">
                
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-bold text-[#0A192F] mb-1.5 block">Offer Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                      placeholder="e.g. Festive Cleaning Special"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-[#0A192F] mb-1.5 block">Coupon Code</label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        name="code"
                        required
                        value={formData.code}
                        onChange={handleChange}
                        className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm uppercase font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                        placeholder="FESTIVE50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-[#0A192F] mb-1.5 block">Description</label>
                    <textarea 
                      name="description"
                      required
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all resize-none"
                      placeholder="Brief details about the offer..."
                    />
                  </div>
                </div>

                <div className="h-px bg-slate-100 my-6" />

                {/* Discount Settings */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#0A192F]">Discount Settings</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-600 mb-1.5 block">Discount Type</label>
                      <select 
                        name="discountType"
                        value={formData.discountType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                      >
                        <option value="percentage">Percentage (%)</option>
                        <option value="flat">Flat Amount (₹)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-600 mb-1.5 block">Discount Value</label>
                      <div className="relative">
                        {formData.discountType === 'percentage' ? (
                          <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        ) : (
                          <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        )}
                        <input 
                          type="number" 
                          name="discountValue"
                          required
                          value={formData.discountValue}
                          onChange={handleChange}
                          className="w-full pl-8 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                          placeholder={formData.discountType === 'percentage' ? "e.g. 20" : "e.g. 500"}
                        />
                      </div>
                    </div>
                  </div>

                  {formData.discountType === 'percentage' && (
                    <div>
                      <label className="text-xs font-bold text-slate-600 mb-1.5 block">Maximum Discount Amount (₹)</label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input 
                          type="number" 
                          name="maximumDiscount"
                          value={formData.maximumDiscount}
                          onChange={handleChange}
                          className="w-full pl-8 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                          placeholder="e.g. 1000"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="h-px bg-slate-100 my-6" />

                {/* Rules */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#0A192F]">Validity & Usage</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-600 mb-1.5 block">Start Date</label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input 
                          type="date" 
                          name="startDate"
                          required
                          value={formData.startDate}
                          onChange={handleChange}
                          className="w-full pl-8 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] text-slate-700"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-600 mb-1.5 block">End Date</label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input 
                          type="date" 
                          name="endDate"
                          required
                          value={formData.endDate}
                          onChange={handleChange}
                          className="w-full pl-8 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] text-slate-700"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 mb-1.5 block">Total Usage Limit</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <input 
                        type="number" 
                        name="totalUsageLimit"
                        required
                        value={formData.totalUsageLimit}
                        onChange={handleChange}
                        className="w-full pl-8 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                        placeholder="e.g. 500 redemptions"
                      />
                    </div>
                  </div>
                </div>

              </form>
            </div>

            {/* Footer */}
            <div className="p-4 md:p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3 sticky bottom-0">
              <button 
                type="button"
                onClick={onClose} 
                className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                form="create-offer-form"
                className="px-6 py-2.5 bg-[var(--color-primary)] text-white rounded-lg text-sm font-bold hover:bg-[var(--color-primary-dark)] shadow-sm transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Offer</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
