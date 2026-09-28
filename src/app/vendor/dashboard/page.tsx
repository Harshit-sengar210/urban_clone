"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { doc, onSnapshot, collection, query, where, orderBy, limit } from "firebase/firestore";

import { VendorLayout } from "@/components/vendor-dashboard/VendorLayout";
import { DashboardStats } from "@/components/vendor-dashboard/DashboardStats";
import { LiveBookingPanel } from "@/components/vendor-dashboard/LiveBookingPanel";
import { UpcomingBookings } from "@/components/vendor-dashboard/UpcomingBookings";
import { RecentBookings } from "@/components/vendor-dashboard/RecentBookings";
import { EarningsChart } from "@/components/vendor-dashboard/EarningsChart";

import { BookingRequest } from "@/types/vendor";
import { db } from "@/backend/firebase";
import { useCurrentUser } from "@/hooks/useCurrentUser";

// Empty state for a new vendor
const emptyDashboardData = {
  stats: {
    totalBookings: 0,
    totalEarnings: 0,
    averageRating: 0,
    pendingBookings: 0,
    bookingsChange: 0,
  },
  liveBookingRequests: [],
  upcomingBookings: [],
  recentBookings: [],
  earnings: {
    total: 0,
    percentageChange: 0,
    weeklyData: [
      { day: "Mon", amount: 0 },
      { day: "Tue", amount: 0 },
      { day: "Wed", amount: 0 },
      { day: "Thu", amount: 0 },
      { day: "Fri", amount: 0 },
      { day: "Sat", amount: 0 },
      { day: "Sun", amount: 0 },
    ],
  }
};

