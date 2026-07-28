type ProgressBarProps = {
  currentQuestion: number;
  totalQuestions: number;
};

function ProgressBar({
  currentQuestion,
  totalQuestions,
}: ProgressBarProps) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <section className="mb-8">
      <div className="mb-2 flex justify-between text-sm text-gray-600">
        <span>Progress</span>
        <span>{Math.round(progress)}%</span>
      </div>

      <div className="h-3 w-full rounded-full bg-gray-200">
        <div
          className="h-3 rounded-full bg-blue-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
}

export default ProgressBar;