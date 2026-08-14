import { Link } from "react-router-dom";

import type { InterviewRecord } from "../services/interviewService";

type RecentActivityProps = {
  interviews: InterviewRecord[];
};

function RecentActivity({
  interviews,
}: RecentActivityProps) {
  const recentInterviews = interviews.slice(0, 5);

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold">
        Recent Activity
      </h2>

      {recentInterviews.length === 0 ? (
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
          <p className="text-gray-600">
            You have not completed any interviews yet.
          </p>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
          {recentInterviews.map((interview) => {
            const interviewDate = interview.createdAt
              ? interview.createdAt
                  .toDate()
                  .toLocaleDateString("en-NZ", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
              : "Date unavailable";

            return (
              <Link
                to={`/results/${interview.id}`}
                key={interview.id}
                className="block border-b border-gray-200 p-5 transition hover:bg-gray-50 last:border-b-0"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {interview.role}
                    </h3>

                    <p className="mt-1 text-sm text-gray-600">
                      {interviewDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="font-semibold text-blue-600">
                      Score: {interview.overallScore}%
                    </p>

                    <span className="text-sm text-gray-500">
                      View results
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default RecentActivity;