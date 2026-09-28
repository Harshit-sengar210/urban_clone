"use client";

import { motion } from "framer-motion";
import { TrackingData } from "@/data/tracking";
import { MapPin } from "lucide-react";

interface TrackingStatusProps {
  data: TrackingData;
}

export function TrackingStatus({ data }: TrackingStatusProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 p-6 text-white"
    >
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full pointer-events-none" />

      <div className="flex items-center gap-2 mb-3">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <span className="text-xs font-bold uppercase tracking-widest opacity-90">
          {data.status === "on_the_way" ? "ON THE WAY" : data.status.replace("_", " ").toUpperCase()}
        </span>
      </div>

      <p className="text-lg font-bold mb-1">
        {data.status === "on_the_way"
          ? "Your professional is heading to your location."
          : "Your professional has arrived."}
      </p>

      <div className="flex items-center gap-4 mt-4">
        <div>
          <p className="text-xs opacity-70 font-semibold mb-0.5">Estimated Arrival</p>
          <p className="text-2xl font-extrabold">{data.eta}</p>
        </div>
        <div className="w-px h-10 bg-white/20" />
        <div>
          <p className="text-xs opacity-70 font-semibold mb-0.5">Distance</p>
          <p className="text-2xl font-extrabold">{data.distance}</p>
        </div>
      </div>
    </motion.div>
  );
}
