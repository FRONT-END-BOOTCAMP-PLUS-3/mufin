const holidays = new Set([
    "20240301", "20240505", "20240506", "20250606", "20250815",  
    "20250915", "20250916", "20250917", "20251003", "20251009", 
    "20251225"
]);

// ✅ 한국 시간을 가져오는 함수
const getKoreanTime = (): Date => new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" }));

// ✅ 주어진 날짜가 공휴일인지 확인하는 함수
const isHoliday = (date: Date): boolean => holidays.has(date.toISOString().split('T')[0].replace(/-/g, ''));

// ✅ 마켓 오픈 여부 확인 함수
export const marketOpen = (): boolean => {
    console.log("요청 받음");
    const now = getKoreanTime(); 
    const day = now.getDay(); 
    const hour = now.getHours();
    const minute = now.getMinutes();

    // 1. 주말 체크
    if (day === 0 || day === 6) return false;

    // 2. 공휴일 체크
    if (isHoliday(now)) return false;

    // 3. 장 운영 시간 체크 (09:00~15:30)
    if (hour < 9 || (hour === 15 && minute > 30) || hour > 15) {
        return false;
    }

    return true;
};

