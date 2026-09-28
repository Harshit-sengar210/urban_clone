"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/animations/FadeUp";
import { FloatingObject } from "@/components/animations/FloatingObject";
import { Star, ShieldCheck } from "lucide-react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export function HowItWorksHero() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[calc(100vh-80px)] lg:min-h-[800px] flex items-center pt-24 pb-16 overflow-hidden bg-slate-50"
    >
      {/* Background Image Layer */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute inset-0 w-full h-full -z-20"
      >
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center lg:bg-[center_right] bg-no-repeat"
          style={{ backgroundImage: "url('/hero-bg.png')" }}
        />
      </motion.div>

      {/* Gradient Overlay for text readability on the left */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(
            to right,
            rgba(255,255,255,1) 0%,
            rgba(255,255,255,0.95) 40%,
            rgba(255,255,255,0.4) 65%,
            rgba(255,255,255,0) 100%
          )`
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10 w-full h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content Area */}
          <div className="max-w-xl">
            <FadeUp delay={0.0}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] mb-6">
                <span className="text-xs font-bold uppercase tracking-wider">Simple. Reliable. Done.</span>
              </div>
            </FadeUp>
            
            <FadeUp delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-slate-900 leading-[1.15]">
                Quality Home Services, <br />
                <span className="text-[var(--color-primary)]">Made Simple.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-700 mb-6">
                From booking to completion.
              </h2>
            </FadeUp>
            
            <FadeUp delay={0.3}>
              <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-[480px] leading-relaxed">
                Choose a service, pick a convenient time, and let a verified professional take care of the rest.
              </p>
            </FadeUp>
            
            <FadeUp delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button size="lg" className="h-14 px-8 text-base shadow-lg shadow-primary/20" asChild>
                  <Link href="/services">Book a Service →</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-base bg-white/50 backdrop-blur-sm border-slate-300 text-slate-700 hover:bg-slate-50" asChild>
                  <Link href="/services">Explore Services</Link>
                </Button>
              </div>
            </FadeUp>
          </div>

          {/* Right Visual Area (Visible mostly on Desktop/Tablet) */}
          <div className="relative hidden lg:block h-[600px]">
            {/* Floating Booking Card */}
            <div className="absolute top-[15%] right-[20%] z-20">
              <FloatingObject delay={0.2} yOffset={12} duration={5}>
                <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl w-[280px] flex flex-col gap-4 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-slate-100/50">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Book A Service</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 overflow-hidden relative">
                      <Image src="/icons/cleaning.jpg" alt="Cleaning" fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-base text-slate-900 leading-tight">Home Cleaning</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[var(--color-primary)] font-bold text-base">₹499</span>
                        <span className="flex items-center text-xs font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                          <Star className="w-3 h-3 fill-amber-500 mr-1" /> 4.8
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="w-full h-10 font-bold bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-sm mt-2">Book Now →</Button>
                </div>
              </FloatingObject>
            </div>

            {/* Floating Pro Card */}
            <div className="absolute bottom-[25%] left-[10%] z-30">
              <FloatingObject delay={0.5} yOffset={15} duration={6}>
                <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl w-[240px] flex flex-col gap-3 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-slate-100/50">
                  <div className="flex items-center gap-1.5 mb-1">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    <span className="text-xs font-bold text-green-600 uppercase tracking-widest">Verified Pro</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm bg-slate-100">
                      <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" alt="Ravi Kumar" fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-base text-slate-900 leading-tight">Ravi Kumar</p>
                      <p className="text-xs font-semibold text-slate-500 mt-1">1.2K+ jobs done</p>
                    </div>
                  </div>
                </div>
              </FloatingObject>
            </div>

            {/* Decorative Purple Shape */}
            <div className="absolute top-[30%] left-[30%] w-64 h-64 bg-purple-400/20 rounded-full blur-[80px] -z-10 animate-pulse duration-10000" />
          </div>
        </div>
      </div>
    </section>
  );
}
