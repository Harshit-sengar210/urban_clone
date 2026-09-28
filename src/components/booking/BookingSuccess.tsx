"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PricingVariant } from "@/data/services";
import { Address } from "./AddressSelection";

interface BookingSuccessProps {
  serviceName: string;
  variant: PricingVariant;
  date: string;
  time: string;
  address: Address;
  bookingId: string;
}

export function BookingSuccess({ serviceName, variant, date, time, address, bookingId }: BookingSuccessProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
  const displayId = `UC-${bookingId.substring(0, 8).toUpperCase()}`;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-xl mx-auto bg-white rounded-3xl border border-[var(--color-border)] shadow-xl overflow-hidden"
    >
      <div className="p-6 md:p-8 text-center border-b border-[var(--color-border)]">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </motion.div>
        
        <h2 className="text-3xl font-bold text-[var(--color-foreground)] mb-3">Booking Confirmed!</h2>
        <p className="text-[var(--color-muted)] text-lg">Your {serviceName} has been successfully booked.</p>
      </div>
      
      <div className="p-6 md:p-8 bg-[var(--color-surface)]">
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center pb-4 border-b border-[var(--color-border)] border-dashed">
            <span className="text-[var(--color-muted)] font-medium">Booking ID</span>
            <span className="font-bold text-[var(--color-foreground)]">{displayId}</span>
          </div>
          
          <div className="flex justify-between items-center pb-4 border-b border-[var(--color-border)] border-dashed">
            <span className="text-[var(--color-muted)] font-medium">Date & Time</span>
            <div className="text-right">
              <span className="block font-bold text-[var(--color-foreground)]">{formattedDate}</span>
              <span className="text-sm text-[var(--color-muted)]">{time}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-start">
            <span className="text-[var(--color-muted)] font-medium">Address</span>
            <div className="text-right max-w-[200px]">
              <span className="block font-bold text-[var(--color-foreground)]">{address.fullAddress}</span>
              <span className="text-sm text-[var(--color-muted)]">{address.city}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <Button className="w-full h-12 text-base font-bold bg-[var(--color-primary)] text-white shadow-lg shadow-primary/20" asChild>
            <Link href={`/dashboard/bookings/${bookingId}`}>
              View Booking Details
            </Link>
          </Button>
          <Button variant="outline" className="w-full h-12 text-base font-bold" asChild>
            <Link href="/">
              Go to Home <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
