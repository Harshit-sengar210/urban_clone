"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewPhotoGalleryProps {
  photos: string[];
  alt?: string;
}

export function ReviewPhotoGallery({ photos, alt = "Review photo" }: ReviewPhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const MAX_VISIBLE = 3;
  const visible = photos.slice(0, MAX_VISIBLE);
  const overflow = photos.length - MAX_VISIBLE;

  if (photos.length === 0) return null;

  return (
    <>
      <div className="flex gap-2 flex-wrap">
        {visible.map((src, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="relative w-14 h-14 rounded-xl overflow-hidden border border-[var(--color-border)] hover:opacity-90 transition-opacity"
          >
            <Image src={src} alt={`${alt} ${i + 1}`} fill className="object-cover" />
            {i === MAX_VISIBLE - 1 && overflow > 0 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-sm font-bold">+{overflow}</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" onClick={() => setLightboxIndex(null)}>
              <X className="w-5 h-5 text-white" />
            </button>
            {lightboxIndex > 0 && (
              <button className="absolute left-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center" onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => i! - 1); }}>
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
            )}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-2xl h-[70vh]"
              onClick={e => e.stopPropagation()}
            >
              <Image src={photos[lightboxIndex]} alt={`${alt} ${lightboxIndex + 1}`} fill className="object-contain" />
            </motion.div>
            {lightboxIndex < photos.length - 1 && (
              <button className="absolute right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center" onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => i! + 1); }}>
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            )}
            <div className="absolute bottom-4 text-white/60 text-xs font-medium">
              {lightboxIndex + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
