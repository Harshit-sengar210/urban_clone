"use client";

import { motion } from "framer-motion";
import { UserCheck, ShieldCheck, Banknote, HeadphonesIcon } from "lucide-react";

export function ServiceQuality() {
  const features = [
    { title: "Verified professionals", desc: "Vetted and trained", icon: UserCheck, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Secure payments", desc: "100% safe", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "Transparent pricing", desc: "No hidden charges", icon: Banknote, color: "text-amber-500", bg: "bg-amber-50" },
    { title: "Service support", desc: "24/7 assistance", icon: HeadphonesIcon, color: "text-purple-500", bg: "bg-purple-50" }
  ];

  return (
    <div className="mt-20 mb-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="mb-8"
      >
        <h2 className="text-2xl lg:text-3xl font-bold text-[#0A192F] mb-2">The UrbanClone promise</h2>
      </motion.div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.15 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-default"
          >
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${feature.bg} ${feature.color}`}
            >
              <feature.icon className="w-5 h-5" />
            </motion.div>
            <h3 className="font-bold text-[#0A192F] text-sm md:text-base mb-1 leading-tight">{feature.title}</h3>
            <p className="text-xs text-slate-500">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
