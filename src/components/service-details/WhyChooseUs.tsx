"use client";

import { ShieldCheck, IndianRupee, Lock, Award } from "lucide-react";

export function WhyChooseUs() {
  const reasons = [
    { icon: ShieldCheck, text: "Verified Professionals" },
    { icon: IndianRupee, text: "Transparent Pricing" },
    { icon: Lock, text: "Secure Payments" },
    { icon: Award, text: "Quality Assurance" }
  ];

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-[var(--color-foreground)]">Why choose UrbanClone?</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {reasons.map((reason, idx) => (
          <div key={idx} className="flex flex-col items-center text-center p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <reason.icon className="w-6 h-6" />
            </div>
            <span className="font-semibold text-sm text-[var(--color-foreground)]">{reason.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
