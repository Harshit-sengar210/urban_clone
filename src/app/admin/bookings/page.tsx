"use client";

import { useState, useMemo } from "react";
import { Plus, Download, MoreHorizontal, Calendar, Search, Filter, ArrowUpDown } from "lucide-react";
import { motion } from "framer-motion";
import { adminBookingsData, type AdminBooking, type BookingStatus } from "@/data/adminBookingsData";
import { BookingDetailsDrawer } from "@/components/admin/bookings/BookingDetailsDrawer";
import { useEffect } from "react";
import { db } from "@/backend/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  accepted: "bg-blue-50 text-blue-700 border-blue-200",
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  service_started: "bg-indigo-50 text-indigo-700 border-indigo-200",
  completed: "bg-teal-50 text-teal-700 border-teal-200",
  cancelled: "bg-slate-100 text-slate-700 border-slate-300",
  rejected: "bg-rose-50 text-rose-700 border-rose-200",
  no_show: "bg-orange-50 text-orange-700 border-orange-200",
};

export default function AdminBookingsPage() {
  const [activeTab, setActiveTab] = useState<BookingStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(null);
  
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [summary, setSummary] = useState(adminBookingsData.summary);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "bookings"), (snap) => {
      let total = 0, today = 0, active = 0, completed = 0, cancelled = 0;
      let value = 0;

      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

      const loadedBookings = snap.docs.map(doc => {
        const d = doc.data();
        total++;
        
        const dateVal = d.createdAt?.toDate ? d.createdAt.toDate() : new Date();
        const bDate = new Date(dateVal.getFullYear(), dateVal.getMonth(), dateVal.getDate());
        if (bDate.getTime() === startOfToday) today++;

        if (d.status === "completed") completed++;
        else if (d.status === "cancelled" || d.status === "rejected") cancelled++;
        else active++;

        const amt = d.amountCollected || d.variant?.price || d.amount || d.price || 0;
        if (d.status === "completed") value += amt;

        return {
          id: doc.id.substring(0, 10).toUpperCase(),
          customer: {
            id: d.userId || d.customerId || "Unknown",
            name: d.userName || "Customer",
            email: "N/A",
            phone: d.address?.phone || d.phone || "N/A"
          },
          vendor: {
            id: d.vendorId || "Unknown",
            name: d.professional || "Unassigned",
            rating: 5,
            verificationStatus: "verified" as const
          },
          service: {
            categoryId: "N/A",
            serviceId: d.serviceSlug || "N/A",
            packageId: "N/A",
            categoryName: d.category || "General",
            serviceName: d.serviceName || d.service || "Service",
            packageName: d.variant?.name || "Standard",
            description: "",
            duration: 60,
            includedItems: []
          },
          bookingDate: dateVal.toLocaleDateString(),
          bookingTime: d.time || "Not set",
          duration: 60,
          address: typeof d.address === "object" ? d.address.fullAddress : d.address || "Unknown",
          status: (d.status || "pending") as BookingStatus,
          paymentStatus: d.paymentStatus || "pending",
          paymentMethod: d.paymentMethod || "Online",
          pricing: {
            basePrice: amt,
            addOns: 0,
            discount: 0,
            tax: 0,
            platformFee: 0,
            total: amt,
            vendorEarning: Math.floor(amt * 0.8)
          },
          timeline: [],
          createdAt: dateVal.toISOString(),
          updatedAt: new Date().toISOString(),
          _time: dateVal.getTime()
        } as AdminBooking & { _time: number };
      });

      loadedBookings.sort((a, b) => b._time - a._time);

      setBookings(loadedBookings);
      setSummary({
        total, today, active, completed, cancelled, value
      });
    });

    return () => unsub();
  }, []);
  
  const filteredBookings = useMemo(() => {
    let result = bookings;
    if (activeTab !== "all") {
      result = result.filter(b => b.status === activeTab);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(b => 
        b.id.toLowerCase().includes(q) || 
        b.customer.name.toLowerCase().includes(q) ||
        b.service.serviceName.toLowerCase().includes(q)
      );
    }
    return result;
  }, [bookings, activeTab, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0A192F] mb-1">Bookings</h1>
          <p className="text-sm text-slate-500">Monitor and manage every service booking across the marketplace.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 shadow-sm transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 shadow-sm transition-colors hidden sm:flex">
            <span>More Actions</span>
          </button>
          <button className="flex items-center gap-2 px-4 h-10 bg-[var(--color-primary)] text-white rounded-lg text-sm font-bold hover:bg-[var(--color-primary-dark)] transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            <span>Create Booking</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {[
          { label: "Total Bookings", value: summary.total.toLocaleString() },
          { label: "Today's Bookings", value: summary.today, highlight: "text-[var(--color-primary)]" },
          { label: "Active", value: summary.active },
          { label: "Completed", value: summary.completed.toLocaleString() },
          { label: "Cancelled", value: summary.cancelled },
          { label: "Booking Value", value: "₹" + (summary.value > 100000 ? (summary.value / 100000).toFixed(2) + "L" : summary.value.toLocaleString()) },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
            <h3 className={`text-xl font-bold tracking-tight ${stat.highlight || 'text-[#0A192F]'}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-4 overflow-x-auto hide-scrollbar">
        {(["all", "pending", "accepted", "confirmed", "service_started", "completed", "cancelled", "rejected", "no_show"] as const).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-bold capitalize whitespace-nowrap transition-colors relative ${
              activeTab === tab ? "text-[var(--color-primary)]" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.replace('_', ' ')}
            {activeTab === tab && (
              <motion.div 
                layoutId="bookingsTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]" 
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search booking ID, customer, vendor, service..."
            className="w-full pl-9 pr-4 h-10 bg-white border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto hide-scrollbar">
          <button className="flex items-center gap-2 px-3 h-10 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm whitespace-nowrap">
            <Filter className="w-4 h-4" /> Filters
          </button>
          <button className="flex items-center gap-2 px-3 h-10 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm whitespace-nowrap">
            <Calendar className="w-4 h-4" /> Date Range
          </button>
          <button className="flex items-center gap-2 px-3 h-10 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm whitespace-nowrap">
            <ArrowUpDown className="w-4 h-4" /> Sort
          </button>
        </div>
      </div>

      {/* Table Shell */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Booking</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Service</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Schedule</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Amount</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b) => (
                <tr 
                  key={b.id} 
                  onClick={() => setSelectedBooking(b)}
                  className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer"
                >
                  <td className="py-4 px-6">
                    <p className="text-sm font-bold text-[#0A192F]">#{b.id}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-bold text-slate-700">{b.customer.name}</p>
                    <p className="text-xs text-slate-500">{b.customer.phone}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-bold text-slate-700">{b.service.serviceName}</p>
                    <p className="text-xs text-slate-500">{b.service.packageName}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-medium text-slate-700">{b.bookingDate}</p>
                    <p className="text-xs text-slate-500">{b.bookingTime}</p>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <p className="text-sm font-bold text-[#0A192F]">₹{b.pricing.total}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">{b.paymentStatus}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full border ${STATUS_COLORS[b.status]}`}>
                      {b.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 transition-all">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm text-slate-500">
                    No bookings match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <BookingDetailsDrawer 
        booking={selectedBooking} 
        onClose={() => setSelectedBooking(null)} 
      />
    </div>
  );
}
