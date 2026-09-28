"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface SupportHeroProps {
  onSearch: (q: string) => void;
  onPopularClick: (question: string) => void;
}

export function SupportHero({ onSearch, onPopularClick }: SupportHeroProps) {
  const [query, setQuery] = useState("");

  const popular = [
    "How do I cancel my booking?",
    "How can I reschedule a service?",
    "Where is my refund?",
    "My payment failed",
    "My professional hasn't arrived",
  ];

  return (
    <div className="bg-gradient-to-br from-slate-800 to-[var(--color-primary)] rounded-3xl p-8 md:p-12 mb-10 shadow-lg text-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl translate-y-1/2" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">How can we help?</h1>
        <p className="text-white/80 font-medium mb-8">Search for answers or tell us what happened.</p>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch(e.target.value);
            }}
            placeholder="Search for help..."
            className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white text-[var(--color-foreground)] text-lg shadow-xl focus:outline-none focus:ring-4 focus:ring-white/20 transition-all placeholder:text-slate-400"
          />
        </div>

        <div>
          <p className="text-xs font-bold text-white/60 uppercase tracking-wider mb-3">Popular Questions</p>
          <div className="flex flex-wrap justify-center gap-2">
            {popular.map((q) => (
              <button
                key={q}
                onClick={() => onPopularClick(q)}
                className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-sm font-semibold transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
