import { useLocation } from "react-router-dom";

function ResultsPage() {
  const location = useLocation();

  const { questions, answers, seconds = 0} = location.state || {
    questions: [],
    answers: [],
    seconds: 0,
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="mb-8 text-4xl font-bold">
          Interview Results
        </h1>

        <p className="mb-8 mt-2 text-gray-600">
          Completed in {minutes}:
          {remainingSeconds.toString().padStart(2, "0")}
        </p>

        {questions.map((question: string, index: number) => (
          <section
            key={index}
            className="mb-8 rounded-xl bg-white p-6 shadow"
          >
            <h2 className="text-xl font-semibold">
              Question {index + 1}
            </h2>

            <p className="mt-3 text-gray-700">
              {question}
            </p>

            <h3 className="mt-6 font-semibold">
              Your Answer
            </h3>

            <p className="mt-2 whitespace-pre-wrap text-gray-600">
              {answers[index] || "No answer provided."}
            </p>
          </section>
        ))}
      </main>
    </div>
  );
}

export default ResultsPage;