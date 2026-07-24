import { useState } from "react";
import type { SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";


function LoginPage() {
    const navigate = useNavigate();  

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleLogin = (event: SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();

      setEmailError("");
      setPasswordError("");

      let hasError = false;

      if (email.trim() === "") {
        setEmailError("Email is required.");
        hasError = true;
      }

      if (password.trim() === "") {
        setPasswordError("Password is required.");
        hasError = true;
      }

      if (hasError) {
        return;
      }

      navigate("/dashboard");
    };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Sign in to continue using InterviewIQ.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={`w-full rounded-lg border p-3 outline-none focus:ring-2 ${
                emailError
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
            />

            {emailError && (
              <p className="mt-2 text-sm text-red-600">
              {emailError}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={`w-full rounded-lg border p-3 outline-none focus:ring-2 ${
                passwordError
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
            />

            {passwordError && (
              <p className="mt-2 text-sm text-red-600">
              {passwordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>

        <button
          type="button"
          className="mt-4 w-full rounded-lg border py-3 hover:bg-gray-100"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center">
          <Link
            to="/"
            className="text-blue-600 hover:underline"
          >
            ← Back to Home
          </Link>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;