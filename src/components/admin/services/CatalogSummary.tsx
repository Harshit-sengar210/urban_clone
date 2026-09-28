"use client";

import { motion } from "framer-motion";
import { FolderTree, Wrench, Package, FileEdit } from "lucide-react";
import type { adminCatalogData } from "@/data/adminCatalogData";

export function CatalogSummary({ summary }: { summary: typeof adminCatalogData.summary }) {
  const cards = [
    { id: "categories", label: "Active categories", value: summary.categories, icon: FolderTree, color: "text-blue-600", bg: "bg-blue-50" },
    { id: "services", label: "Active services", value: summary.services, icon: Wrench, color: "text-emerald-600", bg: "bg-emerald-50" },
    { id: "packages", label: "Active packages", value: summary.packages, icon: Package, color: "text-indigo-600", bg: "bg-indigo-50" },
    { id: "drafts", label: "Items requiring attention", value: summary.drafts, icon: FileEdit, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {cards.map((stat, i) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
          className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${stat.bg} ${stat.color}`}>
            <stat.icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#0A192F] tracking-tight leading-none mb-1">{stat.value}</h3>
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
