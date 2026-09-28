"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";

export function FinalCTA() {
  return (
    <section className="py-32 bg-[#FAF9F6]">
      <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
        <FadeUp delay={0.1}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0A192F] mb-6 leading-[1.1]">
            Ready to make your home better?
          </h2>
        </FadeUp>
        
        <FadeUp delay={0.2}>
          <p className="text-lg md:text-xl text-slate-600 mb-10 font-medium">
            Book trusted professionals and experience a simpler way to take care of your home.
          </p>
        </FadeUp>
        
        <FadeUp delay={0.3}>
          <Link 
            href="/services" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#0A192F] text-white font-bold hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform group text-lg"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
