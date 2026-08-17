import { Link } from "react-router-dom";

const defaultQuestions = [
  "Tell me about yourself and your relevant experience.",
  "Why are you interested in this role?",
  "Describe a difficult problem you solved.",
  "What skills would help you succeed in this position?",
  "Where do you see yourself professionally in three years?",
];

function QuickActions() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold">
        Quick Actions
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link
          to="/interview"
          state={{
            role: "Frontend Developer",
            difficulty: "Intermediate",
            questions: defaultQuestions,
          }}
          className="rounded-xl bg-blue-600 p-6 text-white transition hover:bg-blue-700"
        >
          <h3 className="text-xl font-semibold">
            Start Interview
          </h3>

          <p className="mt-2 text-blue-100">
            Practice with interview questions immediately.
          </p>
        </Link>

        <Link
          to="/upload-cv"
          className="rounded-xl border border-gray-200 bg-white p-6 transition hover:border-blue-300 hover:bg-blue-50"
        >
          <h3 className="text-xl font-semibold text-gray-900">
            Upload CV
          </h3>

          <p className="mt-2 text-gray-600">
            Generate personalised interview questions from your CV.
          </p>
        </Link>
      </div>
    </section>
  );
}

export default QuickActions;