import { 
  Sparkles, 
  Wind, 
  Wrench, 
  Zap, 
  Scissors, 
  Bug, 
  Hammer, 
  Paintbrush,
  Home,
  Truck
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export type ServiceSubcategory = {
  id: string;
  name: string;
  slug: string;
  services: string[]; // These are "service types"
};

export type ServiceCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: LucideIcon;
  image?: string; // High quality 3D icon
  color?: string; // e.g. "bg-blue-50 text-blue-600"
  subcategories: ServiceSubcategory[];
};

export const CATEGORIES: ServiceCategory[] = [
  {
    id: "home-services",
    name: "Home Services",
    slug: "home-services",
    description: "General home maintenance",
    icon: Home,
    image: "/icons/home.jpg",
    color: "bg-blue-50 text-blue-600",
    subcategories: [
      {
        id: "home-repair",
        name: "Home Repair",
        slug: "home-repair",
        services: ["General Repair", "Handyman"]
      }
    ]
  },
  {
    id: "cleaning",
    name: "Cleaning",
    slug: "cleaning",
    description: "Deep clean your home",
    icon: Sparkles,
    image: "/icons/cleaning.jpg",
    color: "bg-cyan-50 text-cyan-600",
    subcategories: [
      {
        id: "home-cleaning",
        name: "Home Cleaning",
        slug: "home-cleaning",
        services: ["Regular Cleaning", "Deep Cleaning", "Premium Cleaning"]
      },
      {
        id: "specialty-cleaning",
        name: "Specialty Cleaning",
        slug: "specialty-cleaning",
        services: ["Bathroom Cleaning", "Kitchen Cleaning", "Sofa Cleaning", "Carpet Cleaning"]
      }
    ]
  },
  {
    id: "ac-appliance",
    name: "AC & Appliance",
    slug: "ac-appliance",
    description: "Repair & maintenance",
    icon: Wind,
    color: "bg-sky-50 text-sky-600",
    subcategories: [
      {
        id: "ac-service",
        name: "AC Service",
        slug: "ac-service",
        services: ["AC Repair", "AC Installation", "AC Gas Refill"]
      },
      {
        id: "appliance-repair",
        name: "Appliance Repair",
        slug: "appliance-repair",
        services: ["Refrigerator Repair", "Washing Machine Repair", "Microwave Repair"]
      }
    ]
  },
  {
    id: "plumbing",
    name: "Plumbing",
    slug: "plumbing",
    description: "Fix leaks & pipes",
    icon: Wrench,
    color: "bg-indigo-50 text-indigo-600",
    subcategories: [
      {
        id: "general-plumbing",
        name: "General Plumbing",
        slug: "general-plumbing",
        services: ["Tap Repair", "Pipe Repair", "Drain Cleaning", "Toilet Repair"]
      },
      {
        id: "water-purifier",
        name: "Water Purifier",
        slug: "water-purifier",
        services: ["RO Service", "RO Repair", "RO Installation"]
      }
    ]
  },
  {
    id: "electrician",
    name: "Electrician",
    slug: "electrician",
    description: "Wiring & repairs",
    icon: Zap,
    color: "bg-yellow-50 text-yellow-600",
    subcategories: [
      {
        id: "electrical-repairs",
        name: "Electrical Repairs",
        slug: "electrical-repairs",
        services: ["Fan Repair", "Switch & Socket", "Wiring", "Light Installation"]
      }
    ]
  },
  {
    id: "painting",
    name: "Painting",
    slug: "painting",
    description: "Fresh look for walls",
    icon: Paintbrush,
    color: "bg-purple-50 text-purple-600",
    subcategories: [
      {
        id: "home-painting",
        name: "Home Painting",
        slug: "home-painting",
        services: ["Full Home Painting", "Wall Painting", "Texture Painting"]
      }
    ]
  },
  {
    id: "carpentry",
    name: "Carpentry",
    slug: "carpentry",
    description: "Furniture & woodwork",
    icon: Hammer,
    color: "bg-orange-50 text-orange-600",
    subcategories: [
      {
        id: "furniture",
        name: "Furniture Work",
        slug: "furniture",
        services: ["Furniture Assembly", "Woodwork Repair", "Door & Lock Repair"]
      }
    ]
  },
  {
    id: "pest-control",
    name: "Pest Control",
    slug: "pest-control",
    description: "Safe & effective",
    icon: Bug,
    color: "bg-green-50 text-green-600",
    subcategories: [
      {
        id: "general-pest",
        name: "General Pest Control",
        slug: "general-pest",
        services: ["Termite Control", "Cockroach Control", "Bed Bug Control"]
      }
    ]
  },
  {
    id: "beauty",
    name: "Beauty & Wellness",
    slug: "beauty",
    description: "Salon at home",
    icon: Scissors,
    color: "bg-pink-50 text-pink-600",
    subcategories: [
      {
        id: "salon-women",
        name: "Salon for Women",
        slug: "salon-women",
        services: ["Waxing", "Facial", "Manicure", "Pedicure"]
      },
      {
        id: "salon-men",
        name: "Salon for Men",
        slug: "salon-men",
        services: ["Haircut", "Shave", "Massage"]
      },
      {
        id: "spa",
        name: "Spa at Home",
        slug: "spa",
        services: ["Stress Relief Massage", "Pain Relief Massage"]
      }
    ]
  },
  {
    id: "moving",
    name: "Moving & Shifting",
    slug: "moving",
    description: "Hassle-free moving",
    icon: Truck,
    color: "bg-rose-50 text-rose-600",
    subcategories: [
      {
        id: "packers-movers",
        name: "Packers & Movers",
        slug: "packers-movers",
        services: ["Within City", "Between Cities"]
      }
    ]
  }
];
