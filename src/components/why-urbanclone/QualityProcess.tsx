"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Search, PenTool, MessageSquare, LineChart } from "lucide-react";

export function QualityProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    {
      number: "01",
      title: "Book",
      description: "Customer selects a service.",
      icon: Search
    },
    {
      number: "02",
      title: "Service",
      description: "Professional completes the requested service.",
      icon: PenTool
    },
    {
      number: "03",
      title: "Review",
      description: "Customer shares feedback and rating.",
      icon: MessageSquare
    },
    {
      number: "04",
      title: "Improve",
      description: "Feedback helps improve the experience.",
      icon: LineChart
    }
  ];

  return (
    <section ref={containerRef} className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary)] rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Every Service Is Part <br className="hidden md:block" />of a Bigger Experience.
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Animated Progress Line Background (Desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-1 bg-white/10 rounded-full" />
          
          {/* Animated Progress Line Foreground (Desktop) */}
          <motion.div 
            style={{ width: lineWidth }}
            className="hidden md:block absolute top-[60px] left-[10%] h-1 bg-gradient-to-r from-[var(--color-primary)] to-blue-400 rounded-full z-0 origin-left"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-4 relative z-10">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
                  <div className="absolute inset-0 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-2 bg-slate-800 rounded-full border border-white/10 flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-[var(--color-primary)]" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-white text-slate-900 font-black flex items-center justify-center text-sm shadow-lg border-4 border-slate-900">
                    {step.number}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-400 font-medium max-w-[200px] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
