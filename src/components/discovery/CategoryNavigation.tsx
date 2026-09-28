"use client";

import { useState, useEffect, useRef } from "react";
import { CATEGORIES } from "@/data/categories";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export function CategoryNavigation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";
  
  const [isSticky, setIsSticky] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Handle sticky detection
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        // When the container reaches the top of the viewport
        const top = containerRef.current.getBoundingClientRect().top;
        setIsSticky(top <= 0); // Assuming it sticks at top: 0
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle scroll into view when selecting a category
  const handleCategoryClick = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id === "all") {
      params.delete("category");
      params.delete("subcategory");
    } else {
      params.set("category", id);
      params.delete("subcategory");
    }
    router.push(`/services?${params.toString()}`, { scroll: false });

    // Scroll into view within the horizontal container
    const button = e.currentTarget;
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = button.offsetLeft - (container.offsetWidth / 2) + (button.offsetWidth / 2);
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  };

  const handleCompactSearchClick = () => {
    // Scroll back to top to use large search
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "w-full bg-white/95 backdrop-blur-md sticky top-0 z-40 transition-all duration-300",
        isSticky ? "shadow-sm border-b border-[var(--color-border)] py-3" : "border-b border-[var(--color-border)] pt-4 pb-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-8">
        
        {/* COMPACT SEARCH BAR (Appears when sticky) */}
        <motion.div 
          initial={false}
          animate={{ 
            height: isSticky ? "auto" : 0, 
            opacity: isSticky ? 1 : 0,
            marginBottom: isSticky ? 16 : 0,
            pointerEvents: isSticky ? "auto" : "none"
          }}
          className="overflow-hidden hidden md:flex items-center justify-between"
        >
          {isSticky && (
            <div 
              onClick={handleCompactSearchClick}
              className="flex items-center bg-slate-100/80 hover:bg-slate-100 rounded-full p-1.5 px-2 cursor-text transition-colors border border-slate-200 w-full max-w-2xl mx-auto mb-4"
            >
              <div className="flex items-center gap-2 px-3 border-r border-slate-300">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-semibold text-[#0A192F]">Delhi NCR</span>
              </div>
              <div className="flex items-center flex-1 px-4 gap-2">
                <Search className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-500">Search for services...</span>
              </div>
              <div className="bg-[var(--color-primary)] text-white text-sm font-bold py-1.5 px-5 rounded-full">
                Search
              </div>
            </div>
          )}
        </motion.div>

        {/* CATEGORY ROW */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-2 hide-scrollbar scroll-smooth relative"
        >
          <button
            onClick={(e) => handleCategoryClick("all", e)}
            className="relative shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors group outline-none"
          >
            {currentCategory === "all" && (
              <motion.div 
                layoutId="category-active-bg"
                className="absolute inset-0 bg-[var(--color-primary)] rounded-full shadow-md"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className={cn("relative z-10", currentCategory === "all" ? "text-white" : "text-slate-600 group-hover:text-slate-900")}>
              All Services
            </span>
          </button>
          
          {CATEGORIES.map(cat => {
            const isActive = currentCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={(e) => handleCategoryClick(cat.slug, e)}
                className="relative shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors group outline-none flex items-center gap-2"
              >
                {isActive && (
                  <motion.div 
                    layoutId="category-active-bg"
                    className="absolute inset-0 bg-[var(--color-primary)] rounded-full shadow-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {cat.icon && (
                  <cat.icon className={cn("w-4 h-4 relative z-10", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600")} />
                )}
                <span className={cn("relative z-10", isActive ? "text-white" : "text-slate-600 group-hover:text-slate-900")}>
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
