"use client";

import { motion, AnimatePresence } from "framer-motion";
import { VendorBooking, BookingStatus } from "@/types/vendor";
import { BookingActions } from "./BookingActions";
import { FileSearch, MapPin, Calendar, Clock, IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingListProps {
  bookings: VendorBooking[];
  onViewDetails: (b: VendorBooking) => void;
  onAccept: (b: VendorBooking) => void;
  onReject: (b: VendorBooking) => void;
  onOnTheWay?: (b: VendorBooking) => void;
  onStartService: (b: VendorBooking) => void;
  onCompleteService: (b: VendorBooking) => void;
  onCancel: (b: VendorBooking) => void;
  onContact: (b: VendorBooking) => void;
  onClearFilters: () => void;
}

const statusConfig: Record<BookingStatus, { label: string, color: string, bg: string, dot: string }> = {
  pending: { label: "Pending", color: "text-amber-700", bg: "bg-amber-100", dot: "bg-amber-500" },
  confirmed: { label: "Confirmed", color: "text-emerald-700", bg: "bg-emerald-100", dot: "bg-emerald-500" },
  in_progress: { label: "In Progress", color: "text-indigo-700", bg: "bg-indigo-100", dot: "bg-indigo-500" },
  completed: { label: "Completed", color: "text-slate-700", bg: "bg-slate-100", dot: "bg-slate-500" },
  cancelled: { label: "Cancelled", color: "text-red-700", bg: "bg-red-100", dot: "bg-red-500" },
  rejected: { label: "Rejected", color: "text-red-700", bg: "bg-red-100", dot: "bg-red-500" },
  on_the_way: { label: "On The Way", color: "text-sky-700", bg: "bg-sky-100", dot: "bg-sky-500" },
  rescheduled: { label: "Rescheduled", color: "text-purple-700", bg: "bg-purple-100", dot: "bg-purple-500" },
  assigned: { label: "Assigned", color: "text-blue-700", bg: "bg-blue-100", dot: "bg-blue-500" },
  pending_payment: { label: "Pending Payment", color: "text-rose-700", bg: "bg-rose-100", dot: "bg-rose-500" },
};

export function BookingList({
  bookings,
  onViewDetails,
  onAccept,
  onReject,
  onOnTheWay,
  onStartService,
  onCompleteService,
  onCancel,
  onContact,
  onClearFilters
}: BookingListProps) {
  
  if (bookings.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 text-center px-4 bg-white rounded-3xl border border-slate-100"
      >
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
          <FileSearch className="w-10 h-10 text-slate-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">No bookings found</h3>
        <p className="text-slate-500 mb-6 max-w-md">
          There are no bookings matching your current filters.
        </p>
        <button 
          onClick={onClearFilters}
          className="px-6 py-2.5 rounded-full border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors"
        >
          Clear Filters
        </button>
      </motion.div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getActionProps = () => ({
    onViewDetails,
    onAccept,
    onReject,
    onOnTheWay,
    onStartService,
    onCompleteService,
    onCancel,
    onContact
  });

  return (
    <div className="space-y-4">
      {/* Mobile Cards (Hidden on md+) */}
      <div className="md:hidden space-y-4">
        <AnimatePresence mode="popLayout">
          {bookings.map((booking) => {
            const config = statusConfig[booking.status as BookingStatus] || { label: booking.status || "Unknown", color: "text-gray-700", bg: "bg-gray-100", dot: "bg-gray-500" };
            const isPending = booking.status === "pending" || booking.status === "rescheduled";
            
            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={booking.id}
                onClick={() => onViewDetails(booking)}
                className={cn(
                  "bg-white rounded-[1.5rem] p-5 shadow-sm border border-slate-100 relative overflow-hidden",
                  isPending && "ring-1 ring-amber-200 shadow-amber-500/5"
                )}
              >
                {isPending && <div className="absolute top-0 left-0 w-1 h-full bg-amber-400" />}
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400">{booking.id}</span>
                    <h3 className="font-bold text-slate-900 mt-1">{booking.customerName}</h3>
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-0.5">{booking.serviceName}</p>
                  </div>
                  <div className={cn("px-2.5 py-1 rounded-full flex items-center gap-1.5", config.bg)}>
                    <div className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
                    <span className={cn("text-[10px] font-bold uppercase tracking-wider", config.color)}>{config.label}</span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-3 mb-4 space-y-2">
                  <div className="flex items-start gap-2 text-xs text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="font-medium line-clamp-1">{booking.location}</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-600">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="font-medium">{booking.date} &middot; {booking.startTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="font-black text-slate-900">
                    {formatCurrency(booking.amount)}
                  </div>
                  {isPending ? (
                    <div className="w-48">
                      <BookingActions booking={booking} {...getActionProps()} variant="buttons" />
                    </div>
                  ) : (
                    <BookingActions booking={booking} {...getActionProps()} variant="menu" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Desktop Table (Hidden on smaller screens) */}
      <div className="hidden md:block bg-white rounded-[2rem] shadow-sm border border-slate-100">
        <div className="w-full">
          <table className="w-full min-w-[720px] text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-4 py-4 font-bold w-28">Booking</th>
                <th className="px-4 py-4 font-bold">Customer &amp; Service</th>
                <th className="px-4 py-4 font-bold w-36">Schedule</th>
                <th className="px-4 py-4 font-bold w-32">Status</th>
                <th className="px-4 py-4 font-bold text-right w-24">Amount</th>
                <th className="px-4 py-4 font-bold text-center w-44">Action</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {bookings.map((booking) => {
                  const config = statusConfig[booking.status as BookingStatus] || { label: booking.status || "Unknown", color: "text-gray-700", bg: "bg-gray-100", dot: "bg-gray-500" };
                  const isPending = booking.status === "pending" || booking.status === "rescheduled";

                  return (
                    <motion.tr
                      layout
                      initial={{ opacity: 0, backgroundColor: "#fff" }}
                      animate={{ opacity: 1, backgroundColor: "#fff" }}
                      exit={{ opacity: 0, backgroundColor: "#f8fafc" }}
                      key={booking.id}
                      onClick={() => onViewDetails(booking)}
                      className={cn(
                        "border-b border-slate-50 hover:bg-slate-50/80 transition-colors cursor-pointer group",
                        isPending ? "border-l-4 border-l-amber-400 bg-amber-50/20" : "border-l-4 border-l-transparent"
                      )}
                    >
                      <td className="px-4 py-4 align-middle">
                        <span className="text-sm font-bold text-slate-500 group-hover:text-slate-900 transition-colors">{booking.id}</span>
                      </td>
                      <td className="px-4 py-4 align-middle max-w-[180px]">
                        <div className="font-bold text-slate-900 truncate">{booking.customerName}</div>
                        <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-0.5 truncate">{booking.serviceName}</div>
                      </td>
                      <td className="px-4 py-4 align-middle">
                        <div className="text-sm font-medium text-slate-900 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {booking.date}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {booking.startTime}
                        </div>
                      </td>
                      <td className="px-4 py-4 align-middle">
                        <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full whitespace-nowrap", config.bg)}>
                          <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", config.dot)} />
                          <span className={cn("text-[10px] font-bold uppercase tracking-wider", config.color)}>{config.label}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 align-middle text-right">
                        <div className="font-black text-slate-900 whitespace-nowrap">{formatCurrency(booking.amount)}</div>
                      </td>
                      <td className="px-4 py-4 align-middle" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-2">
                          <BookingActions booking={booking} {...getActionProps()} variant={isPending ? "buttons" : "menu"} />
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
