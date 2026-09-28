"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, ShieldCheck, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function MeetProfessional() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <div className="mt-20 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-8"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0A192F] mb-2">Meet the professionals</h2>
        </motion.div>
        
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col md:flex-row items-center gap-8">
          {/* Left: Image Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="w-full md:w-1/3 shrink-0"
          >
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100">
              <Image 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" 
                alt="Professional" 
                fill 
                className="object-cover" 
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-xl p-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span className="font-bold text-slate-800 text-sm">Background Verified</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right: Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="flex-1 w-full"
          >
            <h3 className="text-xl md:text-2xl font-bold text-[#0A192F] mb-2">Your service is handled by trained professionals</h3>
            <p className="text-slate-500 mb-8">We ensure that every professional is vetted, trained, and highly experienced.</p>
            
            <div className="flex flex-col gap-6 mb-8">
              <div>
                <div className="font-bold text-lg text-[#0A192F]">Rohit S.</div>
                <div className="text-slate-500 text-sm">Beauty Specialist</div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-100 min-w-[100px]">
                  <div className="flex items-center gap-1 mb-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-amber-700">4.9</span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Rating</span>
                </div>
                
                <div className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-100 min-w-[100px]">
                  <span className="font-bold text-[#0A192F] mb-1">1,200+</span>
                  <span className="text-xs text-slate-500 font-medium">Services</span>
                </div>
                
                <div className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-100 min-w-[100px]">
                  <span className="font-bold text-[#0A192F] mb-1">5+ years</span>
                  <span className="text-xs text-slate-500 font-medium">Experience</span>
                </div>
              </div>
            </div>
            
            <Button onClick={() => setIsDrawerOpen(true)} variant="outline" className="h-12 px-6 rounded-xl border-slate-200 font-bold hover:bg-slate-50">
              View Professional
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md h-full bg-white shadow-2xl overflow-y-auto"
            >
              <div className="p-4 flex justify-end sticky top-0 z-10">
                <button onClick={() => setIsDrawerOpen(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="px-6 pb-8">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6 bg-slate-100 mx-auto">
                  <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" alt="Rohit S." fill className="object-cover" />
                </div>
                <h2 className="text-2xl font-bold text-center text-[#0A192F]">Rohit S.</h2>
                <p className="text-slate-500 text-center mb-6">Beauty Specialist</p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-50 p-4 rounded-2xl text-center">
                    <div className="font-bold text-xl text-[#0A192F]">4.9 <Star className="inline w-4 h-4 fill-amber-400 text-amber-400 -mt-1" /></div>
                    <div className="text-xs text-slate-500 mt-1">Overall Rating</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl text-center">
                    <div className="font-bold text-xl text-[#0A192F]">1.2k+</div>
                    <div className="text-xs text-slate-500 mt-1">Services Delivered</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl text-center">
                    <div className="font-bold text-xl text-[#0A192F]">5+ Yrs</div>
                    <div className="text-xs text-slate-500 mt-1">Experience</div>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-2xl text-center flex flex-col items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-emerald-500 mb-1" />
                    <div className="text-xs text-emerald-700 font-bold">Verified</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold text-[#0A192F] mb-3">About</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Rohit is one of our top-rated beauty specialists. With over 5 years of experience in premium salons, he ensures every service is delivered with utmost perfection and hygiene.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
