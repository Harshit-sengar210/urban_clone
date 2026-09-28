"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";

export function Testimonials() {
  const testimonials = [
    {
      name: "Priya Sharma",
      service: "Home Deep Cleaning",
      quote: "The professionals were incredibly polite and thorough. They transformed my apartment before I moved in. Truly premium service.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Rohan Desai",
      service: "AC Repair",
      quote: "Booked through the app and a verified technician fixed my AC within 2 hours during peak summer. Fantastic experience.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Sneha Patel",
      service: "Salon at Home",
      quote: "A complete game changer. Super professional, hygienic, and extremely convenient for my busy schedule. Highly recommend.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <FadeUp delay={0.1}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">
              Real Stories
            </span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0A192F]">
              What Our Customers Say
            </h2>
          </FadeUp>
        </div>

        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 md:gap-8 pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory no-scrollbar">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              className="min-w-[300px] w-[85vw] md:w-auto snap-center shrink-0 bg-[#FAF9F6] p-8 rounded-3xl relative border border-slate-100 group hover:border-indigo-100 transition-colors"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-slate-200/50 -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
              
              <div className="flex items-center gap-1 mb-6 relative z-10">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(test.rating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`} 
                  />
                ))}
              </div>
              
              <p className="text-slate-600 font-medium text-lg leading-relaxed mb-8 relative z-10">
                "{test.quote}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto relative z-10 border-t border-slate-200/60 pt-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <Image src={test.avatar} alt={test.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0A192F] text-sm">{test.name}</h4>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-primary)] mt-0.5">{test.service}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
