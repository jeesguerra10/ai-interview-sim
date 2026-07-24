import DashboardNavbar from "../components/DashboardNavbar";
import WelcomeSection from "../components/WelcomeSection";
import QuickActions from "../components/QuickActions";
import StatsSection from "../components/StatsSection";
import RecentActivity from "../components/RecentActivity";

function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <DashboardNavbar />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <WelcomeSection />
        <QuickActions />
        <StatsSection />
        <RecentActivity />
      </div>
    </main>
  );
}

export default DashboardPage;