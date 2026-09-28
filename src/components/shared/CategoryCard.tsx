import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  name: string;
  description?: string;
  icon?: React.ElementType;
  image?: string;
  color?: string;
  className?: string;
  serviceCount?: number;
}

export function CategoryCard({ name, description, icon: Icon, image, color, className, serviceCount }: CategoryCardProps) {
  return (
    <div
      className={cn(
        "group relative bg-white rounded-3xl p-6 border border-[var(--color-border)] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_40px_-15px_rgba(79,70,229,0.15)] hover:-translate-y-2 hover:border-[var(--color-primary-light)] transition-all duration-500 cursor-pointer overflow-hidden flex flex-col h-full",
        className
      )}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* 3D-like Icon Container */}
      <div className={cn(
        "relative w-16 h-16 flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 shadow-inner group-hover:rotate-3",
        !image && color, // Only apply background color if it's not an image
        !image && "rounded-2xl"
      )}>
        {/* Shine effect for icon, disabled for image */}
        {!image && <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />}
        
        {image ? (
          <div className="relative w-[72px] h-[72px]">
            <Image 
              src={image} 
              alt={name} 
              fill 
              className="object-contain drop-shadow-xl"
            />
          </div>
        ) : (
          Icon && <Icon className="w-8 h-8 relative z-10 drop-shadow-md" />
        )}
      </div>
      
      <h3 className="font-bold text-xl text-[var(--color-foreground)] mb-2 group-hover:text-[var(--color-primary)] transition-colors relative z-10">
        {name}
      </h3>
      <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-6 flex-grow relative z-10">
        {description}
      </p>
      
      <div className="flex items-center justify-between mt-auto relative z-10">
        {serviceCount !== undefined ? (
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
            {serviceCount} Services
          </span>
        ) : (
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
            Explore
          </span>
        )}
        
        <ArrowRight className="w-5 h-5 text-[var(--color-muted)] group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all duration-300" />
      </div>
    </div>
  );
}
