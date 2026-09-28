export type CatalogStatus = "active" | "draft" | "archived";

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  icon?: string;
  status: CatalogStatus;
  sortOrder: number;
  serviceCount: number;
  packageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CatalogService {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  basePrice: number;
  duration: number;
  serviceType: "at_home" | "online" | "pickup_drop" | "hybrid";
  status: CatalogStatus;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ServicePackage {
  id: string;
  serviceId: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  includedItems: string[];
  status: CatalogStatus;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export const adminCatalogData = {
  summary: {
    categories: 12,
    services: 86,
    packages: 214,
    drafts: 17
  },
  categories: [
    {
      id: "cat-cleaning",
      name: "Cleaning",
      slug: "cleaning",
      description: "Professional cleaning services for homes and apartments.",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&q=80",
      status: "active",
      sortOrder: 1,
      serviceCount: 8,
      packageCount: 24,
      createdAt: "2025-01-10T10:00:00Z",
      updatedAt: "2026-09-18T10:00:00Z"
    },
    {
      id: "cat-ac",
      name: "AC & Appliance",
      slug: "ac-appliance",
      description: "Expert appliance repair and AC maintenance.",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500&q=80",
      status: "active",
      sortOrder: 2,
      serviceCount: 12,
      packageCount: 31,
      createdAt: "2025-02-15T10:00:00Z",
      updatedAt: "2026-09-15T10:00:00Z"
    },
    {
      id: "cat-beauty",
      name: "Beauty & Wellness",
      slug: "beauty-wellness",
      description: "Salon and spa services delivered to your home.",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&q=80",
      status: "draft",
      sortOrder: 3,
      serviceCount: 0,
      packageCount: 0,
      createdAt: "2026-09-18T10:00:00Z",
      updatedAt: "2026-09-18T10:00:00Z"
    }
  ] as ServiceCategory[],

  services: [
    {
      id: "srv-home-cleaning",
      categoryId: "cat-cleaning",
      name: "Home Cleaning",
      slug: "cleaning/home-cleaning",
      description: "Complete home cleaning service with eco-friendly products.",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&q=80",
      basePrice: 799,
      duration: 90,
      serviceType: "at_home",
      status: "active",
      sortOrder: 1,
      createdAt: "2025-01-11T10:00:00Z",
      updatedAt: "2026-09-18T10:00:00Z"
    },
    {
      id: "srv-ac-service",
      categoryId: "cat-ac",
      name: "AC Service",
      slug: "ac-appliance/ac-service",
      description: "Professional AC cleaning, gas refill, and repair.",
      basePrice: 499,
      duration: 60,
      serviceType: "at_home",
      status: "active",
      sortOrder: 1,
      createdAt: "2025-02-16T10:00:00Z",
      updatedAt: "2026-09-15T10:00:00Z"
    }
  ] as CatalogService[],

  packages: [
    {
      id: "pkg-home-basic",
      serviceId: "srv-home-cleaning",
      name: "Basic Cleaning",
      description: "Surface cleaning for a quick refresh.",
      price: 799,
      duration: 60,
      includedItems: ["Dusting", "Floor mopping", "Basic bathroom clean"],
      status: "active",
      sortOrder: 1,
      createdAt: "2025-01-12T10:00:00Z",
      updatedAt: "2026-09-18T10:00:00Z"
    },
    {
      id: "pkg-home-deep",
      serviceId: "srv-home-cleaning",
      name: "Deep Cleaning",
      description: "Thorough deep cleaning of all rooms.",
      price: 1299,
      duration: 90,
      includedItems: ["Dusting", "Floor mopping", "Deep bathroom clean", "Kitchen degreasing", "Window cleaning"],
      status: "active",
      sortOrder: 2,
      createdAt: "2025-01-12T10:00:00Z",
      updatedAt: "2026-09-18T10:00:00Z"
    },
    {
      id: "pkg-home-premium",
      serviceId: "srv-home-cleaning",
      name: "Premium Cleaning",
      description: "Luxury cleaning with premium products.",
      price: 1899,
      duration: 120,
      includedItems: ["All Deep Cleaning items", "Appliance interior cleaning", "Carpet vacuuming", "Sanitization"],
      status: "active",
      sortOrder: 3,
      createdAt: "2025-01-12T10:00:00Z",
      updatedAt: "2026-09-18T10:00:00Z"
    }
  ] as ServicePackage[]
};
