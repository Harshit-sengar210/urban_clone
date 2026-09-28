"use client";

import Image from "next/image";
import { Star, Clock } from "lucide-react";
import { ALL_SERVICES } from "@/data/services";
import { useState } from "react";
import { ServicePreview } from "./ServicePreview";

export function PopularNearYou() {
  const [previewId, setPreviewId] = useState<string | null>(null);

  const recommendedServices = [...ALL_SERVICES]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  if (recommendedServices.length === 0) return null;

  return (
    <div className="mt-24 pt-16 border-t border-slate-200">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-[#0A192F]">Popular near you</h3>
        <p className="text-slate-500 font-medium">Services people are booking frequently in your selected area.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendedServices.map((service: any) => (
          <div
            key={`rec-${service.id}`}
            onClick={() => setPreviewId(service.id)}
            className="group flex gap-4 p-3 bg-white rounded-2xl border border-transparent hover:border-slate-200 hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col justify-center py-1">
              <h4 className="font-bold text-[#0A192F] group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">{service.name}</h4>
              <div className="flex items-center gap-3 text-sm text-slate-500 mt-1 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-amber-700">{service.rating}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-300" />
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{service.duration}</span>
                </div>
              </div>
              <span className="font-bold text-slate-800 text-sm">₹{service.price}</span>
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
