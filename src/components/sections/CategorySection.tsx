"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { CategoryCard } from "@/components/shared/CategoryCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StaggerChildren, staggerItemVariants } from "@/components/animations/StaggerChildren";
import { motion } from "framer-motion";

export function CategorySection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-[var(--color-background)] relative overflow-hidden" id="categories">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <SectionHeading
          title="What can we help you with?"
          subtitle="Professional services for every corner of your home and lifestyle."
          centered
          className="mb-16"
        />

        {/* Infinite Marquee */}
        <div className="relative flex overflow-hidden py-4 -mx-4 md:-mx-8">
          <motion.div
            className="flex gap-6 pr-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 35,
            }}
          >
            {/* Render two identical sets of items for seamless looping */}
            {[0, 1].map((setIndex) => (
              <div key={setIndex} className="flex gap-6 items-stretch">
                {CATEGORIES.map((category) => (
                  <Link href={`/services#${category.slug}`} key={`${setIndex}-${category.id}`} className="w-[280px] md:w-[320px] shrink-0 block">
                    <CategoryCard
                      name={category.name}
                      description={category.description}
                      icon={category.icon}
                      image={category.image}
                      color={category.color}
                    />
                  </Link>
                ))}
                
                {/* More Categories Card */}
                <div className="w-[280px] md:w-[320px] shrink-0">
                  <Link href="/services" className="h-full flex flex-col items-center justify-center bg-[var(--color-surface-hover)] rounded-3xl border-2 border-dashed border-[var(--color-border)] hover:border-[var(--color-primary-light)] hover:bg-white transition-all duration-500 group p-6 text-center hover:-translate-y-2 hover:shadow-[0_15px_40px_-15px_rgba(79,70,229,0.15)]">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-slate-100 text-slate-500 group-hover:bg-[var(--color-primary)]/10 group-hover:text-[var(--color-primary)] transition-colors group-hover:scale-110 duration-500">
                      <ArrowRight className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-xl text-[var(--color-foreground)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                      Explore More
                    </h3>
                    <p className="text-sm text-[var(--color-muted)]">
                      View all categories
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
