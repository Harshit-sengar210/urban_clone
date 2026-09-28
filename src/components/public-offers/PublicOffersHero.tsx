"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PublicOffersHero() {
  const fadeUpVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-[var(--color-background)]">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-bl from-purple-50/50 to-transparent -z-10" />
      <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[var(--color-primary)]/5 blur-[120px] -z-10" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerVariants}
            className="max-w-2xl"
          >
            <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Exclusive Deals
            </motion.div>
            
            <motion.h1 variants={fadeUpVariants} className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--color-foreground)] tracking-tight leading-[1.1] mb-6">
              Save More on <br />
              <span className="text-[var(--color-primary)]">Every Service.</span>
            </motion.h1>
            
            <motion.p variants={fadeUpVariants} className="text-lg md:text-xl text-[var(--color-muted)] mb-8 max-w-lg leading-relaxed">
              Discover special offers, first-booking discounts, and rewards designed to make your everyday services more affordable.
            </motion.p>
            
            <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row items-center gap-4">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base shadow-lg shadow-primary/20 group" asChild>
                <Link href="#featured">
                  Explore Offers
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base" asChild>
                <Link href="/services">View Services</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Visual Composition */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center lg:justify-end"
          >
            {/* Main Floating Coupon */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-20 w-[90%] max-w-[340px] bg-white rounded-3xl p-6 shadow-2xl shadow-indigo-900/10 border border-slate-100"
            >
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white transform rotate-12">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              
              <div className="text-center mb-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Welcome Offer</span>
                <h3 className="text-4xl font-black text-[var(--color-primary)] mb-2 tracking-tight">₹200 OFF</h3>
                <p className="text-sm font-medium text-slate-500">On your first service booking</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-dashed border-slate-200 text-center mb-4 relative overflow-hidden">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full border-r border-slate-200" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white rounded-full border-l border-slate-200" />
                
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Code</p>
                <p className="text-xl font-black text-[var(--color-foreground)] tracking-widest font-mono">FIRST200</p>
              </div>

              <Button className="w-full font-bold h-12 rounded-xl">Copy Code</Button>
            </motion.div>

            {/* Small Floating Badges */}
            <motion.div 
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-[10%] left-[5%] md:left-0 z-30 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-xl border border-white flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <span className="text-orange-600 font-bold text-sm">%</span>
              </div>
              <div>
                <p className="text-sm font-black text-[var(--color-foreground)]">20% OFF</p>
                <p className="text-xs font-medium text-slate-500">Cleaning</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-[15%] left-[0%] z-10 bg-indigo-600 text-white px-5 py-3 rounded-2xl shadow-xl shadow-indigo-600/30 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-indigo-300" />
              <p className="text-sm font-bold tracking-wide">NEW USER</p>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-[30%] -right-[5%] md:-right-[10%] z-30 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-xl border border-white flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">₹</span>
              </div>
              <div>
                <p className="text-sm font-black text-[var(--color-foreground)]">₹100 OFF</p>
                <p className="text-xs font-medium text-slate-500">Repairs</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
