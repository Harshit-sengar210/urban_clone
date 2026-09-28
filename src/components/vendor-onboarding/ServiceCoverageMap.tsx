"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { markerEnter } from "./animations";

interface ServiceCoverageMapProps {
  city: string;
  locality: string;
  radiusKm: number;
}

export function ServiceCoverageMap({ city, locality, radiusKm }: ServiceCoverageMapProps) {
  // Normalize radius 3km-20km to a scale factor for the coverage circle
  // 3km = base size (e.g. scale 1)
  // 20km = max size (e.g. scale 2.5)
  const maxRadius = 20;
  const baseScale = 0.8;
  const scaleRatio = baseScale + (radiusKm / maxRadius) * 1.5;

  const hasLocation = city && locality;
  const displayLocation = hasLocation ? `${locality}, ${city}` : "Set your location";

  return (
    <div className="relative w-full h-64 md:h-full min-h-[250px] bg-slate-50 overflow-hidden flex items-center justify-center">
      
      {/* Abstract Map Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        {/* Abstract Grid / Blocks */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
        }} />
        
        {/* Fake roads / lines */}
        <div className="absolute w-full h-[2px] bg-slate-200 top-1/3 -rotate-12" />
        <div className="absolute w-[2px] h-full bg-slate-200 left-1/3 rotate-12" />
        <div className="absolute w-full h-[3px] bg-slate-300 top-2/3 rotate-6" />
        <div className="absolute w-[3px] h-full bg-slate-300 right-1/4 -rotate-6" />
        
        {/* Abstract Parks / Zones */}
        <div className="absolute w-32 h-32 bg-green-100 rounded-[40px] top-10 left-10 opacity-50 blur-sm" />
        <div className="absolute w-40 h-24 bg-blue-100 rounded-[30px] bottom-10 right-10 opacity-50 blur-sm" />
      </div>

      <AnimatePresence mode="wait">
        {hasLocation ? (
          <motion.div
            key="has-location"
            className="relative w-full h-full flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Coverage Circle */}
            <motion.div
              className="absolute rounded-full border border-indigo-500 bg-indigo-500/10 flex items-center justify-center shadow-[inset_0_0_20px_rgba(99,102,241,0.2)]"
              style={{ width: '200px', height: '200px' }}
              animate={{ 
                scale: scaleRatio,
                opacity: 1
              }}
              initial={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {/* Subtle inner ripple */}
              <motion.div 
                className="absolute inset-0 rounded-full border border-indigo-400/30"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Location Marker */}
            <motion.div
              variants={markerEnter}
              initial="hidden"
              animate="visible"
              className="relative z-10"
            >
              <div className="relative flex flex-col items-center">
                {/* Info Card floating above marker */}
                <motion.div 
                  className="absolute bottom-full mb-3 bg-white px-3 py-1.5 rounded-lg shadow-lg border border-slate-100 whitespace-nowrap flex flex-col items-center pointer-events-none"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Coverage Area</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-800">{displayLocation}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="text-xs font-extrabold text-[var(--color-primary)]">{radiusKm} km</span>
                  </div>
                  {/* Arrow pointing down */}
                  <div className="absolute -bottom-1.5 w-3 h-3 bg-white border-b border-r border-slate-100 rotate-45" />
                </motion.div>

                {/* Pin */}
                <div className="w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-[var(--color-primary)] relative">
                  <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center text-[var(--color-primary)]">
                    <MapPin className="w-4 h-4 fill-current" />
                  </div>
                  {/* Shadow base */}
                  <div className="absolute -bottom-1.5 w-1/2 h-1 bg-black/20 blur-[2px] rounded-full" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="empty-location"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative z-10 flex flex-col items-center text-center p-6 bg-white/80 backdrop-blur-md rounded-3xl shadow-sm border border-slate-100"
          >
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
              <Navigation className="w-5 h-5 text-slate-400" />
            </div>
            <h4 className="text-sm font-bold text-slate-800 mb-1">Set your service area</h4>
            <p className="text-xs font-medium text-slate-500 max-w-[200px]">
              Enter your primary location to see your coverage visualization.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative gradient overlays */}
      <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.03)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}
