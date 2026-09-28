import { ServicesHeader } from "@/components/discovery/ServicesHeader";
import { CategoryNavigation } from "@/components/discovery/CategoryNavigation";
import { SubcategoryNavigation } from "@/components/discovery/SubcategoryNavigation";
import { Breadcrumb } from "@/components/discovery/Breadcrumb";
import { FilterSidebar } from "@/components/discovery/FilterSidebar";
import { MobileFilters } from "@/components/discovery/MobileFilters";
import { PopularNearYou } from "@/components/discovery/PopularNearYou";
import { RecentlyViewed } from "@/components/discovery/RecentlyViewed";
import { ServiceResults } from "@/components/discovery/ServiceResults";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | UrbanClone",
  description: "Browse all our home services. From everyday cleaning to repairs, beauty, and maintenance.",
};

function ServicesLayout() {
  return (
    <>
      <ServicesHeader />
      <CategoryNavigation />
      <SubcategoryNavigation />
      
      <section className="py-8 md:py-12 bg-[var(--color-background)] min-h-screen">
        <div className="container mx-auto px-4 md:px-8">
          
          <Breadcrumb />
          <MobileFilters />
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-72 shrink-0">
              <FilterSidebar />
            </div>
            
            {/* Main Results Area */}
            <div className="flex-1 min-w-0">
              <ServiceResults />
              <PopularNearYou />
              <RecentlyViewed />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading services...</div>}>
        <ServicesLayout />
      </Suspense>
    </div>
  );
}
