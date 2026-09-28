"use client";

import { motion } from "framer-motion";
import { Star, ShieldCheck, Phone, MessageCircle } from "lucide-react";
import { TrackingData } from "@/data/tracking";

interface LiveProfessionalCardProps {
  data: TrackingData;
  onAction: (type: "call" | "message") => void;
}

export function LiveProfessionalCard({ data, onAction }: LiveProfessionalCardProps) {
  const initials = data.professional.split(" ").map(n => n[0]).join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.12 }}
      className="bg-white border border-[var(--color-border)] rounded-2xl shadow-sm p-5"
    >
      <h3 className="font-bold text-[var(--color-foreground)] mb-4">Your Professional</h3>

      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            {initials}
          </div>
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
        </div>
        <div className="flex-1">
          <p className="font-extrabold text-[var(--color-foreground)]">{data.professional}</p>
          <p className="text-xs text-[var(--color-muted)]">{data.professionalCategory}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold text-[var(--color-foreground)]">{data.professionalRating}</span>
            <span className="text-xs text-[var(--color-muted)]">· {data.professionalJobs} services</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-green-700 font-semibold mb-4 px-3 py-2 bg-green-50 rounded-lg">
        <ShieldCheck className="w-3.5 h-3.5" /> Verified Professional
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onAction("call")}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl border border-[var(--color-border)] text-sm font-bold text-[var(--color-foreground)] hover:bg-green-50 hover:border-green-200 transition-colors"
        >
          <Phone className="w-4 h-4 text-green-500" /> Call
        </button>
        <button
          onClick={() => onAction("message")}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl border border-[var(--color-border)] text-sm font-bold text-[var(--color-foreground)] hover:bg-blue-50 hover:border-blue-200 transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-blue-500" /> Message
        </button>
      </div>
    </motion.div>
  );
}
