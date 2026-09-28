"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeUp } from "@/components/animations/FadeUp";
import { Check, Search, Calendar, UserCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const TIMELINE_STEPS = [
  { id: 1, title: "Browse", desc: "Find the exact service you need", icon: Search },
  { id: 2, title: "Select", desc: "Choose details and check pricing", icon: Check },
  { id: 3, title: "Schedule", desc: "Pick your preferred date & time", icon: Calendar },
  { id: 4, title: "Assigned", desc: "A top-rated pro is assigned", icon: UserCheck },
  { id: 5, title: "Completed", desc: "Service delivered perfectly", icon: Star },
];

export function InteractiveTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const heightTransform = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section 
      ref={containerRef}
      className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading 
          title="From Click to Complete"
          subtitle="See what happens after you start your booking journey."
          centered
          className="mb-20"
        />

        <div className="max-w-3xl mx-auto relative pl-8 md:pl-0">
          
          {/* Timeline Line Base */}
          <div className="absolute left-[39px] md:left-[50%] top-0 bottom-0 w-1 bg-slate-200 rounded-full md:-translate-x-1/2" />
          
          {/* Timeline Line Animated Fill */}
          <motion.div 
            className="absolute left-[39px] md:left-[50%] top-0 w-1 bg-[var(--color-primary)] rounded-full md:-translate-x-1/2 origin-top"
            style={{ height: heightTransform }}
          />

          <div className="flex flex-col gap-24 relative z-10">
            {TIMELINE_STEPS.map((step, index) => {
              // Calculate threshold for each step to light up
              const stepThreshold = index / (TIMELINE_STEPS.length - 1);
              
              return (
                <TimelineItem 
                  key={step.id}
                  step={step}
                  index={index}
                  progress={smoothProgress}
                  threshold={stepThreshold}
                />
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

function TimelineItem({ 
  step, 
  index, 
  progress, 
  threshold 
}: { 
  step: typeof TIMELINE_STEPS[0], 
  index: number, 
  progress: any, 
  threshold: number 
}) {
  const Icon = step.icon;
  const isEven = index % 2 === 0;

  // Use motion hooks to derive state
  const isActive = useTransform(progress, (p: number) => p >= threshold - 0.1);
  const colorTransform = useTransform(
    isActive,
    (active: boolean) => active ? "var(--color-primary)" : "#94a3b8" // slate-400
  );
  const bgTransform = useTransform(
    isActive,
    (active: boolean) => active ? "#4F46E5" : "#f8fafc" // primary vs slate-50
  );
  const textTransform = useTransform(
    isActive,
    (active: boolean) => active ? "#ffffff" : "#94a3b8"
  );
  const scaleTransform = useTransform(
    isActive,
    (active: boolean) => active ? 1.1 : 1
  );

  return (
    <div className={cn(
      "flex items-center w-full",
      isEven ? "md:flex-row-reverse" : "md:flex-row"
    )}>
      {/* Spacer for empty side on desktop */}
      <div className="hidden md:block md:w-1/2" />
      
      {/* Timeline Node */}
      <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 z-20">
        <motion.div 
          className="w-10 h-10 rounded-full border-4 border-white shadow-md flex items-center justify-center transition-colors duration-500"
          style={{ backgroundColor: bgTransform, color: textTransform, scale: scaleTransform }}
        >
          <Icon className="w-4 h-4" />
        </motion.div>
      </div>

      {/* Content */}
      <div className={cn(
        "w-full md:w-1/2 pl-14 pr-0",
        isEven ? "md:pr-14 md:pl-0 md:text-right" : "md:pl-14 md:pr-0 md:text-left"
      )}>
        <FadeUp delay={0.2} yOffset={20}>
          <motion.div 
            className="bg-white p-6 rounded-2xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] border border-slate-100 transition-all duration-500"
            style={{ 
              borderColor: useTransform(isActive, (active: boolean) => active ? "rgba(79,70,229,0.3)" : "rgba(241,245,249,1)"),
              y: useTransform(isActive, (active: boolean) => active ? 0 : 10),
              opacity: useTransform(isActive, (active: boolean) => active ? 1 : 0.6),
            }}
          >
            <h4 className="text-xl font-bold text-slate-900 mb-2">
              <span className="text-[var(--color-primary)] font-black opacity-30 mr-2 text-2xl">0{step.id}</span>
              {step.title}
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              {step.desc}
            </p>
          </motion.div>
        </FadeUp>
      </div>
    </div>
  );
}
