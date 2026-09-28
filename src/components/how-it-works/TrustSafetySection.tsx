"use client";

import { TRUST_CARDS } from "@/data/howItWorks";
import { FadeUp } from "@/components/animations/FadeUp";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

export function TrustSafetySection() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <SectionHeading 
          title="Built Around Your Peace of Mind"
          subtitle="Your safety and satisfaction are our top priorities. Here's how we protect you."
          centered
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <FadeUp 
                key={card.id} 
                delay={index * 0.1}
                className="h-full"
              >
                <div className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 h-full flex flex-col items-start relative overflow-hidden cursor-default">
                  
                  {/* Subtle hover gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/0 to-[var(--color-primary)]/0 group-hover:from-[var(--color-primary)]/5 group-hover:to-transparent transition-colors duration-500" />
                  
                  <div className={cn(
                    "w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 relative z-10",
                    card.color
                  )}>
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">
                    {card.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 leading-relaxed relative z-10">
                    {card.description}
                  </p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
