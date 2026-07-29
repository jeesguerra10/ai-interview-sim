type ResultSummaryProps = {
  score: number;
  completedTime: string;
};

function ResultSummary({
  score,
  completedTime,
}: ResultSummaryProps) {
  return (
    <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900">
        Performance Summary
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-blue-50 p-5">
          <p className="text-sm text-gray-600">
            Overall Score
          </p>

          <p className="mt-2 text-4xl font-bold text-blue-600">
            {score}%
          </p>
        </div>

        <div className="rounded-lg bg-gray-100 p-5">
          <p className="text-sm text-gray-600">
            Completion Time
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {completedTime}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ResultSummary;