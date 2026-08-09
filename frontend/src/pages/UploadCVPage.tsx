import {
  useState,
  type ChangeEvent,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { extractTextFromPDF } from "../services/pdfService";
import { generateInterviewQuestions } from "../services/aiService";

function UploadCVPage() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [cvText, setCvText] = useState("");
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] =
    useState("Intermediate");

  const [error, setError] = useState("");
  const [processing, setProcessing] =
    useState(false);

  const [generating, setGenerating] =
    useState(false);

  const [generateError, setGenerateError] =
    useState("");

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    setError("");
    setGenerateError("");
    setCvText("");

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      setSelectedFile(null);
      return;
    }

    const maximumFileSize = 5 * 1024 * 1024;

    if (file.size > maximumFileSize) {
      setError(
        "The PDF must be smaller than 5 MB."
      );
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleReadCV = async () => {
    if (!selectedFile) {
      return;
    }

    try {
      setProcessing(true);
      setError("");
      setGenerateError("");
      setCvText("");

      const extractedText =
        await extractTextFromPDF(selectedFile);

      if (!extractedText) {
        setError(
          "No readable text was found in this PDF."
        );
        return;
      }

      setCvText(extractedText);
    } catch (error) {
      console.error(
        "Unable to read PDF:",
        error
      );

      setError(
        "The PDF could not be read. Please try another file."
      );
    } finally {
      setProcessing(false);
    }
  };

  const handleGenerateInterview = async () => {
    if (!cvText) {
      setError(
        "Please read your CV before continuing."
      );
      return;
    }

    if (role.trim() === "") {
      setError("Please enter a job role.");
      return;
    }

    try {
      setGenerating(true);
      setError("");
      setGenerateError("");

      const questions =
        await generateInterviewQuestions({
          cvText,
          role: role.trim(),
          difficulty,
        });

      navigate("/interview", {
        state: {
          cvText,
          role: role.trim(),
          difficulty,
          questions,
        },
      });
    } catch (error) {
      console.error(
        "Unable to generate interview:",
        error
      );

      setGenerateError(
        "Interview questions could not be generated. Please try again."
      );
    } finally {
      setGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <section className="mx-auto max-w-2xl">
        <Link
          to="/dashboard"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Back to dashboard
        </Link>

        <div className="mt-6 rounded-xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">
            Upload your CV
          </h1>

          <p className="mt-2 text-gray-600">
            Upload your CV as a PDF to prepare a
            personalised interview.
          </p>

          <label
            htmlFor="cv"
            className="mt-8 block cursor-pointer rounded-xl border-2 border-dashed border-gray-300 p-10 text-center transition hover:border-blue-500"
          >
            <span className="font-semibold text-gray-900">
              Choose a PDF file
            </span>

            <span className="mt-2 block text-sm text-gray-500">
              Maximum file size: 5 MB
            </span>
          </label>

          <input
            id="cv"
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          {selectedFile && (
            <div className="mt-6 rounded-lg bg-blue-50 p-4">
              <p className="font-medium text-blue-900">
                Selected file
              </p>

              <p className="mt-1 text-sm text-blue-700">
                {selectedFile.name}
              </p>
            </div>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleReadCV}
            disabled={!selectedFile || processing}
            className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {processing
              ? "Reading CV..."
              : "Read CV"}
          </button>

          {cvText && (
            <>
              <section className="mt-8">
                <h2 className="text-xl font-bold text-gray-900">
                  Extracted CV text
                </h2>

                <div className="mt-4 max-h-80 overflow-y-auto rounded-lg bg-gray-50 p-4">
                  <p className="whitespace-pre-wrap text-sm text-gray-700">
                    {cvText}
                  </p>
                </div>
              </section>

              <div className="mt-8">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job role
                </label>

                <input
                  id="role"
                  type="text"
                  value={role}
                  onChange={(event) =>
                    setRole(event.target.value)
                  }
                  placeholder="Example: Frontend Developer"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="difficulty"
                  className="block text-sm font-medium text-gray-700"
                >
                  Difficulty
                </label>

                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(event) =>
                    setDifficulty(event.target.value)
                  }
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="Beginner">
                    Beginner
                  </option>

                  <option value="Intermediate">
                    Intermediate
                  </option>

                  <option value="Advanced">
                    Advanced
                  </option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleGenerateInterview}
                disabled={
                  role.trim() === "" ||
                  generating
                }
                className="mt-8 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {generating
                  ? "Generating Interview..."
                  : "Generate Interview"}
              </button>

              {generateError && (
                <p className="mt-4 text-sm text-red-600">
                  {generateError}
                </p>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default UploadCVPage;