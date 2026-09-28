"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Wrench, Zap, Droplet, Hammer, 
  Scissors, PaintRoller, Bug, ArrowRight 
} from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { cn } from "@/lib/utils";

// --- TYPES ---
type Service = {
  id: string;
  name: string;
  description: string;
  image: string;
  startingPrice: number;
  slug: string;
};

type ServiceCategory = {
  id: string;
  name: string;
  icon: any; // LucideIcon
  eyebrow: string;
  title: string;
  description: string;
  services: Service[];
};

// --- MOCK DATA ---
const CATEGORIES: ServiceCategory[] = [
  {
    id: "cleaning",
    name: "Cleaning",
    icon: Sparkles,
    eyebrow: "CLEANING",
    title: "Fresh spaces, without the hassle.",
    description: "Professional cleaning services for every corner of your home.",
    services: [
      { id: "c1", name: "Home Deep Cleaning", description: "Full home cleaning service", startingPrice: 999, slug: "home-deep-cleaning", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop" },
      { id: "c2", name: "Bathroom Cleaning", description: "Deep cleaning & sanitization", startingPrice: 399, slug: "bathroom-cleaning", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop" },
      { id: "c3", name: "Kitchen Cleaning", description: "Stain removal & deep clean", startingPrice: 499, slug: "kitchen-cleaning", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=600&auto=format&fit=crop" },
      { id: "c4", name: "Sofa Cleaning", description: "Dry & wet shampooing", startingPrice: 599, slug: "sofa-cleaning", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop" }
    ]
  },
  {
    id: "ac-appliance",
    name: "AC & Appliance",
    icon: Wrench,
    eyebrow: "AC & APPLIANCE",
    title: "Keep your home comfortable.",
    description: "Reliable repair, servicing and installation for your appliances.",
    services: [
      { id: "ac1", name: "AC Repair", description: "Detailed checkup & fix", startingPrice: 299, slug: "ac-repair", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop" },
      { id: "ac2", name: "AC Service", description: "Foam jet cleaning", startingPrice: 499, slug: "ac-service", image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=600&auto=format&fit=crop" },
      { id: "ac3", name: "AC Installation", description: "Safe mounting & setup", startingPrice: 799, slug: "ac-installation", image: "https://images.unsplash.com/photo-1596700858712-886884351a02?q=80&w=600&auto=format&fit=crop" },
      { id: "ac4", name: "AC Gas Refill", description: "Complete vacuum & refill", startingPrice: 1499, slug: "ac-gas-refill", image: "https://images.unsplash.com/photo-1522047384352-7fb7144e54e4?q=80&w=600&auto=format&fit=crop" }
    ]
  },
  {
    id: "electrician",
    name: "Electrician",
    icon: Zap,
    eyebrow: "ELECTRICAL",
    title: "Power problems, professionally handled.",
    description: "Safe and verified electricians for repairs and installations.",
    services: [
      { id: "e1", name: "Switch & Socket Repair", description: "Fix faulty switches", startingPrice: 99, slug: "switch-repair", image: "https://images.unsplash.com/photo-1621905252507-b35492d90cb0?q=80&w=600&auto=format&fit=crop" },
      { id: "e2", name: "Fan Installation", description: "Ceiling & exhaust fans", startingPrice: 149, slug: "fan-installation", image: "https://images.unsplash.com/photo-1582298538104-e3c6a4613a7c?q=80&w=600&auto=format&fit=crop" },
      { id: "e3", name: "Light Installation", description: "Wall, ceiling & fancy lights", startingPrice: 199, slug: "light-installation", image: "https://images.unsplash.com/photo-1563605370217-062e7428f203?q=80&w=600&auto=format&fit=crop" },
      { id: "e4", name: "Wiring & Repairs", description: "Concealed & open wiring", startingPrice: 299, slug: "wiring-repairs", image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b6?q=80&w=600&auto=format&fit=crop" }
    ]
  },
  {
    id: "plumbing",
    name: "Plumbing",
    icon: Droplet,
    eyebrow: "PLUMBING",
    title: "Expert fixes for all your leaks.",
    description: "Reliable plumbing solutions for bathrooms, kitchens & more.",
    services: [
      { id: "p1", name: "Tap Repair", description: "Fix dripping taps", startingPrice: 99, slug: "tap-repair", image: "https://images.unsplash.com/photo-1604145969248-1db4bba26978?q=80&w=600&auto=format&fit=crop" },
      { id: "p2", name: "Pipe Leakage", description: "Find & fix pipe leaks", startingPrice: 199, slug: "pipe-leakage", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=600&auto=format&fit=crop" },
      { id: "p3", name: "Bathroom Plumbing", description: "Toilet, shower & sink fittings", startingPrice: 299, slug: "bathroom-plumbing", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop" },
      { id: "p4", name: "Drain Cleaning", description: "Clear blocked drains", startingPrice: 399, slug: "drain-cleaning", image: "https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=600&auto=format&fit=crop" }
    ]
  },
  {
    id: "carpentry",
    name: "Carpentry",
    icon: Hammer,
    eyebrow: "CARPENTRY",
    title: "Craftsmanship for your furniture.",
    description: "Skilled carpenters for assembly, repair and custom work.",
    services: [
      { id: "ca1", name: "Furniture Repair", description: "Fix chairs, tables & beds", startingPrice: 199, slug: "furniture-repair", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop" },
      { id: "ca2", name: "Door Repair", description: "Hinges, locks & alignment", startingPrice: 249, slug: "door-repair", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop" },
      { id: "ca3", name: "Furniture Assembly", description: "Assemble flat-pack furniture", startingPrice: 299, slug: "furniture-assembly", image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=600&auto=format&fit=crop" },
      { id: "ca4", name: "Custom Carpentry", description: "Shelves, cabinets & more", startingPrice: 499, slug: "custom-carpentry", image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=600&auto=format&fit=crop" }
    ]
  }
];

function HoverImageSlider({ image, alt }: { image: string, alt: string }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Create 3 slightly different URLs to mock a 3-part image slider
  const images = [
    image,
    image + '&crop=entropy&h=400',
    image + '&crop=faces&h=400'
  ];

  useEffect(() => {
    if (!isHovered) {
      setActiveIdx(0);
      return;
    }
    const interval = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % 3);
    }, 1500);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div 
      className="relative w-full h-full group-hover:scale-105 transition-transform duration-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Image src={images[activeIdx]} alt={alt} fill className="object-cover" />
        </motion.div>
      </AnimatePresence>
      
      {/* 3 parts indicator */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {[0, 1, 2].map((idx) => (
          <div 
            key={idx}
            className={cn(
              "h-1 rounded-full transition-all duration-300",
              idx === activeIdx ? "w-4 bg-white" : "w-1.5 bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function ServicesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);
  
  const activeCategory = CATEGORIES[activeIdx];

  const paginate = (newIdx: number) => {
    setPage([newIdx, newIdx > activeIdx ? 1 : -1]);
    setActiveIdx(newIdx);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 30 : -30,
      opacity: 0
    })
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* HEADER */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
          <FadeUp delay={0.1}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">
              Our Services
            </span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0A192F] mb-4">
              Popular Services
            </h2>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-slate-600 font-medium text-lg">
              Everything your home needs, in one place.
            </p>
          </FadeUp>
        </div>

        {/* CATEGORY SELECTOR */}
        <FadeUp delay={0.4}>
          <div className="relative mb-12">
            <div className="flex overflow-x-auto hide-scrollbar pb-4 gap-2 md:gap-4 snap-x snap-mandatory md:justify-center">
              {CATEGORIES.map((cat, idx) => {
                const isActive = activeIdx === idx;
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => paginate(idx)}
                    className={cn(
                      "relative snap-center shrink-0 flex items-center gap-3 px-5 py-3 rounded-full font-bold transition-all duration-300 group",
                      isActive 
                        ? "bg-indigo-50 text-[var(--color-primary)] shadow-sm" 
                        : "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    )}
                    role="tab"
                    aria-selected={isActive}
                  >
                    <Icon className={cn(
                      "w-5 h-5 transition-transform duration-300",
                      isActive ? "scale-110" : "group-hover:scale-110"
                    )} />
                    <span className="whitespace-nowrap">{cat.name}</span>
                    
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryIndicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-[var(--color-primary)] rounded-t-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="absolute bottom-4 left-0 w-full h-px bg-slate-100 -z-10" />
          </div>
        </FadeUp>

        {/* DYNAMIC CONTENT AREA */}
        <div className="relative min-h-[500px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="w-full"
            >
              
              {/* Category Intro */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div className="max-w-xl">
                  <span className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-widest mb-3 block">
                    {activeCategory.eyebrow}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0A192F] mb-3">
                    {activeCategory.title}
                  </h3>
                  <p className="text-slate-500 font-medium">
                    {activeCategory.description}
                  </p>
                </div>
                
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    {activeCategory.services.length < 10 ? '0' + activeCategory.services.length : activeCategory.services.length} SERVICES
                  </span>
                </div>
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {activeCategory.services.map((service, sIdx) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, delay: sIdx * 0.1 }}
                  >
                    <Link
                      href={`/services/${service.slug}`}
                      className="group block h-full bg-white rounded-2xl border border-slate-100 overflow-hidden hover:border-indigo-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                        <HoverImageSlider image={service.image} alt={service.name} />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
                      </div>
                      
                      <div className="p-5 flex flex-col h-[calc(100%-11rem)]">
                        <h4 className="font-bold text-[#0A192F] text-lg mb-1">{service.name}</h4>
                        <p className="text-xs text-slate-500 font-medium mb-4 flex-1">{service.description}</p>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Starting at</span>
                            <span className="font-bold text-[#0A192F] group-hover:text-[var(--color-primary)] transition-colors">₹{service.startingPrice}</span>
                          </div>
                          <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-[var(--color-primary)] group-hover:bg-[var(--color-primary)] transition-colors">
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* View All CTA */}
              <div className="flex items-center">
                <Link
                  href={`/services?category=${activeCategory.id}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors group"
                >
                  View all {activeCategory.name} services
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hide scrollbar logic */}
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}} />
      </div>
    </section>
  );
}
