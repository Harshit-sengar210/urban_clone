"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ServiceGalleryProps {
  images: string[];
  serviceName: string;
}

export function ServiceGallery({ images, serviceName }: ServiceGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const hasMultipleImages = images.length > 1;

  const changeImage = (newIndex: number) => {
    setDirection(newIndex > currentIndex ? 1 : -1);
    setCurrentIndex(newIndex);
  };

  const nextImage = () => changeImage((currentIndex + 1) % images.length);
  const prevImage = () => changeImage((currentIndex - 1 + images.length) % images.length);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative h-[300px] md:h-[400px] lg:h-[480px] w-full rounded-2xl md:rounded-[28px] overflow-hidden bg-slate-100 group">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, scale: 1.06, x: direction > 0 ? 40 : -40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1.03, x: direction > 0 ? -40 : 40 }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex]}
              alt={serviceName}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Mobile controls */}
        {hasMultipleImages && (
          <div className="md:hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Desktop Thumbnails */}
      {hasMultipleImages && (
        <div className="hidden md:flex gap-3">
          {images.slice(0, 4).map((img, idx) => (
            <button
              key={idx}
              onClick={() => changeImage(idx)}
              className={`relative h-20 w-28 rounded-xl overflow-hidden transition-all duration-300 ${
                idx === currentIndex ? "ring-2 ring-[var(--color-primary)] ring-offset-2 opacity-100" : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
