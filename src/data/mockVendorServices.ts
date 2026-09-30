import { Droplets, Wrench, Zap, Paintbrush, Bug, Sparkles, Scissors, Hammer, Flower2 } from "lucide-react";

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
  isCustom?: false;
};

/** A custom service added directly by a vendor during onboarding */
export type CustomService = {
  id: string;          // format: "custom_<timestamp>"
  categoryId: string;  // one of the standard category ids, or "custom" for "Other"
  name: string;
  description: string;
  basePriceHint?: number;
  isCustom: true;
};

export type AnyService = VendorService | CustomService;

export const serviceCategories: ServiceCategory[] = [
  { id: "c1", name: "Home Cleaning",        description: "Cleaning and home care services",         iconName: "Sparkles"   },
  { id: "c2", name: "AC & Appliance Repair", description: "Repair and service for home appliances",  iconName: "Wrench"     },
  { id: "c3", name: "Electrician",           description: "Electrical repairs and installations",    iconName: "Zap"        },
  { id: "c4", name: "Plumbing",              description: "Pipes, leaks, and bathroom fittings",     iconName: "Droplets"   },
  { id: "c5", name: "Carpentry",             description: "Furniture repair and woodwork",           iconName: "Hammer"     },
  { id: "c6", name: "Painting",              description: "Wall painting and waterproofing",         iconName: "Paintbrush" },
  { id: "c7", name: "Pest Control",          description: "Termite, cockroach, and pest removal",   iconName: "Bug"        },
  { id: "c8", name: "Beauty & Wellness",     description: "Salon and spa services at home",         iconName: "Scissors"   },
];

