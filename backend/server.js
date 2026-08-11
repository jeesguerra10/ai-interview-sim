import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.get("/", (req, res) => {
  res.json({
    message: "InterviewIQ backend is running",
  });
});

app.post("/api/generate-questions", async (req, res) => {
  try {
    const { cvText, role, difficulty } = req.body;

    if (!cvText || !role || !difficulty) {
      return res.status(400).json({
        error: "CV text, role, and difficulty are required.",
      });
    }

    const prompt = `
You are an interview question generator.

Create exactly 5 interview questions for a candidate applying for this role:

Role: ${role}
Difficulty: ${difficulty}

Use the candidate's CV information below to personalise the questions where relevant.

CV:
${cvText}

Requirements:
- Return exactly 5 questions.
- Make the questions appropriate for the chosen difficulty.
- Include a mix of experience, behavioural, and role-specific questions.
- Do not include answers.
- Return only the questions as a JSON array of strings.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const rawText = response.text;

    const cleanedText = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const questions = JSON.parse(cleanedText);

    if (
      !Array.isArray(questions) ||
      questions.length !== 5
    ) {
      throw new Error(
        "Gemini did not return exactly 5 questions."
      );
    }

    res.json({
      questions,
    });
  } catch (error) {
    console.error("Gemini question error:", error);

    res.status(500).json({
      error: "Unable to generate interview questions.",
    });
  }
});

app.post("/api/generate-feedback", async (req, res) => {
  try {
    const {
      role,
      difficulty,
      questions,
      answers,
    } = req.body;

    if (
      !role ||
      !difficulty ||
      !Array.isArray(questions) ||
      !Array.isArray(answers) ||
      questions.length === 0 ||
      questions.length !== answers.length
    ) {
      return res.status(400).json({
        error: "Valid interview data is required.",
      });
    }

    const interviewResponses = questions
      .map((question, index) => {
        return `
Question ${index + 1}:
${question}

Candidate answer:
${answers[index]}
`;
      })
      .join("\n");

    const prompt = `
You are an interview coach evaluating a candidate.

Role: ${role}
Difficulty: ${difficulty}

Evaluate the candidate fairly based only on their answers.

${interviewResponses}

Scoring requirements:
- Give an overall score from 0 to 100.
- Give each question a score from 0 to 100.
- Identify exactly 3 concise strengths.
- Identify exactly 3 concise areas to improve.
- Give useful feedback for every answer.
- Feedback should explain what was good and what could be improved.
- Consider clarity, relevance, specificity, examples, and suitability for the role.
- Do not invent experience that the candidate did not mention.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: {
          type: "object",
          properties: {
            overallScore: {
              type: "integer",
              minimum: 0,
              maximum: 100,
            },
            strengths: {
              type: "array",
              items: {
                type: "string",
              },
              minItems: 3,
              maxItems: 3,
            },
            improvements: {
              type: "array",
              items: {
                type: "string",
              },
              minItems: 3,
              maxItems: 3,
            },
            questionFeedback: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  score: {
                    type: "integer",
                    minimum: 0,
                    maximum: 100,
                  },
                  feedback: {
                    type: "string",
                  },
                },
                required: [
                  "score",
                  "feedback",
                ],
              },
            },
          },
          required: [
            "overallScore",
            "strengths",
            "improvements",
            "questionFeedback",
          ],
        },
      },
    });

    const feedback = JSON.parse(response.text);

    if (
      !Array.isArray(feedback.questionFeedback) ||
      feedback.questionFeedback.length !==
        questions.length
    ) {
      throw new Error(
        "Gemini returned the wrong number of feedback items."
      );
    }

    res.json(feedback);
  } catch (error) {
    console.error(
      "Feedback generation error:",
      error
    );

    res.status(500).json({
      error: "Unable to generate interview feedback.",
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `InterviewIQ backend running on http://localhost:${PORT}`
  );
});