"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { BookingRequest } from "@/types/vendor";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

const formatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateStr;
  }
};

export function UpcomingBookings({ bookings }: { bookings: BookingRequest[] }) {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm mt-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-900">Upcoming Bookings</h3>
        <Link href="/vendor/bookings" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group">
          View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="space-y-3">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <Link 
              key={booking.id} 
              href="/vendor/bookings"
              className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-indigo-700 transition-colors line-clamp-1">
                    {booking.service}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">
                    {formatDate(booking.date)} &middot; {booking.time.split('–')[0].trim()}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0 ml-2">
                <div className="font-bold text-sm text-slate-900">
                  {formatCurrency(booking.estimatedEarnings)}
                </div>
                <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">
                  Confirmed
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-slate-500">No upcoming bookings scheduled.</p>
          </div>
        )}
      </div>
    </div>
  );
}
