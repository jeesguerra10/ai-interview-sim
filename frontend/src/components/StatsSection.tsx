import StatCard from "./StatCard";
import type { InterviewRecord } from "../services/interviewService";

type StatsSectionProps = {
  interviews: InterviewRecord[];
};

function StatsSection({
  interviews,
}: StatsSectionProps) {
  const completedInterviews = interviews.length;

  const totalScore = interviews.reduce(
    (total, interview) => total + interview.overallScore,
    0
  );

  const averageScore =
    completedInterviews > 0
      ? Math.round(totalScore / completedInterviews)
      : 0;

  const totalSeconds = interviews.reduce(
    (total, interview) =>
      total + interview.durationSeconds,
    0
  );

  const totalMinutes = Math.round(totalSeconds / 60);

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold">
        Your Progress
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Interviews Completed"
          value={completedInterviews.toString()}
        />

        <StatCard
          title="Average Score"
          value={`${averageScore}%`}
        />

        <StatCard
          title="Minutes Practised"
          value={totalMinutes.toString()}
        />
      </div>
    </section>
  );
}

export default StatsSection;