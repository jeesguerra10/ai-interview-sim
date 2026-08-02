import { useEffect, useState } from "react";

import DashboardNavbar from "../components/DashboardNavbar";
import WelcomeSection from "../components/WelcomeSection";
import QuickActions from "../components/QuickActions";
import StatsSection from "../components/StatsSection";
import RecentActivity from "../components/RecentActivity";

import { auth } from "../services/firebase";
import {
  getUserInterviews,
  type InterviewRecord,
} from "../services/interviewService";

function DashboardPage() {
  const [interviews, setInterviews] = useState<InterviewRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadInterviews = async () => {
      const user = auth.currentUser;

      if (!user) {
        setError("You must be signed in to view your dashboard.");
        setLoading(false);
        return;
      }

      try {
        const savedInterviews = await getUserInterviews(user.uid);
        setInterviews(savedInterviews);
      } catch (error) {
        console.error("Unable to load interviews:", error);
        setError("Your interview history could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    loadInterviews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <WelcomeSection />
        <QuickActions />

        {loading && (
          <p className="mb-8 text-gray-600">
            Loading your interview history...
          </p>
        )}

        {error && (
          <p className="mb-8 text-sm text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            <StatsSection interviews={interviews} />
            <RecentActivity interviews={interviews} />
          </>
        )}
      </main>
    </div>
  );
}

export default DashboardPage;