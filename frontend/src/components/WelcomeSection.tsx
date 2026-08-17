import { Link } from "react-router-dom";
import { auth } from "../services/firebase";

const defaultQuestions = [
  "Tell me about yourself and your relevant experience.",
  "Why are you interested in this role?",
  "Describe a difficult problem you solved.",
  "What skills would help you succeed in this position?",
  "Where do you see yourself professionally in three years?",
];

function WelcomeSection() {
  const userName =
    auth.currentUser?.displayName || "there";

  return (
    <section className="mb-12">
      <h2 className="text-4xl font-bold">
        Welcome back, {userName}
      </h2>

      <p className="mt-3 text-gray-600">
        Ready for your next interview practice?
      </p>

      <p className="mt-2 text-gray-600">
        Keep improving with personalised AI interviews.
      </p>

      <Link
        to="/interview"
        state={{
          role: "Frontend Developer",
          difficulty: "Intermediate",
          questions: defaultQuestions,
        }}
        className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
      >
        Start Interview
      </Link>
    </section>
  );
}

export default WelcomeSection;