"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, ShieldCheck, CheckCircle2, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FadeUp } from "@/components/animations/FadeUp";
import { cn } from "@/lib/utils";

type TrustService = {
  id: string;
  name: string;
  description: string;
  image: string;
  startingPrice?: number;
  proName: string;
  proRole: string;
  proRating: string;
  proImage: string;
};

const TRUST_SERVICES: TrustService[] = [
  {
    id: "cleaning",
    name: "Home Cleaning",
    description: "Deep cleaning for every room",
    startingPrice: 499,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop",
    proName: "Ravi Sharma",
    proRole: "Cleaning Specialist",
    proRating: "4.9",
    proImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "ac",
    name: "AC Repair",
    description: "Reliable cooling, professionally handled",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
    proName: "Amit Kumar",
    proRole: "AC Expert",
    proRating: "4.8",
    proImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "plumbing",
    name: "Plumbing",
    description: "Fix leaks before they become problems",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
    proName: "Sanjay Patel",
    proRole: "Master Plumber",
    proRating: "4.7",
    proImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "kitchen",
    name: "Appliance Repair",
    description: "Care for the spaces you use every day",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=800&auto=format&fit=crop",
    proName: "Neha Gupta",
    proRole: "Appliance Tech",
    proRating: "4.9",
    proImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  }
];

