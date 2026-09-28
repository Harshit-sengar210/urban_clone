"use client";

import { motion } from "framer-motion";
import { Check, Receipt, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TransparentPricingSection() {
  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left: Content */}
          <div className="w-full lg:w-1/2">
            <span className="inline-block text-[10px] font-black text-[var(--color-primary)] uppercase tracking-widest mb-4">
              02 — TRANSPARENT PRICING
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-foreground)] tracking-tight mb-6 leading-tight">
              No Surprises <br className="hidden lg:block" />at Checkout.
            </h2>
            <p className="text-lg text-[var(--color-muted)] mb-8 max-w-lg leading-relaxed">
              See applicable service pricing before confirming your booking. We believe in transparency so you always know what you're paying for.
            </p>

            <ul className="space-y-5">
              {[
                "Clear service pricing listed upfront",
                "Visible offers and coupon application",
                "Booking total confirmed before payment"
              ].map((point, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 font-bold" />
                  </div>
                  <span className="text-[var(--color-foreground)] font-medium text-lg">{point}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right: Visual mockup */}
          <div className="w-full lg:w-1/2 relative flex justify-center">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-gradient-to-tl from-purple-100/50 to-indigo-50/50 rounded-full -z-10" />
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative w-full max-w-sm bg-white rounded-[2rem] p-8 shadow-2xl shadow-indigo-900/10 border border-slate-100 z-10"
            >
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
                  <Receipt className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-foreground)]">Booking Summary</h3>
                  <p className="text-xs font-medium text-slate-500">Home Cleaning</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-600">Base Service</span>
                  <span className="text-[var(--color-foreground)]">₹499</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-600">Additional Service</span>
                  <span className="text-[var(--color-foreground)]">₹0</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium text-green-600">
                  <span>Welcome Offer</span>
                  <span>- ₹100</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-4 border-t border-slate-100 mb-8">
                <span className="text-base font-bold text-[var(--color-foreground)]">Total</span>
                <span className="text-2xl font-black text-[var(--color-foreground)] tracking-tight">₹399</span>
              </div>

              <div className="flex items-center gap-2 mb-4 text-xs font-bold text-slate-500 uppercase tracking-widest justify-center">
                <CreditCard className="w-4 h-4" /> Price shown before booking
              </div>

              <Button className="w-full h-14 rounded-xl font-bold text-base shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                Continue Booking
              </Button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
