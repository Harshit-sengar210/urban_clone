"use client";

import { useState } from "react";
import { ALL_SERVICES } from "@/data/services";
import { ServiceGallery } from "@/components/service-details/ServiceGallery";
import { ServiceSummaryCard } from "@/components/service-details/ServiceSummaryCard";
import { PackageSelector, Package } from "@/components/service-details/PackageSelector";
import { IncludedServices } from "@/components/service-details/IncludedServices";
import { BeforeYourService } from "@/components/service-details/BeforeYourService";
import { MeetProfessional } from "@/components/service-details/MeetProfessional";
import { ServiceJourney } from "@/components/service-details/ServiceJourney";
import { PricingSection } from "@/components/service-details/PricingSection";
import { ServiceQuality } from "@/components/service-details/ServiceQuality";
import { Reviews } from "@/components/service-details/Reviews";
import { FAQ } from "@/components/service-details/FAQ";
import { StickyBookingBar } from "@/components/service-details/StickyBookingBar";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type ServiceType = typeof ALL_SERVICES[0];

interface ServiceDetailClientProps {
  service: ServiceType;
}

export function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  // Demo packages since the backend model might not have them defined like this
  const packages: Package[] = [
    {
      id: "pkg-1",
      name: "Basic Care",
      description: "Essential service to get the job done right.",
      price: service.price,
      duration: service.duration,
      includedCount: 3,
    },
    {
      id: "pkg-2",
      name: "Standard Package",
      description: "Our most popular choice with additional benefits.",
      price: Math.round(service.price * 1.5),
      duration: parseInt(service.duration) ? `${parseInt(service.duration) + 30} mins` : "90 mins",
      includedCount: 5,
    },
    {
      id: "pkg-3",
      name: "Premium Experience",
      description: "The ultimate service with top-tier products.",
      price: Math.round(service.price * 2.2),
      duration: parseInt(service.duration) ? `${parseInt(service.duration) + 60} mins` : "120 mins",
      includedCount: 8,
    }
  ];

  const [selectedPackage, setSelectedPackage] = useState<Package>(packages[1]);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const router = useRouter();

  const handleBookNow = () => {
    setIsBookingLoading(true);
    router.push(`/booking/${service.slug || service.id}?variant=${selectedPackage.id}`);
  };

  const scrollToPackages = () => {
    document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-12 relative">
        {/* Left Column (Main Content) */}
        <div className="flex-1 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ServiceGallery images={service.gallery || [service.image]} serviceName={service.name} />
          </motion.div>
          
          <div id="packages">
            <PackageSelector 
              packages={packages} 
              selectedId={selectedPackage.id} 
              onSelect={setSelectedPackage} 
            />
          </div>

          <IncludedServices 
            included={service.included || ["Premium Quality", "Vetted Professionals", "Satisfaction Guaranteed"]} 
            notIncluded={service.notIncluded || []} 
          />
          
          <BeforeYourService />
          
          <MeetProfessional />
          
          <ServiceJourney />
          
          <PricingSection 
            selectedPackageName={selectedPackage.name} 
            price={selectedPackage.price} 
          />
          
          <ServiceQuality />
          
          <Reviews 
            rating={service.rating} 
            reviewCount={service.reviewCount} 
            reviews={service.reviews || []} 
          />
          
          <FAQ faqs={service.faqs || []} />
        </div>

        {/* Right Column (Floating Booking Card) */}
        <div className="hidden lg:block w-[400px] shrink-0">
          <ServiceSummaryCard 
            category={service.categoryId.replace("-", " ")}
            name={service.name}
            rating={service.rating}
            reviewCount={service.reviewCount}
            description={service.about || service.description}
            startingPrice={selectedPackage.price}
            duration={selectedPackage.duration}
            onBookNow={handleBookNow}
            onViewPackages={scrollToPackages}
          />
        </div>
      </div>

      <StickyBookingBar 
        serviceName={service.name}
        packageName={selectedPackage.name}
        price={selectedPackage.price}
        duration={selectedPackage.duration}
        onBookNow={handleBookNow}
      />
    </>
  );
}
