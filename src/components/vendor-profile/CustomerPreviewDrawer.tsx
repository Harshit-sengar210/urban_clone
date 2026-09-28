"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Star, MapPin, Briefcase, ChevronRight, ShieldCheck, Clock } from "lucide-react";
import { VendorProfile } from "@/types/vendor";
import { cn } from "@/lib/utils";

interface CustomerPreviewDrawerProps {
  profile: VendorProfile | null;
  onClose: () => void;
}

export function CustomerPreviewDrawer({ profile, onClose }: CustomerPreviewDrawerProps) {
  
  return (
    <AnimatePresence>
      {profile && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full md:max-w-2xl bg-slate-50 h-full shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 bg-white sticky top-0 z-20 border-b border-slate-100 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">
                  Customer Preview
                </span>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content (Simulating Customer App) */}
            <div className="flex-1 overflow-y-auto no-scrollbar relative">
              
              {/* Profile Cover & Avatar */}
              <div className="bg-white px-6 pt-8 pb-6 border-b border-slate-100 relative">
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-slate-100 to-white" />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-28 h-28 rounded-full border-4 border-white shadow-xl overflow-hidden mb-4 bg-slate-100">
                    <img src={profile.personal.avatar} alt={profile.personal.fullName} className="w-full h-full object-cover" />
                  </div>
                  
                  <h1 className="text-2xl font-black text-slate-900 flex items-center justify-center gap-2">
                    {profile.professional.displayName}
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  </h1>
                  
                  <p className="text-slate-500 mt-1">{profile.professional.profileType}</p>
                  
                  <div className="flex items-center justify-center gap-4 mt-4 text-sm font-bold">
                    <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      4.8 (120 reviews)
                    </div>
                    <div className="flex items-center gap-1 bg-slate-50 text-slate-700 px-3 py-1 rounded-full">
                      <Briefcase className="w-4 h-4 text-slate-400" />
                      {profile.experience.years}+ Years
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-6 space-y-6">
                
                {/* About */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900 mb-3">About</h2>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {profile.professional.description}
                  </p>
                  
                  <div className="mt-6 flex flex-col gap-3 pt-6 border-t border-slate-50 text-sm font-medium text-slate-600">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-indigo-500 shrink-0" />
                      Serving {profile.serviceArea.primaryCity} & {profile.serviceArea.radiusKm}km radius
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-indigo-500 shrink-0" />
                      Usually responds within 1 hour
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-slate-900">Services Offered</h2>
                  </div>
                  <div className="space-y-3">
                    {profile.services.map(service => (
                      <div key={service.id} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/50 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                            <img src={`/images/services/${service.categoryId}.jpg`} alt={service.serviceName} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900">{service.serviceName}</h3>
                            <p className="text-xs font-medium text-slate-500 mt-0.5">{service.duration} &middot; ₹{service.startingPrice}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Portfolio */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">Past Work</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {profile.portfolio.map(item => (
                      <div key={item.id} className="aspect-square rounded-2xl overflow-hidden bg-slate-100">
                        <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Sticky Action */}
            <div className="p-4 bg-white border-t border-slate-100 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] z-20">
              <button 
                disabled
                className="w-full py-4 rounded-xl bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/30 opacity-80 cursor-not-allowed flex flex-col items-center justify-center leading-none"
              >
                <span>Request Service</span>
                <span className="text-[10px] font-medium text-indigo-200 mt-1 opacity-70">Disabled in Preview Mode</span>
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
