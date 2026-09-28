"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function WhyUrbanCloneHero() {
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
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-bl from-indigo-50/50 to-transparent -z-10" />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[40%] rounded-full bg-[var(--color-primary)]/5 blur-[100px] -z-10" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerVariants}
            className="max-w-2xl"
          >
            <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-100 text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Why UrbanClone
            </motion.div>
            
            <motion.h1 variants={fadeUpVariants} className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--color-foreground)] tracking-tight leading-[1.1] mb-6">
              Services You Can Trust. <br />
              <span className="text-[var(--color-primary)]">Made Simple.</span>
            </motion.h1>
            
            <motion.p variants={fadeUpVariants} className="text-lg md:text-xl text-[var(--color-muted)] mb-8 max-w-lg leading-relaxed">
              Book confidently, track your service, and get reliable help from verified professionals who are ready to get the job done.
            </motion.p>
            
            <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row items-center gap-4">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base shadow-lg shadow-primary/20 group" asChild>
                <Link href="/services">
                  Explore Services
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base border-slate-200 bg-white/50 backdrop-blur-sm hover:bg-slate-50" asChild>
                <Link href="/how-it-works">How It Works</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Visual Composition */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative h-[450px] md:h-[500px] w-full flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[400px] h-full">
              
              {/* Card 1: Verified Professional */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[10%] right-[10%] md:-right-[5%] z-20 w-[240px] bg-white rounded-2xl p-4 shadow-2xl shadow-indigo-900/10 border border-slate-100"
              >
                <div className="flex items-center gap-1 mb-3">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Verified Professional</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden relative border-2 border-white shadow-sm shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-indigo-200" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[var(--color-foreground)]">Ravi Kumar</h4>
                    <p className="text-[11px] font-medium text-slate-500 mt-0.5">4.8 ★ • 1.2K+ jobs done</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Secure Payment */}
              <motion.div 
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[25%] left-[0%] z-30 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 w-[220px]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Secure Payment</span>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-[var(--color-foreground)] mb-1">₹499</h3>
                <div className="flex items-center gap-1 text-[11px] font-medium text-green-600 bg-green-50 px-2 py-1 rounded w-fit">
                  <Check className="w-3 h-3" /> Payment protected
                </div>
              </motion.div>

              {/* Card 3: Service Completed */}
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-[10%] right-[5%] z-10 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl w-[200px]"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-3">
                  <Sparkles className="w-4 h-4 text-indigo-300" />
                </div>
                <h4 className="font-bold text-sm mb-1">Home Cleaning</h4>
                <div className="flex items-center gap-1.5 text-xs text-green-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                </div>
              </motion.div>
              
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
