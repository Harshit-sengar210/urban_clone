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
import { adminDashboardData } from "@/data/adminDashboardData";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data to show skeleton state initially
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8 animate-in fade-in duration-500 pb-12">
      <AdminPageHeader />
      
      {/* 4-column Stats */}
      <DashboardStats stats={adminDashboardData.stats} />
      
      {/* 2-column Analytics: Chart (65%) + Revenue (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">
        <div className="lg:col-span-2">
          <BookingActivityChart data={adminDashboardData.bookingActivity} />
        </div>
        <div className="lg:col-span-1">
          <RevenueOverview data={adminDashboardData.revenue} />
        </div>
      </div>
      
      {/* 1-column Full Width */}
      <div className="w-full">
        <RecentBookings bookings={adminDashboardData.recentBookings} />
      </div>
      
      {/* 2-column Operational: Vendor Approvals (50%) + Support Tickets (50%) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
        <div className="lg:col-span-1">
          <PendingVendorApprovals vendors={adminDashboardData.pendingVendors} />
        </div>
        <div className="lg:col-span-1">
          <SupportTickets tickets={adminDashboardData.supportTickets} />
        </div>
      </div>
      
      {/* 2-column Activity: Reviews (65%) + Quick Actions (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">
        <div className="lg:col-span-2">
          <RecentReviews reviews={adminDashboardData.recentReviews} />
        </div>
        <div className="lg:col-span-1">
          <QuickActions actions={adminDashboardData.quickActions} />
        </div>
      </div>
    </div>
  );
}