export const serviceCatalog: VendorService[] = [
  // ── Home Cleaning (c1) ──────────────────────────────────────────
  { id: "s1_1", categoryId: "c1", name: "Full Home Deep Cleaning",   description: "Intensive cleaning for all rooms.",                basePriceHint: 2999 },
  { id: "s1_2", categoryId: "c1", name: "Bathroom Cleaning",         description: "Deep cleaning for tiles and fixtures.",            basePriceHint: 499  },
  { id: "s1_3", categoryId: "c1", name: "Kitchen Cleaning",          description: "Grease removal and appliance external cleaning.",  basePriceHint: 799  },
  { id: "s1_4", categoryId: "c1", name: "Sofa Cleaning",             description: "Shampoo and vacuuming for fabric sofas.",          basePriceHint: 450  },
  { id: "s1_5", categoryId: "c1", name: "Carpet & Rug Cleaning",     description: "Steam and dry cleaning for all carpet types.",     basePriceHint: 699  },
  { id: "s1_6", categoryId: "c1", name: "Post-Construction Cleanup", description: "Dust and debris removal after renovation.",        basePriceHint: 3499 },

  // ── AC & Appliance Repair (c2) ──────────────────────────────────
  { id: "s2_1", categoryId: "c2", name: "AC Service (Annual)",       description: "Filter cleaning and performance check.",           basePriceHint: 599  },
  { id: "s2_2", categoryId: "c2", name: "AC Repair",                 description: "Diagnosis and repair for split/window ACs.",       basePriceHint: 399  },
  { id: "s2_3", categoryId: "c2", name: "AC Installation",           description: "New split or window AC installation.",             basePriceHint: 999  },
  { id: "s2_4", categoryId: "c2", name: "Washing Machine Repair",    description: "Fix for automatic and semi-automatic machines.",   basePriceHint: 499  },
  { id: "s2_5", categoryId: "c2", name: "Refrigerator Repair",       description: "Cooling, compressor, and gas issues.",             basePriceHint: 549  },
  { id: "s2_6", categoryId: "c2", name: "Microwave Repair",          description: "Heating element and panel repairs.",               basePriceHint: 349  },
  { id: "s2_7", categoryId: "c2", name: "Geyser / Water Heater",     description: "Thermostat, heating element, and leakage fix.",    basePriceHint: 299  },

  // ── Electrician (c3) ────────────────────────────────────────────
  { id: "s3_1", categoryId: "c3", name: "Switch / Socket Replacement", description: "Replacing faulty electrical points.",            basePriceHint: 149  },
  { id: "s3_2", categoryId: "c3", name: "Fan Installation",            description: "Ceiling or exhaust fan setup.",                  basePriceHint: 249  },
  { id: "s3_3", categoryId: "c3", name: "Light / LED Fixture Setup",   description: "Install pendant, strip, or LED panel lights.",   basePriceHint: 199  },
  { id: "s3_4", categoryId: "c3", name: "MCB / Fuse Board Repair",     description: "Tripping issues and circuit board repair.",      basePriceHint: 349  },
  { id: "s3_5", categoryId: "c3", name: "Wiring & Rewiring",           description: "New wiring for rooms, buildings, or extensions.", basePriceHint: 999 },
  { id: "s3_6", categoryId: "c3", name: "CCTV / Doorbell Installation", description: "Camera and smart doorbell wiring & setup.",     basePriceHint: 499  },

  // ── Plumbing (c4) ───────────────────────────────────────────────
  { id: "s4_1", categoryId: "c4", name: "Tap / Faucet Repair",       description: "Fixing leaking taps and mixers.",                 basePriceHint: 199  },
  { id: "s4_2", categoryId: "c4", name: "Washbasin Installation",     description: "Setup of new washbasins.",                        basePriceHint: 499  },
  { id: "s4_3", categoryId: "c4", name: "Toilet / Commode Repair",    description: "Flush tank, seat, and bowl issues.",              basePriceHint: 299  },
  { id: "s4_4", categoryId: "c4", name: "Pipe Leak Repair",           description: "Identify and seal hidden or exposed pipe leaks.", basePriceHint: 349  },
  { id: "s4_5", categoryId: "c4", name: "Drain Unclogging",           description: "Clear kitchen, bathroom, and floor drains.",      basePriceHint: 399  },
  { id: "s4_6", categoryId: "c4", name: "Water Tank Cleaning",        description: "Interior scrubbing and disinfection of tanks.",   basePriceHint: 799  },

  // ── Carpentry (c5) ──────────────────────────────────────────────
  { id: "s5_1", categoryId: "c5", name: "Furniture Assembly",        description: "Assemble flat-pack or modular furniture.",         basePriceHint: 399  },
  { id: "s5_2", categoryId: "c5", name: "Door / Window Repair",      description: "Fix hinges, locks, handles, and warping.",        basePriceHint: 349  },
  { id: "s5_3", categoryId: "c5", name: "Custom Shelf / Cabinet",    description: "Measure and install custom wooden shelves.",       basePriceHint: 999  },
  { id: "s5_4", categoryId: "c5", name: "Bed / Sofa Repair",         description: "Fix broken frames, legs, and joints.",            basePriceHint: 499  },
  { id: "s5_5", categoryId: "c5", name: "Wooden Flooring",           description: "Lay laminate or solid wood flooring.",            basePriceHint: 4999 },
  { id: "s5_6", categoryId: "c5", name: "False Ceiling Work",        description: "POP, gypsum, and wooden false ceiling installs.", basePriceHint: 2499 },

  // ── Painting (c6) ───────────────────────────────────────────────
  { id: "s6_1", categoryId: "c6", name: "Interior Wall Painting",    description: "Emulsion and acrylic painting for rooms.",        basePriceHint: 3999 },
  { id: "s6_2", categoryId: "c6", name: "Exterior Wall Painting",    description: "Weather-proof coating for outer walls.",          basePriceHint: 5999 },
  { id: "s6_3", categoryId: "c6", name: "Texture / Design Painting", description: "3D textures, sponge, and stencil effects.",      basePriceHint: 2999 },
  { id: "s6_4", categoryId: "c6", name: "Waterproofing",             description: "Roof, bathroom, and wall waterproofing.",         basePriceHint: 4499 },
  { id: "s6_5", categoryId: "c6", name: "Wood / Metal Polishing",    description: "Varnish, lacquer, and enamel for furniture/gates.", basePriceHint: 1499 },
  { id: "s6_6", categoryId: "c6", name: "Wall Putty & Whitewash",    description: "Smooth base preparation before painting.",        basePriceHint: 1999 },

  // ── Pest Control (c7) ───────────────────────────────────────────
  { id: "s7_1", categoryId: "c7", name: "Cockroach Treatment",       description: "Gel and spray treatment for cockroaches.",        basePriceHint: 499  },
  { id: "s7_2", categoryId: "c7", name: "Anti-Termite Treatment",    description: "Soil and wood treatment for termites.",           basePriceHint: 2999 },
  { id: "s7_3", categoryId: "c7", name: "Rodent / Rat Control",      description: "Traps and poison bait for rodents.",              basePriceHint: 799  },
  { id: "s7_4", categoryId: "c7", name: "Bed Bug Treatment",         description: "Heat and spray treatment for bed bugs.",          basePriceHint: 999  },
  { id: "s7_5", categoryId: "c7", name: "Mosquito Control",          description: "Fogging and larvicidal treatment.",               basePriceHint: 599  },
  { id: "s7_6", categoryId: "c7", name: "General Pest Spray",        description: "All-round spray for ants, spiders, and flies.",  basePriceHint: 699  },

  // ── Beauty & Wellness (c8) ──────────────────────────────────────
  { id: "s8_1", categoryId: "c8", name: "Haircut & Styling",         description: "Professional hair trim and styling at home.",     basePriceHint: 399  },
  { id: "s8_2", categoryId: "c8", name: "Facial & Skin Care",        description: "Cleanup, bleach, and de-tan facials.",            basePriceHint: 499  },
  { id: "s8_3", categoryId: "c8", name: "Waxing & Threading",        description: "Full body waxing and eyebrow threading.",         basePriceHint: 349  },
  { id: "s8_4", categoryId: "c8", name: "Massage Therapy",           description: "Swedish, deep tissue, and relaxation massages.",  basePriceHint: 699  },
  { id: "s8_5", categoryId: "c8", name: "Nail Art & Manicure",       description: "Gel, acrylic, and nail art services.",            basePriceHint: 599  },
  { id: "s8_6", categoryId: "c8", name: "Bridal Makeup",             description: "Full bridal makeup and hair look packages.",      basePriceHint: 4999 },
];

export const skillCatalog = [
  "Deep Cleaning", "Bathroom Cleaning", "Kitchen Cleaning", "Carpet Cleaning",
  "AC Installation", "AC Repair", "Refrigerator Repair", "Washing Machine Repair",
  "Electrical Wiring", "Switch Repair", "Fan Installation", "CCTV Setup",
  "Pipe Fixing", "Leak Repair", "Drain Unclogging", "Tank Cleaning",
  "Woodworking", "Furniture Assembly", "Custom Carpentry", "Door Repair",
  "Wall Painting", "Texture Painting", "Waterproofing", "Wood Polishing",
  "Anti-Termite", "Cockroach Control", "Bed Bug Treatment", "Mosquito Fogging",
  "Hair Styling", "Massage Therapy", "Bridal Makeup", "Nail Art",
];

// Map string names to Lucide icons dynamically in the UI
export const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case "Sparkles":   return Sparkles;
    case "Wrench":     return Wrench;
    case "Zap":        return Zap;
    case "Droplets":   return Droplets;
    case "Hammer":     return Hammer;
    case "Paintbrush": return Paintbrush;
    case "Bug":        return Bug;
    case "Scissors":   return Scissors;
    default:           return Sparkles;
  }
};
