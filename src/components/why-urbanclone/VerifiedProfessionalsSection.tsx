"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Check, Star } from "lucide-react";
import Image from "next/image";

export function VerifiedProfessionalsSection() {
  return (
    <section className="py-20 bg-[var(--color-background)] overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left: Visual mockup */}
          <div className="w-full lg:w-1/2 relative flex justify-center">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-gradient-to-tr from-blue-50 to-indigo-50 rounded-full -z-10" />
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative w-full max-w-sm bg-white rounded-[2rem] p-6 shadow-2xl shadow-indigo-900/10 border border-slate-100 z-10"
            >
              {/* Profile Header */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md">
                  <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" alt="Professional" fill className="object-cover" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center translate-x-1/4 translate-y-1/4 shadow-sm">
                    <BadgeCheck className="w-4 h-4 text-blue-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-1">Ravi Kumar</h3>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  Verified Professional
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 p-3 rounded-2xl text-center">
                  <div className="flex items-center justify-center gap-1 text-lg font-black text-[var(--color-foreground)] mb-0.5">
                    4.8 <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Rating</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl text-center">
                  <div className="text-lg font-black text-[var(--color-foreground)] mb-0.5">
                    1,200+
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Jobs Done</p>
                </div>
              </div>

              {/* Services */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Services Provided</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg">Cleaning</span>
                  <span className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg">Home Maintenance</span>
                </div>
              </div>
            </motion.div>
            
            {/* Floating decoration */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 top-1/4 bg-white p-3 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-slate-50"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <BadgeCheck className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs font-black text-[var(--color-foreground)] uppercase">Identity Verified</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Content */}
          <div className="w-full lg:w-1/2">
            <span className="inline-block text-[10px] font-black text-[var(--color-primary)] uppercase tracking-widest mb-4">
              01 — VERIFIED PROFESSIONALS
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-foreground)] tracking-tight mb-6 leading-tight">
              People You Can Feel <br className="hidden lg:block" />Confident Booking.
            </h2>
            <p className="text-lg text-[var(--color-muted)] mb-8 max-w-lg leading-relaxed">
              We focus on building a network of professionals with the right experience and service standards, so you can invite them into your home with peace of mind.
            </p>

            <ul className="space-y-5">
              {[
                "Professional verification before onboarding",
                "Minimum service experience requirements",
                "Continuous monitoring through customer feedback"
              ].map((point, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-6 h-6 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 font-bold" />
                  </div>
                  <span className="text-[var(--color-foreground)] font-medium text-lg">{point}</span>
                </motion.li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
