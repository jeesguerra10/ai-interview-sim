import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-6">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        InterviewIQ
      </Link>

      <div className="flex items-center gap-6">
        <a href="#features" className="hover:text-blue-600">
          Features
        </a>

        <a href="#about" className="hover:text-blue-600">
          About
        </a>

        <Link
          to="/login"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;