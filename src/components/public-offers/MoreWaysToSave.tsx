"use client";

import { motion } from "framer-motion";
import { Sparkles, Calendar, Gift, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function MoreWaysToSave() {
  const cards = [
    {
      title: "First Booking",
      description: "Get special savings when you make your first booking with UrbanClone.",
      icon: Sparkles,
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Seasonal Offers",
      description: "Discover limited-time offers and holiday specials throughout the year.",
      icon: Calendar,
      color: "bg-orange-50 text-orange-600 border-orange-100",
    },
    {
      title: "Rewards",
      description: "Earn rewards through eligible bookings and referring friends.",
      icon: Gift,
      color: "bg-purple-50 text-[var(--color-primary)] border-purple-100",
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-[var(--color-foreground)] tracking-tight mb-4">
              More Ways to Save
            </h2>
            <p className="text-[var(--color-muted)] text-lg max-w-xl">
              Beyond standard coupons, we offer multiple avenues to make our premium services more affordable.
            </p>
          </div>
          
          <Button variant="outline" className="h-12 px-6 border-slate-300 font-bold group" asChild>
            <Link href="/dashboard/offers">
              View Rewards
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${card.color} mb-6`}>
                <card.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-3">{card.title}</h3>
              <p className="text-slate-600 font-medium leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
