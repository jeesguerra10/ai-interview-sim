import FeatureCard from "./FeatureCard";

function Features() {
  return (
    <section className="mx-auto mt-24 max-w-6xl px-8">
      <h2 className="text-center text-3xl font-bold">
        Practice smarter, not harder
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <FeatureCard
          title="CV-Based Questions"
          description="Upload your CV and get interview questions based on your real experience, skills, and projects."
        />

        <FeatureCard
          title="AI Feedback"
          description="Receive instant feedback on your answers, including technical depth, clarity, and confidence."
        />

        <FeatureCard
          title="Progress Tracking"
          description="Track your interview history and see how your answers improve over time."
        />
      </div>
    </section>
  );
}

export default Features;