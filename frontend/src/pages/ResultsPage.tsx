import { useLocation } from "react-router-dom";
import ResultSummary from "../components/ResultSummary";
import FeedbackList from "../components/FeedbackList";
import QuestionFeedbackCard from "../components/QuestionFeedbackCard";
import ResultActions from "../components/ResultActions";

function ResultsPage() {
  const location = useLocation();

  const { questions, answers, seconds = 0} = location.state || {
    questions: [],
    answers: [],
    seconds: 0,
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const completedTime = `${minutes}:${remainingSeconds
  .toString()
  .padStart(2, "0")}`;

  const strengths = [
  "You gave clear and understandable answers.",
  "You provided relevant examples from your experience.",
  "Your answers showed confidence and good communication.",
  ];

  const improvements = [
  "Use the STAR method to structure your answers.",
  "Include more detail about the results of your actions.",
  "Connect your experience more directly to the role.",
  ];

  const questionScores = [80, 85, 78, 88, 82];

  const questionFeedback = [
    "Good introduction. Add one specific example of a React project you have worked on.",
    "Your motivation is clear. Connect it more directly to the company and role.",
    "You explained the problem well. Include more detail about the result.",
    "Strong answer. Add one accessibility example such as keyboard navigation or semantic HTML.",
    "Good career direction. Make the goal more specific and explain how you plan to achieve it.",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">
          Interview Results
        </h1>

        <ResultSummary
          score={82}
          completedTime={completedTime}
        />

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <FeedbackList
            title="Strengths"
            items={strengths}
          />

          <FeedbackList
            title="Areas to Improve"
            items={improvements}
          />
        </div>

        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Question Feedback
        </h2>

        {questions.map((question: string, index: number) => (
          <QuestionFeedbackCard
            key={index}
            questionNumber={index + 1}
            question={question}
            answer={answers[index]}
            score={questionScores[index]}
            feedback={questionFeedback[index]}
          />
        ))}

        <ResultActions />

      </main>
    </div>
  );
}

export default ResultsPage;