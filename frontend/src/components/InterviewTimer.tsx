import { useEffect, useState } from "react";

function InterviewTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((previousSeconds) => previousSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="mb-6 text-sm text-gray-600">
      Time: {minutes}:{remainingSeconds.toString().padStart(2, "0")}
    </div>
  );
}

export default InterviewTimer;