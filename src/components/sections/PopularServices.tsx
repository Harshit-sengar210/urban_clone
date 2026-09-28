"use client";

import { POPULAR_SERVICES } from "@/data/services";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { StaggerChildren, staggerItemVariants } from "@/components/animations/StaggerChildren";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";

export function PopularServices() {
  const scrollLeft = () => {
    const el = document.getElementById("popular-scroll");
    if (el) el.scrollBy({ left: -400, behavior: "smooth" });
  };
  
  const scrollRight = () => {
    const el = document.getElementById("popular-scroll");
    if (el) el.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <section className="py-24 bg-[var(--color-background)] relative" id="popular">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            title="Popular Services"
            subtitle="Most booked services by our customers this week."
          />
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 mr-4">
              <button onClick={scrollLeft} className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:bg-white hover:shadow-md hover:border-transparent transition-all">
                <ChevronLeft className="w-5 h-5 text-[var(--color-foreground)]" />
              </button>
              <button onClick={scrollRight} className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:bg-white hover:shadow-md hover:border-transparent transition-all">
                <ChevronRight className="w-5 h-5 text-[var(--color-foreground)]" />
              </button>
            </div>
            <Button variant="outline" asChild>
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <StaggerChildren className="flex overflow-x-auto pb-8 -mx-4 px-4 md:mx-0 md:px-0 gap-6 snap-x snap-mandatory custom-scrollbar" id="popular-scroll">
          {POPULAR_SERVICES.map((service) => (
            <motion.div variants={staggerItemVariants} key={service.id} className="min-w-[280px] w-[85vw] md:w-[320px] lg:w-[350px] snap-start shrink-0">
              <ServiceCard
                {...service}
              />
            </motion.div>
          ))}
        </StaggerChildren>

        <div className="mt-4 flex justify-center md:hidden">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
