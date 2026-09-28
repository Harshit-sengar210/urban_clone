export type ReportCategory =
  | "overview"
  | "marketplace"
  | "bookings"
  | "revenue"
  | "customers"
  | "vendors"
  | "services"
  | "offers"
  | "reviews"
  | "support";

export type ReportPeriod =
  | "today"
  | "yesterday"
  | "last_7_days"
  | "last_30_days"
  | "last_90_days"
  | "this_month"
  | "last_month"
  | "this_quarter"
  | "custom";

export type ComparisonPeriod =
  | "none"
  | "previous_period"
  | "previous_month"
  | "previous_quarter"
  | "previous_year";

export type MetricDirection =
  | "up"
  | "down"
  | "neutral";

export interface AdminReportKpi {
  id: string;
  label: string;
  value: number;
  formattedValue: string;
  previousValue?: number;
  changePercentage?: number;
  direction?: MetricDirection;
}

export interface TimeSeriesPoint {
  date: string;
  value: number;
  comparisonValue?: number;
}

export interface CategoryPerformance {
  categoryId: string;
  categoryName: string;
  bookings: number;
  revenue: number;
  completionRate: number;
  averageRating: number;
}

export interface ServicePerformance {
  serviceId: string;
  serviceName: string;
  categoryName: string;
  bookings: number;
  revenue: number;
  completionRate: number;
  averageRating: number;
}

export interface SavedReportView {
  id: string;
  name: string;
  category: ReportCategory;
  period: ReportPeriod;
  comparison: ComparisonPeriod;
  createdAt: string;
}

export const adminReportsData = {
  kpis: {
    grossBookingValue: {
      id: "kpi-gbv",
      label: "Gross Booking Value",
      value: 2480000,
      formattedValue: "₹24.8L",
      previousValue: 2200000,
      changePercentage: 12.7,
      direction: "up"
    },
    platformRevenue: {
      id: "kpi-rev",
      label: "Platform Revenue",
      value: 460000,
      formattedValue: "₹4.6L",
      previousValue: 410000,
      changePercentage: 12.1,
      direction: "up"
    },
    totalBookings: {
      id: "kpi-tb",
      label: "Total Bookings",
      value: 8642,
      formattedValue: "8,642",
      previousValue: 8050,
      changePercentage: 7.3,
      direction: "up"
    },
    completedBookings: {
      id: "kpi-cb",
      label: "Completed Bookings",
      value: 7814,
      formattedValue: "7,814",
      previousValue: 7100,
      changePercentage: 10.0,
      direction: "up"
    },
    activeCustomers: {
      id: "kpi-ac",
      label: "Active Customers",
      value: 5284,
      formattedValue: "5,284",
      previousValue: 4900,
      changePercentage: 7.8,
      direction: "up"
    },
    activeVendors: {
      id: "kpi-av",
      label: "Active Vendors",
      value: 428,
      formattedValue: "428",
      previousValue: 410,
      changePercentage: 4.3,
      direction: "up"
    }
  } as Record<string, AdminReportKpi>,

  bookingTrend: [
    { date: "2026-09-20", value: 312, comparisonValue: 280 },
    { date: "2026-09-21", value: 290, comparisonValue: 285 },
    { date: "2026-09-22", value: 325, comparisonValue: 300 },
    { date: "2026-09-23", value: 340, comparisonValue: 290 },
    { date: "2026-09-24", value: 315, comparisonValue: 310 },
    { date: "2026-09-25", value: 410, comparisonValue: 360 },
    { date: "2026-09-26", value: 450, comparisonValue: 380 }
  ] as TimeSeriesPoint[],

  topCategories: [
    { categoryId: "CAT-1", categoryName: "Cleaning", bookings: 3240, revenue: 840000, completionRate: 94.2, averageRating: 4.7 },
    { categoryId: "CAT-2", categoryName: "AC & Appliance", bookings: 2180, revenue: 654000, completionRate: 91.5, averageRating: 4.6 },
    { categoryId: "CAT-3", categoryName: "Beauty & Wellness", bookings: 1850, revenue: 555000, completionRate: 95.8, averageRating: 4.8 },
    { categoryId: "CAT-4", categoryName: "Plumbing", bookings: 820, revenue: 246000, completionRate: 88.4, averageRating: 4.4 }
  ] as CategoryPerformance[],

  savedViews: [
    {
      id: "view-1",
      name: "Monthly Revenue Review",
      category: "revenue",
      period: "this_month",
      comparison: "previous_month",
      createdAt: "2026-09-01T10:00:00Z"
    },
    {
      id: "view-2",
      name: "Vendor Performance",
      category: "vendors",
      period: "last_30_days",
      comparison: "previous_period",
      createdAt: "2026-09-15T14:30:00Z"
    }
  ] as SavedReportView[],

  operationalSignals: [
    { id: "sig-1", type: "warning", description: "Booking cancellations increased by 15% in Cleaning category.", relatedArea: "Bookings", timestamp: "2026-09-26T09:15:00Z" },
    { id: "sig-2", type: "info", description: "Beauty & Wellness category generated unusually high volume yesterday.", relatedArea: "Marketplace", timestamp: "2026-09-26T08:00:00Z" },
    { id: "sig-3", type: "alert", description: "Support SLA risk increased across payment related tickets.", relatedArea: "Support", timestamp: "2026-09-25T16:45:00Z" }
  ]
};
