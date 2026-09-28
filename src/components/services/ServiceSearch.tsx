"use client";

import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ALL_SERVICES } from "@/data/services";
import { CATEGORIES } from "@/data/categories";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function ServiceSearch() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchResults = query
    ? ALL_SERVICES.filter((s) => s.name.toLowerCase().includes(query.toLowerCase())).slice(0, 4)
    : [];
    
  const categoryResults = query 
    ? CATEGORIES.filter(c => c.name.toLowerCase().includes(query.toLowerCase())).slice(0, 2)
    : [];

  return (
    <div className="relative w-full max-w-2xl mx-auto z-40" ref={containerRef}>
      <div className={`relative flex items-center bg-white rounded-2xl p-2 transition-shadow duration-300 ${isFocused ? 'shadow-lg border-primary/20' : 'shadow-md border-[var(--color-border)]'} border`}>
        <div className="hidden md:flex items-center gap-2 pl-4 pr-3 border-r border-[var(--color-border)] text-sm text-[var(--color-muted)] font-medium">
          <MapPin className="w-4 h-4 text-[var(--color-primary)]" />
          <span>New Delhi</span>
        </div>
        
        <div className="flex-grow flex items-center pl-3">
          <Search className="w-5 h-5 text-[var(--color-muted-foreground)] mr-2" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Search for a service or professional..."
            className="border-0 shadow-none focus-visible:ring-0 px-0 h-12 text-base w-full"
          />
        </div>
        
        <Button size="lg" className="rounded-xl px-6 h-12 shadow-md">
          Search
        </Button>
      </div>

      <AnimatePresence>
        {isFocused && (query.length > 0 || categoryResults.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-xl border border-[var(--color-border)] overflow-hidden"
          >
            <div className="p-2">
              {categoryResults.length > 0 && (
                <div className="mb-2">
                  <div className="text-xs font-semibold text-[var(--color-muted)] px-3 py-2 uppercase tracking-wider">
                    Categories
                  </div>
                  {categoryResults.map(cat => (
                    <Link key={cat.id} href={`/services/${cat.id}`} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[var(--color-surface-hover)] transition-colors">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cat.color}`}>
                        {cat.icon && (() => { const Icon = cat.icon; return <Icon className="w-4 h-4" />; })()}
                      </div>
                      <span className="font-medium text-[var(--color-foreground)]">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              )}

              {searchResults.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-[var(--color-muted)] px-3 py-2 uppercase tracking-wider">
                    Services
                  </div>
                  {searchResults.map(service => (
                    <Link key={service.id} href="#" className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[var(--color-surface-hover)] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[var(--color-surface-hover)]">
                          <Image src={service.image} alt={service.name} fill className="object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm text-[var(--color-foreground)]">{service.name}</span>
                          <span className="text-xs text-[var(--color-muted)]">From ₹{service.price}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-medium text-yellow-700 bg-yellow-50 px-1.5 py-0.5 rounded">
                        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                        {service.rating}
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {query && searchResults.length === 0 && categoryResults.length === 0 && (
                <div className="p-8 text-center flex flex-col items-center">
                  <Search className="w-8 h-8 text-[var(--color-muted)] mb-3 opacity-50" />
                  <p className="text-[var(--color-foreground)] font-medium">No services found</p>
                  <p className="text-[var(--color-muted)] text-sm mt-1">Try searching for something else.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
        <span className="text-[var(--color-muted)] font-medium mr-1">Popular:</span>
        {["Home Cleaning", "AC Repair", "Plumbing", "Salon at Home"].map((tag) => (
          <button key={tag} className="px-3 py-1.5 rounded-full bg-white/60 hover:bg-white text-[var(--color-foreground)] border border-white hover:border-[var(--color-border)] shadow-sm backdrop-blur-sm transition-all text-xs font-medium cursor-pointer">
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
