"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Copy, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/bookings/Toast";

export function PublicFeaturedOffer() {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();
  
  const code = "FIRST200";

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    showToast("Coupon code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="featured" className="py-12 md:py-16 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[var(--color-foreground)] tracking-tight mb-2">Featured Offer</h2>
          <p className="text-[var(--color-muted)] text-sm">Our best deal available right now.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full rounded-[2rem] overflow-hidden bg-[var(--color-surface-hover)] border border-[var(--color-border)] shadow-sm flex flex-col md:flex-row"
        >
          {/* Left Side: Offer Focus */}
          <div className="md:w-[55%] p-8 md:p-12 bg-white relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-0 opacity-50" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-[10px] font-extrabold uppercase tracking-widest mb-6">
                <Sparkles className="w-3.5 h-3.5" /> Welcome Offer
              </span>
              
              <h3 className="text-5xl lg:text-6xl font-black text-[var(--color-foreground)] tracking-tighter mb-4">
                ₹200 OFF
              </h3>
              
              <p className="text-lg text-[var(--color-muted)] mb-8 font-medium max-w-sm">
                Get ₹200 off your first UrbanClone service booking across all categories.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center w-full sm:w-auto h-14 bg-slate-50 border border-slate-200 rounded-xl px-5 text-lg font-mono font-bold tracking-widest text-slate-600">
                  {code}
                </div>
                <button 
                  onClick={handleCopy}
                  className="w-full sm:w-auto h-14 px-8 rounded-xl bg-[var(--color-foreground)] text-white font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-green-400" /> Copied ✓
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" /> Copy Code
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: How to Use */}
          <div className="md:w-[45%] p-8 md:p-12 border-t md:border-t-0 md:border-l border-[var(--color-border)] flex flex-col justify-center">
            <h4 className="text-lg font-bold text-[var(--color-foreground)] mb-6">How to use</h4>
            
            <ol className="space-y-6 relative">
              <div className="absolute left-4 top-2 bottom-2 w-px bg-slate-200 -z-10" />
              
              <li className="flex gap-4 items-start bg-white">
                <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold flex items-center justify-center shrink-0 border-2 border-white">
                  1
                </div>
                <p className="text-sm font-medium text-[var(--color-foreground)] pt-1.5">Choose any eligible service.</p>
              </li>
              <li className="flex gap-4 items-start bg-white">
                <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold flex items-center justify-center shrink-0 border-2 border-white">
                  2
                </div>
                <p className="text-sm font-medium text-[var(--color-foreground)] pt-1.5">Add the coupon during checkout.</p>
              </li>
              <li className="flex gap-4 items-start bg-white">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold flex items-center justify-center shrink-0 border-2 border-white">
                  3
                </div>
                <p className="text-sm font-medium text-[var(--color-foreground)] pt-1.5">Enjoy your discount immediately.</p>
              </li>
            </ol>

            <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                Valid for first-time users only
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                Minimum booking value: ₹799
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400 italic">
                <div className="w-1.5 h-1.5 rounded-full bg-transparent" />
                Demo offer only
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
