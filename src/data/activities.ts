export interface Activity {
  id: string;
  serviceName: string;
  status: "completed" | "in_progress" | "confirmed" | "cancelled";
  date: string;
  icon: string; // lucide icon name
}

export const DEMO_ACTIVITIES: Activity[] = [
  {
    id: "act1",
    serviceName: "AC Service & Repair",
    status: "completed",
    date: "16 Sep 2026",
    icon: "Wind",
  },
  {
    id: "act2",
    serviceName: "Intense Home Cleaning",
    status: "completed",
    date: "12 Sep 2026",
    icon: "Sparkles",
  },
  {
    id: "act3",
    serviceName: "Plumbing Service",
    status: "in_progress",
    date: "9 Sep 2026",
    icon: "Wrench",
  },
  {
    id: "act4",
    serviceName: "Wall Painting",
    status: "cancelled",
    date: "7 Sep 2026",
    icon: "Paintbrush",
  },
];
