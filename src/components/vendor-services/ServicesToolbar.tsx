"use client";

import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

interface ServicesToolbarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  categoryFilter: string;
  setCategoryFilter: (c: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
}

export function ServicesToolbar({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy
}: ServicesToolbarProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "cleaning", label: "Cleaning" },
    { value: "ac_repair", label: "AC & Appliance Repair" },
    { value: "electrician", label: "Electrician" },
    { value: "plumbing", label: "Plumbing" },
    { value: "carpentry", label: "Carpentry" },
    { value: "painting", label: "Painting" },
  ];

  const statuses = [
    { value: "all", label: "All Statuses" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const sorts = [
    { value: "recent", label: "Recently Updated" },
    { value: "name_asc", label: "Name A–Z" },
    { value: "name_desc", label: "Name Z–A" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
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
          placeholder="Search services..."
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
        
        <select 
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
        >
          {categories.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>

        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
        >
          {statuses.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
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
