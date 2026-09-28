"use client";

import { useState, useMemo, useEffect } from "react";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { ServiceFilters } from "@/components/services/ServiceFilters";
import { EmptyServices } from "@/components/services/EmptyServices";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { db } from "@/backend/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface ServiceGridProps {
  initialCategory?: string;
  hideHeading?: boolean;
}

export function ServiceGrid({ initialCategory = "all", hideHeading = false }: ServiceGridProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSort, setActiveSort] = useState("popular");
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "services"), (snap) => {
      setServices(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const filteredAndSortedServices = useMemo(() => {
    let result = [...services];

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter(service => service.categoryId === activeCategory);
    }

    // Sort
    switch (activeSort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case "popular":
      default:
        // Mock popular sorting (could use reviewCount or predefined order)
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [activeCategory, activeSort, services]);

  return (
    <section className="py-12 md:py-20 bg-[var(--color-background)]">
      <div className="container mx-auto px-4 md:px-8">
        {!hideHeading && (
          <SectionHeading
            title="Explore All Services"
            subtitle="Find exactly what you need with our comprehensive marketplace."
            className="mb-8"
          />
        )}
        
        <ServiceFilters
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
        />

        {filteredAndSortedServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedServices.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                name={service.name}
                image={service.image}
                price={service.price}
                rating={service.rating}
                reviewCount={service.reviewCount}
                duration={service.duration}
                badge={service.badge}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8">
            <EmptyServices onClearFilters={() => setActiveCategory("all")} />
          </div>
        )}
      </div>
    </section>
  );
}