export default function VendorDashboard() {
  const { user } = useCurrentUser();
  const [data, setData] = useState<any>(emptyDashboardData);
  const [vendorName, setVendorName] = useState("Partner");
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    // Fetch real vendor name from vendorApplications
    const unsubVendor = onSnapshot(doc(db, "vendorApplications", user.uid), (docSnap) => {
      if (docSnap.exists()) {
        const d = docSnap.data();
        const name = d.personal?.fullName || d.personal?.legalName || user.name || "Partner";
        setVendorName(name.split(" ")[0]);
      }
      setLoading(false);
    });

    // Fetch live booking requests (status: pending)
    // We are querying all pending bookings for now as a simple matching system
    const qPending = query(
      collection(db, "bookings"),
      where("status", "==", "pending"),
      orderBy("createdAt", "desc"),
      limit(10)
    );

    const unsubPending = onSnapshot(qPending, (snap) => {
      const requests = snap.docs.map(docSnap => {
        const d = docSnap.data();
        const dateVal = d.date?.toDate ? d.date.toDate() : d.date ? new Date(d.date) : new Date();
        const dateStr = dateVal instanceof Date ? dateVal.toISOString() : dateVal;
        
        let loc = "Unknown Location";
        if (typeof d.address === 'object' && d.address !== null) {
          loc = d.address.fullAddress;
        } else if (typeof d.address === 'string') {
          loc = d.address;
        }

        return {
          id: docSnap.id,
          customerName: d.userName || "Customer", // Ideally would fetch user profile
          service: d.serviceName || d.service || "Service",
          location: loc,
          date: dateStr,
          time: d.time || "Not set",
          estimatedEarnings: d.variant?.price ? Math.floor(d.variant.price * 0.8) : (d.amount || d.price || 0), // Assuming vendor takes 80%
          status: "pending",
          distance: "2.5 km away" // Mock distance for now
        } as BookingRequest;
      });

      setData((prev: any) => ({
        ...prev,
        liveBookingRequests: requests,
        stats: {
          ...prev.stats,
          pendingBookings: requests.length
        }
      }));
    });

    const qVendorBookings = query(
      collection(db, "bookings"),
      where("vendorId", "==", user.uid)
    );

    const unsubVendorBookings = onSnapshot(qVendorBookings, (snap) => {
      let upcoming: any[] = [];
      let recent: any[] = [];
      let totalEarnings = 0;
      let totalBookings = snap.docs.length;

      snap.docs.forEach(docSnap => {
        const d = docSnap.data();
        const dateVal = d.date?.toDate ? d.date.toDate() : d.date ? new Date(d.date) : new Date();
        const dateStr = dateVal instanceof Date ? dateVal.toISOString() : dateVal;
        
        let loc = "Unknown Location";
        if (typeof d.address === 'object' && d.address !== null) {
          loc = d.address.fullAddress;
        } else if (typeof d.address === 'string') {
          loc = d.address;
        }

        const bData = {
          id: docSnap.id,
          customerName: d.userName || "Customer",
          service: d.serviceName || d.service || "Service",
          location: loc,
          date: dateStr,
          time: d.time || "Not set",
          estimatedEarnings: d.amountCollected || d.variant?.price ? Math.floor(d.variant.price * 0.8) : (d.amount || d.price || 0),
          status: d.status,
          distance: "2.5 km away",
          paymentMethod: d.paymentMethod
        };

        if (d.status === "assigned" || d.status === "confirmed" || d.status === "on_the_way" || d.status === "in_progress") {
          upcoming.push(bData);
        } else if (d.status === "completed") {
          recent.push(bData);
          totalEarnings += bData.estimatedEarnings;
        }
      });

      // Sort
      upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      recent.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      setData((prev: any) => ({
        ...prev,
        upcomingBookings: upcoming.slice(0, 5),
        recentBookings: recent.slice(0, 5),
        stats: {
          ...prev.stats,
          totalBookings: totalBookings,
          totalEarnings: totalEarnings
        }
      }));
    });

    return () => {
      unsubVendor();
      unsubPending();
      unsubVendorBookings();
    };
  }, [user?.uid]);

  const handleAcceptBooking = async (request: BookingRequest) => {
    // Show toast
    setToastMessage(`Accepted booking for ${request.customerName}`);
    setTimeout(() => setToastMessage(""), 3000);

    // Update in Firestore
    try {
      await import("firebase/firestore").then(({ updateDoc, doc }) => {
        return updateDoc(doc(db, "bookings", request.id), {
          status: "assigned",
          vendorId: user?.uid,
          professional: vendorName
        });
      });
    } catch (e) {
      console.error("Failed to accept booking", e);
    }

    // We rely on the snapshot listeners for updates.
  };

  const handleRejectBooking = async (id: string, reason: string) => {
    // Show toast
    setToastMessage("Booking request rejected");
    setTimeout(() => setToastMessage(""), 3000);

    // Note: Usually we wouldn't update the booking status to rejected just because ONE vendor rejected it,
    // we would keep it pending and just hide it for this vendor.
    // For simplicity, we just filter it out locally.
    setData((prev: any) => ({
      ...prev,
      liveBookingRequests: prev.liveBookingRequests.filter((r: BookingRequest) => r.id !== id),
      stats: {
        ...prev.stats,
        pendingBookings: Math.max(0, prev.stats.pendingBookings - 1)
      }
    }));
  };

  if (loading) {
    return (
      <VendorLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
        </div>
      </VendorLayout>
    );
  }

  return (
    <VendorLayout>
      <div className="p-4 md:p-8 max-w-[1600px] mx-auto">
        
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Mobile Only: Live Booking Requests appear at top on mobile */}
          <div className="xl:hidden col-span-1">
            <LiveBookingPanel 
              initialRequests={data.liveBookingRequests}
              onAccept={handleAcceptBooking}
              onReject={handleRejectBooking}
            />
          </div>

          {/* Left/Center Content Area */}
          <div className="xl:col-span-8 2xl:col-span-9 space-y-8">
            
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-end"
            >
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
                  Good morning, {vendorName} 👋
                </h1>
                <p className="text-slate-500 font-medium">
                  Here's what's happening with your partner account today.
                </p>
              </div>
              <div className="hidden sm:block text-right">
                <div className="text-sm font-bold text-slate-700">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <DashboardStats stats={data.stats} />

            {/* Main Content Grid (Recent Bookings + Earnings) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="h-full"
              >
                <EarningsChart data={data.earnings} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="h-full"
              >
                <RecentBookings bookings={data.recentBookings} />
              </motion.div>
            </div>

            {/* Support / Growth Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-indigo-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
              
              <div className="relative z-10 max-w-2xl">
                <h3 className="text-xl font-bold mb-2">Need More Bookings?</h3>
                <p className="text-indigo-200 text-sm leading-relaxed mb-6">
                  Keep your profile updated, respond quickly to requests, and maintain a high rating to get more work in your service area.
                </p>
                <button className="bg-white text-indigo-900 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors">
                  Optimize My Profile &rarr;
                </button>
              </div>
            </motion.div>

          </div>

          {/* Right Sidebar Area */}
          <div className="xl:col-span-4 2xl:col-span-3 space-y-8">
            
            {/* Desktop Only: Live Booking Requests */}
            <div className="hidden xl:block">
              <LiveBookingPanel 
                initialRequests={data.liveBookingRequests}
                onAccept={handleAcceptBooking}
                onReject={handleRejectBooking}
              />
            </div>

            {/* Upcoming Bookings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <UpcomingBookings bookings={data.upcomingBookings} />
            </motion.div>

          </div>
        </div>
      </div>

      {/* Global Dashboard Toast */}
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
