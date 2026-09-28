"use client";

import Image from "next/image";
import { Star, Clock } from "lucide-react";
import { ALL_SERVICES } from "@/data/services";
import { useState, useEffect } from "react";
import { ServicePreview } from "./ServicePreview";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export function RecentlyViewed() {
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [recentlyViewedIds] = useLocalStorage<string[]>("urbanclone-recent", []);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || recentlyViewedIds.length === 0) return null;

  const recentServices = recentlyViewedIds
    .map(id => ALL_SERVICES.find(s => s.id === id))
    .filter(Boolean)
    .slice(0, 4);

  if (recentServices.length === 0) return null;

  return (
    <div className="mt-16 pt-16 border-t border-slate-200">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-[#0A192F]">Continue exploring</h3>
        <p className="text-slate-500 font-medium">Services you recently viewed.</p>
      </div>
      <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar snap-x">
        {recentServices.map((service: any) => (
          <div
            key={`recent-${service.id}`}
            onClick={() => setPreviewId(service.id)}
            className="group shrink-0 snap-start w-[240px] p-3 bg-white rounded-2xl border border-transparent hover:border-slate-200 hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3 bg-slate-100">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h4 className="font-bold text-[#0A192F] group-hover:text-[var(--color-primary)] transition-colors line-clamp-1 text-sm">{service.name}</h4>
            <div className="flex items-center justify-between mt-2">
              <span className="font-bold text-slate-800 text-sm">₹{service.price}</span>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="font-bold text-amber-700">{service.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {previewId && (
        <ServicePreview
          serviceId={previewId}
          services={ALL_SERVICES}
          onClose={() => setPreviewId(null)}
        />
      )}
    </div>
  );
}
