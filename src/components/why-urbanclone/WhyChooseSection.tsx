"use client";

import { motion } from "framer-motion";
import { MOCK_BENEFITS } from "@/lib/why-urbanclone/why-urbanclone.mock";
import { BadgeCheck, ReceiptIndianRupee, CalendarCheck, ShieldCheck, Bell, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";

// Map string icon names from mock data to actual Lucide components
const ICON_MAP: Record<string, React.ElementType> = {
  BadgeCheck: BadgeCheck,
  ReceiptIndianRupee: ReceiptIndianRupee,
  CalendarCheck: CalendarCheck,
  ShieldCheck: ShieldCheck,
  Bell: Bell,
  Headphones: Headphones
};

export function WhyChooseSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-foreground)] tracking-tight mb-4">
            Why People Choose UrbanClone
          </h2>
          <p className="text-[var(--color-muted)] text-lg">
            Everything you need for a smoother, safer, and more reliable service experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_BENEFITS.map((benefit, idx) => {
            const IconComponent = ICON_MAP[benefit.iconName] || BadgeCheck;
            
            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className={cn(
                  "group relative bg-white border border-[var(--color-border)] rounded-3xl p-8 transition-all duration-300",
                  "hover:border-[var(--color-primary)]/30 hover:shadow-xl hover:shadow-primary/5"
                )}
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:bg-[var(--color-primary)]/5 group-hover:border-[var(--color-primary)]/20 transition-colors duration-300">
                  <IconComponent className="w-6 h-6 text-[var(--color-primary)] transition-transform duration-300 group-hover:scale-110" />
                </div>
                
                <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                  {benefit.title}
                </h3>
                
                <p className="text-slate-600 font-medium leading-relaxed">
                  {benefit.description}
                </p>
                
                {/* Subtle bottom accent line that appears on hover */}
                <div className="absolute bottom-0 left-8 right-8 h-1 bg-[var(--color-primary)] opacity-0 transform translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 rounded-t-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
