"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/animations/FadeUp";
import { FloatingObject } from "@/components/animations/FloatingObject";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

export function ServiceCTA() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={containerRef} className="relative py-24 lg:py-32 overflow-hidden bg-[#0F172A]">
      {/* Parallax Background Visual */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 opacity-40 mix-blend-overlay">
        <Image 
          src="https://images.unsplash.com/photo-1600607687959-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Home"
          fill
          className="object-cover"
        />
      </motion.div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] to-transparent opacity-80" />

      {/* Decorative Blobs */}
      <FloatingObject delay={0} yOffset={20} duration={8} className="absolute top-10 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]" />
      <FloatingObject delay={2} yOffset={30} duration={10} className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          
          <FadeUp delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-8">
              <ShieldCheck className="w-5 h-5 text-green-400" />
              <span className="text-sm font-semibold text-white tracking-wide uppercase">Trusted by 10,000+ Homes</span>
            </div>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Your Home Deserves <br className="hidden md:block" />
              the Best Care.
            </h2>
          </FadeUp>
          
          <FadeUp delay={0.3}>
            <p className="text-lg md:text-xl text-indigo-100/80 mb-10 leading-relaxed max-w-2xl mx-auto">
              Book trusted professionals for your home in just a few clicks. Top-rated experts, transparent pricing, and absolute peace of mind.
            </p>
          </FadeUp>
          
          <FadeUp delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-white text-[#0F172A] hover:bg-slate-200 shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]" asChild>
                <Link href="/services">Explore Services</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30 backdrop-blur-sm" asChild>
                <Link href="#how-it-works">How It Works</Link>
              </Button>
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
