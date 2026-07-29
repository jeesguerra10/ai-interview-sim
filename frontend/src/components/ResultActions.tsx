import { useNavigate } from "react-router-dom";

function ResultActions() {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    navigate("/interview");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
      <button
        onClick={handleTryAgain}
        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Try Another Interview
      </button>

      <button
        onClick={handleDashboard}
        className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100"
      >
        Return to Dashboard
      </button>
    </div>
  );
}

export default ResultActions;