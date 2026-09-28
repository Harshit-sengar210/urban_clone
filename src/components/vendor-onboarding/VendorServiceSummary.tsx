"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import { serviceCategories, serviceCatalog, VendorService, ServiceCategory } from "@/data/mockVendorServices";
import { summaryUpdate } from "./animations";

interface VendorServiceSummaryProps {
  selectedCategoryIds: string[];
  selectedServiceIds: string[];
  skills: string[];
  configurations: any[]; // We will type this properly in the page
}

export function VendorServiceSummary({ selectedCategoryIds, selectedServiceIds, skills, configurations }: VendorServiceSummaryProps) {
  const [identity, setIdentity] = useState<{ name: string, type: string }>({ name: "Your Name", type: "Professional" });

  useEffect(() => {
    try {
      const step3 = localStorage.getItem("vendor_onboarding_step3");
      if (step3) {
        const data = JSON.parse(step3);
        const name = data.profileType === "business" && data.businessName ? data.businessName : data.professionalName;
        const type = data.profileType === "business" ? (data.businessType || "Business / Agency") : "Individual Professional";
        if (name) setIdentity({ name, type });
      }
    } catch (e) {}
  }, []);

  const selectedCats = serviceCategories.filter(c => selectedCategoryIds.includes(c.id));
  const selectedServs = serviceCatalog.filter(s => selectedServiceIds.includes(s.id));

  // Determine starting price (minimum among configured)
  const configuredPrices = configurations
    .map(c => c.startingPrice)
    .filter(p => p !== null && p > 0) as number[];
  
  const startingPrice = configuredPrices.length > 0 ? Math.min(...configuredPrices) : null;

  return (
    <div className="w-full h-full flex flex-col justify-center px-6 py-12 md:px-12 bg-slate-50 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/40 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100/40 blur-3xl rounded-full -translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 w-full max-w-[360px] mx-auto">
        <h2 className="text-xl font-extrabold text-[var(--color-foreground)] mb-6 text-center md:text-left">
          Your Service Profile
        </h2>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
          <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-600" />
          
          <div className="p-6">
            <div className="flex items-start justify-between mb-6 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 truncate max-w-[200px]">{identity.name}</h3>
                <p className="text-xs font-semibold text-[var(--color-primary)]">{identity.type}</p>
              </div>
              <div className="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-1 rounded text-[10px] font-bold uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                Pro
              </div>
            </div>

            {/* Categories & Services Summary */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Services Offered</span>
              </div>
              
              <div className="space-y-4">
                {selectedCats.length === 0 && (
                  <p className="text-sm font-medium text-slate-400 italic">No services selected yet.</p>
                )}
                
                <AnimatePresence>
                  {selectedCats.map(category => {
                    const catServices = selectedServs.filter(s => s.categoryId === category.id);
                    return (
                      <motion.div key={category.id} layout initial="initial" animate="animate" exit="exit" variants={summaryUpdate}>
                        <h4 className="text-sm font-bold text-slate-800 mb-1">{category.name}</h4>
                        {catServices.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {catServices.map(service => (
                              <motion.span 
                                key={service.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                              >
                                {service.name}
                              </motion.span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[11px] font-medium text-slate-400">0 services</p>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Price Summary */}
            <div className="flex items-center justify-between mb-6 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs font-bold text-slate-500">Starting price</span>
              <AnimatePresence mode="wait">
                <motion.span 
                  key={startingPrice || 'none'}
                  variants={summaryUpdate}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="text-sm font-extrabold text-[var(--color-primary)]"
                >
                  {startingPrice ? `₹${startingPrice}` : '—'}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Skills Summary */}
            <div>
              <span className="text-xs font-bold text-slate-500 block mb-2">Skills</span>
              <div className="flex flex-wrap gap-1.5 min-h-[24px]">
                {skills.length === 0 && <span className="text-xs text-slate-300">None added</span>}
                <AnimatePresence>
                  {skills.map(skill => (
                    <motion.span
                      key={skill}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-[10px] font-bold bg-purple-50 text-purple-700 px-2 py-1 rounded-full border border-purple-100"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
