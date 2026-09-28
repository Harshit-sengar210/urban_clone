"use client";

import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Calendar } from "lucide-react";
import { useState } from "react";

interface BookingToolbarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  dateFilter: string;
  setDateFilter: (d: string) => void;
  serviceFilter: string;
  setServiceFilter: (s: string) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
  uniqueServices: string[];
}

export function BookingToolbar({
  searchQuery,
  setSearchQuery,
  dateFilter,
  setDateFilter,
  serviceFilter,
  setServiceFilter,
  sortBy,
  setSortBy,
  uniqueServices
}: BookingToolbarProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const sorts = [
    { value: "recent", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price_desc", label: "Highest Amount" },
    { value: "price_asc", label: "Lowest Amount" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm"
    >
      {/* Search */}
      <div className="relative w-full md:max-w-[320px]">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search customer, ID, service..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-slate-900 placeholder:text-slate-400"
        />
      </div>

      {/* Mobile Filter Toggle */}
      <button 
        onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
        className="md:hidden w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters & Sorting
      </button>

      {/* Desktop Filters / Expanded Mobile Filters */}
      <div className={`w-full md:w-auto flex-col md:flex-row gap-3 ${isMobileFiltersOpen ? 'flex' : 'hidden md:flex'}`}>
        
        {/* Date Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="w-4 h-4 text-slate-400" />
          </div>
          <input 
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full md:w-auto pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
          />
        </div>

        <select 
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
          className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
        >
          <option value="all">All Services</option>
          {uniqueServices.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
        >
          {sorts.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
        
      </div>
    </motion.div>
  );
}
