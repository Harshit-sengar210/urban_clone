"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FadeUp } from "@/components/animations/FadeUp";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Loader2, MapPin, Star, User } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function BookingDemoSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  // Simulation states
  const [step, setStep] = useState<0|1|2|3>(0);
  
  // Trigger simulation sequence when scrolled into view
  if (isInView && step === 0) {
    setStep(1); // Service Selected
    setTimeout(() => setStep(2), 1500); // Date Selected
    setTimeout(() => setStep(3), 3500); // Loading -> Confirmed
  }

  return (
    <section ref={containerRef} className="py-24 lg:py-32 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[600px] bg-[var(--color-primary)]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <SectionHeading 
          title="See It in Action"
          subtitle="Booking the perfect service takes less than a minute."
          centered
          className="mb-16 [&_h2]:text-white [&_p]:text-slate-300"
        />

        <div className="max-w-[420px] mx-auto">
          <FadeUp delay={0.2} yOffset={30}>
            {/* The Mock App Interface */}
            <div className="bg-slate-50 text-slate-900 rounded-[2.5rem] p-6 pb-8 shadow-2xl border-8 border-slate-800 relative overflow-hidden flex flex-col gap-6">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <h3 className="font-bold text-lg">Book Service</h3>
                <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider">Step {step < 3 ? step + 1 : 3} of 3</span>
              </div>

              {/* Step 1: Service details */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: step >= 1 ? 1 : 0.3, y: step >= 1 ? 0 : 10 }}
                className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0">
                  <Image src="/icons/cleaning.jpg" alt="Cleaning" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Home Deep Cleaning</h4>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><Star className="w-3 h-3 fill-amber-500 text-amber-500" /> 4.8 (12k reviews)</p>
                  <p className="text-[var(--color-primary)] font-bold mt-1">₹499</p>
                </div>
              </motion.div>

              {/* Step 2: Schedule */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: step >= 2 ? 1 : 0.3, y: step >= 2 ? 0 : 10 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2 text-slate-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs font-medium uppercase tracking-wider">Date</span>
                  </div>
                  <p className="font-bold text-slate-800 text-sm">{step >= 2 ? "18 Sep, Wed" : "Select Date"}</p>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2 text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-medium uppercase tracking-wider">Time</span>
                  </div>
                  <p className="font-bold text-slate-800 text-sm">{step >= 2 ? "10:00 AM" : "Select Time"}</p>
                </div>
              </motion.div>

              {/* Step 3: Professional (Auto-assigned) */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 10 }}
                className="bg-green-50 border border-green-100 p-4 rounded-2xl flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden relative shrink-0 border-2 border-white shadow-sm">
                  <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop" alt="Pro" fill className="object-cover" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider mb-0.5">Top Professional Assigned</p>
                  <p className="font-bold text-slate-900 text-sm">Ravi Kumar</p>
                </div>
              </motion.div>

              {/* Action Button */}
              <div className="mt-auto pt-4">
                <Button 
                  size="lg" 
                  className={cn(
                    "w-full h-14 font-bold text-base transition-all duration-300",
                    step === 3 ? "bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/30" : "bg-[var(--color-primary)]"
                  )}
                >
                  {step < 3 ? (
                    <span className="flex items-center gap-2">
                      {step === 2 && <Loader2 className="w-4 h-4 animate-spin" />}
                      {step === 2 ? "Confirming..." : "Confirm Booking →"}
                    </span>
                  ) : (
                    "Booking Confirmed ✓"
                  )}
                </Button>
              </div>

            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
