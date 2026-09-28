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

import { VendorEarning, VendorPayout } from "@/types/vendor";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { db } from "@/backend/firebase";
import { collection, query, where, getDocs, onSnapshot, orderBy } from "firebase/firestore";

export default function VendorEarningsPage() {
  const [selectedEarning, setSelectedEarning] = useState<VendorEarning | null>(null);
  const [selectedPayout, setSelectedPayout] = useState<VendorPayout | null>(null);
  
  const { user } = useCurrentUser();
  
  const [earningsData, setEarningsData] = useState<any>({
    summary: {
      totalEarnings: 0,
      monthlyEarnings: 0,
      pendingEarnings: 0,
      availableForPayout: 0,
    },
    chartData: [],
    serviceEarnings: [],
    recentEarnings: [],
    payouts: [],
  });
  
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

  useEffect(() => {
    if (!user?.uid) return;
    
    const q = query(
      collection(db, "bookings"),
      where("vendorId", "==", user.uid)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let total = 0;
      let monthly = 0;
      let pending = 0;
      let available = 0;
      
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      
      const serviceMap = new Map<string, number>();
      const rawEarnings: VendorEarning[] = [];
      const weeklyTotals = [0, 0, 0, 0]; // Weeks 1-4
      
      snapshot.forEach((docSnap) => {
        const b = docSnap.data();
        const dateVal = b.date?.toDate ? b.date.toDate() : b.date ? new Date(b.date) : new Date();
        const gross = b.amountCollected || b.amount || b.price || 0;
        const net = b.estimatedEarnings || Math.floor(gross * 0.8);
        
        if (b.status === "completed") {
          total += net;
          available += net;
          
          if (dateVal.getMonth() === currentMonth && dateVal.getFullYear() === currentYear) {
            monthly += net;
            
            // basic week calculation for this month
            const day = dateVal.getDate();
            const weekIdx = Math.min(3, Math.floor((day - 1) / 7));
            weeklyTotals[weekIdx] += net;
          }
          
          serviceMap.set(b.serviceName || "Other", (serviceMap.get(b.serviceName || "Other") || 0) + net);
          
          rawEarnings.push({
            id: docSnap.id,
            bookingId: docSnap.id,
            serviceName: b.serviceName || "Service",
            customerName: b.userName || "Customer",
            date: dateVal.toISOString().split('T')[0],
            grossAmount: gross,
            partnerEarnings: net,
            status: "available",
            paymentMethod: b.paymentMethod
          });
        } else if (["pending", "confirmed", "assigned", "on_the_way", "in_progress"].includes(b.status)) {
          pending += net;
        }
      });
      
      rawEarnings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      const chartData = [
        { label: "Week 1", amount: weeklyTotals[0] },
        { label: "Week 2", amount: weeklyTotals[1] },
        { label: "Week 3", amount: weeklyTotals[2] },
        { label: "Week 4", amount: weeklyTotals[3] }
      ];
      
      const serviceColors = ["bg-indigo-500", "bg-blue-500", "bg-emerald-500", "bg-amber-500", "bg-slate-400"];
      let cIdx = 0;
      const serviceEarnings = Array.from(serviceMap.entries()).map(([service, amount]) => {
        const percentage = total > 0 ? Math.round((amount / total) * 100) : 0;
        const color = serviceColors[cIdx % serviceColors.length];
        cIdx++;
        return { service, amount, percentage, color };
      }).sort((a, b) => b.amount - a.amount);
      
      setEarningsData({
        summary: {
          totalEarnings: total,
          monthlyEarnings: monthly,
          pendingEarnings: pending,
          availableForPayout: available,
        },
        chartData,
        serviceEarnings,
        recentEarnings: rawEarnings.slice(0, 10),
        payouts: [] // No real payouts system yet
      });
    });
    
    return () => unsubscribe();
  }, [user?.uid]);

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
        
        <EarningsSummary summary={earningsData.summary} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <EarningsOverview data={earningsData.chartData} />
          </div>
          <div className="lg:col-span-1">
            <EarningsByService data={earningsData.serviceEarnings} />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <RecentEarnings 
            earnings={earningsData.recentEarnings}
            onViewEarning={(e) => setSelectedEarning(e)}
          />
          <PayoutHistory 
            payouts={earningsData.payouts}
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
