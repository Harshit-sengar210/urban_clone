"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MOCK_STATS } from "@/lib/why-urbanclone/why-urbanclone.mock";

export function PlatformStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, black 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div 
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 max-w-6xl mx-auto"
        >
          {MOCK_STATS.map((stat, idx) => (
            <div key={stat.id} className="flex flex-col items-center text-center">
              <div className="flex items-baseline gap-1 mb-2">
                <Counter value={stat.value} duration={2} start={isInView} />
                <span className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--color-primary)]">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-sm md:text-base font-bold text-slate-500 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Simple counter component
function Counter({ value, duration, start }: { value: number; duration: number; start: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    const isFloat = value % 1 !== 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentVal = easeProgress * value;
      setCount(isFloat ? Number(currentVal.toFixed(1)) : Math.floor(currentVal));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration, start]);

  return (
    <span className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--color-foreground)] tracking-tighter">
      {count}
    </span>
  );
}