export function WhyUrbanClone() {
  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10px", "10px"]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], ["-2deg", "0deg"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  // Autoplay logic
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TRUST_SERVICES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleNext = () => setActiveIdx((prev) => (prev + 1) % TRUST_SERVICES.length);
  const handlePrev = () => setActiveIdx((prev) => (prev - 1 + TRUST_SERVICES.length) % TRUST_SERVICES.length);
  const handleSelect = (idx: number) => setActiveIdx(idx);

  const activeData = TRUST_SERVICES[activeIdx];

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-[#FAF9F6] relative min-h-auto md:min-h-[650px] flex items-center">
      <div className="container mx-auto px-4 md:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 w-full">
          
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-[48%] max-w-xl">
            <FadeUp delay={0.1}>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 block">
                Why UrbanClone
              </span>
            </FadeUp>
            
            <FadeUp delay={0.2}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A192F] mb-6 leading-[1.15]">
                Trusted by homes that <br className="hidden lg:block"/>
                <span className="text-[var(--color-primary)]">value quality.</span>
              </h2>
            </FadeUp>
            
            <FadeUp delay={0.3}>
              <p className="text-slate-600 text-lg font-medium leading-relaxed mb-8 max-w-md">
                We believe your home deserves the best care. That's why we partner exclusively with verified, top-rated professionals who treat your space with the respect it deserves.
              </p>
            </FadeUp>
            
            <FadeUp delay={0.4}>
              <Link 
                href="/about" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0A192F] text-white font-bold hover:bg-[var(--color-primary)] transition-all duration-300 shadow-md hover:shadow-lg group"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeUp>

            {/* HORIZONTAL STATS */}
            <FadeUp delay={0.6}>
              <div className="flex items-center gap-6 mt-16 pt-8 border-t border-slate-200/60">
                <div>
                  <div className="text-3xl font-extrabold text-[#0A192F]">10K+</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Happy Customers</div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div>
                  <div className="text-3xl font-extrabold text-[#0A192F]">4.8/5</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Average Rating</div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div>
                  <div className="text-3xl font-extrabold text-[#0A192F]">500+</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Professionals</div>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* RIGHT VISUAL STAGE */}
          <div 
            className="w-full lg:w-[52%] flex flex-col md:flex-row items-center md:items-stretch gap-6 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            
            {/* SIDE SERVICE SELECTOR */}
            <FadeUp delay={0.5} className="hidden md:flex flex-col justify-center gap-4 pr-6 shrink-0 z-20">
              {TRUST_SERVICES.map((srv, idx) => (
                <button
                  key={srv.id}
                  onClick={() => handleSelect(idx)}
                  className="flex items-center gap-3 text-left group outline-none"
                  aria-label={`Select ${srv.name}`}
                  aria-selected={activeIdx === idx}
                >
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full transition-colors duration-300",
                    activeIdx === idx ? "bg-[var(--color-primary)]" : "bg-slate-200 group-hover:bg-slate-300"
                  )} />
                  <span className={cn(
                    "text-sm font-bold transition-colors duration-300",
                    activeIdx === idx ? "text-[var(--color-primary)]" : "text-slate-400 group-hover:text-slate-600"
                  )}>
                    {srv.name}
                  </span>
                </button>
              ))}
            </FadeUp>

            {/* MAIN IMAGE CONTAINER */}
            <div className="relative w-full max-w-[560px] aspect-[4/3] md:aspect-[1.15/1] mx-auto z-10 shrink-0">
              {/* Soft Lavender Background Layer */}
              <motion.div 
                style={{ y: bgY }}
                className="absolute -top-4 -right-4 w-full h-full bg-indigo-50 rounded-[32px] -z-10"
              />

              <motion.div 
                style={{ y: imageY, rotate: imageRotate }} 
                className="relative w-full h-full rounded-[28px] md:rounded-[36px] overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.08)] border border-slate-100/50"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeData.id}
                    initial={{ scale: 1.04, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.98, opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image 
                      src={activeData.image} 
                      alt={activeData.name} 
                      fill 
                      className="object-cover" 
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* FLOATING SERVICE CARD (Lower Left) */}
              <FadeUp delay={0.6} className="absolute -left-2 md:-left-8 -bottom-4 md:bottom-8 z-30 pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeData.id}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white/95 backdrop-blur-sm p-4 md:p-5 rounded-[20px] shadow-[0_12px_30px_-10px_rgba(0,0,0,0.1)] border border-white min-w-[220px]"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                      <span className="text-sm font-bold text-[#0A192F]">{activeData.name}</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-snug mb-2">{activeData.description}</p>
                    {activeData.startingPrice && (
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Starting from</span>
                        <span className="text-xs font-bold text-[#0A192F]">₹{activeData.startingPrice}</span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </FadeUp>

              {/* FLOATING PRO CARD (Lower Right) */}
              <FadeUp delay={0.7} className="absolute -right-2 md:-right-6 -bottom-16 md:bottom-20 z-30 pointer-events-none">
                <motion.div 
                  animate={{ y: [0, -6, 0] }} 
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-[0_12px_30px_-10px_rgba(0,0,0,0.1)] border border-white flex items-center gap-3 w-[200px]"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeData.proName}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-100"
                    >
                      <Image src={activeData.proImage} alt={activeData.proName} fill className="object-cover" />
                    </motion.div>
                  </AnimatePresence>
                  
                  <div className="flex-1 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeData.proName}
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="font-bold text-[#0A192F] text-xs truncate">{activeData.proName}</div>
                        <div className="text-[9px] font-semibold text-slate-500 truncate">{activeData.proRole}</div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          <span className="text-[10px] font-bold text-slate-700">{activeData.proRating}</span>
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500 ml-1" />
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </FadeUp>
            </div>

            {/* MOBILE SERVICE INDICATORS & CONTROLS */}
            <div className="flex md:hidden flex-col items-center mt-12 w-full">
              <div className="flex items-center gap-4">
                <button onClick={handlePrev} className="p-2 text-slate-400 hover:text-[var(--color-primary)] transition-colors" aria-label="Previous">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                  {TRUST_SERVICES.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        activeIdx === idx ? "w-6 bg-[var(--color-primary)]" : "w-1.5 bg-slate-200"
                      )}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
                <button onClick={handleNext} className="p-2 text-slate-400 hover:text-[var(--color-primary)] transition-colors" aria-label="Next">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* DESKTOP CONTROLS */}
            <div className="hidden md:flex absolute -bottom-10 left-1/2 -translate-x-1/2 items-center gap-4 z-20">
              <button onClick={handlePrev} className="p-1.5 text-slate-400 hover:text-[var(--color-primary)] transition-colors group" aria-label="Previous">
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <div className="flex items-center gap-1.5">
                {TRUST_SERVICES.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={cn(
                      "h-1 rounded-full transition-all duration-300",
                      activeIdx === idx ? "w-4 bg-[var(--color-primary)]" : "w-1.5 bg-slate-300 hover:bg-slate-400"
                    )}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <button onClick={handleNext} className="p-1.5 text-slate-400 hover:text-[var(--color-primary)] transition-colors group" aria-label="Next">
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
