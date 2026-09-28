"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Wrench, MoreVertical, IndianRupee, Clock, Star, Edit, Copy, Trash2, PowerOff, Power, ArrowUp, ArrowDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { VendorService } from "@/types/vendor";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: VendorService;
  onEdit: (service: VendorService) => void;
  onDeactivate: (service: VendorService) => void;
  onActivate: (service: VendorService) => void;
  onDelete: (service: VendorService) => void;
  onFeature: (service: VendorService) => void;
  onMoveUp?: (service: VendorService) => void;
  onMoveDown?: (service: VendorService) => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export function ServiceCard({ 
  service, 
  onEdit, 
  onDeactivate, 
  onActivate, 
  onDelete, 
  onFeature,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast
}: ServiceCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isActive = service.status === "active";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "bg-white rounded-[1.5rem] p-5 shadow-sm border transition-all duration-200 group relative",
        isActive ? "border-slate-200 hover:shadow-md hover:border-indigo-100 hover:-translate-y-1" : "border-slate-200 bg-slate-50/50 opacity-80 hover:opacity-100",
        service.featured && "ring-1 ring-amber-400 border-amber-200 bg-amber-50/30"
      )}
    >
      {/* Featured Badge */}
      {service.featured && (
        <div className="absolute -top-3 -right-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-amber-500/20 z-10 flex items-center gap-1 border border-white/20">
          <Star className="w-3 h-3 fill-white" /> Featured
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
            isActive ? "bg-indigo-50 text-indigo-600" : "bg-slate-200 text-slate-500"
          )}>
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h3 className={cn("font-bold text-lg leading-tight", isActive ? "text-slate-900" : "text-slate-700")}>
              {service.serviceName}
            </h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
              {service.categoryName}
            </p>
          </div>
        </div>

        {/* More Menu */}
        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 5 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-1 w-48 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 py-2 z-20 overflow-hidden"
              >
                <button 
                  onClick={() => { setIsMenuOpen(false); onEdit(service); }}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" /> Edit Service
                </button>
                <button 
                  onClick={() => { setIsMenuOpen(false); onFeature(service); }}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 flex items-center gap-2"
                >
                  <Star className="w-4 h-4" /> {service.featured ? "Remove Featured" : "Mark as Featured"}
                </button>

                {/* Ordering */}
                <div className="border-t border-slate-100 my-1" />
                <button 
                  disabled={isFirst}
                  onClick={() => { setIsMenuOpen(false); onMoveUp?.(service); }}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 flex items-center gap-2 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ArrowUp className="w-4 h-4" /> Move Up
                </button>
                <button 
                  disabled={isLast}
                  onClick={() => { setIsMenuOpen(false); onMoveDown?.(service); }}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 flex items-center gap-2 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ArrowDown className="w-4 h-4" /> Move Down
                </button>

                <div className="border-t border-slate-100 my-1" />
                
                {isActive ? (
                  <button 
                    onClick={() => { setIsMenuOpen(false); onDeactivate(service); }}
                    className="w-full text-left px-4 py-2 text-sm font-medium text-amber-600 hover:bg-amber-50 flex items-center gap-2"
                  >
                    <PowerOff className="w-4 h-4" /> Deactivate Service
                  </button>
                ) : (
                  <button 
                    onClick={() => { setIsMenuOpen(false); onActivate(service); }}
                    className="w-full text-left px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 flex items-center gap-2"
                  >
                    <Power className="w-4 h-4" /> Activate Service
                  </button>
                )}
                
                <button 
                  onClick={() => { setIsMenuOpen(false); onDelete(service); }}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Delete Service
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-500 mb-6 line-clamp-2 min-h-[40px]">
        {service.description}
      </p>

      {/* Price & Duration */}
      <div className="flex justify-between items-center bg-slate-50 rounded-xl p-3 mb-6">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Starting From</p>
          <div className="flex items-center gap-1 font-black text-slate-900">
            <IndianRupee className="w-4 h-4 text-indigo-600" />
            {formatCurrency(service.startingPrice).replace('₹', '')}
          </div>
        </div>
        <div className="w-px h-8 bg-slate-200" />
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 text-right">Duration</p>
          <div className="flex items-center justify-end gap-1.5 font-bold text-slate-700">
            <Clock className="w-4 h-4 text-indigo-600" />
            {service.duration}
          </div>
        </div>
      </div>

      {/* Status & Actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            {isActive && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
            <span className={cn(
              "relative inline-flex rounded-full h-2 w-2",
              isActive ? "bg-emerald-500" : "bg-slate-400"
            )}></span>
          </span>
          <span className={cn(
            "text-xs font-bold uppercase tracking-widest",
            isActive ? "text-emerald-700" : "text-slate-500"
          )}>
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>

        <button 
          onClick={() => onEdit(service)}
          className={cn(
            "px-5 py-2 rounded-xl text-xs font-bold transition-colors group-hover:bg-indigo-600 group-hover:text-white",
            isActive ? "bg-indigo-50 text-indigo-700" : "bg-slate-100 text-slate-600"
          )}
        >
          Edit
        </button>
      </div>
    </motion.div>
  );
}
