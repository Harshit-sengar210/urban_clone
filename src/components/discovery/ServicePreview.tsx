"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Star, Clock, Heart, CheckCircle2, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface ServicePreviewProps {
  serviceId: string | null;
  services: any[]; // Using any for simplicity here, but should use a proper type
  onClose: () => void;
}

export function ServicePreview({ serviceId, services, onClose }: ServicePreviewProps) {
  const service = services.find(s => s.id === serviceId);
  const [favorites, setFavorites] = useLocalStorage<string[]>("urbanclone-favorites", []);
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage<string[]>("urbanclone-recent", []);

  const isFavorite = serviceId ? favorites.includes(serviceId) : false;

  useEffect(() => {
    if (serviceId && service) {
      // Add to recently viewed
      setRecentlyViewed(prev => {
        const filtered = prev.filter(id => id !== serviceId);
        return [serviceId, ...filtered].slice(0, 10); // Keep last 10
      });
    }
  }, [serviceId, service, setRecentlyViewed]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!serviceId) return;
    
    if (isFavorite) {
      setFavorites(favorites.filter(id => id !== serviceId));
    } else {
      setFavorites([...favorites, serviceId]);
    }
  };

  const router = useRouter();
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);

  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkMediaQuery = () => setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
    checkMediaQuery();
    window.addEventListener('resize', checkMediaQuery);
    return () => window.removeEventListener('resize', checkMediaQuery);
  }, []);

  useEffect(() => {
    if (serviceId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [serviceId]);

  if (!serviceId || !service) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end md:items-start md:justify-end p-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />
        
        <motion.div
          initial={isDesktop ? { x: "100%", opacity: 0 } : { y: "100%", opacity: 0 }}
          animate={isDesktop ? { x: 0, opacity: 1 } : { y: 0, opacity: 1 }}
          exit={isDesktop ? { x: "100%", opacity: 0 } : { y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative bg-white w-full md:w-[480px] h-[90vh] md:h-screen md:rounded-l-3xl rounded-t-3xl overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Close button */}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image Header */}
          <div className="relative h-64 md:h-72 w-full shrink-0">
            <Image
              src={service.image}
              alt={service.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {service.badge && (
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-white text-black hover:bg-white/90 shadow-lg px-3 py-1">
                  {service.badge}
                </Badge>
              </div>
            )}
            
            <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{service.name}</h2>
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                <div className="flex items-center gap-1 bg-yellow-500 text-yellow-950 px-2 py-0.5 rounded-md">
                  <Star className="w-4 h-4 fill-yellow-950" />
                  <span>{service.rating} ({service.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[var(--color-muted)] font-medium text-sm block mb-1">Starting Price</span>
                <span className="text-3xl font-bold text-[var(--color-primary)]">₹{service.price}</span>
              </div>
              <button 
                onClick={toggleFavorite}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${isFavorite ? "border-red-200 bg-red-50 text-red-600" : "border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-surface-hover)]"} font-medium transition-colors`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                {isFavorite ? "Saved" : "Save"}
              </button>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold mb-3">About this service</h3>
              <p className="text-[var(--color-muted)] leading-relaxed">
                {service.description || "Professional service delivered by verified experts. Includes all necessary tools and supplies to ensure the best results for your home."}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold mb-3">What's included</h3>
              <ul className="space-y-3">
                {["Verified professionals", "Top quality supplies included", "Satisfaction guaranteed", "Transparent pricing"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-[var(--color-foreground)] font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 md:p-6 border-t border-[var(--color-border)] bg-white shrink-0 flex gap-4">
            <Button 
              variant="outline" 
              className="flex-1 h-14 text-base font-semibold hover:bg-[var(--color-surface-hover)]" 
              onClick={() => {
                setIsDetailsLoading(true);
                router.push(`/services/${service.slug || service.id}`);
              }}
              disabled={isDetailsLoading || isBookingLoading}
            >
              {isDetailsLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "View Full Details"}
            </Button>
            <Button 
              className="flex-1 h-14 text-base font-semibold bg-[var(--color-primary)] text-white shadow-lg shadow-primary/20 hover:bg-[var(--color-primary)]/90 transition-transform hover:scale-[1.02]" 
              onClick={() => {
                setIsBookingLoading(true);
                router.push(`/booking/${service.slug || service.id}`);
              }}
              disabled={isDetailsLoading || isBookingLoading}
            >
              {isBookingLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Book Now"}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
