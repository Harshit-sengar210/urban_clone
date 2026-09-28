"use client";

import { SearchBar } from "./SearchBar";
import { FadeUp } from "@/components/animations/FadeUp";

export function ServicesHeader() {
  return (
    <section className="pt-24 pb-8 bg-white border-b border-[var(--color-border)]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <FadeUp delay={0.1} yOffset={20}>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-foreground)] mb-3">
              Find the right service for your home.
            </h1>
          </FadeUp>
          
          <FadeUp delay={0.2} yOffset={20}>
            <p className="text-[var(--color-muted)] mb-8 max-w-2xl text-lg">
              Trusted professionals, transparent pricing and convenient booking.
            </p>
          </FadeUp>
          
          <FadeUp delay={0.3} yOffset={20} className="w-full max-w-[1000px]">
            <SearchBar />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
