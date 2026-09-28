"use client";

import { PricingVariant } from "@/data/services";
import { Button } from "@/components/ui/button";
import { ShieldCheck, IndianRupee, Star } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface StickyBookingCardProps {
  serviceSlug: string;
  name: string;
  rating: number;
  reviewCount: number;
  price: number;
  variants: PricingVariant[];
}

export function StickyBookingCard({ serviceSlug, name, rating, reviewCount, price, variants }: StickyBookingCardProps) {
  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState<string>(variants[0]?.id || "");

  const handleBookNow = () => {
    router.push(`/booking/${serviceSlug}?variant=${selectedVariant}`);
  };

  return (
    <div className="bg-white rounded-3xl border border-[var(--color-border)] shadow-xl p-6 sticky top-28">
      <h2 className="text-xl font-bold text-[var(--color-foreground)] mb-2">{name}</h2>
      
      <div className="flex items-center gap-2 mb-6 text-sm">
        <div className="flex items-center gap-1 text-yellow-500 font-bold">
          <Star className="w-4 h-4 fill-current" />
          {rating}
        </div>
        <span className="text-[var(--color-muted)]">({reviewCount.toLocaleString()} reviews)</span>
      </div>

      <div className="mb-6 pb-6 border-b border-[var(--color-border)]">
        <span className="text-sm text-[var(--color-muted)] block mb-1">Starting from</span>
        <span className="text-3xl font-bold text-[var(--color-foreground)]">₹{price}</span>
      </div>

      <div className="mb-6">
        <label className="text-sm font-semibold text-[var(--color-foreground)] block mb-3">
          Select service
        </label>
        <div className="space-y-2">
          {variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariant(variant.id)}
              className={`w-full text-left px-4 py-3 rounded-xl border transition-colors flex justify-between items-center ${
                selectedVariant === variant.id 
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5" 
                  : "border-[var(--color-border)] hover:border-[var(--color-primary)]/30"
              }`}
            >
              <span className={`font-medium ${selectedVariant === variant.id ? "text-[var(--color-primary)]" : "text-[var(--color-foreground)]"}`}>
                {variant.name}
              </span>
              <span className={`text-sm ${selectedVariant === variant.id ? "text-[var(--color-primary)] font-semibold" : "text-[var(--color-muted)]"}`}>
                ₹{variant.price}
              </span>
            </button>
          ))}
        </div>
      </div>

      <Button 
        onClick={handleBookNow}
        className="w-full h-14 text-lg font-bold bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white rounded-xl shadow-lg shadow-primary/20 mb-6 transition-transform hover:scale-[1.02]"
      >
        Book Now
      </Button>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm text-[var(--color-muted)]">
          <ShieldCheck className="w-5 h-5 text-green-500" />
          <span>Verified Professionals</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-[var(--color-muted)]">
          <IndianRupee className="w-5 h-5 text-blue-500" />
          <span>Secure Payments</span>
        </div>
      </div>
    </div>
  );
}
