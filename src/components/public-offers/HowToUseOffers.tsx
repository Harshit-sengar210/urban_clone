"use client";

import { Search, Tag, Wallet } from "lucide-react";
import { motion } from "framer-motion";

export function HowToUseOffers() {
  const steps = [
    {
      title: "Choose a Service",
      description: "Find the service you need from our comprehensive marketplace.",
      icon: Search,
    },
    {
      title: "Apply Your Code",
      description: "Enter your coupon code during the checkout process.",
      icon: Tag,
    },
    {
      title: "Save on Your Booking",
      description: "Your discount is applied instantly before payment.",
      icon: Wallet,
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-foreground)] tracking-tight mb-4">
            How to Use an Offer
          </h2>
          <p className="text-[var(--color-muted)] text-lg max-w-2xl mx-auto">
            Saving money on UrbanClone is simple and transparent.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-slate-100 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-[var(--color-primary)]/10 group-hover:border-[var(--color-primary)]/20 transition-all duration-300">
                  <step.icon className="w-10 h-10 text-[var(--color-primary)]" />
                </div>
                
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                  Step 0{idx + 1}
                </span>
                
                <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-3">
                  {step.title}
                </h3>
                
                <p className="text-[var(--color-muted)] font-medium leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
