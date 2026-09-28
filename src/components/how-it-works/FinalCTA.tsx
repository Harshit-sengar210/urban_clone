"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/animations/FadeUp";

export function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 rounded-[3rem] p-12 md:p-20 text-center border border-white shadow-[0_10px_40px_-15px_rgba(79,70,229,0.1)] overflow-hidden">
          
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-400/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <FadeUp delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                Ready to Get Things Done?
              </h2>
            </FadeUp>
            
            <FadeUp delay={0.2}>
              <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
                Book a trusted professional for your next service and experience the UrbanClone difference.
              </p>
            </FadeUp>
            
            <FadeUp delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="h-14 px-10 text-base font-bold shadow-xl shadow-primary/25 w-full sm:w-auto" asChild>
                  <Link href="/services">Explore Services →</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-10 text-base font-bold bg-white text-slate-700 hover:bg-slate-50 border-slate-200 w-full sm:w-auto" asChild>
                  <Link href="/dashboard/bookings">View My Bookings</Link>
                </Button>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
