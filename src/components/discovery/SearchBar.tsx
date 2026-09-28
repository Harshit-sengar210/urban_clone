"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SearchSuggestions } from "./SearchSuggestions";
import { LocationSelector } from "./LocationSelector";
import { useRouter, useSearchParams } from "next/navigation";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("search") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Debounce logic for filtering will be handled by reading the query or pushing to URL.
  // For the actual search execution that updates the URL:
  const executeSearch = (searchQuery: string) => {
    setIsFocused(false);
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }
    // We navigate to /services with the new search param
    router.push(`/services?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeSearch(query);
    } else if (e.key === "Escape") {
      setIsFocused(false);
      e.currentTarget.blur();
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full z-40" ref={containerRef}>
      <div 
        className={`relative flex items-center bg-white rounded-2xl p-2 transition-all duration-300 ${
          isFocused ? 'shadow-xl shadow-primary/10 border-primary' : 'shadow-md border-[var(--color-border)]'
        } border`}
      >
        <LocationSelector />
        
        <div className="flex-grow flex items-center pl-3">
          <Search className="w-5 h-5 text-[var(--color-muted-foreground)] mr-2" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search for a service, category or professional..."
            className="border-0 shadow-none focus-visible:ring-0 px-0 h-12 text-base w-full"
            role="combobox"
            aria-expanded={isFocused}
            aria-controls="search-suggestions"
          />
        </div>
        
        <button 
          onClick={() => executeSearch(query)}
          className="hidden md:flex bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90 rounded-xl px-6 h-12 items-center font-medium shadow-md transition-colors"
        >
          Search
        </button>
      </div>

      <SearchSuggestions 
        query={query} 
        isFocused={isFocused} 
        onSelect={(val) => {
          setQuery(val);
          executeSearch(val);
        }} 
      />
    </div>
  );
}
