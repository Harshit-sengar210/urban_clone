"use client";

import Image from "next/image";
import { Star, Clock, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { motion } from "framer-motion";

export interface ServiceCardProps {
  id?: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  duration: string;
  badge?: string;
  gallery?: string[];
  onViewDetails?: () => void;
}

export function ServiceCard({ id, name, image, price, rating, reviewCount, duration, badge, gallery, onViewDetails }: ServiceCardProps) {
  const [favorites, setFavorites] = useLocalStorage<string[]>("urbanclone-favorites", []);
  
  const isFavorite = id ? favorites.includes(id) : false;

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!id) return;
    
    if (isFavorite) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const hoverImage = gallery && gallery.length > 1 ? gallery[1] : null;

  return (
    <Card 
      className="group relative overflow-hidden border border-transparent hover:border-slate-200 transition-all duration-300 flex flex-col h-full cursor-pointer hover:shadow-xl hover:-translate-y-[5px] bg-white rounded-2xl"
      onClick={onViewDetails}
    >
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 shrink-0">
        {badge && (
          <div className="absolute top-3 left-3 z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
            <Badge className="bg-white/95 text-[#0A192F] hover:bg-white border border-slate-100 shadow-sm backdrop-blur-md px-2.5 py-1">
              {badge}
            </Badge>
          </div>
        )}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleFavorite}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-white transition-colors shadow-sm"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`w-4 h-4 transition-colors ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
        </motion.button>
        <Image
          src={image}
          alt={name}
          fill
          className={`object-cover transition-all duration-700 group-hover:scale-[1.04] ${hoverImage ? 'group-hover:opacity-0' : ''}`}
        />
        {hoverImage && (
          <Image
            src={hoverImage}
            alt={`${name} secondary`}
            fill
            className="object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-[1.04] absolute inset-0"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardContent className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg leading-tight line-clamp-2 pr-4 text-[#0A192F] group-hover:text-[var(--color-primary)] transition-colors">{name}</h3>
          <div className="flex flex-col items-end shrink-0">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 whitespace-nowrap">From</span>
            <span className="font-bold text-lg text-[#0A192F]">₹{price}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-5">
          <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100/50">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-amber-700">{rating}</span>
            <span className="text-amber-600/60 text-xs font-semibold">({reviewCount})</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>{duration}</span>
          </div>
        </div>

        <div className="mt-auto flex gap-2 pt-2 border-t border-slate-100">
          <Button 
            className="w-full font-bold bg-[#FAF9F6] text-[#0A192F] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 group/btn hover:-translate-y-[1px] hover:shadow-md" 
            onClick={(e) => { e.stopPropagation(); /* Mock booking */ }}
          >
            <span className="flex items-center gap-1.5">
              Book
              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-4 w-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 group-hover/btn:w-4 transition-all duration-300 ease-out" />
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
