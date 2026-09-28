import { ALL_SERVICES } from "@/data/services";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { ServiceCard } from "@/components/shared/ServiceCard";
import type { Metadata } from "next";
import { ServiceDetailClient } from "./ServiceDetailClient";

export function generateStaticParams() {
  return ALL_SERVICES.map((service) => ({
    serviceSlug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ serviceSlug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const service = ALL_SERVICES.find((s) => s.slug === resolvedParams.serviceSlug);
  
  if (!service) {
    return { title: "Service Not Found | UrbanClone" };
  }
  
  return {
    title: `${service.name} | UrbanClone`,
    description: service.description,
  };
}

export default async function ServiceDetailsPage({ params }: { params: Promise<{ serviceSlug: string }> }) {
  const resolvedParams = await params;
  const service = ALL_SERVICES.find((s) => s.slug === resolvedParams.serviceSlug);

  if (!service) {
    notFound();
  }

  // Get related services (same subcategory, excluding current)
  const relatedServices = ALL_SERVICES
    .filter(s => s.subcategoryId === service.subcategoryId && s.id !== service.id)
    .slice(0, 4);
    
  // If not enough related services in subcategory, fill with category
  if (relatedServices.length < 4) {
    const moreRelated = ALL_SERVICES
      .filter(s => s.categoryId === service.categoryId && s.id !== service.id && !relatedServices.includes(s))
      .slice(0, 4 - relatedServices.length);
    relatedServices.push(...moreRelated);
  }

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-background)] font-sans">
      <main className="flex-grow pt-24 pb-20 md:pb-32">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 overflow-x-auto whitespace-nowrap hide-scrollbar font-medium">
            <Link href="/" className="hover:text-[var(--color-primary)] transition-colors flex items-center">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4 shrink-0" />
            <Link href="/services" className="hover:text-[var(--color-primary)] transition-colors">
              Services
            </Link>
            <ChevronRight className="w-4 h-4 shrink-0" />
            <Link href={`/services?category=${service.categoryId}`} className="hover:text-[var(--color-primary)] transition-colors capitalize">
              {service.categoryId.replace("-", " ")}
            </Link>
            <ChevronRight className="w-4 h-4 shrink-0" />
            <span className="text-[#0A192F] font-bold">{service.name}</span>
          </nav>

          <ServiceDetailClient service={service} />

          {/* Related Services */}
          {relatedServices.length > 0 && (
            <div className="mt-20 pt-20 border-t border-slate-100">
              <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-[#0A192F]">You may also like</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedServices.map(related => (
                  <ServiceCard key={related.id} {...related} />
                ))}
              </div>
            </div>
          )}
          
        </div>
      </main>
    </div>
  );
}
