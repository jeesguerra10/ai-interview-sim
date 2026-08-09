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

    if (!Array.isArray(questions) || questions.length !== 5) {
      throw new Error(
        "Gemini did not return exactly 5 questions."
      );
    }

    res.json({
      questions,
    });
  } catch (error) {
    console.error("Gemini error:", error);

    res.status(500).json({
      error: "Unable to generate interview questions.",
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `InterviewIQ backend running on http://localhost:${PORT}`
  );
});