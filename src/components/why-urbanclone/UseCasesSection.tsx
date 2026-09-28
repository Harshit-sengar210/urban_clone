"use client";

import { motion } from "framer-motion";
import { Sparkles, Wrench, Scissors, Hammer, ArrowRight } from "lucide-react";
import { MOCK_USE_CASES } from "@/lib/why-urbanclone/why-urbanclone.mock";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles: Sparkles,
  Wrench: Wrench,
  Scissors: Scissors,
  Hammer: Hammer,
};

export function UseCasesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-foreground)] tracking-tight mb-4">
            Made for the Things <br className="hidden md:block" />That Matter.
          </h2>
          <p className="text-lg text-[var(--color-muted)]">
            Whether it's keeping your home spotless, fixing a leak, or getting ready for an event, we've organized everything to fit seamlessly into your life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {MOCK_USE_CASES.map((useCase, idx) => {
            const Icon = ICON_MAP[useCase.iconName] || Sparkles;
            
            return (
              <motion.div
                key={useCase.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={cn(
                  "group bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col",
                  "hover:bg-white hover:border-slate-200 hover:shadow-xl transition-all duration-300"
                )}
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 text-[var(--color-primary)] group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-3">
                  {useCase.title}
                </h3>
                
                <p className="text-sm font-medium text-slate-500 mb-8 leading-relaxed flex-grow">
                  {useCase.description}
                </p>
                
                <Link 
                  href={`/services#${useCase.categorySlug}`}
                  className="inline-flex items-center text-sm font-bold text-[var(--color-primary)] group-hover:text-indigo-700 transition-colors"
                >
                  Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
