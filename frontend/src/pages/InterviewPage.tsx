import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import InterviewHeader from "../components/InterviewHeader";
import QuestionCard from "../components/QuestionCard";
import AnswerBox from "../components/AnswerBox";
import InterviewControls from "../components/InterviewControls";
import ProgressBar from "../components/ProgressBar";
import InterviewTimer from "../components/InterviewTimer";
import { auth } from "../services/firebase";
import { saveInterview } from "../services/interviewService";

const questions = [
  "Tell me about yourself and your experience with React.",
  "Why are you interested in this frontend developer role?",
  "Describe a difficult problem you solved while programming.",
  "How do you make a website responsive and accessible?",
  "Where do you see yourself professionally in three years?",
];

function InterviewPage() {
  const navigate = useNavigate();
    
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );

  const [seconds, setSeconds] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

    useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((previousSeconds) => previousSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const currentAnswerWordCount = answers[currentQuestion].trim()
    ? answers[currentQuestion].trim().split(/\s+/).length
    : 0;

  const isCurrentAnswerValid = currentAnswerWordCount >= 10;

  const handleAnswerChange = (newAnswer: string) => {
    const updatedAnswers = [...answers];

    updatedAnswers[currentQuestion] = newAnswer;

    setAnswers(updatedAnswers);
  };

  const handleNextQuestion = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(
        (previousQuestion) => previousQuestion + 1
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

      const interviewId = await saveInterview({
        userId: user.uid,
        role: "Frontend Developer",
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

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-4xl px-6 py-10">
        <InterviewHeader
          currentQuestion={currentQuestion + 1}
          totalQuestions={questions.length}
        />

        <InterviewTimer seconds={seconds} />

        <ProgressBar
          currentQuestion={currentQuestion + 1}
          totalQuestions={questions.length}
        />

        <QuestionCard question={questions[currentQuestion]} />

        <AnswerBox
          answer={answers[currentQuestion]}
          onAnswerChange={handleAnswerChange} 
        />

        {saveError && (
          <p 
            className="mb-4 text-sm text-red-600"> {saveError}
          </p>
        )}

        <InterviewControls
          onPrevious={handlePreviousQuestion}
          onNext={handleNextQuestion}
          isFirstQuestion={currentQuestion === 0}
          isLastQuestion={currentQuestion === questions.length - 1}
          canContinue={isCurrentAnswerValid}
          isSubmitting={saving}
        />
      </main>
    </div>
  );
}

export default InterviewPage;