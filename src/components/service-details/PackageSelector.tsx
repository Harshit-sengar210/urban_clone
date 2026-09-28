"use client";

import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  includedCount: number;
}

interface PackageSelectorProps {
  packages: Package[];
  selectedId: string;
  onSelect: (pkg: Package) => void;
}

export function PackageSelector({ packages, selectedId, onSelect }: PackageSelectorProps) {
  if (!packages || packages.length === 0) return null;

  return (
    <div className="mt-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="mb-8"
      >
        <h2 className="text-2xl lg:text-3xl font-bold text-[#0A192F] mb-2">Choose your package</h2>
        <p className="text-slate-500 font-medium">Select a package that best fits your needs.</p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {packages.map((pkg, idx) => {
          const isSelected = pkg.id === selectedId;
          
          return (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onSelect(pkg)}
              className={`relative p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden ${
                isSelected 
                  ? "border-[var(--color-primary)] bg-indigo-50/30 shadow-md shadow-indigo-100" 
                  : "border-slate-100 bg-white hover:border-slate-300 hover:shadow-sm"
              }`}
              whileHover={!isSelected ? { scale: 1.01 } : {}}
              animate={isSelected ? { scale: 1.02 } : { scale: 1 }}
            >
              {isSelected && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </motion.div>
              )}
              
              <h3 className="font-bold text-lg text-[#0A192F] mb-1 pr-8">{pkg.name}</h3>
              <p className="text-sm text-slate-500 mb-4 line-clamp-2 min-h-[40px]">{pkg.description}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <span className="text-[#0A192F] font-bold text-lg">₹{pkg.price}</span>
                  <div className="w-1 h-1 rounded-full bg-slate-300" />
                  <div className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-4 h-4" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>
                <div className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                  {pkg.includedCount} included
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
