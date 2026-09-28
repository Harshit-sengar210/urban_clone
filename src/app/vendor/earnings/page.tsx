"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import { VendorLayout } from "@/components/vendor-dashboard/VendorLayout";
import { EarningsHeader } from "@/components/vendor-earnings/EarningsHeader";
import { EarningsSummary } from "@/components/vendor-earnings/EarningsSummary";
import { EarningsOverview } from "@/components/vendor-earnings/EarningsOverview";
import { EarningsByService } from "@/components/vendor-earnings/EarningsByService";
import { RecentEarnings } from "@/components/vendor-earnings/RecentEarnings";
import { PayoutHistory } from "@/components/vendor-earnings/PayoutHistory";
import { EarningDetailsDrawer } from "@/components/vendor-earnings/EarningDetailsDrawer";
import { PayoutDetailsDrawer } from "@/components/vendor-earnings/PayoutDetailsDrawer";

import { 
  mockVendorEarnings, 
  mockVendorPayouts, 
  mockEarningsSummary, 
  mockChartData, 
  mockServiceEarnings 
} from "@/data/mockVendorData";

import { VendorEarning, VendorPayout } from "@/types/vendor";

export default function VendorEarningsPage() {
  const [selectedEarning, setSelectedEarning] = useState<VendorEarning | null>(null);
  const [selectedPayout, setSelectedPayout] = useState<VendorPayout | null>(null);
  
  // Global Toast
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setToastMessage(customEvent.detail);
      setTimeout(() => setToastMessage(""), 3000);
    };

    window.addEventListener("show-toast", handleToast);
    return () => window.removeEventListener("show-toast", handleToast);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleManageSettings = () => {
    showToast("Payout settings opened in demo mode.");
  };

  return (
    <VendorLayout>
      <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-6">
        
        <EarningsHeader />
        
        <EarningsSummary summary={mockEarningsSummary} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <EarningsOverview data={mockChartData} />
          </div>
          <div className="lg:col-span-1">
            <EarningsByService data={mockServiceEarnings} />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <RecentEarnings 
            earnings={mockVendorEarnings}
            onViewEarning={(e) => setSelectedEarning(e)}
          />
          <PayoutHistory 
            payouts={mockVendorPayouts}
            onViewPayout={(p) => setSelectedPayout(p)}
            onManageSettings={handleManageSettings}
          />
        </div>

      </div>

      {/* Drawers */}
      <EarningDetailsDrawer 
        earning={selectedEarning}
        onClose={() => setSelectedEarning(null)}
      />

      <PayoutDetailsDrawer 
        payout={selectedPayout}
        onClose={() => setSelectedPayout(null)}
      />

      {/* Global Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 20, scale: 0.9, x: "-50%" }}
            className="fixed bottom-6 left-1/2 z-[100] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl font-medium text-sm flex items-center gap-2 border border-slate-700 whitespace-nowrap"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </VendorLayout>
  );
}
