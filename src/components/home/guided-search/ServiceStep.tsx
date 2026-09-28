"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { serviceDiscoveryService, DiscoveredService, POPULAR_SERVICES } from "@/services/serviceDiscoveryService";

interface ServiceStepProps {
  pincode: string;
  selectedService: DiscoveredService | null;
  onServiceSelect: (service: DiscoveredService) => void;
  onServiceClear: () => void;
  onEditLocation: () => void;
}

export function ServiceStep({ pincode, selectedService, onServiceSelect, onServiceClear, onEditLocation }: ServiceStepProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<DiscoveredService[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Typewriter effect state
  const placeholders = ["Home Cleaning", "AC Repair", "Electrician", "Plumbing", "Salon at Home"];
  const [placeholderIdx, setPlaceholderIdx] = useState(0);

  useEffect(() => {
    // Typewriter effect
    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % placeholders.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  useEffect(() => {
    // Auto-focus when step mounts, only if no service selected
    if (!selectedService) {
      // Small delay to allow layout animations to finish
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [selectedService]);

  // Debounce search
  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    const timeoutId = setTimeout(async () => {
      const results = await serviceDiscoveryService.searchServices(query);
      setSuggestions(results);
      setIsSearching(false);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleClear = () => {
    setQuery("");
    onServiceClear();
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col w-full"
    >
      <motion.label layout className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 block">
        What service do you need?
      </motion.label>
      
      <div className="relative z-20 flex flex-col">
        {/* The Search Bar Container */}
        <div 
          className={cn(
            "relative flex flex-col sm:flex-row items-stretch sm:items-center p-1.5 rounded-2xl transition-all duration-300 z-10",
            (isFocused || selectedService) ? "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-indigo-200" : "bg-white shadow-sm border border-slate-200"
          )}
        >
          {/* Location Chip */}
          <motion.button
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onEditLocation}
            className="flex items-center gap-1.5 px-3 py-2 sm:py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors m-1 shrink-0 group border border-slate-200"
          >
            <MapPin className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-sm font-bold text-slate-700">{pincode}</span>
          </motion.button>

          {/* Divider (Desktop) */}
          <div className="hidden sm:block w-[1px] h-8 bg-slate-200 mx-2" />
          
          {/* Input Area */}
          <div className="relative flex-1 flex items-center min-h-[48px] px-2 sm:px-0">
            {!selectedService ? (
              <>
                <Search className={cn("w-4 h-4 mr-2 transition-colors", isFocused ? "text-indigo-600" : "text-slate-400")} />
                
                <div className="relative flex-1 h-full flex items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                      // Slight delay to allow clicking suggestions
                      setTimeout(() => setIsFocused(false), 200);
                    }}
                    className="w-full bg-transparent border-none outline-none text-base font-medium text-slate-900 z-10 relative"
                  />
                  
                  {/* Animated Placeholder */}
                  {!query && (
                    <div className="absolute inset-0 flex items-center pointer-events-none text-slate-400">
                      <span>Search for "</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={placeholderIdx}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                          className="inline-block font-medium text-slate-500"
                        >
                          {placeholders[placeholderIdx]}
                        </motion.span>
                      </AnimatePresence>
                      <span>"...</span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <motion.div 
                layoutId="selected-service-chip"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-between w-full pr-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{selectedService.icon}</span>
                  <span className="font-bold text-slate-900">{selectedService.name}</span>
                </div>
                <button
                  onClick={handleClear}
                  className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Autocomplete Dropdown */}
        <AnimatePresence>
          {isFocused && query && !selectedService && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 4, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-30"
            >
              {isSearching ? (
                <div className="p-4 text-center text-sm text-slate-500">Searching...</div>
              ) : suggestions.length > 0 ? (
                <div className="max-h-[300px] overflow-y-auto py-2">
                  {suggestions.map((service) => (
                    <motion.button
                      key={service.id}
                      onClick={() => onServiceSelect(service)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left group"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl shadow-sm group-hover:bg-white transition-colors">
                        {service.icon}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{service.name}</div>
                        <div className="text-xs text-slate-500">{service.category}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-slate-500">No services found for "{query}"</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Suggestions */}
      <AnimatePresence>
        {!selectedService && !query && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6"
          >
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Popular near you</p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SERVICES.map((service) => (
                <motion.button
                  key={service.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onServiceSelect(service)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 hover:shadow-sm transition-all group"
                >
                  <span className="text-lg grayscale group-hover:grayscale-0 transition-all">{service.icon}</span>
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-900">{service.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
