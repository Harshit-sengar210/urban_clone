"use client";

import { motion } from "framer-motion";

export type VendorTabFilter = "all" | "pending" | "approved" | "needs_changes" | "suspended" | "rejected";

export function VendorStatusTabs({ 
  activeTab, 
  setActiveTab,
  counts
}: { 
  activeTab: VendorTabFilter; 
  setActiveTab: (tab: VendorTabFilter) => void;
  counts: Record<VendorTabFilter, number>;
}) {
  const tabs: { id: VendorTabFilter; label: string; count: number }[] = [
    { id: "all", label: "All Vendors", count: counts.all || 0 },
    { id: "pending", label: "Pending Approval", count: counts.pending || 0 },
    { id: "approved", label: "Approved", count: counts.approved || 0 },
    { id: "needs_changes", label: "Needs Changes", count: counts.needs_changes || 0 },
    { id: "suspended", label: "Suspended", count: counts.suspended || 0 },
    { id: "rejected", label: "Rejected", count: counts.rejected || 0 },
  ];

  return (
    <div className="flex overflow-x-auto hide-scrollbar border-b border-slate-200 mb-6 relative">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-2 px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors ${
              isActive ? "text-[var(--color-primary)]" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <span>{tab.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              isActive ? 'bg-[var(--color-primary)]/10' : 'bg-slate-100'
            }`}>
              {tab.count}
            </span>
            
            {isActive && (
              <motion.div 
                layoutId="vendorTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
