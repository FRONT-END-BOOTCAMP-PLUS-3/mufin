// app/user/quiz/mockData.ts
export interface Choice {
    choiceId: number;
    choiceText: string;
    choiceNumber: number;
  }
  
  export interface QuizData {
    questionId: number;
    questionText: string;
    answer: number;
    choices: Choice[];
  }
  
  // ✅ Mock 퀴즈 데이터
  export const mockQuizData: QuizData[] = [
    {
      questionId: 3,
      questionText: "주식시장에서 '강세장'은 주가가 상승하는 시장을 의미한다.",
      answer: 1,
      choices: [
        { choiceId: 11, choiceText: "O", choiceNumber: 1 },
        { choiceId: 12, choiceText: "X", choiceNumber: 2 }
      ]
    },
    {
      questionId: 15,
      questionText: "주가는 기업의 실적과 무관하게 항상 일정하게 움직인다.",
      answer: 2,
      choices: [
        { choiceId: 21, choiceText: "O", choiceNumber: 1 },
        { choiceId: 22, choiceText: "X", choiceNumber: 2 }
      ]
    },
    {
      questionId: 8,
      questionText: "기업이 주식을 발행하는 주된 목적은?",
      answer: 2,
      choices: [
        { choiceId: 31, choiceText: "배당금 지급", choiceNumber: 1 },
        { choiceId: 32, choiceText: "자본 조달", choiceNumber: 2 },
        { choiceId: 33, choiceText: "세금 절감", choiceNumber: 3 },
        { choiceId: 34, choiceText: "경영권 보호", choiceNumber: 4 }
      ]
    },
    {
      questionId: 12,
      questionText: "다음 중 주식시장의 주요 지수가 아닌 것은?",
      answer: 4,
      choices: [
        { choiceId: 41, choiceText: "코스피", choiceNumber: 1 },
        { choiceId: 42, choiceText: "나스닥", choiceNumber: 2 },
        { choiceId: 43, choiceText: "다우존스", choiceNumber: 3 },
        { choiceId: 44, choiceText: "S&P 6000", choiceNumber: 4 }
      ]
    },
    {
      questionId: 19,
      questionText: "'PER(주가수익비율)'이 의미하는 것은?",
      answer: 3,
      choices: [
        { choiceId: 51, choiceText: "배당률", choiceNumber: 1 },
        { choiceId: 52, choiceText: "기업의 자산 규모", choiceNumber: 2 },
        { choiceId: 53, choiceText: "주가 대비 순이익 비율", choiceNumber: 3 },
        { choiceId: 54, choiceText: "거래량 변화율", choiceNumber: 4 }
      ]
    }
  ];
  