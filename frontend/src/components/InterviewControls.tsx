type InterviewControlsProps = {
  onPrevious: () => void;
  onNext: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  canContinue: boolean;
};

function InterviewControls({
  onPrevious,
  onNext,
  isFirstQuestion,
  isLastQuestion,
  canContinue,
}: InterviewControlsProps) {
  return (
    <section className="flex items-center justify-between">
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstQuestion}
        className="rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={!canContinue}
        className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLastQuestion ? "Finish Interview" : "Next Question"}
      </button>
    </section>
  );
}

export default InterviewControls;