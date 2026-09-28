"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { FadeUp } from "@/components/animations/FadeUp";
import { cn } from "@/lib/utils";

const TRENDING = [
  {
    id: "home-cleaning",
    name: "Home Cleaning",
    price: "₹499",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "ac-repair",
    name: "AC Repair",
    price: "₹399",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "electrician",
    name: "Electrician",
    price: "₹199",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1621905252507-b35492d90cb0?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "plumbing",
    name: "Plumbing",
    price: "₹149",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "salon",
    name: "Salon at Home",
    price: "₹599",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop"
  }
];

export function TrendingServices() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      // Allow 1px margin of error for rounding
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 bg-[#FAF9F6] overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="flex items-end justify-between mb-12">
          <div>
            <FadeUp delay={0.1}>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">
                Popular Right Now
              </span>
            </FadeUp>
            <FadeUp delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A192F]">
                Trending Services
              </h2>
            </FadeUp>
          </div>
          
          <FadeUp delay={0.3}>
            <div className="hidden md:flex items-center gap-3">
              <button 
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={cn(
                  "w-12 h-12 rounded-full border flex items-center justify-center transition-all",
                  canScrollLeft 
                    ? "border-slate-300 text-slate-700 hover:bg-white hover:shadow-sm" 
                    : "border-slate-200 text-slate-300 cursor-not-allowed"
                )}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={cn(
                  "w-12 h-12 rounded-full border flex items-center justify-center transition-all",
                  canScrollRight 
                    ? "border-slate-300 text-slate-700 hover:bg-white hover:shadow-sm" 
                    : "border-slate-200 text-slate-300 cursor-not-allowed"
                )}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </FadeUp>
        </div>

      </div>

      {/* Scrollable Container (Bleeds to edge but keeps container alignment on left) */}
      <div className="relative w-full pl-4 md:pl-8 lg:pl-[calc((100vw-1280px)/2+2rem)] xl:pl-[calc((100vw-1536px)/2+2rem)] 2xl:pl-[calc((100vw-1536px)/2+2rem)]">
        {/* We use margin/padding math above to align the first item with the container while letting the right side bleed to edge */}
        <div 
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-12 pt-4 pr-8 md:pr-16 no-scrollbar"
        >
          {TRENDING.map((service) => (
            <Link 
              key={service.id}
              href={`/services/${service.id}`}
              className="relative shrink-0 w-[280px] md:w-[360px] h-[400px] md:h-[480px] rounded-3xl overflow-hidden snap-start group"
            >
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end justify-between">
                <div>
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-2">{service.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-white/90 font-medium text-sm">From {service.price}</span>
                    <span className="flex items-center text-[10px] font-bold text-amber-900 bg-amber-400 px-1.5 py-0.5 rounded uppercase">
                      <Star className="w-2.5 h-2.5 fill-amber-900 mr-0.5" /> {service.rating}
                    </span>
                  </div>
                </div>
                
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Required CSS to hide scrollbar for webkit */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}} />
    </section>
  );
}
