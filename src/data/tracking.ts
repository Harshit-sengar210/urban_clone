export type TrackingStatus =
  | "assigned"
  | "on_the_way"
  | "arrived"
  | "service_started"
  | "service_completed";

export interface TrackingData {
  bookingId: string;
  professional: string;
  professionalRating: number;
  professionalCategory: string;
  professionalJobs: string;
  status: TrackingStatus;
  eta: string;
  distance: string;
  updatedAt: string;
  professionalLocation: { lat: number; lng: number; label: string };
  destination: { lat: number; lng: number; label: string; address: string };
}

// Mock tracking record — keyed by bookingId
export const MOCK_TRACKING: Record<string, TrackingData> = {
  "UC-2026-00188": {
    bookingId: "UC-2026-00188",
    professional: "Priya Sharma",
    professionalRating: 4.8,
    professionalCategory: "Cleaning Expert",
    professionalJobs: "850+",
    status: "on_the_way",
    eta: "10–15 mins",
    distance: "2.4 km",
    updatedAt: "Just now",
    professionalLocation: { lat: 28.615, lng: 77.21, label: "Professional" },
    destination: { lat: 28.623, lng: 77.225, label: "Your Location", address: "Tech Park, Building C, Floor 2" },
  },
};

export const TIMELINE_STEPS: Record<TrackingStatus, string[]> = {
  assigned:         ["Booking Confirmed", "Professional Assigned"],
  on_the_way:       ["Booking Confirmed", "Professional Assigned", "On The Way"],
  arrived:          ["Booking Confirmed", "Professional Assigned", "On The Way", "Professional Arrived"],
  service_started:  ["Booking Confirmed", "Professional Assigned", "On The Way", "Professional Arrived", "Service Started"],
  service_completed:["Booking Confirmed", "Professional Assigned", "On The Way", "Professional Arrived", "Service Started", "Service Completed"],
};

export const ALL_TIMELINE_STEPS = [
  "Booking Confirmed",
  "Professional Assigned",
  "On The Way",
  "Professional Arrived",
  "Service Started",
  "Service Completed",
];
