"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "@/components/animations/FadeUp";
import { FloatingObject } from "@/components/animations/FloatingObject";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Star, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function FeaturedService() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="bg-[#0A0F1E] rounded-[2.5rem] p-8 md:p-12 lg:p-16 relative overflow-hidden">
          
          {/* Decorative background for the dark card */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            
            <motion.div className="max-w-xl text-white">
              <FadeUp delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Service of the Month</span>
                </div>
              </FadeUp>
              
              <FadeUp delay={0.2}>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Premium Home <br className="hidden md:block" />
                  Deep Cleaning
                </h2>
              </FadeUp>
              
              <FadeUp delay={0.3}>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                  Transform your living space with our top-tier deep cleaning service. Verified professionals use hospital-grade supplies to make every corner shine.
                </p>
              </FadeUp>
              
              <FadeUp delay={0.4}>
                <ul className="space-y-4 mb-10">
                  {["100% Satisfaction Guarantee", "Hospital-grade cleaning supplies", "Vetted & trained professionals"].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-[var(--color-primary-light)] shrink-0" />
                      <span className="text-slate-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeUp>
              
              <FadeUp delay={0.5}>
                <div className="flex flex-wrap items-center gap-6">
                  <Button size="lg" className="h-14 px-8 text-base bg-white text-[#0A0F1E] hover:bg-slate-200 shadow-lg shadow-white/10" asChild>
                    <Link href="/services/deep-cleaning">Explore Service →</Link>
                  </Button>
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-sm">Starting from</span>
                    <span className="text-2xl font-bold text-white">₹2,499</span>
                  </div>
                </div>
              </FadeUp>
            </motion.div>

            {/* Right Visual */}
            <div className="relative h-[400px] lg:h-[500px] w-full mt-8 lg:mt-0">
              <FadeUp delay={0.3} duration={1} className="absolute inset-0">
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
                  <Image
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop"
                    alt="Premium Deep Cleaning"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </FadeUp>
              
              <FloatingObject delay={0.8} yOffset={15} duration={5} className="absolute -top-6 -right-6 z-20">
                <div className="glass p-3 rounded-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  </div>
                  <div>
                    <p className="font-bold text-[var(--color-foreground)] leading-none mb-1">4.9/5</p>
                    <p className="text-xs text-[var(--color-muted)] font-medium">10k+ Reviews</p>
                  </div>
                </div>
              </FloatingObject>

              <FloatingObject delay={1.2} yOffset={10} duration={6} className="absolute -bottom-6 -left-6 z-20">
                <div className="glass p-4 rounded-xl flex items-center gap-3 w-48">
                  <Clock className="w-6 h-6 text-[var(--color-primary)]" />
                  <div>
                    <p className="font-bold text-[var(--color-foreground)] leading-none mb-1">4-5 Hours</p>
                    <p className="text-xs text-[var(--color-muted)] font-medium">Average Duration</p>
                  </div>
                </div>
              </FloatingObject>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
