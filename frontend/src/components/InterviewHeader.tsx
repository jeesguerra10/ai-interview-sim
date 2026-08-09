type InterviewHeaderProps = {
  currentQuestion: number;
  totalQuestions: number;
  role: string;
  difficulty: string;
};

function InterviewHeader({
  currentQuestion,
  totalQuestions,
  role,
  difficulty,
}: InterviewHeaderProps) {
  return (
    <header className="mb-8">
      <p className="text-sm font-medium text-blue-600">
        Practice Interview
      </p>

      <h1 className="mt-2 text-3xl font-bold text-gray-900">
        {role} Interview
      </h1>

      <p className="mt-2 text-gray-600">
        {difficulty} level . Question{" "}
        {currentQuestion} of{" "}
        {totalQuestions}
      </p>
    </header>
  );
}

export default InterviewHeader;