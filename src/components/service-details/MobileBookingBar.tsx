"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface MobileBookingBarProps {
  serviceSlug: string;
  price: number;
}

export function MobileBookingBar({ serviceSlug, price }: MobileBookingBarProps) {
  const router = useRouter();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[var(--color-border)] p-4 pb-safe flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      <div>
        <span className="text-xs text-[var(--color-muted)] font-medium uppercase tracking-wider block mb-0.5">Starting from</span>
        <span className="text-2xl font-bold text-[var(--color-foreground)]">₹{price}</span>
      </div>
      
      <Button 
        onClick={() => router.push(`/booking/${serviceSlug}`)}
        className="h-12 px-8 text-base font-bold bg-[var(--color-primary)] text-white rounded-xl shadow-lg shadow-primary/20"
      >
        Book Now
      </Button>
    </div>
  );
}
