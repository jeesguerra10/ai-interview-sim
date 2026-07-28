import StatCard from "./StatCard";

function StatsSection() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold">Your Progress</h2>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Interviews Completed" value="0" />
        <StatCard title="Average Score" value="0%" />
        <StatCard title="Hours Practised" value="0" />
      </div>
    </section>
  );
}

export default StatsSection;