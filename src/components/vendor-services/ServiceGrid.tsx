"use client";

import { motion, AnimatePresence } from "framer-motion";
import { VendorService } from "@/types/vendor";
import { ServiceCard } from "./ServiceCard";
import { FileSearch } from "lucide-react";

interface ServiceGridProps {
  services: VendorService[];
  onEdit: (service: VendorService) => void;
  onDeactivate: (service: VendorService) => void;
  onActivate: (service: VendorService) => void;
  onDelete: (service: VendorService) => void;
  onFeature: (service: VendorService) => void;
  onMoveUp: (service: VendorService) => void;
  onMoveDown: (service: VendorService) => void;
  onClearFilters: () => void;
}

export function ServiceGrid({ 
  services, 
  onEdit, 
  onDeactivate, 
  onActivate, 
  onDelete, 
  onFeature,
  onMoveUp,
  onMoveDown,
  onClearFilters
}: ServiceGridProps) {
  
  if (services.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 text-center px-4"
      >
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
          <FileSearch className="w-10 h-10 text-indigo-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">No services found</h3>
        <p className="text-slate-500 mb-6 max-w-md">
          Try changing your search terms or adjusting the filters to find what you're looking for.
        </p>
        <button 
          onClick={onClearFilters}
          className="px-6 py-2.5 rounded-full border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors"
        >
          Clear Filters
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      layout
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      <AnimatePresence mode="popLayout">
        {services.map((service, index) => (
          <ServiceCard 
            key={service.id}
            service={service}
            onEdit={onEdit}
            onDeactivate={onDeactivate}
            onActivate={onActivate}
            onDelete={onDelete}
            onFeature={onFeature}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            isFirst={index === 0}
            isLast={index === services.length - 1}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
