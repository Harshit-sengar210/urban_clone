import { Benefit, Testimonial, PlatformStat, UseCase } from "./why-urbanclone.types";

export const MOCK_BENEFITS: Benefit[] = [
  {
    id: "benefit_1",
    title: "Verified Professionals",
    description: "Professionals are verified before they serve customers.",
    iconName: "BadgeCheck"
  },
  {
    id: "benefit_2",
    title: "Transparent Pricing",
    description: "Know the expected price before you confirm your booking.",
    iconName: "ReceiptIndianRupee"
  },
  {
    id: "benefit_3",
    title: "Easy Booking",
    description: "Find a service and schedule it in just a few simple steps.",
    iconName: "CalendarCheck"
  },
  {
    id: "benefit_4",
    title: "Secure Payments",
    description: "Use supported payment methods with a secure checkout experience.",
    iconName: "ShieldCheck"
  },
  {
    id: "benefit_5",
    title: "Real-Time Updates",
    description: "Stay informed about your booking from confirmation to completion.",
    iconName: "Bell"
  },
  {
    id: "benefit_6",
    title: "Dedicated Support",
    description: "Get help whenever you need assistance with a booking or service.",
    iconName: "Headphones"
  }
];

export const MOCK_STATS: PlatformStat[] = [
  {
    id: "stat_1",
    value: 1.2,
    suffix: "K+",
    label: "Professionals"
  },
  {
    id: "stat_2",
    value: 10,
    suffix: "K+",
    label: "Services Completed"
  },
  {
    id: "stat_3",
    value: 4.8,
    suffix: "/5",
    label: "Average Rating"
  },
  {
    id: "stat_4",
    value: 95,
    suffix: "%",
    label: "Positive Experiences"
  }
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "testimonial_1",
    name: "Ananya Sharma",
    rating: 5,
    quote: "Booking was simple and the whole process felt very organized. The professional arrived exactly on time."
  },
  {
    id: "testimonial_2",
    name: "Neha Verma",
    rating: 5,
    quote: "I liked being able to see the professional and track my booking status right from my phone."
  },
  {
    id: "testimonial_3",
    name: "Arjun Mehta",
    rating: 4,
    quote: "The pricing was easy to understand before I confirmed the service. No hidden costs!"
  }
];

export const MOCK_USE_CASES: UseCase[] = [
  {
    id: "usecase_1",
    title: "Home Cleaning",
    description: "Keep your home comfortable without adding another task to your day.",
    iconName: "Sparkles",
    categorySlug: "cleaning"
  },
  {
    id: "usecase_2",
    title: "Repairs",
    description: "Find help when something at home needs fixing.",
    iconName: "Wrench",
    categorySlug: "repairs"
  },
  {
    id: "usecase_3",
    title: "Beauty",
    description: "Book convenient personal care services at home.",
    iconName: "Scissors",
    categorySlug: "beauty"
  },
  {
    id: "usecase_4",
    title: "Maintenance",
    description: "Stay ahead of everyday home maintenance.",
    iconName: "Hammer",
    categorySlug: "maintenance"
  }
];
