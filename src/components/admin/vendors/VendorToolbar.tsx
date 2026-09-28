"use client";

import { useState } from "react";
import { Search, Filter, ArrowUpDown, Columns, Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function VendorToolbar({ 
  searchQuery, 
  setSearchQuery,
  filterCount,
  onExport
}: { 
  searchQuery: string; 
  setSearchQuery: (v: string) => void;
  filterCount: number;
  onExport: () => void;
}) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <div className="relative w-full sm:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search vendor name, business, service, location, or ID..."
          className="w-full pl-9 pr-4 h-10 bg-white border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-3 h-10 bg-white border rounded-lg text-sm font-medium transition-colors shadow-sm flex-shrink-0 ${
            filterCount > 0 ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {filterCount > 0 && (
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs">
              {filterCount}
            </span>
          )}
        </button>

        <button className="flex items-center gap-2 px-3 h-10 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-sm flex-shrink-0">
          <ArrowUpDown className="w-4 h-4" />
          <span>Sort</span>
        </button>

        <button className="flex items-center gap-2 px-3 h-10 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-sm flex-shrink-0">
          <Columns className="w-4 h-4" />
          <span className="hidden sm:inline">Columns</span>
        </button>

        <button 
          onClick={onExport}
          className="flex items-center gap-2 px-3 h-10 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-sm flex-shrink-0"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-48 right-8 z-20 w-80 bg-white rounded-xl shadow-xl border border-slate-100 p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#0A192F]">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
            </div>
            
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Service Category</label>
                <select className="w-full h-9 bg-slate-50 border border-slate-200 rounded-md text-sm px-2">
                  <option>All Categories</option>
                  <option>Cleaning</option>
                  <option>AC & Appliance</option>
                  <option>Beauty</option>
                  <option>Plumbing</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Verification</label>
                <select className="w-full h-9 bg-slate-50 border border-slate-200 rounded-md text-sm px-2">
                  <option>All</option>
                  <option>Complete</option>
                  <option>Pending Review</option>
                </select>
              </div>
              
              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Clear All</button>
                <button className="flex-1 px-3 py-2 bg-[var(--color-primary)] rounded-lg text-sm font-bold text-white shadow-sm" onClick={() => setShowFilters(false)}>Apply</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
