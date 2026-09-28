"use client";

import Image from "next/image";
import { FadeUp } from "@/components/animations/FadeUp";
import { FloatingObject } from "@/components/animations/FloatingObject";
import { CheckCircle2, Star, ShieldCheck, ArrowDown } from "lucide-react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { GuidedServiceSearch } from "@/components/home/guided-search/GuidedServiceSearch";

export function HeroSection() {
  const containerRef = useRef(null);
  
  // Parallax for the background image
  const { scrollY } = useScroll();

  // We use raw scrollY because the element is sticky and won't move relative to the viewport
  // We estimate 800px as a typical viewport height for the parallax duration
  const yBackground = useTransform(scrollY, [0, 800], ["0%", "15%"]);
  const scaleHero = useTransform(scrollY, [0, 800], [1, 0.98]);
  const opacityHero = useTransform(scrollY, [0, 800], [1, 0.96]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100vh] h-full w-full flex items-center pt-24 pb-12 overflow-hidden bg-[#FAF9F6]"
    >
      {/* 
        Right Side Image with Organic Mask
        The image takes up ~60% of the right side.
        We use a clip path or mask-image to create a soft curved transition on the left edge.
      */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute top-0 right-0 w-full lg:w-[65%] h-full z-0 pointer-events-none"
      >
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            // Organic curved mask transition
            maskImage: "radial-gradient(ellipse 120% 140% at 85% 50%, black 40%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 120% 140% at 85% 50%, black 40%, transparent 75%)",
          }}
        >
          {/* Subtle entry scale animation */}
          <motion.div
            initial={{ scale: 1.04, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <Image 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop"
              alt="Premium modern luxury apartment interior"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Very subtle gradient overlay to ensure the floating card pops */}
            <div className="absolute inset-0 bg-black/5" />
          </motion.div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 w-full flex flex-col lg:flex-row justify-between h-full items-center">
        
        {/* Left Content Area */}
        <motion.div 
          style={{ scale: scaleHero, opacity: opacityHero }}
          className="w-full lg:w-[55%] max-w-xl relative flex flex-col justify-center origin-left"
        >
          
          <FadeUp delay={0.1}>
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Trusted Home Services</span>
            </div>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05] text-[#0A192F]">
              Better Homes<br />
              <span className="text-[var(--color-primary)] font-serif italic font-medium">Happier Lives</span>
            </h1>
          </FadeUp>
          
          <FadeUp delay={0.3}>
            <p className="text-lg text-slate-600 mb-10 max-w-[430px] leading-relaxed font-medium">
              Professional home services for a cleaner, safer and more comfortable home. All in one place.
            </p>
          </FadeUp>
          
          <FadeUp delay={0.4}>
            {/* The guided search component is kept as requested, updating its internal styles to fit */}
            <div className="w-full max-w-[500px]">
              <GuidedServiceSearch />
            </div>
          </FadeUp>

          <FadeUp delay={0.6}>
            <div className="flex flex-wrap items-center gap-6 mt-10">
              {[
                { icon: ShieldCheck, text: "Verified Professionals" },
                { icon: CheckCircle2, text: "Secure Payments" },
                { icon: Star, text: "Top Rated" }
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <feature.icon className="w-4 h-4 text-slate-400" strokeWidth={2.5} />
                  {feature.text}
                </div>
              ))}
            </div>
          </FadeUp>
        </motion.div>

        {/* Floating Pro Card (Right side overlay on image) */}
        <div className="hidden lg:block absolute bottom-[15%] right-[5%] z-20 pointer-events-none">
          <FadeUp delay={0.8} yOffset={30}>
            <FloatingObject delay={0.5} yOffset={8} duration={5}>
              <div className="bg-white/90 backdrop-blur-xl p-4 rounded-3xl w-[240px] flex items-center gap-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white/40 pointer-events-auto">
                <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 shadow-sm border border-slate-100">
                  <Image 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" 
                    alt="Professional" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="font-bold text-base text-[#0A192F]">Rohit S.</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <p className="text-[11px] font-semibold text-slate-500 leading-tight">AC Specialist</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-slate-700">4.9</span>
                  </div>
                </div>
              </div>
            </FloatingObject>
          </FadeUp>
        </div>

      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 text-slate-400 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={() => {
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        }}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
