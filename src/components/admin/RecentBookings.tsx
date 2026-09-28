"use client";

import { motion } from "framer-motion";
import { ArrowRight, MoreHorizontal } from "lucide-react";
import type { RecentBooking } from "@/data/adminDashboardData";
import Link from "next/link";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Confirmed":
      return <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 rounded-full border border-blue-100">Confirmed</span>;
    case "Completed":
      return <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 rounded-full border border-emerald-100">Completed</span>;
    case "Pending":
      return <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 rounded-full border border-amber-100">Pending</span>;
    case "Cancelled":
      return <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 rounded-full border border-rose-100">Cancelled</span>;
    default:
      return <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 rounded-full">{status}</span>;
  }
};

export function RecentBookings({ bookings }: { bookings: RecentBooking[] }) {
  if (!bookings || bookings.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 lg:p-8"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-[#0A192F]">Recent Bookings</h3>
        </div>
        <div className="py-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
            <span className="text-2xl">📋</span>
          </div>
          <p className="text-[#0A192F] font-bold text-lg mb-1">No recent bookings</p>
          <p className="text-sm text-slate-500">You're all caught up for today.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
    >
      <div className="p-6 lg:p-8 flex items-center justify-between border-b border-slate-100">
        <h3 className="text-lg font-bold text-[#0A192F]">Recent Bookings</h3>
        <Link href="/admin/bookings" className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors">
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Booking ID</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Customer</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Service</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Vendor</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, i) => (
              <motion.tr 
                key={booking.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + (i * 0.1) }}
                className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group cursor-pointer"
              >
                <td className="py-4 px-6 text-sm font-bold text-[#0A192F]">{booking.id}</td>
                <td className="py-4 px-6 text-sm font-medium text-slate-700">{booking.customer}</td>
                <td className="py-4 px-6 text-sm font-medium text-slate-700">{booking.service}</td>
                <td className="py-4 px-6 text-sm text-slate-500">{booking.vendor}</td>
                <td className="py-4 px-6 text-sm text-slate-500">{booking.date}</td>
                <td className="py-4 px-6 text-sm font-bold text-[#0A192F]">{booking.amount}</td>
                <td className="py-4 px-6">{getStatusBadge(booking.status)}</td>
                <td className="py-4 px-6 text-right">
                  <button className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white border border-transparent hover:border-slate-200 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col divide-y divide-slate-100">
        {bookings.map((booking, i) => (
          <motion.div 
            key={booking.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 + (i * 0.1) }}
            className="p-5 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-[#0A192F]">{booking.id}</span>
              {getStatusBadge(booking.status)}
            </div>
            
            <h4 className="font-bold text-[#0A192F] mb-1">{booking.service}</h4>
            <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
              <span>{booking.customer} &bull; {booking.vendor}</span>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="font-bold text-[#0A192F]">{booking.amount}</span>
              <button className="text-sm font-medium text-[var(--color-primary)]">View Details</button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
