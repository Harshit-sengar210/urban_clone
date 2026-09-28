"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function WhyUrbanCloneCTA() {
  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-[var(--color-primary)] to-indigo-900 p-10 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-indigo-900/20"
        >
          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
              Ready for a Better <br className="hidden sm:block" />Service Experience?
            </h2>
            <p className="text-xl text-indigo-100 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              Find a trusted professional and book your next service in just a few simple steps. Your home is in good hands.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-white text-[var(--color-primary)] hover:bg-slate-50 shadow-xl font-bold" asChild>
                <Link href="/services">
                  Explore Services
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm font-bold" asChild>
                <Link href="/how-it-works">
                  How It Works
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
