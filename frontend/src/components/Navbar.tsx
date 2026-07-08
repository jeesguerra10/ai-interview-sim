function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-6">
      <h1 className="text-2xl font-bold text-blue-600">
        InterviewIQ
      </h1>

      <div className="flex gap-6">
        <a href="#" className="hover:text-blue-600">
          Features
        </a>

        <a href="#" className="hover:text-blue-600">
          About
        </a>

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Sign In
        </button>
      </div>
    </nav>
  );
}

export default Navbar;