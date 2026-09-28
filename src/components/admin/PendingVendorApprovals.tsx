"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, CheckCircle, Clock } from "lucide-react";
import type { PendingVendor } from "@/data/adminDashboardData";

export function PendingVendorApprovals({ vendors }: { vendors: PendingVendor[] }) {
  const [selectedVendor, setSelectedVendor] = useState<PendingVendor | null>(null);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full overflow-hidden"
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#0A192F]">Pending Vendor Approvals</h3>
            <p className="text-sm text-slate-500 mt-0.5">Partners waiting for verification</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 font-bold text-sm">
            {vendors.length}
          </div>
        </div>

        <div className="flex-1 divide-y divide-slate-100">
          {vendors.length === 0 ? (
            <div className="p-8 flex flex-col items-center justify-center text-center h-full">
              <CheckCircle className="w-12 h-12 text-emerald-400 mb-3" />
              <p className="font-bold text-[#0A192F] mb-1">No pending applications</p>
              <p className="text-sm text-slate-500">All vendors have been verified.</p>
            </div>
          ) : (
            vendors.map((vendor, i) => (
              <motion.div 
                key={vendor.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + (i * 0.1) }}
                className="p-5 flex items-center gap-4 hover:bg-slate-50 transition-colors group cursor-pointer"
                onClick={() => setSelectedVendor(vendor)}
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-slate-200">
                  <Image src={vendor.avatar} alt={vendor.name} fill className="object-cover" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-[#0A192F] truncate">{vendor.name}</h4>
                  <p className="text-sm font-medium text-slate-600 truncate">{vendor.serviceCategory}</p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Applied {vendor.appliedAgo}</span>
                  </div>
                </div>
                
                <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-[#0A192F] group-hover:bg-[#0A192F] group-hover:text-white group-hover:border-[#0A192F] transition-colors shadow-sm">
                  View
                </button>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      {/* Vendor Drawer */}
      <AnimatePresence>
        {selectedVendor && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
              onClick={() => setSelectedVendor(null)}
            />
            
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
              role="dialog"
              aria-modal="true"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#0A192F]">Application Details</h2>
                <button 
                  onClick={() => setSelectedVendor(null)}
                  className="p-2 -mr-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                <div className="flex flex-col items-center text-center mb-8">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
                    <Image src={selectedVendor.avatar} alt={selectedVendor.name} fill className="object-cover" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A192F] mb-1">{selectedVendor.name}</h3>
                  <span className="px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold text-xs rounded-full uppercase tracking-wider">
                    {selectedVendor.serviceCategory}
                  </span>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Experience</h4>
                    <p className="font-medium text-slate-700">4+ years in {selectedVendor.serviceCategory}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Location</h4>
                    <p className="font-medium text-slate-700">Mumbai, Maharashtra (Willing to travel 10km)</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Application Status</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <p className="font-medium text-slate-700">Awaiting Manual Verification</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-slate-100 flex gap-3">
                <button 
                  onClick={() => setSelectedVendor(null)}
                  className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Later
                </button>
                <button 
                  onClick={() => setSelectedVendor(null)}
                  className="flex-1 px-4 py-3 bg-[var(--color-primary)] rounded-xl font-bold text-white hover:bg-[var(--color-primary-dark)] transition-colors shadow-sm"
                >
                  Review Application
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
