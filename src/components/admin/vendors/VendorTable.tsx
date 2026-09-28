"use client";

import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import type { AdminVendor } from "@/data/adminVendorsData";

const getStatusBadge = (status: AdminVendor["status"]) => {
  switch (status) {
    case "approved":
      return <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 rounded-full border border-emerald-100">Approved</span>;
    case "pending":
      return <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 rounded-full border border-blue-100">Pending</span>;
    case "needs_changes":
      return <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 rounded-full border border-amber-100">Needs Changes</span>;
    case "suspended":
      return <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 rounded-full border border-rose-100">Suspended</span>;
    case "rejected":
      return <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 rounded-full border border-slate-200">Rejected</span>;
    default:
      return null;
  }
};

export function VendorTable({ 
  vendors, 
  selectedVendors, 
  onSelectVendor, 
  onSelectAll, 
  onRowClick,
  onActionClick,
  activeTab
}: { 
  vendors: AdminVendor[];
  selectedVendors: Set<string>;
  onSelectVendor: (id: string) => void;
  onSelectAll: () => void;
  onRowClick: (vendor: AdminVendor) => void;
  onActionClick: (e: React.MouseEvent, vendor: AdminVendor) => void;
  activeTab: string;
}) {
  const allSelected = vendors.length > 0 && selectedVendors.size === vendors.length;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="py-4 px-6 w-12">
                <input 
                  type="checkbox" 
                  checked={allSelected}
                  onChange={onSelectAll}
                  className="w-4 h-4 rounded border-slate-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer"
                />
              </th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Vendor</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Business</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Services</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Location</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              {activeTab === "pending" ? (
                <>
                  <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Progress</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Submitted</th>
                </>
              ) : (
                <>
                  <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Rating</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Bookings</th>
                </>
              )}
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor, i) => (
              <motion.tr 
                key={vendor.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`border-b border-slate-50 transition-colors group cursor-pointer ${
                  selectedVendors.has(vendor.id) ? 'bg-slate-50/80' : 'hover:bg-slate-50/50'
                }`}
                onClick={() => onRowClick(vendor)}
              >
                <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                  <input 
                    type="checkbox" 
                    checked={selectedVendors.has(vendor.id)}
                    onChange={() => onSelectVendor(vendor.id)}
                    className="w-4 h-4 rounded border-slate-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer"
                  />
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-100 flex-shrink-0 flex items-center justify-center font-bold text-slate-400 border border-slate-200">
                      {vendor.avatar ? (
                        <Image src={vendor.avatar} alt={vendor.name} fill className="object-cover" />
                      ) : (
                        vendor.name.charAt(0)
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0A192F]">{vendor.name}</h4>
                      <p className="text-[11px] font-medium text-slate-500">#{vendor.id}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <p className="text-sm font-bold text-slate-700">{vendor.businessName}</p>
                  <p className="text-[11px] text-slate-500 capitalize">{vendor.businessType}</p>
                </td>
                <td className="py-4 px-6">
                  <div className="flex flex-col gap-1">
                    {vendor.services.slice(0, 2).map(svc => (
                      <span key={svc} className="text-xs text-slate-600 truncate max-w-[120px]">{svc}</span>
                    ))}
                    {vendor.services.length > 2 && (
                      <span className="text-[10px] font-bold text-slate-400">+{vendor.services.length - 2} more</span>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6 text-sm font-medium text-slate-700">{vendor.city}</td>
                <td className="py-4 px-6">{getStatusBadge(vendor.status)}</td>
                
                {activeTab === "pending" ? (
                  <>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--color-primary)]" style={{ width: `${vendor.applicationProgress}%` }} />
                        </div>
                        <span className="text-xs font-bold text-slate-500">{vendor.applicationProgress}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-500">{vendor.submittedAt}</td>
                  </>
                ) : (
                  <>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1 text-sm font-bold text-[#0A192F]">
                        {vendor.rating > 0 ? (
                          <><span>{vendor.rating.toFixed(1)}</span><span className="text-amber-400 text-xs">★</span></>
                        ) : (
                          <span className="text-slate-400 font-medium">N/A</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm font-bold text-slate-700 text-right">{vendor.bookingCount}</td>
                  </>
                )}
                
                <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                  {activeTab === "pending" ? (
                    <button 
                      onClick={(e) => { e.stopPropagation(); onRowClick(vendor); }}
                      className="px-3 py-1.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold text-xs rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                    >
                      Review
                    </button>
                  ) : (
                    <button 
                      onClick={(e) => onActionClick(e, vendor)}
                      className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white border border-transparent hover:border-slate-200 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="md:hidden flex flex-col divide-y divide-slate-100">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="p-4 hover:bg-slate-50 transition-colors" onClick={() => onRowClick(vendor)}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={selectedVendors.has(vendor.id)}
                  onChange={(e) => { e.stopPropagation(); onSelectVendor(vendor.id); }}
                  className="w-4 h-4 rounded border-slate-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center font-bold text-slate-400 border border-slate-200">
                  {vendor.avatar ? <Image src={vendor.avatar} alt={vendor.name} fill className="object-cover" /> : vendor.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0A192F]">{vendor.name}</h4>
                  <p className="text-xs font-medium text-slate-500">{vendor.businessName}</p>
                </div>
              </div>
              {getStatusBadge(vendor.status)}
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Location</p>
                <p className="font-medium text-slate-700 truncate">{vendor.city}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Primary</p>
                <p className="font-medium text-slate-700 truncate">{vendor.primaryCategory}</p>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
              {activeTab === "pending" ? (
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--color-primary)]" style={{ width: `${vendor.applicationProgress}%` }} />
                  </div>
                  <span className="text-xs font-bold text-slate-500">{vendor.applicationProgress}%</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-xs font-bold text-[#0A192F]">
                  {vendor.rating > 0 ? (
                    <><span>{vendor.rating.toFixed(1)}</span><span className="text-amber-400">★</span> <span className="text-slate-400 font-medium">({vendor.bookingCount} bkgs)</span></>
                  ) : (
                    <span className="text-slate-400 font-medium">No reviews</span>
                  )}
                </div>
              )}
              <button 
                onClick={(e) => { e.stopPropagation(); onRowClick(vendor); }}
                className="text-xs font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-3 py-1.5 rounded-lg"
              >
                {activeTab === "pending" ? "Review" : "View Details"}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {vendors.length === 0 && (
        <div className="py-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 text-2xl">📋</div>
          <h3 className="font-bold text-[#0A192F] text-lg mb-1">
            {activeTab === "pending" ? "You're all caught up" : "No vendors found"}
          </h3>
          <p className="text-slate-500 text-sm max-w-sm">
            {activeTab === "pending" ? "No vendor applications are currently waiting for review." : "Try changing your search or filters."}
          </p>
        </div>
      )}
    </div>
  );
}
