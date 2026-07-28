import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InterviewHeader from "../components/InterviewHeader";
import QuestionCard from "../components/QuestionCard";
import AnswerBox from "../components/AnswerBox";
import InterviewControls from "../components/InterviewControls";
import ProgressBar from "../components/ProgressBar";
import InterviewTimer from "../components/InterviewTimer";

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

  const currentAnswerWordCount = answers[currentQuestion].trim()
    ? answers[currentQuestion].trim().split(/\s+/).length
    : 0;

  const isCurrentAnswerValid = currentAnswerWordCount >= 10;

  const handleAnswerChange = (newAnswer: string) => {
    const updatedAnswers = [...answers];

    updatedAnswers[currentQuestion] = newAnswer;

    setAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
        navigate("/results", {
          state: {
            questions,
            answers,
          },
        });
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

        <InterviewTimer />

        <ProgressBar
          currentQuestion={currentQuestion + 1}
          totalQuestions={questions.length}
        />

        <QuestionCard question={questions[currentQuestion]} />

        <AnswerBox
          answer={answers[currentQuestion]}
          onAnswerChange={handleAnswerChange} 
        />

        <InterviewControls
          onPrevious={handlePreviousQuestion}
          onNext={handleNextQuestion}
          isFirstQuestion={currentQuestion === 0}
          isLastQuestion={currentQuestion === questions.length - 1}
          canContinue={isCurrentAnswerValid}
        />
      </main>
    </div>
  );
}

export default InterviewPage;