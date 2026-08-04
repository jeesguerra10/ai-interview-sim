import { auth } from "../services/firebase";
import type { InterviewRecord } from "../services/interviewService";

type ProfileCardProps = {
  interviews: InterviewRecord[];
};

function ProfileCard({ interviews }: ProfileCardProps) {
  const user = auth.currentUser;

  const displayName = user?.displayName || "InterviewIQ User";
  const email = user?.email || "Email unavailable";

  const initials = displayName
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const creationDate = user?.metadata.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-NZ", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Date unavailable";

  const completedInterviews = interviews.length;

  const bestScore =
    completedInterviews > 0
      ? Math.max(
          ...interviews.map(
            (interview) => interview.overallScore
          )
        )
      : 0;

  return (
    <section className="mb-12 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
            {initials}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {displayName}
            </h2>

            <p className="mt-1 text-gray-600">
              {email}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Member since {creationDate}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-gray-50 px-5 py-4 text-center">
            <p className="text-sm text-gray-600">
              Interviews
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {completedInterviews}
            </p>
          </div>

          <div className="rounded-lg bg-blue-50 px-5 py-4 text-center">
            <p className="text-sm text-gray-600">
              Best Score
            </p>

            <p className="mt-1 text-2xl font-bold text-blue-600">
              {bestScore}%
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileCard;