import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { RecentBookings } from "@/components/dashboard/RecentBookings";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { OfferCard } from "@/components/dashboard/OfferCard";

export const metadata = {
  title: "Dashboard | UrbanClone",
};

export default function DashboardPage() {
  return (
    <div className="px-4 md:px-6 py-6 max-w-screen-xl mx-auto">
      {/* Page Title */}
      <h1 className="text-xl font-bold text-[var(--color-foreground)] mb-5">Dashboard</h1>

      {/* Welcome Banner */}
      <div className="mb-6">
        <WelcomeBanner />
      </div>

      {/* Main Grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Column — 65% */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Stats */}
          <StatsCards />
          {/* Recent Bookings */}
          <RecentBookings />
        </div>

        {/* Right Column — 35% */}
        <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 space-y-4">
          <QuickActions />
          <RecentActivity />
          <OfferCard />
        </div>

      </div>
    </div>
  );
}
