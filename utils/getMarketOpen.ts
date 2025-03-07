type Holiday =
  | "20240301" | "20240505" | "20240506" | "20250606" | "20250815"
  | "20250915" | "20250916" | "20250917" | "20251003" | "20251009"
  | "20251225";

type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type MarketTime = {
  openHour: number;
  openMinute: number;
  closeHour: number;
  closeMinute: number;
};

const MARKET_HOURS: MarketTime = {
  openHour: 9,
  openMinute: 0,
  closeHour: 15,
  closeMinute: 30
};

const holidays = new Set<Holiday>([
  "20240301", "20240505", "20240506", "20250606", "20250815",
  "20250915", "20250916", "20250917", "20251003", "20251009",
  "20251225"
]);

const getKoreanTime = (): Date => new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" }));

const isHoliday = (date: Date): boolean => {
  const dateStr = date.toISOString().split('T')[0].replace(/-/g, '') as Holiday;
  return holidays.has(dateStr);
};

export const marketOpen = (): boolean => {
  console.log("요청 받음");
  const now = getKoreanTime();
  const day: Day = now.getDay() as Day;
  const hour = now.getHours();
  const minute = now.getMinutes();

  // 1. 주말 체크 (0: 일요일, 6: 토요일)
  if (day === 0 || day === 6) return false;

  // 2️. 공휴일 체크
  if (isHoliday(now)) return false;

  // 3️. 장 운영 시간 체크
  if (
    hour < MARKET_HOURS.openHour ||
    (hour === MARKET_HOURS.closeHour && minute > MARKET_HOURS.closeMinute) ||
    hour > MARKET_HOURS.closeHour
  ) {
    return false;
  }

  return true;
};
