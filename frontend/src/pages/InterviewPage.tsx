import {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import AnswerBox from "../components/AnswerBox";
import InterviewControls from "../components/InterviewControls";
import InterviewHeader from "../components/InterviewHeader";
import InterviewTimer from "../components/InterviewTimer";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";

import { auth } from "../services/firebase";
import { saveInterview } from "../services/interviewService";

type InterviewSetup = {
  cvText: string;
  role: string;
  difficulty: string;
  questions: string[];
};

const fallbackQuestions = [
  "Tell me about yourself and your relevant experience.",
  "Why are you interested in this role?",
  "Describe a difficult problem you solved.",
  "What skills would help you succeed in this position?",
  "Where do you see yourself professionally in three years?",
];

function InterviewPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const interviewSetup =
    location.state as InterviewSetup | undefined;

  const role =
    interviewSetup?.role ||
    "Frontend Developer";

  const difficulty =
    interviewSetup?.difficulty ||
    "Intermediate";

  const questions =
    interviewSetup?.questions &&
    interviewSetup.questions.length > 0
      ? interviewSetup.questions
      : fallbackQuestions;

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] = useState<
    string[]
  >(Array(questions.length).fill(""));

  const [seconds, setSeconds] = useState(0);

  const [saving, setSaving] =
    useState(false);

  const [saveError, setSaveError] =
    useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(
        (previousSeconds) =>
          previousSeconds + 1
      );
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const currentAnswer =
    answers[currentQuestion];

  const currentAnswerWordCount =
    currentAnswer.trim()
      ? currentAnswer
          .trim()
          .split(/\s+/).length
      : 0;

  const isCurrentAnswerValid =
    currentAnswerWordCount >= 10;

  const handleAnswerChange = (
    newAnswer: string
  ) => {
    const updatedAnswers = [...answers];

    updatedAnswers[currentQuestion] =
      newAnswer;

    setAnswers(updatedAnswers);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        (previousQuestion) =>
          previousQuestion - 1
      );
    }
  };

  const handleNextQuestion = async () => {
    if (
      currentQuestion <
      questions.length - 1
    ) {
      setCurrentQuestion(
        (previousQuestion) =>
          previousQuestion + 1
      );

      return;
    }

    const user = auth.currentUser;

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setSaving(true);
      setSaveError("");

      const overallScore = 82;

      const interviewId =
        await saveInterview({
          userId: user.uid,
          role,
          questions,
          answers,
          durationSeconds: seconds,
          overallScore,
        });

      navigate("/results", {
        state: {
          interviewId,
          questions,
          answers,
          seconds,
          overallScore,
          role,
          difficulty,
        },
      });
    } catch (error) {
      console.error(
        "Unable to save interview:",
        error
      );

      setSaveError(
        "Your interview could not be saved. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-4xl px-6 py-10">
        <InterviewHeader
          currentQuestion={
            currentQuestion + 1
          }
          totalQuestions={
            questions.length
          }
          role={role}
          difficulty={difficulty}
        />

        <InterviewTimer
          seconds={seconds}
        />

        <ProgressBar
          currentQuestion={
            currentQuestion + 1
          }
          totalQuestions={
            questions.length
          }
        />

        <QuestionCard
          question={
            questions[currentQuestion]
          }
        />

        <AnswerBox
          answer={currentAnswer}
          onAnswerChange={
            handleAnswerChange
          }
        />

        {saveError && (
          <p className="mb-4 text-sm text-red-600">
            {saveError}
          </p>
        )}

        <InterviewControls
          onPrevious={
            handlePreviousQuestion
          }
          onNext={handleNextQuestion}
          isFirstQuestion={
            currentQuestion === 0
          }
          isLastQuestion={
            currentQuestion ===
            questions.length - 1
          }
          canContinue={
            isCurrentAnswerValid
          }
          isSubmitting={saving}
        />
      </main>
    </div>
  );
}

export default InterviewPage;