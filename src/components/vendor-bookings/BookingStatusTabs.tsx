"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type BookingTab = "all" | "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";

interface BookingStatusTabsProps {
  activeTab: BookingTab;
  setActiveTab: (tab: BookingTab) => void;
  counts: Record<BookingTab, number>;
}

export function BookingStatusTabs({ activeTab, setActiveTab, counts }: BookingStatusTabsProps) {
  const tabs: { id: BookingTab; label: string }[] = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "confirmed", label: "Confirmed" },
    { id: "in_progress", label: "In Progress" },
    { id: "completed", label: "Completed" },
    { id: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="w-full border-b border-slate-200 overflow-x-auto no-scrollbar">
      <div className="flex w-max min-w-full">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative px-6 py-4 text-sm font-bold whitespace-nowrap transition-colors",
                isActive ? "text-indigo-600" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <div className="flex items-center gap-2">
                {tab.label}
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-[10px]",
                  isActive ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-500"
                )}>
                  {counts[tab.id]}
                </span>
              </div>
              
              {isActive && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
