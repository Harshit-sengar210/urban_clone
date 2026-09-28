"use client";

import { HOW_IT_WORKS_STEPS } from "@/data/howItWorks";
import { FadeUp } from "@/components/animations/FadeUp";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function FourStepsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Calculate line progress across all steps (0 to 1)
  const lineScaleX = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section 
      ref={containerRef}
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading 
          title="How UrbanClone Works"
          subtitle="From finding the right service to getting it done, everything happens in a few simple steps."
          centered
          className="mb-20"
        />

        <div className="relative">
          {/* Desktop Connection Line - Background */}
          <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-1 bg-slate-100 rounded-full" />
          
          {/* Desktop Connection Line - Foreground Animated */}
          <motion.div 
            className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-1 bg-[var(--color-primary)] rounded-full origin-left"
            style={{ scaleX: lineScaleX }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {HOW_IT_WORKS_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <FadeUp 
                  key={step.id} 
                  delay={index * 0.15} 
                  className="flex flex-col items-center text-center group"
                >
                  <div className={cn(
                    "w-32 h-32 rounded-3xl flex flex-col items-center justify-center mb-8 relative transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-xl",
                    step.color
                  )}>
                    {/* Number Badge */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center border-4 border-white shadow-sm z-20">
                      {index + 1}
                    </div>
                    
                    <div className="absolute inset-0 bg-white/20 rounded-3xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    
                    <Icon className="w-12 h-12 mb-2 relative z-10" />
                    
                    {/* Tiny subtitle inside icon box for extra flair */}
                    <span className="text-[10px] font-bold uppercase tracking-wider relative z-10 opacity-70">
                      Step 0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed max-w-[260px]">
                    {step.description}
                  </p>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
