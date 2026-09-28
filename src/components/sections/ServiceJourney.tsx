"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Star, Clock, ShieldCheck, MapPin, Search } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { cn } from "@/lib/utils";

type JourneyStep = {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
};

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: "step-1",
    number: "01",
    title: "Tell us what you need",
    description: "Select your service, choose a time, and let us know your location. It takes less than a minute.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "step-2",
    number: "02",
    title: "Meet the right professional",
    description: "We match you with a verified, highly-rated expert perfectly suited for your specific request.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "step-3",
    number: "03",
    title: "Stay in control",
    description: "Track your professional's arrival, communicate directly, and manage everything seamlessly.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "step-4",
    number: "04",
    title: "Enjoy a job well done",
    description: "Relax in your beautifully maintained home. Payment is simple and satisfaction is guaranteed.",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=800&auto=format&fit=crop",
  }
];

export function ServiceJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Natural scroll mapping
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      // Map 0-1 to 0-3 smoothly
      let step = 0;
      if (latest > 0.75) step = 3;
      else if (latest > 0.5) step = 2;
      else if (latest > 0.25) step = 1;
      
      setActiveStep(step);
    });
  }, [scrollYProgress]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // max shift of 8px
    const x = (clientX / innerWidth - 0.5) * 16;
    const y = (clientY / innerHeight - 0.5) * 16;
    setMousePos({ x, y });
  };

  const handleStepClick = (idx: number) => {
    setActiveStep(idx);
  };

  const activeData = JOURNEY_STEPS[activeStep];

  return (
    <section 
      ref={containerRef} 
      className="py-24 md:py-32 bg-[#FAF9F6] relative min-h-auto md:min-h-[760px] flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Decorative Background Arc */}
      <div className="absolute right-0 top-0 w-[800px] h-[800px] bg-indigo-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-12 w-full">
          
          {/* LEFT: EDITORIAL CONTENT & STEPS */}
          <div className="w-full lg:w-[45%] max-w-xl flex flex-col justify-center">
            <FadeUp delay={0.1}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-slate-300" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Your Service Journey
                </span>
              </div>
            </FadeUp>
            
            <FadeUp delay={0.2}>
              <h2 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-[#0A192F] mb-4 leading-[1.1]">
                From "I need help" <br />
                to <span className="text-[var(--color-primary)]">"all taken care of."</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="text-slate-500 font-medium text-sm tracking-widest uppercase mb-12">
                Designed for real homes
              </p>
            </FadeUp>

            {/* Steps List */}
            <FadeUp delay={0.4} className="flex flex-col gap-6 relative">
              {/* Vertical progress line background */}
              <div className="absolute left-[11px] top-4 bottom-4 w-px bg-slate-200 -z-10" />
              
              {/* Active progress line foreground */}
              <motion.div 
                className="absolute left-[11px] top-4 w-px bg-[var(--color-primary)] -z-10 origin-top"
                animate={{ height: `${(activeStep / (JOURNEY_STEPS.length - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />

              {JOURNEY_STEPS.map((step, idx) => {
                const isActive = activeStep === idx;
                
                return (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(idx)}
                    className="flex gap-6 text-left group outline-none"
                    aria-current={isActive ? "step" : undefined}
                  >
                    <div className="flex flex-col items-center pt-1 shrink-0">
                      <div className={cn(
                        "w-[23px] h-[23px] rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-500 border-2",
                        isActive 
                          ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white scale-110" 
                          : "bg-[#FAF9F6] border-slate-300 text-slate-400 group-hover:border-slate-400"
                      )}>
                        {step.number}
                      </div>
                    </div>
                    
                    <div className="flex flex-col pt-0.5">
                      <span className={cn(
                        "text-lg font-bold transition-colors duration-500",
                        isActive ? "text-[#0A192F]" : "text-slate-400 group-hover:text-slate-600"
                      )}>
                        {step.title}
                      </span>
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="text-slate-600 text-sm font-medium leading-relaxed max-w-sm">
                              {step.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </FadeUp>

            <FadeUp delay={0.6} className="mt-12">
              <Link 
                href="/how-it-works" 
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0A192F] hover:text-[var(--color-primary)] transition-colors group"
              >
                Explore How It Works
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeUp>
          </div>

          {/* RIGHT: VISUAL STAGE */}
          <div className="w-full lg:w-[50%] relative flex justify-center items-center">
            
            <FadeUp delay={0.5} className="w-full relative max-w-[560px] aspect-[4/3] md:aspect-[1.1/1]">
              {/* Main Image Container */}
              <motion.div 
                animate={{ x: mousePos.x * -0.5, y: mousePos.y * -0.5 }}
                className="relative w-full h-full rounded-[32px] overflow-hidden shadow-2xl border border-white/50 bg-slate-100"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeData.id}
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image 
                      src={activeData.image}
                      alt={activeData.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/5" />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* DYNAMIC FLOATING UI LAYERS */}
              <AnimatePresence mode="wait">
                
                {/* STATE 01: Booking UI */}
                {activeStep === 0 && (
                  <motion.div
                    key="ui-01"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: mousePos.y, x: mousePos.x, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute -left-4 md:-left-12 bottom-12 w-[260px] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-white"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-600">New Delhi, 110001</span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <Search className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-600">Home Cleaning</span>
                      </div>
                      <div className="bg-[var(--color-primary)] text-white text-xs font-bold py-2.5 rounded-lg text-center mt-1">
                        Find Professional
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STATE 02: Professional Profile */}
                {activeStep === 1 && (
                  <motion.div
                    key="ui-02"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: mousePos.y, x: mousePos.x, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute -right-2 md:-right-8 top-12 w-[220px] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-white flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-white shadow-sm relative">
                      <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" alt="Pro" fill className="object-cover" />
                    </div>
                    <h4 className="font-bold text-[#0A192F] text-sm">Ravi Sharma</h4>
                    <p className="text-[10px] text-slate-500 font-semibold mb-2">Cleaning Specialist</p>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-bold text-slate-700">4.9</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 ml-1" />
                    </div>
                  </motion.div>
                )}

                {/* STATE 03: Tracking Status */}
                {activeStep === 2 && (
                  <motion.div
                    key="ui-03"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: mousePos.y, x: mousePos.x, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute -left-2 md:-left-8 bottom-16 w-[240px] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-5 border border-white"
                  >
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Booking #UC1042</div>
                    <div className="flex gap-3 items-start relative">
                      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-200 -z-10" />
                      <div className="flex flex-col gap-[18px]">
                        <div className="w-4 h-4 rounded-full bg-[var(--color-primary)] flex items-center justify-center shadow-[0_0_0_3px_white]">
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        </div>
                        <div className="w-4 h-4 rounded-full bg-slate-200 border-[3px] border-white" />
                      </div>
                      <div className="flex flex-col gap-2 pt-0.5">
                        <div className="text-xs font-bold text-[#0A192F] leading-none">Professional assigned</div>
                        <div className="text-xs font-semibold text-slate-400 leading-none">On the way</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STATE 04: Completed State */}
                {activeStep === 3 && (
                  <motion.div
                    key="ui-04"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: mousePos.y, x: mousePos.x, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute -right-2 md:-right-8 -bottom-6 w-[250px] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-5 border border-white"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0A192F]">Service completed</div>
                        <div className="text-[10px] font-semibold text-slate-500">Home Cleaning • ₹499</div>
                      </div>
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center mb-2">Rate your experience</div>
                    <div className="flex justify-center gap-1">
                      {[1, 2, 3, 4, 5].map((s, i) => (
                        <motion.div 
                          key={s} 
                          initial={{ scale: 0 }} 
                          animate={{ scale: 1 }} 
                          transition={{ delay: i * 0.1, type: "spring" }}
                        >
                          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </FadeUp>
            
            {/* Scroll Progress indicator (small detail) */}
            <div className="hidden lg:flex absolute -right-12 top-1/2 -translate-y-1/2 flex-col gap-2">
              <span className="text-[10px] font-bold text-slate-400 mb-2">0{activeStep + 1}</span>
              {JOURNEY_STEPS.map((_, i) => (
                <div key={i} className={cn(
                  "w-1 rounded-full transition-all duration-300",
                  activeStep === i ? "h-6 bg-[var(--color-primary)]" : "h-2 bg-slate-200"
                )} />
              ))}
              <span className="text-[10px] font-bold text-slate-400 mt-2">04</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
