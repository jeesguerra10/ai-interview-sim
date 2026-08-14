import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  type Timestamp,
} from "firebase/firestore";

import { db } from "./firebase";
import type { QuestionFeedback } from "./aiService";

type SaveInterviewData = {
  userId: string;
  role: string;
  difficulty: string;
  questions: string[];
  answers: string[];
  durationSeconds: number;
  overallScore: number;
  strengths: string[];
  improvements: string[];
  questionFeedback: QuestionFeedback[];
};

export type InterviewRecord = {
  id: string;
  role: string;
  difficulty?: string;
  questions: string[];
  answers: string[];
  durationSeconds: number;
  overallScore: number;
  strengths?: string[];
  improvements?: string[];
  questionFeedback?: QuestionFeedback[];
  createdAt: Timestamp | null;
};

export async function saveInterview({
  userId,
  role,
  difficulty,
  questions,
  answers,
  durationSeconds,
  overallScore,
  strengths,
  improvements,
  questionFeedback,
}: SaveInterviewData) {
  const interviewsCollection = collection(
    db,
    "users",
    userId,
    "interviews"
  );

  const interviewDocument = await addDoc(
    interviewsCollection,
    {
      role,
      difficulty,
      questions,
      answers,
      durationSeconds,
      overallScore,
      strengths,
      improvements,
      questionFeedback,
      createdAt: serverTimestamp(),
    }
  );

  return interviewDocument.id;
}

export async function getUserInterviews(
  userId: string
): Promise<InterviewRecord[]> {
  const interviewsCollection = collection(
    db,
    "users",
    userId,
    "interviews"
  );

  const interviewsQuery = query(
    interviewsCollection,
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(interviewsQuery);

  return snapshot.docs.map((document) => {
    const data = document.data();

    return {
      id: document.id,
      role: data.role,
      difficulty: data.difficulty,
      questions: data.questions,
      answers: data.answers,
      durationSeconds: data.durationSeconds,
      overallScore: data.overallScore,
      strengths: data.strengths,
      improvements: data.improvements,
      questionFeedback: data.questionFeedback,
      createdAt: data.createdAt ?? null,
    };
  });
}

export async function getInterviewById(
  userId: string,
  interviewId: string
): Promise<InterviewRecord | null> {
  const interviewReference = doc(
    db,
    "users",
    userId,
    "interviews",
    interviewId
  );

  const snapshot = await getDoc(interviewReference);

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  return {
    id: snapshot.id,
    role: data.role,
    difficulty: data.difficulty,
    questions: data.questions,
    answers: data.answers,
    durationSeconds: data.durationSeconds,
    overallScore: data.overallScore,
    strengths: data.strengths,
    improvements: data.improvements,
    questionFeedback: data.questionFeedback,
    createdAt: data.createdAt ?? null,
  };
}