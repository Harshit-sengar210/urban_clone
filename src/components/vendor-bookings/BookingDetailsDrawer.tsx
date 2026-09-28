"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Clock, IndianRupee, User, Info, CheckCircle2 } from "lucide-react";
import { VendorBooking, BookingStatus } from "@/types/vendor";
import { cn } from "@/lib/utils";
import { BookingActions } from "./BookingActions";

interface BookingDetailsDrawerProps {
  booking: VendorBooking | null;
  onClose: () => void;
  onAccept: (b: VendorBooking) => void;
  onReject: (b: VendorBooking) => void;
  onOnTheWay?: (b: VendorBooking) => void;
  onStartService: (b: VendorBooking) => void;
  onCompleteService: (b: VendorBooking) => void;
  onCancel: (b: VendorBooking) => void;
  onContact: (b: VendorBooking) => void;
}

const statusConfig: Record<BookingStatus, { label: string, color: string, bg: string, dot: string }> = {
  pending: { label: "Pending", color: "text-amber-700", bg: "bg-amber-100", dot: "bg-amber-500" },
  confirmed: { label: "Confirmed", color: "text-emerald-700", bg: "bg-emerald-100", dot: "bg-emerald-500" },
  on_the_way: { label: "On The Way", color: "text-blue-700", bg: "bg-blue-100", dot: "bg-blue-500" },
  in_progress: { label: "In Progress", color: "text-indigo-700", bg: "bg-indigo-100", dot: "bg-indigo-500" },
  completed: { label: "Completed", color: "text-slate-700", bg: "bg-slate-100", dot: "bg-slate-500" },
  cancelled: { label: "Cancelled", color: "text-red-700", bg: "bg-red-100", dot: "bg-red-500" },
  rejected: { label: "Rejected", color: "text-red-700", bg: "bg-red-100", dot: "bg-red-500" },
  rescheduled: { label: "Rescheduled", color: "text-purple-700", bg: "bg-purple-100", dot: "bg-purple-500" },
  assigned: { label: "Assigned", color: "text-blue-700", bg: "bg-blue-100", dot: "bg-blue-500" },
  pending_payment: { label: "Pending Payment", color: "text-rose-700", bg: "bg-rose-100", dot: "bg-rose-500" },
};

const TIMELINE_STEPS = [
  { id: "pending", label: "Request Received" },
  { id: "confirmed", label: "Booking Confirmed" },
  { id: "on_the_way", label: "On The Way" },
  { id: "in_progress", label: "Service Started" },
  { id: "completed", label: "Service Completed" }
];

