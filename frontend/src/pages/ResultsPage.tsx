import {useEffect, useState} from "react";

import {useLocation,useParams} from "react-router-dom";

import FeedbackList from "../components/FeedbackList";
import QuestionFeedbackCard from "../components/QuestionFeedbackCard";
import ResultActions from "../components/ResultActions";
import ResultSummary from "../components/ResultSummary";

import { auth } from "../services/firebase";

import {
  getInterviewById,
  type InterviewRecord,
} from "../services/interviewService";

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
  const { interviewId } = useParams();

  const freshResults =
    location.state as ResultsState | null;

  const [savedResult, setSavedResult] =
    useState<InterviewRecord | null>(null);

  const [loading, setLoading] =
    useState(Boolean(interviewId && !freshResults));

  const [error, setError] = useState("");

  useEffect(() => {
    const loadSavedInterview = async () => {
      if (!interviewId || freshResults) {
        return;
      }

      const user = auth.currentUser;

      if (!user) {
        setError(
          "You must be signed in to view this interview."
        );

        setLoading(false);
        return;
      }

      try {
        const interview =
          await getInterviewById(
            user.uid,
            interviewId
          );

        if (!interview) {
          setError(
            "This interview could not be found."
          );

          return;
        }

        setSavedResult(interview);
      } catch (error) {
        console.error(
          "Unable to load saved interview:",
          error
        );

        setError(
          "Your saved interview could not be loaded."
        );
      } finally {
        setLoading(false);
      }
    };

    loadSavedInterview();
  }, [interviewId, freshResults]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600">
          Loading interview results...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Unable to load results
          </h1>

          <p className="mt-2 text-gray-600">
            {error}
          </p>
        </div>
      </main>
    );
  }

  const role =
    freshResults?.role ||
    savedResult?.role ||
    "Interview";

  const difficulty =
    freshResults?.difficulty ||
    savedResult?.difficulty ||
    "Intermediate";

  const questions =
    freshResults?.questions ||
    savedResult?.questions ||
    [];

  const answers =
    freshResults?.answers ||
    savedResult?.answers ||
    [];

  const seconds =
    freshResults?.seconds ??
    savedResult?.durationSeconds ??
    0;

  const overallScore =
    freshResults?.overallScore ??
    savedResult?.overallScore ??
    0;

  const strengths =
    freshResults?.strengths ||
    savedResult?.strengths ||
    [];

  const improvements =
    freshResults?.improvements ||
    savedResult?.improvements ||
    [];

  const questionFeedback =
    freshResults?.questionFeedback ||
    savedResult?.questionFeedback ||
    [];

  if (
    !freshResults &&
    !savedResult
  ) {
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

  const minutes =
    Math.floor(seconds / 60);

  const remainingSeconds =
    seconds % 60;

  const completedTime =
    `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Interview Results
        </h1>

        <p className="mt-2 text-gray-600">
          {role} · {difficulty} level
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