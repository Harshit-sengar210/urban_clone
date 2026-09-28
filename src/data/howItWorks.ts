import { 
  Search, 
  Calendar, 
  UserCheck, 
  CheckCircle,
  ShieldCheck,
  ReceiptIndianRupee,
  Shield,
  Headphones
} from "lucide-react";

export type HowItWorksStep = {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
};

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    id: "step-1",
    title: "Choose a Service",
    description: "Browse services for your home, beauty, repairs, cleaning and more.",
    icon: Search,
    color: "text-blue-600 bg-blue-100/50",
  },
  {
    id: "step-2",
    title: "Pick a Time",
    description: "Choose a date and time that works for you.",
    icon: Calendar,
    color: "text-purple-600 bg-purple-100/50",
  },
  {
    id: "step-3",
    title: "Meet Your Professional",
    description: "A verified professional is assigned to your booking.",
    icon: UserCheck,
    color: "text-amber-600 bg-amber-100/50",
  },
  {
    id: "step-4",
    title: "Relax. It's Done.",
    description: "Track your booking, receive updates, and enjoy your completed service.",
    icon: CheckCircle,
    color: "text-green-600 bg-green-100/50",
  }
];

export type TrustCard = {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
};

export const TRUST_CARDS: TrustCard[] = [
  {
    id: "trust-1",
    title: "Verified Professionals",
    description: "Professionals are verified before joining the platform.",
    icon: ShieldCheck,
    color: "group-hover:text-green-600 group-hover:bg-green-50",
  },
  {
    id: "trust-2",
    title: "Transparent Pricing",
    description: "Know the expected price before booking.",
    icon: ReceiptIndianRupee,
    color: "group-hover:text-blue-600 group-hover:bg-blue-50",
  },
  {
    id: "trust-3",
    title: "Secure Payments",
    description: "Pay securely through supported payment methods.",
    icon: Shield,
    color: "group-hover:text-purple-600 group-hover:bg-purple-50",
  },
  {
    id: "trust-4",
    title: "Easy Support",
    description: "Need help? Our support team is always a tap away.",
    icon: Headphones,
    color: "group-hover:text-rose-600 group-hover:bg-rose-50",
  }
];

export type FAQItem = {
  question: string;
  answer: string;
};

export const HOW_IT_WORKS_FAQS: FAQItem[] = [
  {
    question: "How do I book a service?",
    answer: "Simply browse our categories, select the service you need, choose a convenient date and time, and confirm your booking. A verified professional will be assigned to you shortly after."
  },
  {
    question: "Can I choose my professional?",
    answer: "Currently, our system automatically assigns the highest-rated available professional in your area to ensure the fastest and best service. You will see their profile, rating, and job count once assigned."
  },
  {
    question: "Can I track my booking?",
    answer: "Yes! You can track your booking in real-time through the 'My Bookings' section in your dashboard. You will receive updates when a professional is assigned, when they are on their way, and when the service starts."
  },
  {
    question: "What happens if I need to cancel?",
    answer: "You can easily reschedule or cancel your booking through the dashboard. Cancellations made 2 hours prior to the scheduled time are completely free."
  },
  {
    question: "How do I pay?",
    answer: "You can pay securely online via Credit/Debit card, UPI, or Wallets before the service, or choose Cash on Delivery (COD) to pay after the service is successfully completed."
  }
];