export function BookingDetailsDrawer({
  booking,
  onClose,
  onAccept,
  onReject,
  onOnTheWay,
  onStartService,
  onCompleteService,
  onCancel,
  onContact
}: BookingDetailsDrawerProps) {
  
  const getActionProps = () => ({
    onViewDetails: () => {}, // Disabled inside details view
    onAccept,
    onReject,
    onOnTheWay,
    onStartService,
    onCompleteService,
    onCancel,
    onContact
  });

  const getTimelineStatus = (stepId: string) => {
    if (!booking) return "pending";
    if (booking.status === "cancelled" || booking.status === "rejected") return "inactive";

    const currentIndex = TIMELINE_STEPS.findIndex(s => s.id === booking.status);
    const stepIndex = TIMELINE_STEPS.findIndex(s => s.id === stepId);

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "pending";
  };

  return (
    <AnimatePresence>
      {booking && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-4 md:px-6 py-5 border-b border-slate-100 bg-white">
              <div className="min-w-0 flex-1 pr-4">
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 truncate">
                  {booking.id}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-500 font-medium truncate">
                    Requested {booking.createdAt}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {(booking.status === "pending" || booking.status === "rescheduled") ? (
                  <BookingActions booking={booking} {...getActionProps()} variant="buttons" />
                ) : (
                  <BookingActions booking={booking} {...getActionProps()} variant="menu" />
                )}
                <div className="w-px h-6 bg-slate-200 mx-1" />
                <button 
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-slate-50/50">
              
              {/* Status Badge */}
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <span className="text-sm font-bold text-slate-700">Current Status</span>
                <div className={cn("px-3 py-1.5 rounded-full flex items-center gap-2", (statusConfig[booking.status as BookingStatus] || { label: booking.status || "Unknown", color: "text-gray-700", bg: "bg-gray-100", dot: "bg-gray-500" }).bg)}>
                  <div className={cn("w-2 h-2 rounded-full", (statusConfig[booking.status as BookingStatus] || { label: booking.status || "Unknown", color: "text-gray-700", bg: "bg-gray-100", dot: "bg-gray-500" }).dot)} />
                  <span className={cn("text-xs font-bold uppercase tracking-wider", (statusConfig[booking.status as BookingStatus] || { label: booking.status || "Unknown", color: "text-gray-700", bg: "bg-gray-100", dot: "bg-gray-500" }).color)}>
                    {(statusConfig[booking.status as BookingStatus] || { label: booking.status || "Unknown", color: "text-gray-700", bg: "bg-gray-100", dot: "bg-gray-500" }).label}
                  </span>
                </div>
              </div>

              {/* Timeline */}
              {(booking.status !== "cancelled" && booking.status !== "rejected") && (
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Lifecycle</h3>
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-3 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                    {TIMELINE_STEPS.map((step, index) => {
                      const status = getTimelineStatus(step.id);
                      return (
                        <div key={step.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                          <div className={cn(
                            "flex items-center justify-center w-6 h-6 rounded-full border-2 bg-white z-10",
                            status === "completed" ? "border-emerald-500 text-emerald-500" :
                            status === "current" ? "border-indigo-500 ring-4 ring-indigo-100" :
                            "border-slate-300"
                          )}>
                            {status === "completed" && <CheckCircle2 className="w-3 h-3" />}
                            {status === "current" && <div className="w-2 h-2 bg-indigo-500 rounded-full" />}
                          </div>
                          <div className={cn(
                            "w-[calc(100%-2.5rem)] md:w-[calc(50%-2.5rem)] px-4 py-2 rounded-xl border shadow-sm",
                            status === "current" ? "bg-indigo-50 border-indigo-100 text-indigo-700" :
                            status === "completed" ? "bg-white border-slate-100 text-slate-700" :
                            "bg-slate-50 border-slate-100 text-slate-400 opacity-60"
                          )}>
                            <div className="text-xs font-bold">{step.label}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Customer Info */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <User className="w-4 h-4" /> Customer Details
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-500 text-lg">
                    {booking.customerName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{booking.customerName}</div>
                    {(booking.status === "pending" || booking.status === "rescheduled") ? (
                      <div className="text-xs text-slate-500 mt-0.5">Contact available after confirmation</div>
                    ) : (
                      <div className="text-sm font-medium text-slate-600 mt-0.5">{booking.customerPhone || "Phone not available"}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4" /> Service Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-bold text-slate-900">{booking.serviceName}</div>
                    {booking.subService && <div className="text-xs text-indigo-600 font-bold uppercase tracking-widest mt-1">{booking.subService}</div>}
                  </div>

                  <div className="flex items-start gap-3 text-sm text-slate-600">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">{booking.date}</div>
                      <div>{booking.startTime} - {booking.endTime}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-sm text-slate-600">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">Location</div>
                      <div>{booking.location}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Earnings */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <IndianRupee className="w-4 h-4" /> Earnings Breakdown
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Service Amount</span>
                    <span className="font-medium text-slate-900">₹{booking.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600 pb-3 border-b border-slate-100">
                    <span>Platform Fee (Est.)</span>
                    <span className="font-medium text-red-500">-₹{booking.amount - (booking.estimatedEarnings || booking.amount)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-900">Estimated Earnings</span>
                    <span className="text-xl font-black text-emerald-600">₹{booking.estimatedEarnings || booking.amount}</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
