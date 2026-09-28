export type PricingVariant = {
  id: string;
  name: string;
  price: number;
  duration: string;
  type: "fixed" | "starting";
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

const defaultProcess = [
  { step: "01", title: "Book your service", description: "Select your preferred time and date." },
  { step: "02", title: "Verified professional arrives", description: "Our expert will arrive on time with all tools." },
  { step: "03", title: "Service completed", description: "Enjoy a hassle-free experience with guaranteed quality." }
];

export const ALL_SERVICES = [
  {
    id: "home-cleaning-1",
    slug: "intense-home-cleaning",
    name: "Intense Home Cleaning",
    categoryId: "cleaning",
    subcategoryId: "home-cleaning",
    serviceType: "Deep Cleaning",
    description: "A comprehensive deep cleaning service for your entire home. Includes dusting, mopping, bathroom descaling, and kitchen degreasing.",
    about: "Get professional home cleaning from trained and verified experts. Our service includes a complete deep clean of your home, covering every corner from ceiling fans to floor tiles. We use eco-friendly and safe cleaning supplies.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=800&auto=format&fit=crop"
    ],
    price: 1499,
    rating: 4.8,
    reviewCount: 1205,
    duration: "4-5 hrs",
    badge: "Popular",
    availability: ["today", "tomorrow", "this-week"],
    included: [
      "Verified professional",
      "Deep cleaning of all rooms",
      "Bathroom descaling",
      "Kitchen degreasing",
      "Top quality supplies",
      "Satisfaction guarantee"
    ],
    notIncluded: [
      "Exterior window cleaning",
      "Deep appliance interior cleaning (fridge, oven)"
    ],
    process: defaultProcess,
    pricingVariants: [
      { id: "v1", name: "1 BHK Intense Cleaning", price: 1499, duration: "4-5 hrs", type: "fixed" as const },
      { id: "v2", name: "2 BHK Intense Cleaning", price: 1999, duration: "5-6 hrs", type: "fixed" as const },
      { id: "v3", name: "3 BHK Intense Cleaning", price: 2499, duration: "6-7 hrs", type: "fixed" as const }
    ],
    faqs: [
      { question: "How long does the service take?", answer: "Usually between 4 to 7 hours depending on the size of your home." },
      { question: "Do I need to provide cleaning supplies?", answer: "No, our professionals bring their own specialized tools and supplies." }
    ],
    reviews: [
      { id: "r1", author: "Priya S.", rating: 5, date: "2 days ago", comment: "Very professional and punctual. The house looks brand new!" },
      { id: "r2", author: "Rahul M.", rating: 4, date: "1 week ago", comment: "Great service, but took slightly longer than expected." }
    ]
  },
  {
    id: "ac-repair-1",
    slug: "ac-service-repair",
    name: "AC Service & Repair",
    categoryId: "ac-appliance",
    subcategoryId: "ac-service",
    serviceType: "AC Service",
    description: "Professional AC servicing including filter cleaning, gas check, and cooling optimization. Reliable repair for all major brands.",
    about: "Get professional AC servicing from trained and verified technicians. Our service includes inspection, cleaning, basic maintenance, and performance checks to ensure your AC runs efficiently all summer.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800&auto=format&fit=crop"
    ],
    price: 499,
    rating: 4.9,
    reviewCount: 3420,
    duration: "45 mins",
    badge: "Best Seller",
    availability: ["today", "tomorrow"],
    included: [
      "Verified professional",
      "AC inspection",
      "Filter cleaning",
      "Basic servicing",
      "Performance check",
      "Transparent pricing"
    ],
    notIncluded: [
      "Replacement parts",
      "Major component replacement",
      "Gas refill (charged extra)"
    ],
    process: defaultProcess,
    pricingVariants: [
      { id: "v1", name: "AC General Service", price: 499, duration: "45 mins", type: "fixed" as const },
      { id: "v2", name: "AC Deep Cleaning", price: 799, duration: "60 mins", type: "fixed" as const },
      { id: "v3", name: "AC Repair", price: 199, duration: "30 mins", type: "starting" as const }
    ],
    faqs: [
      { question: "Are spare parts included?", answer: "No, spare parts are charged additionally based on MRP." },
      { question: "What happens if additional repairs are needed?", answer: "The technician will provide a quote before starting any additional repair work." }
    ],
    reviews: [
      { id: "r1", author: "Amit K.", rating: 5, date: "1 day ago", comment: "Excellent AC service. Cooling improved immediately." },
      { id: "r2", author: "Neha G.", rating: 5, date: "3 days ago", comment: "Very polite technician and quick service." }
    ]
  },
  {
    id: "bathroom-cleaning-1",
    slug: "bathroom-deep-cleaning",
    name: "Bathroom Deep Cleaning",
    categoryId: "cleaning",
    subcategoryId: "specialty-cleaning",
    serviceType: "Bathroom Cleaning",
    description: "Thorough cleaning of tiles, floors, sink, and toilet. Removes hard water stains and leaves your bathroom sparkling and sanitized.",
    about: "Our intense bathroom deep cleaning removes tough hard water stains, grout grime, and sanitizes all fixtures.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop"],
    price: 399,
    rating: 4.7,
    reviewCount: 890,
    duration: "1.5 hrs",
    availability: ["tomorrow", "this-week"],
    included: ["Hard water stain removal", "Tile scrubbing", "Mirror polishing", "Toilet sanitation"],
    notIncluded: ["Plumbing repairs"],
    process: defaultProcess,
    pricingVariants: [
      { id: "v1", name: "1 Bathroom", price: 399, duration: "1.5 hrs", type: "fixed" as const },
      { id: "v2", name: "2 Bathrooms", price: 699, duration: "2.5 hrs", type: "fixed" as const }
    ],
    faqs: [],
    reviews: []
  },
  {
    id: "salon-1",
    slug: "salon-at-home-women",
    name: "Salon at Home for Women",
    categoryId: "beauty",
    subcategoryId: "salon-women",
    serviceType: "Facial",
    description: "Premium salon services delivered to your doorstep. Includes waxing, facials, pedicures, and manicures by verified beauticians.",
    about: "Enjoy a relaxing and hygienic salon experience in the comfort of your own home.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop"],
    price: 799,
    rating: 4.9,
    reviewCount: 5200,
    duration: "1 hr",
    badge: "Top Rated",
    availability: ["today", "this-week"],
    included: ["Verified beautician", "Disposable sheets", "Premium products"],
    notIncluded: [],
    process: defaultProcess,
    pricingVariants: [
      { id: "v1", name: "Basic Grooming", price: 799, duration: "1 hr", type: "fixed" as const },
      { id: "v2", name: "Complete Spa & Facial", price: 1499, duration: "2 hrs", type: "fixed" as const }
    ],
    faqs: [],
    reviews: []
  },
  {
    id: "plumbing-1",
    slug: "plumbing-fixes",
    name: "Plumbing Fixes",
    categoryId: "plumbing",
    subcategoryId: "general-plumbing",
    serviceType: "Tap Repair",
    description: "Quick and reliable fixes for leaks, blocked drains, tap replacements, and minor pipe repairs. Experienced local plumbers.",
    about: "Fix leaks, drips, and clogs quickly with our verified local plumbers.",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=800&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=800&auto=format&fit=crop"],
    price: 199,
    rating: 4.6,
    reviewCount: 450,
    duration: "30 mins",
    availability: ["today", "tomorrow"],
    included: ["Diagnosis", "Minor repair labor"],
    notIncluded: ["Spare parts", "Major civil work"],
    process: defaultProcess,
    pricingVariants: [
      { id: "v1", name: "Tap Repair", price: 199, duration: "30 mins", type: "starting" as const },
      { id: "v2", name: "Drain Cleaning", price: 499, duration: "45 mins", type: "fixed" as const }
    ],
    faqs: [],
    reviews: []
  },
  {
    id: "electrician-1",
    slug: "electrician-visits",
    name: "Electrician Visits",
    categoryId: "electrician",
    subcategoryId: "electrical-repairs",
    serviceType: "Wiring",
    description: "Expert electrical services for switchboard repairs, fan installations, MCB changes, and wiring fault detection.",
    about: "Safe and professional electrical services for your home.",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800&auto=format&fit=crop"],
    price: 149,
    rating: 4.8,
    reviewCount: 980,
    duration: "30 mins",
    badge: "Quick Service",
    availability: ["today"],
    included: ["Diagnosis", "Minor fixing labor"],
    notIncluded: ["Wiring material", "New switches/sockets"],
    process: defaultProcess,
    pricingVariants: [
      { id: "v1", name: "Switchboard Repair", price: 149, duration: "30 mins", type: "starting" as const },
      { id: "v2", name: "Fan Installation", price: 249, duration: "45 mins", type: "fixed" as const }
    ],
    faqs: [],
    reviews: []
  },
  {
    id: "sofa-cleaning-1",
    slug: "sofa-carpet-cleaning",
    name: "Sofa & Carpet Cleaning",
    categoryId: "cleaning",
    subcategoryId: "specialty-cleaning",
    serviceType: "Sofa Cleaning",
    description: "Deep dry-vacuuming and wet shampooing of sofas and carpets to remove dust, stains, and allergens. Quick drying process.",
    about: "Revitalize your old sofas and carpets with our industrial-grade wet shampooing process.",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=800&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=800&auto=format&fit=crop"],
    price: 599,
    rating: 4.7,
    reviewCount: 320,
    duration: "1-2 hrs",
    availability: ["tomorrow", "this-week"],
    included: ["Dry vacuuming", "Wet shampooing", "Stain treatment"],
    notIncluded: ["Leather sofa polishing"],
    process: defaultProcess,
    pricingVariants: [
      { id: "v1", name: "3-Seater Sofa", price: 599, duration: "1 hr", type: "fixed" as const },
      { id: "v2", name: "5-Seater Sofa", price: 899, duration: "1.5 hrs", type: "fixed" as const }
    ],
    faqs: [],
    reviews: []
  },
  {
    id: "painting-1",
    slug: "full-home-painting",
    name: "Full Home Painting",
    categoryId: "painting",
    subcategoryId: "home-painting",
    serviceType: "Full Home Painting",
    description: "Professional painting services for your entire home. Includes wall prep, masking, double-coat application, and post-painting cleanup.",
    about: "Transform your home with our end-to-end professional painting service.",
    image: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?q=80&w=800&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?q=80&w=800&auto=format&fit=crop"],
    price: 9999,
    rating: 4.9,
    reviewCount: 150,
    duration: "2-3 days",
    badge: "New",
    availability: ["this-week"],
    included: ["Masking", "Wall prep", "2 coats of paint", "Post-cleanup"],
    notIncluded: ["Major civil wall repair"],
    process: defaultProcess,
    pricingVariants: [
      { id: "v1", name: "1 BHK Painting", price: 9999, duration: "2 days", type: "starting" as const },
      { id: "v2", name: "2 BHK Painting", price: 14999, duration: "3 days", type: "starting" as const }
    ],
    faqs: [],
    reviews: []
  }
];

export const POPULAR_SERVICES = ALL_SERVICES.slice(0, 6);
