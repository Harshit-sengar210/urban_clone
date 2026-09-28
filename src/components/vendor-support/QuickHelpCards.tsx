"use client";

import { motion } from "framer-motion";
import {
  Calendar, DollarSign, User, Wrench, Lock, AlertCircle, ArrowRight,
  Star, Wifi
} from "lucide-react";
import { SupportCategory } from "@/types/vendor";
import { cn } from "@/lib/utils";

interface QuickHelpCard {
  category: SupportCategory;
  title: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
  accentBg: string;
}

const cards: QuickHelpCard[] = [
  {
    category: "booking",
    title: "Booking Help",
    description: "Manage requests, cancellations, and service bookings.",
    icon: <Calendar className="w-6 h-6" />,
    accent: "text-indigo-600",
    accentBg: "bg-indigo-50 border-indigo-100",
  },
  {
    category: "earnings",
    title: "Earnings & Payouts",
    description: "Understand earnings, payout status, and statements.",
    icon: <DollarSign className="w-6 h-6" />,
    accent: "text-emerald-600",
    accentBg: "bg-emerald-50 border-emerald-100",
  },
  {
    category: "verification",
    title: "Profile & Verification",
    description: "Update your profile and onboarding information.",
    icon: <User className="w-6 h-6" />,
    accent: "text-blue-600",
    accentBg: "bg-blue-50 border-blue-100",
  },
  {
    category: "services",
    title: "Services",
    description: "Manage your services, pricing, and availability.",
    icon: <Wrench className="w-6 h-6" />,
    accent: "text-purple-600",
    accentBg: "bg-purple-50 border-purple-100",
  },
  {
    category: "account",
    title: "Account & Security",
    description: "Manage passwords, notifications, and account settings.",
    icon: <Lock className="w-6 h-6" />,
    accent: "text-amber-600",
    accentBg: "bg-amber-50 border-amber-100",
  },
  {
    category: "technical",
    title: "Technical Issue",
    description: "Report a problem with the UrbanClone platform.",
    icon: <Wifi className="w-6 h-6" />,
    accent: "text-red-600",
    accentBg: "bg-red-50 border-red-100",
  },
];

interface QuickHelpCardsProps {
  onSelectCategory: (category: SupportCategory) => void;
}

export function QuickHelpCards({ onSelectCategory }: QuickHelpCardsProps) {
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Help</h2>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {cards.map((card) => (
          <motion.button
            key={card.category}
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ y: -2, transition: { duration: 0.15 } }}
            onClick={() => onSelectCategory(card.category)}
            className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all text-left group"
          >
            <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 transition-all", card.accentBg, card.accent)}>
              {card.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-indigo-700 transition-colors">{card.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{card.description}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
