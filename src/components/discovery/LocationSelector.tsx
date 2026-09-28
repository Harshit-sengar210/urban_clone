"use client";

import { useState } from "react";
import { MapPin, X, Navigation } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function LocationSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState("Delhi NCR");

  const popularLocations = ["Delhi NCR", "Noida", "Gurugram", "Ghaziabad", "Mumbai", "Bengaluru"];

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 pl-4 pr-3 border-r border-[var(--color-border)] text-sm text-[var(--color-foreground)] font-medium hover:text-[var(--color-primary)] transition-colors h-full"
      >
        <MapPin className="w-4 h-4 text-[var(--color-primary)]" />
        <span className="whitespace-nowrap truncate max-w-[120px]">{location}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
            >
              <div className="flex justify-between items-center p-5 border-b border-[var(--color-border)] bg-white">
                <h3 className="font-bold text-lg">Select your location</h3>
                <button onClick={() => setIsOpen(false)} className="p-2 bg-[var(--color-surface-hover)] rounded-full text-[var(--color-muted)] hover:text-[var(--color-foreground)]">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-5">
                <button className="w-full flex items-center gap-3 p-4 rounded-xl border border-[var(--color-primary-light)] bg-primary/5 text-[var(--color-primary)] font-medium mb-6 hover:bg-primary/10 transition-colors">
                  <Navigation className="w-5 h-5" />
                  Use current location
                </button>
                
                <h4 className="font-semibold text-sm text-[var(--color-muted)] mb-3 uppercase tracking-wider">Popular Locations</h4>
                <div className="grid grid-cols-2 gap-2">
                  {popularLocations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setLocation(loc);
                        setIsOpen(false);
                      }}
                      className="text-left px-4 py-3 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-surface-hover)] transition-colors text-sm font-medium"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
