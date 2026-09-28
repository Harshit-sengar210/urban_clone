"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Tag, Calendar, Users, Edit3, Trash2, ArrowUpRight, Copy } from "lucide-react";
import type { AdminOffer } from "@/data/adminOffersData";

export function OfferDetailsDrawer({
  offer,
  onClose,
  onEdit,
  onDelete
}: {
  offer: AdminOffer | null;
  onClose: () => void;
  onEdit: (offer: AdminOffer) => void;
  onDelete: (offerId: string) => void;
}) {
  if (!offer) return null;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'scheduled': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'draft': return 'bg-slate-50 text-slate-700 border-slate-200';
      default: return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  const usagePercentage = Math.min(100, (offer.usageCount / offer.eligibility.totalUsageLimit) * 100);

  return (
    <AnimatePresence>
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
          className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-lg font-bold text-[#0A192F]">Offer Details</h2>
                <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border ${getStatusColor(offer.status)}`}>
                  {offer.status}
                </span>
              </div>
              <p className="text-xs text-slate-500">ID: {offer.id}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Main Info */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-[#0A192F]">{offer.name}</h3>
                  <button className="p-1.5 text-slate-400 hover:text-slate-700 bg-white border border-slate-200 rounded-md shadow-sm transition-colors group">
                    <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-bold tracking-wider text-slate-800 font-mono shadow-sm">
                    <Tag className="w-4 h-4 text-[var(--color-primary)]" />
                    {offer.code}
                  </div>
                  <p className="text-sm font-bold text-emerald-600">
                    {offer.discountType === "percentage" ? `${offer.discountValue}% OFF` : `₹${offer.discountValue} OFF`}
                    {offer.maximumDiscount && <span className="text-slate-500 text-xs font-medium ml-1">(Up to ₹{offer.maximumDiscount})</span>}
                  </p>
                </div>
                
                <p className="text-sm text-slate-600 leading-relaxed">{offer.description}</p>
              </div>
            </div>

            {/* Stats & Usage */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-slate-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-slate-400" />
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Usage Stats</h4>
                </div>
                <div className="mb-2 flex items-end justify-between">
                  <span className="text-2xl font-bold text-[#0A192F]">{offer.usageCount}</span>
                  <span className="text-sm text-slate-500 mb-1">/ {offer.eligibility.totalUsageLimit} total</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${usagePercentage > 90 ? 'bg-rose-500' : 'bg-[var(--color-primary)]'}`}
                    style={{ width: `${usagePercentage}%` }} 
                  />
                </div>
              </div>
              
              <div className="border border-slate-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Validity Period</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Starts</span>
                    <span className="font-medium text-slate-800">{new Date(offer.validity.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Ends</span>
                    <span className="font-medium text-slate-800">{new Date(offer.validity.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Target Audience (If any) */}
            <div className="border border-slate-100 rounded-xl p-5">
              <h4 className="text-sm font-bold text-[#0A192F] mb-4">Eligibility Rules</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  Limit 1 use per customer: {offer.eligibility.maximumUsesPerCustomer === 1 ? "Yes" : "No"}
                </li>
                {offer.audience !== 'everyone' && (
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                    Target Audience: <span className="font-bold text-slate-800 capitalize">{offer.audience} users</span>
                  </li>
                )}
                {offer.eligibility.minimumOrderValue > 0 && (
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Minimum Order Value: <span className="font-bold text-slate-800">₹{offer.eligibility.minimumOrderValue}</span>
                  </li>
                )}
              </ul>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-4 md:p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between sticky bottom-0">
            <button 
              onClick={() => onDelete(offer.id)}
              className="px-4 py-2.5 bg-white border border-rose-200 text-rose-600 rounded-lg text-sm font-bold hover:bg-rose-50 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Offer</span>
            </button>
            <button 
              onClick={() => onEdit(offer)}
              className="px-6 py-2.5 bg-[var(--color-primary)] text-white rounded-lg text-sm font-bold hover:bg-[var(--color-primary-dark)] shadow-sm transition-colors flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Offer</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
