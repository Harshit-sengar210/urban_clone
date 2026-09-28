"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, HeadphonesIcon, BellRing } from "lucide-react";

export function TrustSafetySection() {
  const cards = [
    {
      title: "Secure Payments",
      description: "Protected checkout experience.",
      icon: ShieldCheck,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100"
    },
    {
      title: "Privacy",
      description: "Your account information stays within your account experience.",
      icon: Lock,
      color: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
      title: "Booking Support",
      description: "Get assistance when something doesn't go as expected.",
      icon: HeadphonesIcon,
      color: "bg-purple-50 text-[var(--color-primary)] border-purple-100"
    },
    {
      title: "Service Tracking",
      description: "Stay updated throughout your booking.",
      icon: BellRing,
      color: "bg-amber-50 text-amber-600 border-amber-100"
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-foreground)] tracking-tight mb-4">
            Built With Trust in Mind
          </h2>
          <p className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
            We've engineered our platform to ensure your safety, security, and peace of mind during every step.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${card.color} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <card.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[var(--color-foreground)] text-lg mb-2">{card.title}</h3>
              <p className="text-sm font-medium text-slate-500 leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
