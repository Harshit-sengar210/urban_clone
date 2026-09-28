"use client";

import { Home, Briefcase, MapPin } from "lucide-react";
import { AddressType } from "@/data/addresses";
import { cn } from "@/lib/utils";

const CONFIG = {
  home:  { icon: Home,      bg: "bg-blue-50",   color: "text-blue-600",   label: "Home" },
  work:  { icon: Briefcase, bg: "bg-purple-50",  color: "text-purple-600", label: "Work" },
  other: { icon: MapPin,    bg: "bg-orange-50",  color: "text-orange-500", label: "Other" },
};

interface AddressTypeIconProps {
  type: AddressType;
  size?: "sm" | "md" | "lg";
}

export function AddressTypeIcon({ type, size = "md" }: AddressTypeIconProps) {
  const cfg = CONFIG[type] || CONFIG.other;
  const sz = size === "sm" ? "w-8 h-8" : size === "lg" ? "w-12 h-12" : "w-10 h-10";
  const ico = size === "sm" ? 14 : size === "lg" ? 22 : 18;
  return (
    <div className={cn("rounded-xl flex items-center justify-center flex-shrink-0", sz, cfg.bg)}>
      <cfg.icon className={cfg.color} style={{ width: ico, height: ico }} />
    </div>
  );
}

export function AddressTypeLabel({ type }: { type: AddressType }) {
  return <span>{(CONFIG[type] || CONFIG.other).label}</span>;
}
