import { Link } from "react-router-dom";

function DashboardNavbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
          InterviewIQ
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/dashboard"
            className="text-gray-600 hover:text-blue-600"
          >
            Dashboard
          </Link>

          <Link
            to="/interview"
            className="text-gray-600 hover:text-blue-600"
          >
            Start Interview
          </Link>

          <Link
            to="/"
            className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
          >
            Log Out
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNavbar;