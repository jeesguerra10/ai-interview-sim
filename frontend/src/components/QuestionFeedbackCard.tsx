type QuestionFeedbackCardProps = {
  questionNumber: number;
  question: string;
  answer: string;
  score: number;
  feedback: string;
};

function QuestionFeedbackCard({
  questionNumber,
  question,
  answer,
  score,
  feedback,
}: QuestionFeedbackCardProps) {
  return (
    <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Question {questionNumber}
          </p>

          <h2 className="mt-2 text-xl font-semibold text-gray-900">
            {question}
          </h2>
        </div>

        <div className="rounded-lg bg-blue-50 px-4 py-2 text-center">
          <p className="text-sm text-gray-600">Score</p>
          <p className="text-2xl font-bold text-blue-600">
            {score}%
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-gray-900">
          Your Answer
        </h3>

        <p className="mt-2 whitespace-pre-wrap text-gray-600">
          {answer || "No answer provided."}
        </p>
      </div>

      <div className="mt-6 rounded-lg bg-gray-50 p-4">
        <h3 className="font-semibold text-gray-900">
          Feedback
        </h3>

        <p className="mt-2 text-gray-600">
          {feedback}
        </p>
      </div>
    </section>
  );
}

export default QuestionFeedbackCard;