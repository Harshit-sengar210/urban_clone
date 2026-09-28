"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface StickyBookingBarProps {
  serviceName: string;
  packageName: string;
  price: number;
  duration: string;
  onBookNow: () => void;
}

export function StickyBookingBar({ serviceName, packageName, price, duration, onBookNow }: StickyBookingBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past the main hero and summary card (approx 900px)
      if (window.scrollY > 900) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-10px_30px_rgb(0,0,0,0.05)] md:bottom-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:rounded-2xl md:border md:w-[90%] md:max-w-4xl"
        >
          <div className="flex items-center justify-between p-4 md:px-6 md:py-4">
            <div className="flex-1 mr-4">
              <h3 className="font-bold text-[#0A192F] text-sm md:text-base truncate max-w-[200px] md:max-w-none">{serviceName}</h3>
              <div className="text-xs md:text-sm text-slate-500 font-medium truncate max-w-[200px] md:max-w-none">
                {packageName} • ₹{price} • {duration}
              </div>
            </div>
            <Button onClick={onBookNow} className="px-6 md:px-8 h-10 md:h-12 rounded-xl font-bold shadow-md shadow-indigo-500/20 shrink-0">
              Book Now &rarr;
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
