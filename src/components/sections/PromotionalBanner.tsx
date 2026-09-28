"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FadeUp } from "@/components/animations/FadeUp";

export function PromotionalBanner() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section className="py-24 bg-[#FAF9F6]">
      <div className="container mx-auto px-4 md:px-8">
        
        <div ref={containerRef} className="relative rounded-[2.5rem] overflow-hidden bg-[#0A192F] flex flex-col md:flex-row shadow-2xl">
          
          {/* Left Content */}
          <div className="w-full md:w-1/2 p-10 md:p-16 lg:p-24 flex flex-col justify-center relative z-10">
            <FadeUp delay={0.1}>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-bold text-white uppercase tracking-widest">Special Offers</span>
              </div>
            </FadeUp>
            
            <FadeUp delay={0.2}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-[1.15]">
                Get Your Home <br/>
                <span className="text-[var(--color-primary-light)]">Ready.</span>
              </h2>
            </FadeUp>
            
            <FadeUp delay={0.3}>
              <p className="text-slate-300 text-lg font-medium leading-relaxed mb-10 max-w-sm">
                Book premium cleaning, repair and maintenance services for your home. Experience the UrbanClone difference.
              </p>
            </FadeUp>
            
            <FadeUp delay={0.4}>
              <Link 
                href="/offers" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[var(--color-primary)] text-white font-bold hover:bg-[var(--color-primary-hover)] transition-colors group self-start shadow-lg shadow-[var(--color-primary)]/25"
              >
                Explore Offers
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeUp>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-1/2 h-[400px] md:h-auto relative overflow-hidden">
            <motion.div style={{ y: imageY }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
              <Image 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
                alt="Premium House Exterior"
                fill
                className="object-cover"
              />
            </motion.div>
            
            {/* Soft gradient to blend with dark blue side */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0A192F] via-transparent to-transparent w-full h-full opacity-80" />
            
            {/* Offer Badge (Demo) */}
            <motion.div 
              initial={{ scale: 0, rotate: -45 }}
              whileInView={{ scale: 1, rotate: 12 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.6 }}
              className="absolute top-10 right-10 w-24 h-24 rounded-full bg-amber-400 flex flex-col items-center justify-center shadow-2xl border-4 border-[#0A192F] z-20"
            >
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-widest leading-none">Up To</span>
              <span className="text-2xl font-extrabold text-amber-900 leading-tight">20%</span>
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-widest leading-none">Off</span>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
