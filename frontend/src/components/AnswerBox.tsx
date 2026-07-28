type AnswerBoxProps = {
  answer: string;
  onAnswerChange: (answer: string) => void;
};

function AnswerBox({
  answer,
  onAnswerChange,
}: AnswerBoxProps) {
  const wordCount = answer.trim()
    ? answer.trim().split(/\s+/).length
    : 0;

  const isAnswerTooShort = wordCount < 10;

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900">
        Your Answer
      </h2>

      <textarea
        className="mt-4 w-full rounded-xl border border-gray-300 p-4 focus:border-blue-500 focus:outline-none"
        rows={8}
        placeholder="Type your answer here..."
        value={answer}
        onChange={(event) => onAnswerChange(event.target.value)}
      />

      <div className="mt-2 flex items-center justify-between text-sm">
        <p className="text-gray-500">
          {wordCount} words
        </p>

        {isAnswerTooShort && (
          <p className="text-red-600">
            Please write at least 10 words.
          </p>
        )}
      </div>
    </section>
  );
}

export default AnswerBox;