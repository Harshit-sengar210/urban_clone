"use client";

import { motion } from "framer-motion";
import { Briefcase, TrendingUp, Users, CheckCircle2 } from "lucide-react";

export function VendorWelcomeVisual() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="h-full flex flex-col justify-center px-6 md:px-12 lg:px-16 py-8 bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/50 rounded-3xl md:rounded-none relative overflow-hidden"
    >
      {/* Background Abstract Shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100/30 blur-3xl rounded-full -translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 max-w-md mx-auto md:mx-0 w-full">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--color-foreground)] tracking-tight leading-[1.1] mb-4">
          Grow Your <br className="hidden lg:block" />
          <span className="text-[var(--color-primary)]">Service Business</span>
        </h2>
        <p className="text-lg text-[var(--color-muted)] mb-6 leading-relaxed font-medium">
          Connect with customers, manage your bookings, and grow your professional business with UrbanClone.
        </p>

        {/* Benefits Grid */}
        <div className="flex flex-col gap-4">
          <motion.div 
            animate={{ y: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100/50"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <h4 className="font-bold text-slate-800">Get More Bookings</h4>
              </div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [2, -2, 2] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100/50 ml-0 lg:ml-6"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <h4 className="font-bold text-slate-800">Track Your Earnings</h4>
              </div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [-3, 3, -3] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100/50"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <h4 className="font-bold text-slate-800">Manage Your Services</h4>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
