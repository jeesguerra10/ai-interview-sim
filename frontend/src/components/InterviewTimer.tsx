type InterviewTimerProps = {
  seconds: number;
};

function InterviewTimer({ seconds }: InterviewTimerProps) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="mb-6 text-sm text-gray-600">
      Time: {minutes}:{remainingSeconds.toString().padStart(2, "0")}
    </div>
  );
}

export default InterviewTimer;