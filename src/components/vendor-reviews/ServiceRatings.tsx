"use client";

import { motion } from "framer-motion";
import { Star, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { ServiceRatingSummary } from "@/types/vendor";
import { cn } from "@/lib/utils";

interface ServiceRatingsProps {
  services: ServiceRatingSummary[];
  activeServiceId: string | null;
  onFilter: (id: string | null) => void;
}

export function ServiceRatings({ services, activeServiceId, onFilter }: ServiceRatingsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-slate-900">Ratings by Service</h3>
        {activeServiceId && (
          <button onClick={() => onFilter(null)} className="text-xs font-bold text-indigo-600 hover:underline">
            Show all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {services.map((svc, i) => {
          const isActive = activeServiceId === svc.serviceId;
          const TrendIcon = svc.trend === "up" ? TrendingUp : svc.trend === "down" ? TrendingDown : Minus;
          const trendColor = svc.trend === "up" ? "text-emerald-500" : svc.trend === "down" ? "text-red-400" : "text-slate-400";
          return (
            <motion.button
              key={svc.serviceId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.07 }}
              onClick={() => onFilter(isActive ? null : svc.serviceId)}
              aria-pressed={isActive}
              className={cn(
                "flex items-center justify-between p-4 rounded-2xl border text-left transition-all group",
                isActive
                  ? "bg-indigo-50 border-indigo-200 shadow-sm"
                  : "bg-slate-50/50 border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30"
              )}
            >
              <div>
                <div className="font-bold text-slate-900 text-sm mb-1">{svc.serviceName}</div>
                <div className="flex items-center gap-1.5">
                  <div
                    className="flex items-center gap-0.5"
                    role="img"
                    aria-label={`${svc.averageRating} out of 5 stars`}
                  >
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className={cn("w-3 h-3", s <= Math.round(svc.averageRating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200")} />
                    ))}
                  </div>
                  <span className="text-sm font-black text-slate-700">{svc.averageRating.toFixed(1)}</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">{svc.reviewCount} reviews</div>
              </div>
              <div className={cn("flex items-center gap-1", trendColor)}>
                <TrendIcon className="w-4 h-4" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
