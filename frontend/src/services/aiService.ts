type GenerateQuestionsRequest = {
  cvText: string;
  role: string;
  difficulty: string;
};

type GenerateQuestionsResponse = {
  questions: string[];
};

export type QuestionFeedback = {
  score: number;
  feedback: string;
};

export type InterviewFeedback = {
  overallScore: number;
  strengths: string[];
  improvements: string[];
  questionFeedback: QuestionFeedback[];
};

type GenerateFeedbackRequest = {
  role: string;
  difficulty: string;
  questions: string[];
  answers: string[];
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

export async function generateInterviewFeedback({
  role,
  difficulty,
  questions,
  answers,
}: GenerateFeedbackRequest): Promise<InterviewFeedback> {
  const response = await fetch(
    "http://localhost:3001/api/generate-feedback",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role,
        difficulty,
        questions,
        answers,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Unable to generate interview feedback."
    );
  }

  const data =
    (await response.json()) as InterviewFeedback;

  return data;
}