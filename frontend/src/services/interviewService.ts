import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  type Timestamp,
} from "firebase/firestore";

import { db } from "./firebase";

type SaveInterviewData = {
  userId: string;
  role: string;
  questions: string[];
  answers: string[];
  durationSeconds: number;
  overallScore: number;
};

export type InterviewRecord = {
  id: string;
  role: string;
  questions: string[];
  answers: string[];
  durationSeconds: number;
  overallScore: number;
  createdAt: Timestamp | null;
};

export async function saveInterview({
  userId,
  role,
  questions,
  answers,
  durationSeconds,
  overallScore,
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
      questions,
      answers,
      durationSeconds,
      overallScore,
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
      questions: data.questions,
      answers: data.answers,
      durationSeconds: data.durationSeconds,
      overallScore: data.overallScore,
      createdAt: data.createdAt ?? null,
    };
  });
}