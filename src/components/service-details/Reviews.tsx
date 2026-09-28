"use client";

import { motion } from "framer-motion";
import { Review } from "@/data/services";
import { Star, ThumbsUp, MessageSquareQuote } from "lucide-react";
import Image from "next/image";

interface ReviewsProps {
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

export function Reviews({ rating, reviewCount, reviews }: ReviewsProps) {
  const distribution = [
    { stars: 5, percentage: 85 },
    { stars: 4, percentage: 10 },
    { stars: 3, percentage: 3 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 },
  ];

  const mostMentioned = ["Quality", "Professional", "On Time", "Clean", "Friendly"];

  return (
    <div className="mt-20 mb-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="mb-10"
      >
        <h2 className="text-2xl lg:text-3xl font-bold text-[#0A192F] mb-2">Customer reviews</h2>
      </motion.div>
      
      <div className="flex flex-col lg:flex-row gap-12 mb-12">
        {/* Left: Overall Rating */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col items-center justify-center lg:w-1/3 bg-slate-50 rounded-3xl p-8 border border-slate-100"
        >
          <div className="text-6xl font-bold text-[#0A192F] mb-3">{rating}</div>
          <div className="flex gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <div className="text-slate-500 font-medium">{reviewCount.toLocaleString()}+ reviews</div>
        </motion.div>

        {/* Right: Distribution */}
        <div className="flex-1 flex flex-col justify-center gap-3">
          {distribution.map((dist, idx) => (
            <div key={dist.stars} className="flex items-center gap-4">
              <div className="flex items-center gap-1 w-12 shrink-0 text-sm font-bold text-slate-600">
                {dist.stars} <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${dist.percentage}%` }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  className="h-full bg-amber-400 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Most Mentioned */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="mb-8"
      >
        <div className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
          <MessageSquareQuote className="w-4 h-4 text-[var(--color-primary)]" />
          Most mentioned by customers
        </div>
        <div className="flex flex-wrap gap-2">
          {mostMentioned.map((item, idx) => (
            <span key={idx} className="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-600">
              {item}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Reviews Carousel */}
      {reviews && reviews.length > 0 && (
        <div className="flex overflow-x-auto gap-4 pb-8 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar snap-x">
          {reviews.map((review, idx) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
              className="min-w-[300px] max-w-[350px] w-full snap-start bg-white p-6 rounded-3xl border border-slate-100 shadow-sm shrink-0 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center font-bold text-slate-400">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-[#0A192F] text-sm">{review.author}</div>
                    <div className="text-xs text-slate-500">{review.date}</div>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "fill-amber-400 text-amber-400" : "fill-slate-100 text-slate-100"}`} />
                  ))}
                </div>
              </div>
              
              <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">
                "{review.comment}"
              </p>
              
              <div className="mt-auto pt-4 border-t border-slate-50 flex items-center gap-2">
                <ThumbsUp className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-500 font-medium">Helpful</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
