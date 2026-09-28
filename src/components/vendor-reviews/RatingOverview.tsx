"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Star } from "lucide-react";
import { RatingDistribution } from "@/types/vendor";
import { cn } from "@/lib/utils";

interface RatingOverviewProps {
  averageRating: number;
  totalReviews: number;
  distribution: RatingDistribution[];
  activeFilter: number | null;
  onFilterByRating: (rating: number | null) => void;
}

function CountUp({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const duration = 1200;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((ease * to).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(to);
    };
    requestAnimationFrame(step);
  }, [to, decimals, inView]);

  return <span ref={ref}>{count.toFixed(decimals)}</span>;
}

function AnimatedBar({ percentage, active, onClick }: { percentage: number; active: boolean; onClick: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden cursor-pointer group" onClick={onClick}>
      <motion.div
        className={cn("h-full rounded-full transition-colors", active ? "bg-indigo-500" : "bg-indigo-300 group-hover:bg-indigo-400")}
        initial={{ width: 0 }}
        animate={{ width: inView ? `${percentage}%` : 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
      />
    </div>
  );
}

export function RatingOverview({ averageRating, totalReviews, distribution, activeFilter, onFilterByRating }: RatingOverviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
        {/* Left — Big Number */}
        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-indigo-50 to-purple-50 border-b md:border-b-0 md:border-r border-slate-100">
          <div className="text-6xl font-black text-slate-900 leading-none mb-2">
            <CountUp to={averageRating} decimals={1} />
          </div>
          <div className="flex items-center gap-0.5 mb-3" role="img" aria-label={`${averageRating} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} className={cn("w-5 h-5", s <= Math.round(averageRating) ? "fill-amber-400 text-amber-400" : "text-slate-200 fill-slate-200")} />
            ))}
          </div>
          <div className="text-sm font-bold text-slate-700">{totalReviews} Reviews</div>
          <div className="text-[10px] text-slate-400 mt-1 text-center">Based on demo review data</div>
        </div>

        {/* Right — Distribution Bars */}
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900">Rating Breakdown</h3>
            {activeFilter !== null && (
              <button onClick={() => onFilterByRating(null)} className="text-xs font-bold text-indigo-600 hover:underline">
                Clear filter
              </button>
            )}
          </div>
          <div className="space-y-3">
            {distribution.sort((a, b) => b.rating - a.rating).map(d => {
              const isActive = activeFilter === d.rating;
              return (
                <button
                  key={d.rating}
                  onClick={() => onFilterByRating(isActive ? null : d.rating)}
                  className={cn(
                    "w-full flex items-center gap-3 group rounded-xl p-2 -mx-2 transition-colors",
                    isActive ? "bg-indigo-50" : "hover:bg-slate-50"
                  )}
                  aria-pressed={isActive}
                  aria-label={`Filter by ${d.rating} stars — ${d.percentage}% of reviews`}
                >
                  <div className="w-14 flex items-center gap-1 text-sm font-bold text-slate-600 shrink-0">
                    <Star className={cn("w-3.5 h-3.5", isActive ? "fill-amber-400 text-amber-400" : "fill-slate-300 text-slate-300")} />
                    <span>{d.rating}</span>
                  </div>
                  <AnimatedBar percentage={d.percentage} active={isActive} onClick={() => {}} />
                  <div className="w-12 text-right text-sm font-bold text-slate-500 shrink-0">{d.percentage}%</div>
                  <div className="w-10 text-right text-xs text-slate-400 shrink-0 hidden sm:block">({d.count})</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
