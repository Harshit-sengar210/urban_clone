"use client";

import { useState, useMemo } from "react";
import { Download, MoreHorizontal, Search, Filter, Calendar, ArrowUpDown } from "lucide-react";
import { motion } from "framer-motion";
import { adminPaymentsData, type AdminTransaction } from "@/data/adminPaymentsData";
import { PaymentDetailsDrawer } from "@/components/admin/payments/PaymentDetailsDrawer";
import { adminBookingsData, type AdminBooking } from "@/data/adminBookingsData";
import { BookingDetailsDrawer } from "@/components/admin/bookings/BookingDetailsDrawer";

export default function AdminPaymentsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [subTab, setSubTab] = useState<"Transactions" | "Refunds" | "Vendor Earnings" | "Payouts">("Transactions");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState<AdminTransaction | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(null);
  
  const filteredTransactions = useMemo(() => {
    let result = adminPaymentsData.transactions;
    if (activeTab !== "all") {
      result = result.filter(tx => tx.status === activeTab);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(tx => 
        tx.id.toLowerCase().includes(q) || 
        tx.bookingId.toLowerCase().includes(q) ||
        tx.customer.name.toLowerCase().includes(q) ||
        tx.vendor.name.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeTab, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0A192F] mb-1">Payments & Transactions</h1>
          <p className="text-sm text-slate-500">Monitor marketplace payments, refunds, vendor earnings, and financial transactions.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 shadow-sm transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 shadow-sm transition-colors">
            <span>More Actions</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {[
          { label: "Total Revenue", value: `₹${(adminPaymentsData.summary.revenue/100000).toFixed(2)}L` },
          { label: "Today's Revenue", value: `₹${adminPaymentsData.summary.todayRevenue.toLocaleString()}`, highlight: "text-emerald-600" },
          { label: "Successful Payments", value: adminPaymentsData.summary.successfulPayments.toLocaleString() },
          { label: "Pending Payments", value: adminPaymentsData.summary.pendingPayments },
          { label: "Refunds", value: `₹${adminPaymentsData.summary.refunds.toLocaleString()}`, highlight: "text-rose-600" },
          { label: "Vendor Payable", value: `₹${(adminPaymentsData.summary.vendorPayable/100000).toFixed(2)}L` },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
            <h3 className={`text-xl font-bold tracking-tight ${stat.highlight || 'text-[#0A192F]'}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Secondary Finance Navigation */}
      <div className="flex border-b border-slate-200 mb-6 overflow-x-auto hide-scrollbar">
        {(["Transactions", "Refunds", "Vendor Earnings", "Payouts"] as const).map(tab => (
          <button 
            key={tab}
            onClick={() => setSubTab(tab)}
            className={`px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors relative ${
              subTab === tab ? "text-[var(--color-primary)]" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab}
            {subTab === tab && (
              <motion.div 
                layoutId="financeSubTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]" 
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {subTab === "Transactions" && (
        <>
          {/* Payment Status Tabs */}
          <div className="flex border-b border-slate-100 mb-4 overflow-x-auto hide-scrollbar">
            {(["all", "paid", "pending", "authorized", "failed", "refunded", "partially_refunded", "cash"]).map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-xs font-bold capitalize whitespace-nowrap transition-colors relative ${
                  activeTab === tab ? "text-[var(--color-primary)]" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab.replace('_', ' ')}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="paymentStatusTab"
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
                placeholder="Search transaction ID, booking, customer, vendor..."
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
                    <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Transaction</th>
                    <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Booking / Customer</th>
                    <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Vendor</th>
                    <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Amount</th>
                    <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                    <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((tx) => (
                    <tr 
                      key={tx.id} 
                      onClick={() => setSelectedTransaction(tx)}
                      className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer"
                    >
                      <td className="py-4 px-6">
                        <p className="text-sm font-bold text-[#0A192F]">{tx.id}</p>
                        <p className="text-[10px] uppercase font-bold text-slate-400">{tx.transactionType}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm font-bold text-slate-700">{tx.bookingId}</p>
                        <p className="text-xs text-slate-500">{tx.customer.name}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm font-medium text-slate-700">{tx.vendor.name}</p>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <p className="text-sm font-bold text-[#0A192F]">₹{tx.amount}</p>
                        <p className="text-[10px] uppercase text-slate-500 font-bold">{tx.paymentMethod.replace('_', ' ')}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full border ${
                          tx.status === 'paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          tx.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          'bg-slate-50 text-slate-700 border-slate-200'
                        }`}>
                          {tx.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-slate-700">{new Date(tx.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</p>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 transition-all">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredTransactions.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-sm text-slate-500">
                        No transactions match your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {subTab !== "Transactions" && (
        <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center shadow-sm">
          <h3 className="text-lg font-bold text-[#0A192F]">{subTab} Workspace</h3>
          <p className="text-slate-500 text-sm mt-2">
            The {subTab.toLowerCase()} interface is being initialized.
          </p>
        </div>
      )}

      <PaymentDetailsDrawer
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        onViewBooking={(bookingId) => {
          const booking = adminBookingsData.bookings.find(b => b.id === bookingId);
          if (booking) {
            setSelectedBooking(booking);
          }
        }}
      />

      <BookingDetailsDrawer
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  );
}
