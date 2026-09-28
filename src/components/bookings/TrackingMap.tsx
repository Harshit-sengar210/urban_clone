"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { TrackingData } from "@/data/tracking";

interface TrackingMapProps {
  data: TrackingData;
  refreshed?: boolean;
}

export function TrackingMap({ data, refreshed }: TrackingMapProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative w-full rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-sm bg-[#e8f0e9]"
      style={{ height: 320 }}
    >
      {/* Map Background - Road grid pattern */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice">
        {/* Base */}
        <rect width="600" height="320" fill="#eef3ee" />
        {/* Road grid */}
        <rect x="0" y="140" width="600" height="18" fill="#fff" opacity="0.7" />
        <rect x="0" y="200" width="600" height="12" fill="#fff" opacity="0.5" />
        <rect x="150" y="0" width="20" height="320" fill="#fff" opacity="0.6" />
        <rect x="350" y="0" width="14" height="320" fill="#fff" opacity="0.5" />
        <rect x="480" y="0" width="10" height="320" fill="#fff" opacity="0.4" />
        {/* Blocks */}
        <rect x="20" y="20" width="110" height="100" rx="4" fill="#d4e6d5" opacity="0.8" />
        <rect x="20" y="168" width="110" height="100" rx="4" fill="#d4e6d5" opacity="0.8" />
        <rect x="190" y="20" width="140" height="100" rx="4" fill="#c9dfc9" opacity="0.8" />
        <rect x="190" y="168" width="140" height="60" rx="4" fill="#c9dfc9" opacity="0.7" />
        <rect x="383" y="20" width="80" height="110" rx="4" fill="#d0e8d0" opacity="0.8" />
        <rect x="383" y="168" width="80" height="60" rx="4" fill="#d0e8d0" opacity="0.7" />
        <rect x="500" y="60" width="80" height="70" rx="4" fill="#d4e6d5" opacity="0.8" />
        <rect x="500" y="168" width="80" height="60" rx="4" fill="#d4e6d5" opacity="0.7" />

        {/* Route dashed line from professional to destination */}
        <line
          x1="160" y1="80"
          x2="460" y2="220"
          stroke="#6C63FF"
          strokeWidth="3"
          strokeDasharray="8 6"
          opacity="0.7"
          className={refreshed ? "animate-pulse" : ""}
        />

        {/* Professional marker (animated) */}
        <g transform="translate(145, 60)">
          {/* Pulse ring */}
          <circle cx="15" cy="15" r="18" fill="#6C63FF" opacity="0.15">
            <animate attributeName="r" values="14;22;14" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0;0.2" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="15" cy="15" r="14" fill="#6C63FF" opacity="0.2" />
          {/* Icon bg */}
          <circle cx="15" cy="15" r="11" fill="#6C63FF" />
          <text x="15" y="20" textAnchor="middle" fontSize="11" fill="white">🏍</text>
          {/* Label */}
          <rect x="-10" y="30" width="50" height="16" rx="4" fill="white" opacity="0.9" />
          <text x="15" y="42" textAnchor="middle" fontSize="7" fill="#333" fontWeight="bold">{data.professional.split(" ")[0]}</text>
        </g>

        {/* Destination marker */}
        <g transform="translate(444, 200)">
          <circle cx="16" cy="16" r="12" fill="#fff" stroke="#ef4444" strokeWidth="2.5" />
          <text x="16" y="21" textAnchor="middle" fontSize="13">📍</text>
          <rect x="-12" y="30" width="56" height="16" rx="4" fill="white" opacity="0.9" />
          <text x="16" y="42" textAnchor="middle" fontSize="7" fill="#333" fontWeight="bold">Your Location</text>
        </g>
      </svg>

      {/* Live badge */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-[var(--color-border)] px-3 py-1.5 rounded-full shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">Live</span>
      </div>

      {/* ETA overlay */}
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm border border-[var(--color-border)] px-3 py-1.5 rounded-xl shadow-sm text-center">
        <p className="text-[10px] text-[var(--color-muted)] font-semibold">ETA</p>
        <p className="text-sm font-extrabold text-[var(--color-foreground)]">{data.eta}</p>
      </div>
    </motion.div>
  );
}
