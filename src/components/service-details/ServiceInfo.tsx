"use client";

import { Star, Clock } from "lucide-react";

interface ServiceInfoProps {
  name: string;
  badge?: string;
  description?: string;
  rating: number;
  reviewCount: number;
  duration: string;
  price: number;
}

export function ServiceInfo({ name, badge, description, rating, reviewCount, duration, price }: ServiceInfoProps) {
  return (
    <div className="mb-10 border-b border-[var(--color-border)] pb-8">
      {badge && (
        <span className="inline-block px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-md mb-4">
          {badge}
        </span>
      )}
      
      <h1 className="text-3xl md:text-5xl font-bold text-[var(--color-foreground)] mb-4 leading-tight">
        {name}
      </h1>
      
      {description && (
        <p className="text-lg text-[var(--color-muted)] mb-6 max-w-3xl leading-relaxed">
          {description}
        </p>
      )}
      
      <div className="flex flex-wrap items-center gap-6 text-[var(--color-foreground)]">
        <div className="flex items-center gap-1.5 font-semibold text-lg">
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          <span>{rating}</span>
          <span className="text-[var(--color-muted)] font-normal ml-1">({reviewCount.toLocaleString()} reviews)</span>
        </div>
        
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-border)] hidden md:block" />
        
        <div className="flex items-center gap-2 font-medium">
          <Clock className="w-5 h-5 text-[var(--color-muted)]" />
          <span>{duration}</span>
        </div>
        
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-border)] hidden md:block" />
        
        <div className="font-semibold text-xl">
          <span className="text-[var(--color-muted)] font-normal text-base mr-2">From</span>
          ₹{price}
        </div>
      </div>
    </div>
  );
}
