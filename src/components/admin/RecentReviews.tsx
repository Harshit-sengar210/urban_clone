"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, MessageCircle } from "lucide-react";
import type { RecentReview } from "@/data/adminDashboardData";

export function RecentReviews({ reviews }: { reviews: RecentReview[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full"
    >
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-lg font-bold text-[#0A192F]">Recent Reviews</h3>
      </div>

      <div className="flex-1 divide-y divide-slate-100">
        {reviews.length === 0 ? (
          <div className="p-8 flex flex-col items-center justify-center text-center h-full">
            <MessageCircle className="w-10 h-10 text-slate-200 mb-3" />
            <p className="font-bold text-[#0A192F]">No recent reviews</p>
          </div>
        ) : (
          reviews.map((review, i) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.8 + (i * 0.1) }}
              className="p-5 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={review.avatar} alt={review.customer} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0A192F]">{review.customer}</h4>
                    <p className="text-[11px] font-medium text-slate-500">{review.service}</p>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-slate-400">{review.timeAgo}</span>
              </div>
              
              <div className="flex items-center gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-3.5 h-3.5 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-100'}`} 
                  />
                ))}
              </div>
              
              <p className="text-sm text-slate-700 leading-snug line-clamp-2">
                "{review.text}"
              </p>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
