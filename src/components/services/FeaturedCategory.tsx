import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FeaturedCategory() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative rounded-[2rem] overflow-hidden bg-[var(--color-surface-hover)] group">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1600&auto=format&fit=crop"
              alt="Home Cleaning"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent md:w-2/3" />
          </div>
          
          <div className="relative z-10 p-8 md:p-16 flex flex-col justify-center min-h-[400px] md:min-h-[500px] max-w-2xl text-white">
            <div className="mb-4 text-white/80 font-semibold uppercase tracking-wider text-sm flex items-center gap-2">
              Featured Category
              <span className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-md text-xs backdrop-blur-sm text-white">
                <Star className="w-3.5 h-3.5 fill-current text-yellow-400" />
                4.8
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Home Cleaning</h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
              Fresh, spotless spaces without the hassle. Book verified professionals for deep cleaning, bathroom cleaning, and more.
            </p>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="flex flex-col">
                <span className="text-white/70 text-sm">Starting from</span>
                <span className="text-2xl font-bold">₹499</span>
              </div>
              <div className="w-px h-10 bg-white/30" />
              <div className="flex flex-col">
                <span className="text-white/70 text-sm">Available</span>
                <span className="text-lg font-semibold">12 Services</span>
              </div>
            </div>

            <Link href="/services/cleaning">
              <Button size="lg" className="bg-white text-[var(--color-foreground)] hover:bg-white/90">
                Explore Cleaning <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
