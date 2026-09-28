"use client";

import { PricingVariant } from "@/data/services";
import { Address } from "./AddressSelection";

interface BookingSummaryProps {
  serviceName: string;
  variant?: PricingVariant;
  date?: string;
  time?: string;
  address?: Address;
  currentStep: number;
}

export function BookingSummary({ serviceName, variant, date, time, address, currentStep }: BookingSummaryProps) {
  const servicePrice = variant?.price || 0;
  const taxes = variant ? Math.round(servicePrice * 0.18) : 0;
  const platformFee = variant ? 20 : 0;
  const total = servicePrice + taxes + platformFee;

  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }) : null;

  return (
    <div className="bg-white rounded-3xl border border-[var(--color-border)] shadow-xl p-6 sticky top-28">
      <h2 className="text-xl font-bold text-[var(--color-foreground)] mb-6">Booking Summary</h2>
      
      <div className="space-y-4 mb-6 pb-6 border-b border-[var(--color-border)]">
        <div>
          <span className="text-sm font-semibold text-[var(--color-muted)] block mb-1">Service</span>
          <span className="font-semibold text-[var(--color-foreground)]">{serviceName}</span>
          {variant && <span className="block text-sm text-[var(--color-primary)] font-medium mt-0.5">{variant.name}</span>}
        </div>
        
        {currentStep >= 2 && date && time && (
          <div>
            <span className="text-sm font-semibold text-[var(--color-muted)] block mb-1">Date & Time</span>
            <span className="font-semibold text-[var(--color-foreground)]">{formattedDate}, {time}</span>
          </div>
        )}
        
        {currentStep >= 3 && address && (
          <div>
            <span className="text-sm font-semibold text-[var(--color-muted)] block mb-1">Location</span>
            <span className="font-semibold text-[var(--color-foreground)] line-clamp-2">{address.fullAddress}</span>
            <span className="block text-sm text-[var(--color-muted)] mt-0.5">{address.city}</span>
          </div>
        )}
      </div>

      <div>
        <div className="space-y-3 mb-4 text-sm">
          <div className="flex justify-between text-[var(--color-muted)]">
            <span>Service price</span>
            <span className="font-medium">{variant ? `₹${servicePrice}` : '---'}</span>
          </div>
          <div className="flex justify-between text-[var(--color-muted)]">
            <span>Taxes</span>
            <span className="font-medium">{variant ? `₹${taxes}` : '---'}</span>
          </div>
          <div className="flex justify-between text-[var(--color-muted)]">
            <span>Platform fee</span>
            <span className="font-medium">{variant ? `₹${platformFee}` : '---'}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-[var(--color-border)]">
          <span className="font-bold text-[var(--color-foreground)]">Total</span>
          <span className="font-bold text-xl text-[var(--color-primary)]">{variant ? `₹${total}` : '---'}</span>
        </div>
      </div>
    </div>
  );
}
