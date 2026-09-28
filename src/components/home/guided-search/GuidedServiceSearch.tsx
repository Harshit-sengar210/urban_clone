"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, Loader2, X, Check } from "lucide-react";
import { serviceDiscoveryService, DiscoveredService, POPULAR_SERVICES } from "@/services/serviceDiscoveryService";
import { cn } from "@/lib/utils";

type SearchStep = "location" | "service" | "loading";

export function GuidedServiceSearch() {
  const router = useRouter();
  
  const [pincode, setPincode] = useState("");
  const [query, setQuery] = useState("");
  const [selectedService, setSelectedService] = useState<DiscoveredService | null>(null);
  
  const [isFocused, setIsFocused] = useState<"location" | "service" | null>(null);
  const [suggestions, setSuggestions] = useState<DiscoveredService[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const locationInputRef = useRef<HTMLInputElement>(null);
  const serviceInputRef = useRef<HTMLInputElement>(null);

  // Validation
  const isValidPincode = pincode.length === 6;
  const canSearch = isValidPincode && selectedService !== null;

  // Debounce service search
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

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= 6) {
      setPincode(val);
      // Auto-advance if 6 digits
      if (val.length === 6) {
        setTimeout(() => serviceInputRef.current?.focus(), 150);
      }
    }
  };

  const handlePincodeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isValidPincode) {
      e.preventDefault();
      serviceInputRef.current?.focus();
    }
  };

  const handleServiceSelect = (service: DiscoveredService) => {
    setSelectedService(service);
    setQuery("");
    setIsFocused(null);
  };

  const handleSubmit = () => {
    if (!canSearch) {
      if (!isValidPincode) locationInputRef.current?.focus();
      else if (!selectedService) serviceInputRef.current?.focus();
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      const serviceSlug = selectedService.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      router.push(`/services?location=${pincode}&category=${serviceSlug}`);
    }, 1500);
  };

  return (
    <div className="relative w-full z-30">
      {/* Main Pill Container */}
      <div 
        className={cn(
          "bg-white rounded-3xl md:rounded-full shadow-lg border border-slate-100 flex flex-col md:flex-row items-center p-2 transition-shadow duration-300",
          isFocused ? "shadow-xl border-slate-200" : ""
        )}
      >
        
        {/* 1. LOCATION SECTION */}
        <div 
          className="flex items-center w-full md:w-auto md:min-w-[200px] h-12 md:h-14 px-2 md:px-4 cursor-text"
          onClick={() => locationInputRef.current?.focus()}
        >
          <MapPin 
            className={cn(
              "w-5 h-5 shrink-0 transition-colors duration-300", 
              isFocused === "location" ? "text-[var(--color-primary)]" : "text-slate-400"
            )} 
          />
          <input
            ref={locationInputRef}
            type="text"
            inputMode="numeric"
            value={pincode}
            onChange={handlePincodeChange}
            onKeyDown={handlePincodeKeyDown}
            onFocus={() => setIsFocused("location")}
            onBlur={() => setTimeout(() => setIsFocused(null), 100)}
            placeholder="Enter your pincode"
            aria-label="Enter your pincode"
            className="w-full bg-transparent border-none outline-none text-base font-bold text-[#0A192F] placeholder:text-slate-400 placeholder:font-medium ml-3"
          />
          <AnimatePresence>
            {isValidPincode && (
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 ml-2"
              >
                <Check className="w-3 h-3 text-emerald-600 font-bold" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider Desktop */}
        <div className="hidden md:block w-px h-8 bg-slate-200 mx-2 shrink-0" />
        
        {/* Divider Mobile */}
        <div className="md:hidden w-[calc(100%-2rem)] h-px bg-slate-100 mx-auto my-1 shrink-0" />

        {/* 2. SERVICE SECTION */}
        <div 
          className={cn(
            "flex items-center flex-1 w-full h-12 md:h-14 px-2 md:px-4 cursor-text transition-opacity",
            !isValidPincode ? "opacity-50" : "opacity-100"
          )}
          onClick={() => {
            if (isValidPincode) serviceInputRef.current?.focus();
            else locationInputRef.current?.focus();
          }}
        >
          {!selectedService ? (
            <input
              ref={serviceInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                if (isValidPincode) setIsFocused("service");
                else locationInputRef.current?.focus();
              }}
              onBlur={() => setTimeout(() => setIsFocused(null), 200)}
              disabled={!isValidPincode}
              placeholder="Select a service"
              aria-label="Select a service"
              className="w-full bg-transparent border-none outline-none text-base font-bold text-[#0A192F] placeholder:text-slate-400 placeholder:font-medium"
            />
          ) : (
            <div className="flex items-center justify-between w-full pr-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{selectedService.icon}</span>
                <span className="font-bold text-[#0A192F] text-base">{selectedService.name}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedService(null);
                  setTimeout(() => serviceInputRef.current?.focus(), 50);
                }}
                className="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
                aria-label="Clear selected service"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          )}
        </div>

        {/* 3. CTA BUTTON */}
        <div className="w-full md:w-auto p-1 md:p-0 mt-2 md:mt-0 shrink-0">
          <button
            onClick={handleSubmit}
            disabled={!isValidPincode || isSubmitting}
            className={cn(
              "w-full md:w-auto h-12 md:h-12 rounded-full flex items-center justify-center gap-2 transition-all duration-300 font-bold group outline-none",
              isSubmitting 
                ? "bg-[var(--color-primary-light)] text-white cursor-wait px-6" 
                : canSearch 
                  ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-md shadow-[var(--color-primary)]/20 px-6" 
                  : isValidPincode
                    ? "bg-slate-100 text-[#0A192F] hover:bg-slate-200 px-6"
                    : "bg-slate-50 text-slate-300 md:w-12 md:px-0" // Small circle arrow on desktop when inactive
            )}
            aria-label={canSearch ? "Find Services" : "Next"}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 text-white animate-spin" />
                <span className="md:hidden lg:inline">Finding...</span>
              </>
            ) : canSearch ? (
              <>
                <span className="whitespace-nowrap">Find Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            ) : (
              <>
                <span className={cn("whitespace-nowrap", !isValidPincode && "md:hidden")}>Next</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* AUTOCOMPLETE DROPDOWN */}
      <AnimatePresence>
        {isFocused === "service" && isValidPincode && !selectedService && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[calc(100%+12px)] left-0 right-0 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-40 max-h-[320px] flex flex-col"
          >
            <div className="overflow-y-auto p-2 no-scrollbar">
              {query ? (
                isSearching ? (
                  <div className="p-4 text-center text-sm font-medium text-slate-500">Searching...</div>
                ) : suggestions.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    {suggestions.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => handleServiceSelect(service)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xl shadow-sm group-hover:bg-white transition-colors shrink-0">
                          {service.icon}
                        </div>
                        <div>
                          <div className="font-bold text-[#0A192F]">{service.name}</div>
                          <div className="text-xs text-slate-500 font-medium">{service.category}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm font-medium text-slate-500">No services found for "{query}"</div>
                )
              ) : (
                <div className="p-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">Popular Services</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {POPULAR_SERVICES.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => handleServiceSelect(service)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                      >
                        <span className="text-xl group-hover:scale-110 transition-transform">{service.icon}</span>
                        <span className="text-sm font-bold text-[#0A192F]">{service.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hide scrollbar logic for dropdown */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
