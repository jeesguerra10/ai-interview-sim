type Activity = {
  id: number;
  role: string;
  date: string;
  score: string;
};

const activities: Activity[] = [
  {
    id: 1,
    role: "Frontend Developer",
    date: "24 July 2026",
    score: "82%",
  },
  {
    id: 2,
    role: "Software Engineer",
    date: "21 July 2026",
    score: "76%",
  },
  {
    id: 3,
    role: "Graduate Developer",
    date: "18 July 2026",
    score: "88%",
  },
];

function RecentActivity() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold">Recent Activity</h2>

      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
        {activities.map((activity) => (
          <article
            key={activity.id}
            className="flex flex-col gap-3 border-b border-gray-200 p-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h3 className="font-semibold text-gray-900">
                {activity.role}
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                {activity.date}
              </p>
            </div>

            <p className="font-semibold text-blue-600">
              Score: {activity.score}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default RecentActivity;