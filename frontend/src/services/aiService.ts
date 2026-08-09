type GenerateQuestionsRequest = {
  cvText: string;
  role: string;
  difficulty: string;
};

type GenerateQuestionsResponse = {
  questions: string[];
};

export async function generateInterviewQuestions({
  cvText,
  role,
  difficulty,
}: GenerateQuestionsRequest): Promise<string[]> {
  const response = await fetch(
    "http://localhost:3001/api/generate-questions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cvText,
        role,
        difficulty,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Unable to generate interview questions."
    );
  }

  const data =
    (await response.json()) as GenerateQuestionsResponse;

  return data.questions;
}