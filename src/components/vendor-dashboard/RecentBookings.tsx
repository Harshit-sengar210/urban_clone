"use client";

import { motion } from "framer-motion";
import { ArrowRight, Wrench } from "lucide-react";
import Link from "next/link";
import { BookingRequest, BookingStatus } from "@/types/vendor";
import { cn } from "@/lib/utils";

const StatusBadge = ({ status }: { status: BookingStatus }) => {
  const styles: Record<BookingStatus, string> = {
    pending: "bg-amber-100 text-amber-700",
    confirmed: "bg-indigo-100 text-indigo-700",
    in_progress: "bg-blue-100 text-blue-700",
    completed: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-slate-100 text-slate-600",
    rejected: "bg-red-100 text-red-700",
    assigned: "bg-blue-100 text-blue-700",
    on_the_way: "bg-sky-100 text-sky-700",
    rescheduled: "bg-yellow-100 text-yellow-700",
    pending_payment: "bg-rose-100 text-rose-700",
  };

  return (
    <span className={cn("px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider", styles[status])}>
      {status}
    </span>
  );
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export function RecentBookings({ bookings }: { bookings: BookingRequest[] }) {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-900">Recent Bookings</h3>
        <Link href="/vendor/bookings" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group">
          View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-[10px] uppercase tracking-widest text-slate-400 border-b border-slate-100">
            <tr>
              <th className="pb-4 font-bold">Service</th>
              <th className="pb-4 font-bold">Customer</th>
              <th className="pb-4 font-bold">Date & Time</th>
              <th className="pb-4 font-bold">Status</th>
              <th className="pb-4 font-bold">Payment</th>
              <th className="pb-4 font-bold text-right">Amount</th>
            </tr>
          </thead>
          <motion.tbody 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            {bookings.map((booking) => (
              <motion.tr 
                key={booking.id}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors group cursor-pointer"
              >
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Wrench className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{booking.service}</div>
                      {booking.subService && <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">{booking.subService}</div>}
                    </div>
                  </div>
                </td>
                <td className="py-4 font-medium text-slate-700">{booking.customerName}</td>
                <td className="py-4 text-slate-500 text-xs">
                  <span className="font-semibold text-slate-700">{booking.date}</span>, {booking.time.split('–')[0].trim()}
                </td>
                <td className="py-4">
                  <StatusBadge status={booking.status || "pending"} />
                </td>
                <td className="py-4">
                  {booking.paymentMethod ? (
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                      booking.paymentMethod === 'cod' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {booking.paymentMethod === 'cod' ? 'CASH' : 'ONLINE'}
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-slate-400 uppercase">Pending</span>
                  )}
                </td>
                <td className="py-4 text-right font-bold text-slate-900">
                  {formatCurrency(booking.estimatedEarnings)}
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards */}
      <div className="sm:hidden flex flex-col gap-3">
        {bookings.map((booking) => (
          <div key={booking.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                  <Wrench className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{booking.service}</div>
                  <div className="text-xs text-slate-500">{booking.customerName}</div>
                </div>
              </div>
              <StatusBadge status={booking.status || "pending"} />
            </div>
            <div className="flex justify-between items-center text-xs pt-3 border-t border-slate-100">
              <div className="flex flex-col gap-1">
                <span className="text-slate-500">{booking.date}, {booking.time.split('–')[0].trim()}</span>
                {booking.paymentMethod && (
                  <span className={`text-[9px] font-bold uppercase tracking-widest w-max px-2 py-0.5 rounded-md ${
                    booking.paymentMethod === 'cod' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {booking.paymentMethod === 'cod' ? 'CASH' : 'ONLINE'}
                  </span>
                )}
              </div>
              <span className="font-bold text-slate-900">{formatCurrency(booking.estimatedEarnings)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
