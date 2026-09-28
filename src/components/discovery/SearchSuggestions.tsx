"use client";

import { useEffect, useState } from "react";
import { Search, Clock, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ALL_SERVICES } from "@/data/services";
import { CATEGORIES } from "@/data/categories";

interface SearchSuggestionsProps {
  query: string;
  isFocused: boolean;
  onSelect: (value: string) => void;
}

export function SearchSuggestions({ query, isFocused, onSelect }: SearchSuggestionsProps) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  const recentSearches = ["AC Repair", "Deep Cleaning"];
  const popularSearches = ["✨ Home Cleaning", "❄️ AC Service", "⚡ Electrician", "🚿 Plumbing", "💇 Salon at Home"];

  const searchResults = debouncedQuery
    ? ALL_SERVICES.filter((s) => s.name.toLowerCase().includes(debouncedQuery.toLowerCase())).slice(0, 4)
    : [];
    
  const categoryResults = debouncedQuery 
    ? CATEGORIES.filter(c => c.name.toLowerCase().includes(debouncedQuery.toLowerCase())).slice(0, 2)
    : [];

  const subcategoryResults = debouncedQuery
    ? CATEGORIES.flatMap(c => c.subcategories)
        .filter(sub => sub.name.toLowerCase().includes(debouncedQuery.toLowerCase()))
        .slice(0, 2)
    : [];

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() 
            ? <mark key={i} className="bg-[var(--color-primary)]/20 text-[var(--color-primary)] font-semibold rounded px-0.5">{part}</mark> 
            : part
        )}
      </>
    );
  };

  return (
    <AnimatePresence>
      {isFocused && (
        <motion.div
          id="search-suggestions"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-xl border border-[var(--color-border)] overflow-hidden"
        >
          <div className="p-3">
            {!debouncedQuery ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
                <div>
                  <h4 className="text-xs font-semibold text-[var(--color-muted)] mb-3 uppercase tracking-wider">Recent Searches</h4>
                  <ul className="space-y-1">
                    {recentSearches.map(item => (
                      <li key={item}>
                        <button onClick={() => onSelect(item)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--color-surface-hover)] transition-colors text-left text-sm font-medium">
                          <Clock className="w-4 h-4 text-[var(--color-muted)]" />
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[var(--color-muted)] mb-3 uppercase tracking-wider">Popular Searches</h4>
                  <ul className="space-y-1">
                    {popularSearches.map(item => (
                      <li key={item}>
                        <button onClick={() => onSelect(item)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--color-surface-hover)] transition-colors text-left text-sm font-medium">
                          <Search className="w-4 h-4 text-[var(--color-primary)] opacity-70" />
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div>
                {(categoryResults.length > 0 || subcategoryResults.length > 0) && (
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-[var(--color-muted)] px-3 py-2 uppercase tracking-wider">Categories</h4>
                    <ul className="space-y-1">
                      {categoryResults.map(cat => (
                        <li key={`cat-${cat.id}`}>
                          <button onClick={() => onSelect(cat.name)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--color-surface-hover)] transition-colors text-left text-sm font-medium">
                            {cat.icon && (
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cat.color || "bg-gray-100"}`}>
                                <cat.icon className="w-4 h-4" />
                              </div>
                            )}
                            {highlightText(cat.name, debouncedQuery)}
                          </button>
                        </li>
                      ))}
                      {subcategoryResults.map(sub => (
                        <li key={`sub-${sub.id}`}>
                          <button onClick={() => onSelect(sub.name)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--color-surface-hover)] transition-colors text-left text-sm font-medium">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-50 text-gray-500">
                              <Search className="w-4 h-4" />
                            </div>
                            {highlightText(sub.name, debouncedQuery)}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {searchResults.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-[var(--color-muted)] px-3 py-2 uppercase tracking-wider">Services</h4>
                    <ul className="space-y-1">
                      {searchResults.map(service => (
                        <li key={service.id}>
                          <button onClick={() => onSelect(service.name)} className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[var(--color-surface-hover)] transition-colors text-left text-sm font-medium group">
                            <div className="flex items-center gap-3">
                              <Search className="w-4 h-4 text-[var(--color-muted)] group-hover:text-[var(--color-primary)] transition-colors" />
                              {highlightText(service.name, debouncedQuery)}
                            </div>
                            <ArrowRight className="w-4 h-4 text-[var(--color-muted)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {searchResults.length === 0 && categoryResults.length === 0 && (
                  <div className="p-8 text-center flex flex-col items-center">
                    <Search className="w-8 h-8 text-[var(--color-muted)] mb-3 opacity-50" />
                    <p className="text-[var(--color-foreground)] font-medium">No results found for "{debouncedQuery}"</p>
                    <p className="text-[var(--color-muted)] text-sm mt-1">Try checking for typos or searching with different keywords.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
