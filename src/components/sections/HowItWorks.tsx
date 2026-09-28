"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Search, CalendarCheck } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    number: "01",
    title: "Enter Pincode",
    description: "Tell us where you are to find services available in your area.",
    icon: MapPin,
  },
  {
    number: "02",
    title: "Choose Service",
    description: "Select from our wide range of trusted home services.",
    icon: Search,
  },
  {
    number: "03",
    title: "Book & Relax",
    description: "Pick a time, confirm booking, and our pros will handle the rest.",
    icon: CalendarCheck,
  }
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress through the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Map scroll progress to the drawing of the line (0% to 100%)
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-32 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="text-center mb-24">
          <FadeUp delay={0.1}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">
              How It Works
            </span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0A192F] mb-6">
              Booking is Simple
            </h2>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-slate-600 font-medium text-lg max-w-xl mx-auto">
              Get your home services sorted in just a few clicks. No phone calls, no waiting, no stress.
            </p>
          </FadeUp>
        </div>

        {/* Desktop Process (Horizontal) */}
        <div className="hidden md:block relative max-w-5xl mx-auto h-[400px]">
          
          {/* Background Track Line */}
          <div className="absolute top-12 left-[10%] right-[10%] h-[1px] bg-slate-100" />
          
          {/* Animated Fill Line */}
          <div className="absolute top-12 left-[10%] right-[10%] h-[1px] flex">
            <motion.div 
              style={{ width: lineWidth }} 
              className="h-full bg-[var(--color-primary)] origin-left"
            />
          </div>

          <div className="relative grid grid-cols-3 gap-8">
            {STEPS.map((step, idx) => {
              // Calculate activation threshold based on index (0, 0.5, 1)
              const threshold = idx * 0.45;
              const opacity = useTransform(scrollYProgress, [threshold - 0.1, threshold], [0.3, 1]);
              const y = useTransform(scrollYProgress, [threshold - 0.1, threshold], [20, 0]);
              const scale = useTransform(scrollYProgress, [threshold - 0.1, threshold], [0.9, 1]);
              const color = useTransform(
                scrollYProgress, 
                [threshold - 0.1, threshold], 
                ["#E2E8F0", "#4F46E5"] // slate-200 to primary
              );
              const bgColor = useTransform(
                scrollYProgress, 
                [threshold - 0.1, threshold], 
                ["#F8FAFC", "#EEF2FF"] // slate-50 to primary-50
              );

              return (
                <div key={step.number} className="flex flex-col items-center text-center">
                  <motion.div 
                    style={{ borderColor: color, backgroundColor: bgColor, scale }}
                    className="w-24 h-24 rounded-full border-2 flex items-center justify-center relative z-10 mb-8 bg-white transition-shadow shadow-sm"
                  >
                    <step.icon className="w-8 h-8 text-[#0A192F]" />
                    <motion.div 
                      style={{ backgroundColor: color }}
                      className="absolute -bottom-3 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider"
                    >
                      Step {step.number}
                    </motion.div>
                  </motion.div>
                  
                  <motion.div style={{ opacity, y }}>
                    <h3 className="text-xl font-bold text-[#0A192F] mb-3">{step.title}</h3>
                    <p className="text-sm font-medium text-slate-500 px-4">{step.description}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Process (Vertical Sequence) */}
        <div className="md:hidden flex flex-col gap-12 relative">
          <div className="absolute top-10 bottom-10 left-[39px] w-[1px] bg-slate-100" />
          
          {STEPS.map((step, idx) => (
            <div key={step.number} className="relative flex gap-6">
              <div className="w-20 h-20 rounded-full border-2 border-[var(--color-primary)] bg-indigo-50 flex flex-col items-center justify-center shrink-0 z-10 relative">
                <step.icon className="w-6 h-6 text-[#0A192F] mb-1" />
                <span className="text-[10px] font-bold text-[var(--color-primary)]">{step.number}</span>
              </div>
              <div className="pt-2">
                <h3 className="text-lg font-bold text-[#0A192F] mb-2">{step.title}</h3>
                <p className="text-sm font-medium text-slate-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
