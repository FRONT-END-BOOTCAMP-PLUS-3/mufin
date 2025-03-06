
import Quiz, { QuizData } from "@/app/user/quiz/components/Quiz";
import { env } from "@/config/env";
import { headers } from "next/headers";

export interface QuizPageProps {
  quiz: {
    totalQuestions: number;
    questions: QuizData[];
  };
}

const quizPage = async () => {
  
  const baseUrl = env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const cookieHeader = (await headers()).get("cookie") || "";

  const res = await fetch(`${baseUrl}/api/user/quiz?limit=5`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
  const data = (await res.json()) as QuizPageProps;
  console.log("Test:",data.quiz);

  return <Quiz quiz = {data.quiz}/>;
};

export default quizPage;
