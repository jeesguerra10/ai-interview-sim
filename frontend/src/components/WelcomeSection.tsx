import { Link } from "react-router-dom";

function WelcomeSection() {
  return (
    <section className="mb-12">
      <h2 className="font-bold text-4xl">
        Welcome Back
      </h2>

      <p className="mt-3 text-gray-600">
        Ready for your next interview practice?
      </p>
      <p className="mt-2 text-gray-600">
        Keep improving with personalized AI interviews.
      </p>

      <Link 
        to="/interview" 
        className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Start Interview
      </Link>
    </section>
  );
}

export default WelcomeSection;