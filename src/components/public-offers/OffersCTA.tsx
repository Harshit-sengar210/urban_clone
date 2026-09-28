"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function OffersCTA() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 overflow-hidden text-center p-12 md:p-20"
        >
          {/* Subtle background graphics */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-200/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-black text-[var(--color-foreground)] tracking-tight mb-6">
              Found a Deal You Like?
            </h2>
            <p className="text-xl text-[var(--color-muted)] font-medium mb-10 max-w-lg">
              Choose your service and make your next booking for less. Quality service is just a click away.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base shadow-xl shadow-primary/20 group" asChild>
                <Link href="/services">
                  Explore Services
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base border-slate-300 bg-white/50 backdrop-blur-sm" asChild>
                <Link href="#featured">
                  Browse All Offers
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
