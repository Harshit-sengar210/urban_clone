"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Users, ShieldCheck, Star, Clock } from "lucide-react";
import { StaggerChildren, staggerItemVariants } from "@/components/animations/StaggerChildren";

function AnimatedCounter({ from = 0, to, duration = 2, isFloat = false }: { from?: number, to: number, duration?: number, isFloat?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(from);
  
  const displayValue = useTransform(count, (latest) => {
    return isFloat ? latest.toFixed(1) : Math.round(latest).toString();
  });

  useEffect(() => {
    if (inView) {
      animate(count, to, { duration, ease: "easeOut" });
    }
  }, [count, inView, to, duration]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}

export function TrustStrip() {
  const metrics = [
    { value: 10, suffix: "K+", label: "Happy Customers", icon: Users },
    { value: 5, suffix: "K+", label: "Verified Pros", icon: ShieldCheck },
    { value: 4.8, suffix: "★", label: "Average Rating", icon: Star, isFloat: true },
    { label: "Customer Support", valueText: "24/7", icon: Clock },
  ];

  return (
    <section className="bg-white border-b border-[var(--color-border)] py-10 relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
      <div className="container mx-auto px-4 md:px-8">
        <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-[var(--color-border)]">
          {metrics.map((metric, idx) => (
            <motion.div key={idx} variants={staggerItemVariants} className="flex flex-col items-center text-center px-4 group">
              <div className="w-10 h-10 rounded-full bg-[var(--color-lavender-light)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <metric.icon className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              <span className="text-3xl font-extrabold text-[var(--color-foreground)] mb-1 tracking-tight flex items-center justify-center">
                {metric.valueText ? (
                  metric.valueText
                ) : (
                  <>
                    <AnimatedCounter from={0} to={metric.value || 0} duration={1.5} isFloat={metric.isFloat} />
                    <span className="absolute opacity-0">{metric.value}</span>
                    {metric.suffix}
                  </>
                )}
              </span>
              <span className="text-sm font-medium text-[var(--color-muted)]">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
