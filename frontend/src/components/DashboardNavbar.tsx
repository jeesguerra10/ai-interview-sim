import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

function DashboardNavbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/dashboard"
          className="text-2xl font-bold text-blue-600"
        >
          InterviewIQ
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="text-sm text-gray-600 hover:text-blue-600 sm:text-base"
          >
            Dashboard
          </Link>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100 sm:px-4"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNavbar;