"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical, Check, X, Phone, Play, CheckSquare, XCircle, FileText } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { VendorBooking, BookingStatus } from "@/types/vendor";
import { cn } from "@/lib/utils";

interface BookingActionsProps {
  booking: VendorBooking;
  onViewDetails: (b: VendorBooking) => void;
  onAccept?: (b: VendorBooking) => void;
  onReject?: (b: VendorBooking) => void;
  onOnTheWay?: (b: VendorBooking) => void;
  onStartService?: (b: VendorBooking) => void;
  onCompleteService?: (b: VendorBooking) => void;
  onCancel?: (b: VendorBooking) => void;
  onContact?: (b: VendorBooking) => void;
  variant?: "menu" | "buttons";
}

export function BookingActions({
  booking,
  onViewDetails,
  onAccept,
  onReject,
  onOnTheWay,
  onStartService,
  onCompleteService,
  onCancel,
  onContact,
  variant = "menu"
}: BookingActionsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeAndRun = (action?: (b: VendorBooking) => void) => {
    setIsMenuOpen(false);
    action?.(booking);
  };

  if (variant === "buttons" && booking.status === "pending") {
    return (
      <div className="flex gap-2 items-center whitespace-nowrap">
        <button
          onClick={(e) => { e.stopPropagation(); onAccept?.(booking); }}
          className="py-1.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm shadow-indigo-600/20 whitespace-nowrap"
        >
          <Check className="w-3.5 h-3.5 shrink-0" /> Accept
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onReject?.(booking); }}
          className="py-1.5 px-3 rounded-xl border border-slate-200 hover:border-red-200 hover:bg-red-50 hover:text-red-700 text-slate-600 text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap"
        >
          <X className="w-3.5 h-3.5 shrink-0" /> Reject
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef} onClick={(e) => e.stopPropagation()}>
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-1 w-48 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 py-2 z-20 overflow-hidden"
          >
            <button 
              onClick={() => closeAndRun(onViewDetails)}
              className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 flex items-center gap-2"
            >
              <FileText className="w-4 h-4" /> View Details
            </button>

            {booking.status === "pending" && (
              <>
                <button 
                  onClick={() => closeAndRun(onAccept)}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 flex items-center gap-2"
                >
                  <Check className="w-4 h-4" /> Accept Booking
                </button>
                <button 
                  onClick={() => closeAndRun(onReject)}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <X className="w-4 h-4" /> Reject Booking
                </button>
              </>
            )}

            {booking.status === "confirmed" && (
              <>
                <button 
                  onClick={() => closeAndRun(onOnTheWay)}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 flex items-center gap-2"
                >
                  <Play className="w-4 h-4" /> On The Way
                </button>
                <button 
                  onClick={() => closeAndRun(onCancel)}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" /> Cancel Booking
                </button>
              </>
            )}

            {booking.status === "on_the_way" && (
              <>
                <button 
                  onClick={() => closeAndRun(onStartService)}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 flex items-center gap-2"
                >
                  <Play className="w-4 h-4" /> Start Service
                </button>
                <button 
                  onClick={() => closeAndRun(onCancel)}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" /> Cancel Booking
                </button>
              </>
            )}

            {booking.status === "in_progress" && (
              <button 
                onClick={() => closeAndRun(onCompleteService)}
                className="w-full text-left px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 flex items-center gap-2"
              >
                <CheckSquare className="w-4 h-4" /> Mark Completed
              </button>
            )}

            {(booking.status === "confirmed" || booking.status === "on_the_way" || booking.status === "in_progress") && (
              <>
                <div className="border-t border-slate-100 my-1" />
                <button 
                  onClick={() => closeAndRun(onContact)}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" /> Contact Customer
                </button>
              </>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
