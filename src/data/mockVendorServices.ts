import { Droplets, Wrench, Zap, Paintbrush, Bug, Sparkles, Scissors, Hammer } from "lucide-react";

export type ServiceCategory = {
  id: string;
  name: string;
  description: string;
  iconName: string;
};

export type VendorService = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  basePriceHint?: number;
};

export const serviceCategories: ServiceCategory[] = [
  { id: "c1", name: "Home Cleaning", description: "Cleaning and home care services", iconName: "Sparkles" },
  { id: "c2", name: "AC & Appliance Repair", description: "Repair and service for home appliances", iconName: "Wrench" },
  { id: "c3", name: "Electrician", description: "Electrical repairs and installations", iconName: "Zap" },
  { id: "c4", name: "Plumbing", description: "Pipes, leaks, and bathroom fittings", iconName: "Droplets" },
  { id: "c5", name: "Carpentry", description: "Furniture repair and woodwork", iconName: "Hammer" },
  { id: "c6", name: "Painting", description: "Wall painting and waterproofing", iconName: "Paintbrush" },
  { id: "c7", name: "Pest Control", description: "Termite, cockroach, and pest removal", iconName: "Bug" },
  { id: "c8", name: "Beauty & Wellness", description: "Salon and spa services at home", iconName: "Scissors" },
];

export const serviceCatalog: VendorService[] = [
  // Home Cleaning
  { id: "s1_1", categoryId: "c1", name: "Full Home Deep Cleaning", description: "Intensive cleaning for all rooms.", basePriceHint: 2999 },
  { id: "s1_2", categoryId: "c1", name: "Bathroom Cleaning", description: "Deep cleaning for tiles and fixtures.", basePriceHint: 499 },
  { id: "s1_3", categoryId: "c1", name: "Kitchen Cleaning", description: "Grease removal and appliance external cleaning.", basePriceHint: 799 },
  { id: "s1_4", categoryId: "c1", name: "Sofa Cleaning", description: "Shampoo and vacuuming for fabric sofas.", basePriceHint: 450 },

  // AC & Appliance
  { id: "s2_1", categoryId: "c2", name: "AC Service", description: "Filter cleaning and performance check.", basePriceHint: 599 },
  { id: "s2_2", categoryId: "c2", name: "AC Repair", description: "Diagnosis and repair for split/window ACs.", basePriceHint: 399 },
  { id: "s2_3", categoryId: "c2", name: "Washing Machine Repair", description: "Fix for automatic and semi-automatic machines.", basePriceHint: 499 },

  // Electrician
  { id: "s3_1", categoryId: "c3", name: "Switch/Socket Replacement", description: "Replacing faulty electrical points.", basePriceHint: 149 },
  { id: "s3_2", categoryId: "c3", name: "Fan Installation", description: "Ceiling or exhaust fan setup.", basePriceHint: 249 },

  // Plumbing
  { id: "s4_1", categoryId: "c4", name: "Tap Repair", description: "Fixing leaking taps and mixers.", basePriceHint: 199 },
  { id: "s4_2", categoryId: "c4", name: "Washbasin Installation", description: "Setup of new washbasins.", basePriceHint: 499 },
];

export const skillCatalog = [
  "Deep Cleaning", "Bathroom Cleaning", "Kitchen Cleaning", "Carpet Cleaning", 
  "AC Installation", "AC Repair", "Wiring", "Switch Repair", "Pipe Fixing",
  "Leak Repair", "Woodworking", "Furniture Assembly", "Wall Painting",
  "Texture Painting", "Anti-Termite", "Hair Styling", "Massage Therapy"
];

// Map string names to Lucide icons dynamically in the UI
export const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case "Sparkles": return Sparkles;
    case "Wrench": return Wrench;
    case "Zap": return Zap;
    case "Droplets": return Droplets;
    case "Hammer": return Hammer;
    case "Paintbrush": return Paintbrush;
    case "Bug": return Bug;
    case "Scissors": return Scissors;
    default: return Sparkles;
  }
};
