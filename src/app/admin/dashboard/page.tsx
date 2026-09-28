"use client";

import { useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { BookingActivityChart } from "@/components/admin/BookingActivityChart";
import { RevenueOverview } from "@/components/admin/RevenueOverview";
import { RecentBookings } from "@/components/admin/RecentBookings";
import { PendingVendorApprovals } from "@/components/admin/PendingVendorApprovals";
import { SupportTickets } from "@/components/admin/SupportTickets";
import { RecentReviews } from "@/components/admin/RecentReviews";
import { QuickActions } from "@/components/admin/QuickActions";
import { DashboardSkeleton } from "@/components/admin/DashboardSkeleton";
import { adminDashboardData } from "@/data/adminDashboardData"; // Keep for fallback and types
import { db } from "@/backend/firebase";
import { collection, onSnapshot, query, where, orderBy, limit, getDocs } from "firebase/firestore";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(adminDashboardData);

  useEffect(() => {
    // 1. Fetch Users & Vendors counts (Simple snapshot for demo, in prod use getCountFromServer)
    const unsubUsers = onSnapshot(collection(db, "users"), (snap) => {
      let totalUsers = 0;
      let activeVendors = 0;
      snap.forEach(doc => {
        const u = doc.data();
        totalUsers++;
        if (u.role === "vendor") activeVendors++;
      });
      
      setData(prev => ({
        ...prev,
        stats: prev.stats.map(s => {
          if (s.label === "Total Users") return { ...s, value: totalUsers.toString() };
          if (s.label === "Active Vendors") return { ...s, value: activeVendors.toString() };
          return s;
        })
      }));
    });

    // 2. Fetch Bookings
    const unsubBookings = onSnapshot(collection(db, "bookings"), (snap) => {
      let todaysBookings = 0;
      let totalRevenue = 0;
      
      let completedRevenue = 0;
      let pendingRevenue = 0;
      let refundRevenue = 0; // if we tracked refunds
      
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      // Chart data (Mon-Sun)
      const dayCounts = [0, 0, 0, 0, 0, 0, 0]; // 0=Mon, 6=Sun
      
      const recent: any[] = [];

      snap.forEach(docSnap => {
        const b = docSnap.data();
        const dateVal = b.createdAt?.toDate ? b.createdAt.toDate() : new Date();
        
        // Count today's bookings
        const bDate = new Date(dateVal.getFullYear(), dateVal.getMonth(), dateVal.getDate());
        if (bDate.getTime() === today.getTime()) {
          todaysBookings++;
        }

        // Calculate Revenue (Assuming 20% platform fee as admin revenue, or we can just show total transaction volume)
        // Let's show total transaction volume
        const amount = b.amountCollected || b.variant?.price || b.amount || b.price || 0;
        
        if (b.status === "completed") {
          totalRevenue += amount;
          completedRevenue += amount;
        } else if (b.status === "cancelled" || b.status === "rejected") {
          refundRevenue += amount;
        } else {
          pendingRevenue += amount;
        }
        
        // Activity Chart
        // getDay(): 0=Sun, 1=Mon, ..., 6=Sat
        // We want Mon=0, ..., Sun=6
        let dayIdx = dateVal.getDay() - 1;
        if (dayIdx < 0) dayIdx = 6;
        dayCounts[dayIdx]++;
        
        recent.push({
          id: docSnap.id.substring(0, 8),
          customer: b.userName || "Customer",
          service: b.serviceName || b.service || "Service",
          vendor: b.professional || "Unassigned",
          date: dateVal.toLocaleDateString(),
          amount: "₹" + amount,
          status: b.status === "completed" ? "Completed" : b.status === "cancelled" ? "Cancelled" : b.status === "pending" ? "Pending" : "Confirmed",
          _time: dateVal.getTime()
        });
      });

      recent.sort((a, b) => b._time - a._time);

      const formatLakhs = (val: number) => {
        if (val > 100000) return "₹" + (val / 100000).toFixed(2) + "L";
        return "₹" + val.toLocaleString();
      };

      setData(prev => {
        const newStats = [...prev.stats];
        const statBooking = newStats.find(s => s.label === "Today's Bookings");
        if (statBooking) statBooking.value = todaysBookings.toString();
        
        const statRev = newStats.find(s => s.label === "Total Revenue");
        if (statRev) statRev.value = formatLakhs(totalRevenue);

        return {
          ...prev,
          stats: newStats,
          recentBookings: recent.slice(0, 5),
          bookingActivity: [
            { day: "Mon", bookings: dayCounts[0] },
            { day: "Tue", bookings: dayCounts[1] },
            { day: "Wed", bookings: dayCounts[2] },
            { day: "Thu", bookings: dayCounts[3] },
            { day: "Fri", bookings: dayCounts[4] },
            { day: "Sat", bookings: dayCounts[5] },
            { day: "Sun", bookings: dayCounts[6] },
          ],
          revenue: {
            ...prev.revenue,
            thisMonth: formatLakhs(totalRevenue),
            breakdown: {
              completedServices: formatLakhs(completedRevenue),
              pendingPayments: formatLakhs(pendingRevenue),
              refunds: formatLakhs(refundRevenue)
            }
          }
        };
      });
    });

    // 3. Fetch Pending Vendors
    const qVendors = query(collection(db, "vendorApplications"), where("status", "==", "pending"));
    const unsubVendors = onSnapshot(qVendors, (snap) => {
      const pending = snap.docs.map(docSnap => {
        const d = docSnap.data();
        return {
          id: docSnap.id,
          name: d.personal?.fullName || d.personal?.legalName || "Unknown",
          serviceCategory: d.business?.primaryCategory || "N/A",
          appliedAgo: new Date(d.createdAt || Date.now()).toLocaleDateString(),
          avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80"
        };
      });
      setData(prev => ({ ...prev, pendingVendors: pending }));
    });

    // 4. Fetch Reviews
    const unsubReviews = onSnapshot(collection(db, "reviews"), (snap) => {
      const reviews = snap.docs.map(docSnap => {
        const d = docSnap.data();
        return {
          id: docSnap.id,
          customer: d.userName || "Customer",
          service: d.serviceName || "Service",
          rating: d.rating || 5,
          text: d.comment || "",
          timeAgo: new Date(d.createdAt?.toDate ? d.createdAt.toDate() : Date.now()).toLocaleDateString(),
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
          _time: d.createdAt?.toDate ? d.createdAt.toDate().getTime() : 0
        };
      }).sort((a, b) => b._time - a._time);
      
      setData(prev => ({ ...prev, recentReviews: reviews.slice(0, 5) }));
    });

    const timer = setTimeout(() => setLoading(false), 800);
    return () => {
      clearTimeout(timer);
      unsubUsers();
      unsubBookings();
      unsubVendors();
      unsubReviews();
    };
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8 animate-in fade-in duration-500 pb-12">
      <AdminPageHeader />
      
      {/* 4-column Stats */}
      <DashboardStats stats={data.stats} />
      
      {/* 2-column Analytics: Chart (65%) + Revenue (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">
        <div className="lg:col-span-2">
          <BookingActivityChart data={data.bookingActivity} />
        </div>
        <div className="lg:col-span-1">
          <RevenueOverview data={data.revenue} />
        </div>
      </div>
      
      {/* 1-column Full Width */}
      <div className="w-full">
        <RecentBookings bookings={data.recentBookings} />
      </div>
      
      {/* 2-column Operational: Vendor Approvals (50%) + Support Tickets (50%) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
        <div className="lg:col-span-1">
          <PendingVendorApprovals vendors={data.pendingVendors} />
        </div>
        <div className="lg:col-span-1">
          <SupportTickets tickets={data.supportTickets} />
        </div>
      </div>
      
      {/* 2-column Activity: Reviews (65%) + Quick Actions (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">
        <div className="lg:col-span-2">
          <RecentReviews reviews={data.recentReviews} />
        </div>
        <div className="lg:col-span-1">
          <QuickActions actions={data.quickActions} />
        </div>
      </div>
    </div>
  );
}
