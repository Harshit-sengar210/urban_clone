"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyUrbanClone } from "@/components/sections/WhyUrbanClone";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ServiceJourney } from "@/components/sections/ServiceJourney";
import { PromotionalBanner } from "@/components/sections/PromotionalBanner";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";
export default function Home() {
  return (
    <motion.div 
      className="flex flex-col min-h-screen bg-[#FAF9F6]"
      initial={{ opacity: 0.96, scale: 1.01, y: 5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.6, ease: "easeOut" }}
    >
      {/* Hero Scroll Scene */}
      <div className="relative">
        <div className="sticky top-0 z-10 h-[100vh]">
          <HeroSection />
        </div>
        
        {/* The ServicesSection will naturally scroll up and cover the sticky HeroSection */}
        <div className="relative z-20 bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.05)] md:shadow-[0_-30px_60px_rgba(0,0,0,0.08)] rounded-t-[32px] md:rounded-t-[48px] border-t border-slate-100">
          <ServicesSection />
        </div>
      </div>
      
      <WhyUrbanClone />
      <HowItWorks />
      <ServiceJourney />
      <PromotionalBanner />
      <Testimonials />
      <FinalCTA />
    </motion.div>
  );
}
