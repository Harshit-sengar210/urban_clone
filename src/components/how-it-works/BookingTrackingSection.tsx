"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import { CheckCircle2, Circle, Clock, MapPin } from "lucide-react";
import Image from "next/image";

export function BookingTrackingSection() {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Side text */}
          <div className="max-w-xl">
            <FadeUp delay={0.1}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                You're Always <br className="hidden md:block" />
                <span className="text-[var(--color-primary)]">in Control.</span>
              </h2>
            </FadeUp>
            
            <FadeUp delay={0.2}>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Get real-time updates throughout your booking. From professional assignment to arrival and completion, you'll know exactly what's happening.
              </p>
            </FadeUp>
            
            <FadeUp delay={0.3}>
              <ul className="space-y-4">
                {[
                  "Live status tracking in your dashboard",
                  "Instant notifications for status changes",
                  "Direct contact with your professional",
                  "Secure SOS button for safety"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>

          {/* Right Side UI Demo */}
          <div className="relative">
            {/* Decorative background circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-slate-50 rounded-full blur-[60px] -z-10" />
            
            <FadeUp delay={0.4} className="relative z-10 w-full max-w-[400px] mx-auto">
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-900">Booking Status</h3>
                    <p className="text-xs text-slate-500 mt-1">ID: UC-847291</p>
                  </div>
                  <div className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider">
                    In Progress
                  </div>
                </div>

                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                  
                  {/* Step 1: Confirmed */}
                  <div className="relative flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 z-10 ring-4 ring-white">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="pt-1">
                      <p className="font-bold text-slate-900 text-sm">Booking Confirmed</p>
                      <p className="text-xs text-slate-500 mt-0.5">10:05 AM</p>
                    </div>
                  </div>

                  {/* Step 2: Assigned */}
                  <div className="relative flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 z-10 ring-4 ring-white">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="pt-1">
                      <p className="font-bold text-slate-900 text-sm">Professional Assigned</p>
                      <div className="mt-2 flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop" width={32} height={32} alt="Pro" className="rounded-full" />
                        <div>
                          <p className="text-xs font-bold text-slate-800">Ravi Kumar</p>
                          <p className="text-[10px] text-slate-500">★ 4.8</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Active (Pulsing) */}
                  <div className="relative flex items-start gap-4">
                    <div className="relative w-8 h-8 flex items-center justify-center shrink-0 z-10">
                      <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75" />
                      <div className="relative w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center ring-4 ring-white">
                        <MapPin className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="pt-1">
                      <p className="font-bold text-blue-600 text-sm">On The Way</p>
                      <p className="text-xs font-medium text-slate-700 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Arriving in 12 min
                      </p>
                    </div>
                  </div>

                  {/* Step 4: Pending */}
                  <div className="relative flex items-start gap-4 opacity-50">
                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center shrink-0 z-10 ring-4 ring-white">
                      <Circle className="w-3 h-3 fill-slate-300" />
                    </div>
                    <div className="pt-1">
                      <p className="font-bold text-slate-500 text-sm">Service Started</p>
                    </div>
                  </div>

                </div>
              </div>
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
}
