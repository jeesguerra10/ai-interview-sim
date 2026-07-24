import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="mx-auto mt-24 max-w-4xl px-8 text-center">
      <h2 className="text-6xl font-bold">
        Ace Your Next Interview with AI
      </h2>

      <p className="mt-6 text-lg text-gray-600">
        Upload your CV, practice personalized interviews, and receive
        instant AI feedback to improve your confidence.
      </p>

      <Link
        to="/login"
        className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Get Started
      </Link>
    </section>
  );
}

export default Hero;