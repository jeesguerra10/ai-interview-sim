import {
  useLocation,
} from "react-router-dom";

import FeedbackList from "../components/FeedbackList";
import QuestionFeedbackCard from "../components/QuestionFeedbackCard";
import ResultActions from "../components/ResultActions";
import ResultSummary from "../components/ResultSummary";

import type {
  QuestionFeedback,
} from "../services/aiService";

type ResultsState = {
  interviewId: string;
  role: string;
  difficulty: string;
  questions: string[];
  answers: string[];
  seconds: number;
  overallScore: number;
  strengths: string[];
  improvements: string[];
  questionFeedback: QuestionFeedback[];
};

function ResultsPage() {
  const location = useLocation();

  const results =
    location.state as ResultsState | null;

  const questions =
    results?.questions || [];

  const answers =
    results?.answers || [];

  const seconds =
    results?.seconds || 0;

  const overallScore =
    results?.overallScore || 0;

  const strengths =
    results?.strengths || [];

  const improvements =
    results?.improvements || [];

  const questionFeedback =
    results?.questionFeedback || [];

  const minutes =
    Math.floor(seconds / 60);

  const remainingSeconds =
    seconds % 60;

  const completedTime =
    `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;

  if (!results) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            No interview results found
          </h1>

          <p className="mt-2 text-gray-600">
            Complete an interview to see your results.
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Interview Results
        </h1>

        <p className="mt-2 text-gray-600">
          {results.role} · {results.difficulty} level
        </p>

        <div className="mt-8">
          <ResultSummary
            score={overallScore}
            completedTime={completedTime}
          />
        </div>

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

        {questions.map(
          (
            question: string,
            index: number
          ) => {
            const feedback =
              questionFeedback[index];

            return (
              <QuestionFeedbackCard
                key={index}
                questionNumber={
                  index + 1
                }
                question={question}
                answer={
                  answers[index] || ""
                }
                score={
                  feedback?.score || 0
                }
                feedback={
                  feedback?.feedback ||
                  "Feedback unavailable."
                }
              />
            );
          }
        )}

        <ResultActions />
      </main>
    </div>
  );
}

export default ResultsPage;