import { Link } from "react-router-dom";

function QuickActions() {
  return (
    <section className="mb-12">
      <h2 className="font-bold text-2xl">
        Quick Actions
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link to="/interview" className="block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
          <h3>
            Start Interview
          </h3>

          <p className="mt-2 text-sm">
            Practice with AI-generated interview questions.
          </p>
        </Link>

        <Link to="/upload-cv" className="block rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700">
          <h3 className="text-lg font-semibold">
            Upload CV
          </h3>
          <p className="mt-2 text-sm">
            Upload your resume for personalised interviews.
          </p>
        </Link>
      </div>
    </section>
  );
}

export default QuickActions;