"use client";

import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Locate, X } from "lucide-react";
import { MOCK_LOCATION_SUGGESTIONS, DEMO_CURRENT_LOCATION } from "@/data/addresses";

interface LocationSearchProps {
  onSelect: (data: { area: string; city: string; state: string; pincode: string }) => void;
}

export function LocationSearch({ onSelect }: LocationSearchProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = query.trim().length > 1
    ? MOCK_LOCATION_SUGGESTIONS.filter((s) =>
        s.label.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setShowSuggestions(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (s: typeof MOCK_LOCATION_SUGGESTIONS[0]) => {
    setQuery(s.label);
    setShowSuggestions(false);
    onSelect({ area: s.area, city: s.city, state: s.state, pincode: s.pincode });
  };

  const handleCurrentLocation = () => {
    setDetecting(true);
    setTimeout(() => {
      setDetecting(false);
      setQuery("Sector 62, Noida (Current Location)");
      onSelect(DEMO_CURRENT_LOCATION);
    }, 1200);
  };

  return (
    <div className="mb-5">
      <label className="block text-sm font-bold text-[var(--color-foreground)] mb-2">Search your location</label>
      <div ref={ref} className="relative">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search area, building or locality..."
            className="w-full h-11 pl-10 pr-10 rounded-xl border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
          />
          {query && (
            <button onClick={() => { setQuery(""); setShowSuggestions(false); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Suggestions */}
        {showSuggestions && filtered.length > 0 && (
          <div className="absolute top-12 left-0 right-0 z-50 bg-white border border-[var(--color-border)] rounded-2xl shadow-xl overflow-hidden">
            {filtered.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSelect(s)}
                className="flex items-start gap-3 w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0"
              >
                <MapPin className="w-4 h-4 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-[var(--color-foreground)]">{s.label}</p>
                  <p className="text-xs text-[var(--color-muted)]">{s.state}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Current Location */}
      <button
        onClick={handleCurrentLocation}
        disabled={detecting}
        className="flex items-center gap-2 mt-2.5 text-sm font-semibold text-[var(--color-primary)] hover:underline disabled:opacity-50 transition-opacity"
      >
        <Locate className="w-4 h-4" />
        {detecting ? "Detecting location..." : "Use current location"}
      </button>
    </div>
  );
}
