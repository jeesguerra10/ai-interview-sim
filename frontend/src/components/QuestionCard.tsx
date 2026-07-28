type QuestionCardProps = {
    question: string;
}

function QuestionCard({ question }: QuestionCardProps) {
  return (
    <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">
        Interview Question
      </h2>

      <p className="mt-4 text-lg leading-relaxed text-gray-700">
        {question};
      </p>
    </section>
  );
}

export default QuestionCard;