"use client";

import { motion } from "framer-motion";
import { Check, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { OnboardingProgress } from "./OnboardingProgress";

export function VendorOnboardingWelcome() {
  const checklist = [
    "Personal information",
    "Your services",
    "Service area",
    "Experience & professional details",
    "Identity verification",
    "Payout details",
    "Availability"
  ];

  return (
    <div className="max-w-xl mx-auto w-full px-6 py-2 md:py-4">
      <OnboardingProgress currentStep={1} totalSteps={9} label="Getting Started" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className="inline-block px-3 py-1 bg-purple-50 text-[var(--color-primary)] text-[10px] font-black uppercase tracking-widest rounded-full mb-2">
          UrbanClone Partner
        </span>
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-foreground)] tracking-tight mb-2">
          Become an UrbanClone Partner
        </h1>
        
        <p className="text-slate-500 text-sm font-medium leading-relaxed mb-3">
          Turn your skills into a growing service business. Complete your profile, get verified, and start connecting with customers in your service area.
        </p>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-4">
          <p className="font-bold text-sm text-slate-900 uppercase tracking-widest mb-2">
            Your onboarding includes
          </p>
          <ul className="space-y-1.5 mb-3">
            {checklist.map((item, idx) => (
              <motion.li 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + (idx * 0.05) }}
                className="flex items-center gap-3 text-sm font-medium text-slate-600"
              >
                <div className="w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-slate-400" />
                </div>
                {item}
              </motion.li>
            ))}
          </ul>

          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-0.5">Quick & Simple</h4>
              <p className="text-xs font-medium text-slate-500">
                Complete your partner profile in a few guided steps. Approximately 5–10 minutes.
              </p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Button size="lg" className="w-full h-11 text-base font-bold shadow-xl shadow-primary/20 group hover:-translate-y-0.5 transition-all" asChild>
            <Link href="/vendor/onboarding/personal">
              <span className="flex items-center justify-center">
                Let's Get Started
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </Button>

          <div className="mt-2 text-center">
            <p className="text-sm font-medium text-slate-500">
              Already have an account?{" "}
              <Link href="/vendor/login" className="font-bold text-[var(--color-primary)] hover:underline">
                Login as Vendor
              </Link>
            </p>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
