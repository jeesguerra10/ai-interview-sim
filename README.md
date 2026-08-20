# InterviewIQ

InterviewIQ is an AI-powered interview practice web application that helps users prepare for job interviews through personalised questions and AI-generated feedback.

Users can upload their CV, choose a target job role and difficulty level, complete a simulated interview and receive feedback on their answers.

## Live Demo

https://ai-interview-sim-flame.vercel.app

Note: The backend uses Render's free hosting tier. If the service has been inactive, the first AI request may take longer while the backend starts.

## Features

- User registration and login with Firebase Authentication
- Protected routes for authenticated users
- PDF CV upload and text extraction
- AI-generated interview questions based on CV content
- Job role and difficulty selection
- Direct interview mode without a CV
- Five question interview sessions
- Interview timer and progress tracking
- AI analysis of interview answers
- Overall interview score
- Strengths and areas for improvement
- Individual feedback for each answer
- Interview results saved to Firestore
- Dashboard statistics
- Recent interview history
- Ability to reopen previous interview results
- Responsive design for desktop, tablet and mobile
- Error and loading states

## How It Works

1. Create an account or log in.
2. Upload a PDF CV or start a standard interview.
3. Choose a target job role and difficulty level.
4. InterviewIQ generates five interview questions.
5. Answer each question.
6. Submit the completed interview.
7. Gemini analyses the answers.
8. InterviewIQ displays a score, strengths, improvements and question specific feedback.
9. Results are saved to Firestore and can be reopened from the dashboard.

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- PDF.js

### Backend

- Node.js
- Express
- Google Gemini API

### Authentication and Database

- Firebase Authentication
- Cloud Firestore

### Deployment

- Vercel for the frontend
- Render for the backend

## Project Structure

```text
ai-interview-sim/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   └── vercel.json
│
├── backend/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md