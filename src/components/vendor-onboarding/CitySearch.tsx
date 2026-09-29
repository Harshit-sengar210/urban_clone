"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Navigation, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_CITIES = [
  { id: "c1", name: "Delhi", region: "NCR" },
  { id: "c2", name: "Ghaziabad", region: "Uttar Pradesh" },
  { id: "c3", name: "Noida", region: "Uttar Pradesh" },
  { id: "c4", name: "Gurugram", region: "Haryana" },
  { id: "c5", name: "Faridabad", region: "Haryana" },
  { id: "c6", name: "Meerut", region: "Uttar Pradesh" },
  { id: "c7", name: "Mumbai", region: "Maharashtra" },
  { id: "c8", name: "Bangalore", region: "Karnataka" },
];

interface CitySearchProps {
  value: string;
  onChange: (city: string) => void;
  error?: boolean;
  onLocationFound?: (location: { city: string, locality: string, pinCode: string }) => void;
}

export function CitySearch({ value, onChange, error, onLocationFound }: CitySearchProps) {
  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync internal query with external value if changed from outside
  useEffect(() => {
    if (value !== query) {
      setQuery(value);
    }
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = MOCK_CITIES.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.region.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (cityName: string) => {
    setQuery(cityName);
    onChange(cityName);
    setIsOpen(false);
  };

  const handleUseMyLocation = () => {
    setIsLoadingLocation(true);
    setIsOpen(false);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`);
            const data = await res.json();
            
            const city = data.address.city || data.address.state_district || data.address.county || "Delhi";
            const locality = data.address.suburb || data.address.neighbourhood || data.address.village || data.address.residential || data.address.town || "Central";
            const pinCode = data.address.postcode || "110001";
            
            handleSelect(city);
            if (onLocationFound) {
              onLocationFound({ city, locality, pinCode });
            }
          } catch (error) {
            handleSelect("Ghaziabad");
            if (onLocationFound) {
              onLocationFound({ city: "Ghaziabad", locality: "Indirapuram", pinCode: "201014" });
            }
          } finally {
            setIsLoadingLocation(false);
          }
        },
        (error) => {
          handleSelect("Ghaziabad");
          if (onLocationFound) {
            onLocationFound({ city: "Ghaziabad", locality: "Indirapuram", pinCode: "201014" });
          }
          setIsLoadingLocation(false);
        }
      );
    } else {
      setTimeout(() => {
        handleSelect("Ghaziabad");
        if (onLocationFound) {
          onLocationFound({ city: "Ghaziabad", locality: "Indirapuram", pinCode: "201014" });
        }
        setIsLoadingLocation(false);
      }, 1000);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search your city"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              if (e.target.value === "") onChange("");
            }}
            onFocus={() => setIsOpen(true)}
            className={cn(
              "w-full h-12 pl-10 pr-4 rounded-xl border transition-all outline-none text-sm font-semibold",
              error && !value 
                ? "border-red-400 focus:ring-4 focus:ring-red-100 bg-red-50/50" 
                : isOpen 
                  ? "border-[var(--color-primary)] ring-4 ring-primary/10 bg-white" 
                  : "border-slate-200 hover:border-slate-300 bg-slate-50 focus:bg-white"
            )}
          />
          <Search className={cn(
            "w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 transition-colors",
            isOpen ? "text-[var(--color-primary)]" : "text-slate-400"
          )} />
        </div>
        
        <button
          type="button"
          onClick={handleUseMyLocation}
          disabled={isLoadingLocation}
          className="h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-colors shrink-0 disabled:opacity-70"
        >
          {isLoadingLocation ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-4 h-4 border-2 border-slate-300 border-t-slate-700 rounded-full"
            />
          ) : (
            <Navigation className="w-4 h-4 text-[var(--color-primary)]" />
          )}
          <span className="hidden sm:inline">{isLoadingLocation ? "Detecting..." : "My Location"}</span>
        </button>
      </div>

      {/* Autocomplete Dropdown */}
      <AnimatePresence>
        {isOpen && query && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-[calc(100%-140px)] sm:w-[calc(100%-150px)] mt-2 bg-white border border-slate-100 rounded-xl shadow-xl shadow-slate-200/50 overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto p-1">
              {filtered.length > 0 ? (
                filtered.map(city => (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => handleSelect(city.name)}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 hover:bg-slate-50 flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-[var(--color-primary)]/10 transition-colors">
                      <MapPin className="w-4 h-4 text-slate-400 group-hover:text-[var(--color-primary)] transition-colors" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{city.name}</p>
                      <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{city.region}</p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-6 text-center">
                  <p className="text-sm font-medium text-slate-500">No cities found.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
